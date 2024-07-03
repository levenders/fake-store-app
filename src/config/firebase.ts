import { firebase } from '@/constants'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: firebase.apiKey,
  authDomain: firebase.authDomain,
  projectId: firebase.projectId,
  storageBucket: firebase.storageBucket,
  messagingSenderId: firebase.messagingSenderId,
  appId: firebase.appId,
}

export const app = initializeApp(firebaseConfig)
