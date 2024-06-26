import DBGitList from "@/global/git/DBGitList"
import { fileTransform } from "@/global/git/models/shadow-field-transformer/fileTransform"

class MHero extends DBGitList {
  path = "web/data/hero.json"
  imageUploadPath = "assets/images/homepage-slide"
  shadowFields = {
    image: fileTransform,
  }
}

export default MHero
