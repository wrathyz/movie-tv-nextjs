import Back from '@/components/back'
import { movies } from '@/data/data'

import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string; file: string }>
}

export async function generateMetadata(p: Props): Promise<Metadata> {
  const params = await p.params

  const movie = movies.find((v) => v.slug == params.slug)
  const index = movie?.files.findIndex((v) => v == params.file) || 0

  return {
    title: movie?.title + ' EP.' + (index + 1),
    description: `${movie?.title}`,
  }
}

export default async function PlayerPage({ params }: Props) {
  const pms = await params
  const movie = movies.find((v) => v.slug == pms.slug)
  const file = movie?.files.find((v) => v == pms.file)

  if (!movie || !file) {
    return notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <video
        className="w-full min-h-screen aspect-video bg-black"
        controls
        preload="none"
      >
        <source src={`/${movie.slug}/${file}`} type="video/mp4" />
      </video>

      <Back />
    </div>
  )
}
