import {getFileInfo} from "@/global/fn/getFileInfo"

export const fileTransform = {
	async transformOnLoad(oValue, oRow, self) {
		// const newValue = ''
		return await self.git.getFile64Data(oValue)
	},
	async transformOnSave(oValue, oRow, self) {
		const fileInfo = getFileInfo(oValue, true)
		console.log(fileInfo)
		const oldPath = self.shadowedFieldValues[oRow[self.pk]].image
		const oldGitPath = oldPath.replace(/^\//, "")
		const newGitPath = `${self.imageUploadPath}/${fileInfo.name}`
		const newPath = `/${newGitPath}`
		console.log({ oldPath, newPath, newGitPath })
		if (oldPath !== newPath) {
			self.commitQueues.push(newGitPath)
			console.log(`Do save file from base64 to ${newPath}`)

			const oldFsPath = self.git.basePath(oldGitPath)
			const newFsPath = self.git.basePath(newGitPath)

			console.log({ oldFsPath, newFsPath })
			try {
				await self.fs.writeFileSync(newFsPath, fileInfo.buffer)
				self.commitMessageQueues.push(`Create file ${newFsPath}`)
				await self.git.add(newGitPath)
			} catch (e) {
				console.log(`lfs: cant writeFile ${newFsPath}`, e)
			}

			console.log(`Do delete old file ${oldFsPath}`)
			try {
				await self.fs.unlinkSync(oldFsPath)
				await self.git.remove(oldGitPath)
				self.commitMessageQueues.push(`Delete ${oldGitPath}`)
			} catch (e) {
				console.log(`lfs: cant delete ${oldPath}`, e)
			}
		} else {
			console.log(`skip oldPath === newPath is true`)
		}
		return newPath
		// return self.shadowedFieldValues[oRow[this.pk]]
	},
}