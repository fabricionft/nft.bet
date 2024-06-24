import styles from './DetalhesSaque.module.css';

//Components
import Loader from '../../../components/utils/Loader';
import Container from '../../../components/layout/Container';
import HeaderAdmin from '../../../components/layout/HeaderAdmin';

//Hooks
import useSaque from '../../../hooks/useSaque';

//Utils
import ocultarTexto from '../../../utils/ocultarTexto';
import formatarCPF from '../../../utils/formatarCPF';
import FormularioRejeicao from '../../../components/formularios/FormularioRejeicao';
import useFormularios from '../../../hooks/useFormularios';


export default function DetalhesSaque(){

  const {detalhesSaque, autorizarSaque, recusarSaque, preencherDetalhesSaque} = useSaque();
  const {visibilidadeFormularioRejeicao, exibirFormularioRejeicao, esconderFormularioRejeicao} = useFormularios();

  return(
    <Container>
      <HeaderAdmin
        destino={localStorage.getItem('rotaAnterior')}
      />

      {
        detalhesSaque.codigo ? (
          <div className={styles.detalhesSaque}>
            <div className={styles.margemDetalhesSaque+" "+styles[
              (detalhesSaque.statusSaque != "Solicitado") && "semMargemInferior"
            ]}>
              <div className={styles.divisor}>
                <p className={styles.subtituloDetalesSaque}>Código</p>
                <p className={styles.textoDetalesSaque}>{detalhesSaque.codigo}</p>
              </div>

              <div className={styles.divisor}>
                <p className={styles.subtituloDetalesSaque}>Data</p>
                <p className={styles.textoDetalesSaque}>{detalhesSaque.dataSaque.split(" ")[0]}</p>
              </div>

              <div className={styles.divisor}>
                <p className={styles.subtituloDetalesSaque}>Horário</p>
                <p className={styles.textoDetalesSaque}>{detalhesSaque.dataSaque.split(" ")[1]}</p>
              </div>

              <div className={styles.divisor}>
                <p className={styles.subtituloDetalesSaque}>Usuário requisitor</p>
                <p className={styles.textoDetalesSaque}>{detalhesSaque.usuario}</p>
              </div>

              <div className={styles.divisor}>
                <p className={styles.subtituloDetalesSaque}>Status</p>
                <p className={styles.textoDetalesSaque+" "+styles[
                  (detalhesSaque.statusSaque == "Solicitado") ? "solicitado" :
                  (detalhesSaque.statusSaque == "Concluído") ? "concluido" : "recusado"
                ]}>{detalhesSaque.statusSaque}</p>
              </div>

              <div className={styles.divisor}>
                <p className={styles.subtituloDetalesSaque}>Valor saque</p>
                <p className={styles.textoDetalesSaque}>R$ {detalhesSaque.valorSaque.toFixed(2)}</p>
              </div>

              <div className={styles.divisor}>
                <p className={styles.subtituloDetalesSaque}>Chave destino</p>
                <p className={styles.textoDetalesSaque}>{detalhesSaque.chave} ({detalhesSaque.tipoChave})</p>
              </div>

              <div className={styles.divisor}>
                <p className={styles.subtituloDetalesSaque}>Nome do titular</p>
                <p className={styles.textoDetalesSaque}>{ocultarTexto(detalhesSaque.nomeTitular)}</p>
              </div>

              <div className={styles.divisor}>
                <p className={styles.subtituloDetalesSaque}>CPF do titular</p>
                <p className={styles.textoDetalesSaque}>{formatarCPF(detalhesSaque.cpfTitular)}</p>
              </div>

              {
                detalhesSaque.statusSaque == "Recusado" && (
                  <div className={styles.divisor}>
                  <p className={styles.subtituloDetalesSaque}>Motivo Rejeição</p>
                  <p className={styles.textoDetalesSaque}>{detalhesSaque.motivoRejeicao}</p>
                </div>
                )
              }

              {
                detalhesSaque.statusSaque == "Solicitado" && (
                  <div className={styles.divisorBtns}>
                    <button type='button' className={styles.btnAutorizar}
                      onClick={autorizarSaque}
                    >Autorizar</button>
                    <button type='button' className={styles.btnRecusar}
                      onClick={exibirFormularioRejeicao}
                    >Recusar</button>
                  </div>
                )
              }
            </div>
          </div>
        ) : <Loader/>
      }

      {
        visibilidadeFormularioRejeicao && (
          <FormularioRejeicao
            entidade={detalhesSaque}
            executarAcao={esconderFormularioRejeicao}
            preencherEntidade={preencherDetalhesSaque}
            enviarFormulario={recusarSaque}
          />   
        )
      }
    </Container>
  )
}