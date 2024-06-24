import styles from './Container.module.css';

export default function Container({children, estilizacao}){

  let estilizacoesExterna = ["admin", "centralizar"];
  let estilizacoesInterna = ["aninharHorizontalmente", "home"]

  return(
    <div className={styles.container+" "+styles[(estilizacoesExterna.includes(estilizacao) && estilizacao)]}>
      <div className={styles.margemContainer+" "+styles[(estilizacoesInterna.includes(estilizacao) && estilizacao)]}>
        {children}
      </div>
    </div>
  )
}