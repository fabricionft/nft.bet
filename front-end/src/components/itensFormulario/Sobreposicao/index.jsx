import styles from './Sobreposicao.module.css'

export default function Sobreposicao({children}){

  return(
    <div className={styles.containerFormulario}>
      {children}
    </div>
  )
}