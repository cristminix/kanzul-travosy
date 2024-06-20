import MetaParser from './MetaParser';

class HTMLCompiler {
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
	setTitle(title){

	}

	compileTransform(sourceContent, row) {
		this.parser = new MetaParser(sourceContent)
		const source = this.model.compile(this.parser,row)
		// console.log(this.parser.save())
		// const metaRegex=''
		// console.log(source)
		return source
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
			const targetGitPath = `${outDirGitPath_target}/index.html`
			const targetFsPath = `${dir}/${targetGitPath}`

			console.log({
				sourceFsPath,
				outDirFsPath_target,
				targetGitPath,
				targetFsPath
			})

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
					const targetOutputBuffer = this.compileTransform(sourceContent, row)
					try{
						console.log(`Write ${targetFsPath}`)
						await fs.writeFileSync(targetFsPath,targetOutputBuffer)
					}catch(e){
						console.log(`lfs error: cant write ${targetFsPath}`,e)
					}
					// console.log(targetOutputBuffer)
				}
			} else {
				console.log(`compile error : cant initialize ${outDirFsPath_target}`)
			}
		}
	}
}

export default HTMLCompiler