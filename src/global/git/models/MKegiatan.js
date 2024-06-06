import DBGitList from "../DBGitList"
import {getFileInfo} from "@/global/fn/getFileInfo"
class MKegiatan extends DBGitList {
  path = "web/data/kegiatan.json"
  // imageUploadPath = "assets/images/kegiatan"
  dataRootField = "contents"
  pk = "id"

}

export default MKegiatan