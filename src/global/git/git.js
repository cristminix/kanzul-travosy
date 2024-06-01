import git from "isomorphic-git"
import http from "isomorphic-git/http/web"
import Fs from "./fs"
import {createRandomInt} from "@/global/fn/createRandomInt"
import { getRepoDir } from "./getRepoDir"

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
  repoUrl = null
  corsProxyUrl = null
  author = null
  token = null

  onCloneCallback = (f) => f
  constructor(config) {
    this.fs = new Fs("fs")
    this.repoUrl = config.repoUrl
    if (config.corsProxyUrl) {
      this.corsProxyUrl = config.corsProxyUrl
    }
    this.dir = getRepoDir(this.repoUrl)

    // console.log(`dir is ${this.dir}`)

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

  cloneOption() {
    const option = {
      fs: this.fs,
      http,
      dir: this.dir,
      url: this.repoUrl,
      // ref: "main",
      singleBranch: true,
      // noCheckout: true,
      onProgress: (event) => {
        if (typeof this.onCloneCallback === "function") {
          this.onCloneCallback(event)
        }
      },
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
  // commitOption(message) {
  //   // let remoteUrl = null
  //   // if (this.repoUrl.startsWith("http://")) {
  //   //   repoUrl = repoUrl.replace("http://", `http://${this.token}@`)
  //   // } else {
  //   //   repoUrl = repoUrl.replace("https://", `https://${this.token}@`)
  //   // }
  //   // const option = {
  //   //   fs: this.fs,
  //   //   dir: this.dir,
  //   //   author: this.author,
  //   //   message
  //   // }
  //   // if (this.corsProxyUrl) {
  //   //   option.corsProxy = this.corsProxyUrl
  //   // }
  //   return option
  // }
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
  /*async checkout(filepaths) {
    await git.checkout({
      fs: this.fs,
      dir: this.dir,
      filepaths,
    })
  }*/
  async log() {
    let commits = await git.log({
      fs: this.fs,
      dir: this.dir,
      force: true,
      follow: true,
    })
    // commits.forEach((commit) => {
    //   console.log(`${commit.oid}:${commit.commit.message}`)
    // })
    // console.log(commits)
    return commits
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
      const reinit = await confirm(`Couldn't pull git repo error:${error} , Would you like to restart git clone?`)
      if (reinit) {
        console.log("Restart git clone")
        await this.cleanup()
        await this.init()
        await this.fastForward()
      }
    }
  }
  async cleanup() {
    await this.fs.wipe()
    // await this.fs.mkdirSync(this.dir)
  }
  setOnCloneProgressHandler(dispatch,setLoading,setLoadingMessage){
    this.onCloneCallback = (progressEvent)=>{
        let loadingMessage = ''
        if (progressEvent.total) {
          const pctg = (progressEvent.loaded / progressEvent.total).toFixed(2) * 100
          loadingMessage= `${progressEvent.phase}  ${pctg} %`
        } else {
          loadingMessage= `Sedang memproses ...`
        }
        dispatch(setLoadingMessage(loadingMessage))
      }
  }
  async init(onCloneCallback) {
    if (typeof onCloneCallback === "function") {
      this.onCloneCallback = onCloneCallback
    }
    const alreadyCloned = await this.isCloned()
    if (!alreadyCloned) {
      console.log("Cloning repo ")
      if (!(await this.fs.existsSync(this.dir))) await this.fs.mkdirSync(this.dir)
      await git.clone(this.cloneOption())
    }
  }
}

export function createGit() {
  if (!Git.instance) Git.instance = new Git(config)

  return Git.instance
}