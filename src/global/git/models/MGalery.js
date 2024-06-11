import DBGitList from "@/global/git/DBGitList"
import {fileTransform} from "@/global/git/models/shadow-field-transformer/fileTransform"

class MGalery extends DBGitList{
	path="web/data/galery.json"
	dataRootField="contents"	
	imageUploadPath="assets/images/galery/croped"
	shadowFields = {
	    image : fileTransform
	  }
}

export default MGalery