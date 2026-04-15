'use client'
import { useEffect, useRef } from 'react'

export default function AdInContent() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current || ref.current.dataset.loaded) return
    ref.current.dataset.loaded = '1'
    const s = document.createElement('script')
    s.src = 'https://pl29155444.profitablecpmratenetwork.com/2f67f9117a4af2f6cd13d3b63b0c11be/invoke.js'
    s.async = true
    s.setAttribute('data-cfasync', 'false')
    ref.current.appendChild(s)
  }, [])
  return (
    <div className="w-full my-4">
      <div id="container-2f67f9117a4af2f6cd13d3b63b0c11be" ref={ref} />
    </div>
  )
}
