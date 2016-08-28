/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc
 * @class       ServerService
 */
puremvc.define(
    {
        name: 'slot.model.proxy.service.ServerService'
    },

    // INSTANCE MEMBERS
    {
        callback: null,

        loadSpinResult: function (callback) {
            this.callback = callback;
            setTimeout(this.sendSpinResult.bind(this), 1000);
        },

        sendSpinResult: function(){
            var result = {};

            result.matrix =
                [
                    [
                        this.rSymbol(),
                        this.rSymbol(),
                        this.rSymbol()
                    ],
                    [
                        this.rSymbol(),
                        this.rSymbol(),
                        this.rSymbol()
                    ],
                    [
                        this.rSymbol(),
                        this.rSymbol(),
                        this.rSymbol()
                    ],
                    [
                        this.rSymbol(),
                        this.rSymbol(),
                        this.rSymbol()
                    ],
                    [
                        this.rSymbol(),
                        this.rSymbol(),
                        this.rSymbol()
                    ]
                ];
            result.balance = Math.random() * 1000;
            result.totalWin = Math.random() * 100;

            var ar = [0,1,2,3,4];
            this.shuffle(ar);

            result.numWins = Math.ceil(Math.random() * 5);
            result.wins =[];
            for(var i= 0;i<result.numWins;i++){
                result.wins.push(
                    {
                        lineNumber: ar[i],
                        lineWin: Math.random() * 100,
                        winningCells: this.createWinningCellsArray()
                    }
                );
            }
            result.wins.sort(function(a, b) {
                if (a.lineNumber < b.lineNumber) {
                    return -1;
                } else {
                    return 1;
                }
            });
            this.callback(result);
        },

        shuffle: function(a) {
            var j, x, i;
            for (i = a.length; i; i--) {
                j = Math.floor(Math.random() * i);
                x = a[i - 1];
                a[i - 1] = a[j];
                a[j] = x;
            }
        },

        createWinningCellsArray: function () {
            var ar = [];
            var n = Math.ceil(Math.random() * 3) + 2;
            for(var i = 0;i<n;i++){
                ar.push(1);
            }
            return ar;
        },

        sampleWins:
            [
                {lineNumber: 0, winAmount: Math.random() * 100, winningCells: [1,1,1]},
                {lineNumber: 3, winAmount: Math.random() * 100, winningCells: [1,1,1,1]},
                {lineNumber: 3, winAmount: Math.random() * 100, winningCells: [1,1,1]},
            ],

        rSymbol: function(){
            //return 2;
            return Math.ceil(Math.random() * 8);
        }

    },

    // STATIC MEMBERS
    {
        NAME: "ServerService"
    }
);
