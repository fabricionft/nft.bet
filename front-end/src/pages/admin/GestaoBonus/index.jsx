import styles from './GestaoBonus.module.css';

//Components
import PainelGestao from '../../../components/lists/PainelGestao';
import Container from "../../../components/layout/Container";
import HeaderAdmin from "../../../components/layout/HeaderAdmin";

//Hooks
import { useState } from 'react';
import useBonus from '../../../hooks/useBonus';

//Utils
import formatarData from '../../../utils/formatarData';
import BotaoLink from '../../../components/utils/BotaoLink';


export default function GestaoBonus(){

  const [data, setData] = useState("");
  const {listaBonus, excluirBonus} = useBonus();
  
  return(
    <Container>
      <HeaderAdmin
        destino={"/adm/menuAdmin"}
      />

      <PainelGestao
        nomeEntidade={"bônus"}
        destino={"/adm/salvarBonus"}
        entidade={listaBonus}
        setData={setData}
      >
        <div className={styles.linhaPrincipal}>
          <div className={styles.coluna1}>
            <p className={styles.tituloLinha}>ID</p>
          </div>

          <div className={styles.coluna2}>
            <p className={styles.tituloLinha}>Código</p>
          </div>

          <div className={styles.coluna3}>
            <p className={styles.tituloLinha}>Tipo</p>
          </div>

          <div className={styles.coluna4}>
            <p className={styles.tituloLinha}>Validade</p>
          </div>

          <div className={styles.coluna5}>
            <p className={styles.tituloLinha}>Ação</p>
          </div>
        </div>

        {
          listaBonus.slice().reverse().filter((bonus) => bonus.dataValidade.split("T")[0].includes(data))
          .map((bonus, index) => (
            <div key={bonus.codigo} className={styles.linha+" "+styles[(index % 2 == 0) ? "par" : "impar"]}>
              <div className={styles.coluna1}>
                <p className={styles.textoLinha}>{bonus.codigo}</p>
              </div>

              <div className={styles.coluna2}>
                <p className={styles.textoLinha}>#{bonus.codigoBonus}</p>
              </div>

              <div className={styles.coluna3}>
                <p className={styles.textoLinha}>{bonus.tipo}</p>
              </div>

              <div className={styles.coluna4}>
                <p className={styles.textoLinha}>{formatarData(bonus.dataValidade.split("T")[0])}</p>
              </div>

              <div className={styles.coluna5}>
                <BotaoLink
                  estilizacao={"editar"}
                  destino={"/adm/editarBonus/".concat(bonus.codigo)}
                >
                  Editar
                </BotaoLink>

                <button type='button' className={styles.btnExcluir}
                  onClick={() => excluirBonus(bonus.codigo)}
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