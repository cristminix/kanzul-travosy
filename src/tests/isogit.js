import fs from "node:fs"
import path from "path"
import { faker } from "@faker-js/faker"
import { createGit } from "../global/git/git-node.js"

class DBCompany {
  git = null
  defaultData = {
    name: "",
    address: "",
    shortAddress: "",
    phone: "",
    whatsapp: "",
    email: "",
    isDefault: true,
  }
  data = null
  filePath = "web/data/company.json"
  constructor(git) {
    this.git = git
  }

  async get() {
    await this.git.fastForward()
    let data = {}
    const targetFilePath = path.join(this.git.dir, this.filePath)
    try {
      const bufferData = await fs.readFileSync(targetFilePath, "utf-8")
      data = JSON.parse(bufferData)
    } catch (e) {
      console.error(e)
      data = { ...this.defaultData }
    }
    this.data = data
    return this.data
  }
  async update(data) {
    this.data = data
    const targetFilePath = path.join(this.git.dir, this.filePath)

    await fs.writeFileSync(targetFilePath, JSON.stringify(data, null, 2))
  }

  async commit(push = false) {
    await this.git.commit([this.filePath])
    if (push) {
      await this.git.push()
    }
  }
}

const createCompany = () => {
  let company = {}
  company.name = faker.person.fullName()
  company.email = faker.internet.email()
  company.address = faker.location.streetAddress({ useFullAddress: true })
  company.shortAddress = faker.location.streetAddress(true)
  company.phone = faker.phone.number()
  company.whatsapp = faker.phone.number()

  return company
}

const main = async () => {
  const git = createGit()
  await git.cleanup()
  await git.init(true)
  // await git.fastForward()
  // const filePath = "web/data/company.json"
  // await git.checkout([filePath])
  // await editFileAndSave(git.dir, filePath)
  // await git.commit(["web/data/company.json"])
  // await git.push()
  // // await git.fastForward("web/data")
  // console.log(git)

  // const mCompany = new DBCompany(git)
  // const companyData = await mCompany.get()
  // await mCompany.update(createCompany())
  // await mCompany.commit(true)
  await git.log()

  // console.log({ companyData })
}

main()
