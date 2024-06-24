import styles from './HeaderAdmin.module.css';

//Assets
import iconCasa from '../../../assets/icons/iconCasa.png';
import iconVoltar from '../../../assets/icons/voltar.png';

//Hooks
import { Link, useLocation } from 'react-router-dom';
import useAdminSessao from '../../../hooks/useAdminSessao';


export default function HeaderAdmin({destino}){

  const location = useLocation();
  const {deslogarComoAdmin} = useAdminSessao();

  const marcarRotaAtual = () => {
    localStorage.setItem('rotaAnterior', location.pathname)
  }

  return(
    <header className={styles.headerAdmin}>
      <Link to={destino} className={styles.margemHeaderAdmin}>
        <div  onClick={(location.pathname == "/adm/menuAdmin") ? deslogarComoAdmin : marcarRotaAtual}>
          <img src={(location.pathname == "/adm/menuAdmin") ? iconCasa : iconVoltar} className={styles.iconHeaderAdimin} />
        </div>
      </Link>
    </header>
  )
}