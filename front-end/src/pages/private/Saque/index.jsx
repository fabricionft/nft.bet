import styles from './Saque.module.css';

//Components
import Container from '../../../components/layout/Container';
import SeletorValores from '../../../components/utils/SeletorValores';
import { Link } from 'react-router-dom';

//Hooks
import useSaque from '../../../hooks/useSaque';
import useChaves from '../../../hooks/useChaves';


export default function Saque(){

  const {saque, escolherValor, preencherSaque, solicitarSaque} = useSaque();
  const {chaves} = useChaves();

  return(
    <Container estilizacao={"centralizar"}>
      <div className={styles.saque}>
        <div className={styles.margemSaque}>
          <h1 className={styles.tituloSaque}>Saque</h1>

          <SeletorValores
            transacao={"saque"}
            valor={saque.valorSaque}
            executarAcao={escolherValor}
          />

          <div className={styles.linhaContas}>
            <select className={styles.selectValorSaque}
              name='chaveDestinatario'
              onChange={(e) => preencherSaque(e)}
              value={saque.chaveDestinatario || "escolha"}
            >
              <option value="escolha">Escolha a chave</option>
              {
                chaves.map((chave, index) => (
                  <option key={index} value={chave.chave}>{chave.chave} ({chave.tipoChave})</option>
                ))  
              }
            </select>
            
            <Link className={styles.btnAdcionarChave}
              to={"/conta"}
            >
              Adcionar
            </Link>
          </div>

          <input type="number" className={styles.inputValorSaque}
            placeholder='Digite o valor (Mín. 60)'
            name='valorSaque'
            onChange={(e) => preencherSaque(e)}
            value={saque.valorSaque || ""}
          />

          <button className={styles.btnConcluirSaque}
            onClick={solicitarSaque}
          >Solicitar saque</button>
        </div>
      </div>
    </Container>
  )
}