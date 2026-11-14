# GoreeCloud Music

**Status: original, dependency-free local-first browser player development preview (0.1.0). NOT a Stable release, self-hosted service, streaming platform, native app or deployed client.**

GoreeCloud Music begins as an offline-capable listening foundation. Select audio files from your own device and listen inside the current browser tab. Files are never uploaded, indexed remotely, synchronized, logged, tracked or sent to any service. The app does not request account access. No telemetry, cookies, localStorage or third-party runtime dependencies are used.

## Developer preview

Serve the repository with a static HTTP server:

```bash
python3 -m http.server 4173 --bind 127.0.0.1
# open http://127.0.0.1:4173/
```

Use **Add audio files** to choose supported local audio formats (MP3, M4A/AAC, FLAC, WAV, OGG, OPUS, WebM and MP4 audio where the browser supports them). Search the session queue, select a track, play/pause, seek, skip, or clear it. Import cap: 500 files per session, 1 GiB per file; duplicates by filename + size + modification timestamp are skipped. File metadata is only held in tab memory. Closing/reloading ends the session; clearing revokes object URLs.

**Limitations:** Not every codec is supported by every browser. Imported file type and filename are untrusted hints; the browser's media engine performs actual decoding. This is not a secure transcoding service. No ID3 metadata, playlists across sessions, album art, folder watching, cross-device sync, background mobile playback, streaming/DRM, Media Session controls, offline PWA installation or filesystem write access yet. No server-side auth/Identity, Mesh integration or GoreeCloud Photos sharing is claimed. Preview only, not a production deployment.

## Security and privacy model

- CSP forbids outgoing `connect-src` requests, remote code, forms, frames and embedded objects. Scripts and styles are same-origin; audio plays from local object URLs only.
- Imported filenames render via `textContent`, never HTML. No external audio metadata parsers, network fetches, loggers, trackers or analytics.
- Session uses local `File` objects and revocable `blob:` playback URLs; no media leaves the browser through application code.
- A hostile or damaged audio file remains a browser media-decoder risk. Keep the browser updated; no independent codec fuzzing, cross-browser or assistive-technology acceptance has been completed.
- Static hosting over localhost does not itself establish a hardened production service; follow Wardveil security and GoreeShield privacy requirements for later integrations.

The UI uses pinned dark semantic color and spacing values from the first-party [GoreeCloud UI source](https://github.com/GoreeCloud/gc-ui/blob/main/tokens/gc.tokens.json), inspected November 13, 2026. It is not a shipped GC UI native adapter.

## Validation

Requires Node.js 22+ for dependency-free tests:

```bash
npm run check
npm test
```

The GitHub workflow runs syntax and deterministic library tests on pull requests and main. Manual browser playback, codec, focus, screen-reader, reduced-motion, native device and production security testing remain separate acceptance gates.

## Next engineering priorities

1. Verify real browser audio playback, keyboard, screen reader, mobile layout and error states using synthetic or owner-approved test music.
2. Add nonpersistent reorder/loop/shuffle with deterministic tests, then opt-in encrypted or user-controlled playlist persistence after privacy review.
3. Design source-owned Mesh status/discovery with Identity permissions and GoreeShield minimization before any cross-product service connection.
4. Validate native desktop windowed-default and mobile implementations separately; never relabel this web preview as a native client.

## License

Original source and documentation: [MIT](LICENSE), copyright © 2026 GoreeCloud. No third-party audio, fonts or runtime dependencies are bundled. Licensing of user-selected media remains with its owners.
