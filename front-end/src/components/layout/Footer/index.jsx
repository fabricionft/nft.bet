import styles from './Footer.module.css';
import {Link} from 'react-router-dom'

import iconInstagram from '../../../assets/icons/instagram.png';
import iconYoutube from '../../../assets/icons/youtube.png';
import iconTelegram from '../../../assets/icons/telegram.png';

export default function Footer(){

  return(
    <footer className={styles.footer}>
      <div className={styles.icons}>
        <Link>
          <img src={iconInstagram} className={styles.iconFooter} />
        </Link>

        <Link>
          <img src={iconYoutube} className={styles.iconFooter}/>
        </Link>

        <Link>
          <img src={iconTelegram} className={styles.iconFooter}/>
        </Link>
      </div>

      <p className={styles.textoFooter}>
        Jogue com responsabilidade! O jogo pode ser prejudicial se não for controlado e feito com responsabilidade. Por isso, leia todas as informações disponíveis na nossa seção de Jogo Responsável.
      </p>
    </footer>
  )
}