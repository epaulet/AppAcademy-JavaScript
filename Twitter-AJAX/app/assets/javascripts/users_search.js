$.UsersSearch = function (el) {
  this.$el = $(el);
  this.$input = this.$el.find('input');
  this.$ul = this.$el.find('ul');
  this.handleInput();
};

$.UsersSearch.prototype.handleInput = function() {
  this.$input.on("keyup", function(event) {

    console.log(this.$input.serialize());
    $.ajax({
      url: '/users/search',
      type: 'GET',
      dataType: 'json',
      data: this.$input.serialize(),
      success: function(response) {
        this.render(response);
      }.bind(this)
    });
  }.bind(this));
};

$.UsersSearch.prototype.render = function (response) {
  this.$ul.empty();
  response.forEach(function (user) {

    var $result = $('<li></li>');
    var $link = $('<a></a>');
    $link.attr('href', '/users/' + user.id);
    $link.html(user.username);
    $result.append($link);
    var followedState = user.followed === false ? "unfollowed" : "followed";

    var $button = $('<button class="follow-toggle"></button>');
    $button.followToggle({
      userId: user.id,
      followState: followedState
    });

    $result.append($button);

    this.$ul.append($result);
  }.bind(this));
};

$.fn.usersSearch = function () {
  return this.each(function () {
    new $.UsersSearch(this);
  });
};

$(function () {
  $("div.users-search").usersSearch();
});
