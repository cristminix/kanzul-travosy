import fs from "node:fs"
import path from "node:path"
import git from "isomorphic-git"
import http from "isomorphic-git/http/node/index.js"
import { rimrafSync } from "rimraf"

// console.log(rimraf)

import { getRepoDir } from "./getRepoDir.js"

const CWD = process.cwd()
const repoDir = path.join(CWD, "src/tests/repo-dir")

// console.log({ repoDir })
const config = {
  repoUrl: "http://localhost:3000/sutoyocutez/kanzululum.github.io.git",
  author: {
    name: "Tatang S.",
    email: "sutoyocutez@gmail.com",
  },
  token: "e05db2320178761249774568fa1882d3c0e21cfa",
  corsProxyUrl: "http://127.0.0.1:8787",
}

class Git {
  static instance = null
  dir = "/repo"
  fs = null
  pfs = null
  repoUrl = null
  corsProxyUrl = null
  author = null
  token = null
  constructor(config) {
    this.fs = fs
    this.repoUrl = config.repoUrl
    if (config.corsProxyUrl) {
      this.corsProxyUrl = config.corsProxyUrl
    }
    this.dir = path.join(repoDir, getRepoDir(this.repoUrl))

    console.log(`dir is ${this.dir}`)

    this.token = config.token
    this.author = config.author
  }

  async isCloned() {
    if (!(await this.fs.existsSync(this.dir))) return false
    try {
      const ls = await this.fs.readdirSync(this.dir)
      if (ls.length === 0) return false
      if (await this.fs.existsSync(`${this.dir}/.git`)) return true
    } catch (e) {
      console.log(`lfs: ${this.dir}/.git not found`)
    }

    return false
  }

  cloneOption(noCheckout=false) {
    const option = {
      fs: this.fs,
      http,
      dir: this.dir,
      url: this.repoUrl,
      // ref: "main",
      singleBranch: true,
      onProgress: (event) => {
        if (typeof this.onCloneCallback === "function") {
          this.onCloneCallback(event)
        }
      },
    }
    if (this.corsProxyUrl) {
      option.corsProxy = this.corsProxyUrl
    }
    if(noCheckout){
      option.noCheckout = true
    }
    return option
  }
   fetchOption() {
    const option = {
      fs: this.fs,
      http,
      dir: this.dir,
      url: this.repoUrl,
      // ref: "main",
      singleBranch: true,
      tags: false,
    }
    if (this.corsProxyUrl) {
      option.corsProxy = this.corsProxyUrl
    }
    return option
  }
  async commit(filepaths, message) {
    let messages = []
    for (const fileItem of filepaths) {
      await git.add({ fs: this.fs, dir: this.dir, filepath: fileItem })
      const dateUpdated = new Date()
      messages.push(`Edit ${fileItem} at ${dateUpdated}`)
    }
    const sha = await git.commit({
      fs: this.fs,
      dir: this.dir,
      author: this.author,
      message: message ? message : messages.join("\n"),
    })

    return sha
  }
  async push() {
    let option = {
      fs: this.fs,
      http,
      dir: this.dir,
      onAuth: () => ({ username: this.token }),
    }
    if (this.corsProxyUrl) {
      option.corsProxy = this.corsProxyUrl
    }
    let pushResult = await git.push(option)
    return pushResult
  }
  async checkout(filepaths) {
    await git.checkout({
      fs: this.fs,
      dir: this.dir,
      filepaths,
    })
    console.log("done")
  }
  async log() {
    let commits = await git.log({
      fs: this.fs,
      dir: this.dir,
      // depth: 5,
      // ref: "main",
      force: true,
      follow: true,
    })
    commits.forEach((commit) => {
      console.log(`${commit.oid}:${commit.commit.message}`)
    })
    // console.log(commits)
  }
  async fetch() {
    let result = await git.fetch(this.fetchOption())
    console.log(result)
  }
  async fastForward() {
    let pullSuccess = false
    let error = "false"
    let option = {
      fs: this.fs,
      http,
      dir: this.dir,
      singleBranch: true,
    }
    if (this.corsProxyUrl) {
      option.corsProxy = this.corsProxyUrl
    }
    try {
      await git.fastForward(option)
      pullSuccess = true
    } catch (e) {
      error = e
      console.error(e)
    }
    if (!pullSuccess) {
      console.log('Pull not succed')
    }
  }
  async cleanup() {
    await rimrafSync(this.dir)
  }
  async init(noCheckout=false) {
    const alreadyCloned = await this.isCloned()
    if (!alreadyCloned) {
      
      console.log("Cloning repo ")
      await this.fs.mkdirSync(this.dir)
      await git.clone(this.cloneOption(noCheckout))
    }
  }
}

export function createGit() {
  if (!Git.instance) Git.instance = new Git(config)

  return Git.instance
}
