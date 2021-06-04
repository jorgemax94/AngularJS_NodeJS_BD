const sequence = {
    _id: 2,
    get id() {
        return this._id++
    }
}

const mov = {
    _id: 1,
    get id() {
        return this._id++
    }
}

const tarefasPendentes = []

const TarefasConcluidas = []

function salvarTarefaConcluida(tarefa) {
    tarefa.qtdMov = tarefa.qtdMov + 1
    TarefasConcluidas[tarefa.id] = tarefa
    return tarefa
}

function getTarefasConcluidas() {
    return Object.values(TarefasConcluidas)
}

function excluirTarefaConcluida(tarefa) {
    const tarefaRes = TarefasConcluidas[tarefa.id]
    delete TarefasConcluidas[tarefa.id]
    return tarefaRes
}


function salvarTarefasPendentes(tarefa) {
    if (!tarefa.id) tarefa.id = sequence.id
    tarefasPendentes[tarefa.id] = tarefa
    return tarefa
}

function getTarefaPendente(id) {
    return tarefasPendentes[id] || {}
}

function getTarefasPendentes() {
    return Object.values(tarefasPendentes)
}

function excluirTarefaPendente(id) {
    const tarefa = tarefasPendentes[id]
    delete tarefasPendentes[id]
    return tarefa
}

function salvarTarefasRandom(data){
    const dataRandom = data.data;
    dataRandom.forEach(function(element, index){
        const tarefasRandom = {"title":element.text ,
                                    "name":"Eu",
                                    "email":"eu@me.com",
                                    "qtdMov":0,
                                    "id":sequence.id
                                };
        tarefasPendentes[tarefasRandom.id] = tarefasRandom
    })
    return dataRandom.length
}

module.exports = {
    salvarTarefasPendentes,
    getTarefaPendente,
    getTarefasPendentes,
    excluirTarefaPendente,
    salvarTarefaConcluida,
    getTarefasConcluidas,
    excluirTarefaConcluida,
    salvarTarefasRandom
}