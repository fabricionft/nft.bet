import styles from './MenuAdmin.module.css';

//Components
import Container from "../../../components/layout/Container";
import HeaderAdmin from "../../../components/layout/HeaderAdmin";

//Hooks
import useRotas from "../../../hooks/useRotas";

//Assets
import iconJogos from '../../../assets/icons/jogos.png';
import iconUser from '../../../assets/icons/user.png';
import iconBonus from '../../../assets/icons/bonus.png';
import iconImagem from '../../../assets/icons/imagem.png';
import iconDeposito from '../../../assets/icons/cifrao.png';
import iconSaque from '../../../assets/icons/saque.png';
import { Link } from 'react-router-dom';


export default function MenuAdmin(){

  const {bloquearRotaAdmin} = useRotas();

  bloquearRotaAdmin();

  return(
    <Container>
      <HeaderAdmin/>

      <div className={styles.containerOpcoes}>
      <Link to={"/adm/jogos"} className={styles.funcao}>
          <div className={styles.margemFuncao}>
            <img src={iconJogos} width={"85px"} />
            <h1 className={styles.tituloFuncao}>Jogos</h1>
            <p className={styles.descFuncao}>Aqui você pode buscar, criar, editar e excluir os jogos do site.</p>
          </div>
        </Link>

        <Link to={"/adm/bonus"} className={styles.funcao}>
          <div className={styles.margemFuncao}>
            <img src={iconBonus} width={"85px"} />
            <h1 className={styles.tituloFuncao}>Bônus</h1>
            <p className={styles.descFuncao}>Aqui você pode buscar, criar, editar e excluir os bônus do site.</p>
          </div>
        </Link>

        <Link to={"/adm/imagens"} className={styles.funcao}>
          <div className={styles.margemFuncao}>
            <img src={iconImagem} width={"85px"} />
            <h1 className={styles.tituloFuncao}>Imagens</h1>
            <p className={styles.descFuncao}>Aqui você pode buscar, criar, editar e excluir as imagens do banner do site.</p>
          </div>
        </Link>

        <Link to={"/adm/usuarios"} className={styles.funcao}>
          <div className={styles.margemFuncao}>
            <img src={iconUser} width={"85px"} />
            <h1 className={styles.tituloFuncao}>Usuários</h1>
            <p className={styles.descFuncao}>Aqui você pode acessar os dados de todos os usuários do site.</p>
          </div>
        </Link>
        
        <Link to={"/adm/depositos"} className={styles.funcao}>
          <div className={styles.margemFuncao}>
            <img src={iconDeposito} width={"85px"} />
            <h1 className={styles.tituloFuncao}>Depósitos</h1>
            <p className={styles.descFuncao}>Aqui você pode acessar todas as solicitações de depósitos do site.</p>
          </div>
        </Link>

        <Link to={"/adm/saques"} className={styles.funcao}>
          <div className={styles.margemFuncao}>
            <img src={iconSaque} width={"85px"} />
            <h1 className={styles.tituloFuncao}>Saques</h1>
            <p className={styles.descFuncao}>Aqui você pode acessar todas as solicitações de saques do site.</p>
          </div>
        </Link>
      </div> 
    </Container>
  )
}