import styles from './Loader.module.css';
import gifLoading from '../../../assets/gifs/loading.gif';


export default function Loader(){

  return(
    <div className={styles.loader}>
      <img src={gifLoading} className={styles.gifLoading}/>
    </div>
  )
}