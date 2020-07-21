class PokemonsController < ApplicationController
    def destroy 
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.destroy! 
        render json: {}
    end 


    def create
        pokemon = Trainer.add_pokemon(pokemon_params[:trainer_id])
        #pokemon = Trainer.find(pokemon_params[:trainer_id]).add_pokemon
        render json: pokemon
    end


    private 

    def pokemon_params
        params.require(:pokemon).permit(:trainer_id)
    end

end

