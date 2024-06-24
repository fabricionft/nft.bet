//components
import Loader from '../../../components/utils/Loader';
import FormularioBonus from '../../../components/formularios/FormularioBonus';
import Container from '../../../components/layout/Container';
import HeaderAdmin from '../../../components/layout/HeaderAdmin';

//Hooks
import useBonus from '../../../hooks/useBonus';


export default function EditarBonus(){

  const {bonus, preencherBonus, editarBonus} = useBonus();

  return(
    <Container estilizacao={"admin"}>
      <HeaderAdmin
        destino={"/adm/bonus"}
      />

      {
        bonus.codigo ? (
          <FormularioBonus
            bonus={bonus}
            preencherBonus={preencherBonus}
            executarAcao={editarBonus}
            txtBotao={"Editar"}
          />
        ) : <Loader/>
      }
    </Container>
  )
}