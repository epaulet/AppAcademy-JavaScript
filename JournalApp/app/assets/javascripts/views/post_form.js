Journal.Views.PostForm = Backbone.View.extend({
  template: JST['posts/post_form'],
  events: {
    "submit form": "submitPost"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({ post: this.model });
    this.$el.html(content);
    return this;
  },

  submitPost: function (event) {
    event.preventDefault();
    var formContents = $(event.currentTarget).serializeJSON();
    this.model.save(formContents, {
      success: function (model) {
        this.collection.add(model, { merge: true });
        Backbone.history.navigate('', { trigger: true });
      }.bind(this),
      error: function (model, response) {
        this.$el.prepend(response.responseText);
      }.bind(this)
    });
  }
});
