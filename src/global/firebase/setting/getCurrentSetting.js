import { doc, getDoc } from "firebase/firestore"
import firebase from "../firebase"

export const getCurrentSetting = async (pk = "fHv6vH2qC9BBnucPdo62") => {
  const settingDoc = await getDoc(doc(firebase.firestore(), "settings", pk))
  const setting = settingDoc.data()
  if (!setting) {
    return null
  }

  return {
    ...setting,
    id: settingDoc.id,
  }
}
