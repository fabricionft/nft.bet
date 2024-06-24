import useLoader from "./useLoader";
import useMessageBox from "./useMessageBox";

const useErros = () => {

  const {exibirMessageBox} = useMessageBox();
  const {esconderCardLoader} = useLoader();
  
  const tratarErro = (destino, error) => {
    exibirMessageBox(
      destino,
      (error.response.status == 401) ? error.response.data.message : "Seu token de autenticação expirou ou não existe, por motivos de segurança você será deslogado!",
      false,
      (error.response.status == 401) ? false : true
    );
    esconderCardLoader();
  }

  return {tratarErro};
}

export default useErros;