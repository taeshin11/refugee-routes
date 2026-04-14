import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Use & FAQ',
  description: 'How to use Refugee Routes. Frequently asked questions about data, methodology, and features.',
  keywords: 'refugee routes, displacement map, migration flows, forced displacement, refugee crisis, IDP, FAQ, how to use, guide',
}

export default function FaqPage() {
  const faqs = [
    { q: 'What is Refugee Routes and who is it for?', a: 'Refugee Routes is a free, publicly accessible platform that maps refugee displacement routes, migration flows, and humanitarian corridors from active conflict zones. Designed for journalists, researchers, policy analysts, students, and NGO workers. No registration or payment required.' },
    { q: 'Where does the data come from?', a: 'Data is sourced from ACLED, SIPRI, Uppsala Conflict Data Program, UN agencies, official government sources, and verified open-source intelligence. Primary sources are cited where available.' },
    { q: 'How often is data updated?', a: 'Breaking events are updated within 24-48 hours of verification. Statistical summaries are reviewed weekly or monthly. Each section shows its last updated timestamp.' },
    { q: 'Is this platform free?', a: 'Refugee Routes is entirely free with no registration required. It is sustained through advertising revenue. There are no paywalls or premium tiers.' },
    { q: 'Can I cite this data in my research?', a: 'Yes, with attribution to the platform and original primary source. For academic publications, cross-reference against primary sources. For partnerships or bulk access, contact us at contact@refugee-routes.vercel.app.' }
  ]
  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-slate-700">Home</Link>
          <span className="mx-2">/</span>
          <span>How to Use &amp; FAQ</span>
        </nav>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">How to Use Refugee Routes</h1>
        <p className="text-xl text-slate-600 mb-10">A guide to navigating the platform and getting the most from our data.</p>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Getting Started in 3 Steps</h2>
          <div className="grid gap-4">
            {[
              { step: '1', title: 'Explore the Dashboard', desc: 'Start on the homepage to get a high-level overview of current activity. Key metrics, recent events, and interactive visualizations update regularly.' },
              { step: '2', title: 'Filter & Drill Down', desc: 'Use filter controls to narrow data by region, date range, type, or severity. Click on any event or data point for detailed information and sources.' },
              { step: '3', title: 'Track Changes Over Time', desc: 'Use timeline and historical views to understand trends. Bookmark pages to stay current on developments that matter to you.' }
            ].map(({ step, title, desc }) => (
              <div key={step} className="bg-white rounded-2xl border border-slate-100 p-5 flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-lg shrink-0">{step}</div>
                <div><h3 className="font-semibold text-slate-800 mb-1">{title}</h3><p className="text-slate-600 text-sm">{desc}</p></div>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6">
                <h3 className="font-semibold text-slate-800 mb-3">{q}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
