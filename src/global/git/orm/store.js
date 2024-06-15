import { initOrm } from "./initOrm"
import {
  cms_user,
  cms_user_group,
  web_menu,
  web_company,
  web_contact_person,
  web_page,
  web_theme,
  web_template,
  web_block,
  web_template_block,
  web_section_block,
} from "./schema"
import { github } from "../../cloud/iso-git"
const { fs, fsp, dir, git } = github

class Store {
  static database = null
  static instance = null
  static instances = {}
  static async init() {
    if (!Store.database) {
      Store.database = await initOrm(fsp, `${dir}/cms.sqlite`)
      console.log(Store.database)
    }
  }
  static getInstance(modelName = null) {
    if (!modelName) {
      if (!Store.instance) {
        Store.instance = new Store()
      }
      return Store.instance
    } else {
      if (!Store.instances[modelName]) {
        Store.instances[modelName] = Store.factory(modelName)
      }
      console.log(Store.instances)
      return Store.instances[modelName]
    }
  }
  static factory(modelName) {
    const schemas = {
      cms_user: MCmsUser,
      cms_user_group,
      web_block,
      web_contact_person,
      web_menu,
      web_company,
      web_page,
      web_section_block,
      web_template,
      web_template_block,
      web_theme,
    }
    const keys = Object.keys(schemas)
    if (keys.includes(modelName)) {
      console.log(modelName)
      return new schemas[modelName]()
    }
    return null
  }
  table = null
  constructor() {}

  getList() {}
  getState() {}

  getRow(pk) {}

  update(pk, data) {}

  delete(pk) {}
}

class MCmsUser extends Store {
  table = "cms_user"
}
class MCmsUserGroup extends Store {
  table = "cms_user_group"
}
// class MWebMenu extends Store {
//   table = "web_menu"
// }

// class MWebCompany extends Store {
//   table = "web_company"
// }
// class MWebCintactPerson extends Store {
//   table = "web_contact_person"
// }
// class MWebTheme extends Store {
//     table = "web_theme"
//   }
//   class MWebMenu extends Store {
//     table = "web_menu"
//   }

export default Store
