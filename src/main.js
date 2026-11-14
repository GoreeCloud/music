import { fileKey, formatTime, planImport } from "./library.js";

const byId = (id) => document.getElementById(id);
const input = byId("audio-files");
const list = byId("track-list");
const audio = byId("audio-player");
const status = byId("status");
const playButton = byId("play");
const previousButton = byId("previous");
const nextButton = byId("next");
const seek = byId("seek");
const elapsed = byId("elapsed");
const duration = byId("duration");
const search = byId("search");
const clearButton = byId("clear");
let tracks = [];
let selectedId = null;
let nextId = 1;
let filter = "";

function announce(message) { status.textContent = message; }
function selectedIndex() { return tracks.findIndex((track) => track.id === selectedId); }
function currentTrack() { return tracks[selectedIndex()] || null; }

function updatePlayback() {
  const valid = Number.isFinite(audio.duration) && audio.duration > 0;
  seek.disabled = !valid;
  seek.max = valid ? String(Math.floor(audio.duration)) : "100";
  seek.value = valid ? String(Math.min(Math.floor(audio.currentTime || 0), Math.floor(audio.duration))) : "0";
  elapsed.textContent = formatTime(audio.currentTime);
  duration.textContent = valid ? formatTime(audio.duration) : "0:00";
  playButton.textContent = audio.paused ? "Play" : "Pause";
  playButton.setAttribute("aria-label", audio.paused ? "Play current track" : "Pause current track");
}

function render() {
  list.replaceChildren();
  const visible = tracks.filter((track) => track.title.toLocaleLowerCase().includes(filter));
  for (const track of visible) {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "track";
    button.setAttribute("aria-current", track.id === selectedId ? "true" : "false");
    const title = document.createElement("span");
    title.textContent = track.title; // Never interpret untrusted filenames as HTML.
    const detail = document.createElement("small");
    detail.textContent = track.file.name.split(".").pop().toUpperCase() + " · Local file";
    button.append(title, detail);
    button.addEventListener("click", () => selectTrack(track.id, true));
    item.append(button);
    list.append(item);
  }
  byId("count").textContent = tracks.length + (tracks.length === 1 ? " track" : " tracks");
  byId("empty").hidden = visible.length !== 0;
  byId("empty").textContent = tracks.length && !visible.length ? "No matching tracks." : "Choose audio files to begin.";
  byId("now-playing").textContent = currentTrack()?.title || "Nothing playing";
  const hasTracks = tracks.length > 0;
  playButton.disabled = !hasTracks;
  nextButton.disabled = !hasTracks;
  previousButton.disabled = !hasTracks;
  clearButton.disabled = !hasTracks;
  updatePlayback();
}

async function attemptPlay() {
  try { await audio.play(); }
  catch { announce("Playback could not start. Check file format or browser permissions."); }
  updatePlayback();
}

function selectTrack(id, playNow = false) {
  const track = tracks.find((item) => item.id === id);
  if (!track) return;
  audio.pause();
  selectedId = track.id;
  audio.src = track.url;
  audio.load();
  render();
  if (playNow) void attemptPlay();
}

function step(delta) {
  if (!tracks.length) return;
  const index = selectedIndex();
  const target = index < 0 ? 0 : (index + delta + tracks.length) % tracks.length;
  selectTrack(tracks[target].id, true);
}

function addFiles(files) {
  const known = new Set(tracks.map((track) => track.key));
  const { accepted, rejected } = planImport(files, known, tracks.length);
  let added = 0;
  for (const track of accepted) {
    try {
      const url = URL.createObjectURL(track.file);
      tracks.push({ ...track, id: String(nextId++), url });
      added++;
    } catch {
      announce("A file could not be opened locally.");
    }
  }
  if (added && selectedId === null) selectTrack(tracks[0].id);
  render();
  announce(added + " added locally" + (rejected ? "; " + rejected + " skipped (duplicate, unsupported, too large, or library limit)." : "."));
}

input.addEventListener("change", () => {
  addFiles(Array.from(input.files || []));
  input.value = "";
});
search.addEventListener("input", () => { filter = search.value.trim().toLocaleLowerCase(); render(); });
playButton.addEventListener("click", () => {
  if (!tracks.length) return;
  if (!currentTrack()) { selectTrack(tracks[0].id, true); return; }
  if (audio.paused) void attemptPlay();
  else audio.pause();
  updatePlayback();
});
previousButton.addEventListener("click", () => step(-1));
nextButton.addEventListener("click", () => step(1));
seek.addEventListener("input", () => {
  if (Number.isFinite(audio.duration)) audio.currentTime = Math.min(Number(seek.value), audio.duration);
});
audio.addEventListener("timeupdate", updatePlayback);
audio.addEventListener("durationchange", updatePlayback);
audio.addEventListener("pause", updatePlayback);
audio.addEventListener("play", updatePlayback);
audio.addEventListener("ended", () => step(1));
audio.addEventListener("error", () => {
  if (audio.getAttribute("src")) announce("The browser could not decode this track.");
});
function clearLibrary() {
  audio.pause();
  audio.removeAttribute("src");
  audio.load();
  for (const track of tracks) URL.revokeObjectURL(track.url);
  tracks = [];
  selectedId = null;
  filter = "";
  search.value = "";
  render();
}
clearButton.addEventListener("click", () => {
  clearLibrary();
  announce("Library cleared. No tracks were stored or uploaded.");
});
window.addEventListener("pagehide", () => {
  for (const track of tracks) URL.revokeObjectURL(track.url);
});
render();
announce("Files stay in this browser session. No server connection or upload.");
