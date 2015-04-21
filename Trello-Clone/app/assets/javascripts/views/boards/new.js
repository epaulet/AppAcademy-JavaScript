TrelloClone.Views.BoardNew = Backbone.View.extend({
  newBoardLinkTemplate: JST['boards/new'],
  newBoardFormTemplate: JST['boards/form'],
  className: 'col-md-3',

  events: {
    "click #new-board-link": "renderForm",
    "click #cancel-form-button": "renderLink",
    "submit #new-board-form": "createBoard"
  },

  render: function () {
    this.$el.html(this.newBoardLinkTemplate());

    return this;
  },

  renderLink: function (event) {
    event.preventDefault();
    this.render();
  },

  renderForm: function () {
    this.$el.html(this.newBoardFormTemplate());
  },

  createBoard: function(event) {
    event.preventDefault();
    var boardData = $(event.currentTarget).serializeJSON();
    var newBoard = new TrelloClone.Models.Board(boardData);
    var boardCollection = this.collection;
    newBoard.save({},{
      success: function (newBoard) {
        boardCollection.add(newBoard);
        Backbone.history.navigate('boards/' + newBoard.id, { trigger: true });
      }
    });
  }
});
