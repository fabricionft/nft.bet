import styles from './GestaoDepositos.module.css';

//Components
import PainelGestao from '../../../components/lists/PainelGestao';
import Container from "../../../components/layout/Container";
import HeaderAdmin from "../../../components/layout/HeaderAdmin";

//Hooks
import { useState } from 'react';
import useDeposito from '../../../hooks/useDeposito';
import BotaoLink from '../../../components/utils/BotaoLink';


export default function GestaoDepositos(){

  const [filtro, setFiltro] = useState("");
  const {depositos, setStatus,} = useDeposito();


  const marcarRotaAtual = () => {
    localStorage.setItem('rotaAnterior', location.pathname)
  }
  
  return(
    <Container>
      <HeaderAdmin
        destino={"/adm/menuAdmin"}
      />

      <PainelGestao
        nomeEntidade={"depósitos"}
        placeholder={"por usuário requisitor"}
        entidade={depositos}
        setFiltro={setFiltro}
        setStatus={setStatus}
      >
        <div className={styles.linhaPrincipal}>
          <div className={styles.coluna1}>
            <p className={styles.tituloLinha}>Código</p>
          </div>

          <div className={styles.coluna2}>
            <p className={styles.tituloLinha}>Data</p>
          </div>

          <div className={styles.coluna3}>
            <p className={styles.tituloLinha}>status</p>
          </div>

          <div className={styles.coluna4}>
            <p className={styles.tituloLinha}>Usuário</p>
          </div>

          <div className={styles.coluna5}>
            <p className={styles.tituloLinha}>Valor</p>
          </div>

          <div className={styles.coluna6}>
            <p className={styles.tituloLinha}>Ação</p>
          </div>
        </div>

        {
          depositos.slice().reverse().filter((deposito) => deposito.email.toLowerCase().includes(filtro.toLowerCase()))
          .map((deposito, index) => (
            <div key={deposito.codigo} className={styles.linha+" "+styles[(index % 2 == 0) ? "par" : "impar"]}>
              <div className={styles.coluna1}>
                <p className={styles.textoLinha}>{deposito.codigo}</p>
              </div>

              <div className={styles.coluna2}>
                <p className={styles.textoLinha}>{deposito.dataDeposito.split(" ")[0]}</p>
              </div>

              <div className={styles.coluna3}>
                <p className={styles.textoLinha+" "+styles[
                  (deposito.statusDeposito == "Solicitado") ? "solicitado" :
                  (deposito.statusDeposito == "Concluído") ? "concluido" : "recusado"
                ]}>{deposito.statusDeposito}</p>
              </div>

              <div className={styles.coluna4}>
                <p className={styles.textoLinha}>{deposito.email.length > 9 ? deposito.email.substring(0, 10)+"..." : deposito.email}</p>
              </div>

              <div className={styles.coluna5}>
                <p className={styles.textoLinha}>R$ {deposito.valorDeposito.toFixed(2)}</p>
              </div>

              <div className={styles.coluna6}>
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
      </PainelGestao>

    </Container>
  )
}