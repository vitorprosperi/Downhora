export const buscarcep = async (cep, setRua, setBairro, setCidade, setEstado, setComplemento) => {
  if (cep.length !== 8) return null;

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (!data.erro) {
      setRua(data.logradouro);
      setBairro(data.bairro);
      setCidade(data.localidade);
      setEstado(data.uf);
      
    } else {
      alert('CEP não encontrado');
      return null;
    }

  } catch (error) {
    console.error('Erro ao buscar o CEP:', error);
    return null;
  }
};
