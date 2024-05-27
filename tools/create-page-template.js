import webMenuList from "../src/web/data/web-navigation-list.json" assert {type:"json"}
import fs from "node:fs"
import path from "node:path"
const CWD = process.cwd()

console.log(webMenuList)
const createIndexHtml = async(pathLoc)=>{
    console.log(`CREATE:${pathLoc}`)
    const htmlTemplate = `<html>
    <title> <%- title %></title>
    <body>
        <div id="root"></div>
    </body>
</html>`
    try{
        fs.writeFileSync(pathLoc,htmlTemplate)
    }catch(e){
        console.error(e)
    }
}
const getJson = async(pathLoc)=>{
    try {
        const buffer = fs.readFileSync(pathLoc,"utf-8")
        const json = JSON.parse(buffer)
        return json
    } catch (err) {
        console.error(err)
    }
    return {}
}
const main = async()=>{
    /*
    pages: {
        homepage:{
          entry: 'src/web/pages/homepage.jsx',
              filename: '/index.html',
              template: 'index.html',
              inject: {
                  data: {
                      title: "Pondok Pesantren Kanzululum"
                  }
              }
        },
    */
   let addViteConfig_pages = {}
    for(const menu of webMenuList){
        let menuPath = menu.path.replace(/^\//,'')
        if(menuPath == ""){
            menuPath = "homepage"
            
        }

        let config={
            entry : `src/web/pages/${menuPath}.jsx`
        }

        if(menuPath !== 'homepage'){
            const pageSourceDir = path.join(CWD,menuPath)
            if(!fs.existsSync(pageSourceDir)){
                console.log(`MKDIR:${pageSourceDir}`)
                fs.mkdirSync(pageSourceDir)
            }
            const indexHtmlPath = path.join(pageSourceDir,'index.html')
            config.filename = `/${menuPath}/index.html`
            config.template = `${menuPath}/index.html`
            let pageData = {title:`${menuPath} Page`}
            try {
                const addPageData = await getJson(path.join(CWD,`src/web/data/pages/${menuPath}.json`))
                pageData= {...pageData,...addPageData}

                console.log(pageData)
            } catch (err) {
                console.error(err)
            }
            config.inject ={
                data: {...pageData}
            }
            await createIndexHtml(indexHtmlPath)
        }else{
            config.filename = '/index.html'
            config.template = 'index.html'
            let pageData = {title:`${menuPath} Page`}
            try {
                const addPageData = await getJson(path.join(CWD,`src/web/data/pages/${menuPath}.json`))
                pageData= {...pageData,...addPageData}
                console.log(pageData)
            } catch (err) {
                console.error(err)
            }
            config.inject ={
                data: {...pageData}
            }
            
        }
        const entryPath = path.join(CWD,config.entry)
            if(!fs.existsSync(entryPath)){
                console.log(`WRITE:${entryPath}`)
                fs.writeFileSync(entryPath,`console.log('${entryPath}')`)
            }
        addViteConfig_pages[menuPath] = config
        // console.log(menuPath)
    }
    // add admin page
    addViteConfig_pages['admin'] = {
        entry : `src/admin/main.jsx`,
        filename : '/admin/index.html',
        template : 'admin/index.html',
        inject :{
            data: {
                title:`Admin Page`
            }
        }
    }
    console.log(addViteConfig_pages)

    const mpaConfigPath = path.join(CWD,'mpa.config.json')
    console.log(`WRITE:${mpaConfigPath}`)
    fs.writeFileSync(mpaConfigPath,JSON.stringify(addViteConfig_pages,null,2))
}

main()