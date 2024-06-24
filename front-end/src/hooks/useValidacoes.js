import useMessageBox from "./useMessageBox";


const useValidacoes = () => {

  const {exibirMessageBox} = useMessageBox();
   
  //Utils
  const validarSenha = (senha, confirmacaoSenha) => {
    let erros = [];

    if(senha != confirmacaoSenha) erros.push("A senha e sua confirmação devem ser iguais!");
    if(senha.length < 6) erros.push("A senha deve conter ao menos 6 digitos!");
    let quantidadeDeNumeros = 0;
    for(var i = 0; i <= senha.length; i++){
      let caracter = senha.substring(i, i+1);
      if(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(caracter)) quantidadeDeNumeros++;
    }

    if(quantidadeDeNumeros == 0) erros.push("A senha deve conter ao menos 1 número!");

    return erros;
  }

  function validarCPF(cpf){
    const digitoJ = gerarDigitoVerificador(cpf, 10);
    const digitoK = gerarDigitoVerificador(cpf, 11);

    if(digitoJ == cpf.substring(9, 10) && digitoK == cpf.substring(10,11)) return true;
    else return false;
  }

  function gerarDigitoVerificador(cpf, maximo){
    let somaDigitos = 0;
    let inicio = 0;
    let fim = 1;
    for(var i = maximo; i >= 2; i--){
        somaDigitos += cpf.substring(inicio, fim) * i;
        inicio++;
        fim++;
    }
    if((11 - (somaDigitos % 11)) >= 10) return 0;
    else return (11 - (somaDigitos % 11));
  }

  //Formulários
  const validarEtapa1FormularioCadastro = (usuario) => {
    if((usuario.nomeCompleto && usuario.celular && usuario.cpf) ? true: false){
      let erros = [];

      if(usuario.nomeCompleto.split(" ").length <= 1) erros.push("Digite seu nome completo!");
      if(usuario.cpf.length != 11)  erros.push("Digite o CPF corretamente!");
      else if(!validarCPF(usuario.cpf)) erros.push("Digie um CPF válido!");
      if(usuario.celular.length != 11)  erros.push("Digite o celular corretamente!");


      if(!erros.length) return true;
      else {
        exibirMessageBox(
          "",
          erros,
          false
        )
      }
    }
    else{
      exibirMessageBox(
        "",
        "Preencha todos os campos obrigatórios desta etapa!",
        false
      )
    }
  }

  const validarEtapa2FormularioCadastro = (usuario) => {
    if((usuario.email && usuario.senha && usuario.confirmacaoSenha) ? true: false){
      let erros = [];
      let errosDeSenha = validarSenha(usuario.senha, usuario.confirmacaoSenha);

      if(!usuario.email.endsWith("@gmail.com")) erros.push("Seu email precisa terminar com @gmail.com!");
      if(errosDeSenha.length > 0){
        errosDeSenha.forEach((erroSenha) => erros.push(erroSenha))
      }

      if(!erros.length) return true;
      else {
        exibirMessageBox(
          "",
          erros,
          false
        )
      }
    }
    else{
      exibirMessageBox(
        "",
        "Preencha todos os campos obrigatórios desta etapa!",
        false
      )
    }
  }

  const validarFormularioRecuperarSenha = (usuario) => {
    if((usuario.confirmacao && usuario.novaSenha && usuario.confirmacaoNovaSenha) ? true: false){
      let erros = [];
      let errosDeSenha = validarSenha(usuario.novaSenha, usuario.confirmacaoNovaSenha);

      if(errosDeSenha.length > 0){
        errosDeSenha.forEach((erroSenha) => erros.push(erroSenha))
      }

      if(!erros.length) return true;
      else {
        exibirMessageBox(
          "",
          erros,
          false
        )
      }
    }
    else{
      exibirMessageBox(
        "",
        "Preencha todos os campos deste formulário!",
        false
      )
    }
  }

  const validarFormularioAlterarSenha = (usuario) => {
    if((usuario.senha && usuario.novaSenha && usuario.confirmacaoNovaSenha) ? true: false){
      let erros = [];
      let errosDeSenha = validarSenha(usuario.novaSenha, usuario.confirmacaoNovaSenha);

      if(usuario.senha == usuario.novaSenha) erros.push("Sua nova senha precisa ser diferente da atual!");
      if(errosDeSenha.length > 0){
        errosDeSenha.forEach((erroSenha) => erros.push(erroSenha))
      }

      if(!erros.length) return true;
      else {
        exibirMessageBox(
          "",
          erros,
          false
        )
      }
    }
    else{
      exibirMessageBox(
        "",
        "Preencha todos os campos deste formulário!",
        false
      )
    }
  }

  const validarFormularioAdcionarChave = (chavePIX) => {
    if((chavePIX.nomeTitular && chavePIX.tipoChave != "escolha" && chavePIX.chave && chavePIX.cpfTitular) ? true: false){
      let erros = [];

      if(chavePIX.nomeTitular.split(" ").length <= 1) erros.push("Digite o nome do titular completo!");

      if(["CPF", "Celular"].includes(chavePIX.tipoChave) && chavePIX.chave.length != 11) erros.push("Digite a chave corretamente");
      else if(chavePIX.tipoChave == "CPF" && !validarCPF(chavePIX.chave)) erros.push("Digite uma chave CPF válida!");

      if(chavePIX.tipoChave == "Email" && !chavePIX.chave.endsWith("@gmail.com")) erros.push("Digite a chave corretamente");

      if(chavePIX.cpfTitular.length != 11) erros.push("Digite o CPF do titular corretamente!");
      else if(!validarCPF(chavePIX.cpfTitular)) erros.push("Digie um CPF de titular válido!");


      if(!erros.length) return true;
      else {
        exibirMessageBox(
          "",
          erros,
          false
        )
      }
    }
    else{
      exibirMessageBox(
        "",
        "Preencha todos os campos deste formulário!",
        false
      )
    }
  }

  const validarFormularioSaque = (saque) => {
    if((saque.valorSaque && saque.chaveDestinatario != "escolha") ? true: false){
      return true;
    }
    else{
      exibirMessageBox(
        "",
        "Preencha todos os campos deste formulário!",
        false
      )
    }
  }


  //ADM
  const validarFormularioJogo = (jogo) => {
    if((jogo.nome && jogo.urlJogo && jogo.urlImagem && jogo.tipo != "escolha") ? true: false){
      return true;
    }
    else{
      exibirMessageBox(
        "",
        "Preencha todos os campos deste formulário!",
        false
      );
    }
  }

  const validarFormularioBonus = (bonus) => {
    if((bonus.tipo != "escolha" && bonus.dataValidade && bonus.multiplicadorDeAuditoria) ? true: false){
      let erros = [];

      if(bonus.tipo == "cadastro" && bonus.valorBonus == 0) erros.push("O valor do bônus deve ser maior que 0!");
      if(bonus.tipo == "deposito" && bonus.percentualBonus == 0) erros.push("O percentual do bônus deve ser maior que 0!");

      if(!erros.length) return true;
      else {
        exibirMessageBox(
          "",
          erros,
          false
        )
      }
    }
    else{
      exibirMessageBox(
        "",
        "Preencha todos os campos deste formulário!",
        false
      );
    }
  }

  const validarFormularioImagem = (imagem) => {
    if((imagem.srcImagem && imagem.altImagem) ? true: false){
      return true;
    }
    else{
      exibirMessageBox(
        "",
        "Preencha todos os campos deste formulário!",
        false
      );
    }
  }


  return{
         validarEtapa1FormularioCadastro, validarEtapa2FormularioCadastro,
         validarFormularioAlterarSenha, validarFormularioRecuperarSenha, validarFormularioAdcionarChave,
         validarFormularioSaque, validarFormularioJogo, validarFormularioBonus, validarFormularioImagem
        };
}

export default useValidacoes;