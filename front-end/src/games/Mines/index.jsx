import styles from './Mines.module.css';
import Container from '../../components/layout/Container';

import circulo from './assets/circulo.png';
import estrela from './assets/estrela.png';
import bomba from './assets/bomba.png';
import explosao from './assets/explosao.png';

import minesMechanics from './minesMechanics';


export default function Mines(){

  const {
    numeros, bombas,
    solicitarJogada, reiniciarJogo, darCashOut, estadoJogo,
    botoesDesativos, quantidadeDeMinas, setQuantidaeDeMinas,
    localsMinas, acertos, finalizou, erro, verificar,
    valores, bet, setBet, aumentarBet, diminuirBet
  } = minesMechanics();

  return(
    <Container estilizacao={"centralizar"}>
      <div className={styles.containerMines}>
        <header className={styles.botoesSuperior}>
          <select className={styles.seletorMinas}
           value={quantidadeDeMinas}
           onChange={(e) => setQuantidaeDeMinas(e.target.value)}
           disabled={(estadoJogo == "iniciar") ? false : true}
          >
            {
              bombas.map((bomba, index) => (
                <option key={index} value={bomba}>{bomba}</option>
              ))
            }
          </select>
        </header>

        <div className={styles.containerTelas}>
          <div className={styles.telaMines}>
            {
              numeros.map((numero, index) => (
                <button key={index} className={styles.mine+" "+styles[(erro == numero) && "errou"]}
                  onClick={() => verificar(numero)} 
                  disabled={botoesDesativos}
                >
                
                <img className={styles.iconMine} src={
                  (!finalizou) ? ((acertos.includes(numero)) ? estrela : circulo)
                  : (erro == numero) ? explosao 
                  : (localsMinas.includes(numero)) ? bomba : estrela
                }/>
                
                </button>
              ))
            }
          </div>

          <div className={styles.telaValores}>
            <div className={styles.margemTelaValores}>
              <div className={styles.infoValores}>
                <p className={styles.subtituloValores}>Inicial</p>
                <p className={styles.textoValores}>R$ {valores.valorInicial.toFixed(2)}</p>
              </div>

              <div className={styles.infoValores}>
                <p className={styles.subtituloValores}>Atual</p>
                <p className={styles.textoValores}>R$ {valores.valorAtual.toFixed(2)}</p>
              </div>

              <div className={styles.infoValores}>
                <p className={styles.subtituloValores}>Próximo</p>
                <p className={styles.textoValores}>R$ {valores.proximoValor.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        <footer className={styles.botoesInferior}>
          <button className={styles.btnJogar+" "+styles[(acertos.length == 0 && estadoJogo == "cashOut") && "desativado"]}
            onClick={
              (estadoJogo == "iniciar") ? solicitarJogada
              : (estadoJogo == "cashOut") ? darCashOut 
              : reiniciarJogo
            }
            disabled={(acertos.length == 0 && estadoJogo == "cashOut") && true}
          >
            {
              (estadoJogo == "iniciar") ? "Jogar"
              : (estadoJogo == "cashOut") ? "Cash out" 
              : "Limpar jogo"
            }
          </button>

          <div className={styles.btnsAlterarValor}>
            <button
              onClick={aumentarBet}
              disabled={(estadoJogo == "iniciar") ? false : true}
            >
              +
            </button>

            <button
              onClick={diminuirBet}
              disabled={(estadoJogo == "iniciar") ? false : true}
            >
              -
            </button>
          </div>

          <input type="number" className={styles.inputBet}
            placeholder='1.00'
            value={bet || 1}
            onChange={(e) => setBet(parseFloat(e.target.value))}
            readOnly={(estadoJogo == "iniciar") ? false : true}
          />
        </footer>
      </div>
    </Container>
  )
}