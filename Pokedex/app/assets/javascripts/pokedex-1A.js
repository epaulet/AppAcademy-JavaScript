Pokedex.RootView.prototype.addPokemonToList = function (pokemon) {
  var $poke = $("<li>");
  $poke.addClass("poke-list-item");
  $poke.data("id", pokemon.id);
  var content = "name: " + pokemon.get("name") + ", poke_type: " + pokemon.get("poke_type");
  $poke.html(content);
  this.$pokeList.append($poke);
};

Pokedex.RootView.prototype.refreshPokemon = function () {
  Pokedex.rootView.pokes.fetch({
    success: function (collection) {
      collection.each(function (poke) {
        this.addPokemonToList(poke);
      }, Pokedex.rootView)
    }
  });
};
