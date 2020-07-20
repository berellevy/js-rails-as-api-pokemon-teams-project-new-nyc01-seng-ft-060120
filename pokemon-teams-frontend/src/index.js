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
            addPokemonLisTo(trainerDiv)
        })
    }

    const addPokemonLisTo = (trainerDiv) => {
        // iterate th
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

    initialLoadTrainersNStuff()

})