import Card from '../../utils/Card';
import useJogos from '../../../hooks/useJogos';
import Loader from '../../utils/Loader';
import styles from './Jogos.module.css';
import useLoader from '../../../hooks/useLoader';

export default function Jogos({tituloJogos, tipo}){

  const {jogos, filtro, setFiltro} = useJogos();
  const {visibilidadeLoader} = useLoader();

   return(
    <>
      {
        jogos.filter((jogo) => jogo.tipo == tipo).length ? (
          <>
            <header className={styles.headerSection}>
              <h2 className={styles.tituloSecao}>{tituloJogos}</h2>

              <input 
                type="text" 
                className={styles.inputPesquisa}
                placeholder='Pesquise um jogo'
                name='filtro'
                onChange={(e) => setFiltro(e.target.value)}
                value={filtro }
              />
            </header>
            
            <section className={styles.jogos}>
              {jogos
              .filter((jogo) => jogo.nome.toLowerCase().includes(filtro.toLowerCase()))
              .filter((jogo) => jogo.tipo == tipo)
              .map((jogo) => (
                <Card
                  key={jogo.codigo}
                  srcJogo={jogo.urlJogo}
                  srcImagem={jogo.urlImagem}
                  nomeJogo={jogo.nome}
                  tipoJogo={jogo.tipo}
                />
              ))}
            </section>
          </>
        ) : visibilidadeLoader ? <Loader/>
          : <p className='aviso'>Sem jogos {tipo} até o momento!</p>
      }
    </>
  );
}