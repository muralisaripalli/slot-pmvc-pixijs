/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc
 * @class       GameConfigVO
 */
puremvc.define(
    {
        name: 'slot.model.vo.GameConfigVO'
    },

    // INSTANCE MEMBERS
    {
        numReels: 5,
        numRows: 3,
        numSymbols: 8,
        numLines: 5,
        reels:
            [
                [1,5,2,1,6,5,8,5,1,2,3,7,4,5,8,1,4,3,2,5,6],
                [5,1,6,3,7,8,1,3,2,4,6,8,5,4,5,3,8,7,5,4,1,7,4,8,4],
                [8,4,1,3,2,6,7,2,3,4,1,5,6,7,8,2,5,4,3,1,2,7,6,7,1,4,3,2,4],
                [1,7,4,2,3,8,4,3,2,5,6,7,2,3,4,5,8,1,2,6,2,4,2,6,3,7,8,4,6,2,3,1,2,5,6,3,4],
                [8,5,1]
            ],
        paytable:
        {
            "s1":
            {
                "3oak": 250,
                "4oak": 500,
                "5oak": 1000
            },
            "s2":
            {
                "3oak": 200,
                "4oak": 450,
                "5oak": 800
            },
            "s3":
            {
                "3oak": 150,
                "4oak": 400,
                "5oak": 700
            },
            "s4":
            {
                "3oak": 100,
                "4oak": 350,
                "5oak": 600
            },
            "s5":
            {
                "3oak": 90,
                "4oak": 300,
                "5oak": 700
            },
            "s6":
            {
                "3oak": 80,
                "4oak": 250,
                "5oak": 600
            },
            "s7":
            {
                "3oak": 70,
                "4oak": 200,
                "5oak": 500
            },
            "s8":
            {
                "3oak": 60,
                "4oak": 100,
                "5oak": 400
            }
        },
        denominations:
            [
                0.25, 0.50, 1, 2, 5, 10
            ],
        defaultDenomination: 2,
        lines:
            [
                [1, 1, 1, 1, 1],
                [0, 0, 0, 0, 0],
                [2, 2, 2, 2, 2],
                [0, 1, 2, 1, 0],
                [2, 1, 0, 1, 2]
            ],

        // Returns array with all possible symbols
        getSymbols: function(){
            var symbols = [];
            for(var i = 1; i <= this.numSymbols; i++){
                symbols.push("s" + i);
            }
            return symbols;
        }
    },

    // STATIC MEMBERS
    {
        NAME: "GameConfigVO"
    }
);
