const fetch = require('node-fetch')
const contentApiUrl = process.env.PRISMIC_API_URL
module.exports = async function () {
  try {
    const repositoryRes = await fetch(contentApiUrl)
    const repository = await repositoryRes.json()
    const masterRef = repository.refs[0].ref
    const result = await fetch(
      `${contentApiUrl}/documents/search?ref=${masterRef}&q=[[at(document.type, "homepage")]]&format=json`,
    )
    const data = await result.json()
    return data.results[0].data
  } catch (error) {
    console.error('An error occured: ', error)
  }
}
