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
        balance: null,

        init: function (callback) {
            this.betAmount = 0;
            this.deposit();
            this.callback = callback;
            setTimeout(this.sendSpinResult.bind(this), 500);
        },
        deposit: function(){
            this.balance = (Math.random() * 500) + 500;
        },

        loadSpinResult: function (betAmount, callback) {
            this.betAmount = betAmount;
            this.balance -= this.betAmount;
            if(this.balance < this.gameConfigVO.denominations[this.gameConfigVO.denominations.length - 1]){
                this.deposit();
            }
            this.callback = callback;
            setTimeout(this.sendSpinResult.bind(this), 1000);
        },

        sendSpinResult: function(){
            this.callback(this.calculateSpinResult());
        },

        /**
         * Returns full spin result
         * @returns {Array}
         */
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
            reelMatrix = this.forceResult(reelMatrix);
            var lineSymbols = this.getLineSymbols(reelMatrix);

            var wins = this.getWins(lineSymbols);

            result.matrix = reelMatrix;
            result.numWins = wins.length;
            result.totalWin = wins.reduce(function(pv, cv){
                return pv + cv.winAmount;
            }, 0);
            result.wins = wins;

            this.balance += result.totalWin;
            result.balance = this.balance;

            return result;
        },

        /**
         * Returns reel symbols circularly if reel stops at the end
         * @param reel
         * @param pos
         * @returns {*}
         */
        getSymbolAt: function(reel, pos){
            if(pos > reel.length - 1){
                return reel[pos - reel.length];
            }else{
                return reel[pos];
            }
        },

        /**
         * Takes reel output matrix and creates an array with line results
         * @param matrix
         * @returns {Array}
         */
        getLineSymbols: function(matrix){
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

        /**
         * Takes result of each line and looks for winning combinations
         * Calculates wins if winning combination exist
         * @param lineSymbols
         * @returns {Array}
         */
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
        },

        // Forces result for testig during development
        forceResult: function(matrix){
            return matrix;
            //matrix = [[1,2,3],[1,2,3],[1,2,3],[1,2,3],[1,2,3]];
            //matrix = [[4,5,6],[4,5,6],[4,5,6],[4,5,6],[4,5,6]];
            //matrix = [[7,8,1],[7,8,2],[7,8,3],[7,8,4],[7,8,5]];
            //return matrix;
        }

    },

    // STATIC MEMBERS
    {
        NAME: "ServerService"
    }
);