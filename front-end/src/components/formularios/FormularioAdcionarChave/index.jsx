import styles from './FormularioAdcionarChave.module.css';
import iconFechar from '../../../assets/icons/fechar.png';
import useChaves from '../../../hooks/useChaves';
import Sobreposicao from '../../itensFormulario/Sobreposicao';
import InputNumerico from '../../itensFormulario/InputNumerico';

export default function FormularioAdcionarChave({executarAcao}){

  const {chavePIX, preencherChavePix, enviarFormularioAdcionarChave} = useChaves();

  return(
    <Sobreposicao>
      <form onSubmit={enviarFormularioAdcionarChave} className={styles.formularioAdcionarChave}>
        <img 
          src={iconFechar} 
          className={styles.iconFechar}
          onClick={executarAcao}
        />

        <div className={styles.margemFormularioAdcionarChave}>
          <p className={styles.textoCabecalhoFormularioAdcionarChave}>Adcionar PIX</p>

          <input 
            type="text"
            placeholder='Digite o nome completo do titular'
            name='nomeTitular'
            onChange={(e) => preencherChavePix(e)}
            value={chavePIX.nomeTitular || ""}
          />

          <select
            name='tipoChave'
            onChange={(e) => preencherChavePix(e)}
            value={chavePIX.tipoChave || ""}
          >
            <option value="escolha">Escolha o tipo da chave</option>
            <option value="CPF">CPF</option>
            <option value="Celular">Celular</option>
            <option value="Email">Email</option>
          </select>

          {
            ["CPF", "Celular"].includes(chavePIX.tipoChave) ? (
              <InputNumerico
                dica={"Digite a chave"}
                nome={"chave"}
                entidade={chavePIX.chave}
                preencherEntidade={preencherChavePix}
                maximoDenumeros={11}
              />
            ) : (
              <input 
                type={"text"}
                placeholder='Digite a chave'
                name='chave'
                onChange={(e) => preencherChavePix(e)}
                value={chavePIX.chave || ""}
              />
            )
          }


          <InputNumerico
            dica={"Digite o CPF do titular"}
            nome={"cpfTitular"}
            entidade={chavePIX.cpfTitular}
            preencherEntidade={preencherChavePix}
            maximoDenumeros={11}
          />  

          <button>Adcionar PIX</button>
        </div>
      </form>
    </Sobreposicao>
  )
}