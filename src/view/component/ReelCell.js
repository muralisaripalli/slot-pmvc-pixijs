/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc
 * @class       ReelCell
 */
puremvc.define(
    {
        name: 'slot.view.component.ReelCell',
        constructor: function () {
            this.stage = new PIXI.Container();
        }
    },

    // INSTANCE MEMBERS
    {
        // Stage Members
        stage: null,
        symbol: null,
        highlight: null,

        symbolID: null,

        // All possible symbols
        numSymbols: null,
        symbols: null,

        init: function (data) {
            this.numSymbols = data.gameConfigVO.numSymbols;
            this.symbols = data.gameConfigVO.getSymbols();

            // Yellow rounded rectangle strip behind each reel
            this.highlight = new PIXI.Graphics();
            this.highlight.beginFill(data.uiConfigVO.reelHighlightColor);
            this.highlight.drawRoundedRect(0, 0, data.uiConfigVO.symbolWidth, data.uiConfigVO.symbolHeight, 10);
            this.highlight.alpha = 0.7;
            this.stage.addChild(this.highlight);
            this.highlight.visible = false;
        },

        updateSymbol: function(symbolID){
            this.symbolID = symbolID;
            this.removeSymbol();
            this.symbol = new PIXI.Sprite(PIXI.Texture.fromFrame(symbolID));
            this.stage.addChild(this.symbol);
        },

        updateWithRandomSymbol: function(){
            this.updateSymbol(this.symbols[Math.floor(Math.random() * this.numSymbols)]);
        },

        removeSymbol: function(){
            if(this.symbol){
                this.stage.removeChild(this.symbol);
            }
        },

        handleResize: function () {
        }
    },

    // STATIC MEMBERS
    {
        NAME: 'ReelCell'
    }
);
