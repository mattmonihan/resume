# Portfolio promo video

A 23.4 second kinetic-type promo cut to "Slinky Badass" (americaamerica). Every cut lands on a beat of the song at 110.06 BPM.

| File | Size | Use |
|---|---|---|
| `out/matt-monihan-promo-1080x1080.mp4` | 1080x1080 | LinkedIn feed |
| `out/matt-monihan-promo-1080x1920.mp4` | 1080x1920 | Reels, Shorts, Stories |
| `out/matt-monihan-promo-1920x1080.mp4` | 1920x1080 | mattmonihan.com, YouTube |

## Structure

The audio is song time 1:08.55 to 1:31.99. That covers 43 beats, and the clip ends where the song's bass drops out.

| Beats | Song section | On screen |
|---|---|---|
| 1-4 | breakdown | PDFS. / SPREADSHEETS. / COPY. / PASTE. The screen goes black for the last 0.13s before the drop |
| 5-8 | drop | Blue flash, then MATT / MONIHAN over the headshot |
| 9-12 | | I BUILD THINGS / THAT MOVE / INFORMATION |
| 13-16 | | Voyager Scientific, Aquifer, ResponseVault, Automation Tactics |
| 17-20 | | Hunts Point bid: $405M, 10,000+ pages, one AI agent, page cited |
| 21-24 | | Billing time 20 min to 3 min, -85%, $45K saved a year |
| 25-28 | | RJMetrics: employee #10, 1 hour to under 5 min, acquired by Magento |
| 29-32 | | Write it down. Train the people. Turn on the tools you already pay for. |
| 33-36 | | DON'T / DO / ROBOT / WORK. |
| 37-43 | break | End card: name, mattmonihan.com, linkedin.com/in/mattmonihan |

## Where each claim comes from

- Headline and #norobotwork: LinkedIn profile and posts from September 2026.
- Ventures, the "Build things that move information" line and the location: mattmonihan.com.
- Hunts Point bid ($405M job, a document set past 10,000 pages, the agent cited the page): LinkedIn post of 2026-09-08.
- Write it down, train the people, turn on the tools: LinkedIn post of 2026-09-15.
- 20 min to 3 min, 85%, $45,000 a year: First Children testimonial in `matt-monihan-resume.tex`.
- Employee #10, the report builder going from 1 hour to under 5 minutes, and the Magento acquisition: `matt-monihan-resume.tex`.

The label "EVERY ANSWER TRACED TO ITS SOURCE" on beat 20 paraphrases the post, which says the agent cited the page for each question.

## Re-rendering

`index.html` draws any frame with `render(t)`. `render.mjs` steps through the frames in headless Chromium and pipes them to ffmpeg.

```bash
pip install imageio-ffmpeg          # provides an ffmpeg with libx264, or set FFMPEG=/path/to/ffmpeg
node render.mjs --w 1080 --h 1080 --out out/matt-monihan-promo-1080x1080.mp4
node render.mjs --w 1080 --h 1080 --stills 2.3,8.5 --out stills   # PNG stills for review
```

Edit the `CARDS` array in `index.html` to change the words. Each entry starts on beat `k` and holds for `n` beats.
To preview a frame in a browser, open `index.html?w=1080&h=1080&t=8.5`.
