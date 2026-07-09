// ============================================================
// Movie catalog — single source of truth for the browse page
// ============================================================
const IMG = "https://m.media-amazon.com/images/M/";

const MOVIES = {
  mobland:        { title: "MobLand",                 img: IMG + "MV5BZDVmMzJkOWUtMjdjMi00NzA4LTgxMTItYjA4NjVjZDI0ZWU1XkEyXkFqcGc@._V1_.jpg", url: "mobland/mobland.html" },
  "ironman-1":    { title: "Iron Man",                img: IMG + "MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_FMjpg_UX1000_.jpg", url: "ironman-1/ironman-1.html" },
  "ironman-2":    { title: "Iron Man 2",              img: IMG + "MV5BYWYyOGQzOGYtMGQ1My00ZWYxLTgzZjktZWYzN2IwYjkxYzM0XkEyXkFqcGc@._V1_.jpg", url: "ironman-2/ironman-2.html" },
  "ironman-3":    { title: "Iron Man 3",              img: IMG + "MV5BMTczN2NkZTctNzhmNS00ZmI1LWI1ZjAtNGQxNjI4MTNkM2JmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", url: "ironman-3/ironman-3.html" },
  "spiderman-1":  { title: "Spider-Man",              img: IMG + "MV5BZWM0OWVmNTEtNWVkOS00MzgyLTkyMzgtMmE2ZTZiNjY4MmFiXkEyXkFqcGc@._V1_.jpg", url: "spiderman-1/spiderman-1.html" },
  "spiderman-2":  { title: "Spider-Man 2",            img: IMG + "MV5BYjIwNjAzYTYtZDI2Ny00OTg2LTgyODEtODhkOTE3NzExY2QzXkEyXkFqcGc@._V1_.jpg", url: "spiderman-2/spiderman-2.html" },
  nowayhome:      { title: "Spider-Man: No Way Home", img: IMG + "MV5BMmFiZGZjMmEtMTA0Ni00MzA2LTljMTYtZGI2MGJmZWYzZTQ2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", url: "spidermannohome/spidermanhome.html" },
  elcamino:       { title: "El Camino",               img: IMG + "MV5BMzBlNTdjZTctZTEzZi00MjY0LTgyNzMtNTk2ODI0Mjc3ZDQ5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", url: "elcamino/elcamino.html" },
  thebee:         { title: "The Beekeeper",           img: IMG + "MV5BZGRiMDE1NTMtMThmZS00YjE4LWI1ODQtNjRkZGZlOTg2MGE1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", url: "thebee/thebee.html" },
  "fast-2":       { title: "2 Fast 2 Furious",        img: IMG + "MV5BOTQzYzEwNWMtOTAwYy00YWYwLWE1NTEtZTkxOGQxZTM0M2VhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", url: "fast-2/fast-2.html" },
  "fast-3":       { title: "Tokyo Drift",             img: IMG + "MV5BMTQ2NTMxODEyNV5BMl5BanBnXkFtZTcwMDgxMjA0MQ@@._V1_FMjpg_UX1000_.jpg", url: "fast-3/fast-3.html" },
  "fast-4":       { title: "Fast & Furious",          img: IMG + "MV5BM2Y1YzhkNzUtMzhmZC00OTFkLWJjZDktMWYzZmQ0Y2Y5ODcwXkEyXkFqcGc@._V1_.jpg", url: "fast-4/fast-4.html" },
  "fast-5":       { title: "Fast Five",               img: IMG + "MV5BMTUxNTk5MTE0OF5BMl5BanBnXkFtZTcwMjA2NzY3NA@@._V1_.jpg", url: "fast-5/fast-5.html" },
  "fast-6":       { title: "Fast & Furious 6",        img: IMG + "MV5BMTM3NTg2NDQzOF5BMl5BanBnXkFtZTcwNjc2NzQzOQ@@._V1_FMjpg_UX1000_.jpg", url: "fast-6/fast-6.html" },
  "fast-7":       { title: "Furious 7",               img: IMG + "MV5BYzNjYThmZGQtM2RmZi00Zjc2LTg3MmYtMjk3YmI5Mjk3YWJlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", url: "fast-7/fast-7.html" },
  "fast-8":       { title: "The Fate of the Furious", img: IMG + "MV5BNDc2MjFjNzMtMzgzZS00MTY3LWE0ZWMtMDkyZmUwMTJlMzIxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", url: "fast-8/fast-8.html" },
  "fast-9":       { title: "F9",                      img: IMG + "MV5BOTcxYTI4YjgtNDRmOC00YjM4LTllZjAtNzZkMGNlMDE1NzEwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", url: "fast-9/fast-9.html" },
  "fast-x":       { title: "Fast X",                  img: IMG + "MV5BMmRiYTY4MGItYmI5NC00MTg1LWFjMGYtNmNlNTRhNzc3Mjk1XkEyXkFqcGc@._V1_QL75_UY281_CR11,0,190,281_.jpg", url: "fast-x/fast-x.html" },
  "it-1":         { title: "IT",                      img: IMG + "MV5BZGZmOTZjNzUtOTE4OS00OGM3LWJiNGEtZjk4Yzg2M2Q1YzYxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", url: "it-1/it-1.html" },
  "it-2":         { title: "IT Chapter Two",          img: IMG + "MV5BYzUxM2VhOGItZTY2My00OTA4LWI4NjUtMDA5YWJjM2M2NDJjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", url: "it-2/it-2.html" },
  green:          { title: "Green Book",              img: IMG + "MV5BNDEwMzg5MjUtYzRkNy00NmJmLTg1OWItMTY2ZjBmODM2MWU0XkEyXkFqcGc@._V1_.jpg", url: "green/green.html" },
  book:           { title: "The Book of Eli",         img: IMG + "MV5BODIwNWE0NzItOTc3NC00NzEyLTg3M2YtMTZmYWQxZGFkZTdiXkEyXkFqcGc@._V1_.jpg", url: "book/book.html" },
  wild:           { title: "Wild",                    img: IMG + "MV5BYTNmNTBlYzUtNTFiNS00YmY4LWJiMWYtZTlmNmY3ODFlMTUxXkEyXkFqcGc@._V1_.jpg", url: "wild/wild.html" },
  ave:            { title: "Avengement",              img: IMG + "MV5BZTQ1ZWNlODctNmI0MC00NmUzLWE4NTYtZjUwYzFlODYzMTgxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", url: "ave/ave.html" },
  distant:        { title: "Distant",                 img: IMG + "MV5BNjNlYTM2YzItZDE3NS00NjAxLWJlOTgtYTYwM2ExMTUzMmE5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", url: "distant/distant.html" },
  "m-1":          { title: "The Mechanic",            img: IMG + "MV5BNTUwODQyNjM0NF5BMl5BanBnXkFtZTcwNDMwMTU1Mw@@._V1_.jpg", url: "m-1/m-1.html" },
  incep:          { title: "Inception",               img: IMG + "MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg", url: "incep/incep.html" },
  time:           { title: "In Time",                 img: IMG + "MV5BZTRmOGU2NDQtOTI4Yy00OTRmLWE0MWQtNDcyZmRmODMxZGE0XkEyXkFqcGc@._V1_.jpg", url: "time/time.html" },
  number4:        { title: "I Am Number Four",         img: IMG + "MV5BMjI0NDI1MTMyM15BMl5BanBnXkFtZTcwMDMzMTcyNA@@._V1_FMjpg_UX1000_.jpg", url: "4-th/im-4.html" },
  jumper:         { title: "Jumper",                  img: IMG + "MV5BY2VkYWYyMmEtODFhNS00MGM0LThmODQtZDExMmMzNjBkYTEwXkEyXkFqcGc@._V1_.jpg", url: "jumper/jump.html" },
  lucy:           { title: "Lucy",                    img: IMG + "MV5BM2M0ZDQ5MjEtZjlhNi00ZDVlLTk5OTMtOGNhNmZhNmY3Yzc2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", url: "lucy/lucy.html" },
  tom:            { title: "Without Remorse",         img: IMG + "MV5BYTliNjcwNmItMzk1OC00ZTEyLWEwNzktNTQ4NTJmZjU4ZWI1XkEyXkFqcGc@._V1_.jpg", url: "tom/tom.html" },
  elysium:        { title: "Elysium",                 img: IMG + "MV5BNDc2NjU0MTcwNV5BMl5BanBnXkFtZTcwMjg4MDg2OQ@@._V1_FMjpg_UX1000_.jpg", url: "elysium/ely.html" },
  infinit:        { title: "Infinite",               img: IMG + "MV5BNTZhMWU0NzEtNzViMC00NzljLWJlNzYtYTA4MGE1YWFmOTU3XkEyXkFqcGc@._V1_.jpg", url: "infinit/inf.html" },
  killer:         { title: "The Killer",              img: IMG + "MV5BYjQ1MWNkNGQtMzI2ZC00OTJiLTljZDMtZTUxNDljNTI1MTk0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", url: "killer/kill.html" },
  watch:          { title: "Watchmen",               img: IMG + "MV5BN2I3MjIzYzMtNDkxNS00ZDIzLWEzZjktNDJlZDZlOGZlMTMxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", url: "watch/watch.html" },
};

const ROWS = [
  { title: "Trending Now",         keys: ["mobland", "nowayhome", "fast-x", "thebee", "it-2", "elcamino", "killer", "lucy"] },
  { title: "Superheroes & Beyond", keys: ["ironman-1", "ironman-2", "ironman-3", "spiderman-1", "spiderman-2", "nowayhome", "watch", "number4"] },
  { title: "Fast & Furious Saga",  keys: ["fast-2", "fast-3", "fast-4", "fast-5", "fast-6", "fast-7", "fast-8", "fast-9", "fast-x"] },
  { title: "Sci-Fi & Adventure",   keys: ["incep", "time", "lucy", "elysium", "infinit", "jumper", "number4", "distant"] },
  { title: "Thrillers & Crime",    keys: ["ave", "distant", "m-1", "killer", "tom", "watch", "mobland", "elcamino"] },
  { title: "Critically Acclaimed", keys: ["green", "book", "it-1", "it-2", "wild", "thebee", "incep", "elcamino"] },
];

// Featured title for the hero banner.
const FEATURED = "nowayhome";
