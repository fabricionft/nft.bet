import { useContext } from "react"
import { MessageBoxContext } from "../contexts/MessageBoxContext"
import { useLocation, useNavigate } from "react-router-dom"
import useAdminSessao from './useAdminSessao';

const useMessageBox = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const {visible, exibir, esconder} = useContext(MessageBoxContext);
  const {deslogarComoAdmin} = useAdminSessao();

  const exibirMessageBox = (destino, msg, sucesso, deslogar) => {
    navigate((destino) ? destino : location.pathname, {
      state: {
        sucesso: sucesso,
        msg: msg,
        txtBotao: (deslogar) ? "Entendido" : (sucesso) ? "Prosseguir" : "Tentar novamente",
        deslogar: (deslogar) ? true : false
      }
    })
    exibir();
  }

  const esconderMessageBoxEDeslogarComoAdmin = () => {
    esconder();
    deslogarComoAdmin();
  }

  const state = location.state;
  const dadosMessageBox = (state) && {
    sucesso: state.sucesso,
    msg: state.msg,
    txtBotao: state.txtBotao,
    deslogar: state.deslogar
  }

  return {visible, dadosMessageBox, esconder, esconderMessageBoxEDeslogarComoAdmin, exibirMessageBox};
}

export default useMessageBox;