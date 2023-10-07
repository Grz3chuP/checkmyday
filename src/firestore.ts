// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {

    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_API_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID
};

// Initialize Firebase
export const appFire = initializeApp(firebaseConfig);

export async function getJobListFromFireStoreOrEmptyArray(path: string) {
    const db = getFirestore(appFire);
    const jobListCol = collection(db, path);
    const jobListSnapshot = await getDocs(jobListCol);
    //console.log(jobListSnapshot);
    if (jobListSnapshot.empty) {
        return [];
    } else {
        const jobList: any[] = [];
        jobListSnapshot.forEach(doc => {
            let item = doc.data();

            item.id = doc.id;
            jobList.push(item);
        });
        return jobList;
    }
}

export async function addJobItemToFireStore(item: any, path: string) {
    const db = getFirestore(appFire);
    const jobListCol = collection(db, path);
    try {
        const docRef = await addDoc(jobListCol, item);
        console.log("Document written with ID: ", docRef.id);
        item.id = docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function deleteJobItemFromFireStore(item: any, path: string) {
    const db = getFirestore(appFire);
    console.log(item);
    const docRef = doc(db, path, item.id);
    console.log(docRef)
    //remove item from jobList
    try {
        await deleteDoc(docRef);
        console.log("Document deleted with ID: ", item.id);
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
}

//update end field in document
export async function updateJobItemFromFireStore(item: any, path: string) {
    const db = getFirestore(appFire);
    console.log(item);
    const docRef = doc(db, path, item.id);
    try {
        await updateDoc(docRef, {priority: item.priority});
    } catch (e) {
        console.error("Error updating document: ", e);
    }
}
