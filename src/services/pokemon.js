export async function getAllPokemon(url) {
  return new Promise((resoleve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        resoleve(data);
      });
  });
}

export async function getPokemon(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data));
  });
}
