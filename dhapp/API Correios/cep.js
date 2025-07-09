const buscarcep = async () => {
    if(cep.lenght !== 8) return;

    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    
    if(!data.erro) {
        
    }
}