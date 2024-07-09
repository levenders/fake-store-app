import { memo } from 'react'

import s from './Loader.module.css'

export const Loader = memo(function Loader() {
  return <span className={s.loader} />
})
