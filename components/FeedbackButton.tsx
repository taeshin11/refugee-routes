'use client'
import { useState, useEffect } from 'react'

interface Props {
  siteName: string
  siteUrl: string
}

export function FeedbackButton({ siteName, siteUrl }: Props) {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const email = 'taeshinkim11@gmail.com'
  const subject = encodeURIComponent(`[Feedback] ${siteName}`)
  const body = encodeURIComponent(`Hi,\n\nI have a suggestion for ${siteName} (${siteUrl}):\n\n`)

  if (!visible && !open) return null

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm" onClick={() => setOpen(false)} />
      )}
      <div className="fixed bottom-20 right-4 md:bottom-8 md:right-6 z-[70] flex flex-col items-end gap-2">
        {open && (
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 w-72">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-slate-800 text-sm">Share Your Feedback</h3>
                <p className="text-slate-500 text-xs mt-0.5">We read every message and improve accordingly.</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-600 ml-2 shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <p className="text-xs text-slate-600 mb-4">Have a feature request, spotted a data error, or want to suggest an improvement?</p>
            <a
              href={`mailto:${email}?subject=${subject}&body=${body}`}
              className="flex items-center justify-center gap-2 w-full bg-slate-900 hover:bg-slate-700 text-white text-sm py-2.5 rounded-xl transition-colors font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Send Email Feedback
            </a>
            <p className="text-center text-xs text-slate-400 mt-2">Opens your email client</p>
          </div>
        )}
        <button
          onClick={() => setOpen(v => !v)}
          className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium px-3 py-2 rounded-full shadow-lg transition-all hover:scale-105"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          Feedback
        </button>
      </div>
    </>
  )
}
