import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

import { firebase } from '@/constants/firebase'

const firebaseConfig = {
  apiKey: firebase.apiKey,
  authDomain: firebase.authDomain,
  projectId: firebase.projectId,
  storageBucket: firebase.storageBucket,
  messagingSenderId: firebase.messagingSenderId,
  appId: firebase.appId,
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
