import styles from './FormularioCadastro.module.css';
import useFormularios from '../../../hooks/useFormularios';
import useUSuario from '../../../hooks/useUsuario'
import InputNumerico from '../../itensFormulario/InputNumerico';
import InputSenha from '../../itensFormulario/InputSenha';
import { Link } from 'react-router-dom';
import useValidacoes from '../../../hooks/useValidacoes';
import { useEffect } from 'react';

export default function FormularioCadastro(){

  const {usuario, preencherUsuario, enviarFormularioCadastro, solicitarCodigoDeConfirmacao} = useUSuario();
  const {indice, avancarEtapa, voltarEtapa, setIndice} = useFormularios();
  const {validarEtapa1FormularioCadastro, validarEtapa2FormularioCadastro} = useValidacoes();

  useEffect(() => {
    setIndice(1);
  }, [])


  return(
    <form
      onSubmit={enviarFormularioCadastro}
    >
      <header className={styles.cabecalho}>
        <p>
          {indice == 1 ? "Dados pessoais" : indice == 2 ? "Dados de login" : "Confirmação"}
        </p>

        <p className={styles.indice}>{indice}/3</p>
      </header>

      { indice == 1 ? (
          <>
            <input 
              type="text"
              placeholder='Digite seu nome completo'
              name='nomeCompleto'
              onChange={(e) => preencherUsuario(e)}
              value={usuario.nomeCompleto || ""}
            />

            <InputNumerico
              dica={"Digite seu CPF (somente números)"}
              nome={"cpf"}
              entidade={usuario.cpf}
              preencherEntidade={preencherUsuario}
              maximoDenumeros={11}
            />

            <InputNumerico
              dica={"Digite seu Celular (somente números)"}
              nome={"celular"}
              entidade={usuario.celular}
              preencherEntidade={preencherUsuario}
              maximoDenumeros={11}
            />

            <InputNumerico
              dica={"Código bônus (opcional)"}
              nome={"codigoBonus"}
              entidade={usuario.codigoBonus}
              preencherEntidade={preencherUsuario}
              maximoDenumeros={4}
            />

            <InputNumerico
              dica={"Código de convite (opcional)"}
              nome={"codigoConvite"}
              entidade={usuario.codigoConvite}
              preencherEntidade={preencherUsuario}
              maximoDenumeros={4}
            />
          </>
        ) : indice == 2 ? (
          <>
            <input 
              type="text"
              placeholder='Digite seu email'
              name='email'
              onChange={(e) => preencherUsuario(e)}
              value={usuario.email || ""}
            />

            <InputSenha
              dica={"Defina sua senha"}
              nomeEntidade={"senha"}
              entidade={usuario.senha}
              preencherEntidade={preencherUsuario}
            />

            <InputSenha
              dica={"Defirme sua senha"}
              nomeEntidade={"confirmacaoSenha"}
              entidade={usuario.confirmacaoSenha}
              preencherEntidade={preencherUsuario}
            />
          </>
        ) : indice == 3 && (
          <InputNumerico
            dica={"Digite o codigo de confirmação"}
            nome={"confirmacao"}
            preencherEntidade={preencherUsuario}
            entidade={usuario.confirmacao}
            maximoDenumeros={4}
          />
        )
      }

      {
        indice == 1 ? (
          <button 
            type='button' 
            onClick={(e) => {
              if(validarEtapa1FormularioCadastro(usuario)) avancarEtapa(e)
            }}
          >
            Próxima etapa
          </button>
        ) : indice == 2 ? (
          <>
            <button 
              type='button' 
              onClick={voltarEtapa}
            >
              Etapa anterior
            </button>

            <button
              type='button'
              onClick={
                () => {
                  if(validarEtapa2FormularioCadastro(usuario)) solicitarCodigoDeConfirmacao(false);
                }
              }
            >
              Próxima etapa
            </button> 
          </>
        ) : indice == 3 && (
          <>
            <button 
              type='button' 
              onClick={voltarEtapa}
            >
              Etapa anterior
            </button>
            
            <button>
              Cadastro
            </button> 
          </>
        )
      }

      <Link className={styles.textoRodapeFormularioCadastro} to={"/login"}>Já possui conta?</Link>
    </form>
  );
}