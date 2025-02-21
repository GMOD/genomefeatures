export class ApolloService {
  async fetchDataFromUrl(url) {
    const response = await fetch(url)
    if (response.ok) {
      return response.json()
    } else {
      return []
    }
  }
}
