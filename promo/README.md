# Portfolio promo video

A 23.4 second promo that tells the story in three chapters, cut to "Slinky Badass" (americaamerica) at 110.06 BPM. Scene changes land on downbeats and lines of text rise into place on the beat.

| File | Size | Use |
|---|---|---|
| `out/matt-monihan-promo-1080x1080.mp4` | 1080x1080 | LinkedIn feed |
| `out/matt-monihan-promo-1080x1920.mp4` | 1080x1920 | Reels, Shorts, Stories |
| `out/matt-monihan-promo-1920x1080.mp4` | 1920x1080 | mattmonihan.com, YouTube |

## Structure

The audio is song time 1:08.55 to 1:31.99. That covers 43 beats, and the clip ends where the song's bass drops out.

| Beats | Song section | Scene |
|---|---|---|
| 1-4 | breakdown | COPY. PASTE. RETYPE. REPEAT. One word per beat, stacked. Fades to black in the gap before the drop |
| 5-8 | drop | Headshot with MATT MONIHAN and "I build tools that kill grunt work." |
| 9-16 | | 01 Where I started: employee #10 at RJMetrics, the report builder overhaul (1 hour per analysis to under 5 minutes), acquired by Magento in 2016 |
| 17-24 | | 02 What I built: moved to New York and started Voyager Scientific, Aquifer and ResponseVault |
| 25-32 | | 03 What I do now: Automation Tactics, AI adoption for operations teams, and the $405M bid where one AI agent answered the RFP |
| 33-36 | | DON'T DO ROBOT WORK. |
| 37-43 | break | End card: name, mattmonihan.com, linkedin.com/in/mattmonihan |

Each chapter wipes in from the right. Inside a chapter, scenes cut on the downbeat and keep the chapter label on screen.

## Where each claim comes from

- Headline and #norobotwork: LinkedIn profile and posts from September 2026.
- Ventures, the move to New York and "grunt work": mattmonihan.com.
- Employee #10 in 2011, the report builder going from 1 hour to under 5 minutes, and the Magento acquisition in 2016: `matt-monihan-resume.tex`.
- Hunts Point bid ($405M job, a document set past 10,000 pages, an agent that answered the RFP): LinkedIn post of 2026-09-08.

## Re-rendering

`index.html` draws any frame with `render(t)`. `render.mjs` steps through the frames in headless Chromium and pipes them to ffmpeg.

```bash
pip install imageio-ffmpeg          # provides an ffmpeg with libx264, or set FFMPEG=/path/to/ffmpeg
node render.mjs --w 1080 --h 1080 --out out/matt-monihan-promo-1080x1080.mp4
node render.mjs --w 1080 --h 1080 --stills 2.3,8.5 --out stills   # PNG stills for review
```

Edit the `SCENES` array in `index.html` to change the story. Each scene starts on beat `k` and lasts `n` beats, and each element appears `at` beats into its scene.
To preview a frame in a browser, open `index.html?w=1080&h=1080&t=8.5`.
