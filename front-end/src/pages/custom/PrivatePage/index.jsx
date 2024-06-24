//Hooks
import useRotas from "../../../hooks/useRotas";
import useSessao from "../../../hooks/useSessao";


export default function PrivatePage({children}){

  const {sessao} = useSessao();
  const {bloquearRotaPrivada} = useRotas();

  bloquearRotaPrivada();

  return(
    <>
      {sessao && children}
    </>
  );
}