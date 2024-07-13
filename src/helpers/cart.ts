import { doc } from 'firebase/firestore'

import { auth, db } from '@/config/firebase'
import type { User } from '@/types'

export const getCartRef = (userId: string) => doc(db, 'carts', userId)

export const getCurrentUser = (): User => {
  const user = auth.currentUser
  if (!user) {
    throw new Error('User is not authenticated')
  }
  return user
}
