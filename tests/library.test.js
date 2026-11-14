import test from "node:test";
import assert from "node:assert/strict";
import { isAudioFile, fileKey, displayName, formatTime, planImport, MAX_TRACKS, MAX_FILE_BYTES } from "../src/library.js";
const sample = (name = "demo.mp3", size = 100, type = "audio/mpeg", lastModified = 1000) => ({ name, size, type, lastModified });

test("recognizes bounded audio and rejects spoofed non-audio MIME and empty files", () => {
  assert.equal(isAudioFile(sample()), true);
  assert.equal(isAudioFile(sample("t.flac", 20, "")), true);
  assert.equal(isAudioFile(sample("t.txt", 20, "audio/mpeg")), false);
  assert.equal(isAudioFile(sample("t.mp3", 20, "image/png")), false);
  assert.equal(isAudioFile(sample("t.mp3", 0)), false);
  assert.equal(isAudioFile(sample("t.mp3", MAX_FILE_BYTES + 1)), false);
  assert.equal(isAudioFile({ name: "t.mp3", size: NaN, type: "audio/mpeg" }), false);
});
test("file signatures use independent name/size/modification fields", () => {
  assert.notEqual(fileKey(sample("one.mp3")), fileKey(sample("two.mp3")));
  assert.notEqual(fileKey(sample("one.mp3")), fileKey(sample("one.mp3", 200)));
});
test("filenames remain plain display data, never markup", () => {
  assert.equal(displayName("<img src=x onerror=alert(1)>.mp3"), "<img src=x onerror=alert(1)>");
  assert.equal(displayName("hello\u0000world.wav"), "hello world");
  assert.equal(displayName("x".repeat(140) + ".mp3").length, 120);
});
test("format time degrades safely on invalid duration", () => {
  assert.equal(formatTime(61.9), "1:01");
  assert.equal(formatTime(NaN), "0:00");
  assert.equal(formatTime(Infinity), "0:00");
  assert.equal(formatTime(-1), "0:00");
});
test("import plans are duplicate-safe and enforce library cap", () => {
  const a = sample(); const b = sample("test.flac", 50, "");
  const result = planImport([a, a, b, sample("oops.pdf")]);
  assert.equal(result.accepted.length, 2);
  assert.equal(result.rejected, 2);
  assert.equal(planImport([a], new Set([fileKey(a)])).rejected, 1);
  assert.equal(planImport([a, b], new Set(), MAX_TRACKS - 1).accepted.length, 1);
});
