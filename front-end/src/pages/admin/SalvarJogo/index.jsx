//Components
import Container from '../../../components/layout/Container';
import HeaderAdmin from '../../../components/layout/HeaderAdmin';
import FormularioJogo from '../../../components/formularios/FormularioJogo';

//Hooks
import useJogos from '../../../hooks/useJogos';


export default function SalvarJogo(){

  const {jogo, preencherJogo, salvarJogo} = useJogos();

  return(
    <Container estilizacao={"admin"}>
      <HeaderAdmin
        destino={"/adm/jogos"}
      />

      <FormularioJogo
          jogo={jogo}
          executarAcao={salvarJogo}
          preencherJogo={preencherJogo}
          txtBotao={"Salvar"}
      />
    </Container>
  )
}