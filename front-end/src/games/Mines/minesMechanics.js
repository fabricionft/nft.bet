//Assets
import correctSound from './assets/correct.mp3';
import errorSound from './assets/error.mp3';
import cashOutSound from './assets/cashOut.mp3';
import explosionSound from './assets/explosion.mp3';
import buttonSound from './assets/button.mp3';

//Hooks
import useSessao from "../../hooks/useSessao";
import useErros from "../../hooks/useErros";
import { useState } from "react";
import useSaldo from '../../hooks/useSaldo';

//Services
import api from "../../services/api";


const minesMechanics = () => {
 
  const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
  const bombas = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

  const [quantidadeDeMinas, setQuantidaeDeMinas] = useState(2);
  const [localsMinas, setLocaisMinas] = useState([]);
  const [botoesDesativos, setBotoesDesativos] = useState(true);
  const [acertos, setAcertos] = useState([]);
  const [erro, setErro] = useState([]);
  const [finalizou, setFinalizou] = useState(false)
  const [estadoJogo, setEstadoJogo] = useState("iniciar");
  const {codigo} = useSessao();
  const {tratarErro} = useErros();
  const {atualizarSaldo} = useSaldo()

  const [bet, setBet] = useState(1);
  const [valores, setValores] = useState({
    valorInicial: 0, 
    valorAtual: 0,
    proximoValor: 0
  });


  const solicitarJogada = () => {
    api.post("/jogos/solicitar/usuario/"+codigo+"/bet/"+bet)
    .then((resp) => {
      atualizarSaldo(resp.data);
      iniciarJogo();
    })
    .catch((error) => {
      tratarErro('', error);
    });
  }

  const iniciarJogo = () => {
    setBotoesDesativos(false);
    gerarMinas();
    setEstadoJogo("cashOut");

    setValores(
      {...valores,
        valorInicial: bet,
        valorAtual: bet,
        proximoValor: bet / ((1 - (quantidadeDeMinas / 25)))
      }
    );
    new Audio(buttonSound).play();
  }

  const reiniciarJogo = () => {
    setValores(
      {...valores,
        valorInicial: 0,
        valorAtual: 0,
        proximoValor: 0
      }
    );
    setLocaisMinas([]);
    setAcertos([]);
    setFinalizou(false);
    setErro(0);
    setEstadoJogo("iniciar");
    setBotoesDesativos(true);
    new Audio(buttonSound).play();
  }

  const darCashOut = () => {
    api.post("/jogos/encerrar/usuario/"+codigo+"/lucro/"+valores.valorAtual)
    .then((resp) => {
      setFinalizou(true);
      setBotoesDesativos(true);
      setEstadoJogo("jogarNovamente");
      new Audio(cashOutSound).play();
      atualizarSaldo(resp.data);
    })
    .catch((error) => {
      tratarErro('', error);
    });
  }

  const gerarMinas = () => {
    let locais = [];
    while(locais.length < quantidadeDeMinas){
      let numeroRandomico = Math.floor(Math.random() * 25 + 1);
      if(!locais.includes(numeroRandomico)) locais.push(numeroRandomico)
    }
    setLocaisMinas(locais);
  }

  const verificar = (numero) => {
    if(localsMinas.includes(numero)){
      setFinalizou(true);
      setErro(numero);
      setBotoesDesativos(true);
      setEstadoJogo("jogarNovamente");
      new Audio(explosionSound).play();
    }
    else if (!acertos.includes(numero)){
      setAcertos(proximoAcerto => [...proximoAcerto, numero]);
      setValores(
        {...valores,
          valorAtual: valores.valorAtual / ((1 - (quantidadeDeMinas / 25))),
          proximoValor: valores.proximoValor / ((1 - (quantidadeDeMinas / 25)))
        }
      );
      new Audio(correctSound).play();
    }
    else new Audio(errorSound).play();
  }

  const aumentarBet = () => {setBet(bet + 1);}
  const diminuirBet = () => {if(bet >=2 ) setBet(bet - 1);}

  return{
    numeros, bombas,
    quantidadeDeMinas, botoesDesativos, acertos, finalizou, erro, localsMinas,
    verificar, setQuantidaeDeMinas, solicitarJogada, iniciarJogo, reiniciarJogo, darCashOut, estadoJogo,
    valores, bet, setBet, aumentarBet, diminuirBet
  };
}

export default minesMechanics;