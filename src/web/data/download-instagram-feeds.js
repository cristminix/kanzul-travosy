import fs from "node:fs";
import cp from "node:child_process";
import path from "node:path";
// import { writeFileSync } from "../global/fn/writeFileSync.js";

import instagramPostList from "./instagram-posts-list.json" assert {type:'json'}

const CWD = process.cwd()
const dataDir = path.join(CWD,'src/web/data/instagram-feeds')
const download = async function (postId) {

	const command = `python -m instaloader --login pbsevens -- -${postId}`;
	
	const result = cp.execSync(command);
	console.log(result.toString())
};

try {
  process.chdir(dataDir)
  console.log('New directory: ' + process.cwd());
}
catch (err) {
  console.log('chdir: ' + err);
}

const main = async()=>{
	for(const post of instagramPostList){
		const {url} = post
		const postId = url.split('/')[4]
		// console.log(postId)
		if(!fs.existsSync(path.join(dataDir,`-${postId}`))){
			try{
				await download(postId)
			}catch(err){
				console.error(err)
			}
		}else{
			console.log(`SKIP ${postId}`)
		}
	}
}

main()