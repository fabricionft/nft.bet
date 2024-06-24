const formatarData = (data) => {
  return data.split("-")[2]+"/"+data.split("-")[1]+"/"+data.split("-")[0];
}

export default formatarData;