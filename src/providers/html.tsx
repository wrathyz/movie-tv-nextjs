import { getTheme } from '@/actions/theme'

export default async function Html({
  children,
}: {
  children: React.ReactNode
}) {
  const theme = await getTheme()

  return (
    <html lang="en" className={theme === 'dark' ? 'dark' : 'light'}>
      {children}
    </html>
  )
}
