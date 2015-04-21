Pokedex.RootView.prototype.renderPokemonDetail = function (pokemon) {
  var $detail = $('<div class="detail"></div>');
  $detail.append('<img src="' + pokemon.get('image_url') + '">');
  var $details = $("<ul>");
  pokemon.pairs().forEach(function (attribute) {
    $details.append("<li>" + attribute[0] + ": " + attribute[1] + "</li>");
  });
  $detail.append($details);
  var $toys = $("<ul>");
  $toys.addClass("toys");
  $detail.append($toys);
  this.$pokeDetail.html($detail);
  var rootView = this;
  pokemon.fetch({success: function () {
    pokemon.toys().each(function (toy) {
      rootView.addToyToList(toy);
    });
  }});
};

Pokedex.RootView.prototype.selectPokemonFromList = function (event) {
  var pokeId = $(event.currentTarget).data('id');
  var poke = this.pokes.get(pokeId);
  this.renderPokemonDetail(poke);
};
