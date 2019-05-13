export default async function seed(models) {
  return await models.Url.create({
    original_url: "https://www.reddit.com/",
    shortened_url: `https://${process.env.BASE_URL}/A1B2C3`,
    url_code: 'A1B2C3'
  })
  .catch(e => console.log(e))
}
