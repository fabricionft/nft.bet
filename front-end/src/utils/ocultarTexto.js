const ocultarTexto = (nomeCompleto) => {
  let nomes = nomeCompleto.trim().split(" ");
  let nomeFOcultado = nomes[0];

  nomes.filter((nome) => nomes[0] != nome).map((nome) => {
    for(var i = 0; i < nome.length; i++)
      nomeFOcultado += (i == 0) ? " "+nome[i] : "*";
  })

  return nomeFOcultado;
}

export default ocultarTexto;