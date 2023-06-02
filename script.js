//Código JS feito por Kauã Monteiro github (https://github.com/kauamntro)

const arrLancamentos = []

const ulList = document.getElementById("transactions");

const btnAdd = document.querySelector(".btn");

const balance = document.getElementById("balance");

const receitasDisplay = document.getElementById("money-plus");
const despesasDisplay = document.getElementById("money-minus");

btnAdd.addEventListener("click", function (e) {
    e.preventDefault();
    addLancamento();
});

function addLancamento () {
    const tipoInput = document.getElementById("text");
    const valorInput = document.getElementById("amount");
    const tipoLancamento = valorInput.value < 0 ? "despesa" : "receita";
    const lancamento = {nome: tipoInput.value, tipo: tipoLancamento, valor: parseFloat(valorInput.value), id: idRandom()};
    arrLancamentos.push(lancamento);
    localStorage.setItem(lancamento.id, lancamento)
    renderizar(lancamento);
    console.log(lancamento)
}

let amount = 0 ;
let amountMinus = 0;
let amountPlus = 0;

function renderizar (elemento) {
    const valueFormated = formatarReal(elemento.valor);
    const className = elemento.valor < 0 ? "minus" : "plus";

    const li = document.createElement("li");
    li.classList.add(className);
    const p = document.createElement("p");
    p.innerHTML = elemento.nome;
    const span = document.createElement("span");
    span.innerHTML = valueFormated;
    const button = document.createElement("button");
    button.classList.add("delete-btn")
    button.innerHTML = "X"

    localStorage.setItem(elemento.id, JSON.stringify(elemento));

    if(className === "minus") {
        amountMinus += elemento.valor;
        despesasDisplay.innerHTML = formatarReal(amountMinus);
    }

    if(className === "plus") {
        amountPlus += elemento.valor;
        receitasDisplay.innerHTML = formatarReal(amountPlus)
    }

    button.addEventListener("click", function (e) {
        e.preventDefault();

        const index = arrLancamentos.indexOf(elemento);
        arrLancamentos.splice(index, 1);
        ulList.removeChild(li);
        amount -= elemento.valor;
        balance.textContent = formatarReal(amount);
        localStorage.removeItem(elemento.id)

        if(className === "minus") {
            amountMinus -= elemento.valor;
            despesasDisplay.innerHTML = formatarReal(amountMinus);
        }
    
        if(className === "plus") {
            amountPlus -= elemento.valor;
            receitasDisplay.innerHTML = formatarReal(amountPlus)
        }
    })

    amount += elemento.valor
    balance.innerHTML = formatarReal(amount);

    li.appendChild(p);
    li.appendChild(span);
    li.appendChild(button);
    ulList.appendChild(li);
}

function formatarReal (value) {
    return Intl.NumberFormat("pt-br", {currency: "BRL", style: "currency"}).format(value);
}

arrLancamentos.forEach(renderizar)

function idRandom () {
    const id = "appFin" + Math.floor(Math.random() * 10000);
    return id;
}

function getLocalLancamentos () {
    const lancamentos = [];
    for (i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key.startsWith("appFin")){
        const elemento = JSON.parse(localStorage.getItem(key));
        renderizar(elemento);
        }
    }
}

getLocalLancamentos();