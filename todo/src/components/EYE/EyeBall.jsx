
import { useCallback, useRef, useState, useEffect  } from 'react'
import style from '../EYE/style.module.css'


export default function EyeBall() {



  return (
    <section  className={style.stage}>
    <figure className={style.ball}>
      <span className={style.shadow}></span>
      <span className={style.iris}  ></span>
    </figure>
</section>
  )
}
