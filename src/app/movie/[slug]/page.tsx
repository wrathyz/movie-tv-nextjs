import Back from '@/components/back'
import { movies } from '@/data/data'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(p: Props): Promise<Metadata> {
  const params = await p.params
  const movie = movies.find((v) => v.slug == params.slug)

  return {
    title: movie?.title,
    description: `Details about ${movie?.title}`,
  }
}

export default async function MovieDetail({ params }: Props) {
  const { slug } = await params
  const movie = movies.find((v) => v.slug == slug)

  if (!movie) {
    return notFound()
  }

  return (
    <div className="min-h-screen container mx-auto flex flex-col">
      <div className="">
        <Back visible />
      </div>
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row gap-8">
          <Image
            src={movie.thumb}
            alt={movie.title}
            width={500}
            height={500}
            className="absolute left-0 -z-10 rounded-lg shadow-xl w-full max-h-[300px] object-cover blur-md opacity-50"
            priority
          />
          <div className="md:w-1/3">
            <Image
              src={movie.thumb}
              alt={movie.title}
              width={500}
              height={500}
              className="rounded-lg max-h-[300px] object-contain"
              priority
            />
          </div>
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
              {movie.title}
            </h1>
            <p className="text-gray-400 mb-4">{movie.release_date}</p>

            <div className="flex items-center space-x-6">
              <p className="text-gray-400">Runtime: {movie.runtime} mins</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 md:p-8 mt-8">
        <h2 className="text-2xl font-semibold mb-4">Episodes</h2>
        <ul className="space-y-3">
          {movie.files.map((v, i) => (
            <li
              key={i}
              className="bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition duration-200"
            >
              <Link href={`/movie/${slug}/${v}`}>
                <div className="p-4">
                  <h3 className="text-xl font-medium">EP.{i + 1}</h3>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
