import createNextIntlPlugin from 'next-intl/plugin'
const withNextIntl = createNextIntlPlugin('./i18n/request.ts')
import type { NextConfig } from 'next'
const nextConfig: NextConfig = { images: { unoptimized: true } }
export default withNextIntl(nextConfig)
