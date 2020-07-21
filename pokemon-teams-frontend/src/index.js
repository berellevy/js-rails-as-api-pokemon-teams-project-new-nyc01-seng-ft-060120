document.addEventListener('DOMContentLoaded', (e) => {
    const BASE_URL = "http://localhost:3000"
    const TRAINERS_URL = `${BASE_URL}/trainers`
    const POKEMONS_URL = `${BASE_URL}/pokemons`
    const initialLoadTrainersNStuff = () => {
        fetch(`${TRAINERS_URL}`)
            .then(response => response.json())
            .then(data => {
                loadData(data)
            })
            .catch(error => console.log(error))
    }

    const loadData = (trainersObject) => {
        trainersObject.forEach(trainer => {
            const trainerDiv = createCard(trainer)
            const main = document.querySelector('main')
            main.append(trainerDiv)
            addPokemonLisTo(trainer, trainerDiv)
        })
    }

    const addPokemonLisTo = (trainer, trainerDiv) => {
        trainer.pokemons.forEach(pokemon => {
            renderPokemon(pokemon, trainerDiv)
        })
    }

    const renderPokemon = (pokemon, trainerDiv) => {
        const pokemonLi = document.createElement("li")
        pokemonLi.textContent = `${pokemon.nickname} (${pokemon.species})`
        const releaseButton = document.createElement('button')
        releaseButton.className = "release"
        releaseButton.dataset.pokemonId = `${pokemon.id}`
        releaseButton.textContent = "Release"
        pokemonLi.append(releaseButton)
        trainerDiv.getElementsByTagName("ul")[0].append(pokemonLi)
    }


    const createCard = (trainer) => {
        const trainerDivCard = document.createElement('div')
        trainerDivCard.classList.add('card')
        trainerDivCard.dataset.id = `${trainer.id}`
        const trainerNameP = document.createElement('p')
        trainerNameP.textContent = `${trainer.name}`
        trainerDivCard.append(trainerNameP)
        const addPokemonButton = document.createElement('button')
        addPokemonButton.dataset.trainerId = `${trainer.id}`
        addPokemonButton.textContent = "Add Pokemon"
        trainerDivCard.append(addPokemonButton)
        trainerDivCard.append(document.createElement('ul'))
        return trainerDivCard
    }

    const releasePokemon = (pokemon) => {
        document.addEventListener("click", (e) => {
            if (e.target.className === "release") {
                deleteClickedPokemon(e.target);
            }
        })
    }

    const deleteClickedPokemon = (pokemonLi) => {
        const pokemonId = pokemonLi.dataset.pokemonId
        fetch(`${POKEMONS_URL}/${pokemonId}`, {
                method: "DELETE"
            })
            .then(response => response.json())
            .then(data => {
                pokemonLi.parentElement.remove();
            })
    }
    const addPokemon = () => {
        document.addEventListener("click", (e) => {
            if (e.target.dataset.trainerId) {
                const trainerId = e.target.dataset.trainerId
                getANewPokemon(trainerId)
            }

        })
    }

    const getANewPokemon = (id) => {
        fetch(`${POKEMONS_URL}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify({ trainer_id: id })
            })
            .then(response => response.json())
            .then(pokemon => {
                if (pokemon.nickname) {
                    const trainerDiv = document.querySelector(`div.card[data-id="${pokemon.trainer_id}"]`)
                    renderPokemon(pokemon, trainerDiv)
                } else {
                window.alert(pokemon.error)
                }
            })
    }

    initialLoadTrainersNStuff()
    releasePokemon()
    addPokemon()



    //add a listener for button clicks 
    //if button has data-id field, delete request 

})