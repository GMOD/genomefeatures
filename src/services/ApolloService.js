export class ApolloService {
  /*
   * ApolloService Class
   *
   */
  constructor() {}

  fetchDataFromUrl(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => {
          if (response.status === 200) {
            resolve(response.json())
          } else {
            resolve([])
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
