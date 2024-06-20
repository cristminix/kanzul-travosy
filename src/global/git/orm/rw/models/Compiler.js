class MetaParser {
	source = ""
	data = []
	constructor(source) {
		this.source = source
		this.parse()
	}
	unquote(str) {
		return str.replace(/^(\"|\')/, "").replace(/(\"|\')$/, "")
	}
	matchLine(regexes,line){
		let matches = null
		let breakLoop = false
		for(const regex of regexes){
			matches = line.match(regex)
			if(Array.isArray(matches)){
				breakLoop=matches.length > 1
			}
			if(breakLoop){
				break
			}
		}
		return matches
	}
	lineToKeyValue(line){
		// let kind,key,content
		let output = null
		const regexKind = /(name|property)="(.*?)"/i
		const regexKind2 = /(name|property)='(.*?)'/i
		let matches = this.matchLine([regexKind,regexKind2],line)

		if(matches){
			if(!output){
				output = {}
			}
			let [ikind,kind,key] = matches
			key = this.unquote(key)
			output = {kind,key}
		}
		
		const regexContent = /content="(.*?)"/i
		const regexConten2 = /content='(.*?)'/i
		matches = this.matchLine([regexContent,regexConten2],line)
		
		if(matches){
			if(!output){
				output = {}
			}
			let [icontent,content] = matches
			output.content=this.unquote(content)
		}
		return output
	}
	parseLine(line){
		line = line.replace(/^\</,'')
				   .replace(/\>$/,'')
				   .replace(/^meta/i,'')
				   .replace(/\s+/,' ')
				   .trim()
		return this.lineToKeyValue(line)
	}
	parse() {
		const regexAll = /\<meta\s+(.*)?\>/gi

		const matchResults = this.source.match(regexAll)
		// console.log(matchResults)
		let index = 0
		for (const line of matchResults) {

			let output = this.parseLine(line)
			if(output){
				const lineIndex=`META_TAG_${index}`
				this.source = this.source.replace(line,lineIndex)
				output.line = lineIndex 
				this.data.push(output)
			}
			index += 1
		}
	}
	set(key, content, kind = null) {
		const ptr = this.get(name,kind)
		
		if(ptr){
			ptr.content = content
		}else{
			kind = kind ?? "name"
			this.data.push({
				kind,
				key,
				content,
				line:`META_TAG_${this.data.length}`
			})
		}
	}

	get(key, kind=null) {
		// console.log(name)
		const filtered = this.data.filter(item=>{
			if(kind){
				return item.key === key && item.kind === kind
			}
			return item.key === key
		})
		if(filtered.length>0)
			return filtered.at(0)
		return null
	}
	getData() {
		return this.data
	}
	save() {
		for(const item of this.data){
			const {kind,key,content,line} = item
			let META_TAG = `<meta ${kind}="${key}" content="${content}">`
			if(this.source.match(line)){
				this.source = this.source.replace(line,META_TAG)
			}else{
				this.source = this.source.replace('</head>',`\n${META_TAG}\n</head>`)
			}
		}
	}
}

class Compiler {
	model = null
	source = null
	outDir = null
	git = null
	baseDir = null
	parser = null
	constructor(model) {
		this.model = model
		this.source = model.compiler.source
		this.outDir = model.compiler.outDir
	}
	setBaseDir(path) {
		this.baseDir = path
	}
	buildMetaTag() {}

	buildOgTag() {}

	compileTransform(sourceContent, id, slug) {
		this.parser = new MetaParser(sourceContent)
		console.log(this.parser.get('og:description','property'))
		// const metaRegex=''
	}
	async compile(id) {
		const row = await this.model.getRow(id)
		if (row) {
			const { slug } = row
			let { fs, dir } = this.model.git
			if (this.baseDir) {
				dir = this.baseDir
			}
			const sourceFsPath = `${dir}/${this.source}`
			const outDirFsPath = `${dir}/${this.outDir}`

			const outDirGitPath_id_target = `${this.outDir}/${id}`
			const outDirGitPath_target = `${outDirGitPath_id_target}/${slug}`

			const outDirFsPath_id_target = `${dir}/${outDirGitPath_id_target}`
			const outDirFsPath_target = `${dir}/${outDirGitPath_target}`
			const targetGitPath = `${outDirFsPath_target}/index.html`
			const targetFsPath = `${dir}/${targetGitPath}`

			const outDirGitPath_exists = async () => await fs.existsSync(outDirFsPath)
			const outDirGitPath_id_target_exists = async () => await fs.existsSync(outDirFsPath_id_target)
			const outDirGitPath_target_exists = async () => await fs.existsSync(outDirFsPath_target)

			if (!(await outDirGitPath_exists())) {
				try {
					await fs.mkdirSync(outDirFsPath)
				} catch (e) {
					console.log(`lfs error : cant mkdir ${outDirFsPath}`)
				}
			}

			if (await outDirGitPath_exists()) {
				if (!(await outDirGitPath_id_target_exists())) {
					try {
						await fs.mkdirSync(outDirFsPath_id_target)
					} catch (e) {
						console.log(`lfs error : cant mkdir ${outDirFsPath_id_target}`)
					}
				}
			}
			if (await outDirGitPath_id_target_exists()) {
				if (!(await outDirGitPath_target_exists())) {
					try {
						await fs.mkdirSync(outDirFsPath_target)
					} catch (e) {
						console.log(`lfs error : cant mkdir ${outDirFsPath_target}`)
					}
				}
			}

			///done check dir///
			if (await outDirGitPath_target_exists()) {
				console.log(`compiler starting compile ${targetGitPath}`)
				let sourceContent = null
				try {
					sourceContent = (await fs.readFileSync(sourceFsPath, "utf-8")).toString()
				} catch (e) {
					console.log(`lfs error : cant read ${sourceFsPath}`)
				}
				if (sourceContent) {
					// console.log(sourceContent)
					const targetOutputBuffer = this.compileTransform(sourceContent, id, slug)
				}
			} else {
				console.log(`compile error : cant initialize ${outDirFsPath_target}`)
			}
		}
	}
}

export default Compiler