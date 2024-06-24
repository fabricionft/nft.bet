import styles from './FormularioImagem.module.css';

export default function FormularioImagem({imagem, preencherImagem, executarAcao, txtBotao}){

  return(
    <div className={styles.containerFormularioImagem}>
      <form 
        onSubmit={executarAcao}
      >
        <label className={styles.labelFormularioImagem}>SRC</label>
        <textarea 
          className={styles.textAreaFormularioImagem}
          placeholder='Digite a URL da imagem'
          name='srcImagem'
          onChange={(e) => preencherImagem(e)}
          value={imagem.srcImagem || ""}
        />

        <label className={styles.labelFormularioImagem}>Texto alternativo</label>
        <input 
          type="text"
          placeholder='Digite o texto alternativo da imagem'
          name='altImagem'
          onChange={(e) => preencherImagem(e)}
          value={imagem.altImagem || ""}
        />

        <button>
          {txtBotao}
        </button>
      </form>
    </div>
  )
}