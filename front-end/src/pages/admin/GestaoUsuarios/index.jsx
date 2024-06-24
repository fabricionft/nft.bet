import styles from './GestaoUsuarios.module.css';

//Components
import PainelGestao from '../../../components/lists/PainelGestao';
import Container from "../../../components/layout/Container";
import HeaderAdmin from "../../../components/layout/HeaderAdmin";

//Hooks
import { useState } from 'react';
import useDadosUsuario from '../../../hooks/useDadosUsuario';
import BotaoLink from '../../../components/utils/BotaoLink';

//Utils
import formatarCPF from '../../../utils/formatarCPF';


export default function GestaoUsuarios(){

  const [filtro, setFiltro] = useState("");
  const {usuarios} = useDadosUsuario();
  
  return(
    <Container>
      <HeaderAdmin
        destino={"/adm/menuAdmin"}
      />

      <PainelGestao
        nomeEntidade={"usuários"}
        placeholder={"por email"}
        entidade={usuarios}
        setFiltro={setFiltro}
      >
        <div className={styles.linhaPrincipal}>
          <div className={styles.coluna1}>
            <p className={styles.tituloLinha}>Código</p>
          </div>

          <div className={styles.coluna2}>
            <p className={styles.tituloLinha}>ID</p>
          </div>

          <div className={styles.coluna3}>
            <p className={styles.tituloLinha}>Email</p>
          </div>

          <div className={styles.coluna4}>
            <p className={styles.tituloLinha}>CPF</p>
          </div>

          <div className={styles.coluna5}>
            <p className={styles.tituloLinha}>Entrou em</p>
          </div>

          <div className={styles.coluna6}>
            <p className={styles.tituloLinha}>Ação</p>
          </div>
        </div>

        {
          usuarios.slice().reverse().filter((usuario) => usuario.email.toLowerCase().includes(filtro.toLowerCase()))
          .map((usuario, index) => (
            <div key={usuario.codigo} className={styles.linha+" "+styles[(index % 2 == 0) ? "par" : "impar"]}>
              <div className={styles.coluna1}>
                <p className={styles.textoLinha}>{usuario.codigo}</p>
              </div>

              <div className={styles.coluna2}>
                <p className={styles.textoLinha}>#{usuario.id}</p>
              </div>

              <div className={styles.coluna3}>
                <p className={styles.textoLinha}>
                  {usuario.email.length > 9 ? usuario.email.substring(0, 10)+"..." : usuario.email}
                </p>
              </div>

              <div className={styles.coluna4}>
                <p className={styles.textoLinha}>{formatarCPF(usuario.cpf)}</p>
              </div>

              <div className={styles.coluna5}>
                <p className={styles.textoLinha}>{usuario.dataCadastro.split(" ")[0]}</p>
              </div>

              <div className={styles.coluna6}>
                <BotaoLink
                  estilizacao={"detalhes"}
                  destino={"/adm/usuario/".concat(usuario.id)}
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