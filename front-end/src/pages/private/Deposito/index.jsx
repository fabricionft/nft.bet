import styles from './Deposito.module.css';

//Componets
import Container from '../../../components/layout/Container';
import SeletorValores from '../../../components/utils/SeletorValores';

//Hooks
import useDeposito from '../../../hooks/useDeposito';


export default function Deposito(){

  const {deposito, escolherValor, preencherDeposito, solicitarDeposito} = useDeposito();

  return(
    <Container estilizacao={"centralizar"}>
      <div className={styles.deposito}>
        <div className={styles.margemDeposito}>
          <h1 className={styles.tituloDeposito}>Depósito</h1>

          <SeletorValores
            transacao={"deposito"}          
            valor={deposito.valorDeposito}
            executarAcao={escolherValor}
          />

          <input type="number" className={styles.inputSeletorValor}
            name='valorDeposito'
            placeholder='Digite o valor (Mín. 5)'
            onChange={(e) => preencherDeposito(e)}
            value={deposito.valorDeposito || ""}
          />
          <input type="number" className={styles.inputSeletorValor}
            name='codigoBonus'
            placeholder='Digite o código promocional (opcional)'
            onChange={(e) => preencherDeposito(e)}
            value={deposito.codigoBonus || ""}
          />

          <button className={styles.btnConcluirTransacao}
            onClick={solicitarDeposito}
          >Ir pagar</button>
        </div>
      </div>
    </Container>
  )
}