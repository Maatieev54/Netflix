// ============================================================
// KINOFLIX browse — rendering, search, nav views & My List
// ============================================================

// ===== My List (localStorage) =====
const LIST_KEY = "kinoflix-mylist";
const getList = () => {
  try { return JSON.parse(localStorage.getItem(LIST_KEY)) || []; }
  catch { return []; }
};
const setList = (arr) => localStorage.setItem(LIST_KEY, JSON.stringify(arr));
const inList = (key) => getList().includes(key);
function toggleList(key) {
  const arr = getList();
  const i = arr.indexOf(key);
  if (i === -1) arr.push(key); else arr.splice(i, 1);
  setList(arr);
  return arr.includes(key);
}

// ===== Navbar solid on scroll =====
const nav = document.getElementById("nav");
window.addEventListener("scroll",
  () => nav.classList.toggle("scrolled", window.scrollY > 40),
  { passive: true });

// ===== Mobile menu =====
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
menuToggle.addEventListener("click", () => {
  const open = mobileMenu.classList.toggle("open");
  menuToggle.classList.toggle("active", open);
});

// ===== Hero =====
const featured = MOVIES[FEATURED];
const hero = document.getElementById("hero");
hero.style.backgroundImage = `linear-gradient(to right, rgba(0,0,0,.9) 0%, rgba(0,0,0,.55) 35%, rgba(0,0,0,.2) 70%), linear-gradient(to top, #141414 2%, transparent 45%), url('${featured.img}')`;
document.getElementById("heroTitle").textContent = featured.title;
document.getElementById("heroPlay").href = featured.url;
const heroInfo = document.getElementById("heroInfo");
function syncHeroInfo() {
  heroInfo.innerHTML = inList(FEATURED)
    ? '<i class="fa-solid fa-check"></i> My List'
    : '<i class="fa-solid fa-plus"></i> My List';
}
syncHeroInfo();
heroInfo.addEventListener("click", () => { toggleList(FEATURED); syncHeroInfo(); });

// ===== Card + rendering =====
const content = document.getElementById("content");

function cardHTML(key) {
  const m = MOVIES[key];
  if (!m) return "";
  const added = inList(key);
  return `
    <div class="card" data-key="${key}">
      <a href="${m.url}" aria-label="${m.title}">
        <img src="${m.img}" alt="${m.title}" loading="lazy" />
      </a>
      <button class="card-add ${added ? "added" : ""}" data-add="${key}" aria-label="Toggle My List">
        <i class="fa-solid ${added ? "fa-check" : "fa-plus"}"></i>
      </button>
      <div class="card-info">
        <a class="card-title" href="${m.url}">${m.title}</a>
        <a class="card-play" href="${m.url}"><i class="fa-solid fa-circle-play"></i> Play</a>
      </div>
    </div>`;
}

function renderRows() {
  content.innerHTML = ROWS.map((row) => `
    <section class="row">
      <h2 class="row-title">${row.title}</h2>
      <div class="row-wrap">
        <button class="row-arrow left" aria-label="Scroll left"><i class="fa-solid fa-chevron-left"></i></button>
        <div class="row-track">${row.keys.map(cardHTML).join("")}</div>
        <button class="row-arrow right" aria-label="Scroll right"><i class="fa-solid fa-chevron-right"></i></button>
      </div>
    </section>`).join("");

  content.querySelectorAll(".row-wrap").forEach((wrap) => {
    const track = wrap.querySelector(".row-track");
    const left = wrap.querySelector(".left");
    const right = wrap.querySelector(".right");

    const update = () => {
      const overflow = track.scrollWidth - track.clientWidth > 4;
      const atStart = track.scrollLeft <= 4;
      const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
      left.classList.toggle("hidden", !overflow || atStart);
      right.classList.toggle("hidden", !overflow || atEnd);
    };

    left.addEventListener("click", () =>
      track.scrollBy({ left: -track.clientWidth * 0.8, behavior: "smooth" }));
    right.addEventListener("click", () =>
      track.scrollBy({ left: track.clientWidth * 0.8, behavior: "smooth" }));
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    // Run after images/layout settle
    update();
    setTimeout(update, 300);
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
  }, { threshold: 0.08 });
  content.querySelectorAll(".row").forEach((r) => io.observe(r));
}

function renderGrid(title, keys, emptyMsg) {
  const cards = keys.filter((k) => MOVIES[k]).map(cardHTML).join("");
  content.innerHTML = `
    <section class="grid-view">
      <h2 class="grid-title">${title}</h2>
      ${keys.length ? `<div class="grid">${cards}</div>` : `<p class="empty">${emptyMsg || "Nothing here yet."}</p>`}
    </section>`;
}

// ===== Views =====
const allKeys = Object.keys(MOVIES);
function setView(view) {
  document.querySelectorAll(".nav-link").forEach((l) =>
    l.classList.toggle("active", l.dataset.view === view));
  mobileMenu.classList.remove("open");
  menuToggle.classList.remove("active");
  searchWrap.classList.remove("open");
  searchInput.value = "";

  const showHero = view === "home";
  hero.style.display = showHero ? "flex" : "none";
  content.classList.toggle("rows", showHero);
  content.classList.toggle("as-grid", !showHero);

  if (view === "home") renderRows();
  else if (view === "movies") renderGrid("Movies", allKeys);
  else if (view === "tv") renderGrid("TV Shows", allKeys);
  else if (view === "new") renderGrid("New & Popular", [...allKeys].reverse());
  else if (view === "list") renderGrid("My List", getList(), "Your list is empty. Tap the ＋ on any title to add it here.");
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}

document.querySelectorAll(".nav-link, .logo").forEach((l) =>
  l.addEventListener("click", (e) => {
    if (!l.dataset.view) return;
    e.preventDefault();
    setView(l.dataset.view);
  }));

// ===== Search =====
const searchWrap = document.querySelector(".search");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("click", () => {
  searchWrap.classList.toggle("open");
  if (searchWrap.classList.contains("open")) searchInput.focus();
  else { searchInput.value = ""; setView("home"); }
});

let searchTimer;
searchInput.addEventListener("input", () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(runSearch, 120);
});

function runSearch() {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) { setView("home"); return; }
  document.querySelectorAll(".nav-link").forEach((l) => l.classList.remove("active"));
  hero.style.display = "none";
  content.classList.remove("rows");
  content.classList.add("as-grid");
  const term = searchInput.value.trim();
  const hits = allKeys.filter((k) => MOVIES[k].title.toLowerCase().includes(q));
  renderGrid(`Results for “${term}”`, hits, "");
  if (!hits.length) {
    const yt = "https://www.youtube.com/results?search_query=" + encodeURIComponent(term + " trailer");
    content.querySelector(".grid-view").insertAdjacentHTML("beforeend",
      `<div class="no-results">
        <i class="fa-solid fa-clapperboard"></i>
        <p>“${term}” isn't in our library yet.</p>
        <a class="btn btn-play" href="${yt}" target="_blank" rel="noreferrer"><i class="fa-brands fa-youtube"></i> Watch the trailer</a>
      </div>`);
  }
}

// ===== Delegate My List button clicks =====
content.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-add]");
  if (!btn) return;
  e.preventDefault();
  const key = btn.dataset.add;
  const added = toggleList(key);
  btn.classList.toggle("added", added);
  btn.querySelector("i").className = `fa-solid ${added ? "fa-check" : "fa-plus"}`;
  if (FEATURED === key) syncHeroInfo();
});

// ===== Footer newsletter =====
const form = document.getElementById("emailForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = form.querySelector("input");
  const msg = document.getElementById("emailMsg");
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
  msg.textContent = ok ? "Thanks! Check your inbox to get started." : "Please enter a valid email address.";
  msg.style.color = ok ? "#46d369" : "#e87c03";
  if (ok) form.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();

// ===== Init =====
renderRows();
