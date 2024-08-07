import { getJson } from "../tools/fn/getJson.js"
import fs from "node:fs"
import path from "node:path"
const CWD = process.cwd()
const git = {
  fs,
  dir: path.join(CWD, "src"),
}
import MBeritaRw from "../src/global/git/orm/rw/models/MBeritaRw"
import MProdukRw from "../src/global/git/orm/rw/models/MProdukRw"
import CONFIG from "../src/config.json" assert { type: "json" }
import { slugify } from "../src/global/fn/slugify.js"

const mBeritaRw = new MBeritaRw(git)
const mProdukRw = new MProdukRw(git)

const htmlPlugin = () => {
  return {
    name: "html-transform",
    transformIndexHtml: async (html, ctx) => {
      const { path, filename } = ctx
      const pathSplit = path.replace("/index.html", "").split("/")

      let pageName = pathSplit.length > 1 ? pathSplit[1] : "homepage"
      const origPageName = pageName
      if (pageName === "galeri") pageName = "galery"
      let pageProps = null
      const pagePropPath = `src/web/data/pages/${pageName}.json`
      if (await fs.existsSync(pagePropPath))
        try {
          pageProps = await getJson(`src/web/data/pages/${pageName}.json`)
        } catch (e) {}
      // console.log(pageProps)
      let htmlContent = html
      const baseUrl = CONFIG.BASE_URL //"https://kanzululum.github.io"
      let url = pageName === "homepage" ? baseUrl : `${baseUrl}/${origPageName}`
      htmlContent = htmlContent
        .replace(/<meta-version(\s+)?\/>/, '<meta name="version" content="1.0.0"/>')
        .replace(/<meta-email(\s+)?\/>/, '<meta name="email" content="cristminix@gmail.com"/>')
        .replace(/<meta-website(\s+)?\/>/, '<meta name="type" content="website"/>')
      if (pageProps !== null) {
        htmlContent = htmlContent
          .replace(/<title>(.*?)<\/title>/, `<title>${pageProps.title}</title>`)
          .replace(
            /<meta-description(\s+)?\/>/,
            `<meta name="description" content="${pageProps["meta-description"]}" data-rh="true"/>`,
          )
          .replace(/<meta-keywords(\s+)?\/>/, `<link rel="canonical" href="${url}"/>`)
          .replace(
            /<meta-og(\s+)?\/>/,
            `<meta property="og:title" content="${pageProps.title}"/>
<meta property="og:type" content="website"/>
<meta property="og:locale" content="id_ID" />
<meta property="og:URL" content="${url}"/>
<meta property="og:image" content="${baseUrl}/assets/images/og-preview.png"/>
<meta property="og:description" content="${pageProps["meta-description"]}"/>`,
          )
      }

      if (pageName === "baca-berita") {
        // console.log(html)
        let matchMetaId = html.match(/<meta\s+name=\"id\"\s+content=\"(.*?)\"/)
        if (matchMetaId.length > 1) {
          const id = matchMetaId[1]
          let berita
          try {
            await mBeritaRw.initOrm()
            berita = await mBeritaRw.getRow(id)
            berita.slug = slugify(berita.title)
            htmlContent = htmlContent
              .replace(/<title>(.*?)<\/title>/, `<title>${berita.title}</title>`)
              .replace(
                /<meta-description(\s+)?\/>/,
                `<meta name="description" content="${berita.headline.trim()}"  data-rh="true"/>`,
              )
              .replace(
                /<meta-keywords(\s+)?\/>/,
                `<link rel="canonical" href="${baseUrl}/berita/baca/${berita.id}/${berita.slug}/"/>`,
              )
              .replace(
                /<meta-og(\s+)?\/>/,
                `<meta property="og:title" content="${berita.title}"/>
<meta property="og:type" content="website"/>
<meta property="og:locale" content="id_ID" />
<meta property="og:URL" content="${baseUrl}/berita/baca/${berita.id}/${berita.slug}/"/>
<meta property="og:image" content="${baseUrl}/assets/images/berita/covers/${berita.cover}"/>
<meta property="og:description" content="${berita.headline.trim()}"/>`,
              )
          } catch (e) {
            console.error(e)
          }
          console.log(id, berita)
        }
      }
      if (pageName === "lihat-produk") {
        // console.log(html)
        let matchMetaId = html.match(/<meta\s+name=\"id\"\s+content=\"(.*?)\"/)
        if (matchMetaId.length > 1) {
          const id = matchMetaId[1]
          let produk
          try {
            await mProdukRw.initOrm()
            produk = await mProdukRw.getRow(id)
            produk.slug = slugify(produk.title)
            htmlContent = htmlContent
              .replace(/<title>(.*?)<\/title>/, `<title>${produk.title}</title>`)
              .replace(
                /<meta-description(\s+)?\/>/,
                `<meta name="description" content="${produk.headline.trim()}"  data-rh="true"/>`,
              )
              .replace(
                /<meta-keywords(\s+)?\/>/,
                `<link rel="canonical" href="${baseUrl}/produk/lihat/${produk.id}/${produk.slug}/">`,
              )
              .replace(
                /<meta-og(\s+)?\/>/,
                `<meta property="og:title" content="${produk.title}"/>
<meta property="og:type" content="website"/>
<meta property="og:locale" content="id_ID" />
<meta property="og:URL" content="${baseUrl}/produk/lihat/${produk.id}/${produk.slug}/"/>
<meta property="og:image" content="${baseUrl}/assets/images/produk/covers/${produk.cover}"/>
<meta property="og:description" content="${produk.headline.trim()}"/>`,
              )
          } catch (e) {
            console.error(e)
          }
          console.log(id, produk)
        }
      }
      console.log(pageName)
      // console.log(path,filename)

      return htmlContent
    },
  }
}

export default htmlPlugin
