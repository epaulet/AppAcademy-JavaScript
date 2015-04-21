Pokedex.Views = {}

Pokedex.Views.PokemonIndex = Backbone.View.extend({
  events: {
    "click li": "selectPokemonFromList"
  },

  initialize: function () {
    this.collection = new Pokedex.Collections.Pokemon();
  },

  addPokemonToList: function (pokemon) {
    this.$el.append(JST['pokemonListItem']({
      pokemon: pokemon
    }));
  },

  refreshPokemon: function (options) {
    this.collection.fetch({
      success: function() {
        this.render();
        if (options["success"]) {
          options["success"]();
        }
      }.bind(this)
    });

    return this.collection;
  },

  render: function () {
    this.$el.empty();
    this.collection.each(this.addPokemonToList.bind(this));

    return this;
  },

  selectPokemonFromList: function (event) {
    var $target = $(event.currentTarget);

    var pokeId = $target.data('id');
    var pokemon = this.collection.get(pokeId);

    Backbone.history.navigate("pokemon/"+pokemon.id+"", { trigger: true });
  }
});


Pokedex.Views.PokemonDetail = Backbone.View.extend({
  events: {
    "click .toys li": "selectToyFromList"
  },

  refreshPokemon: function (options) {
    this.model.fetch({
      success: function() {
        this.render();
        if (options["success"]) {
          options["success"]();
        }
      }.bind(this)
    });
  },

  render: function () {
    this.$el.html(JST['pokemonDetail']({ pokemon: this.model }));
    this.$el.find("ul.toys").empty();
    this.model.toys().each(function(toy) {
      this.$el.find("ul.toys").append(JST["toyListItem"]({toy: toy}));
    }.bind(this));

    return this;
  },

  selectToyFromList: function (event) {
    var $target = $(event.currentTarget);
    var toyId = $target.data('id');
    var toy = this.model.toys().get(toyId);

    Backbone.history.navigate("pokemon/"+this.model.id+"/toys/"+toyId+"",
                              {trigger: true});

  }
});

Pokedex.Views.ToyDetail = Backbone.View.extend({
  events: {
    "change .toy-pokemon-selector": "reassignToy"
  },

  initialize: function (options) {
    this.pokes = options.pokes;
  },

  render: function () {
    this.$el.html(JST["toyDetail"]({toy: this.model, pokes: this.pokes }));
    return this;
  },

  reassignToy: function () {

  }
});


// $(function () {
//   var pokemonIndex = new Pokedex.Views.PokemonIndex();
//   pokemonIndex.refreshPokemon();
//   $("#pokedex .pokemon-list").html(pokemonIndex.$el);
// });
