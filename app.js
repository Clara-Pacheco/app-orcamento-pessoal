class Despesa{
  constructor(ano,mes,dia,tipo,descricao,valor){
    this.ano = ano;
    this.mes = mes;
    this.dia = dia;
    this.tipo = tipo;
    this.descricao = descricao;
    this.valor = valor
  }
}

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
  
  console.log(cadastroDespesa1)

})

