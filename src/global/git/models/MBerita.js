import DBGitList from "@/global/git/DBGitList"
import {fileTransform} from "@/global/git/models/shadow-field-transformer/fileTransform"

class MBerita extends DBGitList{
	path="web/data/berita/berita.json"
	dataRootField="contents"	
	imageUploadPath="assets/images/berita"
	shadowFields = {
	    cover : fileTransform
	  }
}

export default MBerita