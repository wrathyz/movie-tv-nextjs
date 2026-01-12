'use client'

import clsx from 'clsx'
import { useRouter } from 'next/navigation'

export default function Back(p: { visible?: boolean }) {
  const router = useRouter()

  return (
    <div
      className={clsx(
        ' z-[1000] left-0 top-0 flex w-full',
        p.visible ? 'relative' : 'absolute'
      )}
    >
      <div className={clsx('w-full group', p.visible ? 'p-8' : 'min-h-64 p-12')}>
        <button
          className={clsx(
            ' text-white text-5xl font-bold py-2 px-4 rounded',
            p.visible ? '' : 'hidden group-hover:block'
          )}
          onClick={router.back}
        >
          ← Back
        </button>
        <div
          className={clsx(
            '-z-10 absolute inset-0 bg-gradient-to-b from-black to-transparent rounded-lg filter blur-lg opacity-70',
            p.visible ? '' : 'hidden group-hover:block'
          )}
        ></div>
      </div>
    </div>
  )
}
