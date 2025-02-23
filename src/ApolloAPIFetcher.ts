export async function fetchApolloAPIFeatures({
  chromosome,
  start,
  end,
  genome,
  baseUrl,
  track,
  extra = '.json?ignoreCache=true&flatten=false',
}: {
  chromosome: string
  start: number
  end: number
  genome: string
  baseUrl: string
  track: string
  extra?: string
}) {
  const externalLocationString = `${chromosome}:${start}..${end}`
  const url = `${baseUrl}/${encodeURI(genome)}/${encodeURI(track)}/${encodeURIComponent(externalLocationString)}${extra}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} fetching ${url}`)
  }
  return response.json()
}
