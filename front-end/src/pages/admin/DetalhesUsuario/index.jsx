import styles from './DetalhesUsuario.module.css';

//Assets
import iconCopiar from '../../../assets/icons/copiar.png';

//Components
import Container from '../../../components/layout/Container';
import HeaderAdmin from '../../../components/layout/HeaderAdmin';
import Loader from '../../../components/utils/Loader';
import BotaoLink from '../../../components/utils/BotaoLink';

//Hooks
import usedadosUsuario from '../../../hooks/useDadosUsuario';

//Utils
import ocultarTexto from '../../../utils/ocultarTexto';
import formatarCPF from '../../../utils/formatarCPF';
import formatarCelular from '../../../utils/formatarCelular';


export default function DetalhesUsuario(){

  const {usuario, alterarStatusUsuario, copiarIDUsuario} = usedadosUsuario(); 
  const marcarRotaAtual = () => {
    localStorage.setItem('rotaAnterior', location.pathname)
  }

  return(
    <Container>
      <HeaderAdmin
        destino={"/adm/usuarios"}
      />

      {
        usuario.codigo ? (
          <div className={styles.detalhesUsuario}>
            <div className={styles.margemDetalhesUsuario}>
              <div className={styles.divisor}>
                <p className={styles.subtituloDetalhesUsuario}>Código</p>
                <p className={styles.textoDetalhesUsuario}>{usuario.codigo}</p>
              </div>

              <div className={styles.divisor}>
                <p className={styles.subtituloDetalhesUsuario}>ID</p>
                <span className={styles.textoDetalhesUsuario}>
                  #{usuario.id}
                  <img src={iconCopiar} className={styles.iconCopiar} 
                    onClick={() => copiarIDUsuario(usuario.id)}
                  />    
                </span>
              </div>

              <div className={styles.divisor}>
                <p className={styles.subtituloDetalhesUsuario}>Código convite</p>
                <p className={styles.textoDetalhesUsuario}>{(usuario.convite == 0) ? "Não utilizou" : "#"+usuario.convite}</p>
              </div>

              <div className={styles.divisor}>
                <p className={styles.subtituloDetalhesUsuario}>Usuários convidados</p>
                <p className={styles.textoDetalhesUsuario}>{usuario.quantidadeDeUsuariosConvidados}</p>
              </div>

              <div className={styles.divisor}>
                <p className={styles.subtituloDetalhesUsuario}>Ganhos com convite</p>
                <p className={styles.textoDetalhesUsuario}>R$ {usuario.ganhosComConvite.toFixed(2)}</p>
              </div>

              <div className={styles.divisor}>
                <p className={styles.subtituloDetalhesUsuario}>Data cadastro</p>
                <p className={styles.textoDetalhesUsuario}>{usuario.dataCadastro}</p>
              </div>

              <div className={styles.divisor}>
                <p className={styles.subtituloDetalhesUsuario}>Status conta</p>
                <p className={styles.textoDetalhesUsuario}>{(usuario.contaAtiva) ? "Ativa" : "desativa"}</p>
              </div>

              <div className={styles.divisor}>
                <p className={styles.subtituloDetalhesUsuario}>Email</p>
                <p className={styles.textoDetalhesUsuario}>{usuario.email}</p>
              </div>

              <div className={styles.divisor}>
                <p className={styles.subtituloDetalhesUsuario}>Nome completo</p>
                <p className={styles.textoDetalhesUsuario}>{ocultarTexto(usuario.nomeCompleto)}</p>
              </div>

              <div className={styles.divisor}>
                <p className={styles.subtituloDetalhesUsuario}>CPF</p>
                <p className={styles.textoDetalhesUsuario}>{formatarCPF(usuario.cpf)}</p>
              </div>

              <div className={styles.divisor}>
                <p className={styles.subtituloDetalhesUsuario}>Celular</p>
                <p className={styles.textoDetalhesUsuario}>{formatarCelular(usuario.celular)}</p>
              </div>

              <div className={styles.divisor}>
                <p className={styles.subtituloDetalhesUsuario}>Saldo</p>
                <p className={styles.textoDetalhesUsuario}>R$ {usuario.saldo.toFixed(2)}</p>
              </div>

              <div className={styles.divisor}>
                <p className={styles.subtituloDetalhesUsuario}>Saldo em retirada</p>
                <p className={styles.textoDetalhesUsuario}>R$ {usuario.saldoEmRetirada.toFixed(2)}</p>
              </div>

              <div className={styles.divisor}>
                <p className={styles.subtituloDetalhesUsuario}>Auditoria pendente</p>
                <p className={styles.textoDetalhesUsuario}>R$ {usuario.auditoria.toFixed(2)}</p>
              </div>

              <div className={styles.divisor}>
                <p className={styles.subtituloDetalhesUsuario}>Nível VIP</p>
                <p className={styles.textoDetalhesUsuario}>{usuario.nivel}</p>
              </div>

              <div className={styles.divisor}>
                <p className={styles.subtituloDetalhesUsuario}>Progresso</p>
                <p className={styles.textoDetalhesUsuario}>{usuario.pontosAdquiridos}/{usuario.pontosNecessariosParaProximoNivel}</p>
              </div>

              <div className={styles.divisorBtns}>
                <button type='button'className={styles.btnAlterarStatus}
                    onClick={() => alterarStatusUsuario(usuario.codigo)}
                  >
                    {(usuario.contaAtiva) ? "Desativar" : "Ativar"} conta
                  </button>
              </div>

              <div className={styles.divisorHistorico}>
                <h2 className={styles.tituloHistorico}>Depósitos</h2>
                
                {
                  usuario.historicoDepositos.length ? (
                    <>
                      {
                        usuario.historicoDepositos.slice().reverse().map((deposito, index) => (
                          <div key={deposito.codigo} className={styles.linhaTransacao+" "+styles[(index % 2 == 0) ? "par" : "impar"]}>
                            <div className={styles.coluna1}>
                              <p className={styles.textoHistorico}>
                                {deposito.dataDeposito.split(" ")[0]}
                              </p>
                            </div>

                            <div className={styles.coluna2}>
                              <p className={styles.textoHistorico}>
                                R$ {deposito.valorDeposito.toFixed(2)}
                              </p>
                            </div>

                            <div className={styles.coluna3}>
                              <BotaoLink 
                                destino={"/adm/deposito/".concat(deposito.codigo)}
                                estilizacao={"detalhes"}
                                executarAcao={marcarRotaAtual}
                              >
                                Detalhes
                              </BotaoLink>
                            </div>
                          </div>
                        ))
                      }
                    </> 
                  ) : (
                    <div className={styles.linhaTransacao}>
                      <p className={styles.textoHistorico}>
                        Sem depóstos até o momento
                      </p>
                    </div>
                  )
                }
              </div>

              <div className={styles.divisorHistorico}>
                <h2 className={styles.tituloHistorico}>Saques</h2>
                
                {
                  usuario.historicoSaques.length ? (
                    <>
                      {
                        usuario.historicoSaques.slice().reverse().map((saque, index) => (
                          <div key={saque.codigo} className={styles.linhaTransacao+" "+styles[(index % 2 == 0) ? "par" : "impar"]}>
                            <div className={styles.coluna1}>
                              <p className={styles.textoHistorico}>
                                {saque.dataSaque.split(" ")[0]}
                              </p>
                            </div>

                            <div className={styles.coluna2}>
                              <p className={styles.textoHistorico}>
                                R$ {saque.valorSaque.toFixed(2)}
                              </p>
                            </div>

                            <div className={styles.coluna3}>
                              <BotaoLink 
                                estilizacao={"detalhes"}
                                executarAcao={marcarRotaAtual}
                                destino={"/adm/saque/".concat(saque.codigo)}
                              >
                                Detalhes
                              </BotaoLink>
                            </div>
                          </div>
                        ))
                      }
                    </>
                  ) : (
                    <div className={styles.linhaTransacao}>
                      <p className={styles.textoHistorico}>
                        Sem saques até o momento
                      </p>
                    </div>
                  )
                }
              </div>

              <div className={styles.divisorHistorico+" "+styles["menor"]}>
                <h2 className={styles.tituloHistorico}>Chaves ({usuario.chaves.length}/3)</h2>
                
                {
                  usuario.chaves.length ? (
                    <>
                      {
                        usuario.chaves.map((chave, index) => (
                          <div key={chave.codigo} className={styles.linhaChave+" "+styles[(index % 2 == 0) ? "par" : "impar"]}>
                            <p className={styles.textoHistorico}>
                              {chave.chave} ({chave.tipoChave})
                            </p>
                          </div>
                        )) 
                      }
                    </>
                  ) : (
                    <div className={styles.linhaChave}>
                      <p className={styles.textoHistorico}>
                        Sem chaves até o momento
                      </p>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        ) : <Loader/>
      }
    </Container>
  )
}