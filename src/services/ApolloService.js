export class ApolloService {
  async fetchDataFromUrl(track, key) {
    const externalLocationString = `${track.chromosome}:${track.start}..${track.end}`
    const comp = track[key]
    const url =
      comp[0] +
      encodeURI(track.genome) +
      comp[1] +
      encodeURI(externalLocationString) +
      comp[2]
    const response = await fetch(url)
    if (response.ok) {
      return response.json()
    } else {
      return []
    }
  }
}
