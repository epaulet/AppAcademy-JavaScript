TrelloClone.Views.BoardIndex = Backbone.CompositeView.extend({
  boardListTemplate: JST['boards/index'],

  initialize: function (options) {
    var boardIndexView = this;
    this.collection.each(function (board) {
      var newIndexItemView = new TrelloClone.Views.BoardIndexItem({ model: board });
      boardIndexView.addSubview('#board-index', newIndexItemView);
    });
    this.listenTo(this.collection, 'add', this.addBoard);
  },

  addBoard: function (board) {
    var newIndexItemView = new TrelloClone.Views.BoardIndexItem({ model: board });
    this.addSubview('#board-index', newIndexItemView);
    this.render();
  },

  render: function () {
    this.$el.html(this.boardListTemplate());
    this.attachSubviews();
    this.renderNew();

    return this;
  },

  renderNew: function () {
    var newBoardView = new TrelloClone.Views.BoardNew({ collection: this.collection });
    this.$('#board-index').append(newBoardView.render().$el);
  }
});
