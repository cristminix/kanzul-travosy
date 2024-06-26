import git from "isomorphic-git"
import http from "isomorphic-git/http/web"
import Fs from "./fs"
import { createRandomInt } from "@/global/fn/createRandomInt"
import { arrayBufferToBase64 } from "@/global/fn/arrayBufferToBase64"
import { getRepoDir } from "./getRepoDir"
import { parse as parseMimeType } from "file-type-mime"
import { getMimeTypeByExtension } from "@/global/fn/getMimeTypeByExtension"
const config = {
  repoUrl: "https://github.com/kanzululum/kanzululum.github.io.git",
  author: {
    name: "Purple Admin",
    email: "admin@ponpeskanzululumcirebon.com",
  },
  token: "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",
  corsProxyUrl: "https://cors.isomorphic-git.org",
}

class Git {
  static instance = null
  dir = "/repo"
  fs = null
  repoUrl = null
  corsProxyUrl = null
  author = null
  token = null

  getGit() {
    return git
  }
  async getFile64Data(path, includeInfo = false, direct = false) {
    const fileGitPath = !direct ? `${this.dir}${path}` : path
    const fileGitPathSplit = fileGitPath.split("/")

    const filename = fileGitPathSplit[fileGitPathSplit.length - 1]

    // console.log(fileGitPath)
    let buffer
    try {
      buffer = await this.fs.readFileSync(fileGitPath)
    } catch (e) {
      console.log(`lfs: cant readFile ${fileGitPath}`)
    }

    if (buffer) {
      try {
        let mimeType = parseMimeType(buffer)
        if (!mimeType) {
          mimeType = getMimeTypeByExtension(filename)
        }
        // console.log(mimeType)

        let mime = "application/octet-stream"
        if (mimeType) {
          mime = mimeType.mime
        }
        let output = `data:${mime};charset=utf-8;name=${filename};base64,${arrayBufferToBase64(buffer)}`
        // console.log(output)
        if (includeInfo) {
          const info = {
            mime: mimeType,
            filename,
          }

          return { info, dataUrl: output }
        }
        return output
      } catch (e) {
        console.log(`Error:getFile64Data`, e)
      }
    }
    return null
  }

  getRelativePath(fullPath) {
    return fullPath.replace(`${this.dir}/`, "")
  }
  basePath(path) {
    return `${this.dir}/${path}`
  }
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
  async commit(filepaths, message = null) {
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

  async fastForward(onProgress = (f) => f, onComplete = (f) => f) {
    let pullSuccess = false
    let error = "false"
    let option = {
      fs: this.fs,
      http,
      dir: this.dir,
      singleBranch: true,
      onProgress: (event) => {
        onProgress(event)
        console.log(event.phase)
        if (event.total) {
          console.log(event.loaded / event.total)
        } else {
          console.log(event.loaded)
        }
      },
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
    onComplete(pullSuccess)
  }
  async cleanup() {
    await this.fs.wipe()
    // await this.fs.mkdirSync(this.dir)
  }
  setOnCloneProgressHandler(dispatch, setLoading, setLoadingMessage) {
    this.onCloneCallback = (progressEvent) => {
      let loadingMessage = ""
      if (progressEvent.total) {
        const pctg = (progressEvent.loaded / progressEvent.total).toFixed(2) * 100
        loadingMessage = `${progressEvent.phase}  ${pctg} %`
      } else {
        loadingMessage = `Sedang memproses ...`
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
  async remove(gitPath) {
    await git.remove({ fs: this.fs, dir: this.dir, filepath: gitPath })
  }
  async add(gitPath) {
    await git.add({ fs: this.fs, dir: this.dir, filepath: gitPath })
  }
}

export function gitInstance() {
  return createGit()
}
export function createGit() {
  if (!Git.instance) Git.instance = new Git(config)

  return Git.instance
}
