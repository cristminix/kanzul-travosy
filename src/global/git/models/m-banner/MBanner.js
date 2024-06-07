import DBGitSingle from "@/global/git/DBGitSingle"
import {fileTransform} from "@/global/git/models/shadow-field-transformer/fileTransform"

class MBanner extends DBGitSingle{
  imageUploadPath = "assets/images/banner"
  dataRootField = "banner"
  pk = "id"

  shadowFields = {
    image : fileTransform
  }
}

export default MBanner