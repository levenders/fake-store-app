import { doc } from 'firebase/firestore'

import { db } from '@/config/firebase'

export const getCartRef = (userId: string) => doc(db, 'carts', userId)

export const getHistoryRef = (userId: string) => doc(db, 'histories', userId)
