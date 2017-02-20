$(document).ready(function(){

  function GameBoard() {
      this.size  = 0;
      this.board = [];
      this.$board;

      this.init = function( _size ){
        this.size = _size;
        for (var i = 0; i < this.size; i++) {
          this.board[i] = [];
          for (var j = 0; j < this.size; j++) {
            this.board[i][j] = 0;
          };
        };
        console.log(this.board);
      };

      this.print = function( _element ){
        this.$board = $(_element);
        var cell;
        for (var y = 0; y < this.size; y++) {
          for (var x = 0; x < this.size; x++) {
            cell = $("<div class='cell' data-x="+x+" data-y="+y+"></div>");
            this.$board.append(cell);
          };
        };
      };

      this.set_Circle = function( _x , _y ){
        this.board[_x][_y] = 1;
        this.$board.find('div').eq( _x + _y * this.size).addClass('circle');
      };
      this.set_Cross = function( _x , _y ){
        this.board[_x][_y] = 1;
        this.$board.find('div').eq( _x + _y * this.size).addClass('cross');
      };

   }; // end GameBoard

   gameBoard = new GameBoard();
   gameBoard.init(10);
   gameBoard.print($('#gameBoard'));
   gameBoard.set_Cross(0,0);
   gameBoard.set_Circle(1,1);

});
