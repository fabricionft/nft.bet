import styles from './DetalhesSaque.module.css';
import iconFechar from '../../../assets/icons/fechar.png';

export default function DetalhesSaque({executarAcao, detalhesSaque}){

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
              <p className={styles.textoDetalhes}>{detalhesSaque.dataSaque}</p>
            </div>

            <div className={styles.divisor}>
              <p className={styles.subtituloDetalhes}>Status</p>
              <p className={styles.textoDetalhes+" "+styles[
                (detalhesSaque.statusSaque == "Solicitado") ? "solicitado" :
                (detalhesSaque.statusSaque == "Concluído") ? "concluido" : "recusado"
              ]}>{detalhesSaque.statusSaque}</p>
            </div>

            {
              detalhesSaque.statusSaque == "Recusado" && (
                <div className={styles.divisor}>
                <p className={styles.subtituloDetalhes}>Motivo rejeição</p>
                <p className={styles.textoDetalhes}>{detalhesSaque.motivoRejeicao}</p>
              </div>
              )
            }

            <div className={styles.divisor}>
              <p className={styles.subtituloDetalhes}>Valor</p>
              <p className={styles.textoDetalhes}>R$ {detalhesSaque.valorSaque.toFixed(2)}</p>
            </div>
          </div>

          <div className={styles.destinatario}>
            <p className={styles.tituloDetalhes}>Destinatário</p>

            <div className={styles.divisor}>
              <p className={styles.subtituloDetalhes}>Titular</p>
              <p className={styles.textoDetalhes}>{detalhesSaque.nomeTitular} ({detalhesSaque.cpfTitular})</p>
            </div>

            <div className={styles.divisor}>
              <p className={styles.subtituloDetalhes}>Chave</p>
              <p className={styles.textoDetalhes}>{detalhesSaque.chave} ({detalhesSaque.tipoChave})</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}