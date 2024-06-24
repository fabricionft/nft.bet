//Components
import Loader from '../../../components/utils/Loader';
import FormularioImagem from '../../../components/formularios/FormularioImagem';
import Container from '../../../components/layout/Container';
import HeaderAdmin from '../../../components/layout/HeaderAdmin';

//Hooks
import useImagens from '../../../hooks/useImagens';


export default function EditarImagem(){

  const {imagem, preencherImagem, salvarImagem} = useImagens();

  return(
    <Container estilizacao={"admin"}>
      <HeaderAdmin
        destino={"/adm/imagens"}
      />

      {
        imagem.codigo ? (
          <FormularioImagem
            imagem={imagem}
            preencherImagem={preencherImagem}
            executarAcao={salvarImagem}
            txtBotao={"Editar"}
          />
        ) : <Loader/>
      }
    </Container>
  )
}