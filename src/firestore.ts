// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, where, onSnapshot, setDoc } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider, connectAuthEmulator, onAuthStateChanged, signOut,
            signInWithEmailAndPassword, createUserWithEmailAndPassword, AuthErrorCodes } from "firebase/auth";

import {ref} from "vue";
import {getJobList, jobList, loginOpen, signInOpen, testList, userIsLogged, userUid} from "@/store";


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

export async function addItemFireStoreWithCustomId(item: any, path: string, customId: string) {
    const db = getFirestore(appFire);
    const jobListCol = collection(db, path);
    try {
        const docRef = doc(db, path, customId);
        await setDoc(docRef, item);
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

// testowanie query plus realtime collection
// plus testowanie laczenia sie z baza danych
const db = getFirestore(appFire);

const colRef = collection(db, 'joblist');

export let serchValue = ref('');


    // onSnapshot(serchByName, (snapshot: any) => {
    //     testList.value = [];
    //     snapshot.docs.forEach((doc: any) => {
    //         testList.value.push({...doc.data(), id: doc.id})
    //     })
    // });

export function serchByName(name:string) {
    let serchByName = query(colRef, where("name", "==", name));
    getDocs(serchByName).then((querySnapshot: any) => {
        testList.value = [];
        querySnapshot.forEach((doc: any) => {
            testList.value.push({...doc.data(), id: doc.id})
        })
    });
}

export function searchByDate(start: any, end: any ) {
   // let searchByDate = query(colRef, where("date", ">=", start), where("date", "<=", end));
    let searchByDate = query(colRef, where("date", ">=", start), where("date", "<=", end));
    getDocs(searchByDate).then((querySnapshot: any) => {
        testList.value = [];
        querySnapshot.forEach((doc: any) => {
            testList.value.push({...doc.data(), id: doc.id})
        })

    })

}

//Autoryzacja uzytkownika Logi in i Log out plus sign in with email and password
const auth = getAuth(appFire);

export const loginEmailPassword = async (login:string, password:string) => {

    try {
        const userCredential = await signInWithEmailAndPassword(auth, login, password);
        console.log(userCredential);
        userUid.value = userCredential.user?.uid;
        loginOpen.value = false;
    }
    catch (error) {
        console.log(error);
        showLoginError(error);
    }
}

// przechwytywanie bledow logowania
const showLoginError = (error: any) => {
    if (error.code === AuthErrorCodes.INVALID_EMAIL) {
        alert('Nieprawidłowy email')
    }
    else {
        alert('Error' + error.message)
    }

}

//rejestrowanie uzytkownika przez email i haslo
export const registerEmailPassword = async (login:string, password:string) => {

    try {
        const userCredential = await  createUserWithEmailAndPassword(auth, login, password);
        const newUser = {email: userCredential.user?.email, uid: userCredential.user?.uid};
        await addItemFireStoreWithCustomId(newUser, 'users', newUser.uid);

        signInOpen.value = false;
        console.log(userCredential);
    }
    catch (error) {
        console.log(error);
        showLoginError(error);
    }
}
//sprawdzanie czy uzytkownik jest zalogowany
export const checkUserIsLogin = async () => {
  onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('zalogowany' + user.email);
                userIsLogged.value = true;
                userUid.value = user.uid;
                getJobList()
            } else {
                console.log('niezalogowany');
                userIsLogged.value = false;
            }
        });
}
checkUserIsLogin();

//wylogowywanie uzytkownika
export const logout = async () => {
    try {
        await signOut(auth);
        jobList.value = [];
        userIsLogged.value = false;
        userUid.value = '';
        console.log('wylogowany');
    }
    catch (error) {
        console.log(error);
    }
}



//logowanie przez google
export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
        const userCredential = await signInWithPopup(auth, provider);
        const newUser = {email: userCredential.user?.email, uid: userCredential.user?.uid};
        await addItemFireStoreWithCustomId(newUser, 'users', newUser.uid);
        signInOpen.value = false;
        loginOpen.value = false;
        console.log(userCredential);
    }
    catch (error) {
        console.log(error);
        showLoginError(error);
    }
}

//odzyskiwanie hasla przez email

 export const passwordRecoveryByEmail = async () => {


 }