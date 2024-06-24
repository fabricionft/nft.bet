//Components
import Container from '../../../components/layout/Container';
import useRotas from '../../../hooks/useRotas';
import FormularioLoginAdmin from '../../../components/formularios/FormularioLoginAdmin';

export default function LoginAdmin(){

  const {bloquearRotaLoginAdmin} = useRotas();

  bloquearRotaLoginAdmin();

  return(
    <Container estilizacao={"centralizar"}>
      <FormularioLoginAdmin/>
    </Container>
  )
}