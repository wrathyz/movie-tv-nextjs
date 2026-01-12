import Html from '@/providers/html'
import clsx from 'clsx'
import { Fira_Code } from 'next/font/google'
import packageJson from '../../package.json'
import './globals.css'

export const metadata = {
  title: 'Movie TV',
  description: 'Enjoy the movie',
}

const firaCode = Fira_Code({
  variable: '--font-fira-code',
  subsets: ['latin'],
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Html>
      <head>
        <meta property="og:image" content="/logo-og.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={process.env.URL + '/logo-og.png'} />
        <meta name="twitter:image:type" content="image/png" />
        <meta name="twitter:image:width" content="640" />
        <meta name="twitter:image:height" content="512" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="version" content={packageJson.version} />
      </head>
      <body className={clsx(firaCode.className)}>{children}</body>
    </Html>
  )
}
