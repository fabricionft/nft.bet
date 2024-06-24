import styles from './DetalhesDeposito.module.css';
import iconFechar from '../../../assets/icons/fechar.png';

export default function DetalhesDeposito({executarAcao, detalhesDeposito}){

  return(
    <div className={styles.containerDetalhes}>
      <div className={styles.detalhes}>
        <img src={iconFechar} className={styles.iconFechar} 
          onClick={executarAcao}
        />

        <div className={styles.margemDetalhes}>
          <div className={styles.solicitacao}>
            <h2 className={styles.tituloDetalhes}>Solicitação</h2>

            <div className={styles.divisor}>
              <p className={styles.subtituloDetalhes}>Data</p>
              <p className={styles.textoDetalhes}>{detalhesDeposito.dataDeposito}</p>
            </div>

            <div className={styles.divisor}>
            <p className={styles.subtituloDetalhes}>Status</p>
              <p className={styles.textoDetalhes+" "+styles[
                (detalhesDeposito.statusDeposito == "Solicitado") ? "solicitado" :
                (detalhesDeposito.statusDeposito == "Concluído") ? "concluido" : "recusado"
              ]}>{detalhesDeposito.statusDeposito}</p>
            </div>

            {
              detalhesDeposito.statusDeposito == "Recusado" && (
                <div className={styles.divisor}>
                <p className={styles.subtituloDetalhes}>Motivo rejeição</p>
                <p className={styles.textoDetalhes}>{detalhesDeposito.motivoRejeicao}</p>
              </div>
              )
            }

            <div className={styles.divisor}>
              <p className={styles.subtituloDetalhes}>Valor déposito</p>
              <p className={styles.textoDetalhes}>R$ {detalhesDeposito.valorDeposito.toFixed(2)}</p>
            </div>

            <div className={styles.divisor}>
              <p className={styles.subtituloDetalhes}>Valor com bônus</p>
              <p className={styles.textoDetalhes}>R$ {detalhesDeposito.valorComBonus.toFixed(2)}</p>
            </div>

            <div className={styles.divisor}>
              <p className={styles.subtituloDetalhes}>Auditoria necessária</p>
              <p className={styles.textoDetalhes}>R$ {detalhesDeposito.auditoriaNecessaria.toFixed(2)} ({detalhesDeposito.multiplicadorDeAudutoria}X)</p>
            </div>

            <div className={styles.divisor}>
              <p className={styles.subtituloDetalhes}>Código</p>
              <p className={styles.textoDetalhes}>{(detalhesDeposito.codigoBonus != "0") ? "#"+detalhesDeposito.codigoBonus : "-"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}