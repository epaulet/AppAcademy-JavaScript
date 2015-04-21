Pokedex.RootView.prototype.addToyToList = function (toy) {
  var $toy = $("<li>");
  $toy.data("toy-id", toy.attributes.id);
  $toy.data("pokemon-id", toy.attributes.pokemon_id);
  $toy.html("Name: " + toy.attributes.name + ", Happiness: " + toy.attributes.happiness + ", Price: " + toy.attributes.price);
  $(this.$pokeDetail.find('.toys')).append($toy);
};

Pokedex.RootView.prototype.renderToyDetail = function (toy) {
  var $toyDetails = $('<div>');
  $toyDetails.addClass('detail');
  $toyDetails.append("<img src='" + toy.attributes.image_url + "'>");
  $toyDetails.append("<p>Name: " + toy.attributes.name + ", Happiness: " + toy.attributes.happiness + ", Price: " + toy.attributes.price + "</p>");
  var $dropDown = $("<select>");
  $dropDown.data("pokemon-id", toy.attributes.pokemon_id);
  $dropDown.data("toy-id", toy.id);
  this.pokes.each(function (poke) {
    var $option = $("<option value='" + poke.id + "'>" + poke.attributes.name + "</option>");
    if(toy.attributes.pokemon_id === poke.id) {
      $option.attr("selected", "selected");
    };
    $dropDown.append($option);
  });

  $toyDetails.append($dropDown);

  this.$toyDetail.html($toyDetails);
};

Pokedex.RootView.prototype.selectToyFromList = function (event) {
  var toyId = $(event.currentTarget).data('toy-id');
  var pokemon = this.pokes.get($(event.currentTarget).data('pokemon-id'));
  var toy = pokemon.toys().get(toyId);
  this.renderToyDetail(toy);
};
