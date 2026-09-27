# GoreeCloud Music — Changelogs

> **Authority:** Repository-native human-readable change history. The prior `CHANGELOG.md` history is preserved below.

## 2026-09-27 — Drive feature-roadmap migration

- Retired the synchronized Google Drive roadmap after confirming material parity with the repository roadmap.
- Moved feature authority to `IMPLEMENTED-FEATURES.md` and `PLANNED-FEATURES.md`.
- No lifecycle promotion or release acceptance is implied.

## Prior changelog history

---
title: "GoreeCloud Music — Repository Change Log"
document_type: "Repository Change Log"
status: "Active"
version: "v1.4"
classification: "Internal"
last_updated: "2026-09-15"
application: "GoreeCloud Music"
---

# GoreeCloud Music — Repository Change Log

This repository changelog records verified source and repository-documentation changes. The canonical GoreeCloud product changelog is `GoreeCloud/Changelogs/Change Log — Music.md`. Planned roadmap items are not completed changes merely because they appear in documentation.

## September 15, 2026 — Bounded MP3 and FLAC media format probing

- PR #19 merged as authoritative `main` commit `5e59466da23e5800f13f19e377a9e852631276ef`.
- Exact candidate `d3eb0dcf31dce6b1802f0a1d979d628e15ee7a7f` passed Music CI `35034688612` and Platform Contract `35034689104`.
- Post-merge `main` passed Music CI `35034883077` and Platform Contract `35034883624`.
- Added first-party, dependency-free format probing for already-materialized GoreeCloud Server playable assets.
- MP3 probing requires actual MPEG Layer III frame evidence, optionally after a validated ID3v2.3/v2.4 prefix; tag-only and non-Layer-III inputs fail closed.
- FLAC probing requires the native `fLaC` signature and valid first STREAMINFO block shape.
- `ProbeLibraryFileFormat` re-evaluates edit/owner authorization, scanner/source state, source-item/asset/path/size binding, rooted source safety, and scanner size/mtime freshness before persisting only `codec` and `container`.
- Failed probing leaves prior format state untouched and unchanged retries are idempotent.
- Duration, bitrate, sample rate, channels, bit depth, ReplayGain, media hashes/integrity, broader formats, playback/transcoding acceptance, automatic identity matching, APIs/UI, recovery qualification, release eligibility, and Stable status remain pending.

## September 15, 2026 — Explicit-identity library ingestion foundation

- PR #18 merged as authoritative `main` commit `f365047f33f732afb1e274cd1d4b4b401271c32a`.
- Exact candidate `b46d2628a7fd86db79dc2a0be17945908166a8fd` passed Music CI `35032631291` and Platform Contract `35032632700`.
- Post-merge `main` passed Music CI `35032841324` and Platform Contract `35032841752`.
- Added one atomic transaction that materializes a current, authorized scanner file into existing Recording, Release, GoreeCloud Server Source Item, and Playable Asset application state only when the caller supplies validated canonical Recording and Release IDs.
- Source Item and Playable Asset IDs are deterministically derived from the owning library and durable scanner `file_id`; exact retries are idempotent, while conflicting canonical IDs, source bindings, or media paths are rejected.
- The transaction re-evaluates edit/owner authorization, requires non-missing current scanner metadata, reopens the source through the existing rooted non-symlink file boundary, and verifies size/mtime again immediately before commit so stale source facts roll back the whole transaction.
- Original media remains unchanged and title/artist similarity does not establish identity equivalence.
- Automatic Recording/Release matching, duplicate-equivalence policy, broader/background ingestion, codec/container/duration/integrity enrichment, APIs/UI, recovery acceptance, production qualification, release eligibility, and Stable status remain pending.

## September 15, 2026 — Bounded embedded metadata extraction foundation

- PR #16 merged as authoritative `main` commit `bc90686a18338afef650b73357f454d1be541afb`.
- Exact candidate `fc9613d94493e2d5c355f3aba7b6bd2a24a2d334` passed Music CI `35030658032` and Platform Contract `35030658657`.
- Post-merge `main` passed Music CI `35030857299` and Platform Contract `35030858110`.
- Advanced the application-state schema from v3 to v4 with `library_file_metadata`, keyed to scanner `file_id` and bound to the exact source size/mtime observation used for extraction.
- Added bounded read-only MP3 ID3v2.3/v2.4 and FLAC Vorbis Comment extraction for title, artist, album, album artist, genre, date/year, track number, and disc number.
- Metadata extraction/storage requires library edit permission; metadata retrieval requires library read permission.
- Stored metadata becomes non-current when scanner facts change or the source becomes missing; original media remains outside the database.
- Hardened source access with Go `os.Root`, explicit symbolic-link rejection, regular-file validation, and scanner snapshot verification before parsing and again immediately before persistence.
- Added schema-v3→v4, parser, persistence, authorization, staleness, malformed-input, unsupported-container, and symlink-substitution tests.
- The historical stale metadata branch was not force-rewritten; its intended delta was restacked on current `main` before PR #16.
- This change does not implement approved sidecars, artwork, broader embedded formats, canonical Recording/Release/Source Item/Playable Asset ingestion, codec/container probing, public APIs/UI, production recovery, release eligibility, or Stable status.

## September 15, 2026 — Authorization-scoped Recently Added foundation

- PR #14 merged as authoritative `main` commit `c20acc1a92ee71ee4173468d97a5980ccf396013`.
- Exact candidate `8058489efbaafcfd95fbe1b6144a4eb6bc909c6d` passed Music CI `35028058553` and Platform Contract `35028059131`.
- Post-merge `main` passed Music CI `35028245616` and Platform Contract `35028246120`.
- Added a bounded `RecentlyAddedForProfile` query over existing canonical `recordings.added_at` application state.
- Results are newest-first with deterministic recording-ID tie breaking and include recording/library identity, title, artist, and added timestamp.
- Current library membership is re-evaluated for the requesting profile, so inaccessible or revoked-library recordings are suppressed without deleting underlying recording/library state.
- Tests cover ordering, cross-library isolation, explicit grants, authorization revocation, malformed profile identifiers, result bounds, race testing, and service build.
- The initial candidate correctly failed CI because a test treated syntactically valid ID `invalid` as malformed; the test alone was corrected to use a genuinely invalid `/` character and the final exact candidate passed all required gates.
- This change does not add a schema version or dependency and does not implement canonical media ingestion, metadata/artwork extraction, Home UI/API exposure, production authentication, recovery acceptance, release eligibility, or Stable status.

## September 15, 2026 — Authorization-scoped Favorites, Ratings, and Recently Played foundation

- PR #12 merged as authoritative `main` commit `168d19d07e9b32e0089a512b9e6b7964db76ece1`.
- Exact candidate `2721d2b7660763534396be4017ab9c18e47078da` passed Music CI `35025974258` and Platform Contract `35025974812`.
- Post-merge `main` passed Music CI `35026228206` and Platform Contract `35026228918`.
- Added profile-owned Favorite set/clear and bounded listing operations using the existing `favorites` application-state entity.
- Added profile-owned 0–100 Rating set/read/clear operations using the existing `ratings` entity.
- Added profile-owned Recently Played event persistence and bounded recent-history listing using the existing `play_history` entity.
- Recording-scoped state operations require current library read authorization. Favorite/history retrieval re-evaluates membership so revoked library access is suppressed from normal Music surfaces.
- Tests cover default denial, explicit access grants, cross-profile isolation, independent rating state, authorization-revocation suppression, validation bounds, race testing, and service build.
- This change does not add a schema version or dependency and does not implement Recently Added, canonical media ingestion, product APIs, production authentication, recovery acceptance, release eligibility, or Stable status.

## September 15, 2026 — Markdown-first documentation alignment

- Repository documentation now points to the canonical Markdown product specification at `GoreeCloud/Projects/Project Specification — Music.md` and the Drive Markdown roadmap at `GoreeCloud/Feature Roadmap/GoreeCloud Music/FEATURE-ROADMAP.md`.
- `README.md`, `SPECIFICATIONS.md`, and `USER-MANUAL.md` are aligned with verified Milestone 1 persistence/authorization and scanner/reconciliation foundations.
- The duplicate repository product-specification mirror was retired so the governed Drive Markdown specification remains the single product-scope authority while `SPECIFICATIONS.md` remains repository-coupled implementation documentation.
- This documentation alignment does not change implementation state, complete Milestone 1, authorize release promotion, or establish Stable status.

## September 15, 2026 — Milestone 1 source-preserving scanner foundation

- PR #9 merged as authoritative `main` commit `ac42ebc6f5fe3143c0cbc77cd6c3fce7397f44ac`.
- Exact candidate `a6579a7e029881ef80d8d202833de19deceb2da4` passed Music CI `35019904248` and Platform Contract `35019905704`.
- Post-merge `main` passed Music CI `35020139101` and Platform Contract `35020140030`.
- Schema version 3 adds durable `library_files` observations for source-preserving reconciliation.
- Supported-audio discovery avoids symbolic-link traversal and source-media mutation.
- Reconciliation distinguishes Added, Updated, Unchanged, Missing, and Restored observations; missing files are tombstoned rather than silently deleting identity.
- File-state listing requires read permission; scanning/reconciliation requires edit permission.
- Metadata/artwork extraction, canonical media ingestion, event-driven filesystem watching, library/search APIs, production recovery acceptance, and Milestone 1 completion remain open.

## September 15, 2026 — Scanner documentation reconciliation

- PR #10 reconciled `FEATURES.md`, `FEATURE-ROADMAP.md`, `NOTES.md`, and `docs/architecture/milestone-1.md` with the verified PR #9 implementation state.
- Exact documentation candidate `124b6f2c152878dcfbfa0778694ef37c2d5735a1` passed Music CI `35020559103` and Platform Contract `35020560112`.
- Merged documentation commit `4cdf5290a6fc71a95e759a5cf4f37b3bf9e816e0` passed post-merge Music CI `35021367454` and Platform Contract `35021370055`.

## September 15, 2026 — SQLite persistence and per-user library authorization foundation

- PR #7 merged as `564ac6a792070996dc39b103232c39b4fca95074`.
- Added SQLite Development application-state persistence, explicit `library_memberships`, profile/library persistence, owner protections, and schema-v1 owner-membership preservation during migration to schema v2.
- Post-merge Music CI `35017128457` and Platform Contract `35017129147` passed.
- Production persistence qualification, corruption/recovery evidence, and Everkeep-aligned recovery acceptance remain open.

## September 15, 2026 — Milestone 0 native architecture foundation

- PR #2 established the native Go architecture foundation, core domain identities, provider/authorization contracts, exact-match routing, queue identity, initial API contract, repository baseline, and CI foundation.
- PR #5 completed the bounded Milestone 0 storage/migration and Contract 0.2 reconciliation as `16a1a9b11cb8d6e06f7cf02fe7eedbb4725e7eda` after exact-head CI `34946346848` and Platform Contract `34946347663` passed.
- PR #6 synchronized the repository roadmap after the verified Milestone 0 merge.
