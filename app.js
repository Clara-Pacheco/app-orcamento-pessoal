class Despesa{
  constructor(ano,mes,dia,tipo,descricao,valor){
    this.ano = ano;
    this.mes = mes;
    this.dia = dia;
    this.tipo = tipo;
    this.descricao = descricao;
    this.valor = valor
  }

  validarDados(){
    for(let i in this){
      if(this[i] == undefined || this[i] == '' || this[i] == null){
        return false
      }
    }
        return true
  }
}

class Bd {
  constructor(){
    let id = localStorage.getItem('id')

    if(id === null){
      localStorage.setItem('id', 0)
    }
  }

  getProximoId(){
    let proximoId = localStorage.getItem('id')
    return parseInt(proximoId) + 1
  }

  gravar(d){
    
    let novoId = this.getProximoId()

    localStorage.setItem(novoId,JSON.stringify(d))

    localStorage.setItem('id',novoId)
  }


}

let bd = new Bd()

let button = document.querySelector('#button')

button.addEventListener('click', function cadastrarDespesa(){

  let ano = document.querySelector('#ano')
  let mes = document.querySelector('#mes')
  let dia = document.querySelector('#dia')
  let tipo = document.querySelector('#tipo')
  let descricao = document.querySelector('#descricao')
  let valor = document.querySelector('#valor')

  let cadastroDespesa1 = new Despesa(
    ano.value,
    mes.value,
    dia.value,
    tipo.value,
    descricao.value,
    valor.value
  )
  
  if(cadastroDespesa1.validarDados()){
    bd.gravar(cadastroDespesa1)

    document.querySelector('#modal_titulo').innerHTML = 'Registro inserido com sucesso'
    document.querySelector('#modal_titulo_div').className = 'modal-header text-success'

    document.querySelector('#modal_conteudo').innerHTML = "Despesa foi cadastrada com sucesso!"

    document.querySelector('#modal_btn').innerHTML = 'Voltar'
    document.querySelector('#modal_btn').className = "btn btn-success" 
   
    $('#modalRegistraDespesa').modal('show')
    console.log('Dados válidos!')
  }else{
    document.querySelector('#modal_titulo').innerHTML = 'Erro na inclusão do registro'
    document.querySelector('#modal_titulo_div').className = 'modal-header text-danger'

    document.querySelector('#modal_conteudo').innerHTML = "Erro na gravação, verifique se todos os campos foram preenchidos corretamente!"

    document.querySelector('#modal_btn').innerHTML = 'Voltar e corrigir'

    document.querySelector('#modal_btn').className = "btn btn-danger" 

    $('#modalRegistraDespesa').modal('show')
    console.log('Dados inválidos!')
  }
  
  
})




