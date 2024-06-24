import InputNumerico from '../../itensFormulario/InputNumerico';
import useFormularios from '../../../hooks/useFormularios';
import useUsuario from '../../../hooks/useUsuario';
import InputSenha from '../../itensFormulario/InputSenha';
import { useEffect } from 'react';


export default function FormularioRecuperarSenha(){

  const {indice, voltarEtapa, setIndice} = useFormularios();
  const {usuario, preencherUsuario, solicitarCodigoDeConfirmacao, enviarFormularioRecuperarSenha} = useUsuario();

  useEffect(() => {
    setIndice(1);
  }, [])

  return(
    <form onSubmit={enviarFormularioRecuperarSenha}>
      {
        indice == 1 ? (
          <>
            <input
              type='text'
              placeholder='Digite o email'
              name='email'
              onChange={(e) => preencherUsuario(e)}
              value={usuario.email || ""}
            />

            <button
              type='button'
              className={[(!usuario.email) && "desativado"]}
              disabled={(usuario.email) ? false : true}
              onClick={() => solicitarCodigoDeConfirmacao(true)}
            >
              Solicitar código
            </button>
          </>
        ) : indice == 2 && (
          <>
            <InputNumerico
              dica={"Digite o código de confirmação"}
              nome={"confirmacao"}
              entidade={usuario.confirmacao}
              preencherEntidade={preencherUsuario}
              maximoDenumeros={4}
            />

            <InputSenha
              dica={"Digite a nova senha"}
              nomeEntidade={"novaSenha"}
              entidade={usuario.novaSenha}
              preencherEntidade={preencherUsuario}
            />

            <InputSenha
              dica={"Confirme a nova senha"}
              nomeEntidade={"confirmacaoNovaSenha"}
              entidade={usuario.confirmacaoNovaSenha}
              preencherEntidade={preencherUsuario}
            />

            <button
              type='button'
              onClick={voltarEtapa}
            >
              Etapa anterior
            </button>

            <button
              className={[(!usuario.confirmacao || !usuario.novaSenha || !usuario.confirmacaoNovaSenha) && "desativado"]}
              disabled={(usuario.confirmacao && usuario.novaSenha && usuario.confirmacaoNovaSenha) ? false : true}
            >
              Alterar senha
            </button>
          </>
        )
      }
    </form>
  )
}