import { movies } from '@/data/data'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="container mx-auto flex flex-col">
      {movies.length == 0 ? (
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            No Movie List
          </h1>
        </div>
      ) : (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((v) => (
            <Link href={'/movie/' + v.slug} key={v.slug}>
              <div className="rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-900">
                <div className="relative h-64 w-full">
                  <Image
                    src={v.thumb}
                    alt={v.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="hover:opacity-80 transition duration-300 bg-white dark:bg-black"
                  />
                </div>
                <div className="flex p-4 bottom-0 shadow-lg">
                  <h3 className="text-lg font-semibold truncate">{v.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
