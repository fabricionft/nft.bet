import styles from './FormularioLoginAdmin.module.css';

import useAdmin from "../../../hooks/useAdmin";
import InputSenha from '../../itensFormulario/InputSenha';

export default function FormularioLoginAdmin(){

  const {admin, preencherAdmin, enviarFormularioLoginAdmin} = useAdmin();

  return(
    <form onSubmit={enviarFormularioLoginAdmin} className={styles.formularioLoginAdmin}>
      <input 
        type="text" 
        placeholder='Email'
        name={"email"}
        onChange={(e) => preencherAdmin(e)}
        value={admin.email || ""}  
      />

      <InputSenha
        dica={"Senha"}
        nomeEntidade={"senha"}
        entidade={admin.senha}
        preencherEntidade={preencherAdmin}
      />

      <InputSenha
        dica={"Senha sistema"}
        nomeEntidade={"senhaSistema"}
        entidade={admin.senhaSistema}
        preencherEntidade={preencherAdmin}
      />
        
      <button
        className={[(!admin.email || !admin.senha || !admin.senhaSistema) && "desativado"]}
        disabled={(admin.email && admin.senha && admin.senhaSistema) ? false : true}
      >
        Autenticar
      </button>
    </form>
  )
}