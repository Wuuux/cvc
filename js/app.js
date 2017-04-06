$(document).ready(function(){


  // var time = 0;
  // var wait_5s = setInterval(function(){ myTimer() }, 1000);
  //
  // function myTimer() {
  //     time++;
  //     if (time == 5) time = 0;
  //     console.log(time);
  //     return time;
  // }

  var player = 'circle';
  var gameOn = false;
  var winner = '';

  $('#start button').on('click',function(){
    if ($(this).text() == 'YES') {
      $('#mask').hide();
      gameOn = true;
      winner = '';
    } else {
      window.location.replace("https://github.com/Wuuux/cvc");
    };
  });

  $('#info').on('click',function(){
    $('#info img').hide();
    gameOn = true;
    gameBoard.init(20);
    gameBoard.clearPrint($('#gameBoard'));
    gameBoard.circleArray = [];
    gameBoard.arrayOfEmptySpaceAroundCircles = [];
    gameBoard.crossArray = [];
    gameBoard.arrayOfEmptySpaceAroundCrosses = [];
  });

  $( "#info" ).hover(
    function() {
      $('#info img').attr('src','images/fight.png');
    },
    function() {
      $('#info img').attr('src','images/fight_question.png');
    }
  );

  $('#player').on('click', function(){
    // if (player == 'circle') {
    //   player = 'cross';
    //   $(this).addClass('playerCross').removeClass('playerCircle').text('X');
    // }
    // else {
    //   player = 'circle';
    //   $(this).addClass('playerCircle').removeClass('playerCross').text('O');
    // };
  });

  function GameBoard() {
      this.size  = 0;
      this.board = [];
      this.$board;
      this.crossFlag = false;
      this.circleFlag = true;
      this.circleArray = [];
      this.arrayOfEmptySpaceAroundCircles = [];
      this.crossArray = [];
      this.arrayOfEmptySpaceAroundCrosses = [];

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
      };

      //
      // returns TRUE if will find LENGTH examples of VALUE in specific direction
      this.findXstringOfValues = function( _x, _y, _direction, length, value ){
        if (value == 'circle')  v = 1
        else                    v = -1;
        switch(true) {
              case (_direction == 'NW'):
                  if (this.board[ _x-1 ][ _y-1 ][0] == v) {
                    if (length-1 == 1) return true;
                    return this.findXstringOfValues(_x-1, _y-1, 'NW', length-1, value);
                  };
                  return false;
              break;
              case (_direction == 'NN'):
                  if (this.board[ _x ][ _y-1 ][0] == v) {
                    if (length-1 == 1) return true;
                    return this.findXstringOfValues(_x, _y-1, 'NN', length-1, value);
                  };
                  return false;
              break;
              case (_direction == 'NE'):
                  if (this.board[ _x+1 ][ _y-1 ][0] == v) {
                    if (length-1 == 1) return true;
                    return this.findXstringOfValues(_x+1, _y-1, 'NE', length-1, value);
                  };
                  return false;
              break;
              case (_direction == 'EE'):
                  if (this.board[ _x+1 ][ _y ][0] == v) {
                    if (length-1 == 1) return true;
                    return this.findXstringOfValues(_x+1, _y, 'EE', length-1, value);
                  };
                  return false;
              break;
              case (_direction == 'SE'):
                  if (this.board[ _x+1 ][ _y+1 ][0] == v) {
                    if (length-1 == 1) return true;
                    return this.findXstringOfValues(_x+1, _y+1, 'SE', length-1, value);
                  };
                  return false;
              break;
              case (_direction == 'SS'):
                  if (this.board[ _x ][ _y+1 ][0] == v) {
                    if (length-1 == 1) return true;
                    return this.findXstringOfValues(_x, _y+1, 'SS', length-1, value);
                  };
                  return false;
              break;
              case (_direction == 'SW'):
                  if (this.board[ _x-1 ][ _y+1 ][0] == v) {
                    if (length-1 == 1) return true;
                    return this.findXstringOfValues(_x-1, _y+1, 'SW', length-1, value);
                  };
                  return false;
              break;
              case (_direction == 'WW'):
                  if (this.board[ _x-1 ][ _y ][0] == v) {
                    if (length-1 == 1) return true;
                    return this.findXstringOfValues(_x-1, _y, 'WW', length-1, value);
                  };
                  return false;
              break;
        };

      };

      this.findXstringOfValuesPlusEmpty = function( _x, _y, _direction, length, value ){
        if (value == 'circle')  v = 1
        else                    v = -1;
        switch(true) {
              case (_direction == 'NW'):
                  if (this.board[ _x-1 ][ _y-1 ][0] == v) {
                    if ((length-1 == 1) && (this.board[ _x-2 ][ _y-2 ][0] == 0))  return true;
                    if ((length-1 == 1) && (this.board[ _x-2 ][ _y-2 ][0] != 0))  return false;
                    return this.findXstringOfValuesPlusEmpty(_x-1, _y-1, 'NW', length-1, value);
                  };
                  return false;
              break;
              case (_direction == 'NN'):
                  if (this.board[ _x ][ _y-1 ][0] == v) {
                    if ((length-1 == 1) && (this.board[ _x ][ _y-2 ][0] == 0))  return true;
                    if ((length-1 == 1) && (this.board[ _x ][ _y-2 ][0] != 0))  return false;
                    return this.findXstringOfValuesPlusEmpty(_x, _y-1, 'NN', length-1, value);
                  };
                  return false;
              break;
              case (_direction == 'NE'):
                  if (this.board[ _x+1 ][ _y-1 ][0] == v) {
                    if ((length-1 == 1) && (this.board[ _x+2 ][ _y-2 ][0] == 0))  return true;
                    if ((length-1 == 1) && (this.board[ _x+2 ][ _y-2 ][0] != 0))  return false;
                    return this.findXstringOfValuesPlusEmpty(_x+1, _y-1, 'NE', length-1, value);
                  };
                  return false;
              break;
              case (_direction == 'EE'):
                  if (this.board[ _x+1 ][ _y ][0] == v) {
                    if ((length-1 == 1) && (this.board[ _x+2 ][ _y ][0] == 0))  return true;
                    if ((length-1 == 1) && (this.board[ _x+2 ][ _y ][0] != 0))  return false;
                    return this.findXstringOfValuesPlusEmpty(_x+1, _y, 'EE', length-1, value);
                  };
                  return false;
              break;
              case (_direction == 'SE'):
                  if (this.board[ _x+1 ][ _y+1 ][0] == v) {
                    if ((length-1 == 1) && (this.board[ _x+2 ][ _y+2 ][0] == 0))  return true;
                    if ((length-1 == 1) && (this.board[ _x+2 ][ _y+2 ][0] != 0))  return false;
                    return this.findXstringOfValuesPlusEmpty(_x+1, _y+1, 'SE', length-1, value);
                  };
                  return false;
              break;
              case (_direction == 'SS'):
                  if (this.board[ _x ][ _y+1 ][0] == v) {
                    if ((length-1 == 1) && (this.board[ _x ][ _y+2 ][0] == 0))  return true;
                    if ((length-1 == 1) && (this.board[ _x ][ _y+2 ][0] != 0))  return false;
                    return this.findXstringOfValuesPlusEmpty(_x, _y+1, 'SS', length-1, value);
                  };
                  return false;
              break;
              case (_direction == 'SW'):
                  if (this.board[ _x-1 ][ _y+1 ][0] == v) {
                    if ((length-1 == 1) && (this.board[ _x-2 ][ _y+2 ][0] == 0))  return true;
                    if ((length-1 == 1) && (this.board[ _x-2 ][ _y+2 ][0] != 0))  return false;
                    return this.findXstringOfValuesPlusEmpty(_x-1, _y+1, 'SW', length-1, value);
                  };
                  return false;
              break;
              case (_direction == 'WW'):
                  if (this.board[ _x-1 ][ _y ][0] == v) {
                    if ((length-1 == 1) && (this.board[ _x-2 ][ _y ][0] == 0))  return true;
                    if ((length-1 == 1) && (this.board[ _x-2 ][ _y ][0] != 0))  return false;
                    return this.findXstringOfValuesPlusEmpty(_x-1, _y, 'WW', length-1, value);
                  };
                  return false;
              break;
        };

      };

      this.findFiveCircles = function(){
        for (var i = 0; i < this.circleArray.length; i++) {

              if (this.findXstringOfValues(this.circleArray[i][0],this.circleArray[i][1],'NN',5,'circle') == true)
              { this.$board.find("[data-x='"+this.circleArray[i][0]+"'][data-y='"+this.circleArray[i][1]+"']").html("<img src='images/vertical_blue.png' class='kreska_v_bottom'>"); return true; }
              if (this.findXstringOfValues(this.circleArray[i][0],this.circleArray[i][1],'SS',5,'circle') == true)
              { this.$board.find("[data-x='"+this.circleArray[i][0]+"'][data-y='"+this.circleArray[i][1]+"']").html("<img src='images/vertical_blue.png' class='kreska_v_top'>"); return true; }
              if (this.findXstringOfValues(this.circleArray[i][0],this.circleArray[i][1],'WW',5,'circle') == true)
              { this.$board.find("[data-x='"+this.circleArray[i][0]+"'][data-y='"+this.circleArray[i][1]+"']").html("<img src='images/horizontal_blue.png' class='kreska_v_left'>"); return true; }
              if (this.findXstringOfValues(this.circleArray[i][0],this.circleArray[i][1],'EE',5,'circle') == true)
              { this.$board.find("[data-x='"+this.circleArray[i][0]+"'][data-y='"+this.circleArray[i][1]+"']").html("<img src='images/horizontal_blue.png' class='kreska_v_right'>"); return true; }
              if (this.findXstringOfValues(this.circleArray[i][0],this.circleArray[i][1],'NW',5,'circle') == true)
              { this.$board.find("[data-x='"+this.circleArray[i][0]+"'][data-y='"+this.circleArray[i][1]+"']").html("<img src='images/v-h_blue.png' class='kreska_h-v_NW'>"); return true; }
              if (this.findXstringOfValues(this.circleArray[i][0],this.circleArray[i][1],'NE',5,'circle') == true)
              { this.$board.find("[data-x='"+this.circleArray[i][0]+"'][data-y='"+this.circleArray[i][1]+"']").html("<img src='images/h-v_blue.png' class='kreska_h-v_NE'>"); return true; }
              if (this.findXstringOfValues(this.circleArray[i][0],this.circleArray[i][1],'SW',5,'circle') == true)
              { this.$board.find("[data-x='"+this.circleArray[i][0]+"'][data-y='"+this.circleArray[i][1]+"']").html("<img src='images/h-v_blue.png' class='kreska_h-v_SW'>"); return true; }
              if (this.findXstringOfValues(this.circleArray[i][0],this.circleArray[i][1],'SE',5,'circle') == true)
              { this.$board.find("[data-x='"+this.circleArray[i][0]+"'][data-y='"+this.circleArray[i][1]+"']").html("<img src='images/v-h_blue.png' class='kreska_h-v_SE'>"); return true; }

          };
        return false;
      };

      this.findFiveCrosses = function(){
        for (var i = 0; i < this.crossArray.length; i++) {

          if (this.findXstringOfValues(this.crossArray[i][0],this.crossArray[i][1],'NN',5,'cross') == true)
          { this.$board.find("[data-x='"+this.crossArray[i][0]+"'][data-y='"+this.crossArray[i][1]+"']").html("<img src='images/vertical_blue.png' class='kreska_v_bottom'>"); return true; }
          if (this.findXstringOfValues(this.crossArray[i][0],this.crossArray[i][1],'SS',5,'cross') == true)
          { this.$board.find("[data-x='"+this.crossArray[i][0]+"'][data-y='"+this.crossArray[i][1]+"']").html("<img src='images/vertical_blue.png' class='kreska_v_top'>"); return true; }
          if (this.findXstringOfValues(this.crossArray[i][0],this.crossArray[i][1],'WW',5,'cross') == true)
          { this.$board.find("[data-x='"+this.crossArray[i][0]+"'][data-y='"+this.crossArray[i][1]+"']").html("<img src='images/horizontal_blue.png' class='kreska_v_left'>"); return true; }
          if (this.findXstringOfValues(this.crossArray[i][0],this.crossArray[i][1],'EE',5,'cross') == true)
          { this.$board.find("[data-x='"+this.crossArray[i][0]+"'][data-y='"+this.crossArray[i][1]+"']").html("<img src='images/horizontal_blue.png' class='kreska_v_right'>"); return true; }
          if (this.findXstringOfValues(this.crossArray[i][0],this.crossArray[i][1],'NW',5,'cross') == true)
          { this.$board.find("[data-x='"+this.crossArray[i][0]+"'][data-y='"+this.crossArray[i][1]+"']").html("<img src='images/v-h_blue.png' class='kreska_h-v_NW'>"); return true; }
          if (this.findXstringOfValues(this.crossArray[i][0],this.crossArray[i][1],'NE',5,'cross') == true)
          { this.$board.find("[data-x='"+this.crossArray[i][0]+"'][data-y='"+this.crossArray[i][1]+"']").html("<img src='images/h-v_blue.png' class='kreska_h-v_NE'>"); return true; }
          if (this.findXstringOfValues(this.crossArray[i][0],this.crossArray[i][1],'SW',5,'cross') == true)
          { this.$board.find("[data-x='"+this.crossArray[i][0]+"'][data-y='"+this.crossArray[i][1]+"']").html("<img src='images/h-v_blue.png' class='kreska_h-v_SW'>"); return true; }
          if (this.findXstringOfValues(this.crossArray[i][0],this.crossArray[i][1],'SE',5,'cross') == true)
          { this.$board.find("[data-x='"+this.crossArray[i][0]+"'][data-y='"+this.crossArray[i][1]+"']").html("<img src='images/v-h_blue.png' class='kreska_h-v_SE'>"); return true; }

        };
        return false;
      };

      this.findFourCircles = function(){
        var answer = [-1,-1];
        for (var i = 0; i < this.arrayOfEmptySpaceAroundCircles.length; i++) {
          var x = this.arrayOfEmptySpaceAroundCircles[i][0];
          var y = this.arrayOfEmptySpaceAroundCircles[i][1];

          if ((this.findXstringOfValues(x,y,'NW',5,'circle') == true)
           || (this.findXstringOfValues(x,y,'NN',5,'circle') == true)
           || (this.findXstringOfValues(x,y,'NE',5,'circle') == true)
           || (this.findXstringOfValues(x,y,'EE',5,'circle') == true)
           || (this.findXstringOfValues(x,y,'SE',5,'circle') == true)
           || (this.findXstringOfValues(x,y,'SS',5,'circle') == true)
           || (this.findXstringOfValues(x,y,'SW',5,'circle') == true)
           || (this.findXstringOfValues(x,y,'WW',5,'circle') == true)
           || ((this.findXstringOfValues(x,y,'NW',4,'circle') == true) && (this.findXstringOfValues(x,y,'SE',2,'circle') == true))
           || ((this.findXstringOfValues(x,y,'NN',4,'circle') == true) && (this.findXstringOfValues(x,y,'SS',2,'circle') == true))
           || ((this.findXstringOfValues(x,y,'NE',4,'circle') == true) && (this.findXstringOfValues(x,y,'SW',2,'circle') == true))
           || ((this.findXstringOfValues(x,y,'WW',4,'circle') == true) && (this.findXstringOfValues(x,y,'EE',2,'circle') == true))
           || ((this.findXstringOfValues(x,y,'NW',2,'circle') == true) && (this.findXstringOfValues(x,y,'SE',4,'circle') == true))
           || ((this.findXstringOfValues(x,y,'NN',2,'circle') == true) && (this.findXstringOfValues(x,y,'SS',4,'circle') == true))
           || ((this.findXstringOfValues(x,y,'NE',2,'circle') == true) && (this.findXstringOfValues(x,y,'SW',4,'circle') == true))
           || ((this.findXstringOfValues(x,y,'WW',2,'circle') == true) && (this.findXstringOfValues(x,y,'EE',4,'circle') == true))
           || ((this.findXstringOfValues(x,y,'NW',3,'circle') == true) && (this.findXstringOfValues(x,y,'SE',3,'circle') == true))
           || ((this.findXstringOfValues(x,y,'NN',3,'circle') == true) && (this.findXstringOfValues(x,y,'SS',3,'circle') == true))
           || ((this.findXstringOfValues(x,y,'NE',3,'circle') == true) && (this.findXstringOfValues(x,y,'SW',3,'circle') == true))
           || ((this.findXstringOfValues(x,y,'WW',3,'circle') == true) && (this.findXstringOfValues(x,y,'EE',3,'circle') == true))
         )
                                                                      {
                                                                        answer[0]=x;
                                                                        answer[1]=y;
                                                                        return answer;
                                                                      }
        };
        return answer;
      };

      this.findFourCrosses = function(){
        var answer = [-1,-1];
        //console.log('array around crosses',this.arrayOfEmptySpaceAroundCrosses);
        for (var i = 0; i < this.arrayOfEmptySpaceAroundCrosses.length; i++) {
          var x = this.arrayOfEmptySpaceAroundCrosses[i][0];
          var y = this.arrayOfEmptySpaceAroundCrosses[i][1];

          if ((this.findXstringOfValues(x,y,'NW',5,'cross') == true)
           || (this.findXstringOfValues(x,y,'NN',5,'cross') == true)
           || (this.findXstringOfValues(x,y,'NE',5,'cross') == true)
           || (this.findXstringOfValues(x,y,'EE',5,'cross') == true)
           || (this.findXstringOfValues(x,y,'SE',5,'cross') == true)
           || (this.findXstringOfValues(x,y,'SS',5,'cross') == true)
           || (this.findXstringOfValues(x,y,'SW',5,'cross') == true)
           || (this.findXstringOfValues(x,y,'WW',5,'cross') == true)
           || ((this.findXstringOfValues(x,y,'NW',4,'cross') == true) && (this.findXstringOfValues(x,y,'SE',2,'cross') == true))
           || ((this.findXstringOfValues(x,y,'NN',4,'cross') == true) && (this.findXstringOfValues(x,y,'SS',2,'cross') == true))
           || ((this.findXstringOfValues(x,y,'NE',4,'cross') == true) && (this.findXstringOfValues(x,y,'SW',2,'cross') == true))
           || ((this.findXstringOfValues(x,y,'WW',4,'cross') == true) && (this.findXstringOfValues(x,y,'EE',2,'cross') == true))
           || ((this.findXstringOfValues(x,y,'NW',2,'cross') == true) && (this.findXstringOfValues(x,y,'SE',4,'cross') == true))
           || ((this.findXstringOfValues(x,y,'NN',2,'cross') == true) && (this.findXstringOfValues(x,y,'SS',4,'cross') == true))
           || ((this.findXstringOfValues(x,y,'NE',2,'cross') == true) && (this.findXstringOfValues(x,y,'SW',4,'cross') == true))
           || ((this.findXstringOfValues(x,y,'WW',2,'cross') == true) && (this.findXstringOfValues(x,y,'EE',4,'cross') == true))
           || ((this.findXstringOfValues(x,y,'NW',3,'cross') == true) && (this.findXstringOfValues(x,y,'SE',3,'cross') == true))
           || ((this.findXstringOfValues(x,y,'NN',3,'cross') == true) && (this.findXstringOfValues(x,y,'SS',3,'cross') == true))
           || ((this.findXstringOfValues(x,y,'NE',3,'cross') == true) && (this.findXstringOfValues(x,y,'SW',3,'cross') == true))
           || ((this.findXstringOfValues(x,y,'WW',3,'cross') == true) && (this.findXstringOfValues(x,y,'EE',3,'cross') == true))
         )
                                                                      {
                                                                        answer[0]=x;
                                                                        answer[1]=y;

                                                                        return answer;
                                                                      }
        };

        return answer;
      };

      this.findThreeFreeCrosses = function(){
        var answer = [-1,-1];
        for (var i = 0; i < this.arrayOfEmptySpaceAroundCrosses.length; i++) {
          var x = this.arrayOfEmptySpaceAroundCrosses[i][0];
          var y = this.arrayOfEmptySpaceAroundCrosses[i][1];

          if (((this.findXstringOfValuesPlusEmpty(x,y,'NW',4,'cross') == true) && (this.board[x+1][y+1][0] == 0))
           || ((this.findXstringOfValuesPlusEmpty(x,y,'NN',4,'cross') == true) && (this.board[x  ][y+1][0] == 0))
           || ((this.findXstringOfValuesPlusEmpty(x,y,'NE',4,'cross') == true) && (this.board[x-1][y+1][0] == 0))
           || ((this.findXstringOfValuesPlusEmpty(x,y,'EE',4,'cross') == true) && (this.board[x-1][y  ][0] == 0))
           || ((this.findXstringOfValuesPlusEmpty(x,y,'SE',4,'cross') == true) && (this.board[x-1][y-1][0] == 0))
           || ((this.findXstringOfValuesPlusEmpty(x,y,'SS',4,'cross') == true) && (this.board[x  ][y-1][0] == 0))
           || ((this.findXstringOfValuesPlusEmpty(x,y,'SW',4,'cross') == true) && (this.board[x+1][y-1][0] == 0))
           || ((this.findXstringOfValuesPlusEmpty(x,y,'WW',4,'cross') == true) && (this.board[x+1][y  ][0] == 0))
           || ((this.findXstringOfValuesPlusEmpty(x,y,'NW',3,'cross') == true) && (this.findXstringOfValuesPlusEmpty(x,y,'SE',2,'cross') == true))
           || ((this.findXstringOfValuesPlusEmpty(x,y,'NN',3,'cross') == true) && (this.findXstringOfValuesPlusEmpty(x,y,'SS',2,'cross') == true))
           || ((this.findXstringOfValuesPlusEmpty(x,y,'NE',3,'cross') == true) && (this.findXstringOfValuesPlusEmpty(x,y,'SW',2,'cross') == true))
           || ((this.findXstringOfValuesPlusEmpty(x,y,'EE',3,'cross') == true) && (this.findXstringOfValuesPlusEmpty(x,y,'WW',2,'cross') == true))
           || ((this.findXstringOfValuesPlusEmpty(x,y,'SE',3,'cross') == true) && (this.findXstringOfValuesPlusEmpty(x,y,'NW',2,'cross') == true))
           || ((this.findXstringOfValuesPlusEmpty(x,y,'SS',3,'cross') == true) && (this.findXstringOfValuesPlusEmpty(x,y,'NN',2,'cross') == true))
           || ((this.findXstringOfValuesPlusEmpty(x,y,'SW',3,'cross') == true) && (this.findXstringOfValuesPlusEmpty(x,y,'NE',2,'cross') == true))
           || ((this.findXstringOfValuesPlusEmpty(x,y,'WW',3,'cross') == true) && (this.findXstringOfValuesPlusEmpty(x,y,'EE',2,'cross') == true))

         )
                                                                      {
                                                                        answer[0]=x;
                                                                        answer[1]=y;
                                                                        return answer;
                                                                      }
        };
        //console.log('space aroud crosses', this.arrayOfEmptySpaceAroundCrosses);
        //console.log('no free three crosses',answer);
        return answer;
      };

      this.findThreeFreeCircles = function(){
        var answer = [-1,-1];
        for (var i = 0; i < this.arrayOfEmptySpaceAroundCircles.length; i++) {
          var x = this.arrayOfEmptySpaceAroundCircles[i][0];
          var y = this.arrayOfEmptySpaceAroundCircles[i][1];
          if (((this.findXstringOfValuesPlusEmpty(x,y,'NW',4,'circle') == true) && (this.board[x+1][y+1][0] == 0))
           || ((this.findXstringOfValuesPlusEmpty(x,y,'NN',4,'circle') == true) && (this.board[x  ][y+1][0] == 0))
           || ((this.findXstringOfValuesPlusEmpty(x,y,'NE',4,'circle') == true) && (this.board[x-1][y+1][0] == 0))
           || ((this.findXstringOfValuesPlusEmpty(x,y,'EE',4,'circle') == true) && (this.board[x-1][y  ][0] == 0))
           || ((this.findXstringOfValuesPlusEmpty(x,y,'SE',4,'circle') == true) && (this.board[x-1][y-1][0] == 0))
           || ((this.findXstringOfValuesPlusEmpty(x,y,'SS',4,'circle') == true) && (this.board[x  ][y-1][0] == 0))
           || ((this.findXstringOfValuesPlusEmpty(x,y,'SW',4,'circle') == true) && (this.board[x+1][y-1][0] == 0))
           || ((this.findXstringOfValuesPlusEmpty(x,y,'WW',4,'circle') == true) && (this.board[x+1][y  ][0] == 0))
           || ((this.findXstringOfValuesPlusEmpty(x,y,'NW',3,'circle') == true) && (this.findXstringOfValuesPlusEmpty(x,y,'SE',2,'circle') == true))
           || ((this.findXstringOfValuesPlusEmpty(x,y,'NN',3,'circle') == true) && (this.findXstringOfValuesPlusEmpty(x,y,'SS',2,'circle') == true))
           || ((this.findXstringOfValuesPlusEmpty(x,y,'NE',3,'circle') == true) && (this.findXstringOfValuesPlusEmpty(x,y,'SW',2,'circle') == true))
           || ((this.findXstringOfValuesPlusEmpty(x,y,'EE',3,'circle') == true) && (this.findXstringOfValuesPlusEmpty(x,y,'WW',2,'circle') == true))
           || ((this.findXstringOfValuesPlusEmpty(x,y,'SE',3,'circle') == true) && (this.findXstringOfValuesPlusEmpty(x,y,'NW',2,'circle') == true))
           || ((this.findXstringOfValuesPlusEmpty(x,y,'SS',3,'circle') == true) && (this.findXstringOfValuesPlusEmpty(x,y,'NN',2,'circle') == true))
           || ((this.findXstringOfValuesPlusEmpty(x,y,'SW',3,'circle') == true) && (this.findXstringOfValuesPlusEmpty(x,y,'NE',2,'circle') == true))
           || ((this.findXstringOfValuesPlusEmpty(x,y,'WW',3,'circle') == true) && (this.findXstringOfValuesPlusEmpty(x,y,'EE',2,'circle') == true))

         )
                                                                      {
                                                                        answer[0]=x;
                                                                        answer[1]=y;
                                                                        return answer;
                                                                      }
        };
        return answer;
      };

      this.findTwoAndTwoCrosses = function(){
        var answer = [-1,-1];
        for (var x = 4; x < this.size-5; x++) {
          for (var y = 4; y < this.size-5; y++) {
            if (this.board[x][y][0] == 0) {

            }
          }
        }
        return answer;
      };

      this.findTwoAndTwoCircles = function(){
        var answer = [-1,-1];
        return answer;
      };

      this.addToCircleArray = function(_x,_y){
       this.circleArray.push([_x,_y]);
      };
      this.addToCrossArray = function(_x,_y){
       this.crossArray.push([_x,_y]);
      };

      function arrInArr(arr, innerArr){
        var flag = 0;
        for (var i = 0; i < arr.length; i++) {
          flag = 1;
          for (var j = 0; j < innerArr.length; j++) {
            if (arr[i][j] != innerArr[j]) flag = 0;
          };
          if (flag == 1) return 1;
        };
        return -1;
      };

      this.setArrayOfEmptySpaceAroundCircles = function(){
        //console.log(this.circleArray);
        this.arrayOfEmptySpaceAroundCircles = [];
        for (var i = 0; i < this.circleArray.length; i++) {
          var x = this.circleArray[i][0];
          var y = this.circleArray[i][1];
          //console.log(x,y);
          //console.log(this.board[x-1][y-1]);
          //console.log(this.arrayOfEmptySpaceAroundCircles.indexOf([x-1,y-1]));

          if ((x>4) && (y>4) &&                     (this.board[x-1][y-1][0] == 0) && (arrInArr(this.arrayOfEmptySpaceAroundCircles,[x-1,y-1]) < 0)) this.arrayOfEmptySpaceAroundCircles.push([x-1,y-1]);
          if ((y>4) &&                              (this.board[x  ][y-1][0] == 0) && (arrInArr(this.arrayOfEmptySpaceAroundCircles,[x,y-1])   < 0)) this.arrayOfEmptySpaceAroundCircles.push([x,y-1]);
          if ((x<this.size-4) && (y>4) &&           (this.board[x+1][y-1][0] == 0) && (arrInArr(this.arrayOfEmptySpaceAroundCircles,[x+1,y-1]) < 0)) this.arrayOfEmptySpaceAroundCircles.push([x+1,y-1]);
          if ((x<this.size-4) &&                    (this.board[x+1][y  ][0] == 0) && (arrInArr(this.arrayOfEmptySpaceAroundCircles,[x+1,y])   < 0)) this.arrayOfEmptySpaceAroundCircles.push([x+1,y]);
          if ((x<this.size-4) && (y<this.size-4) && (this.board[x+1][y+1][0] == 0) && (arrInArr(this.arrayOfEmptySpaceAroundCircles,[x+1,y+1]) < 0)) this.arrayOfEmptySpaceAroundCircles.push([x+1,y+1]);
          if ((y<this.size-4) &&                    (this.board[x  ][y+1][0] == 0) && (arrInArr(this.arrayOfEmptySpaceAroundCircles,[x,y+1])   < 0)) this.arrayOfEmptySpaceAroundCircles.push([x,y+1]);
          if ((x>4) && (y<this.size-4) &&           (this.board[x-1][y+1][0] == 0) && (arrInArr(this.arrayOfEmptySpaceAroundCircles,[x-1,y+1]) < 0)) this.arrayOfEmptySpaceAroundCircles.push([x-1,y+1]);
          if ((x>4) &&                              (this.board[x-1][y  ][0] == 0) && (arrInArr(this.arrayOfEmptySpaceAroundCircles,[x-1,y])   < 0)) this.arrayOfEmptySpaceAroundCircles.push([x-1,y]);

        };
        //console.log('arrayOfEmptySpaceAroundCircles:', this.arrayOfEmptySpaceAroundCircles);
      };

      this.setArrayOfEmptySpaceAroundCrosses = function(){

        this.arrayOfEmptySpaceAroundCrosses = [];
        for (var i = 0; i < this.crossArray.length; i++) {
          var x = this.crossArray[i][0];
          var y = this.crossArray[i][1];

          if ((x>4) && (y>4) && (this.board[x-1][y-1][0] == 0) && (arrInArr(this.arrayOfEmptySpaceAroundCrosses,[x-1,y-1]) < 0)) this.arrayOfEmptySpaceAroundCrosses.push([x-1,y-1]);
          if ((y>4) &&(this.board[x  ][y-1][0]   == 0) && (arrInArr(this.arrayOfEmptySpaceAroundCrosses,[x,y-1])   < 0)) this.arrayOfEmptySpaceAroundCrosses.push([x,y-1]);
          if ((x<this.size-4) && (y>4) &&(this.board[x+1][y-1][0] == 0) && (arrInArr(this.arrayOfEmptySpaceAroundCrosses,[x+1,y-1]) < 0)) this.arrayOfEmptySpaceAroundCrosses.push([x+1,y-1]);
          if ((x<this.size-4) &&(this.board[x+1][y  ][0]   == 0) && (arrInArr(this.arrayOfEmptySpaceAroundCrosses,[x+1,y])   < 0)) this.arrayOfEmptySpaceAroundCrosses.push([x+1,y]);
          if ((x<this.size-4) && (y<this.size-4) &&(this.board[x+1][y+1][0] == 0) && (arrInArr(this.arrayOfEmptySpaceAroundCrosses,[x+1,y+1]) < 0)) this.arrayOfEmptySpaceAroundCrosses.push([x+1,y+1]);
          if ((y<this.size-4) &&(this.board[x  ][y+1][0]   == 0) && (arrInArr(this.arrayOfEmptySpaceAroundCrosses,[x,y+1])   < 0)) this.arrayOfEmptySpaceAroundCrosses.push([x,y+1]);
          if ((x>4) && (y<this.size-4) &&(this.board[x-1][y+1][0] == 0) && (arrInArr(this.arrayOfEmptySpaceAroundCrosses,[x-1,y+1]) < 0)) this.arrayOfEmptySpaceAroundCrosses.push([x-1,y+1]);
          if ((x>4) &&(this.board[x-1][y  ][0]   == 0) && (arrInArr(this.arrayOfEmptySpaceAroundCrosses,[x-1,y])   < 0)) this.arrayOfEmptySpaceAroundCrosses.push([x-1,y]);
        };
      };

      this.set_Circle = function( _x , _y ){
        this.board[_x][_y][0] = 1;
        this.$board.find('div').eq( _x + _y * this.size).addClass('circle').removeClass('empty');
        this.addToCircleArray(_x,_y);
        this.setArrayOfEmptySpaceAroundCircles();
      };
      this.set_Cross = function( _x , _y ){
        this.board[_x][_y][0] = -1;
        this.$board.find('div').eq( _x + _y * this.size).addClass('cross').removeClass('empty');
        this.addToCrossArray(_x,_y);
        this.setArrayOfEmptySpaceAroundCrosses();
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
        var game = this;
        this.$board = $(_element);
        this.$board.empty();
        var cell;
        for (var y = 0; y < this.size; y++) {
          for (var x = 0; x < this.size; x++) {
            if ((x < 4) || (y < 4) || (x > this.size-5) || (y > this.size-5))
                {
                  cell = $("<div class='cell empty noactive' data-x="+x+" data-y="+y+"></div>");
                }
            else
                {
                  cell = $("<div class='cell empty active' data-x="+x+" data-y="+y+"></div>");
                };
            this.$board.append(cell);
          };
        };

        // function twoSec(){};
        // var delay = setTimeout(twoSec, 4000);

        $('.cell.active').on('click',function(){
          if (gameOn == true) {

                      if ((player == 'circle') && ($(this).hasClass('empty') == true)) {

                                    // $(this).addClass('circle').removeClass('empty');
                                    //console.log('player circle empty');
                                    game.set_Circle($(this).data('x'),$(this).data('y'));
                                    game.setArrayOfEmptySpaceAroundCrosses();
                                    game.fillPowerArr();
                                    game.showPowerArr();


                                    if (game.findFiveCircles() == true) {
                                      //console.log('KONIEC: 5 kółek!');
                                      winner = 'circles';
                                      gameOn = false;
                                      $('#info img').show();

                                    };



                                    // cross answer

                                    var x_answer = 0;
                                    var y_answer = 0;
                                    if (gameOn == true) {
                                                                  var answer = game.findFourCrosses();
                                                                  if (answer[0] > -1) {
                                                                    x_answer = answer[0];
                                                                    y_answer = answer[1];
                                                                  } else {
                                                                    answer = game.findFourCircles();
                                                                    if (answer[0] > -1) {
                                                                      x_answer = answer[0];
                                                                      y_answer = answer[1];
                                                                    } else {
                                                                      answer = game.findThreeFreeCrosses();
                                                                      if (answer[0] > -1) {
                                                                        x_answer = answer[0];
                                                                        y_answer = answer[1];
                                                                      } else {
                                                                        answer = game.findThreeFreeCircles();
                                                                        if (answer[0] > -1) {
                                                                          x_answer = answer[0];
                                                                          y_answer = answer[1];
                                                                        } else {
                                                                          answer = game.findTwoAndTwoCrosses();
                                                                          if (answer[0] > -1) {
                                                                            x_answer = answer[0];
                                                                            y_answer = answer[1];
                                                                          } else {
                                                                            answer = game.findTwoAndTwoCircles();
                                                                            if (answer[0] > -1) {
                                                                              x_answer = answer[0];
                                                                              y_answer = answer[1];
                                                                            } else {
                                                                              x_answer = game.$board.find('.maxPower').eq(0).data('x');
                                                                              y_answer = game.$board.find('.maxPower').eq(0).data('y');
                                                                            };
                                                                          };
                                                                        }
                                                                      };
                                                                    }
                                                                  };



                                                                  game.set_Cross(x_answer,y_answer);

                                                                  if (game.findFiveCrosses() == true) {
                                                                    //console.log('KONIEC: 5 krzyżyków!');
                                                                    winner = 'crosses';
                                                                    gameOn = false;
                                                                    // $('#info').html('<h2>X wins!</h2>');
                                                                    $('#info img').show();
                                                                  };
                                    };



                      }
                      else if ((player == 'circle') && ($(this).hasClass('circle') == true)) {

                                    // game.remove_Circle($(this).data('x'),$(this).data('y'));
                                    // game.fillPowerArr();
                                    // game.showPowerArr();

                      }
                      else if ((player == 'cross') && ($(this).hasClass('empty') == true)) {

                                    // $(this).addClass('cross').removeClass('empty');
                                    // game.set_Cross($(this).data('x'),$(this).data('y'));

                      }
                      else if ((player == 'cross') && ($(this).hasClass('cross') == true)) {

                                    // game.remove_Cross($(this).data('x'),$(this).data('y'));

                      };


          }; // if gameOn
        });

      };

      this.clearPowerArr = function(){
        for (var i = 0; i < this.size; i++) {
            for (var j = 0; j < this.size; j++) {
              this.$board.find('div').eq( i + j * this.size).removeClass('maxPower');
              this.board[i][j][1] = 0;
            };
        };
      };

      this.fillPowerArr = function(){
          this.clearPowerArr();
          for (var i = 0; i < this.size; i++) {
              for (var j = 0; j < this.size; j++) {
                if (this.board[i][j][0] == 1) {
                  //console.log('fillPower i=',i," j=",j);
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
        if ((_x < 4) || (_y < 4) || (_x > this.size-5) || (_y > this.size-5)) return;
        switch(true) {
              case (_direction == 'NN'):
              //console.log('NN',this.board[ _x ][ _y-1 ][0]);
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
              //to show power of position
              //this.$board.find("[data-x='"+i+"'][data-y='"+j+"']").text(this.board[i][j][1]);
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
