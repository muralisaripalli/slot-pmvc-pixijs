/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc
 * @class       Panel
 */
puremvc.define(
    {
        name: 'slot.view.component.Panel',
        constructor: function () {
            this.stage = new PIXI.Container();
        }
    },

    // INSTANCE MEMBERS
    {
        // Stage Members
        stage: null,

        spin: null,
        btnSpin: null,

        win: null,
        txtWin: null,

        balance: null,
        txtBalance: null,

        bet: null,
        btnBetPlus: null,
        btnBetMinus: null,
        txtBet: null,
        betAmount: null,

        currency: null,
        denominations: null,
        currentDenomination: null,

        respScale: null,

        init: function (data) {
            this.currency = data.uiConfigVO.currency;
            this.respScale = data.uiConfigVO.responsiveScale;

            this.denominations = data.gameConfigVO.denominations;
            this.currentDenomination = data.gameConfigVO.defaultDenomination;

            this.addChildren();
            this.setupView(data.windowSizeVO);

            PXRoot.addChild(this.stage);
        },

        addChildren: function(){
            // Spin component
            this.spin = new PIXI.Container();
            this.spin.addChild(new PIXI.Sprite(PIXI.Texture.fromFrame("spin_disabled")));
            this.spin.addChild(this.btnSpin = new PIXI.Sprite(PIXI.Texture.fromFrame("spin")));
            this.stage.addChild(this.spin);

            // Win component ==>
            this.win = new PIXI.Container();
            this.win.addChild(new PIXI.Sprite(PIXI.Texture.fromFrame("win")));

            this.txtWin = new PIXI.Text();
            this.txtWin.style = {fontSize: 30, align: 'center'};
            this.txtWin.anchor.set(0.5, 0.5);
            this.txtWin.x = 100;
            this.txtWin.y = 52;

            this.win.addChild(this.txtWin);

            this.stage.addChild(this.win);
            // Win component <==

            // Balance component ==>
            this.balance = new PIXI.Container();
            this.balance.addChild(new PIXI.Sprite(PIXI.Texture.fromFrame("balance")));

            this.txtBalance = new PIXI.Text();
            this.txtBalance.style = {fontSize: 30, align: 'center'};
            this.txtBalance.anchor.set(0.5, 0.5);
            this.txtBalance.x = 100;
            this.txtBalance.y = 52;
            this.balance.addChild(this.txtBalance);

            this.stage.addChild(this.balance);
            // <== Balance component

            // Bet component ===>
            this.bet = new PIXI.Container();
            this.bet.addChild(new PIXI.Sprite(PIXI.Texture.fromFrame("bet_minus_disabled")));
            this.bet.addChild(this.btnBetMinus = new PIXI.Sprite(PIXI.Texture.fromFrame("bet_minus")));
            var betSprite = new PIXI.Sprite(PIXI.Texture.fromFrame("bet"));
            betSprite.x += this.btnBetMinus.width + 2;
            this.bet.addChild(betSprite);
            var betPlusDSprite = new PIXI.Sprite(PIXI.Texture.fromFrame("bet_plus_disabled"));
            betPlusDSprite.x = betSprite.x + betSprite.width + 2;
            this.bet.addChild(betPlusDSprite);
            this.bet.addChild(this.btnBetPlus = new PIXI.Sprite(PIXI.Texture.fromFrame("bet_plus")));
            this.btnBetPlus.x = betPlusDSprite.x;

            this.txtBet = new PIXI.Text();
            this.txtBet.style = {fontSize: 30, align: 'center'};
            this.txtBet.anchor.set(0.5, 0.5);
            this.txtBet.x = betSprite.x + 68;
            this.txtBet.y = betSprite.y + 52;
            this.bet.addChild(this.txtBet);

            this.stage.addChild(this.bet);
            // <=== Bet component

            // Buttons
            this.btnSpin.interactive = true;
            this.btnSpin.on(slot.view.event.ViewEvents.CLICK, this.onSpinClick.bind(this));
            this.btnBetMinus.interactive = true;
            this.btnBetMinus.on(slot.view.event.ViewEvents.CLICK, this.onBetMinusClick.bind(this));
            this.btnBetPlus.interactive = true;
            this.btnBetPlus.on(slot.view.event.ViewEvents.CLICK, this.onBetPlusClick.bind(this));
            this.disableBet();
            this.disableSpin();

            // Initial values
            this.updateBet();

            this.resTxt = new PIXI.Text();
            this.resTxt.style = {fontSize: 15, align: 'left', wordwrap: true,stroke:0xFFFFFF,strokeThickness:2};
            PXRoot.addChild(this.resTxt);
        },

        setupView: function(windowSizeVO){
            // Scaling and positioning as per responsive scale
            var components = ["spin","win","balance","bet"];
            var len = components.length;
            var fitContentOnScreen = new slot.model.lib.Utils().fitContentOnScreen;
            for(var i = 0; i < len; i++) {
                var comp = components[i];
                var scale = this.respScale[comp];
                fitContentOnScreen(
                    {
                        content: this[comp],
                        screen: {
                            x: windowSizeVO.width * scale.x,
                            y: windowSizeVO.height * scale.y,
                            width: windowSizeVO.width * scale.w,
                            height: windowSizeVO.height * scale.h
                        }
                    }
                );
            }
            this.resTxt.text = windowSizeVO.width + "x" + windowSizeVO.height +"\n";
        },

        updateBalance: function(balance){
            this.txtBalance.text = this.currency + balance.toFixed(2);
        },

        updateWin: function(win){
            this.txtWin.text = this.currency + win.toFixed(2);
        },

        updateBet: function(){
            this.txtBet.text = this.currency + this.denominations[this.currentDenomination].toFixed(2);
            this.betAmount = this.denominations[this.currentDenomination];
        },

        increaseBet: function(){
            if(this.currentDenomination < this.denominations.length - 1){
                this.currentDenomination++;
                this.updateBet();
                this.validateBetButtons();
            }
        },

        decreaseBet: function(){
            if(this.currentDenomination > 0){
                this.currentDenomination--;
                this.updateBet();
                this.validateBetButtons();
            }
        },

        validateBetButtons: function(){
            if(this.currentDenomination === this.denominations.length - 1){
                this.disableBetPlus();
            }else{
                this.enableBetPlus();
            }

            if(this.currentDenomination === 0){
                this.disableBetMinus();
            }else{
                this.enableBetMinus();
            }
        },

        disableSpin: function(){
            this.btnSpin.visible = false;
        },

        enableSpin: function(){
            this.btnSpin.visible = true;
        },

        disableBet: function(){
            this.disableBetPlus();
            this.disableBetMinus();
        },
        enableBet: function(){
            this.validateBetButtons();
        },

        disableBetPlus: function(){
            this.btnBetPlus.visible = false;
        },

        enableBetPlus: function(){
            this.btnBetPlus.visible = true;
        },

        disableBetMinus: function(){
            this.btnBetMinus.visible = false;
        },

        enableBetMinus: function(){
            this.btnBetMinus.visible = true;
        },

        // Event Handlers
        onSpinClick: function(evt){
            this.disableSpin();
            this.disableBet();
            this.txtWin.text = "";
            this.stage.emit(slot.view.event.ViewEvents.SPIN_CLICK, this.betAmount);
        },

        onBetMinusClick: function(evt){
            this.decreaseBet();
            this.stage.emit(slot.view.event.ViewEvents.BET_CLICK);
        },

        onBetPlusClick: function(evt){
            this.increaseBet();
            this.stage.emit(slot.view.event.ViewEvents.BET_CLICK);
        },

        handleResize: function (windowSizeVO) {
            this.setupView(windowSizeVO);
        }
    },

    // STATIC MEMBERS
    {
        NAME: 'Panel'
    }
);
