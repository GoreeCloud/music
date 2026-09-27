# GoreeCloud Music — Implemented Features

> **Authority:** Repository-native implemented-feature record, seeded from existing `FEATURES.md`.

## GoreeCloud Music — Features and Implementation State

## Implemented in merged source foundations

### Milestone 0 architecture foundation

- Typed domain identities for recordings, releases, source items, playable assets, queue items, profiles, and libraries.
- Source-kind and match-confidence models.
- Derived availability state with independent source identity.
- Provider adapter and registry contracts.
- Authorization request/decision contract.
- Deterministic playback route-selection core with no automatic non-exact substitution by default.
- Stable queue-item model carrying recording/source/route context.
- Engine-neutral application-state schema and forward-only migration contract.
- Minimal Development service with health and build-information endpoints.
- OpenAPI Development contract for implemented endpoints plus separately declared planned API domains.
- Machine-readable GoreeCloud Platform Contract state that does not claim unimplemented integrations.
- Unit tests and GitHub Actions CI definition.

### Milestone 1 persistence and library-authorization foundation

Merged PR #7 establishes the current Development source foundation for:

- SQLite application-state persistence through Go `database/sql` and `modernc.org/sqlite`.
- Logical schema version 2 with explicit `library_memberships`.
- Profile and library persistence.
- Atomic owner membership when a library is created.
- Explicit read, edit, and owner membership evaluation.
- Fail-closed owner downgrade and implicit ownership-grant protections.
- Absolute library-root validation while original media remains outside ordinary database state.
- Schema-v1 to schema-v2 migration that transactionally preserves existing library-owner authorization.
- Persistence across database reopen and explicit default-deny/grant behavior tests.
- Storage-aware `/healthz` behavior.
- Configurable local Development database path through `GOREECLOUD_MUSIC_DB`.

PR #7 merged to `main` as `564ac6a792070996dc39b103232c39b4fca95074`. Post-merge CI `35017128457` and Platform Contract `35017129147` passed on that authoritative revision.

### Milestone 1 library scanning and file-reconciliation foundation

Merged PR #9 extends the Development library foundation with:

- Logical schema version 3 and durable `library_files` filesystem observations.
- Forward migration from schema v2 to v3 without changing existing library authorization facts.
- Supported-audio discovery for FLAC, WAV, AIFF/AIF, AAC, M4A, MP3, Opus, Ogg, and Oga extensions.
- No symbolic-link traversal and rejection of a symbolic-link library root.
- Source-preserving scanning that does not write, rename, move, delete, or rewrite media files.
- Library-relative path validation that rejects paths escaping the configured library root.
- Deterministic scan reconciliation for Added, Updated, Unchanged, Missing, and Restored file states.
- Missing-file tombstones through `missing_since` instead of silent identity deletion.
- Read permission for library-file listing and edit permission for scan/reconciliation operations.
- Tests covering discovery, source preservation, authorization isolation, file change/missing/restore behavior, unsafe-path rejection, and schema-v2 to schema-v3 migration.

PR #9 merged to `main` as `ac42ebc6f5fe3143c0cbc77cd6c3fce7397f44ac`. Its exact candidate `a6579a7e029881ef80d8d202833de19deceb2da4` passed CI `35019904248` and Platform Contract `35019905704`; post-merge `main` passed CI `35020139101` and Platform Contract `35020140030`.

### Milestone 1 profile-state foundation

Merged PR #12 adds persistent, profile-owned state for authorized recordings:

- Favorite set/clear operations and bounded favorite listing.
- 0–100 rating set/read/clear operations.
- Recently Played event persistence and bounded recent-history listing.
- Current library-read authorization checks for recording-scoped state mutations and direct rating reads.
- Membership-filtered Favorites and Recently Played queries so revoked library access suppresses stale state from normal Music surfaces.
- Per-profile state isolation when multiple profiles can read the same library.
- Validation for ratings, history timestamps/durations, and result limits.
- Focused tests covering default denial, cross-profile isolation, explicit access grants, authorization revocation, validation, race testing, and service build.

PR #12 merged to `main` as `168d19d07e9b32e0089a512b9e6b7964db76ece1`. Exact candidate `2721d2b7660763534396be4017ab9c18e47078da` passed CI `35025974258` and Platform Contract `35025974812`; post-merge `main` passed CI `35026228206` and Platform Contract `35026228918`.

### Milestone 1 Recently Added query foundation

Merged PR #14 adds a bounded, authorization-scoped Recently Added library view:

- Newest-first canonical recording retrieval using existing `recordings.added_at` state.
- Recording ID, library ID, title, artist, and added timestamp in the returned view.
- Current `library_memberships` filtering so profiles see only libraries they may currently read.
- Authorization-revocation suppression without deleting underlying recording/library state.
- Deterministic recording-ID tie breaking and bounded result limits.
- Focused tests covering ordering, cross-library isolation, explicit grants, authorization revocation, malformed profile IDs, and limit validation.

PR #14 merged to `main` as `c20acc1a92ee71ee4173468d97a5980ccf396013`. Exact candidate `8058489efbaafcfd95fbe1b6144a4eb6bc909c6d` passed CI `35028058553` and Platform Contract `35028059131`; post-merge `main` passed CI `35028245616` and Platform Contract `35028246120`.

### Milestone 1 embedded metadata foundation

Merged PR #16 adds a bounded read-only metadata layer between scanner observations and canonical media materialization:

- Logical schema version 4 with `library_file_metadata` keyed to durable scanner `file_id` identity.
- MP3 ID3v2.3/v2.4 textual metadata extraction for title, artist, album, album artist, genre, date/year, track number, and disc number.
- FLAC Vorbis Comment extraction for the same bounded normalized field set.
- Source-size and nanosecond-mtime snapshot binding so stored metadata can be marked stale after source changes or missing-file tombstones.
- Edit permission for extraction/persistence and read permission for retrieval.
- Rooted source access through Go `os.Root`, explicit symbolic-link rejection, regular-file checks, and snapshot verification before parsing and again before persistence.
- Bounded parser limits and explicit malformed/unsupported-container failures without creating canonical Recording/Release identity.
- Schema-v3 → v4 migration coverage plus persistence, authorization, staleness, malformed-input, unsupported-container, and symlink-substitution tests.

PR #16 exact candidate `fc9613d94493e2d5c355f3aba7b6bd2a24a2d334` passed Music CI `35030658032` and Platform Contract `35030658657`. It merged as authoritative `main` commit `bc90686a18338afef650b73357f454d1be541afb`, which passed post-merge Music CI `35030857299` and Platform Contract `35030858110`.

### Milestone 1 explicit-identity canonical materialization foundation

Merged PR #18 adds a bounded ingestion boundary from a current scanner/metadata observation into existing canonical application-state entities:

- Caller-supplied validated Recording and Release IDs; no automatic equivalence matching from tag similarity.
- Deterministic GoreeCloud Server Source Item and Playable Asset IDs derived from library identity plus durable scanner `file_id`.
- Library edit/owner authorization re-evaluated inside the transaction.
- Current non-missing scanner state plus current extracted metadata required before materialization.
- Rooted non-symlink source reopening and scanner size/mtime verification before durable commit.
- Atomic Release, Recording, Source Item, and Playable Asset creation/reuse.
- Idempotent exact retries and fail-closed rejection of conflicting canonical IDs, source bindings, or media paths.
- Original media remains unchanged.

PR #18 exact candidate `b46d2628a7fd86db79dc2a0be17945908166a8fd` passed Music CI `35032631291` and Platform Contract `35032632700`. It merged as `f365047f33f732afb1e274cd1d4b4b401271c32a`; post-merge Music CI `35032841324` and Platform Contract `35032841752` passed.

### Milestone 1 bounded media format probing foundation

Merged PR #19 adds source-verified codec/container facts for already-materialized GoreeCloud Server playable assets:

- First-party probing with no new dependency.
- `.mp3` requires actual MPEG Layer III frame evidence, optionally after a validated ID3v2.3/v2.4 prefix; tag-only or non-Layer-III inputs fail closed.
- `.flac` requires the native `fLaC` signature and valid first STREAMINFO block shape.
- `ProbeLibraryFileFormat` re-evaluates library edit/owner permission, current scanner state, exact source-item/asset/path/size binding, rooted source safety, and size/mtime freshness.
- Only `codec` and `container` are persisted on the existing playable asset.
- Unchanged retries are idempotent, and failed probing leaves prior format state untouched.
- Duration, bitrate, sample rate, channels, bit depth, ReplayGain, hashes/integrity, broader formats, playback/transcoding acceptance, and automatic identity matching remain separate work.

PR #19 exact candidate `d3eb0dcf31dce6b1802f0a1d979d628e15ee7a7f` passed Music CI `35034688612` and Platform Contract `35034689104`. It merged as current authoritative `main` `5e59466da23e5800f13f19e377a9e852631276ef`; post-merge Music CI `35034883077` and Platform Contract `35034883624` passed.

## Partial / foundation only

- Native multi-user library: persistent profile/library membership, source-file observation/reconciliation, bounded MP3/FLAC embedded metadata, explicit-identity canonical materialization, bounded MP3/FLAC codec-container probing, profile-scoped Favorites/Ratings/Recently Played, and authorization-scoped Recently Added foundations exist. Approved sidecar metadata, artwork, additional embedded-tag/container formats, automatic identity matching/equivalence policy, broader/background ingestion, richer media probing, filesystem event watchers, complete multi-user isolation across all remaining library paths, and library/search APIs do not.
- Playback routing: decision core exists; actual stream acquisition, codec negotiation, transcoding, and sessions do not.
- Provider architecture: contract and registry exist; no real provider adapters exist.
- Authorization: application and durable library-membership foundations exist; production GoreeCloud Identity/Privacy Shield/Wardveil runtime integration does not.
- API: service shell and operational endpoints exist; product library/search/playback/profile-state APIs are not implemented.
- Queue: domain/schema foundations exist; queue service operations, recovery, and multi-device continuity are not implemented.
- Persistence: the SQLite Development backend, schema-v4 scanner/metadata state, explicit-identity materialization, bounded format facts, profile-state operations, and Recently Added query are implemented, but production persistence qualification, corruption handling, export/restore, and Everkeep recovery acceptance remain open.

## Planned

All other items remain governed by `FEATURE-ROADMAP.md` and the authoritative project specification. Roadmap presence is not implementation evidence.
