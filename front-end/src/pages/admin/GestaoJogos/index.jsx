import styles from './GestaoJogos.module.css';

//Components
import PainelGestao from '../../../components/lists/PainelGestao';
import Container from "../../../components/layout/Container";
import HeaderAdmin from "../../../components/layout/HeaderAdmin";

//Hooks
import { useState } from 'react';
import useJogos from '../../../hooks/useJogos';
import BotaoLink from '../../../components/utils/BotaoLink';


export default function GestaoJogos(){

  const [filtro, setFiltro] = useState("");
  const {jogos, excluirJogo} = useJogos();
  
  return(
    <Container>
      <HeaderAdmin
        destino={"/adm/menuAdmin"}
      />

      <PainelGestao
        nomeEntidade={"jogos"}
        destino={"/adm/salvarJogo"}
        placeholder={"por nome do jogo"}
        entidade={jogos}
        setFiltro={setFiltro}
      >
        <div className={styles.linhaPrincipal}>
          <div className={styles.coluna1}>
            <p className={styles.tituloLinha}>ID</p>
          </div>

          <div className={styles.coluna2}>
            <p className={styles.tituloLinha}>Nome</p>
          </div>

          <div className={styles.coluna3}>
            <p className={styles.tituloLinha}>Jogo</p>
          </div>

          <div className={styles.coluna4}>
            <p className={styles.tituloLinha}>Ação</p>
          </div>
        </div>

        {
          jogos.slice().reverse().filter((jogo) => jogo.nome.toLowerCase().includes(filtro.toLowerCase()))
          .map((jogo, index) => (
            <div key={jogo.codigo} className={styles.linha+" "+styles[(index % 2 == 0) ? "par" : "impar"]}>
              <div className={styles.coluna1}>
                <p className={styles.textoLinha}>{jogo.codigo}</p>
              </div>

              <div className={styles.coluna2}>
                <p className={styles.textoLinha}>{jogo.nome}</p>
              </div>

              <div className={styles.coluna3}>
                <p className={styles.textoLinha}>{jogo.urlJogo.substring(0, 10)} {(jogo.urlJogo.length > 10) && "..."}</p>
              </div>

              <div className={styles.coluna4}>
                <BotaoLink
                  destino={"/adm/editarJogo/".concat(jogo.codigo)}
                  estilizacao={"editar"}
                >
                  Editar
                </BotaoLink>

                <button type='button' className={styles.btnExcluir}
                  onClick={() => excluirJogo(jogo.codigo)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))
        }
      </PainelGestao>

    </Container>
  )
}