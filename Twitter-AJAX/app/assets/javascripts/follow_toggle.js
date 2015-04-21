$.FollowToggle = function (el, options) {
  this.$el = $(el);
  this.followState = this.$el.data('initial-follow-state') || options.followState;
  this.userId = this.$el.data('user-id') || options.userId;
  this.render();
  this.eventListener();
};

$.FollowToggle.prototype.eventListener = function() {
  this.$el.on('click', this.handleClick.bind(this));
};

$.FollowToggle.prototype.render = function () {
  var content = this.followState === 'followed' ? 'Unfollow!' : 'Follow!';
  this.$el.html(content);
  this.$el.prop('disabled', false);
};

$.FollowToggle.prototype.handleClick = function(event) {
  event.preventDefault();
  this.$el.prop('disabled', true);

  var action = this.followState === 'followed' ? 'DELETE' : 'POST';

  $.ajax({
    url: '/users/' + this.userId + "/follow",
    dataType: 'json',
    type: action,
    success: function() {
      this.toggleState();
      this.render();
    }.bind(this),
    error: function() {
      this.render();
    }
  });
};

$.FollowToggle.prototype.toggleState = function() {
  this.followState = ((this.followState === 'followed') ? 'unfollowed' : 'followed');
  this.$el.data('initial-follow-state', this.followState);
};

$.fn.followToggle = function (options) {
  return this.each(function () {
    new $.FollowToggle(this, options);
  });
};

$(function () {
  $("button.follow-toggle").followToggle();
});
