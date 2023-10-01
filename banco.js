class Conta {
    constructor(agencia, conta, saldo) {
        Object.assign(this, {agencia , saldo, conta});
    }
}
Conta.prototype.sacar = function(valor) {
    if(typeof valor !== 'number') return console.log('coloque apenas Numeros')
    if(valor > this.saldo) {
        console.log('saldo induficiente')
        this.valorSaldo();
        return;
    };
    this.saldo -= valor
    this.valorSaldo()
}
Conta.prototype.depositar = function(valor) {
    if(typeof valor !== 'number') return console.log('coloque apenas Numeros')
    this.saldo = this.saldo + valor;
    this.valorSaldo();
    return;
}
Conta.prototype.valorSaldo = function() {
    console.log(`agencia: ${this.agencia}, Conta: ${this.conta}, saldo:${this.saldo}`)
};

const conta = new Conta(2345, 'corrente', 4000);

class ContaCorrente extends Conta {
    constructor(agencia, conta, saldo, limite){
        super(agencia, conta, saldo)
        this.limite = limite;
    }
}

ContaCorrente.prototype = Object.create(Conta.prototype)
ContaCorrente.prototype.constructor = ContaCorrente;

ContaCorrente.prototype.sacar = function (valor) {
    if(valor > (this.saldo + this.limite)) {
        console.log('valor insuficiente')
        this.valorSaldo();
        return
    };
    this.saldo -= valor;
    this.valorSaldo();
}

class ContaPoupança extends Conta {
    constructor(agencia, conta, saldo){
        super(agencia, conta, saldo)
    }
}
ContaPoupança.prototype = Object.create(Conta.prototype)
ContaPoupança.prototype.constructor = ContaPoupança;

ContaPoupança.prototype.sacar = function (valor) {
    if(valor > (this.saldo)) {
        console.log('valor insuficiente')
        this.valorSaldo();
        return
    };
    this.saldo -= valor;    
    this.valorSaldo();
}

const conta1 = new ContaCorrente(23,2606, 0, 7000)
conta1.sacar(9000)  

const cp = new ContaPoupança(33, 2606, 0)
cp.sacar(100)