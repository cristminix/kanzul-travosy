import {getJson} from "../tools/fn/getJson.js"
import fs from "node:fs"
const htmlPlugin =  () => {
  return {
    name: 'html-transform',
    transformIndexHtml: async(html,ctx) =>{
      const {
        path,
        filename,
      }= ctx
      const pathSplit=path.replace("/index.html","").split('/')

      let pageName = pathSplit.length>1?pathSplit[1]:"homepage"
      const origPageName = pageName
      if(pageName==='galeri') pageName="galery"
      let pageProps = null
      const pagePropPath = `src/web/data/pages/${pageName}.json`
      if(await fs.existsSync(pagePropPath))
        try{
         pageProps= await getJson(`src/web/data/pages/${pageName}.json`)

        } catch(e){} 
      // console.log(pageProps)
      let htmlContent = html
      const baseUrl = "https://kanzululum.github.io"
      let url = pageName === "homepage" ? baseUrl:`${baseUrl}/${origPageName}`
      if(pageProps !== null){
        htmlContent = htmlContent.replace(
          /<title>(.*?)<\/title>/,
          `<title>${pageProps.title}</title>`,
        ).replace(
          /<meta-description>/,
          `<meta content="${pageProps['meta-description']}" name="description">`,
        ).replace(
          /<meta-keywords>/,
          `<meta content="${pageProps['meta-keyword']}" name="keywords">`,
        ).replace(
          /<meta-og>/,
          `<meta property="og:title" content="${pageProps.title}" />
<meta property="og:type" content="website"/>
<meta property="og:locale" content="id_ID" />
<meta property="og:URL" content="${url}"/>
<meta property="og:image" content="${baseUrl}/assets/images/logo/logo-dark.png" />
<meta property="og:description" content="${pageProps['meta-description']}" />`  
        )
      }

      // console.log(pageName)
      // console.log(path,filename)

      return htmlContent
    },
  }
}

export default htmlPlugin