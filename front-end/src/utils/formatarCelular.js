const formatarCelular = (celular) => {

  return "("+celular[0]+""+celular[1]+") "+celular.substring(2);
}

export default formatarCelular