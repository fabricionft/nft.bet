import styles from './Saldo.module.css';
import useSessao from '../../../hooks/useSessao';
import { Link } from 'react-router-dom';
import useSaldo from '../../../hooks/useSaldo';
import Loader from '../Loader';

export default function Saldo(){

  const {saldo} = useSaldo();;

  return(
    <div className={styles.saldo}>
      {
        saldo ? (
          <p className={styles.textoSaldo}>
            R$ { saldo.toFixed(2)}
          </p>
        ) : <p className={styles.textoSaldo}>R$ ...</p>
      }
      <Link className={styles.depositar}
        to={"/deposito"}
      >+</Link>
    </div>
  )
}