# portfolio-work

The **Work** version of Shubhraj Bhartiya's portfolio. One of three sites, each written for a different reader:
`portfolio-work` (recruiters), `portfolio-story` (personal brand) and `portfolio-hire` (clients).

| | |
|---|---|
| For | Recruiters and hiring teams |
| Look | Paper and ink; thousands of dots that reshape into each section's headline |
| Order | Current role and best shipped work first, then projects, internships, awards, education |

## Where things live

- `src/content.ts` — every fact, number and sentence on the site. Edit here.
- `src/pages/index.astro` — the page.
- `src/styles/work.css` — the look.
- `src/scripts/particles.ts` — the animation.

`person` and `facts` in `src/content.ts` are repeated in the other two repos. When one of those values changes, change it in all three.
`sites` holds the addresses of the three versions; a link to another version appears only once its address is filled in.

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

The build is fully static (Astro), needs no environment variables, and can be hosted anywhere that serves files.
