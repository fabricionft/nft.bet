import UsePaginacao from '../../../hooks/usePaginacao';
import styles from './BotaoPaginacao.module.css';

export default function BotaoPaginacao(){

  const {indicePaginacao, setIndicePaginacao, quantidadeDePaginas} = UsePaginacao();

  return(
    <>
      {
        <div className={styles.containerPaginacao}>
          {
            indicePaginacao > 0 && (
              <button 
                className={styles.botaoPaginacao}
                onClick={() => setIndicePaginacao(indicePaginacao - 1)
                }
              >
                {"<"}
              </button>
            )
          }
    
          <p className={styles.indicePaginacao+" "+
              styles[(indicePaginacao == 0) && "margemEsquerda"]+" "+
              styles[(quantidadeDePaginas == 1) && "ambasMargens"]
          }>
            {indicePaginacao+1}
          </p>
    
          {
            indicePaginacao + 1  < quantidadeDePaginas && (
              <button
              className={styles.botaoPaginacao}
              onClick={() => setIndicePaginacao(indicePaginacao + 1)}
            >
              {">"}
            </button>
            )
          }
        </div>
      }
    </>
  )
}