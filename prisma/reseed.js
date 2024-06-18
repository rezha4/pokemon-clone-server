import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

async function main() {
  let offset = 0; // Start from the first Pokémon
  let hasNextBatch = true;

  while (hasNextBatch) {
    try {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=100`,
      );
      const { results, next } = data;

      for (const pokemon of results) {
        try {
          console.log(pokemon)
          const existingPokemon = await prisma.pokemon.findFirst({
            where: {
              name: pokemon.name,
            },
          });

          if (!existingPokemon) {
            const { data: pokemonData } = await axios.get(pokemon.url);
            await prisma.pokemon.create({
              data: {
                id: pokemonData.id,
                name: pokemonData.name,
                base_experience: pokemonData.base_experience,
                height: pokemonData.height,
                weight: pokemonData.weight,
                is_default: pokemonData.is_default,
                order: pokemonData.order,
                abilities: pokemonData.abilities,
                forms: pokemonData.forms,
                game_indices: pokemonData.game_indices,
                held_items: pokemonData.held_items,
                location_area_encounters: pokemonData.location_area_encounters,
                moves: pokemonData.moves,
                species: pokemonData.species,
                sprites: pokemonData.sprites,
                stats: pokemonData.stats,
                types: pokemonData.types,
              },
            });
            console.log(`Successfully created ${pokemonData.name}`);
          } else {
            console.log(
              `Pokemon ${pokemon.name} already exists in the database. Skipping.`,
            );
          }
        } catch (pokemonError) {
          console.error(
            `Failed to process Pokémon ${pokemon.name}:`,
            pokemonError,
          );
        }
      }

      offset += 100;
      hasNextBatch = !!next;
    } catch (batchError) {
      console.error(
        `Failed to fetch batch starting from offset ${offset}:`,
        batchError,
      );
      hasNextBatch = false;
    }
  }

  console.log('Seeding complete.');
}

main()
  .catch(async (e) => {
    console.error('Main seeding process failed:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
