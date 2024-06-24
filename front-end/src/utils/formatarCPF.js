const formatarCPF = (cpf) => {
  let digitos = cpf[6] +""+ cpf[7] +""+ cpf[8];
  return "***.***."+digitos+"-**";
}

export default formatarCPF;