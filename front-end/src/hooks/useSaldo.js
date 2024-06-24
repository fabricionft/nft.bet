import { useContext, useEffect} from "react";
import api from "../services/api";
import useSessao from "./useSessao";
import useErros from './useErros';
import { SaldoContext } from "../contexts/SaldoContext";


const useSaldo = () => {

  const {codigo} = useSessao();
  const {saldo, atualizarSaldo} = useContext(SaldoContext);
  const {tratarErro} = useErros();

  useEffect(() => {
    api.get("/usuarios/saldo/".concat(codigo))
    .then((resp) => {
      atualizarSaldo(resp.data)
    })
    .catch((error) => {
      tratarErro('', error);
    })
  }, []);


  return{saldo, atualizarSaldo};
}

export default useSaldo;