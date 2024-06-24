//Components
import FormularioBonus from '../../../components/formularios/FormularioBonus';
import Container from '../../../components/layout/Container';
import HeaderAdmin from '../../../components/layout/HeaderAdmin';

//Hooks
import useBonus from '../../../hooks/useBonus';


export default function SalvarBonus(){

  const {bonus, preencherBonus, salvarBonus} = useBonus();

  return(
    <Container estilizacao={"admin"}>
      <HeaderAdmin
        destino={"/adm/bonus"}
      />

      <FormularioBonus
          bonus={bonus}
          preencherBonus={preencherBonus}
          executarAcao={salvarBonus}
          txtBotao={"Salvar"}
      />
    </Container>
  )
}