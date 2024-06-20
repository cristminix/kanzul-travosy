class MetaParser {
	source = ""
	data = []
	title = ""
	constructor(source) {
		this.source = source
		this.parse()
	}
	unquote(str) {
		return str.replace(/^(\"|\')/, "").replace(/(\"|\')$/, "")
	}
	setTitle(title) {
		this.title = title
	}
	matchLine(regexes, line) {
		let matches = null
		let breakLoop = false
		for (const regex of regexes) {
			matches = line.match(regex)
			if (Array.isArray(matches)) {
				breakLoop = matches.length > 1
			}
			if (breakLoop) {
				break
			}
		}
		return matches
	}
	lineToKeyValue(line) {
		// let kind,key,content
		let output = null
		const regexKind = /(name|property)="(.*?)"/i
		const regexKind2 = /(name|property)='(.*?)'/i
		let matches = this.matchLine([regexKind, regexKind2], line)

		if (matches) {
			if (!output) {
				output = {}
			}
			let [ikind, kind, key] = matches
			key = this.unquote(key)
			output = { kind, key }
		}

		const regexContent = /content="(.*?)"/i
		const regexConten2 = /content='(.*?)'/i
		matches = this.matchLine([regexContent, regexConten2], line)

		if (matches) {
			if (!output) {
				output = {}
			}
			let [icontent, content] = matches
			output.content = this.unquote(content)
		}
		return output
	}
	parseLine(line) {
		line = line.replace(/^\</, "").replace(/\>$/, "").replace(/^meta/i, "").replace(/\s+/, " ").trim()
		const output = this.lineToKeyValue(line)
		if (output) {
			const { kind, key, content } = output
			if (kind && key && content) {
				return output
			}
		}
		return null
	}
	parse() {
		const regexAll = /\<meta\s+(.*)?\>/gi

		const matchResults = this.source.match(regexAll)
		// console.log(matchResults)
		let index = 0
		for (const line of matchResults) {
			let output = this.parseLine(line)
			if (output) {
				const lineIndex = `META_TAG_${index}`
				this.source = this.source.replace(line, lineIndex)
				output.line = lineIndex
				this.data.push(output)
			}
			index += 1
		}
	}
	set(key, content, kind = null) {
		const lastIndex = this.data.length+2
		const ptr = this.get(key, kind)
		if (ptr) {
			ptr.content = content
		} else {
			kind = kind ?? "name"
			const item={
				kind,
				key,
				content,
				line: `META_TAG_${lastIndex}`,
			}
			// console.log(item)
			this.data.push(item)
		}
	}

	get(key, kind = null) {
		// console.log(name)
		const filtered = this.data.filter((item) => {
			if (kind) {
				return item.key === key && item.kind === kind
			}
			return item.key === key
		})
		if (filtered.length > 0) return filtered.at(0)
		return null
	}
	getData() {
		return this.data
	}
	save() {
		let source = this.source
		for (const item of this.data) {
			const { kind, key, content, line } = item
			let META_TAG = `<meta ${kind}="${key}" content="${content}">`
			const regex = new RegExp(`${line}`, "i")
			// console.log(key,regex)
			if (this.source.match(line)) {
				source = source.replace(line, META_TAG)
			} else {
				source = source.replace(/<\/head>/, `\n${META_TAG}\n</head>`)
			}
		}
		source = source.replace(/<title>(.*?)<\/title>/, `<title>${this.title}</title>`)
		// console.log(this.source)
		return source
	}
}

export default MetaParser