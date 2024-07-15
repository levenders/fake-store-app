import { auth } from '@/config/firebase'
import type { User } from '@/types'

export const getCurrentUser = (): User => {
  const user = auth.currentUser
  if (!user) {
    throw new Error('User is not authenticated')
  }
  return user
}
