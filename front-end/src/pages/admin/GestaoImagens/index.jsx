import { useState } from 'react';
import BotaoLink from '../../../components/utils/BotaoLink';
import PainelGestao from '../../../components/lists/PainelGestao';
import Container from '../../../components/layout/Container';
import HeaderAdmin from '../../../components/layout/HeaderAdmin';
import useImagens from '../../../hooks/useImagens';
import styles from './GestaoImagens.module.css';


export default function GestaoImagens(){

  const {imagens, excluirImagem} = useImagens();
  const [filtro, setFiltro] = useState("");

  return(
    <Container>
      <HeaderAdmin
        destino={"/adm/menuAdmin"}
      />

      <PainelGestao
        nomeEntidade={"imagens"}
        placeholder={"por texto alternativo"}
        entidade={imagens}
        destino={"/adm/salvarImagem"}
        setFiltro={setFiltro}
      >
         <div className={styles.linhaPrincipal}>
          <div className={styles.coluna1}>
            <p className={styles.tituloLinha}>ID</p>
          </div>

          <div className={styles.coluna2}>
            <p className={styles.tituloLinha}>SRC</p>
          </div>

          <div className={styles.coluna3}>
            <p className={styles.tituloLinha}>Texto alternativo</p>
          </div>

          <div className={styles.coluna4}>
            <p className={styles.tituloLinha}>Ação</p>
          </div>
        </div>

        {
          imagens.slice().reverse().filter((imagem) => imagem.altImagem.toLowerCase().includes(filtro.toLowerCase()))
          .map((imagem, index) => (
            <div key={imagem.codigo} className={styles.linha+" "+styles[(index % 2 == 0) ? "par" : "impar"]}>
              <div className={styles.coluna1}>
                <p className={styles.textoLinha}>{imagem.codigo}</p>
              </div>

              <div className={styles.coluna2}>
                <p className={styles.textoLinha}>{imagem.srcImagem.substring(0, 10)} {(imagem.srcImagem.length > 10) && "..."}</p>
              </div>

              <div className={styles.coluna3}>
                <p className={styles.textoLinha}>{imagem.altImagem}</p>
              </div>

              <div className={styles.coluna4}>
                <BotaoLink
                  destino={"/adm/editarimagem/".concat(imagem.codigo)}
                  estilizacao={"editar"}
                >
                  Editar
                </BotaoLink>

                <button type='button' className={styles.btnExcluir}
                  onClick={() => excluirImagem(imagem.codigo)}
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