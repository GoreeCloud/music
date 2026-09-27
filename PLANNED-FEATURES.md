# GoreeCloud Music — Planned Features

> **Authority:** Repository-native planned-feature record. The former Drive roadmap is retired after verified migration.

---
title: "GoreeCloud Music — Feature Roadmap"
document_type: "Feature Roadmap"
status: "Active"
version: "v1.6"
classification: "Internal"
last_updated: "2026-09-15"
application: "GoreeCloud Music"
canonical_repository: "GoreeCloud/goreecloud-music"
repository_control: "PLANNED-FEATURES.md"
drive_location: "GoreeCloud/Feature Roadmap/GoreeCloud Music/PLANNED-FEATURES.md"
authoritative_project_record: "GoreeCloud/Projects/Project Specification — Music.md"
---

# GoreeCloud Music — Planned Features

> **Control:** Roadmap presence is not implementation evidence. Repository source/test/release/runtime evidence controls implementation-state claims.

| Application / Service | GoreeCloud Music |
| --- | --- |
| Authoritative project record | Project Specification — Music.md |
| Canonical repository | GoreeCloud/goreecloud-music |
| Repository control | PLANNED-FEATURES.md |
| Drive location | GoreeCloud/Feature Roadmap/GoreeCloud Music/PLANNED-FEATURES.md |
| Internal version | v1.6 |

## Purpose

This document is the repository-side feature roadmap control for GoreeCloud Music. It records current planned and recommended feature work without replacing the authoritative project record, repository implementation evidence, release gates, or GoreeCloud Tasks Management. It must remain materially 

## Roadmap

| ID | Feature / obligation | Priority | Current state |
| --- | --- | --- | --- |
| FR-001 | Reconcile and maintain every current planned or recommended GoreeCloud Music feature against the authoritative project record, repository evidence, and applicable platform requirements. | High | Ongoing control |
| FR-002 | Move actionable feature obligations into GoreeCloud Tasks Management when required, avoiding duplicate task authority. | High | Ongoing control |
| FR-003 | Do not mark features implemented, complete, cancelled, or superseded without authoritative evidence and lifecycle reconciliation. | High | Ongoing control |
| FR-004 | Maintain GoreeCloud Music as an original GoreeCloud-owned native application using Navidrome/OpenSubsonic as references or compatibility targets rather than a permanent complete-application foundation. | High | Planned / governing architecture |
| FR-005 | Deliver a unified music experience combining authorized GoreeCloud Server libraries with optional approved online discovery/playback sources while preserving provider boundaries. | High | Planned; YouTube portion proposed |
| FR-006 | Implement first-class source identity metadata and compact Glaze UI source indicators for GoreeCloud Server, proposed YouTube, Internet Radio, and future explicitly supported providers. | High | Planned |
| FR-007 | Implement availability metadata independent from source, including Online, Offline, Downloaded, Cached, and Unavailable states. | High | Planned |
| FR-008 | Present source and availability metadata throughout Now Playing, mini-player, queue, search, menus, mixed playlists, Credits, and download management without relying on color alone. | High | Planned |
| FR-009 | Implement smart playback routing that prefers an exact downloaded copy, then authorized server copy, then approved online source according to user preference without silent recording substitution. | High | Planned |
| FR-010 | Implement unified search across private libraries and approved online sources with All, Server, YouTube, Downloaded, and Offline scopes where available. | High | Planned; YouTube scope proposed |
| FR-011 | Implement self-hosted multi-library music storage, authorization, incremental scanning, filesystem change detection, embedded/sidecar metadata, artwork, favorites, ratings, recently added/played, and persistent queues. | High | In progress — PR #7 merged and post-merge validated the SQLite application-state and per-user library-authorization foundation. PR #9 merged schema-v3 `library_files`, supported-audio discovery, source-preserving Added/Updated/Unchanged/Missing/Restored reconciliation, missing-file tombstones, no-symlink scanning, and permission-gated file-state access as `ac42ebc6f5fe3143c0cbc77cd6c3fce7397f44ac`; post-merge Music CI `35020139101` and Platform Contract `35020140030` passed. PR #12 merged authorization-scoped Favorites, Ratings, and Recently Played persistence with default-deny, cross-profile isolation, explicit-grant, and authorization-revocation coverage as `168d19d07e9b32e0089a512b9e6b7964db76ece1`; post-merge Music CI `35026228206` and Platform Contract `35026228918` passed. PR #14 merged an authorization-scoped Recently Added query foundation as `c20acc1a92ee71ee4173468d97a5980ccf396013`; post-merge Music CI `35028245616` and Platform Contract `35028246120` passed. PR #16 then merged schema-v4 `library_file_metadata` plus bounded read-only MP3 ID3v2.3/v2.4 and FLAC Vorbis Comment extraction, scanner-snapshot freshness, authorization-gated persistence/retrieval, rooted `os.Root` access, and symlink/staleness protections as `bc90686a18338afef650b73357f454d1be541afb`; exact candidate `fc9613d94493e2d5c355f3aba7b6bd2a24a2d334` passed Music CI `35030658032` and Platform Contract `35030658657`, and post-merge `main` passed Music CI `35030857299` and Platform Contract `35030858110`. PR #17 reconciled repository documentation to that verified state and merged as `5a63ac6b3a5b6a94896b38990083a36621d3dbb8`; post-merge Music CI `35031589360` and Platform Contract `35031589899` passed. PR #18 added an atomic explicit-identity ingestion boundary from current scanner/metadata state into existing Recording, Release, GoreeCloud Server Source Item, and Playable Asset entities without automatic equivalence guessing. Exact candidate `b46d2628a7fd86db79dc2a0be17945908166a8fd` passed Music CI `35032631291` and Platform Contract `35032632700`; merged `main` `f365047f33f732afb1e274cd1d4b4b401271c32a` passed post-merge Music CI `35032841324` and Platform Contract `35032841752`. PR #19 then added bounded source-verified MP3/FLAC codec-container probing for already-materialized playable assets. Exact candidate `d3eb0dcf31dce6b1802f0a1d979d628e15ee7a7f` passed Music CI `35034688612` and Platform Contract `35034689104`; merged `main` `5e59466da23e5800f13f19e377a9e852631276ef` passed post-merge Music CI `35034883077` and Platform Contract `35034883624`. Automatic Recording/Release matching and duplicate-equivalence policy, broader/background ingestion, approved sidecars, artwork, broader embedded formats, duration/bitrate/sample-rate/channel/bit-depth probing, ReplayGain, media hashes/integrity, broader format probing, event-driven change detection, library/search APIs, persistent queues, production recovery acceptance, and remaining Milestone 1 work remain pending. |
| FR-012 | Support FLAC, ALAC, WAV, AIFF, AAC, MP3, Opus, and Ogg Vorbis with original-quality/lossless playback where supported, HTTP range streaming, gapless playback, normalization, crossfade, buffering, and adaptive transcoding. | High | Planned |
| FR-013 | Implement Efficient, Balanced, Lossless, and Original Quality profiles with connection-aware policies and codec/bitrate/bit-depth/sample-rate/channel/transcode diagnostics. | High | Planned |
| FR-014 | Build Advanced Now Playing as a signature Glaze UI experience with artwork, source, availability, quality, transport, queue, lyrics, Credits, device, volume, sleep timer, and contextual actions. | High | Planned |
| FR-015 | Implement persistent mini-player and desktop floating/capsule player with platform-appropriate always-on-top behavior and accessible Glaze UI motion/effects. | Medium | Planned |
| FR-016 | Implement optional online music discovery including recommendations, trending music, Quick Picks, new releases, charts, genres, moods, decades, related music, radios, and mixes with explicit source identity. | Medium | Planned |
| FR-017 | Implement Home experiences including Made For You, Recently Played, Continue Listening, Heavy Rotation, Forgotten Favorites, Recently Added, Jump Back In, Daily Mixes, Family Favorites when authorized, Recommended Albums/Artists, and Discovery Mixes. | Medium | Planned |
| FR-018 | Implement Explore browsing by genre, mood, decade, release date, high-resolution audio, soundtrack, live release, compilation, and other useful categories. | Medium | Planned |
| FR-019 | Implement a local-first private recommendation engine using permitted favorites, ratings, repeats, skips, playlists, artists, albums, genres, years, time, and sequence signals; keep external recommendation providers optional. | High | Planned |
| FR-020 | Evaluate future local audio-analysis signals such as tempo, key, loudness, energy, and acoustic similarity without making them a privacy-invasive or mandatory dependency. | Low | Future planned |
| FR-021 | Implement Song, Artist, Album, Playlist, Genre, Mood, Library, and authorized Family Radio with continuously extended queues and future tuning controls. | Medium | Planned |
| FR-022 | Implement personal, shared, collaborative, family, smart, imported/exported, and optional public-link playlists with search, multi-select, reorder, M3U support, migration, and mixed-source entries. | High | Planned |
| FR-023 | Implement playlist permissions for Private, Shared View, Collaborative, Family, Public Link, expiring/revocable links, and collaborative attribution without bypassing underlying library permissions. | High | Planned |
| FR-024 | Implement smart playlists based on artist, genre, release date, rating, favorites, play/skip count, recent activity, audio quality, source, and downloaded state. | Medium | Planned |
| FR-025 | Implement offline downloads for authorized songs, albums, playlists, artists, and smart playlists while treating user-owned server content as a normal offline capability. | High | Planned |
| FR-026 | Permit external-provider offline copies such as YouTube · Downloaded only when separately verified as technically supported, provider-compliant, licensed/authorized, and lawful. | High | Proposed; approval required |
| FR-027 | Implement Smart Downloads with user-defined storage targets, automatic selection/rotation, and clear manual-versus-automatic attribution. | Medium | Planned |
| FR-028 | Implement a Download and Storage Manager with usage breakdowns, deletion, offline quality, storage limits, Wi-Fi-only behavior, charging-only automation where supported, quotas, and source origin. | Medium | Planned |
| FR-029 | Implement advanced lyrics including embedded, .lrc, sidecar, line-sync, future word-level sync, transliteration, translation, pronunciation assistance, full-screen lyrics, karaoke, and permitted lyric-card sharing. | Medium | Planned |
| FR-030 | Implement rich metadata and Credits covering contributors, label/copyright, ISRC, catalog number, release dates, genre, BPM/key, audio diagnostics, lyrics, artwork, source, and availability. | Medium | Planned |
| FR-031 | Implement private per-user listening history and analytics including recently played, counts, listening time, top content, genre distribution, time-period views, listening-clock views, historical charts, and source breakdown. | Medium | In progress — PR #12 merged profile-scoped Recently Played event persistence and bounded recent-history listing with current library-authorization filtering. Broader counts, listening-time aggregation, rankings/distributions, time-period analytics, charts, and source breakdown remain pending. |
| FR-032 | Implement monthly and annual GoreeCloud Music Recap experiences with shareable Glaze UI recap cards and family-level aggregation only with explicit permission. | Low | Planned |
| FR-033 | Implement Listen Together with invitations, participant list, host/collaborative queue, synchronized playback, and explicit authorization for private tracks. | Medium | Planned |
| FR-034 | Implement independent multi-user profiles, favorites, ratings, history, recommendations, queues, downloads, settings, devices, playlists, smart playlists, and library permissions. | High | In progress — profile/library persistence and explicit membership authorization are merged, PR #12 adds profile-scoped Favorites, Ratings, and Recently Played state with cross-profile isolation and authorization-revocation suppression, and PR #14 adds an authorization-scoped Recently Added library view. Recommendations, queues, downloads, settings, devices, playlists, smart playlists, production identity/session integration, and complete isolation coverage remain pending. |
| FR-035 | Implement Family Music with shared libraries, playlists, radio, optional shared favorites, and privacy boundaries that do not expose private histories to family administrators by default. | High | Planned |
| FR-036 | Implement user-configured Internet Radio with favorites, recent stations, station metadata/artwork when available, and truthful live-stream source semantics. | Medium | Planned |
| FR-037 | Implement import/export and migration for existing music folders, direct upload where appropriate, M3U, application-state export, Navidrome/Subsonic-compatible systems, potential Jellyfin music migration, and future metadata-only Apple/iTunes migration. | Medium | Planned |
| FR-038 | Keep commercial-streaming playlist migration metadata-only unless the user independently has authorization to obtain the underlying audio; migration does not authorize catalog copying. | High | Governing restriction |
| FR-039 | Provide OpenSubsonic compatibility for authorized libraries while keeping the native GoreeCloud Music API and internal architecture authoritative. | Medium | Planned |
| FR-040 | Implement a first-party /api/v1/ Music API for modern authentication/authorization, rich metadata, playback, offline sync, recommendations, radio, source/availability identity, and future features. | High | Planned |
| FR-041 | Deliver a responsive web application and installable PWA behavior where appropriate with keyboard/media-key support, notifications, playlist management, and adaptive Glaze UI. | High | Planned / mandatory delivery |
| FR-042 | Deliver a supported native Linux client/package with desktop integration, media keys, floating player, notifications, and documented release/rollback paths. | High | Planned / mandatory delivery |
| FR-043 | Deliver a first-class native Android application with background playback, media/lock-screen controls, offline downloads, sharing, widgets, dynamic Now Playing, and player/lyrics/queue/Credits gestures. | High | Planned / mandatory delivery |
| FR-044 | Plan a native iOS application that follows the same Music, privacy, security, source identity, and current-Stable Glaze UI contracts. | Medium | Planned |
| FR-045 | Implement Android Auto and plan CarPlay with voice-friendly browsing and driving-appropriate access to favorites, playlists, recent/downloaded music, radio, and recommendations. | Medium | Planned |
| FR-046 | Implement Android TV / Google TV and evaluate later Apple TV, Roku, Chromecast-compatible, AirPlay-compatible, and DLNA/UPnP playback ecosystems with large-screen lyrics and Now Playing. | Medium | Planned / future expansion |
| FR-047 | Implement device/output management for current device, playback transfer, device-specific settings/quality, and future multi-room playback where synchronization is supported. | Medium | Planned |
| FR-048 | Support individually controllable optional integrations such as scrobbling, Discord Rich Presence, artwork, metadata, lyrics, discovery, and recommendation providers without making them mandatory dependencies. | Medium | Planned |
| FR-049 | Enforce privacy-by-default behavior: no advertising identifiers, no required third-party tracking, minimized telemetry, provider controls, private listening data, operational/history separation, and local recommendations by default. | High | Planned / mandatory platform contract |
| FR-050 | Enforce Wardveil Security requirements for authentication, sessions, authorization, user isolation, administration, sharing, downloads, abuse controls, secure secret handling, safe failure, and release evidence. | High | Planned / mandatory platform contract |
| FR-051 | Integrate GoreeCloud Identity, Search, Notify, Manager, Everkeep, Wardveil Security, Privacy Shield, and Glaze UI through their authoritative contracts without bypassing Music authorization or privacy boundaries. | High | Planned / platform integration |
| FR-052 | Provide supported Docker and Podman/OCI delivery for the self-hosted/server component where containerization applies, with documented storage, backup, upgrade, rollback, monitoring, and recovery. | High | Planned / mandatory delivery |
| FR-053 | Keep source and availability as independent extensible track metadata so future providers can be added without redesigning the user-facing state model. | High | Planned / governing data model |
| FR-054 | Keep proposed YouTube integration optional and gated by technical feasibility, provider policy, licensing/authorization, privacy, security, legal review, failure behavior, and replacement-path documentation. | High | Proposed; approval required |
| FR-055 | Maintain current-Stable Glaze UI conformance across every GoreeCloud-controlled Music interface as a mandatory Stable release gate. | High | Ongoing release control |
| FR-056 | Maintain Everkeep-aligned backup/recovery and preservation for required application state while keeping original music files independent from application database state. | High | Planned / mandatory platform contract |
| FR-057 | Define canonical Recording, Release, Source Item, and Playable Asset identities so automatic routing cannot silently substitute remasters, live versions, edits, covers, or other materially different recordings. | High | Planned / governing data model |
| FR-058 | Implement an explicit match-confidence model such as Exact, Equivalent, Alternate, and Unknown; allow automatic rerouting only for Exact matches unless the user authorizes broader substitution. | High | Planned |
| FR-059 | Implement a generic source-provider adapter contract for provider identity, search/browse, playback, seek/range behavior, quality, metadata/artwork, lyrics, authentication, quota/rate behavior, health, and offline capability. | High | Planned |
| FR-060 | Keep proposed YouTube support behind the same provider-adapter contract and prohibit privileged provider-specific bypasses around Music authorization, privacy, source identity, or download rules. | High | Proposed; approval required |
| FR-061 | Implement a concrete availability state machine whose derived user-facing states remain Online, Offline, Downloaded, Cached, or Unavailable while source identity stays independent. | High | Planned |
| FR-062 | Differentiate durable Downloaded assets from temporary Cached assets and remove offline-ready claims when a local asset is corrupt, incomplete, expired, or unauthorized. | High | Planned |
| FR-063 | Implement a deterministic playback decision engine using explicit queue/source intent, exact identity, local availability, authorization, user source preference, network state, provider capability, and quality policy. | High | Planned |
| FR-064 | Provide a user-visible explanation for playback routing and quality decisions such as Downloaded copy selected, Preferred server source, Explicit provider source, source unavailable, or transcoding required. | Medium | Planned |
| FR-065 | Persist queue entries with stable queue identity, recording identity, source item identity, requested source, selected route, and route reason while rechecking authorization at playback time. | High | Planned |
| FR-066 | Implement source-preserving federated search with bounded provider timeouts, local-first/privacy-safe ranking, graceful partial results, and grouped-but-inspectable equivalent source variants. | High | Planned |
| FR-067 | Implement durable offline-asset manifests containing source/recording/asset identity, codec/quality, size, integrity verification, owner profile, manual-vs-smart attribution, and lifecycle state without embedding reusable secrets. | High | Planned |
| FR-068 | Implement integrity verification and lifecycle management for downloaded and cached assets, including eviction rules, corruption handling, storage protection, and revalidation where required. | High | Planned |
| FR-069 | Implement transparent playback-quality negotiation across user profile, client capability, source capability, connection policy, server load, and transcode capability while avoiding unnecessary transcoding. | Medium | Planned |
| FR-070 | Implement multi-device synchronization and playback continuity for user metadata, playlists, preferences, queue state, and applicable position/history while keeping downloads device-local by default. | High | Planned |
| FR-071 | Add a privacy-preserving Private Listening / Private Session mode that can exclude eligible playback from recommendation and ordinary history surfaces without bypassing required security or operational records. | Medium | Planned |
| FR-072 | Design GoreeCloud Manager observability around scanner health, storage, stream counts, aggregate transcode load, provider health, cache/download health, API latency, and errors without exposing private listening content by default. | High | Planned / privacy requirement |
| FR-073 | Implement source-scoped degraded modes so optional-provider outages, provider authorization failures, rate limits, or policy changes do not prevent local library browsing, authorized offline playback, or unrelated first-party capabilities. | High | Planned |
| FR-074 | Define stable native API domains for libraries, recordings, releases, source items, sources, search, playback sessions, queues, playlists, downloads, recommendations, radio, lyrics, devices, history, and sharing. | High | Planned |
| FR-075 | Adopt the documented Milestone 0–8 implementation sequence and require verified source/test evidence before any milestone, feature, or client target is treated as complete. | High | In progress — Milestone 0 is merged. Milestone 1 has verified merged persistence/authorization, source-preserving scanner/reconciliation, profile-state, Recently Added query, and bounded embedded-metadata foundations. PR #16 merged the metadata source foundation as `bc90686a18338afef650b73357f454d1be541afb`; exact candidate `fc9613d94493e2d5c355f3aba7b6bd2a24a2d334` passed Music CI `35030658032` and Platform Contract `35030658657`, and post-merge `main` passed Music CI `35030857299` and Platform Contract `35030858110`. Documentation PR #17 merged as `5a63ac6b3a5b6a94896b38990083a36621d3dbb8`, which passed post-merge Music CI `35031589360` and Platform Contract `35031589899`. PR #18 then merged explicit-identity canonical materialization as `f365047f33f732afb1e274cd1d4b4b401271c32a`, and PR #19 merged bounded MP3/FLAC format probing as current authoritative `main` `5e59466da23e5800f13f19e377a9e852631276ef`; post-merge Music CI `35034883077` and Platform Contract `35034883624` passed on that exact revision. The remainder of Milestone 1 and Milestones 2–8 remain pending. |
| FR-076 | Maintain an acceptance matrix covering multi-user isolation, source disablement, provider failure, offline operation, queue recovery, exact-match routing, cache/download integrity, sync conflicts, accessibility, security/privacy, backup/recovery, and current-Stable Glaze UI. | High | Planned / verification control |

## Maintenance and synchronization

This roadmap and the corresponding Drive `PLANNED-FEATURES.md` must remain materially synchronized with one another and with the authoritative project or service record. Update both copies whenever feature scope, priority, dependency, implementation status, cancellation, supersession, recommendation, or verification state materially changes.

No feature may be represented as complete or Stable solely because it appears in this roadmap. Completion and lifecycle claims require the applicable authoritative implementation, validation, review, release, and production evidence.

## Reconciliation rule

At each material feature change, reconcile this roadmap against the current authoritative project record, repository implementation state, applicable platform-system requirements, and GoreeCloud Tasks Management. Missing obligations, stale status, duplicated work, roadmap drift, or undocumented disposition changes are defects to correct.
