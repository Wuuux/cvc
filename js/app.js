$(document).ready(function(){

  var player = 'circle';
  $('#player').on('click', function(){
    if (player == 'circle') {
      player = 'cross';
      $(this).addClass('playerCross').removeClass('playerCircle').text('X');
    }
    else {
      player = 'circle';
      $(this).addClass('playerCircle').removeClass('playerCross').text('O');
    };
  });

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
        this.$board.find('div').eq( _x + _y * this.size).addClass('circle').removeClass('empty');
      };
      this.set_Cross = function( _x , _y ){
        this.board[_x][_y][0] = -1;
        this.$board.find('div').eq( _x + _y * this.size).addClass('cross').removeClass('empty');
      };
      this.remove_Circle = function( _x , _y ){
        this.board[_x][_y][0] = 0;
        this.$board.find('div').eq( _x + _y * this.size).addClass('empty').removeClass('circle');
      };
      this.remove_Cross = function( _x , _y ){
        this.board[_x][_y][0] = 0;
        this.$board.find('div').eq( _x + _y * this.size).addClass('empty').removeClass('cross');
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

              if ((player == 'circle') && ($(this).hasClass('empty') == true)) {

                            // $(this).addClass('circle').removeClass('empty');
                            game.set_Circle($(this).data('x'),$(this).data('y'));
                            game.fillPowerArr();
                            game.showPowerArr();

              }
              else if ((player == 'circle') && ($(this).hasClass('circle') == true)) {

                            game.remove_Circle($(this).data('x'),$(this).data('y'));
                            game.fillPowerArr();
                            game.showPowerArr();

              }
              else if ((player == 'cross') && ($(this).hasClass('empty') == true)) {

                            // $(this).addClass('cross').removeClass('empty');
                            game.set_Cross($(this).data('x'),$(this).data('y'));

              }
              else if ((player == 'cross') && ($(this).hasClass('cross') == true)) {

                            game.remove_Cross($(this).data('x'),$(this).data('y'));

              };

              // if (game.crossFlag == true) {
              //       if ($(this).hasClass('empty') == true) {
              //         // $(this).addClass('cross').removeClass('empty');
              //         game.set_Cross($(this).data('x'),$(this).data('y'));
              //         game.crossFlag = false;
              //         game.circleFlag = true;
              //       };
              //
              // }
              // else {
              //       if ($(this).hasClass('empty') == true) {
              //         // $(this).addClass('circle').removeClass('empty');
              //         game.set_Circle($(this).data('x'),$(this).data('y'));
              //         game.crossFlag = true;
              //         game.circleFlag = false;
              //         game.fillPowerArr();
              //         game.showPowerArr();
              //       };
              // }
            });


          };
        };
      };

      this.clearPowerArr = function(){
        for (var i = 0; i < this.size; i++) {
            for (var j = 0; j < this.size; j++) {
              this.board[i][j][1] = 0;
            };
        };
      };

      this.fillPowerArr = function(){
          this.clearPowerArr();
          for (var i = 0; i < this.size; i++) {
              for (var j = 0; j < this.size; j++) {
                if (this.board[i][j][0] == 1) {
                  console.log('fillPower i=',i," j=",j);
                  this.setPower(i,j,'NN',4);
                  this.setPower(i,j,'NE',4);
                  this.setPower(i,j,'EE',4);
                  this.setPower(i,j,'SE',4);
                  this.setPower(i,j,'SS',4);
                  this.setPower(i,j,'SW',4);
                  this.setPower(i,j,'WW',4);
                  this.setPower(i,j,'NW',4);
                };
                // else if (this.board[i][j][0] == 0) {
                //   if
                //   (
                //         ((this.board[i][j-1][0] + this.board[i][j-2][0] + this.board[i][j-3][0] + this.board[i][j-4][0]) == 4)
                //       || ((this.board[i][j+1][0] + this.board[i][j+2][0] + this.board[i][j+3][0] + this.board[i][j+4][0]) == 4)
                //       || ((this.board[i+1][j][0] + this.board[i+2][j][0] + this.board[i+3][j][0] + this.board[i+4][j][0]) == 4)
                //       || ((this.board[i-1][j][0] + this.board[i-2][j][0] + this.board[i-3][j][0] + this.board[i-4][j][0]) == 4)
                //       || ((this.board[i+1][j-1][0] + this.board[i+2][j-2][0] + this.board[i+3][j-3][0] + this.board[i+4][j-4][0]) == 4)
                //       || ((this.board[i+1][j+1][0] + this.board[i+2][j+2][0] + this.board[i+3][j+3][0] + this.board[i+4][j+4][0]) == 4)
                //       || ((this.board[i-1][j+1][0] + this.board[i-2][j+2][0] + this.board[i-3][j+3][0] + this.board[i-4][j+4][0]) == 4)
                //       || ((this.board[i-1][j-1][0] + this.board[i-2][j-2][0] + this.board[i-3][j-3][0] + this.board[i-4][j-4][0]) == 4)
                //   )
                // };

              };
          };
      };

      this.setPower = function(_x,_y, _direction, _power){
        switch(true) {
              case (_direction == 'NN'):
              console.log('NN',this.board[ _x ][ _y-1 ][0]);
                  if (this.board[ _x ][ _y-1 ][0] == 1) {
                    if (this.board[ _x ][ _y-2 ][0] == 0) this.board[ _x ][ _y-2 ][1] += 4; //dopalacz
                    if ((this.board[ _x ][ _y-2 ][0] == 1) && (this.board[ _x ][ _y-3 ][0] == 0) && (this.board[ _x ][ _y-4 ][0] == 0)) this.board[ _x ][ _y-3 ][1] += 8; //dopalacz
                    this.setPower( _x, _y-1, _direction, _power)
                  }
                  else if (this.board[ _x ][ _y-1 ][0] == 0) {
                    this.board[ _x ][ _y-1 ][1] += _power;
                    if (_power > 1) this.setPower(_x,_y-1, _direction, _power-1);
                  };
                  break;
              case (_direction == 'NE'):
                  if (this.board[ _x+1 ][ _y-1 ][0] == 1) {
                    if (this.board[ _x+2 ][ _y-2 ][0] == 0) this.board[ _x+2 ][ _y-2 ][1] += 4; //dopalacz
                    if ((this.board[ _x+2 ][ _y-2 ][0] == 1) && (this.board[ _x+3 ][ _y-3 ][0] == 0) && (this.board[ _x+4 ][ _y-4 ][0] == 0)) this.board[ _x+3 ][ _y-3 ][1] += 8; //dopalacz
                    this.setPower( _x+1, _y-1, _direction, _power)
                  }
                  else if (this.board[ _x+1 ][ _y-1 ][0] == 0) {
                    this.board[ _x+1 ][ _y-1 ][1] += _power;
                    if (_power > 1) this.setPower(_x+1,_y-1, _direction, _power-1);
                  };
                  break;
              case (_direction == 'EE'):
                  if (this.board[ _x+1 ][ _y ][0] == 1) {
                    if (this.board[ _x+2 ][ _y ][0] == 0) this.board[ _x+2 ][ _y ][1] += 4; //dopalacz
                    if ((this.board[ _x+2 ][ _y ][0] == 1) && (this.board[ _x+3 ][ _y ][0] == 0) && (this.board[ _x+4 ][ _y ][0] == 0)) this.board[ _x+3 ][ _y ][1] += 8; //dopalacz
                    this.setPower( _x+1, _y, _direction, _power)
                  }
                  else if (this.board[ _x+1 ][ _y ][0] == 0) {
                    this.board[ _x+1 ][ _y ][1] += _power;
                    if (_power > 1) this.setPower(_x+1,_y, _direction, _power-1);
                  };
                  break;
              case (_direction == 'SE'):
                  if (this.board[ _x+1 ][ _y+1 ][0] == 1) {
                    if (this.board[ _x+2 ][ _y+2 ][0] == 0) this.board[ _x+2 ][ _y+2 ][1] += 4; //dopalacz
                    if ((this.board[ _x+2 ][ _y+2 ][0] == 1) && (this.board[ _x+3 ][ _y+3 ][0] == 0) && (this.board[ _x+4 ][ _y+4 ][0] == 0)) this.board[ _x+3 ][ _y+3 ][1] += 8; //dopalacz
                    this.setPower( _x+1, _y+1, _direction, _power)
                  }
                  else if (this.board[ _x+1 ][ _y+1 ][0] == 0) {
                    this.board[ _x+1 ][ _y+1 ][1] += _power;
                    if (_power > 1) this.setPower(_x+1,_y+1, _direction, _power-1);
                  };
                  break;
              case (_direction == 'SS'):
                  if (this.board[ _x ][ _y+1 ][0] == 1) {
                    if (this.board[ _x ][ _y+2 ][0] == 0) this.board[ _x ][ _y+2 ][1] += 4; //dopalacz
                    if ((this.board[ _x ][ _y+2 ][0] == 1) && (this.board[ _x ][ _y+3 ][0] == 0) && (this.board[ _x ][ _y+4 ][0] == 0)) this.board[ _x ][ _y+3 ][1] += 8; //dopalacz
                    this.setPower( _x, _y+1, _direction, _power)
                  }
                  else if (this.board[ _x ][ _y+1 ][0] == 0) {
                    this.board[ _x ][ _y+1 ][1] += _power;
                    if (_power > 1) this.setPower(_x,_y+1, _direction, _power-1);
                  };
                  break;
              case (_direction == 'SW'):
                  if (this.board[ _x-1 ][ _y+1 ][0] == 1) {
                    if (this.board[ _x-2 ][ _y+2 ][0] == 0) this.board[ _x-2 ][ _y+2 ][1] += 4; //dopalacz
                    if ((this.board[ _x-2 ][ _y-2 ][0] == 1) && (this.board[ _x-3 ][ _y-3 ][0] == 0) && (this.board[ _x-4 ][ _y-4 ][0] == 0)) this.board[ _x-3 ][ _y-3 ][1] += 8; //dopalacz
                    this.setPower( _x-1, _y+1, _direction, _power)
                  }
                  else if (this.board[ _x-1 ][ _y+1 ][0] == 0) {
                    this.board[ _x-1 ][ _y+1 ][1] += _power;
                    if (_power > 1) this.setPower(_x-1,_y+1, _direction, _power-1);
                  };
                  break;
              case (_direction == 'WW'):
                  if (this.board[ _x-1 ][ _y ][0] == 1) {
                    if (this.board[ _x-2 ][ _y ][0] == 0) this.board[ _x-2 ][ _y ][1] += 4; //dopalacz
                    if ((this.board[ _x-2 ][ _y ][0] == 1) && (this.board[ _x-3 ][ _y ][0] == 0) && (this.board[ _x-4 ][ _y ][0] == 0)) this.board[ _x-3 ][ _y ][1] += 8; //dopalacz
                    this.setPower( _x-1, _y, _direction, _power)
                  }
                  else if (this.board[ _x-1 ][ _y ][0] == 0) {
                    this.board[ _x-1 ][ _y ][1] += _power;
                    if (_power > 1) this.setPower(_x-1,_y, _direction, _power-1);
                  };
                  break;
              case (_direction == 'NW'):
                  if (this.board[ _x-1 ][ _y-1 ][0] == 1) {
                    if (this.board[ _x-2 ][ _y-2 ][0] == 0) this.board[ _x-2 ][ _y-2 ][1] += 4; //dopalacz
                    if ((this.board[ _x-2 ][ _y-2 ][0] == 1) && (this.board[ _x-3 ][ _y-3 ][0] == 0) && (this.board[ _x-4 ][ _y-4 ][0] == 0)) this.board[ _x-3 ][ _y-3 ][1] += 8; //dopalacz
                    this.setPower( _x-1, _y-1, _direction, _power)
                  }
                  else if (this.board[ _x-1 ][ _y-1 ][0] == 0) {
                    this.board[ _x-1 ][ _y-1 ][1] += _power;
                    if (_power > 1) this.setPower(_x-1,_y-1, _direction, _power-1);
                  };
                  break;
          };
      };

      this.showPowerArr = function(){
        var iMax;
        var jMax;
        var max = 0;
        for (var i = 0; i < this.size; i++) {
            for (var j = 0; j < this.size; j++) {
              this.$board.find("[data-x='"+i+"'][data-y='"+j+"']").text(this.board[i][j][1]);
              if (this.board[i][j][1] > max) {
                max = this.board[i][j][1];
                this.$board.find("[data-x='"+iMax+"'][data-y='"+jMax+"']").removeClass('maxPower');
                iMax = i;
                jMax = j;
                this.$board.find("[data-x='"+i+"'][data-y='"+j+"']").addClass('maxPower');
              };
            };
        };


      };



   }; // end GameBoard

   gameBoard = new GameBoard();
   gameBoard.init(20);
   gameBoard.clearPrint($('#gameBoard'));



});
