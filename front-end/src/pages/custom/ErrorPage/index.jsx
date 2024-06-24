import styles from './PageError.module.css';

export default function PageError(){

  return(
    <div className={styles.erro404}>
      <h1 className={styles.textoErro404}>ERRO 404</h1>
    </div>
  );
}