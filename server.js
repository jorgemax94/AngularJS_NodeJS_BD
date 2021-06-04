const express = require('express')
const morgan = require('morgan')
var cors = require('cors')
const api = require('./backend/api/apiExterna')
const app = express()
const livereload = require('livereload')
const server = livereload.createServer()
const bancoDeDados = require('./backend/BD/bancoDeDados')
const bodyParser = require('body-parser')
app.use(cors())
server.watch('.')

app.use(morgan('combined'))
app.use(require('connect-livereload')({
  port: 35729
}))

app.use(express.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(require('./backend/controllers/MyMainController'))


app.get('/dogFact', async (req, res) => {
    try {
        const {data} = await api.api.get();
        res.send(data);
    } catch (error) {
        res.send({error: error.message});
    }
})

app.post('/emailVerify', async (req, res) =>{
    try {
        const {data} = await api.apiEmail.get(req.body.email);
        res.send(data);
    } catch (error) {
        res.send({error: error.message});
    }
})

app.get('/tarefasConcluidas', (req, res) => {
    res.send(
        bancoDeDados.getTarefasConcluidas()
    )
})

app.get('/tarefasIncluidas', (req, res) => {
    res.send(
        bancoDeDados.getTarefasPendentes()
    )
})

app.post('/tarefas', (req, res, next) => {
    const tarefa = bancoDeDados.excluirTarefaPendente(
        req.body.id)
    res.send(tarefa)
})

app.post('/incluirTarefasRandom', (req, res, next) => {
    try {
        const tarefas = bancoDeDados.salvarTarefasRandom(req.body)
        res.send("Quantidade de Registros incluídos: " + tarefas) // JSON
    } catch (error) {
        res.send({error: error.message});
    }
})

app.post('/salvarTarefaConcluida', (req, res, next) => {
    const produto = bancoDeDados.salvarTarefaConcluida({
        id: req.body.id,
        title: req.body.title,
        name: req.body.name,
        email: req.body.email,
        qtdMov: req.body.qtdMov
    })
    res.send(produto) // JSON
})

app.post('/excluirTarefaConcluida', (req, res, next) => {
    const tarefa = bancoDeDados.excluirTarefaConcluida({
        id: req.body.id,
        title: req.body.title,
        name: req.body.name,
        email: req.body.email,
        qtdMov: req.body.qtdMov
    })
    res.send(tarefa)
})

app.post('/tarefasPendentes', (req, res) => {
    const produto = bancoDeDados.salvarTarefasPendentes({
        title: req.body.title,
        name: req.body.name,
        email: req.body.email,
        qtdMov: req.body.qtdMov
    });
    res.send(produto);
})

app.listen(3000, function () {
  console.log('listening on port 3000')
})
