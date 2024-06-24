import styles from './FormularioBonus.module.css'

export default function FormularioBonus({bonus, preencherBonus, executarAcao, txtBotao}){

  return(
    <div className={styles.containerFormularioBonus}>
      <form 
        onSubmit={executarAcao}
      >
        <label className={styles.labelFormularioBonus}>Tipo</label>
        <select
          name="tipo"
          onChange={(e) => preencherBonus(e)}
          value={bonus.tipo || ""}
        >
          <option value="escolha">Esolha</option>
          <option value="cadastro">Cadastro</option>
          <option value="deposito">Depósito</option>
        </select>

        {
          bonus.tipo == "cadastro" ? (
            <>
              <label className={styles.labelFormularioBonus}>Valor</label>
              <input 
                type="number"
                placeholder='Digite o valor do bônus'
                name='valorBonus'
                onChange={(e) => preencherBonus(e)}
                value={bonus.valorBonus >= 0 && (bonus.valorBonus || 0)}
              />
            </>
          ) : bonus.tipo == "deposito" && (
            <>
              <label className={styles.labelFormularioBonus}>Percentual de acréscimo</label>
              <input 
                type="number"
                placeholder='Digite o percentual de acréscimo'
                name='percentualBonus'
                onChange={(e) => preencherBonus(e)}
                value={bonus.percentualBonus >= 0 && (bonus.percentualBonus || 0)}
              />
            </>
          )
        }

        <label className={styles.labelFormularioBonus}>Auditoria (X)</label>
        <input 
          type="number"
          placeholder='Digite o multiplicador de auditoria'
          name='multiplicadorDeAuditoria'
          onChange={(e) => preencherBonus(e)}
          value={bonus.multiplicadorDeAuditoria >= 0 && bonus.multiplicadorDeAuditoria || ""}
        />

        <label className={styles.labelFormularioBonus}>Data validade</label>
        <input 
          type="date"
          placeholder='Digite o multiplicador de auditoria'
          name='dataValidade'
          onChange={(e) => preencherBonus(e)}
          value={bonus.dataValidade || ""}
        />

        <button>
          {txtBotao}
        </button>
      </form>
    </div>
  )
}