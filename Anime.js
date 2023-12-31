const name = document.querySelector('#name')
const genero = document.querySelector('#genero')
const url = document.querySelector('#url')
const button = document.querySelector('#add')
const anime = document.querySelector('#anime')
const filter = document.querySelector("#filter")

const a_animes = [];

class Midia {
    constructor(nome,genero,url){
        Object.assign(this, {nome, genero, url})
    }
}

button.addEventListener('click', (e) => {
    e.preventDefault();
    const anime = new Midia(name.value, genero.value, url.value);
    a_animes.push(anime)
    exibicaoAnimes();
});

const exibicaoAnimes = () => {
    anime.innerHTML = "";
    a_animes.forEach((item, index) => {
        const div = document.createElement("div");
        div.setAttribute("class", "anime");
        
        const img = document.createElement("img");
        img.setAttribute("src", `${item.url}`);
        img.setAttribute("alt", `${item.name}`);
        div.appendChild(img);

        const info = document.createElement("p");
        info.innerHTML = `Nome: ${item.nome}, Gênero: ${item.genero} 
        <button type="submit" class="remove-btn" data-index="${index}">Remover</button>`;

        div.appendChild(info);

        anime.appendChild(div);
    });
    removeAnime();
};

const removeAnime = () => {
    const remove = document.querySelectorAll(".remove-btn")
    remove.forEach(remove => {
        remove.addEventListener("click", evt => {
            const index = remove.dataset.index 
            a_animes.splice(index , 1)
            exibicaoAnimes();
        })
    })
}

filter.addEventListener("click", (evt) => {

    const searchTerm = filter.value.trim().toLowerCase();

    const filteredAnimes = a_animes.filter(anime => {
        return anime.nome.toLowerCase().includes(searchTerm);
    });

    anime.innerHTML = "";

    if (filteredAnimes.length > 0) {
        filteredAnimes.forEach((item, index) => {
            const div = document.createElement("div");
            div.setAttribute("class", "anime");

            const img = document.createElement("img");
            img.setAttribute("src", `${item.url}`);
            img.setAttribute("alt", `${item.nome}`);
            div.appendChild(img);

            const info = document.createElement("p");
            info.innerHTML = `Nome: ${item.nome}, Gênero: ${item.genero} 
            <button type="submit" class="remove-btn" data-index="${index}">Remover</button>`;

            div.appendChild(info);

            anime.appendChild(div);
        });
        removeAnime();
    } else {
        alert('Nenhum anime encontrado com esse nome');
    }
});

console.log(a_animes)