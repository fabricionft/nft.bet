
import styles from './InputSenha.module.css';

import useFormularios from "../../../hooks/useFormularios"

import iconOlho from '../../../assets/icons/olho.png';
import iconOlhoF from '../../../assets/icons/olhoF.png';


export default function InputSenha({dica, nomeEntidade, preencherEntidade, entidade}){

  const {senhaVisivel, setSenhaVisivel} = useFormularios();

  return(
    <div className={styles.linha}>
      <input 
        placeholder={dica}
        type={(senhaVisivel) ? "text" : "password"}
        name={nomeEntidade}
        onChange={(e) => preencherEntidade(e)}
        value={(entidade || "")}
      />

      <img 
        src={(senhaVisivel) ? iconOlho : iconOlhoF} 
        alt="Icon olho" 
        onClick={() => setSenhaVisivel((senhaVisivel) ? false : true)}
      />
    </div>
  )
}