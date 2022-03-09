var res = document.getElementById("res");
var restxt = document.getElementById("restxt");

const OPERADORES = ["+", "-", "*", "/"];
const NUMEROS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]




function igual() {
    if ((!OPERADORES.includes(res.innerHTML[res.innerHTML.length-1])) && res.innerHTML[res.innerHTML.length-1]!=undefined && res.innerHTML[res.innerHTML.length-1] != ".") {
        res.innerHTML = eval(res.innerHTML);
        restxt.innerHTML = "Resultado:";

        if (res.innerHTML.length > 12) {
            res.innerHTML = res.innerHTML.slice(0, 8)
        }
    }
}



function adiciona_numero(num) {
    if (res.innerHTML.length <= 12) {
        res.innerHTML += num
        restxt.innerHTML = "Conta:";
    }
}




function adiciona_operador(operador) {
    if (!res.innerHTML.length <= 12) {
        if ((!OPERADORES.includes(res.innerHTML[res.innerHTML.length-1])) && res.innerHTML[res.innerHTML.length-1]!=undefined && res.innerHTML[res.innerHTML.length-1]!=".") {
            res.innerHTML += operador;
        }
    }
}


function adiciona_ponto() {
    let pode_adicionar = true;
    OPERADORES.forEach((operador) => {
        let ultimo_operador = res.innerHTML.toString().lastIndexOf(operador);
        let ultimo_ponto = res.innerHTML.toString().lastIndexOf(".");

        if (ultimo_operador > -1 && ultimo_ponto > -1) {
            if (ultimo_operador < ultimo_ponto) {
                pode_adicionar = false;
            }
        } else if (ultimo_operador == -1) {
            if (ultimo_ponto > -1) {
                pode_adicionar = false;
            }
        } 
    })
    if (res.innerHTML.length < 12) {
        if (NUMEROS.includes(res.innerHTML[res.innerHTML.length-1]) && pode_adicionar) {
        res.innerHTML += "."
        }
    }
    
}





window.addEventListener("load", (e) => {
    NUMEROS.forEach((num) => {
        let bt = document.getElementById(`n${num}`)
        bt.addEventListener("click", (event) => {
           adiciona_numero(num);
        })
    })

    OPERADORES.forEach((operador) => {
        let bt = document.getElementById(`bt${operador}`);
        bt.addEventListener("click", (event) => {
            adiciona_operador(operador);
        })
    })

    let ponto = document.getElementById("btponto");
    ponto.addEventListener("click", (event) => {
        adiciona_ponto();
    })

    let btigual = document.getElementById("btigual");
    btigual.addEventListener("click", (event) => {
        igual();
    })
}) 



window.addEventListener("keydown", (event) => {
    if (NUMEROS.includes(event.key.toString())) {
        adiciona_numero(event.key.toString());
    } else if (OPERADORES.includes(event.key.toString())) {
        adiciona_operador(event.key.toString());
    } else if (event.key.toString() == "Enter") {
        igual();
    } else if (event.key.toString() == "." || event.key.toString() == ",") {
        adiciona_ponto();
    }
})

