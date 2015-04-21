Journal.Views.PostShow = Backbone.View.extend({
  template: JST['posts/show'],
  events: {
    "dblclick span": "edit",
    "blur input": "submit"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({ post: this.model });
    this.$el.html(content);
    return this;
  },

  edit: function (event) {
    var $currentTarget = $(event.currentTarget)
    var field = $currentTarget.attr("class");
    $currentTarget.replaceWith("<input class='"+ field +"' type='text' name='post["+ field +"]' value='"+ this.model.get(field) +"'>")
  },

  submit: function (event) {
    event.preventDefault();
    var $currentTarget = $(event.currentTarget);
    var field = $currentTarget.attr("class");
    var data = $(event.currentTarget).serializeJSON();
    this.model.save(data, {
      success: function (model) {
        $(event.currentTarget).replaceWith("<span class='"+ field +"'>" + model.get(field) + "</span>" );
      }.bind(this),
      error: function (model, response) {
        this.$el.prepend(response.responseText);
      }.bind(this)
    });
  }

});
