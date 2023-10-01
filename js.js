class Produto {
    constructor(nome, preço){
        Object.assign(this, {nome, preço});
    }
}

Produto.prototype.aumento = function(valor) { 
    this.preço = this.preço + (this.preço * (valor/100))
}
Produto.prototype.desconto = function(valor) { 
    this.preço = this.preço - (this.preço *(valor/100))
}

class Camisa extends Produto{
    constructor(nome, preço, cor){
        super(nome, preço);
        this.cor = cor;
        Object.defineProperty(this, 'estoque',{
            configurable: true,
            enumerable: true,
            writable: true,
            get function () {
                return ;
            },
            set function (valor) {
                if(typeof valor !== 'number') return;
                estoque = valor;
            }
        })
        this.estoque = 0
    }
} 
class Caneca extends Produto {
    constructor(nome, preço, material){
        super(nome, preço);
        this.material = material;
    }
}

const caneca =[
    new Caneca('copo', 6, 'plastico'),
    new Caneca('xicara', 10,'porcelana')
]
const camisa = [
    new Camisa('regata', 25, 'preta'),
    new Camisa('casaco', 80, 'bege')
]

caneca.push(new Caneca('taça', 15, 'cristal'));
camisa.push(new Camisa('social', 100, 'azul marinho'));

camisa[1].desconto(10);
caneca[1].aumento(5);
camisa[2].desconto(15);

camisa.find((item) => {
    if(item.nome === 'regata'){
        item.estoque = 10
    }
})

console.log(camisa)
console.log(caneca)