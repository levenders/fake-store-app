import { useAppSelector } from '@/hooks'

export function useAuth() {
  const { email, id } = useAppSelector(state => state.user)

  return {
    isAuth: !!id,
    email,
    id,
  }
}
