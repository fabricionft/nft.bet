export default function InputNumerico({dica, entidade, nome, preencherEntidade, maximoDenumeros}){

   return(
    <input 
      placeholder={dica}
      type="number" 
      name={nome}
      onChange={(e) => {
        (!entidade) ? preencherEntidade(e) 
        : (e.target.value.length <=  maximoDenumeros) && preencherEntidade(e)
      }}
      value={entidade || ""}
    />
  )
}