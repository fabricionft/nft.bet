import useRotas from "../../../hooks/useRotas";
import useSessao from "../../../hooks/useSessao"

export default function GamePage({children}){

  const {sessao} = useSessao();
  const {bloquearRotaDeGames} = useRotas();

  bloquearRotaDeGames();

  return(
    <>
      {sessao && children}
    </>
  );
}