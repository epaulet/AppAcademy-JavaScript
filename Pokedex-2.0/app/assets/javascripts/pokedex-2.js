Pokedex.RootView.prototype.addToyToList = function (toy) {
  this.$pokeDetail.find(".toys").append(JST["toyListItem"]({toy: toy}));
};


Pokedex.RootView.prototype.renderToyDetail = function (toy) { // III
  this.$toyDetail.html(JST["toyDetail"]({toy: toy, pokes: this.pokes }));
};

Pokedex.RootView.prototype.selectToyFromList = function (event) {
  var $target = $(event.target);

  var toyId = $target.data('id');
  var pokemonId = $target.data('pokemon-id');

  var pokemon = this.pokes.get(pokemonId);
  var toy = pokemon.toys().get(toyId);

  this.renderToyDetail(toy);
};
