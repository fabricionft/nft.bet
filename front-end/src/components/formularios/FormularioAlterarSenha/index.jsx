import styles from './FormularioAlterarSenha.module.css';
import iconFechar from '../../../assets/icons/fechar.png';
import useUsuario from '../../../hooks/useUsuario';
import Sobreposicao from '../../../components/itensFormulario/Sobreposicao';
import InputSenha from '../../../components/itensFormulario/InputSenha';


export default function FormularioAlterarSenha({executarAcao}){

  const {usuario, preencherUsuario, enviarFormularioAlterarSenha} = useUsuario();

  return(

    <Sobreposicao>
      <form className={styles.formularioAlterarSenha}
        onSubmit={enviarFormularioAlterarSenha}
      >
        <img src={iconFechar} className={styles.iconFechar}
          onClick={executarAcao}
        />

        <div className={styles.margemFormularioAlterarSenha}>
          <p className={styles.textoCabecalhoFormularioCadastro}>Alterar senha</p>

          <InputSenha
            dica={"Senha atual"}
            nomeEntidade={"senha"}
            entidade={usuario.senha}
            preencherEntidade={preencherUsuario}
          />

          <InputSenha
            dica={"Nova senha"}
            nomeEntidade={"novaSenha"}
            entidade={usuario.novaSenha}
            preencherEntidade={preencherUsuario}
          />

          <InputSenha
            dica={"Nova senha"}
            nomeEntidade={"confirmacaoNovaSenha"}
            entidade={usuario.confirmacaoNovaSenha}
            preencherEntidade={preencherUsuario}
          />

          <button>Alterar</button>
        </div>
      </form>
    </Sobreposicao>
  );
}