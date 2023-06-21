const listaDeOperadores = document.getElementById('lista-dados')
const listaData = document.querySelector('.info-data-cadastro')
const btnEnviar = document.getElementById('enviar-info')
const btnLimpar = document.getElementById('btn-limpar')
const btnEnviarJson = document.getElementById('btn-download')


btnEnviar.addEventListener("click", () => {
    adicionaOperador()
})
btnLimpar.addEventListener("click", () => {
    limparLista()
})
btnEnviarJson.addEventListener("click", () => {
    enviarEscala3()
})


function adicionaOperador() {
    const horaEscala = document.getElementById('data-trabalho')
    const operadorEscala = document.getElementById('nome-operador')
    const novoOperador = `
        <div class="dados-operador">
            <span class="hora-escala">${horaEscala.value}</span>
            <p class="operador-escala">${operadorEscala.value}</p>
        </div>
    `
    listaDeOperadores.innerHTML += novoOperador
    horaEscala.value = ''
    operadorEscala.value = ''
}

function limparLista() {
    listaDeOperadores.innerHTML = ''
}

async function liOperadores() {
    const conexao = await fetch('https://raw.githubusercontent.com/OperacaoN1/Escala/main/Operadores.json')
    const conexaoConvertida = await conexao.json()
    return conexaoConvertida
}

async function mostraLista() {
    const listaSuspensa = document.getElementById('nome-operador')
    try {
        const listaOpera = await liOperadores()
        listaOpera.forEach(nome => {
            const tagOption = document.createElement('option')
            tagOption.value = nome
            tagOption.text = nome
            listaSuspensa.appendChild(tagOption)
        })
    }catch{}
}
mostraLista()

function enviarEscala2() {
    const elementosDatasOperedores = listaDeOperadores.querySelectorAll(".dados-operador")
    const operadoresJson = []
    elementosDatasOperedores.forEach((elementoDataOperedor) => {
        const hora = elementoDataOperedor.querySelector(".hora-escala")
        const nomeOperador = elementoDataOperedor.querySelector(".operador-escala")
        const registro = {
            hora: hora.textContent,
            operador: nomeOperador.textContent.trim(),
        }
        operadoresJson.push(registro)
    })
    const diaSemana = capturarData()
    const jsonFinal = {
        Data: diaSemana,
        Operadores: operadoresJson,
    }
    console.log(jsonFinal)
    const jsonBlob = new Blob([JSON.stringify(jsonFinal)], { type: 'application/json' })

    // Create a download link for the Blob object
    const downloadLink = document.createElement('a')
    downloadLink.href = URL.createObjectURL(jsonBlob)
    downloadLink.download = 'escala.json'
    downloadLink.click()

    // Clean up the URL object after the download link has been clicked
    URL.revokeObjectURL(downloadLink.href)
}

function capturarData() {
    const inputData = document.querySelector('.input-da-semana')
    const inputDataValor = inputData.value
    const separaData = inputDataValor.split('-')
    const dia = separaData[2]
    const mes = separaData[1]
    const ano = separaData[0]
    const transformaData = `${dia}/${mes}/${ano}`
    inputData.value = transformaData
    return transformaData
}

function enviarEscala3() {
    const elementosDatasOperadores = listaDeOperadores.querySelectorAll(".dados-operador");
    const operadoresJson = [];
    elementosDatasOperadores.forEach((elementoDataOperador) => {
        const hora = elementoDataOperador.querySelector(".hora-escala");
        const nomeOperador = elementoDataOperador.querySelector(".operador-escala");
        const registro = {
            hora: hora.textContent,
            operador: nomeOperador.textContent.trim(),
        };
        operadoresJson.push(registro);
    });
    const diaSemana = capturarData();
    const jsonFinal = {
        Data: diaSemana,
        Operadores: operadoresJson,
    };

    const url = 'https://isailton.pythonanywhere.com/receber-dados'

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonFinal)
    })
        .then(response => {
            if (response.ok) {
                // Dados enviados com sucesso
                console.log('Dados enviados com sucesso!');
            } else {
                // Trate possíveis erros
                console.log('Erro ao enviar dados.');
            }
        })
        .catch(error => {
            // Trate possíveis erros
            console.error('Erro:', error);
        });
}
