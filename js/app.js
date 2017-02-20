$(document).ready(function(){

  function GameBoard() {
      this.size  = 0;
      this.board = [];
      this.$board;
      this.crossFlag = false;
      this.circleFlag = true;

      this.init = function( _size ){
        this.size = _size;
        for (var i = 0; i < this.size; i++) {
          this.board[i] = [];
          for (var j = 0; j < this.size; j++) {
            this.board[i][j] = [];
            for (var n = 0; n < 9; n++) {
              this.board[i][j][n] = 0;
            }
          };
        };
        console.log(this.board);
      };

      this.set_Neighborous = function( _x, _y, _content){

      };

      this.set_Circle = function( _x , _y ){
        this.board[_x][_y][0] = 1;
        this.set_Neighborous( _x, _y, 'circle' );
        this.$board.find('div').eq( _x + _y * this.size).addClass('circle').removeClass('empty');
      };
      this.set_Cross = function( _x , _y ){
        this.board[_x][_y][0] = -1;
        this.set_Neighborous( _x, _y, 'cross' );
        this.$board.find('div').eq( _x + _y * this.size).addClass('cross').removeClass('empty');
      };

      this.clearPrint = function( _element ){
        this.$board = $(_element);
        var cell;
        for (var y = 0; y < this.size; y++) {
          for (var x = 0; x < this.size; x++) {
            cell = $("<div class='cell empty' data-x="+x+" data-y="+y+"></div>");
            this.$board.append(cell);
            var game = this;

            $('.cell').on('click',function(){
              if (game.crossFlag == true) {
                    if ($(this).hasClass('empty') == true) {
                      // $(this).addClass('cross').removeClass('empty');
                      game.set_Cross($(this).data('x'),$(this).data('y'));
                      game.crossFlag = false;
                      game.circleFlag = true;
                    };

              }
              else {
                    if ($(this).hasClass('empty') == true) {
                      // $(this).addClass('circle').removeClass('empty');
                      game.set_Circle($(this).data('x'),$(this).data('y'));
                      game.crossFlag = true;
                      game.circleFlag = false;
                    };
              }
            });
          };
        };
      };



   }; // end GameBoard

   gameBoard = new GameBoard();
   gameBoard.init(10);
   gameBoard.clearPrint($('#gameBoard'));

});
