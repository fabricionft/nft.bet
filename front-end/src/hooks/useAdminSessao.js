import { useContext } from "react"
import { AdminSessaoContext } from "../contexts/AdminSessaoContext"

const useAdminSessao = () => {

  const {adminSessao, logarComoAdmin, deslogarComoAdmin, role, token} = useContext(AdminSessaoContext);
  return {adminSessao, logarComoAdmin, deslogarComoAdmin, role, token};
}

export default useAdminSessao;