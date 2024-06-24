import styles from './Conta.module.css';

//Assets
import iconInfo from '../../../assets/icons/info.png';
import iconAtencao from '../../../assets/icons/atencao.png';
import iconCopiar from '../../../assets/icons/copiar.png';

//Components
import Container from "../../../components/layout/Container";
import FormularioAlterarSenha from "../../../components/formularios/FormularioAlterarSenha";
import FormularioAdcionarChave from "../../../components/formularios/FormularioAdcionarChave";
import Loader from "../../../components/utils/Loader";
import DetalhesSaque from "../../../components/utils/DetalhesSaque";
import DetalhesDeposito from "../../../components/utils/DetalhesDeposito";

//Hooks
import { useState } from "react";
import useDadosUsuario from "../../../hooks/useDadosUsuario";
import useFormularios from "../../../hooks/useFormularios";
import useSaque from "../../../hooks/useSaque";
import useDeposito from "../../../hooks/useDeposito";

//Utils
import ocultarTexto from '../../../utils/ocultarTexto';
import formatarCPF from '../../../utils/formatarCPF';
import formatarCelular from '../../../utils/formatarCelular';


export default function Conta(){

  const {usuario, copiarIDUsuario, copiarCodigoDeConvite} = useDadosUsuario();
  const {visibilidadeFormularioAlterarSenha, exibirFormularioAlterarSenha, esconderFormularioAlterarSenha,
         visibilidadeFormularioAdcionarChave, exibirFormularioAdcionarChave, esconderFormularioAdcionarChave} = useFormularios();
  const {buscarDeposito, detalhesDeposito, removerDetalhesDeposito} = useDeposito();
  const {buscarSaque, detalhesSaque, removerDetalhesSaque} = useSaque();
  const [exibirConteudo, setExibirConteudo] = useState("dados");

  return(
  <Container>
      {
        usuario.codigo ? (
        <>
          <header className={styles.headerPerfil}>
            <span className={styles.spanAlterarAba+" "+styles[(exibirConteudo == "dados") && "selecionado"]} 
              onClick={() => setExibirConteudo("dados")}
            >
              Dados
            </span>

            <span className={styles.spanAlterarAba+" "+styles[(exibirConteudo == "historicoDepositos") && "selecionado"]}  
              onClick={() => setExibirConteudo("historicoDepositos")}
            >
              Depósitos
            </span>

            <span className={styles.spanAlterarAba+" "+styles[(exibirConteudo == "historicoSaques") && "selecionado"]} 
              onClick={() => setExibirConteudo("historicoSaques")}
            >
              Saques
            </span>

            <span className={styles.spanAlterarAba+" "+styles[(exibirConteudo == "convidar") && "selecionado"]} 
              onClick={() => setExibirConteudo("convidar")}
            >
              Convidar
            </span>
          </header>
          
          <div className={styles.containerPerfil}>
          {
            exibirConteudo == "dados" ? (
            <>
              <div className={styles.divisaoDadosPessoais}>
                <div className={styles.dadosPessoais}>
                  <div className={styles.margemDadosPessoais}>
                    <span className={styles.id}>
                      #{usuario.id}
                      <img src={iconCopiar} className={styles.iconCopiar} 
                        onClick={() => copiarIDUsuario(usuario.id)}
                      />
                    </span>

                    <p className={styles.subtitulo}>Email</p>
                    <p className={styles.texto}>{usuario.email}</p>

                    <p className={styles.subtitulo}>Nome</p>
                    <p className={styles.texto}>{ocultarTexto(usuario.nomeCompleto)}</p>

                    <p className={styles.subtitulo}>CPF</p>
                    <p className={styles.texto}>{formatarCPF(usuario.cpf)}</p>

                    <p className={styles.subtitulo}>Celular</p>
                    <p className={styles.texto}>{formatarCelular(usuario.celular)}</p>

                    <p className={styles.subtitulo}>Chaves {usuario.chaves.length}/3</p>
                    <div className={styles.chaves}>
                      {
                        usuario.chaves.length ? (
                          <>
                            {
                              usuario.chaves.map((chave, index) => <div key={index} className={styles.chave}>{chave.chave} ({chave.tipoChave})</div>)
                            }
                          </>
                        )
                        : <div className={styles.chave}>Sem chaves cadastradas</div>
                      }
                    </div>

                    
                    <button type="button" className={styles.btnAlterarSenha}
                      onClick={exibirFormularioAlterarSenha}
                    >
                      Alterar senha
                    </button>

                    <button type="button" className={styles.btnAdcionarChave}
                      onClick={exibirFormularioAdcionarChave}
                    >
                      Adcionar PIX
                    </button>
                  </div>
                </div>
              </div>

              <div className={styles.divisaoDadosSaldo}>
                <div className={styles.saldo}>
                  <div className={styles.margemVip}>
                    <h1 className={styles.tituloSetor}>Saldo</h1>
                    
                    <p className={styles.textoSaldo}>R$ {usuario.saldo.toFixed(2)}</p>
                    <p className={styles.auditoria}>
                      <img src={iconAtencao} className={styles.iconInfo}/>
                       R$ {usuario.auditoria.toFixed(2)} de auditoria necessário
                    </p>

                  </div>
                </div>

                <div className={styles.vip}>
                  <div className={styles.margemVip}>
                    <h1 className={styles.tituloSetor}>Nível VIP</h1>
                    <div className={styles.linhaVip}>
                      <div className={styles.nivel}>{usuario.nivel}</div>

                      <div className={styles.linhaProgresso}>
                        <progress className={styles.progressoNivel} 
                          value={usuario.pontosAdquiridos} 
                          max={usuario.pontosNecessariosParaProximoNivel}
                        ></progress>

                        <div className={styles.progresso}>{usuario.pontosAdquiridos}/{usuario.pontosNecessariosParaProximoNivel}&nbsp;<p className={styles.xp}>XP</p></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
            ) : exibirConteudo == "historicoDepositos" ? (
              <div className={styles.historicoDepositos}>
                <div className={styles.margemHistoricoDepositos}>
                  {
                    usuario.historicoDepositos.length ? (
                      <>
                        {
                          usuario.historicoDepositos.slice().reverse().map((deposito, index) => (
                            <div key={index} className={styles.linha}>
                              <div className={styles.coluna}>
                                <p className={styles.textoHistoricoDepositos}>
                                  {deposito.dataDeposito}
                                </p>
                              </div>

                              <div className={styles.coluna}>
                                <p className={styles.textoHistoricoDepositos}>
                                  R$ {deposito.valorDeposito.toFixed(2)}
                                </p>
                              </div>

                              <div className={styles.coluna}>
                                <button className={styles.btnDetalhes} type="button"
                                  onClick={() => buscarDeposito(deposito.codigo)}
                                >
                                  Detalhes
                                </button>
                              </div>
                            </div>
                          ))
                        }
                      </>
                    ) : <h2 className={styles.aviso}>Sem depósitos até o momento!</h2>
                  }
                </div>
              </div>
            ) : exibirConteudo == "historicoSaques" ? (
              <div className={styles.historicoDepositos}>
                <div className={styles.margemHistoricoDepositos}>
                  {
                    usuario.historicoSaques.length ? (
                      <>
                        {
                          usuario.historicoSaques.slice().reverse().map((saque, index) => (
                            <div key={index} className={styles.linha}>
                              <div className={styles.coluna}>
                                <p className={styles.textoHistoricoDepositos}>
                                  {saque.dataSaque}
                                </p>
                              </div>

                              <div className={styles.coluna}>
                                <p className={styles.textoHistoricoDepositos}>
                                  R$ {saque.valorSaque.toFixed(2)}
                                </p>
                              </div>

                              <div className={styles.coluna}>
                                <button type="button" className={styles.btnDetalhes}
                                  onClick={() => buscarSaque(saque.codigo)}
                                >
                                  Detalhes
                                </button>
                              </div>
                            </div>
                          ))
                        }
                      </>
                    ) : <h2 className={styles.aviso}>Sem saques até o momento!</h2>
                  }
                </div>
              </div>
            ) : exibirConteudo == "convidar" && (
              <div className={styles.convidar}>
                <div className={styles.margemConvidar}>
                  <h1 className={styles.tituloSetor}>Código de convite</h1>

                  <div className={styles.linhaConvite}>
                    <p className={styles.textoConvidar}>{usuario.id}</p>
                    <button className={styles.btnCopiar}>
                      <img src={iconCopiar} className={styles.iconCopiar} 
                        onClick={() => copiarCodigoDeConvite(usuario.id)}
                      />
                    </button>
                  </div>

                  <div className={styles.descricaoConvidar}>
                    <img src={iconInfo} className={styles.iconInfo} />
                    <p className={styles.textoDescricaoConvidar}>Ganhe 20 reis para cada pessoa que criar uma nova conta com seu código e executar com êxito o seu PRIMEIRO deposíto de AO MENOS 20 reais.</p>
                  </div>

                  <div className={styles.statusConvidar}>
                    <div className={styles.linhaStatus}>
                      Convidados até o momento : <p className={styles.textoStatusConvidar}>{usuario.quantidadeDeUsuariosConvidados}</p>
                    </div>

                    <div className={styles.linhaStatus}>
                      Ganhos até o momento : <p className={styles.textoStatusConvidar}>R$ {usuario.ganhosComConvite.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
          </div>
        </>
        ) : <Loader/>
      }

      {visibilidadeFormularioAlterarSenha && <FormularioAlterarSenha executarAcao={esconderFormularioAlterarSenha}/>}
      {visibilidadeFormularioAdcionarChave && <FormularioAdcionarChave executarAcao={esconderFormularioAdcionarChave}/>}

      {detalhesDeposito.codigo && <DetalhesDeposito executarAcao={removerDetalhesDeposito} detalhesDeposito={detalhesDeposito}/>}
      {detalhesSaque.codigo && <DetalhesSaque executarAcao={removerDetalhesSaque} detalhesSaque={detalhesSaque}/>}
    </Container>
  )
}