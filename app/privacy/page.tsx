import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Refugee Routes Privacy Policy — how we collect, use, and protect your information.',
  keywords: 'privacy policy, data protection, cookies, GDPR',
}

export default function PrivacyPage() {
  const sections = [
    { title: '1. Introduction', content: 'Refugee Routes operates the website at refugee-routes.vercel.app. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.' },
    { title: '2. Information We Collect', content: 'We automatically collect browser type, OS, referring URLs, device info, and pages visited via server logs and analytics. We do not require registration and do not intentionally collect personally identifiable information.' },
    { title: '3. Cookies and Tracking', content: 'We use cookies to improve experience, analyze traffic, and serve ads. Types: Essential (functionality), Analytics (Google Analytics — anonymized), Advertising (Google AdSense — personalized ads), and Preference (language). Control via browser settings.' },
    { title: '4. Google AdSense & Advertising', content: 'We use Google AdSense which uses cookies to serve ads based on your browsing history. Opt out at https://www.google.com/settings/ads or http://www.aboutads.info/choices. More info: https://policies.google.com/technologies/partner-sites.' },
    { title: '5. Google Analytics', content: 'Google Analytics collects anonymized data about site usage. We do not combine this with personally identifiable information.' },
    { title: '6. Third-Party Links', content: 'We may link to third-party sites. We are not responsible for their privacy practices.' },
    { title: '7. Data Retention & Security', content: 'We implement reasonable security measures. Analytics data is auto-deleted after 26 months.' },
    { title: "8. Children's Privacy", content: 'Our service is not directed to individuals under 13. We do not knowingly collect data from children under 13.' },
    { title: '9. Policy Changes', content: 'We may update this policy periodically. Changes are posted on this page with an updated date.' },
    { title: '10. Contact', content: 'Questions? Contact us at contact@refugee-routes.vercel.app.' },
  ]
  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-slate-700">Home</Link>
          <span className="mx-2">/</span>
          <span>Privacy Policy</span>
        </nav>
        <h1 className="text-4xl font-bold text-slate-900 mb-3">Privacy Policy</h1>
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
