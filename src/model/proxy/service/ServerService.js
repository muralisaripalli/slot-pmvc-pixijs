/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc
 * @class       ServerService
 */
puremvc.define(
    {
        name: 'slot.model.proxy.service.ServerService',
        constructor: function(){
            this.gameConfigVO = new slot.model.vo.GameConfigVO();
        }
    },

    // INSTANCE MEMBERS
    {
        callback: null,
        gameConfigVO: null,
        betAmount: null,

        loadSpinResult: function (callback) {
            this.betAmount = 1;
            this.callback = callback;
            setTimeout(this.sendSpinResult.bind(this), 1000);
        },

        sendSpinResult: function(){
            this.callback(this.calculateSpinResult());
        },

        calculateSpinResult: function(){
            var result = [];
            var reels = this.gameConfigVO.reels;
            var reelMatrix = [];
            for (var i=0; i<this.gameConfigVO.numReels; i++) {
                var reelStopPos = Math.floor(Math.random() * reels[i].length);
                reelMatrix[i] = [];
                for(var j = 0; j < this.gameConfigVO.numRows; j++){
                    reelMatrix[i][j] = this.getSymbolAt(reels[i], reelStopPos + j);
                }
            }
            var lineSymbols = this.getLineStrings(reelMatrix);

            var wins = this.getWins(lineSymbols);

            result.matrix = reelMatrix;
            result.balance = 1000;
            result.numWins = wins.length;
            result.totalWin = wins.reduce(function(pv, cv){
                return pv + cv.winAmount;
            }, 0);
            result.wins = wins;

            return result;
        },

        getSymbolAt: function(reel, pos){
            if(pos > reel.length - 1){
                return reel[pos - reel.length];
            }else{
                return reel[pos];
            }
        },

        getLineStrings: function(matrix){
            var lines = this.gameConfigVO.lines;
            var lineSymbols = [];
            for(var i = 0; i < this.gameConfigVO.numLines; i++){
                lineSymbols[i] = [];
                for(var j = 0; j < this.gameConfigVO.numReels; j++){
                    lineSymbols[i][j] = matrix[j][lines[i][j]];
                }
            }
            return lineSymbols;
        },

        getWins: function(lineSymbols){
            var wins = [];
            for(var i = 0; i < this.gameConfigVO.numLines; i++){
                var oak = 1;
                for(var j = 1; j < this.gameConfigVO.numReels; j++){
                    if(lineSymbols[i][j] == lineSymbols[i][j-1]){
                        oak++;
                    }else{
                        break;
                    }
                }
                if(oak >= this.gameConfigVO.minOak) {
                    var winningSymbol = lineSymbols[i][0];
                    wins.push(
                        {
                            lineNumber: i,
                            oak: oak,
                            symbol: winningSymbol,
                            winAmount: this.gameConfigVO.paytable[winningSymbol][oak] * this.betAmount
                        }
                    );
                }
            }
            return wins;
        }

    },

    // STATIC MEMBERS
    {
        NAME: "ServerService"
    }
);