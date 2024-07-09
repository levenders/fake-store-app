import { Headling } from '@/components'

import s from './Error.module.css'

export const Error = () => {
  return (
    <div className={s.container}>
      <Headling>Кажется что то пошло не так...</Headling>
      <span className={s.error} />
    </div>
  )
}
