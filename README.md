# Chiro Core

One-page website for [Chiro Core](https://www.youtube.com/@ChiroCore), the YouTube channel that breaks down real chiropractic and osteopathic cases (1.04M subscribers, 350M+ views, United Kingdom, creating since July 2016). Plain HTML, CSS and JavaScript. No build step, no libraries.

```
index.html      page markup (hero, topics, spine, situations, videos, how it works, about, FAQ, contact)
css/style.css   design tokens at the top, then one block per section
js/spine.js     draws the glass spine illustration as SVG
js/main.js      video list, card fan, filters, video player, contact form, floating bar
images/         WebP photos in 2–3 sizes each (see CREDITS.md)
vercel.json     browser caching rules for Vercel
```

## What was built from the template

Same structure as the reference design: soft grey rounded cards, one lime accent, two-tone headings, a floating glass header, a tilted card fan, a glowing centre model with rings and four labelled regions, a row of situation cards over a giant watermark word, and a dark floating call-to-action bar. The dentistry content was replaced with chiropractic content, and the 3D implant model with a glass spine drawn in SVG (hover a region and that part of the spine lights up).

## Where to edit

| What | Where |
| --- | --- |
| Videos (title, views, length, topic) | `VIDEOS` list at the top of `js/main.js` |
| Colours, fonts, spacing | `:root` block at the top of `css/style.css` |
| Spine shape and colours | `CENTERLINE` and the gradients in `js/spine.js` |
| Email, social links | search for `chirocoreco@gmail.com` and the four social URLs in `index.html` and `js/main.js` |
| Channel numbers (1.04M, 350M+, 63) | `data-count` attributes in `index.html` |

### Adding a video

Add one line to `VIDEOS` in `js/main.js`. The `id` is the part after `v=` in the YouTube link. The thumbnail loads from YouTube automatically. For faster loading, add `images/v-<id>-480.webp` and `images/v-<id>-800.webp` (any `-` in the id becomes `_` in the file name).

## Please confirm with the client before launch

- **What Chiro Core is.** The site describes it as an educational video channel, not a clinic, and the FAQ says appointments can't be booked here. The YouTube page describes a channel, so that is what the copy reflects. If the client does treat patients or take bookings, the FAQ answer, the "Get in touch" wording and the contact form need updating.
- **Email address.** `chirocoreco@gmail.com` was supplied for the contact details.
- **Video list.** 20 real videos were picked from the channel, with views and lengths read from YouTube in October 2026. They will drift over time, which is why the page says "as shown on YouTube in October 2026".
- **Practitioner credits.** The site says the videos feature chiropractors and osteopaths from around the world, taken from the channel description, but names none of them. Add names only with their permission.
- **Photos.** Almost all photos are free Unsplash photos (see `CREDITS.md`). One image (`images/c-back-*.webp`, the glowing spine on the "Lower back pain" card) came from the files supplied for this project and its licence is unknown. Replace it with a licensed image if in doubt.
- **Medical wording.** Copy is educational, avoids promising results, and links to a medical disclaimer in the footer. Keep it that way if you edit the text.

## Contact form

There is no server. When someone sends the form it checks the fields, then opens their email app with the message addressed to `chirocoreco@gmail.com`. To receive messages without an email app (for example from phones with no mail set up), connect a form service such as Formspree or Netlify Forms and post the form to it instead.

## Before going live

- Add the real domain to the `<head>`: a `<link rel="canonical">` and `og:url` / `og:image` tags. A social-preview image needs an absolute URL, so it can only be added once the domain is known.
- Videos play inside the page from `youtube-nocookie.com` only after a visitor presses play. Fonts load from Google Fonts.

## Deploy

1. GitHub: new repository → "uploading an existing file" → select all 7 items in this folder → drag them in → wait until it shows all files → Commit.
2. Vercel: vercel.com/new → import the repository → Framework Preset **Other**, no build command, no output directory → Deploy.
