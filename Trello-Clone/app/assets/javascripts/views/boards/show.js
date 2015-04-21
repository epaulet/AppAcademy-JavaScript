TrelloClone.Views.Board = Backbone.CompositeView.extend({
  template: JST['boards/show'],
  id: 'board-show',

  initialize: function (options) {
    // instantiate a blank collection and populate when fetch completes
    this.collection = new TrelloClone.Collections.Lists();
    this.listenTo(this.model, 'sync', this.addLists);
    this.listenTo(this.collection, 'add', this.addList);
    this.listenTo(this.collection, 'remove', this.render);
  },

  addLists: function (board) {
    if (board.get('lists')) {
      var listCollection = this.collection;
      board.get('lists').forEach(function (list) {
        var listModel = new TrelloClone.Models.List(list);
        listCollection.add(listModel);
      });
    }
  },

  addList: function (list) {
    var newIndexItemView = new TrelloClone.Views.List({
      model: list,
      parentBoardView: this
    });
    this.addSubview('#list-index', newIndexItemView);
    this.render();
  },

  render: function () {
    this.$el.html(this.template({ board: this.model }));
    this.attachSubviews();
    this.renderNew();

    return this;
  },

  renderNew: function () {
    var lastList = this.collection.last();

    var newLinkView = new TrelloClone.Views.ListNew({
      board: this.model,
      collection: this.collection
    });
    this.$('#list-index').append(newLinkView.render().$el);
  }
});
