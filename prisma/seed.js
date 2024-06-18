import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();
const BATCH_SIZE = 100; // Fetch 100 Pokémon at a time

async function main() {
  let offset = 0; // Start from the first Pokémon
  let hasNextBatch = true;

  while (hasNextBatch) {
    try {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${BATCH_SIZE}`,
      );
      const { results, next } = data;

      for (const pokemon of results) {
        try {
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
        } catch (pokemonError) {
          console.error(
            `Failed to create Pokémon ${pokemon.name}:`,
            pokemonError,
          );
        }
      }

      offset += BATCH_SIZE;
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
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Main seeding process failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
