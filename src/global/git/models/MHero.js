import DBGitList from "@/global/git/DBGitList"
import {fileTransform} from "@/global/git/models/shadow-field-transformer/fileTransform"

class MHero extends DBGitList{
	path="web/data/hero.json"
	dataRootField="contents"	
	imageUploadPath="assets/images/image-slide"
	shadowFields = {
    	image : fileTransform
  	}
}

export default MHero