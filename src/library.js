// Dependency-free, deterministic helpers. Never inspect file contents or transmit media.
const EXTENSIONS = new Set(["mp3", "m4a", "aac", "wav", "flac", "ogg", "oga", "opus", "webm", "mp4"]);
export const MAX_TRACKS = 500;
export const MAX_FILE_BYTES = 1024 * 1024 * 1024;

export function isAudioFile(file) {
  if (!file || typeof file.name !== "string" || !file.name.trim()
      || !Number.isSafeInteger(file.size) || file.size <= 0 || file.size > MAX_FILE_BYTES) return false;
  const ext = file.name.toLowerCase().split(".").pop();
  const mime = typeof file.type === "string" ? file.type.toLowerCase() : "";
  // Some browsers provide no MIME for FLAC/OPUS. The player still lets the browser decode.
  return EXTENSIONS.has(ext) && (mime === "" || mime.startsWith("audio/") || mime === "video/mp4" || mime === "video/webm");
}

export function fileKey(file) {
  return JSON.stringify([file.name, file.size, Number.isSafeInteger(file.lastModified) ? file.lastModified : 0]);
}

export function displayName(name) {
  const stripped = String(name ?? "").replace(/\.[^.]+$/, "").replace(/[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/g, " ").trim();
  const characters = Array.from(stripped || "Untitled track");
  return characters.length > 120 ? characters.slice(0, 119).join("") + "…" : characters.join("");
}

export function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const whole = Math.floor(seconds);
  return Math.floor(whole / 60) + ":" + String(whole % 60).padStart(2, "0");
}

export function planImport(files, existingKeys = new Set(), currentCount = 0) {
  const accepted = [];
  const seen = new Set(existingKeys);
  let rejected = 0;
  for (const file of files) {
    // Validate before computing identity: even an unexpected null/hostile
    // entry must not crash a bulk import or interrupt later valid files.
    if (!isAudioFile(file)) { rejected++; continue; }
    const key = fileKey(file);
    if (seen.has(key) || currentCount + accepted.length >= MAX_TRACKS) {
      rejected++;
      continue;
    }
    seen.add(key);
    accepted.push({ file, key, title: displayName(file.name) });
  }
  return { accepted, rejected };
}
