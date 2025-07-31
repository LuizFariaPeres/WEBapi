document.addEventListener("DOMContentLoaded", ()=>{
    const cep_local = document.getElementById("cep");
    if(!cep_local){
        console.error("Cep não encontrado ou nulo");
        return;
    }
    cep_local.addEventListener("focusoust", (evento)=>{
        const elemento = evento.target;
        const cep_informado = elemento.value.trim();

        if(!(cep_informado.length === 8 )){
            return;
        }
        fetch(`https://viacep.com.br/ws/${cep_informado}/json/`)
        .then(response => response.json())
        .then(data => {
            if(!data.erro){
                document.getElementById("logradouro").value = data.logradouro;
                document.getElementById("bairro").value = data.bairro;
                document.getElementById("estado").value = data.uf;
            }else{
                alert("Cep não encontrado");    
            }
        }) 
        .catch(error => console.error("Cep não localzado", error));
    })
    
    
    
})