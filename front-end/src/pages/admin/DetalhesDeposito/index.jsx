import styles from './DetalhesDeposito.module.css';

//Components
import Loader from '../../../components/utils/Loader';
import Container from '../../../components/layout/Container';
import HeaderAdmin from '../../../components/layout/HeaderAdmin';

//Hooks
import useDeposito from '../../../hooks/useDeposito';
import FormularioRejeicao from '../../../components/formularios/FormularioRejeicao';
import useFormularios from '../../../hooks/useFormularios';


export default function DetalhesDeposito(){

  const {detalhesDeposito, autorizarDeposito, recusarDeposito, preencherDetalhesDeposito} = useDeposito();
  const {visibilidadeFormularioRejeicao, exibirFormularioRejeicao, esconderFormularioRejeicao} = useFormularios();

  return(
    <Container>
      <HeaderAdmin
        destino={localStorage.getItem('rotaAnterior')}
      />

      {
        detalhesDeposito.codigo ? (
          <div className={styles.detalhesDeposito}>
            <div className={styles.margemDetalhesDeposito+" "+styles[
              (detalhesDeposito.statusDeposito != "Solicitado") && "semMargemInferior"
            ]}>
              <div className={styles.divisor}>
                <p className={styles.subtituloDetalesDeposito}>Código</p>
                <p className={styles.textoDetalesDeposito}>{detalhesDeposito.codigo}</p>
              </div>

              <div className={styles.divisor}>
                <p className={styles.subtituloDetalesDeposito}>Data</p>
                <p className={styles.textoDetalesDeposito}>{detalhesDeposito.dataDeposito.split(" ")[0]}</p>
              </div>

              <div className={styles.divisor}>
                <p className={styles.subtituloDetalesDeposito}>Horário</p>
                <p className={styles.textoDetalesDeposito}>{detalhesDeposito.dataDeposito.split(" ")[1]}</p>
              </div>

              <div className={styles.divisor}>
                <p className={styles.subtituloDetalesDeposito}>Usuário requisitor</p>
                <p className={styles.textoDetalesDeposito}>{detalhesDeposito.usuario}</p>
              </div>

              <div className={styles.divisor}>
                <p className={styles.subtituloDetalesDeposito}>Status</p>
                <p className={styles.textoDetalesDeposito+" "+styles[
                  (detalhesDeposito.statusDeposito == "Solicitado") ? "solicitado" :
                  (detalhesDeposito.statusDeposito == "Concluído") ? "concluido" : "recusado"
                ]}>{detalhesDeposito.statusDeposito}</p>
              </div>

              <div className={styles.divisor}>
                <p className={styles.subtituloDetalesDeposito}>Valor Depósito</p>
                <p className={styles.textoDetalesDeposito}>R$ {detalhesDeposito.valorDeposito.toFixed(2)}</p>
              </div>

              <div className={styles.divisor}>
                <p className={styles.subtituloDetalesDeposito}>Valor com bônus</p>
                <p className={styles.textoDetalesDeposito}>R$ {detalhesDeposito.valorComBonus.toFixed(2)}</p>
              </div>

              <div className={styles.divisor}>
                <p className={styles.subtituloDetalesDeposito}>Auditoria adcionada</p>
                <p className={styles.textoDetalesDeposito}>R$ {(detalhesDeposito.valorComBonus * detalhesDeposito.multiplicadorDeAudutoria).toFixed(2)} ({detalhesDeposito.multiplicadorDeAudutoria}X)</p>
              </div>

              <div className={styles.divisor}>
                <p className={styles.subtituloDetalesDeposito}>Código</p>
                <p className={styles.textoDetalesDeposito}>{(detalhesDeposito.codigoBonus) != 0 ? detalhesDeposito.codigoBonus : "-"}</p>
              </div>

              {
                detalhesDeposito.statusDeposito == "Recusado" && (
                  <div className={styles.divisor}>
                  <p className={styles.subtituloDetalesDeposito}>Motivo Rejeição</p>
                  <p className={styles.textoDetalesDeposito}>{detalhesDeposito.motivoRejeicao}</p>
                </div>
                )
              }

              {
                detalhesDeposito.statusDeposito == "Solicitado" && (
                  <div className={styles.divisorBtns}>
                    <button type='button' className={styles.btnAutorizar}
                      onClick={autorizarDeposito}
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
            entidade={detalhesDeposito}
            executarAcao={esconderFormularioRejeicao}
            preencherEntidade={preencherDetalhesDeposito}
            enviarFormulario={recusarDeposito}
          />
        )
      }
    </Container>
  )
}