import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'
const config = {
  apiKey: 'AIzaSyAAdyR4C1IcBZiu0iN-iPcaSRgONttAc1I',
  authDomain: 'gitgrader-6b726.firebaseapp.com',
  databaseURL: 'https://gitgrader-6b726-default-rtdb.firebaseio.com',
  projectId: 'gitgrader-6b726',
  storageBucket: 'gitgrader-6b726.appspot.com',
  messagingSenderId: '843614247453',
  appId: '1:843614247453:web:6160e1f485124bc63044f4',
  measurementId: 'G-03NHN4YCXQ'
}

const app = firebase.initializeApp(config)
export const auth = firebase.auth()
export const storage = firebase.storage()
export const firestore = firebase.firestore(app)
export const firebaseFirestore = firebase.firestore
const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
