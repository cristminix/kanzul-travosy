import fs from "node:fs"
import path from "node:path"
import git from "isomorphic-git"
import http from "isomorphic-git/http/node/index.js"
import { rimrafSync } from "rimraf"

// console.log(rimraf)

import { getRepoDir } from "./getRepoDir.js"

const CWD = process.cwd()
const repoDir = path.join(CWD, "src/tests/repo-dir")

console.log({ repoDir })
const config = {
  repoUrl: "http://localhost:3000/sutoyocutez/kanzululum.github.io.git",
  author: {
    name: "Tatang S.",
    email: "sutoyocutez@gmail.com",
  },
  token: "e05db2320178761249774568fa1882d3c0e21cfa",
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
    this.pfs = this.fs.promises
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
    try {
      const ls = await this.pfs.readdir(this.dir)
      if (ls.length === 0) return false
      if (await this.pfs.stat(`${this.dir}/.git`)) {
        return true
      }
    } catch (e) {
      // console.error(e)
    }

    return false
  }

  cloneOption() {
    const option = {
      fs: this.fs,
      http,
      dir: this.dir,
      url: this.repoUrl,
      // ref: "main",
      singleBranch: true,
      // noCheckout: true,
    }
    if (this.corsProxyUrl) {
      option.corsProxy = this.corsProxyUrl
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
  commitOption(message) {
    let remoteUrl = null
    if (this.repoUrl.startsWith("http://")) {
      repoUrl = repoUrl.replace("http://", `http://${this.token}@`)
    } else {
      repoUrl = repoUrl.replace("https://", `https://${this.token}@`)
    }
    const option = {
      remote: remoteUrl,
      fs: this.fs,
      dir: this.dir,
      message,
      author: this.author,
    }
  }
  async commit(filepaths, message) {
    let messages = []
    for (const fileItem of filepaths) {
      await git.add({ fs: this.fs, dir: this.dir, filepath: fileItem })
      const dateUpdated = new Date()
      messages.push(`Edit ${fileItem} at ${dateUpdated}`)
    }
    let sha = await git.commit({
      fs: this.fs,
      dir: this.dir,
      author: this.author,
      message: message ? message : messages.join("\n"),
    })

    return sha
  }
  async push() {
    let pushResult = await git.push({
      fs: this.fs,
      http,
      dir: this.dir,
      // remote: 'origin',
      // ref: 'main',
      onAuth: () => ({ username: this.token }),
    })
    console.log(pushResult)
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
  async listFiles() {}
  async fastForward() {
    await git.fastForward({
      fs: this.fs,
      http,
      dir: this.dir,
      // ref: 'main',
      singleBranch: true,
    })
  }
  async cleanup() {
    rimrafSync(this.dir)
  }
  async init() {
    const alreadyCloned = await this.isCloned()
    if (!alreadyCloned) {
      // await this.fs.init("fs", {
      // 	wipe: true,
      // })
      // //
      console.log("Cloning repo ")
      await this.pfs.mkdir(this.dir)
      await git.clone(this.cloneOption())
    }
  }
}

export function createGit() {
  if (!Git.instance) Git.instance = new Git(config)

  return Git.instance
}
