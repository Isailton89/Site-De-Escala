const escalaOperadores = document.querySelector('.box-escala')
const dataEscolhida = document.querySelector('.info-da-semana')
const btnProximo = document.querySelector('.seta-direita')
const btnAnterior = document.querySelector('.seta-esquerda')
let index = 0

buscarDia()
mostraLista(index)
async function buscarDia(){
    const mostraEscala = await pegaEscala()
    const totalLista = mostraEscala.length
    btnProximo.addEventListener('click', () => {
        if (index < totalLista){
            index++
            mostraLista(index)}
    })
    btnAnterior.addEventListener('click', () => {
        if (index > 0){
            index--
            mostraLista(index)}
    })
}

console.log(index)
async function pegaEscala() {
    const conexao = await fetch('https://raw.githubusercontent.com/OperacaoN1/Escala/main/EscalaDeFuncionarios.json')
    const conexaoConvertida = await conexao.json()
    // console.log(conexaoConvertida)
    return conexaoConvertida
}
async function mostraLista(index) {
    const mostraEscala = await pegaEscala()
    const diaTrab = mostraEscala[index].Data
    const oper = mostraEscala[index].Operadores
    console.log(oper, diaTrab)
    escalaOperadores.innerHTML = ""
    try{
        for (let i = 0; i < oper.length; i++) {
            const hora = oper[i].hora
            const operador = oper[i].operador
            const novaEscala = `
            <div class="dados-operador">
                <span class="hora-escala">${hora}</span>
                <p class="operador-escala">${operador}</p>
            </div>
            `
            escalaOperadores.innerHTML += novaEscala
            console.log(hora, operador)
        }
        const componentesDiaDaSemana = diaTrab.split('/')
        const dataDefinida = new Date(componentesDiaDaSemana[2], componentesDiaDaSemana[1] -1, componentesDiaDaSemana[0])
        const diaDaSemana = dataDefinida.getDay()
        const nomesDaSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
        const nomeSemana = nomesDaSemana[diaDaSemana]

        const detalhamentoData = `
        <span class="data-da-semana">${diaTrab}</span>
        <span class="dia-da-semana">${nomeSemana}</span>
        `
        dataEscolhida.innerHTML = detalhamentoData
    }catch{console.log('Erro!!')}
}
