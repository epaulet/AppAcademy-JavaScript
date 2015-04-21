$.TweetCompose = function(el, options) {
  this.$el = $(el);
  this.$feed = $(this.$el.data('tweets-ul'));
  this.eventHandler();
};

$.TweetCompose.prototype.eventHandler = function() {
  this.$el.on('submit', this.submit.bind(this));
  this.$el.find('textarea').keyup(function(event) {
    var length = $(event.target).val().length;
    this.$el.find('.chars-left').html(140 - length);
  }.bind(this));

  this.$el.on('click', 'a.add-mentioned-user', this.addMentionedUser.bind(this));

  this.$el.on('click', 'a.remove-mentioned-user', this.removeMentionedUser.bind(this));
};

$.TweetCompose.prototype.addMentionedUser = function() {
  this.$el.find('div.mentioned-users').append(this.$el.find('script').html());
};
$.TweetCompose.prototype.removeMentionedUser = function(event) {
  $(event.currentTarget).parent().remove();
};

$.TweetCompose.prototype.submit = function(event) {
  event.preventDefault();
  var formData = this.$el.serializeJSON();
  this.$el.find(':input').prop('disabled', true);

  $.ajax({
    url: '/tweets',
    type: 'POST',
    dataType: 'json',
    data: formData,
    success: this.handleSuccess.bind(this),
    error: function() {
      this.$el.find(':input').prop('disabled', false);
    }.bind(this)
  });
};

$.TweetCompose.prototype.handleSuccess = function(response) {
  this.clearInput();
  this.$el.find(':input').prop('disabled', false);
  var tweet = JSON.stringify(response);
  var $newItem = $('<li></li>');
  $newItem.html(tweet);
  this.$feed.prepend($newItem);
};

$.TweetCompose.prototype.clearInput = function() {
  this.$el.find('textarea, select').val('');
  this.$el.find('div.mentioned-users').empty();
};

$.fn.tweetCompose = function(options) {
  return this.each(function() {
    new $.TweetCompose(this, options);
  });
};

$(function() {
  $('.tweet-compose').tweetCompose();
});
