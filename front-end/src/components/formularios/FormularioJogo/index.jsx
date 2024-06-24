import styles from './FormularioJogo.module.css'

export default function FormularioJogo({jogo, preencherJogo, executarAcao, txtBotao}){

  return(
    <div className={styles.containerFormularioJogo}>
      <form onSubmit={executarAcao}>
        <label className={styles.labelFormularioJogo}>Nome</label>
        <input 
          type="text"
          placeholder='Digite o nome do jogo'
          name='nome'
          onChange={(e) => preencherJogo(e)}
          value={jogo.nome || ""}
        />

        <label className={styles.labelFormularioJogo}>URL jogo</label>
        <input 
          type="text"
          placeholder='Digite a URL do jogo'
          name='urlJogo'
          onChange={(e) => preencherJogo(e)}
          value={jogo.urlJogo || ""}
        />

        <label className={styles.labelFormularioJogo}>URL imagem</label>
        <input 
          type="text"
          placeholder='Digite a URL da imagem do jogo'
          name='urlImagem'
          onChange={(e) => preencherJogo(e)}
          value={jogo.urlImagem || ""}
        />

        <label className={styles.labelFormularioJogo}>Tipo</label>
        <select 
          name="tipo"
          onChange={(e) => preencherJogo(e)}
          value={jogo.tipo || ""}
        >
          <option value="escolha">Esolha</option>
          <option value="casa">Da casa</option>
          <option value="slots">Slots</option>
        </select>

        <button>{txtBotao}</button>
      </form>
    </div>
  )
}