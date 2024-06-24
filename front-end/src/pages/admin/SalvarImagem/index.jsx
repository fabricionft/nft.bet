//Components
import FormularioBonus from '../../../components/formularios/FormularioBonus';
import FormularioImagem from '../../../components/formularios/FormularioImagem';
import Container from '../../../components/layout/Container';
import HeaderAdmin from '../../../components/layout/HeaderAdmin';

//Hooks
import useImagens from '../../../hooks/useImagens';


export default function SalvarImagem(){

  const {imagem, preencherImagem, salvarImagem} = useImagens();

  return(
    <Container estilizacao={"admin"}>
      <HeaderAdmin
        destino={"/adm/imagens"}
      />

      <FormularioImagem
        imagem={imagem}
        preencherImagem={preencherImagem}
        executarAcao={salvarImagem}
        txtBotao={"Salvar"}
      />
    </Container>
  )
}