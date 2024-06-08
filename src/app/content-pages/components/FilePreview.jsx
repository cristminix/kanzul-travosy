import { useEffect, useState } from "react"
import { gitInstance } from "@/global/git"
const git = gitInstance()
const FilePreview = ({ id, path }) => {
	const [dataUrl, setDataUrl] = useState(null)
	const [fileInfo, setFileInfo] = useState(null)
	const processfile = async () => {
		try {
			const { info, dataUrl } = await git.getFile64Data(path, true, true)
			console.log(info)
			setFileInfo((oData) => ({ ...oData, ...info }))
			setDataUrl(dataUrl)
		} catch (e) {}
	}

	useEffect(() => {
		if (path) processfile()
	}, [path, setFileInfo, setDataUrl])
	return (
		<div className="file-viewer">
			{fileInfo ? (
				<>
					{fileInfo.mime ? (
						<>
							{fileInfo.mime.mime.startsWith("image") ? (
								<>
									<img className="image-preview" src={dataUrl} />
								</>
							) : null}
						</>
					) : null}
				</>
			) : null}
		</div>
	)
}

export default FilePreview