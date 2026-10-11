// Every fact, number and sentence on this site.
// The portfolio-story and portfolio-hire repos carry their own copy of `person` and `facts`:
// when one of those values changes, change it there too.
// Strings may contain <b>…</b> for emphasis; nothing else.

export const person = {
  name: 'Shubhraj Bhartiya',
  first: 'Shubhraj',
  last: 'Bhartiya',
  email: 'shubhrajbhartiya@gmail.com',
  linkedin: 'https://www.linkedin.com/in/shubhraj-bhartiya-2745531b4/',
  github: 'https://github.com/shubhraj5575',
};

// Numbers used in the copy below.
export const facts = {
  supaPRs: 8,
  supaLines: '13,000',
  supaDates: '8–10 Oct 2026',
  factoryPRs: 82,
  greenplatePrize: '₹30,000',
  greenplateUrl: 'https://greenplate-website.vercel.app',
  searchRepo: 'https://github.com/shubhraj5575/hybrid-search-kpi-system',
  jee: 'Top 3%',
  classX: '89.4%',
  classXII: '86.6%',
  gpa: '7.52',
};

// Addresses of the three versions, each its own repo and site. Fill these in once
// the sites are deployed; while a value is empty, no link to that version is shown.
export const sites = { work: '', story: '', hire: '' };

/* ───────── recruiters ─────────
   Order: current role and best shipped work, then the rest of the job,
   founder work, projects, internships, awards, education, contact. */

// `href` alone makes the whole value a link; with `link` it adds a short labelled link after the text.
export type Row = { k: string; v: string; href?: string; link?: string };
export type WorkSection = { id: string; nav: string; glyph: string; no: string; title: string; lead?: string; rows?: Row[] };

export const work: WorkSection[] = [
  {
    id: 'now', nav: 'Now', glyph: 'SHUBH|RAJ', no: '00 — Now',
    title: 'I build <b>AI offices</b> that run on WhatsApp.',
    lead: `${person.name}. Building AI products at ONE Group since 2026. Founder of GreenPlate. B.Tech, Delhi Technological University, class of 2026.`,
  },
  {
    id: 'supa', nav: 'Supa', glyph: 'SUPA', no: '01 — ONE Group · 2026 – now',
    title: 'A whole office, <b>inside a WhatsApp chat.</b>',
    rows: [
      { k: 'Product', v: 'Supa, an AI office that a business owner, their team and invited guests use on WhatsApp.' },
      { k: 'My part', v: 'Supa in WhatsApp groups. A team member approves the group, Supa answers only when tagged, and every group gets its own office, playbook and skills.' },
      { k: 'Shipped', v: `${facts.supaPRs} pull requests, about ${facts.supaLines} lines, ${facts.supaDates}.` },
      { k: 'Team', v: 'Built directly with the founder.' },
    ],
  },
  {
    id: 'systems', nav: 'Systems', glyph: 'ONE', no: '02 — Also at ONE Group',
    title: 'The systems <b>behind the office.</b>',
    rows: [
      { k: 'Software factory', v: `The pipeline that walks a product from wireframe to build. ${facts.factoryPRs} pull requests: cloud runs, ticket checks and build-readiness gates.` },
      { k: 'CRM', v: 'A document manager that reads booking forms and customer PDFs into the CRM, keeps demand and receipt ledgers, and fills letters.' },
      { k: 'Access and login', v: 'Founder-mode access, sign-in and permissions for the whole company app: a permission tree and Maker / Checker / Verifier roles.' },
      { k: 'Helpdesk and tickets', v: 'A customer portal for payments, documents and support tickets.' },
      { k: 'Extraction skills', v: 'Agent skills that pull water and booking data out of raw documents.' },
      { k: 'SupaSmart', v: 'Ingestion prototype for an agentic company OS: an extractor that falls back to the next method when one fails.' },
    ],
  },
  {
    id: 'greenplate', nav: 'GreenPlate', glyph: 'CO2', no: '03 — Founder · 2025 – now',
    title: 'GreenPlate: <b>carbon numbers for food.</b>',
    rows: [
      { k: 'What', v: 'Carbon footprint measurement for India’s food sector, for individuals and for food-service businesses.' },
      { k: 'Live', v: 'greenplate-website.vercel.app', href: facts.greenplateUrl },
      { k: 'Funding', v: `First place and ${facts.greenplatePrize} at E-Cell DTU × Titan Capital.` },
      { k: 'Also', v: 'First prize, proof-of-concept category, DTU Innovation Showcase 2025, among 30+ teams.' },
    ],
  },
  {
    id: 'projects', nav: 'Projects', glyph: 'AI', no: '04 — Projects',
    title: 'Built to be <b>measured.</b>',
    rows: [
      { k: 'Hybrid search', v: 'BM25 + FAISS search behind FastAPI, with a React dashboard for P50 / P95 / P99 latency and NDCG, Recall and MRR.', href: facts.searchRepo, link: 'Code' },
      { k: 'Agents lab', v: 'Eight autonomous-agent systems built in August 2026: a research loop that runs its own experiments, an 11-agent studio that shipped a playable game, and a benchmark for agent quality.', href: person.github, link: 'GitHub' },
      { k: 'Daily briefing', v: 'An n8n workflow with two LLMs that turns 18 articles into a branded real-estate newsletter at 7 AM, across 5 markets.' },
      { k: 'Lead intake agent', v: 'Turns a free-text buyer inquiry into a brief a realtor can act on in one read.', href: 'https://github.com/shubhraj5575/buyer-lead-intake-agent', link: 'Code' },
      { k: 'Cup Ji', v: 'Go-to-market plan for a ready-to-sip tea brand: tiered pricing and a ₹1.5 Cr → ₹50 Cr roadmap over three years.' },
    ],
  },
  {
    id: 'internships', nav: 'Internships', glyph: '10K+', no: '05 — Internships',
    title: 'Ten thousand leads, <b>one pattern.</b>',
    rows: [
      { k: 'Apporio Infolabs', v: 'Product Manager Intern, Jun – Jul 2025. Roadmaps of 8–10 prioritised features across 4 products; wireframes for 2 apps; two-week sprints in JIRA.' },
      { k: 'STBG Academy', v: 'Business Analyst Intern, Jun – Jul 2024. Analysed 10K+ student leads; built 6 KPI dashboards that made reporting 40% faster; improved enrollment forecasting by 15%.' },
    ],
  },
  {
    id: 'awards', nav: 'Awards', glyph: '#1', no: '06 — Awards',
    title: 'Pitched it. <b>Won it.</b>',
    rows: [
      { k: 'B-Plan, DTU', v: 'National Rank 1.' },
      { k: 'DSE Dealmaker’s Conclave', v: 'National Rank 4.' },
      { k: 'Bizmark ’25', v: 'National finalist.' },
      { k: 'JEE 2022', v: `${facts.jee} in both JEE Mains and JEE Advanced.` },
    ],
  },
  {
    id: 'education', nav: 'Education', glyph: 'DTU', no: '07 — Education and leadership',
    title: 'Electronics on paper, <b>people in practice.</b>',
    rows: [
      { k: 'DTU', v: `B.Tech, Electronics and Communication Engineering, 2022 – 2026. GPA ${facts.gpa}.` },
      { k: 'St. John’s Academy', v: `CBSE Class XII ${facts.classXII}, Class X ${facts.classX}.` },
      { k: 'E-Cell DTU', v: 'Corporate Head, 2024 – 2025. 15+ company partnerships and ₹50,000+ in sponsorships.' },
      { k: 'Rotaract DTU', v: 'Director of Rotary Relations, 2024 – now. 12 joint projects with 60+ Rotarians.' },
    ],
  },
  {
    id: 'contact', nav: 'Contact', glyph: 'HI.', no: '08 — Skills and contact',
    title: 'The next shape is <b>yours to suggest.</b>',
    rows: [
      { k: 'AI and automation', v: 'Agentic workflows, n8n, RAG pipelines, LLM APIs, MCP, prompt engineering, FAISS, Pinecone, Supabase.' },
      { k: 'Product and analytics', v: 'GTM strategy, pricing, funnel analysis, A/B testing, SQL, Python, Power BI, Tableau, Excel.' },
      { k: 'Email', v: person.email, href: `mailto:${person.email}` },
      { k: 'LinkedIn', v: 'shubhraj-bhartiya', href: person.linkedin },
      { k: 'GitHub', v: 'shubhraj5575', href: person.github },
    ],
  },
];
