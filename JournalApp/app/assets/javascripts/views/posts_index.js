Journal.Views.PostIndex = Backbone.View.extend({
    template: JST["posts/index"],
    // tagName: "ul",
    initialize: function () {
      this.listenTo(this.collection, "sync", this.render);
      this.listenTo(this.collection, "remove", this.render);
    },

    render: function () {
      this.$el.empty();
      var content = this.template()
      this.$el.html(content);
      this.collection.each(function (post) {
        var view = new Journal.Views.PostIndexItem({model: post});
        this.$('ul').append(view.render().$el);
      }.bind(this));

      return this;
    }
});
