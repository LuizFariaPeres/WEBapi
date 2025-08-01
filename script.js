//função que faz o autocomplete das informações
function autoCompletar (){
    //cria uma variavel para pegar o item do localStoreaegr
    const endereco_salvo = localStorage.getItem("enderoco_salvo");

    //verifica se há um endereco salvo
    if(endereco_salvo){
        //verifica a string no formato JSON
        const dados = JSON.parse(endereco_salvo);
        //aplica nos campos o valor salvo na variavel endereco_salvo
        document.getElementById("cep").value = dados.cep || '';
        document.getElementById("logradouro").value = dados.logradouro || '';
        document.getElementById("bairro").value = dados.bairro || '';
        document.getElementById("estado").value = dados.estado   || '';
    }
}
const cep = document.querySelector("#cep");

cep.addEventListener('focusout', (evento)=> {
    const elemento = evento.target;
    const cep_informado = elemento.value;


    if(!cep_informado.length === 8)
        return;
    

    fetch(`https://viacep.com.br/ws/${cep_informado}/json/`)
        .then(response => response.json())
        .then(data =>{
            if(!data.erro){
                document.getElementById('logradouro').value = data.logradouro;
                document.getElementById('bairro').value = data.bairro;
                document.getElementById('estado').value = data.uf;

                //salva os arquivos no localstorager
                const endereco = {
                    cep: cep_informado,
                    logradouro: data.logradouro,
                    bairro: data.bairro,
                    estado: data.uf

                };
                //converte o valor para um JSON
                localStorage.setItem('enderoco_salvo', JSON.stringify(endereco));
            }else{
                alert("CEP não encontrado")
            }
        })
        .catch(error => console.log("Erro ao buscar cep", error));
    const local = localStorage.getItem("enderoco_salvo");

    if(local){
        const save = JSON.parse(local)
        console.log("Endereços salvos");
        document.getElementById('logradouro').value = data.logradouro;
        document.getElementById('bairro').value = data.bairro;
        document.getElementById('estado').value = data.uf;
    }

});
window.addEventListener("DOMContentLoaded", autoCompletar)

