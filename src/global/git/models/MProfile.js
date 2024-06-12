import DBGitSingle from '../DBGitSingle';
import {fileTransform} from "@/global/git/models/shadow-field-transformer/fileTransform"

class MProfile extends DBGitSingle{
	path="web/data/profile.json"
	imageUploadPath="assets/images/profile"
	shadowFields = {
    	image : fileTransform
  	}
}

class MShortProfile extends MProfile{
	dataRootField="short"
}

class MFullProfile extends MProfile{
	dataRootField="full"
}

export {
	MShortProfile, MFullProfile
}
export default MProfile