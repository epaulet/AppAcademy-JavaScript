Pokedex.Views = (Pokedex.Views || {});

Pokedex.Views.PokemonForm = Backbone.View.extend({
  events: {
    "submit form": "savePokemon"
  },

  render: function () {
    this.$el.html(JST["pokemonForm"]());
    return this;
  },

  savePokemon: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    this.model.save(formData.pokemon, {
      success: function() {
        this.collection.add(this.model);
        Backbone.history.navigate("pokemon/" + this.model.id + "",{
          trigger: true
        });
        this._router.pokemonIndex();
        this.$(".new-pokemon").trigger("reset");
      }.bind(this)
    });
  }
});
