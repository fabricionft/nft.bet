import FormularioCadastro from "../../../components/formularios/FormularioCadastro";
import Container from "../../../components/layout/Container";
import useRotas from "../../../hooks/useRotas";

export default function Cadastro(){

  const {bloquearRotaPublica} = useRotas();

  bloquearRotaPublica();

  return(
    <Container estilizacao={"centralizar"}>
      <FormularioCadastro/>
    </Container>
  );
}