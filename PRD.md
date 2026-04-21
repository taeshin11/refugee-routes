# Refugee Routes — PRD

> Short Title: Track Where Conflict Displaces People and Where They Go
> Last Updated: 2026-04-14

---

## Overview

Refugee Routes is a human displacement intelligence platform that visualises the flow of refugees and internally displaced persons (IDPs) from conflict zones to destination countries. In a world where tens of millions of people are forcibly displaced at any given time, understanding who is moving, from where, to where, and in what numbers is essential for journalists, policymakers, humanitarian organisations, and the general public. Refugee Routes makes this data accessible, visual, and searchable.

The platform is built around two complementary perspectives: the origin view and the destination view. Origin pages (e.g. Ukraine, Gaza, Sudan, Myanmar) show where people are fleeing from, how many have been displaced, where they are going, and what conditions are driving the displacement. Destination pages (e.g. Germany, Poland, Egypt, Turkey) show who is arriving, where they have come from, how many, and what the reception context looks like. A flow model connects these two perspectives, enabling users to trace specific displacement corridors.

The site fills a genuine gap between dense UNHCR statistical reports (which are comprehensive but inaccessible) and fragmentary news coverage (which covers individual stories but not systemic patterns). By presenting displacement data in a clean, fast, multilingual interface with clear visualisations, Refugee Routes serves as both a research resource and a public information tool — one that respects the dignity of displaced people while providing structured intelligence to those who need it.

---

## Target Users & Pain Points

| User Type | Pain Point | How This Solves It |
|---|---|---|
| Humanitarian aid worker / NGO planner | Needs to know displacement volumes and destination countries to plan operations | Origin pages with destination breakdown and flow volumes |
| Journalist covering migration/conflict | Needs quick data on where refugees are going from a specific country | Origin pages with destination list, flow numbers, and trend context |
| Policy researcher / government analyst | Needs comparative data across displacement crises | Multi-origin and multi-destination data in consistent JSON schema |
| Destination country citizen / voter | Wants to understand refugee arrival numbers and origins in their country | Destination pages showing all origin flows and cumulative arrivals |
| Teacher / student | No single free visual resource for displacement data by conflict | Free, multilingual, structured platform with clear sources |
| Diaspora community member | Wants to find information about displacement from their home country | Origin pages with context, numbers, and destination options |

---

## Tech Stack

- Framework: Next.js 15 (App Router, SSG)
- Styling: Tailwind CSS
- i18n: next-intl (8 languages: en, ar, fr, uk, de, es, tr, sw)
- Data: JSON files in /public/data/ (countries.json, flows.json)
- Charts: Recharts (sankey/flow chart, bar charts, trend lines)
- Map: react-simple-maps (optional origin/destination map overlay)
- Ads: Adsterra + Google AdSense ca-pub-7098271335538021
- Deployment: Vercel free tier
- Domain: refugee-routes.vercel.app

---

## Pages & Routes

### `[locale]/` — Homepage
- Hero: "Refugee Routes — Tracking Displacement from Every Conflict Zone"
- Global displacement overview: total displaced persons figure, number of active crises
- Top origin countries by displacement volume (top 10 table or cards)
- Top destination countries by arrivals (top 10 table or cards)
- Largest individual flow corridors (e.g. Ukraine → Poland: 1.4M)
- Recent updates to flow data
- Language switcher
- CTA links to origin/[slug] and destination/[slug] pages

### `[locale]/origin/[slug]/` — Origin Country Page
- Country name, flag, conflict context badge (e.g. "Active War", "Civil War", "Persecution")
- Total displaced from this country (UNHCR estimate, with date)
- Breakdown: refugees abroad vs. internally displaced (IDPs)
- Displacement driver summary (2–3 sentence conflict context)
- Destination breakdown table:
  - Destination country name and flag
  - Number of arrivals
  - % of total displaced
  - Primary route (land / sea / air)
  - Reception status (open / restricted / closed)
- Flow trend chart (monthly displacement volumes over past 12 months)
- Key displacement driver events (chronological list)
- Related origin countries (same conflict or same region)
- SEO title: "[Country] Refugees 2026 — Where Are They Going? | Refugee Routes"

### `[locale]/destination/[slug]/` — Destination Country Page
- Country name, flag, total refugees/asylum seekers hosted
- Reception policy status (open / partial / restrictive / closed)
- Origin breakdown table:
  - Origin country name and flag
  - Number hosted
  - % of total hosted population
  - Arrival trend (rising / stable / falling)
- Historical arrivals trend chart (monthly)
- Integration context summary (camps vs. urban, legal status, work rights)
- Related destination countries (same region or same policy type)
- SEO title: "[Country] Refugee Arrivals 2026 — Who Is Coming and From Where? | Refugee Routes"

### `[locale]/about/` — About Page
- Platform mission statement
- Data sources: UNHCR, IOM, ACNUR, national government statistics
- Methodology: how flows are estimated, what counts as a refugee vs. IDP vs. asylum seeker
- Limitations: data lag, undercounting of informal flows
- Contact/feedback

### `[locale]/faq/` — FAQ Page
- What is the difference between a refugee, IDP, and asylum seeker?
- How current is the data?
- Where are Ukraine refugees going?
- Which country hosts the most refugees?
- How are flow numbers calculated?
- Can I use this data in my research?

### `[locale]/privacy/` — Privacy Policy
- Cookie and ad network disclosures
- No personal data on refugees is collected or stored
- GDPR compliance

### `api/` — Internal API Routes
- `api/countries` — returns countries.json (both origin and destination profiles)
- `api/flows` — returns flows.json (all displacement flow corridors)
- Supports ?origin= and ?destination= query params

---

## Data Model

### `public/data/countries.json`
```json
[
  {
    "slug": "ukraine",
    "name": "Ukraine",
    "type": ["origin"],
    "conflictContext": "Active interstate war",
    "conflictStatus": "active",
    "totalDisplaced": 10200000,
    "refugeesAbroad": 6400000,
    "idps": 3800000,
    "displacementStart": "2022-02-24",
    "trend": "stable",
    "summary": "Russia's 2022 full-scale invasion triggered the largest displacement crisis in Europe since World War II. Millions fled within weeks; flows have partially reversed as some returned to western Ukraine.",
    "lastUpdated": "2026-04-01"
  },
  {
    "slug": "germany",
    "name": "Germany",
    "type": ["destination"],
    "receptionPolicy": "open",
    "totalHosted": 2100000,
    "topOrigins": ["ukraine", "syria", "afghanistan"],
    "integrationContext": "Urban settlement dominant; strong legal protection framework; work permit access within 3 months.",
    "trend": "stable",
    "lastUpdated": "2026-04-01"
  }
]
```

### `public/data/flows.json`
```json
[
  {
    "id": "flow-001",
    "originSlug": "ukraine",
    "destinationSlug": "poland",
    "originName": "Ukraine",
    "destinationName": "Poland",
    "totalArrivals": 1580000,
    "currentlyPresent": 960000,
    "returnedHome": 620000,
    "primaryRoute": "land",
    "routeDescription": "Overland via Medyka, Hrebenne, and Dorohusk border crossings",
    "receptionStatus": "open",
    "arrivalPeak": "2022-03",
    "trend": "stable",
    "monthlyData": [
      { "month": "2026-01", "arrivals": 14200 },
      { "month": "2026-02", "arrivals": 13800 },
      { "month": "2026-03", "arrivals": 15100 }
    ],
    "lastUpdated": "2026-04-01"
  }
]
```

**Country types:** `origin`, `destination`, or both `["origin", "destination"]`
**Conflict context labels:** `Active interstate war`, `Civil war`, `Ethnic persecution`, `Political repression`, `Climate displacement`, `Famine`
**Reception policy:** `open`, `partial`, `restrictive`, `closed`
**Route types:** `land`, `sea`, `air`, `mixed`
**Trend values:** `rising`, `stable`, `falling`, `reversing`

---

## Milestones & Git Push Points

| Milestone | Description | Deliverable |
|---|---|---|
| M0 | Project scaffold | Next.js 15 + Tailwind + next-intl, Vercel deploy confirmed |
| M1 | Data layer | countries.json (25+ origins, 30+ destinations), flows.json (60+ flow corridors) |
| M2 | Homepage | Displacement overview, top origins/destinations tables, major corridors |
| M3 | Origin pages | origin/[slug] with destination breakdown, trend chart, context |
| M4 | Destination pages | destination/[slug] with origin breakdown, hosted totals, policy context |
| M5 | i18n | All 8 languages complete, RTL for Arabic, Swahili locale |
| M6 | Ads + launch | AdSense/Adsterra, FAQ/About/Privacy, sitemap, final Vercel push |

---

## Agent Team

### Frontend Agent
- Responsibilities: Flow table components, trend chart rendering (Recharts), origin/destination card layout, sankey or flow visualisation (if implemented), responsive layout, RTL support
- Key files: `app/[locale]/page.tsx`, `app/[locale]/origin/[slug]/page.tsx`, `app/[locale]/destination/[slug]/page.tsx`, `components/FlowTable.tsx`, `components/TrendChart.tsx`, `components/CountryCard.tsx`

### Backend / Data Agent
- Responsibilities: countries.json and flows.json schema design and population, origin↔destination linkage via slug references, API routes, data validation
- Key files: `public/data/countries.json`, `public/data/flows.json`, `app/api/countries/route.ts`, `app/api/flows/route.ts`

### SEO / Content Agent
- Responsibilities: Displacement driver summaries per origin country, integration context per destination, FAQ answers, all meta tags, OG images, sitemap, translation strings
- Key files: `messages/en.json` (and 7 other locales), `app/sitemap.ts`, `app/[locale]/faq/page.tsx`

### QA Agent
- Responsibilities: All origin/[slug] and destination/[slug] pages resolve, flow data renders correctly, charts display numbers accurately, mobile layout, Lighthouse audit
- Key files: `tests/`, Vercel preview URL checks

---

## SEO Strategy

| Target Keyword | Monthly Search Volume (est.) | Page |
|---|---|---|
| refugee tracker 2026 | 4,400 | Homepage |
| ukraine refugees destination | 8,100 | origin/ukraine |
| conflict displacement map | 2,900 | Homepage |
| where are ukraine refugees going | 12,100 | origin/ukraine |
| syria refugee numbers 2026 | 5,400 | origin/syria |
| which countries take most refugees | 6,600 | Homepage / destination pages |
| germany refugee numbers | 4,400 | destination/germany |
| refugee crisis 2026 | 9,900 | Homepage |
| gaza refugees where going | 8,100 | origin/gaza-palestine |
| sudan refugee crisis | 5,400 | origin/sudan |

**On-page SEO rules:**
- Homepage H1: "Refugee Routes — Where Are Displaced People Going in 2026?"
- origin/[slug] title: "[Country] Refugees 2026 — Where Are They Going? | Refugee Routes"
- destination/[slug] title: "[Country] Refugee Arrivals 2026 — Numbers & Origins | Refugee Routes"
- FAQPage JSON-LD on FAQ page ("where are Ukraine refugees going?" etc.)
- Dataset JSON-LD on homepage
- Strong citation: "Source: UNHCR, IOM, [date]" on all numerical claims
- Hreflang for all 8 locales
- Arabic, French (high relevance for African displacement), and Ukrainian locales prioritised

---

## Launch Checklist

- [ ] countries.json populated with 25+ origin countries and 30+ destination countries
- [ ] flows.json populated with 60+ displacement flow corridors
- [ ] All origin/[slug] pages statically generated without 404s
- [ ] All destination/[slug] pages statically generated without 404s
- [ ] Flow corridor numbers displaying correctly on both origin and destination pages
- [ ] Trend charts rendering with monthly data points
- [ ] Homepage displacement total figure and top-10 tables displaying
- [ ] All 8 language translation files complete
- [ ] Arabic RTL layout verified
- [ ] Swahili (sw) locale verified
- [ ] Data source attribution ("UNHCR/IOM, [date]") on all numerical pages
- [ ] Sitemap.xml includes all origin and destination pages
- [ ] Sitemap submitted to Google Search Console
- [ ] Google AdSense ca-pub-7098271335538021 verified and serving
- [ ] Adsterra units active
- [ ] Cookie consent banner live
- [ ] Privacy, About, FAQ pages published
- [ ] FAQ answers targeting "where are Ukraine/Gaza/Sudan refugees going" queries
- [ ] OG images set for homepage and high-traffic origin pages
- [ ] Lighthouse Performance > 85 desktop, > 80 mobile
- [ ] No console errors in production
- [ ] Vercel domain refugee-routes.vercel.app live and HTTPS
- [ ] Origin ↔ destination cross-links all resolve correctly
- [ ] Dignity-first language review: no dehumanising terms in content
