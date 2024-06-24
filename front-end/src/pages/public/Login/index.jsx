import FormularioLogin from "../../../components/formularios/FormularioLogin";
import Container from "../../../components/layout/Container";
import useRotas from "../../../hooks/useRotas";

export default function Login(){

  const {bloquearRotaPublica} = useRotas();

  bloquearRotaPublica();

  return(
    <Container estilizacao={"centralizar"}>
      <FormularioLogin/>
    </Container>
  )
}