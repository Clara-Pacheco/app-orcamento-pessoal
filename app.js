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

  recuperaTodosRegistros(){
    // array
    let despesas = []
    
    let id = localStorage.getItem('id')

    for(let i = 1;i <= id; i++){
  
      let despesa = JSON.parse(localStorage.getItem(i))
      if(despesa === null){
        continue
      }
      despesas.push(despesa)
      
    }

    return despesas
  }


}

let bd = new Bd()


function cadastrarDespesa(){

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

    //Título
    document.querySelector('#modal_titulo').innerHTML = 'Registro inserido com sucesso'
    document.querySelector('#modal_titulo_div').className = 'modal-header text-success'

    //Conteúdo
    document.querySelector('#modal_conteudo').innerHTML = "Despesa foi cadastrada com sucesso!"

    //Botão
    document.querySelector('#modal_btn').innerHTML = 'Voltar'
    document.querySelector('#modal_btn').className = "btn btn-success" 
   
    $('#modalRegistraDespesa').modal('show')

    ano.value = ''
    mes.value = ''
    dia.value = ''
    tipo.value = ''
    descricao.value = ''
    valor.value = ''

    console.log('Dados válidos!')
  }else{
    
    //Título
    document.querySelector('#modal_titulo').innerHTML = 'Erro na inclusão do registro'
    document.querySelector('#modal_titulo_div').className = 'modal-header text-danger'

    //Conteúdo
    document.querySelector('#modal_conteudo').innerHTML = "Erro na gravação, verifique se todos os campos foram preenchidos corretamente!"

    //Botão
    document.querySelector('#modal_btn').innerHTML = 'Voltar e corrigir'
    document.querySelector('#modal_btn').className = "btn btn-danger" 

    $('#modalRegistraDespesa').modal('show')
    console.log('Dados inválidos!')
  }
  
  
}



function carregaListaDespesas(){
  let despesas = bd.recuperaTodosRegistros()

  let listaDespesas = document.querySelector('#listaDepesas')

  despesas.forEach(function(d){
    console.log(d)
    let linha = listaDespesas.insertRow()

    linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
    
      switch(d.tipo){
        case '1':
          d.tipo = 'Alimentação'
          break
        case '2':
          d.tipo = 'Educação'
          break
        case '3':
          d.tipo = 'Lazer'
          break
        case '4':
          d.tipo = 'Saúde'
          break
        case '5':
          d.tipo = 'Transporte'
          break
      }

    linha.insertCell(1).innerHTML = d.tipo
    linha.insertCell(2).innerHTML = d.descricao
    linha.insertCell(3).innerHTML = d.valor

  })

}

function pesquisarDespesa(){

  let ano = document.querySelector('#ano').value
	let mes = document.querySelector('#mes').value
	let dia = document.querySelector('#dia').value
	let tipo = document.querySelector('#tipo').value
	let descricao = document.querySelector('#descricao').value
	let valor = document.querySelector('#valor').value

  let despesa = new Despesa(ano,mes,dia,tipo,descricao,valor)
	
  console.log(despesa)
}




