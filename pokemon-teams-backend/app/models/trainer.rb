class Trainer < ApplicationRecord
    has_many :pokemons

    def self.add_pokemon(trainer_id)
        trainer = self.find(trainer_id)
        if trainer.pokemons.length < 6
            Pokemon.create(
                trainer: trainer,
                nickname: Faker::Name.first_name,
                species: Faker::Games::Pokemon.name 
            ) 
        else  
            {error: "Trainer's team is full!"}
        end
    end 
end
