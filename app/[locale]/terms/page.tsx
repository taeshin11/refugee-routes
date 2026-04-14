import type { Metadata } from 'next'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Refugee Routes Terms of Service — rules and conditions for use of our platform.',
  keywords: 'terms of service, terms of use, user agreement',
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const sections = [
    { title: '1. Acceptance of Terms', content: 'By accessing Refugee Routes at refugee-routes.vercel.app, you agree to these Terms. If you disagree, please discontinue use. We may modify terms; continued use constitutes acceptance.' },
    { title: '2. Description of Service', content: 'Refugee Routes is a free, publicly accessible platform that maps refugee displacement routes, migration flows, and humanitarian corridors from active conflict zones. Provided for informational and educational purposes only.' },
    { title: '3. Disclaimer of Warranties', content: 'THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES. Data may be incomplete or inaccurate. ALL DATA IS FOR INFORMATIONAL PURPOSES ONLY — NOT MILITARY, LEGAL, OR FINANCIAL ADVICE. Independently verify information.' },
    { title: '4. Limitation of Liability', content: 'Refugee Routes SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES. Total liability shall not exceed $0, as the Service is entirely free.' },
    { title: '5. Accuracy', content: 'We strive for accuracy but make no guarantees. We are not responsible for errors in underlying third-party data sources.' },
    { title: '6. Intellectual Property', content: 'Original content and design are protected by copyright. You may cite information for non-commercial, educational, or journalistic purposes with attribution.' },
    { title: '7. Prohibited Uses', content: 'Do not: (a) use for illegal activities; (b) attempt unauthorized access; (c) harvest data without permission; (d) spread disinformation; (e) disrupt the Service.' },
    { title: '8. Third-Party Content', content: 'Advertising (including Google AdSense) and external links may appear. We are not responsible for third-party content.' },
    { title: '9. Governing Law', content: 'Governed by applicable law. Disputes resolved through good-faith negotiation first.' },
    { title: '10. Contact', content: 'Questions? Contact us at contact@refugee-routes.vercel.app.' },
  ]
  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-slate-500 mb-8">
          <Link href={`/${locale}`} className="hover:text-slate-700">Home</Link>
          <span className="mx-2">/</span>
          <span>Terms of Service</span>
        </nav>
        <h1 className="text-4xl font-bold text-slate-900 mb-3">Terms of Service</h1>
        <p className="text-slate-500 mb-10">Last updated: April 2025</p>
        <div className="space-y-4">
          {sections.map(({ title, content }) => (
            <section key={title} className="bg-white rounded-2xl border border-slate-100 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-3">{title}</h2>
              <p className="text-slate-600 leading-relaxed text-sm">{content}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
