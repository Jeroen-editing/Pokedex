document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    pokeName = document.querySelector("input").value;
    Powkemon();

});

function searchPokemon() {

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`,
        {mode: "cors"}
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            imageholder = document.querySelector("#poke-sprite");
            imageSRC = response.sprites.front_default;
            imageholder.setAttribute('src', imageSRC);


            document.querySelector("#poke-name").innerHTML = response.name;
            document.querySelector("#poke-id").innerHTML = response.id;
            pokeSpecies = response.species.url;

            let pokeMoves = response.moves;
            let fourMoves = [];
            console.log(pokeMoves);

            for (let i = 0; i < 4; i++) {
                min = Math.ceil(1);
                max = Math.floor(pokeMoves.length);
                let aMove = Math.floor(Math.random()*(max - min) + min);
                let arrayRandomMoves = pokeMoves.slice(aMove, aMove + 1);
                let differentMoves = arrayRandomMoves[0].move.name;
                fourMoves.push(differentMoves.toString());
                console.log(fourMoves);
            }

            document.getElementById("moveOne").innerHTML = fourMoves[0];
            document.getElementById("moveTwo").innerHTML = fourMoves[1];
            document.getElementById("moveThree").innerHTML = fourMoves[2];
            document.getElementById("moveFour").innerHTML = fourMoves[3];

            // fetch evolution chain

            fetch( `${pokeSpecies}`,
                {mode: "cors"}
            )
                .then(function (data) {
                    return data.json();
                })
                .then(function (data) {

                 pokeChain = data.evolution_chain.url


                })
                .catch(function (err) {
                    console.log(err);
                });


            fetch(`${pokeChain}`,
                {mode: "cors"}
            )
                .then(function (resp) {
                    return resp.json();
                })
                .then(function (resp) {


                })
                .catch(function (err) {
                    console.log(err);
                });


        })
}

function Powkemon() {
    searchPokemon();
}