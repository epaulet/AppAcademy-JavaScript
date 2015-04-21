Journal.Views.PostIndexItem = Backbone.View.extend({
  template: JST['posts/index_item'],
  tagName: 'li',
  events: {
    "click button": "delete",
  },

  initialize: function () {
    this.listenTo(this.model, "change", this.render);
  },

  render: function () {
    var content = this.template({ post: this.model });
    this.$el.html(content);
    return this;
  },

  delete: function () {
    this.model.destroy();
  }

});
