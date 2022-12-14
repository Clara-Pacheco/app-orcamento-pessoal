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

      despesa.id = i
      despesas.push(despesa)
      
    }

    return despesas
  }

  pesquisar(despesa){
    let despesasFiltradas = []
    despesasFiltradas = this.recuperaTodosRegistros()
    console.log(despesasFiltradas)
    console.log(despesa)
  
      // filtro de ano
      if(despesa.ano != ''){
        console.log('Filtro de ano')
      despesasFiltradas = despesasFiltradas.filter(d => d.ano === despesa.ano)
      }

    	// filtro de mes
	
		  if(despesa.mes != ''){
        console.log('Filtro de mes')
      despesasFiltradas = despesasFiltradas.filter(d => d.mes === despesa.mes)
      }
  
  
      // filtro de dia
  
      if(despesa.dia != ''){
      despesasFiltradas = despesasFiltradas.filter(d => d.dia === despesa.dia)
      }
  
  
      // filtro de tipo
  
      if(despesa.tipo != ''){
      despesasFiltradas = despesasFiltradas.filter(d => d.tipo === despesa.tipo)
      }
  
  
      // filtro de descricao
  
      if(despesa.descricao != ''){
        despesasFiltradas = despesasFiltradas.filter(d => d.descricao === despesa.descricao)
      }
  
      // filtro de valor
  
      if(despesa.valor != ''){
        despesasFiltradas = despesasFiltradas.filter(d => d.valor === despesa.valor)
    }

    return despesasFiltradas
  
   }

   remover(id){
    localStorage.removeItem(id)
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

    //T??tulo
    document.querySelector('#modal_titulo').innerHTML = 'Registro inserido com sucesso'
    document.querySelector('#modal_titulo_div').className = 'modal-header text-success'

    //Conte??do
    document.querySelector('#modal_conteudo').innerHTML = "Despesa foi cadastrada com sucesso!"

    //Bot??o
    document.querySelector('#modal_btn').innerHTML = 'Voltar'
    document.querySelector('#modal_btn').className = "btn btn-success" 
   
    $('#modalRegistraDespesa').modal('show')

    ano.value = ''
    mes.value = ''
    dia.value = ''
    tipo.value = ''
    descricao.value = ''
    valor.value = ''

    console.log('Dados v??lidos!')
  }else{
    
    //T??tulo
    document.querySelector('#modal_titulo').innerHTML = 'Erro na inclus??o do registro'
    document.querySelector('#modal_titulo_div').className = 'modal-header text-danger'

    //Conte??do
    document.querySelector('#modal_conteudo').innerHTML = "Erro na grava????o, verifique se todos os campos foram preenchidos corretamente!"

    //Bot??o
    document.querySelector('#modal_btn').innerHTML = 'Voltar e corrigir'
    document.querySelector('#modal_btn').className = "btn btn-danger" 

    $('#modalRegistraDespesa').modal('show')
    console.log('Dados inv??lidos!')
  }
  
  
}



function carregaListaDespesas(despesas = Array(), filtro = false){
  
  if(despesas.length == 0 && filtro == false){
      despesas = bd.recuperaTodosRegistros()
  }

  let listaDespesas = document.querySelector('#listaDepesas')
  listaDespesas.innerHTML = ''

  despesas.forEach(function(d){
    console.log(d)
    let linha = listaDespesas.insertRow()

    linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
    
      switch(d.tipo){
        case '1':
          d.tipo = 'Alimenta????o'
          break
        case '2':
          d.tipo = 'Educa????o'
          break
        case '3':
          d.tipo = 'Lazer'
          break
        case '4':
          d.tipo = 'Sa??de'
          break
        case '5':
          d.tipo = 'Transporte'
          break
      }

    linha.insertCell(1).innerHTML = d.tipo
    linha.insertCell(2).innerHTML = d.descricao
    linha.insertCell(3).innerHTML = d.valor

    //Criar o bot??o de exclus??o

    let btn = document.createElement("button")
    btn.className = 'btn btn-danger'
    btn.innerHTML = '<i class = "fas fa-times"></i>'
    btn.id = `id_despesa_${d.id}`
    btn.onclick = function(){
      //remover a despesa
      let id = this.id.replace('id_despesa_', '')
      bd.remover(id)
      window.location.reload()
     }
    linha.insertCell(4).append(btn)




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
	
  let despesas = bd.pesquisar(despesa)

  this.carregaListaDespesas(despesas, true)
  
    

  
}




