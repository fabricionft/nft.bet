import {Link} from 'react-router-dom';
import styles from './BotaoLink.module.css';

export default function BotaoLink({children, destino, executarAcao, estilizacao}){

  const estilizacoes = ["criar", "editar", "detalhes"];

  return(
    <Link className={styles.botaoLink+" "+styles[(estilizacoes.includes(estilizacao) && estilizacao)]}
      onClick={executarAcao}
      to={destino}
    >
      {children}
    </Link>
  )
}