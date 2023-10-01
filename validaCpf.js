class ValidaCpf {
    constructor(cpfEnviado){
        this.cpfEnviado = cpfEnviado;
        Object.defineProperty(this, 'cpfLimpo', {
            enumerable: true,
            configurable: false,
            get: function(){
                return cpfEnviado.replace(/\D+/g, "");
            }
        });
    }
}
ValidaCpf.prototype.valida = function () {
    if(typeof this.cpfLimpo === 'undefined') return false;
    if(this.cpfLimpo.length !== 11) return false;
    if(this.isSequencia()) return false;
    
    const cpfParcial = this.cpfLimpo.slice(0, -2);
    const digito1 = this.criarDigito(cpfParcial);
    const digito2 = this.criarDigito(cpfParcial + digito1);
    
    const novoCpf = cpfParcial + digito1 + digito2
    return novoCpf ===  this.cpfLimpo;
}
ValidaCpf.prototype.criarDigito = function(cpfParcial) {
    const cpfArray = Array.from(cpfParcial);
    
    let regressivo = cpfArray.length + 1;

    const total = cpfArray.reduce((acumulador, valor) => {
        acumulador += (regressivo * Number(valor));
        regressivo--;
        return acumulador;
    }, 0);

    const digito = 11 - (total % 11);
    return digito > 9 ? '0' : String(digito);
};

ValidaCpf.prototype.isSequencia = function() {
    const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length)
    return sequencia === this.cpfLimpo;
}

const cpf = new ValidaCpf('705.484.450-52');

console.log(cpf)

if(cpf.valida()) {
    console.log('Cpf Valido')
} else {
    console.log('Cpf Invalido')
}