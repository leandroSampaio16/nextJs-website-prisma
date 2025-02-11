import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "./firebase"

export default async function uploadFicheiroFireBase(dirENomeFicheiro: string, ficheiro: Buffer) {
    const rfStorage = ref(storage, dirENomeFicheiro)
    await uploadBytes(rfStorage, ficheiro)
    return (await getDownloadURL(rfStorage))
}