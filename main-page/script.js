class Adicionar{
    constructor(){
        this.type = true

        this.entradas = 0
        this.saidas = 0
        this.totalv = 0
    }
    change(tipo){
        if(tipo == 'e'){
            this.type = true
        }else{
            this.type = false
        }
    }
    verify(){
        let desc_input = document.getElementById('desc')
        let valor_input = document.getElementById('valor')

        let verify_desc = desc_input.value.replace(/\s/g, '')
        let verify_valor = valor_input.value.replace(/\s/g, '')
        if(verify_desc.length == 0 || verify_valor.length == 0){
            return
        }
        this.adicionar(desc_input.value, valor_input.value, this.type)
        if(this.type){
            this.entrada(valor_input.value)
        }else{
            this.saida(valor_input.value)
        }
        this.total()
        desc_input.value = ''
        valor_input.value = ''
    }
    adicionar(desc, valor, tipo){
        let container = document.getElementById('mainContainer')

        let finan = document.createElement('div')
        finan.id = 'finan'
        container.appendChild(finan)

        let descp = document.createElement('p')
        descp.innerHTML = desc
        finan.appendChild(descp)

        let valorp = document.createElement('p')
        const formatoMonetario = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        valorp.innerHTML = `R$ ${formatoMonetario}`
        finan.appendChild(valorp)

        let tipop = document.createElement('p')
        if(tipo){
            tipop.innerHTML = 'Entrada'
        }else{
            tipop.innerHTML = 'Saída'
        }
        finan.appendChild(tipop)

        let datap = document.createElement('p')
        let dataAtual = new Date()
        let dataFormatada = dataAtual.toLocaleDateString()
        datap.innerHTML = dataFormatada
        finan.appendChild(datap)

        let i = document.createElement('i')
        i.classList.add('fa-solid', 'fa-trash')
        let all = {
            desc: desc,
            valor:valor,
            tipo: tipo,
            data: dataFormatada
        }
        i.addEventListener('click', () => {
            let container = document.getElementById('mainContainer')
            let divToDelete = i.parentElement
            container.removeChild(divToDelete)

            if(tipop.innerHTML == 'Entrada'){
                this.entradas -= formatoMonetario
                this.total()
                this.entrada(this.entradas)
            }else{
                this.saidas -= formatoMonetario
                this.total()
                this.saida(this.saidas)
            }
        });
        finan.appendChild(i)
    }
    entrada(valor){
        let entradah3 = document.getElementById("entrada")
        this.entradas += parseFloat(valor)
        entradah3.textContent = `R$ ${this.entradas}`
    }
    
    saida(valor){
        let saidah3 = document.getElementById("saida")
        this.saidas += parseFloat(valor)
        saidah3.textContent = `R$ ${this.saidas}`
    }
    total(){
        this.totalv = this.entradas - this.saidas
        let i = document.getElementById('carteira')
        if(this.totalv < 0){
            i.style.backgroundColor = 'red'
        }else if(this.totalv > 0){
            i.style.backgroundColor = 'lawngreen'
        }else{
            i.style.backgroundColor = '#ccc'
        }
        let totalh3 = document.getElementById("total")
        totalh3.textContent = `R$ ${this.totalv}`
    }
}
const adicionar = new Adicionar()