// export function sum(a,b){
//     return a+b
// }

import { db } from "./intializeFirebase.js";

import {
  doc,
  setDoc,
  updateDoc,
  Timestamp,
  deleteDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

class smartDatabase {
  // it is create data in firebase firestore
  // uploadData system
  async uploadDoc(
    collection = "data",
    id = "123",
    data = "I,m Smart Database. made by Prince Nishad"
  ) {
    try {
      await setDoc(doc(db, collection, id), {
        ...data,
        timestamp: Timestamp.fromDate(new Date()),
        id: id,
      });
      return "201";
    } catch (error) {
      console.log("something went wrong", error);
    }
  }
  // update docs
  async updateDoc(collection, id, data) {
    try {
      const updateDocRef = doc(db, collection, id);
      await updateDoc(updateDocRef, data);
      return "200";
    } catch (error) {
      return error;
    }
  }
  // deleteDoc fron firestore
  async deleteDoc(collection, id) {
    try {
      let deletedData = await deleteDoc(doc(db, collection, id));
    
      return "Deleted";
    } catch (error) {
      return error;
    }
  }

  //Read Data from firebase firestore

  //get a docs
  async getOneDoc(collection, id) {
    try {
      const docSnap = await getDoc(doc(db, collection, id));
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        return "No such a Documents";
      }
    } catch (error) {
      return error;
      // console.log(error)
    }
  }

  // get all data in a collection

  async getAllDocs(coll) {
    try {
      let collectionDocs = [];
      const allDocs = await getDocs(collection(db, coll));
      allDocs.forEach((res) => {
        collectionDocs.push(res.data());
      });

      return collectionDocs;
    } catch (error) {
      return error;
    }
  }

  // get multiple docs in a collection
  async searchDocs(coll,queryName,search){
 try {
  let filteredData = [];

  const q = query(collection(db,coll),where(queryName,"==",search))
  const querySnapShot = await getDocs(q)

  querySnapShot.forEach((res)=>{
    filteredData.push(res.data())
  })

  return filteredData;
 } catch (error) {
  return error
 }

  }

  //get Limit data by order

  async getLimitDocs(coll,name,lim){
 try {
  let limitData = [];
  let howManyData = parseInt(lim)
  const citiesRef = collection(db,coll)
  const q =  query(citiesRef, orderBy(name), limit(howManyData));
  let data = await getDocs(q);

  data.forEach((res)=>{
    limitData.push(res.data())
  })
return limitData
 } catch (error) {
  return error
 }
    
  }
}

const services = new smartDatabase();

// services.uploadData()

export { services };
