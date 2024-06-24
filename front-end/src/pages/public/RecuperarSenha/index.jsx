import Container from '../../../components/layout/Container';

import FormularioRecuperarSenha from '../../../components/formularios/FormularioRecuperarSenha';
import useRotas from '../../../hooks/useRotas';

export default function RecuperarSenha(){

  const {bloquearRotaPublica} = useRotas();

  bloquearRotaPublica();


  return(
    <Container estilizacao={"centralizar"}>
      <FormularioRecuperarSenha/>
    </Container>
  )
}