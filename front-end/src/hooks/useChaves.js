import { useState, useEffect } from "react";
import useValidacoes from "./useValidacoes";
import useSessao from '../hooks/useSessao';
import api from "../services/api";
import useMessageBox from "./useMessageBox";
import useFormularios from "./useFormularios";
import useErros from './useErros';
import useLoader from "./useLoader";

const useChaves = () => {

  //Global
  const {codigo} = useSessao();
  const {exibirMessageBox} = useMessageBox();
  const {esconderFormularioAdcionarChave} = useFormularios();
  const {tratarErro} = useErros();
  const {exibirCardLoader, esconderCardLoader} = useLoader();
  const {validarFormularioAdcionarChave} = useValidacoes();

  const [chaves, setChaves] = useState([]);

  useEffect(() => {
    api.get("/chaves/".concat(codigo))
    .then((resp) => {
      setChaves(resp.data)
    })
    .catch((error) => console.log(error))
  }, []);

  const [chavePIX, setChavePIX] = useState({
    tipoChave: "escolha"
  });

  const preencherChavePix = (e) => setChavePIX({...chavePIX, [e.target.name] : e.target.value});

  const salvarChavePix = () => {
    if(validarFormularioAdcionarChave(chavePIX)){
      exibirCardLoader();
      api.post("/chaves", {
        codigoUsuario: codigo,
        ...chavePIX
      })
      .then(() => {
        exibirMessageBox(
          "",
          "Chave adcionada com sucesso!",
          true
        );
        esconderFormularioAdcionarChave();
        esconderCardLoader();
      })
      .catch((error) => {
        tratarErro('', error);
      })
    }
  }

  const enviarFormularioAdcionarChave = (e) => {
    e.preventDefault();
    salvarChavePix();
  }

  return{chavePIX, preencherChavePix, enviarFormularioAdcionarChave,
         chaves};
}

export default useChaves;