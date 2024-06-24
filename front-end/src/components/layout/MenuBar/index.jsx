import styles from './MenuBar.module.css'
import {Link} from 'react-router-dom';
import useSessao from '../../../hooks/useSessao';
import useFormularios from '../../../hooks/useFormularios';

import iconSlots from '../../../assets/icons/slots.png';
import iconDeposito from '../../../assets/icons/cifrao.png';
import iconSaque from '../../../assets/icons/saque.png';
import iconBonus from '../../../assets/icons/bonus.png';
import iconUser from '../../../assets/icons/user.png';

export default function MenuBar(){

  const {sessao, deslogar} = useSessao();
  const {exibirFormularioLogin, exibirFormularioCadastro} = useFormularios();

  const fecharMenuBar = () => document.getElementById("check").checked = false;
  const deslogarEFechar = () => {
    deslogar();
    fecharMenuBar();
  }

  return(
    <>
      <input className={styles.input} type="checkbox" id="check" />
      <label className={styles.esconder} htmlFor='check'></label>
      <nav className={styles.menuBar}>
        <div className={styles.sessao}>
          {sessao ? <p className={styles.textoLinkSessao} onClick={deslogarEFechar}>Sair</p>
          : (
            <>
              <p className={styles.textoSessao}>
                Faça
                <Link 
                  className={styles.textoLinkSessao}
                  to={"/login"}
                  onClick={fecharMenuBar}
                >
                  login
                </Link>
                Ou
              </p>
              <Link 
                className={styles.textoLinkSessao}
                to={"/cadastro"}
                onClick={fecharMenuBar}
              >
                cadastro
              </Link>
            </>
          )}
        </div>

        <div className={styles.botoesMenuBar}>
          <Link to={"/"} className={styles.botao}
            onClick={fecharMenuBar}
          >
            <img src={iconSlots} alt="icon slots" className={styles.icon}/>
            <p className={styles.textoBotao}>Jogos</p>
          </Link>

          <Link to={"/bonus"} className={styles.botao}
            onClick={fecharMenuBar}
          >
            <img src={iconBonus} alt="icon slots" className={styles.icon}/>
            <p className={styles.textoBotao}>Bônus</p>
          </Link>

          <Link to={sessao ? "/conta" : "/login"} className={styles.botao}
            onClick={fecharMenuBar}
          >
            <img src={iconUser} alt="icon slots" className={styles.icon}/>
            <p className={styles.textoBotao}>Conta</p>
          </Link>

          <Link to={sessao ? "/deposito" : "/login"} className={styles.botao}
            onClick={fecharMenuBar}
          >
            <img src={iconDeposito} alt="icon slots" className={styles.icon}/>
            <p className={styles.textoBotao}>Depósito</p>
          </Link>

          <Link to={sessao ? "/saque" : "/login"} className={styles.botao}
            onClick={fecharMenuBar}
          >
            <img src={iconSaque} alt="icon slots" className={styles.icon}/>
            <p className={styles.textoBotao}>Saque</p>
          </Link>
        </div>
      </nav>
    </>
  )
}