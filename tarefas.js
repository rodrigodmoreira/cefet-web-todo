// tarefa 0
class Tarefa {
    constructor(nome, categoria, realizada) {
        this.nome = nome
        this.categoria = categoria
        this.realizada = realizada
    }
}

// tarefa 1 / 3 / 5
class ListaTarefas {
    #lista
    #listaFiltrada
    #listaEl
    #filtro

    static FILTROS = ['lazer', 'compras', 'estudos']
    constructor(tarefasIniciais = [], listEl) {
        this.#lista = [].concat(tarefasIniciais)
        this.#listaFiltrada = this.#lista
        this.#listaEl = listEl
        this.#filtro = null

        this.#atualizarDom()
    }

    inserirTarefa(tarefa) {
        if (tarefa instanceof Tarefa)
            this.#lista.push(tarefa)
        this.#atualizarDom()
    }

    // tarefa 3
    alterarFiltro(f) {
        if (ListaTarefas.FILTROS.includes(f)) this.#filtro = f
        else this.#filtro = null
        this.#atualizarDom()
    }

    // tarefa 5
    atualizarStatusTarefa(index) {
        this.#lista[index].realizada = !this.#lista[index].realizada
        this.#atualizarDom()
    }

    #atualizarDom() {
        this.#atualizarTarefasFiltradas()

        while(this.#listaEl.firstChild)
            this.#listaEl.removeChild(this.#listaEl.firstChild)

        for(let [index, tarefa] of this.#listaFiltrada.entries()) {
            const tEl = this.#criarElementoTarefa(tarefa)

            tEl.value = index
            tEl.addEventListener('click', e => this.atualizarStatusTarefa(e.target.value))

            this.#listaEl.appendChild(tEl)
        }
    }

    #atualizarTarefasFiltradas() {
        this.#listaFiltrada = this.#lista.filter(t => this.#filtro ? t.categoria === this.#filtro : true)
    }

    #criarElementoTarefa(t) {
        const tEl = document.createElement('li')
        
        tEl.classList.add('item-tarefa')
        tEl.classList.add(`categoria-${t.categoria}`)
        if (t.realizada) tEl.classList.add('marcado')
        

        tEl.appendChild(document.createTextNode(t.nome))
        
        return tEl
    }
}


const listaTarefas = new ListaTarefas([
        new Tarefa('Comprar leite', 'compras', false),
        new Tarefa('Escutar chimbinha', 'lazer', true)
    ],
    document.querySelector('#lista-tarefas')
)

// tarefa 2
const nomeNovaTarefaEl = document.querySelector('#nova-tarefa-nome')
const categoriaNovaTarefaEl = document.querySelector('#nova-tarefa-categoria')
const botaoInserirTarefaEl = document.querySelector('#incluir-nova-tarefa')
function criarNovaTarefa() {
    listaTarefas.inserirTarefa(new Tarefa(
        nomeNovaTarefaEl.value,
        categoriaNovaTarefaEl.value,
        false))
    nomeNovaTarefaEl.value = ''
    nomeNovaTarefaEl.focus()
}
botaoInserirTarefaEl.addEventListener('click', criarNovaTarefa)

// tarefa 3
const categoriaFiltroEl = document.querySelector('#filtro-de-categoria')
categoriaFiltroEl.addEventListener('change', e => listaTarefas.alterarFiltro(e.target.value))

// tarefa 4
nomeNovaTarefaEl.addEventListener('keyup', e => e.key === 'Enter' && criarNovaTarefa())
