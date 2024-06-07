import FileExplorerApp from "@/app/file-explorer/FileExplorerApp"
import { useSelector, useDispatch } from "react-redux"

import MainContentLayout from "./MainContentLayout"

const FilesContentPage = ({}) => {
	const contentState = useSelector((state) => state.content)
	const pageTitle = "Files"
	const breadcrumbs = [
		{ title: "Konten", path: "contents" },
		{ title: "Files", path: "content/files" },
	]
	return (
		<MainContentLayout
			pageTitle={pageTitle}
			breadcrumbs={breadcrumbs}
			className={`${contentState.isLoading ? "content-is-loading" : ""}`}>
			<div className="col-12 grid-margin stretch-card">
				<div className="card">
					<div className="card-body">
						<FileExplorerApp />
					</div>
				</div>
			</div>
		</MainContentLayout>
	)
}

export default FilesContentPage