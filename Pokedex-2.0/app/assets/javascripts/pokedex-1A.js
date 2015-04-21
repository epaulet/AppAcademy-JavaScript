Pokedex.RootView.prototype.addPokemonToList = function (pokemon) {
  this.$pokeList.append(JST['pokemonListItem']({ pokemon: pokemon }));
};

Pokedex.RootView.prototype.refreshPokemon = function () {
  this.pokes.fetch({
    success: (function () {
      this.$pokeList.empty();
      this.pokes.each(this.addPokemonToList.bind(this));
    }).bind(this)
  });

  return this.pokes;
};
