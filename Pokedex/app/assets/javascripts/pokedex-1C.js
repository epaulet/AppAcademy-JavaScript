Pokedex.RootView.prototype.createPokemon = function (attrs, callback) {
  var newPoke = new Pokedex.Models.Pokemon();
  newPoke.save(attrs, {success: function () {
    this.pokes.add(newPoke);
    this.addPokemonToList(newPoke);
    callback(newPoke);
  }.bind(this)});
};

Pokedex.RootView.prototype.submitPokemonForm = function (event) {
  event.preventDefault();
  var attrs = $(event.currentTarget).serializeJSON().pokemon;
  this.createPokemon(attrs, this.renderPokemonDetail.bind(this));
};
