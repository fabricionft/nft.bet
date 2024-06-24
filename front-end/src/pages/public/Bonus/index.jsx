import styles from './Bonus.module.css';

//Assets
import iconBonus from '../../../assets/icons/bonus.png';
import iconCalendario from '../../../assets/icons/calendario.png';
import iconAtencao from '../../../assets/icons/atencao.png';
import iconCopiar from '../../../assets/icons/copiar.png';

//Componets
import Loader from '../../../components/utils/Loader';
import Container from '../../../components/layout/Container';

//Hooks
import useBonus from '../../../hooks/useBonus';

//Utils
import formatarData from '../../../utils/formatarData';
import useLoader from '../../../hooks/useLoader';


export default function Bonus(){

  const {listaBonus, copiarCodigoBonus} = useBonus();
  const {visibilidadeLoader} = useLoader();

  return(
    <Container>
        <details 
          className={styles.detalhesInfoBonus}
          open={false}
        >
          <summary>Sobre</summary>

          <div className={styles.infosBonus}>
            <div className={styles.magemInfosBonus}>
              <p className={styles.subtituloInfoBonus}>Código bonûs</p>
              <p className={styles.textoInfoBonus}>Utilize códigos bônus para ganhar valores fixos ou percentuais dentro do site.</p>

              <p className={styles.subtituloInfoBonus}>Como usar</p>
              <p className={styles.textoInfoBonus}>Basta copiar o código de 4 dígitos do bonûs, e inserir o mesmo no campo opcional "código bônus" do cadastro ou depósito.</p>

              <p className={styles.subtituloInfoBonus}>Regras de uso</p>
              <ul>
                <li>Quando inserido, o código deve ter exatamente 4 dígitos, caso contrário, será considerado como nulo;</li>
                <li>Cada código pode ser usado uma única vez por cada usuário;</li>
                <li>Para ser válido, o código necessita estar dentro do prazo de validade.</li>
                <li>Códigos de cadastro só podem ser usados no cadastro, a mesma coisa vale para os códigos de depósitos.</li>
              </ul>

              <p className={styles.subtituloInfoBonus}>Atenção</p>
              <p className={styles.textoInfoBonus}>Todo código bonûs adciona uma auditoria extra a ser alcançada.</p>
            </div>
          </div>
        </details>

      {
        listaBonus.length  ? (
          <div className={styles.containerBonus}>
            
            {
              listaBonus.slice().reverse().map((bonus, index) => (
                <div key={index} className={styles.bonus}>
                  <div className={styles.margemBonus}>
                    <p className={styles.tipo}>{bonus.tipo}</p>

                    <div className={styles.linha}>
                      <img src={iconCalendario} width={"17px"} height={"20px"}/>
                      <p className={styles.textoBonus}>
                        Expira em: {formatarData(bonus.dataValidade.split("T")[0])}
                      </p>
                    </div>

                    <div className={styles.linha}>
                      <img src={iconBonus} width={"20px"} height={"20px"}/>
                      <p className={styles.textoBonus}>
                        Bonûs: +
                        {
                          (bonus.tipo == "cadastro") ? "R$ "+bonus.valorBonus : bonus.percentualBonus+"%"  
                        }
                        
                      </p>
                    </div>

                    <div className={styles.linha}>
                      <img src={iconAtencao} width={"20px"} height={"20px"}/>
                      <p className={styles.textoBonus}>
                        Auditoria: {bonus.multiplicadorDeAuditoria}X
                      </p>
                    </div>

                    <button type='button' className={styles.btnBonus}
                      onClick={() => copiarCodigoBonus(bonus.codigoBonus)}
                    >
                      <p className={styles.textoBtn}>#{bonus.codigoBonus}</p>
                      <div className={styles.modulraBtn}>
                        <img src={iconCopiar} width={"17.5px"} />
                      </div>
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
        ) : visibilidadeLoader ? <Loader/>
          : <p className='aviso'>Sem bônus até o momento</p>  
      }
    </Container>
  )
}