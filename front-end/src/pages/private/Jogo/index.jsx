import styles from './Jogo.module.css';

//Hooks
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


export default function Jogo(){

  const location = useLocation();
  const navigate = useNavigate();
  const jogo = (location.state) ? location.state.srcJogo : null;


  useEffect(() => {
    if(!jogo) navigate("/login")
  }, [])

  return(
    <div className={styles.containerJogo}>
      <iframe src={jogo} frameborder="0" className={styles.jogo}></iframe>
    </div>
  )
}