const getById = (id) => (document.getElementById(id));


const windowSize = () => {
    let win = window;
    let doc = document;
    let docElement = doc.documentElement;
    let body = getById("body");
    let x = win.innerWidth || docElement.clientWidth || doc.body.clientWidth;
    let y = win.innerHeight || docElement.clientHeight || doc.body.clientHeight;
    body.style.width = `${x}px`;
    body.style.height = `${y}px`;
}

const welcome_screen = getById("welcomeScreen");
const main_screen = getById("mainScreen");

const search_form = getById("form");
const hab_bg = getById("hab_bg");
const info = getById("info");
const details = getById("details");
const evolutions = getById("evolutions");
const newButton = getById("newButton");
const evoButton = getById("evoButton");
const detailsButton = getById("detailsButton");
const no_evos = getById("noButton");

let pokeFrontImg = getById("front-sprite-front");
let pokeBackImg = getById("front-sprite-back");

let pokeNameField = getById("poke-name");
let pokeIdField = getById("poke-id");

let poke_type_one = getById("poke-type-one");
let poke_type_two = getById("poke-type-two");

let height_field = getById("height");
let weight_field = getById("weight");

let habitat_field = getById("habitatField");
let habitat_text = getById("habitat");

let move_one = getById("moveOne");
let move_two = getById("moveTwo");
let move_three = getById("moveThree");
let move_four = getById("moveFour");

let evo_img_one = getById("evoImgOne");
let evo_name_one = getById("evoNameOne");
let evo_id_one = getById("evoIdOne");
let evo_img_two = getById("evoImgTwo");
let evo_name_two = getById("evoNameTwo");
let evo_id_two = getById("evoIdTwo");

let replace_text = getById("babyText");

//let proxyLink = `https://cors-anywhere.herokuapp.com/`;

window.onload = () => {
    windowSize();
    activateScreen();
};
    
const activateScreen = () => {
    const showInput = () => {
        welcome_screen.classList.replace("welcomeVisible", "welcomeHidden");
        main_screen.classList.replace("screenHidden", "screenVisible");

        pokedexActive();
    }
    setTimeout(showInput, 6000);
}

const pokedexActive = () => {
    search_form.classList.replace("formHidden", "formVisible");
    search_form.addEventListener("submit", function (e) {
        e.preventDefault();
        let nameInput = document.getElementById("searchField").value;
        let name = nameInput.toLowerCase();
        searchPokemon(name);
    });
}
const searchPokemon = (pokeName) => {
    //console.log(`${pokeName}`);

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}/`, {mode: "cors"})

        .then(response => response.json())
        .then(response => {
            viewPokemon(response);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        })
}
const searchEvoOnePokemon = (pokeName) => {
    //console.log(`${pokeName}`);

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}/`, {mode: "cors"})

        .then(response => response.json())
        .then(response => {
            viewEvoPokeOne(response);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        })
}
const searchEvoTwoPokemon = (pokeName) => {
    //console.log(`${pokeName}`);

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}/`, {mode: "cors"})

        .then(response => response.json())
        .then(response => {
            viewEvoPokeTwo(response);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        })
}

const viewPokemon = (response) => {
    hab_bg.classList.replace("bgHidden", "bgVisible")
    let imageFrontSrc = response.sprites.front_default;
    let imageBackSrc = response.sprites.back_default;
    pokeFrontImg.style.background = `url(${imageFrontSrc}) no-repeat`;
    pokeFrontImg.style.backgroundSize = "cover";
    pokeFrontImg.classList.replace("pokeImgHidden", "pokeImgVisible");
    pokeBackImg.style.background = `url(${imageBackSrc}) no-repeat`;
    pokeBackImg.style.backgroundSize = "cover";
    pokeBackImg.classList.replace("pokeImgHidden", "pokeImgVisible");

    let pokeName = response.name;
    let pokeId = response.id;
    pokeNameField.innerText = pokeName;
    pokeIdField.innerHTML = `ID : ${pokeId}`;

    let types = response.types;

    if (types.length > 1) {
        poke_type_one.innerText = types[0].type.name;
        poke_type_two.innerText = types[1].type.name;
    } else {
        poke_type_one.innerText = types[0].type.name;
        document.getElementById("typeSlash").style.display = "none";
        poke_type_two.style.display = "none";
    }
   
    let height = response.height;        
    height_field.innerText = height;
    let weight = response.weight;
    weight_field.innerText = weight;

            
    let pokeMoves = response.moves;      
    let fourMoves = [];    

    for (let i = 0; i < 4; i++) {
        min = Math.ceil(1);
        max = Math.floor(pokeMoves.length);
        let aMove = Math.floor(Math.random()*(max - min) + min);
        let arrayRandomMoves = pokeMoves.slice(aMove, aMove + 1);
        let differentMoves = arrayRandomMoves[0].move.name;
        fourMoves.push(differentMoves.toString());
    }
    move_one.innerHTML = fourMoves[0];
    move_two.innerHTML = fourMoves[1];
    move_three.innerHTML = fourMoves[2];
    move_four.innerHTML = fourMoves[3];

    search_form.classList.replace("formVisible", "formHidden");
    newButton.classList.replace("buttonHidden", "buttonVisible");
    evoButton.classList.replace("buttonHidden", "buttonVisible");
    info.classList.replace("infoHidden", "infoVisible");
    details.classList.replace("detailsHidden", "detailsVisible");

    let pokeSpecies = response.species.url;
    searchSpecies(pokeSpecies);
}

const viewHabitat = (habitat) => {
    if (habitat == 'forest') {
        hab_bg.style.background = "url(./habitats/forest3.jpg) no-repeat";
        habitat_text.innerText = "forest";
        habitat_text.style.width = "70px";
    } else if (habitat == 'grassland') {
        hab_bg.style.background = "url(./habitats/grassland2.jpg) no-repeat";
        habitat_text.innerText = "grassland";
        habitat_text.style.width = "70px";
    } else if (habitat == 'waters-edge') {
        hab_bg.style.background = "url(./habitats/water-edge2.jpg) no-repeat";
        habitat_text.innerText = "water's-edge";
        habitat_field.style.width = "170px";
        habitat_text.style.width = "100px";
    } else if (habitat == 'sea') {
        hab_bg.style.background = "url(./habitats/sea2.jpg) no-repeat";
        habitat_text.innerText = "sea";
        habitat_text.style.width = "70px";
    } else if (habitat == 'cave') {
        hab_bg.style.background = "url(./habitats/cave2.jpg) no-repeat";
        habitat_text.innerText = "cave";
        habitat_text.style.width = "70px";
    } else if (habitat == 'mountain') {
        hab_bg.style.background = "url(./habitats/mountain2.jpg) no-repeat";
        habitat_text.innerText = "mountain";
        habitat_text.style.width = "70px";
    } else if (habitat == 'rough-terrain') {
        hab_bg.style.background = "url(./habitats/desert2.jpg) no-repeat";
        habitat_text.innerText = "rough-terrain";
        habitat_field.style.width = "170px";
        habitat_text.style.width = "100px";
    } else if (habitat == 'urban') {
        hab_bg.style.background = "url(./habitats/urban2.jpg) no-repeat";
        habitat_text.innerText = "urban";
        habitat_text.style.width = "70px";
    } else if (habitat === 'no') {
        hab_bg.style.background = "url(./habitats/rare2.jpg) no-repeat";
        habitat_text.innerText = "multiple";
        habitat_field.style.width = "170px";
        habitat_text.style.width = "100px";
    } else {
        hab_bg.style.background = "url(./habitats/rare2.jpg) no-repeat";
        habitat_text.innerText = "rare pokemon";
        habitat_field.style.width = "170px";
        habitat_text.style.width = "100px";
    }
    hab_bg.style.backgroundSize = "cover";
}
   
newButton.addEventListener("click", () => {
    newButton.classList.replace("buttonVisible", "buttonHidden");
    hab_bg.classList.replace("bgVisible", "bgHidden");
    info.classList.replace("infoVisible", "infoHidden");
    details.classList.replace("detailsVisible", "detailsHidden");
    evolutions.classList.replace("evolutionsVisible", "evolutionsHidden");
    evoButton.classList.replace("buttonVisible", "buttonHidden");
    detailsButton.classList.replace("buttonVisible", "buttonHidden");
    no_evos.classList.replace("noEvosVisible", "noEvosHidden")
    //replace_text.classList.replace("textVisible", "textHidden");
    pokedexActive();
});

const fetchEvoPokes = (one, two) => {
    searchEvoOnePokemon(one);
    searchEvoTwoPokemon(two);
}

const viewEvoPokeOne = (response) => {
    let testName = pokeNameField.innerText;
    let imageFrontSrc = response.sprites.front_default;
    evo_img_one.style.background = `url(${imageFrontSrc}) no-repeat`;
    evo_img_one.style.backgroundSize = "contain";

    if (response.name != testName.toLowerCase()) {
        let pokeName = response.name;
        let pokeId = response.id;
        evo_name_one.innerText = pokeName;
        evo_name_one.style.textTransform = "capitalize";
        evo_id_one.innerHTML = `ID : ${pokeId}`;
    } else {
        evo_name_one.innerText = `He's`;
        evo_id_one.innerHTML = `the baby.`;
    }
}
const viewEvoPokeTwo = (response) => {
    let testName = pokeNameField.innerText;
    let imageFrontSrc = response.sprites.front_default;
    evo_img_two.style.background = `url(${imageFrontSrc}) no-repeat`;
    evo_img_two.style.backgroundSize = "contain";

    if (response.name != testName.toLowerCase()) {
        let pokeName = response.name;
        let pokeId = response.id;
        evo_name_two.innerText = pokeName;
        evo_name_two.style.textTransform = "capitalize";
        evo_id_two.innerHTML = `ID : ${pokeId}`;
    } else {
        evo_name_two.innerText = `He's`;
        evo_id_two.innerHTML = `the parent.`;
    }
}

const searchChain = (chain, value, childeren) => {
    fetch(`${chain}`, {mode: "cors"})
        .then(evolution => evolution.json())
        .then(evolution => {
            console.log(evolution);
            if (evolution.chain.evolves_to.length === 0) {
                evoButton.classList.replace("buttonVisible", "buttonHidden");
                no_evos.classList.replace("noEvosHidden", "noEvosVisible")
            } else {
                if (value === true) {
                    let evo_One = evolution.chain.evolves_to[0].species.name;
                    let evo_Two = evolution.chain.evolves_to[0].evolves_to[0].species.name;
                    fetchEvoPokes(evo_One, evo_Two);
                } else if (childeren != null) {
                    if (evolution.chain.evolves_to[0].evolves_to[0] === undefined) {
                        let evo_One = evolution.chain.evolves_to[0].species.name;
                        let evo_Two = evolution.chain.species.name;
                        fetchEvoPokes(evo_Two, evo_One);
                    } else {
                        let evo_One = evolution.chain.evolves_to[0].evolves_to[0].species.name;
                        let evo_Two = evolution.chain.species.name;
                        let testName = pokeNameField.innerText;
                        //console.log("test 1 : " + evo_One);
                        //console.log("test 2 : " + testName.toLowerCase());
                        if (evo_One == testName.toLowerCase()) {
                            let evo_New = evolution.chain.evolves_to[0].species.name;
                            let evo_Two = evolution.chain.species.name;
                            fetchEvoPokes(evo_Two, evo_New);
                        } else {
                            fetchEvoPokes(evo_Two, evo_One);
                        }
                    }
                } else {
                    let evo_One = evolution.chain.evolves_to[0].species.name;
                    let evo_Two = evolution.chain.species.name;
                    fetchEvoPokes(evo_Two, evo_One);
                }
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        })
}

const searchSpecies = (species) => {
    fetch(`${species}`, {mode: "cors"})
        .then(data => data.json())
        .then(data => {
            let pokeChain = data.evolution_chain.url;
            //console.log(data);
            let habitat;
            if (data.habitat != null) {
                habitat = data.habitat.name;
            } else {
                habitat = 'no';
            }
            console.log(habitat);
            viewHabitat(habitat);
            let value = data.is_baby;
            //console.log("check 1 : " + value);
            let evolves_from = data.evolves_from_species;
            console.log("check 2 : " + evolves_from);
            searchChain(pokeChain, value, evolves_from);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        })
}

evoButton.addEventListener("click", () => {
    details.classList.replace("detailsVisible", "detailsHidden");
    evolutions.classList.replace("evolutionsHidden", "evolutionsVisible");
    evoButton.classList.replace("buttonVisible", "buttonHidden");
    detailsButton.classList.replace("buttonHidden", "buttonVisible");
})
detailsButton.addEventListener("click", () => {
    details.classList.replace("detailsHidden", "detailsVisible");
    evolutions.classList.replace("evolutionsVisible", "evolutionsHidden");
    detailsButton.classList.replace("buttonVisible", "buttonHidden");
    evoButton.classList.replace("buttonHidden", "buttonVisible");
})