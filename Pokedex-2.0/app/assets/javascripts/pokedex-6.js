var Pokedex = window.Pokedex;

Pokedex.Router = Backbone.Router.extend({
  routes: {
    "": "pokemonIndex",
    "pokemon/:id": "pokemonDetail",
    "pokemon/:pokeId/toys/:toyId": "toyDetail"
  },

  pokemonDetail: function (id, callback) {
    var that = this;
    if (!this._pokemonIndex) {
      this.pokemonIndex(function () {
        that.pokemonDetail(id, callback);
      });
    } else {
      this._pokemonDetail = new Pokedex.Views.PokemonDetail({
        model: this._pokemonIndex.collection.get(id)
      });
      $("#pokedex .pokemon-detail").html(this._pokemonDetail.render().$el);
      this._pokemonDetail.refreshPokemon({ success: callback });
    }
  },

  pokemonIndex: function (callback) {
    this._pokemonIndex = new Pokedex.Views.PokemonIndex();
    $("#pokedex .pokemon-list").html(this._pokemonIndex.$el);
    this.pokemonForm();
    this._pokemonIndex.refreshPokemon({ success: callback });
  },

  toyDetail: function (pokemonId, toyId) {
    var that = this;
    if (!this._pokemonDetail) {
      this.pokemonDetail(pokemonId, function() {
        that.toyDetail(pokemonId, toyId);
      });
    } else {
      var toys = this._pokemonDetail.model.toys();
      this._toyDetail = new Pokedex.Views.ToyDetail({
        collection: toys,
        model: toys.get(toyId),
        pokes: this._pokemonIndex.collection
      });
      $('#pokedex .toy-detail').html(this._toyDetail.render().$el);
    }
  },

  pokemonForm: function () {
    this._formView = new Pokedex.Views.PokemonForm ({
      model: new Pokedex.Models.Pokemon(),
      collection: this._pokemonIndex.collection
    }).render();
    this._formView._router = this;
    $("#pokedex div.pokemon-form").html(this._formView.$el);
  }
});


$(function () {
  new Pokedex.Router();
  Backbone.history.start();
});
