import useAdminSessao from "../hooks/useAdminSessao";
import api from "./api";

const addHeaderAuthorizationAdmin = () => {

  const {token} = useAdminSessao();

  if(token){
    api.defaults.headers.authorization = `Bearer ${token}`;
  }
}

export default addHeaderAuthorizationAdmin;