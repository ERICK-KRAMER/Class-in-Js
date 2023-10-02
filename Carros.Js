const namesCar = document.querySelector('#name')
const doors = document.querySelector('#doors')
const shild = document.querySelector('#shild')
const munition = document.querySelector('#munition')
const button = document.querySelector('#btn')
const normal = document.querySelector('#Normal')
const militar = document.querySelector('#Militar')
const carro = document.querySelector('#carro')

const a_carros = []

militar.addEventListener("click", (evt) => {
    namesCar.value = ''
    doors.value = ''
    shild.removeAttribute("disabled")
    munition.removeAttribute("disabled")
})
normal.addEventListener("click", (evt) => {
    namesCar.value = ''
    doors.value = ''
    shild.setAttribute("disabled","disabled")
    shild.value = '0'
    munition.setAttribute("disabled","disabled")
    munition.value = '0'
})

doors.addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, "");
});

shild.addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, "");
});

munition.addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, "");
});

button.addEventListener('click', evt => {
    evt.preventDefault()
    if(militar.checked) {
        const carro = new Militar(namesCar.value, doors.value, shild.value, munition.value)
        a_carros.push(carro)
    }
    if(normal.checked) {
        const carro = new Normal(namesCar.value, doors.value);
        a_carros.push(carro)
    }
    exibicaoCarros();
})

const exibicaoCarros = () => {
    carro.innerHTML = '';
    a_carros.forEach((item, index) => {
        const div = document.createElement('div');
        div.setAttribute('class', 'carro');

        if (item instanceof Normal) {
            div.innerHTML = `Nome: ${item.name} Portas: ${item.doors}
            <button type="submit" class="remove-btn" data-index="${index}">Remover</button>`;
        } else if (item instanceof Militar) {
            div.innerHTML = `Nome: ${item.name} Portas: ${item.doors} 
            Blindagem: ${item.shild} Munição: ${item.munition}
            <button type="submit" class="remove-btn" data-index="${index}">Remover</button>`;
        }
        carro.appendChild(div);
    });
    removeCarros();
};

const removeCarros = () => {
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener("click", (evt) => {
            const index = button.dataset.index; 
            console.log("removeu", index);
            a_carros.splice(index, 1); 
            exibicaoCarros();
        });
    });
};



class Carros {
    constructor(name, doors){
        Object.assign(this, {name, doors})
    }
}
class Normal extends Carros {
    constructor(name, doors){
        super(name,doors)
    }
}
class Militar extends Carros{
    constructor(name, doors, shild, munition){
        super(name,doors);
        Object.assign(this, {shild, munition})
    }
}
const cMilitar = new Militar()
const cNormal = new Normal()