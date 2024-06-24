import styles from "./SeletorValores.module.css";

export default function SeletorValores({transacao, valor, executarAcao}){

  let valores = (transacao == "deposito") 
              ? [5, 10, 20, 50, 100, 500, 1000, 5000]
              : [60, 100, 200, 500, 1000, 5000, 10000, 50000];

  return(
    <div className={styles.seletoresValores}>
      {

        valores.map((numero) => (
          <div
            className={styles.seletorValor+" "+styles[(valor == numero) && "selecionado"]}
            key={numero}
            id={numero}
            onClick={executarAcao}
          > 
            R$ {numero.toFixed(2)}
          </div>
        ))
      }
    </div>
  )
}