type TSource = {
  title: string
  slug: string
  thumb: string
  cover: string
  release_date: string
  runtime: string
  type: (string & {}) | 'show' | 'movie'
  files: string[]
}

export const movies = [].map((v: TSource) => ({
  ...v,
  thumb: '/api/images/' + v.slug + v.thumb,
  cover: '/api/images/' + v.slug + v.cover,
}))
