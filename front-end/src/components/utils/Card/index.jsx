import {useNavigate} from 'react-router-dom';
import styles from './Card.module.css';

export default function Card({codigoJogo, srcJogo, srcImagem, nomeJogo, tipoJogo}){


  const navigate = useNavigate();

  const ir = () => {
    if(tipoJogo == "casa") navigate(srcJogo)
    else{
      navigate("/jogo", {
        state: {
          srcJogo: srcJogo
        }
      })
    }
  }

  return(
    <div className={styles.card}
      key={codigoJogo}
      onClick={ir}
    >
      <img src={srcImagem} className={styles.imagemJogo}/>
      <p className={styles.tituloJogo}>{nomeJogo}</p>
    </div>
  )
}