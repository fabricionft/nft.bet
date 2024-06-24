import styles from './GestaoSaques.module.css';

//Components
import PainelGestao from '../../../components/lists/PainelGestao';
import Container from "../../../components/layout/Container";
import HeaderAdmin from "../../../components/layout/HeaderAdmin";

//Hooks
import { useState } from 'react';
import useSaque from '../../../hooks/useSaque';
import BotaoLink from '../../../components/utils/BotaoLink';


export default function GestaoSaques(){

  const [filtro, setFiltro] = useState("");
  const {saques, setStatus} = useSaque();

  const marcarRotaAtual = () => {
    localStorage.setItem('rotaAnterior', location.pathname)
  }
  
  return(
    <Container>
      <HeaderAdmin
        destino={"/adm/menuAdmin"}
      />

      <PainelGestao
        nomeEntidade={"saques"}
        placeholder={"por usuário requisitor"}
        entidade={saques}
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
          saques.slice().reverse().filter((saque) => saque.email.toLowerCase().includes(filtro.toLowerCase()))
          .map((saque, index) => (
            <div key={saque.codigo} className={styles.linha+" "+styles[(index % 2 == 0) ? "par" : "impar"]}>
              <div className={styles.coluna1}>
                <p className={styles.textoLinha}>{saque.codigo}</p>
              </div>

              <div className={styles.coluna2}>
                <p className={styles.textoLinha}>{saque.dataSaque.split(" ")[0]}</p>
              </div>

              <div className={styles.coluna3}>
                <p className={styles.textoLinha+" "+styles[
                  (saque.statusSaque == "Solicitado") ? "solicitado" :
                  (saque.statusSaque == "Concluído") ? "concluido" : "recusado"
                ]}>{saque.statusSaque}</p>
              </div>

              <div className={styles.coluna4}>
                <p className={styles.textoLinha}>{saque.email.length > 9 ? saque.email.substring(0, 10)+"..." : saque.email}</p>
              </div>

              <div className={styles.coluna5}>
                <p className={styles.textoLinha}>R$ {saque.valorSaque.toFixed(2)}</p>
              </div>

              <div className={styles.coluna6}>
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
      </PainelGestao>

    </Container>
  )
}