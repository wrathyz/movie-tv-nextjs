'use server'

import { cookies } from 'next/headers'

type ITheme = 'dark' | 'light'

export async function setTheme(t: ITheme) {
  'use server'
  const cookieStore = await cookies()
  cookieStore.set('theme', t)
}

export async function getTheme(): Promise<ITheme> {
  'use server'
  const cookieStore = await cookies()
  return (cookieStore.get('theme')?.value as ITheme) || 'dark'
}
