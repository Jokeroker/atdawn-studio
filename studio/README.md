# At Dawn Studio — producer wrapper for VDO.Ninja

A button-driven control room and a Zoom-simple guest experience, layered on top of a
self-hosted [VDO.Ninja](https://vdo.ninja). **No VDO.Ninja source files are modified** —
everything lives in this `/studio/` folder, so you can update VDO.Ninja itself at any time.

## License & credits

This project builds on **[VDO.Ninja](https://github.com/steveseguin/vdo.ninja)** by
**Steve Seguin**, licensed under the **AGPL-3.0** (see `LICENCE.md` and `AGPLv3.md` in
the repository root). All the real-time video magic is his work — this folder only adds
a workflow wrapper around it.

The `/studio/` wrapper is likewise released under **AGPL-3.0**. The AGPL requires that
modifications to the code stay publicly accessible — hosting this repository publicly
(e.g. on GitHub) satisfies that requirement. If you fork this, please keep this notice,
keep the repo public, and consider [supporting Steve's work](https://github.com/sponsors/steveseguin).

---

## The three pages

| Page | Who uses it | What it does |
|---|---|---|
| `studio/index.html` | everyone | Landing page — pick Guest or Producer |
| `studio/join.html` | guests | Name prompt → camera/mic pick → **waiting room** → green room → moved to broadcast. Simple mic / camera / chat / settings / leave buttons only. |
| `studio/admin.html` | you + admins | Password-protected control room: both rooms as full director views, a guest board with **Admit / Send to broadcast / Mute / Record / Solo link / Kick** buttons, and one-click copy for every link you'll ever need. |

Default admin password: **`atdawn2026`** — change it before your first real event
(Settings → Admin password, then paste the generated line into `studio/config.js`).

## How the flow works

1. **You** open the Control Room and copy the **Guest invite link** (Overview tab).
2. **Guest** opens it, types their name, picks camera/mic, presses START.
3. They land in the **waiting room** (VDO.Ninja "hold" mode): they're connected and your
   team can already see & hear them, but they're isolated from everyone else.
4. On the guest board (or the Green Room director view) press **✚ Admit** — they drop
   into the green room and can talk with your tech team / other guests.
5. When it's showtime press **🚀 Send to broadcast** — they're transferred into the main
   room. Their screen flashes "YOU'RE LIVE" so they always know their status.
6. In OBS, add the **Main broadcast — full mix** link as a browser source, or per-guest
   **Solo link**s if you prefer to build your own layout (one browser source per person,
   with "Control audio via OBS" checked → each guest gets their own audio fader/filters).
7. **⏺ Record** on any guest records their feed to the producer's computer (the browser
   downloads a media file per recording). You can also use the full director view for
   Google-Drive/remote recording options.

Both rooms share one password (required so guests can be transferred between rooms).
Additional producers who open the dashboard automatically join as **co-directors** of
both rooms, so two admins can run green room and broadcast simultaneously.

## Producer communication tools (never reach the stream)

Your voice and messages go through the director connection, which is **never part of an
OBS scene** — the stream cannot hear or see any of this:

- **🎙️ Talk** (per room): your mic to everyone in that room. First use asks for browser
  mic permission. Click again to stop. Classic use: "we're live in 30 seconds" to the
  green room, or producer notes to the on-air panel (audience hears nothing — though if
  a live guest replies out loud, the stream hears *them*).
- **🎧 Whisper** (per guest): IFB-style — only that one guest hears you, even mid-show.
  Automatically turns off any other whisper/room-talk in that room.
- **📣 Cue** (per guest or per room): canned or custom messages that appear as a large
  banner on the guest's screen for ~9 seconds, with a soft chime. Guests never need to
  open a chat window.
- **⏱ Timer** (per room): a countdown appears on every guest's screen; goes red and
  pulses in the last 15 seconds. "Clear timer" removes it.
- **🔇 Mute all / 🔊 Unmute** (per room): panic button for the broadcast, or quiet the
  green room before a cue.

## Guest tools

Guests get: mic, camera, **background blur**, **✋ raise hand** (shows instantly on your
guest board with an amber highlight), chat, settings (device switching), leave.

## Guest board extras

- **Connection dot** on every guest: green/amber/red from live bitrate & packet-loss
  stats — spot a failing connection before your audience does.
- **📝 Notes**: private per-guest notes only producers see ("needs new mic", "intro at
  :15"). Saved in your browser.
- **⏺ Record** now starts instantly (6 Mbps, no dialog). **Auto-record while on air**
  (checkbox in the OBS card) starts a recording the moment any guest lands in the main
  room; files download to the producer's computer.
- **Name labels on OBS mixes** (checkbox): re-copy the scene links to include guest
  name overlays.

## Deploying

This folder deploys with the rest of VDO.Ninja — any static hosting works:

- **GitHub Pages** (easiest, free, SSL included): fork/push this whole repo and enable
  Pages, exactly as described in the tutorial video / `install.md`. Your links become
  `https://<you>.github.io/<repo>/studio/admin.html` etc.
- **Nginx / your own server**: follow `install.md` in the repo root. The `/studio/`
  folder needs no special server config.

Two rules:

1. **HTTPS is required** (browsers refuse camera access otherwise). `http://localhost`
   is fine for testing.
2. Keep `/studio/` on the **same domain** as VDO.Ninja (it ships inside the repo, so it
   is by default). The dashboard and guest status detection read state from the embedded
   frames, which requires same-origin.

## Configuring

Edit `studio/config.js`:

- `brandName` — shown on every page.
- `adminPasswordHash` — SHA-256 of the dashboard password (generate in Settings).
- `vdoPath` — leave as `"../"` unless you moved the folder.
- `defaults` — the event preset (room names, room password) used on first run.
  Day-to-day changes are done in the dashboard's Settings tab and are stored in the
  producer's browser (localStorage), no server edits needed.

## Notes, honestly

- The admin login is a **front gate, not a vault**: this is a static site, so the real
  security is the room password + which links you share. Use unguessable room IDs and
  passwords (the "New event" button generates them), and don't share the admin page URL
  publicly.
- Guest links embed the room password by default for one-click joining. Tick
  *"Guests must type the event password"* to keep it out of the link instead.
- Talking to green-room guests: open the **Green Room** tab and use the director's
  mic/"press to talk" controls — you're a real VDO.Ninja director there, with every
  advanced control (audio gain, EQ, quality, scenes, hand-raise, chat…).
- Recording quality: director-side recording captures the live stream. For mission
  critical audio, VDO.Ninja pro tip — ask guests to also record locally, or use the
  director view's per-guest recording options.
- Updating VDO.Ninja later: replace everything except the `/studio/` folder.
