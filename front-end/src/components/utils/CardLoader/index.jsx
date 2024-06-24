import styles from './CardLoader.module.css'

//Assets
import loader from '../../../assets/gifs/loading.gif';
import useLoader from '../../../hooks/useLoader';


export default function CardLoader(){

  const {visibilidadeCardLoader} = useLoader();


  return(
    <>
      {
        visibilidadeCardLoader && (
          <div className={styles.containerCardLoader}>
            <div className={styles.cardLoader}>
              <img 
                src={loader} 
                alt="Loader" 
              />
            </div>
          </div>
        )
      }
    </>
  );
}