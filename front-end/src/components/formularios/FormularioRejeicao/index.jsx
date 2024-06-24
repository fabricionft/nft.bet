import styles from './FormularioRejeicao.module.css';

//Assets
import iconFechar from '../../../assets/icons/fechar.png';


export default function FormularioRejeicao({entidade, executarAcao, preencherEntidade, enviarFormulario}){

  return(
    <div className={styles.containerFormulario}>
      <form onSubmit={enviarFormulario} className={styles.formularioRejeicao}>
        <img src={iconFechar} className={styles.iconFechar} 
          onClick={executarAcao}
        />

        <div className={styles.margemFormularioRejeicao}>
          <textarea className={styles.textareaFormularioRejeicao}
            maxLength={300}
            placeholder='Digite o motivo pelo qual você irá recusar esta transação (máx 300 carácteres)'
            name="motivoRejeicao"
            onChange={(e) => preencherEntidade(e)}
          >
          </textarea>

          <button className={styles.btnRecusarSolicitacao+" "+[(!entidade.motivoRejeicao) && "desativado"]}
            disabled={(entidade.motivoRejeicao) ? false : true}
          >{(entidade.motivoRejeicao) ? "Confrimar" : "Digite o motivo"}</button>
        </div>  
      </form>
    </div>
  )
}