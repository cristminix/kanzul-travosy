import DBGitList from "@/global/git/DBGitList"
import {fileTransform} from "@/global/git/models/shadow-field-transformer/fileTransform"
class MLembaga extends DBGitList {
  path = "web/data/lembaga.json"
  imageUploadPath = "assets/images/lembaga"
  dataRootField = "contents"
  pk = "id"

  // ShadowField Options
  shadowFields = {
    image : fileTransform
  }

  // ShadowField Temporal values
  shadowedFieldValues = {
    /*
    pk : {image : "/assets/image/logo/logo-dark.png"}
    */
  }


}

export default MLembaga