TrelloClone.Views.ListNew = Backbone.View.extend({
  newListLinkTemplate: JST['lists/new'],
  newListFormTemplate: JST['lists/form'],
  className: 'col-sm-3 list-index-item',

  events: {
    "click #new-list-link": "renderForm",
    "click #cancel-form-button": "renderLink",
    "submit #new-list-form": "createList"
  },

  initialize: function(options) {
    this.board = options.board;
    this.newOrd = options.newOrd;
  },

  render: function () {
    this.$el.html(this.newListLinkTemplate());
    return this;
  },

  renderLink: function (event) {
    event.preventDefault();
    this.render();
  },

  renderForm: function (event) {
    event.preventDefault();
    this.$el.html(this.newListFormTemplate());
  },

  createList: function(event) {
    event.preventDefault();
    var listData = $(event.currentTarget).serializeJSON();
    listData.list.board_id = this.board.id;

    var lastList = this.collection.last();
    var newOrd = 0;
    if (lastList) { newOrd = lastList.get('ord') + 1; }
    listData.list.ord = newOrd;

    var newList = new TrelloClone.Models.List(listData);

    var listCollection = this.collection;
    newList.save({},{
      success: function (newList) {
        listCollection.add(newList);
      }
    });
  }
});
