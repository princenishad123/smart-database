import { myFile } from "./intializeFirebase";
import {listAll, ref, uploadBytes,getDownloadURL } from "firebase/storage";

class cloudStorage {
  constructor() {
    // this.storage
  }

  async uploadFile(file) {
    try {
      const fileRef = ref(myFile, `files/${1234}`);
     let a =   await  uploadBytes(fileRef, file);
      console.log(a)
    } catch (error) {
      console.log(error.code);
    }
  }

  getImagesURL(){
    let allImages = []
      listAll(ref(myFile,`files/`)).then((res)=>{
        res.items.forEach((result)=>{
            getDownloadURL(result).then((r)=>{
                if(r) allImages.push(r)
            
            })
        })
    })
    return allImages
   }
}

let storage = new cloudStorage();

export { storage };
