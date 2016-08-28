/*Generated on:Mon Aug 29 2016 04:09:35 GMT+1000 (AUS Eastern Standard Time)*//**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc
 * @class       AppConstants
 */
puremvc.define(
    {
        name: "slot.AppConstants"
    },

    {},

    // STATIC MEMBERS
    {
        // The multiton key for this app's single core
        CORE_NAME:              'SlotGame',

        // Notifications
        STARTUP:                    "AppConstants_startup",

        // ===
        ASSETS_LOADED:              "AppConstants_assets_loaded",
        WINDOW_RESIZED:             "AppConstants_window_resized",
        SERVER_INIT:                "AppConstants_server_init",
        SPIN:                       "AppConstants_spin",
        SPIN_RESULT:                "AppConstants_spin_result",
        SPIN_END:                   "AppConstants_spin_end",

        START_WIN_ANNOUNCEMENTS:    "AppConstants_start_win_announcements",
        STOP_WIN_ANNOUNCEMENTS:     "AppConstants_stop_win_announcements",
        WIN_ANNOUNCEMENT:           "AppConstants_win_announcement",
        CLEAR_WIN_ANNOUNCEMENT:     "AppConstants_clear_win_announcement",

        BET_UPDATED:                "AppConstants_bet_updated"
    }
);
/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc
 * @class       ORIENTATION
 */
puremvc.define(
    {
        name: 'slot.model.enum.ORIENTATION'
    },

    // INSTANCE MEMBERS
    {},

    // STATIC MEMBERS
    {
        NAME: "ORIENTATION",
        LANDSCAPE: "landscape",
        PORTRAIT: "portrait"
    }
);

/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc
 * @class       Utils
 */
puremvc.define(
    {
        name: 'slot.model.lib.Utils'
    },

    // INSTANCE MEMBERS
    {
        fitContentOnScreen: function(o){
            var content = o.content;
            var contentDimensions = o.contentDimensions || o.content;

            var size = slot.model.lib.Utils.getSizeToFitScreen(
                contentDimensions,
                {
                    width: o.screen.width,
                    height: o.screen.height
                }
            );
            content.x = o.screen.x + ((o.screen.width - size.width)/2);
            content.y = o.screen.y + ((o.screen.height - size.height)/2);
            content.width = size.width;
            content.height = size.height;
        }

    },

    // STATIC MEMBERS
    {
        NAME: "Utils",

        getOrientation: function(width, height){
            return  (width > height) ?
                        slot.model.enum.ORIENTATION.LANDSCAPE:
                        slot.model.enum.ORIENTATION.PORTRAIT;
        },

        getSizeToFillScreen: function(content, screen){
            if((screen.width/screen.height) > (content.width/content.height)){
                return  {
                            width: screen.width,
                            height: content.height * (screen.width/content.width)
                        };
            }
            else{
                return  {
                    width: content.width * (screen.height/content.height),
                    height: screen.height
                };
            }
        },

        /**
         * Fit given content into a given screen withhout disturbing the aspect ratio
         * of the content.
         * @param {Object} fitObj - Object with data to apply fit
         * @param {Object}
         */
        getSizeToFitScreen: function(content, screen){
            if((screen.width/screen.height) > (content.width/content.height)){
                return  {
                    width: content.width * (screen.height/content.height),
                    height: screen.height
                };
            }
            else{
                return  {
                    width: screen.width,
                    height: content.height * (screen.width/content.width)
                };
            }
        },

        toggleFullScreen: function() {
            var doc = window.document;
            var docEl = doc.documentElement;

            var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
            var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

            if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
                requestFullScreen.call(docEl);
            }
            else {
                cancelFullScreen.call(doc);
            }
        }
    }
);

/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc
 * @class       ConfigProxy
 */
puremvc.define(
    {
        name: 'slot.model.proxy.ConfigProxy',
        parent: puremvc.Proxy
    },

    // INSTANCE MEMBERS
    {
        // Data
        gameConfigVO: null,
        uiConfigVO: null,

        onRegister: function () {
            this.gameConfigVO = new slot.model.vo.GameConfigVO();
            this.uiConfigVO = new slot.model.vo.UIConfigVO();
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ConfigProxy"
    }
);

/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc
 * @class       LoaderProxy
 */
puremvc.define(
    {
        name: 'slot.model.proxy.LoaderProxy',
        parent: puremvc.Proxy
    },

    // INSTANCE MEMBERS
    {
        loader: null,
        sound: null,

        graphicsLoaded: null,
        soundsLoaded: null,

        onRegister: function(){
        },

        loadAssets: function() {
            this.loader = new PIXI.loaders.Loader("",3);
            this.loader
                .add('assets/spritesheet.json')
                .load(this.onGraphicsLoadComplete.bind(this));

            //this.loader.add('bg', 'assets/background.jpg');
            //
            //this.loader.add('s1', 'assets/snowflake.png');
            //this.loader.add('s2', 'assets/sun.png');
            //this.loader.add('s3', 'assets/sandglass.png');
            //this.loader.add('s4', 'assets/victory.png');
            //this.loader.add('s5', 'assets/a.png');
            //this.loader.add('s6', 'assets/k.png');
            //this.loader.add('s7', 'assets/q.png');
            //this.loader.add('s8', 'assets/j.png');
            //
            //this.loader.add('spin', 'assets/spin.png');
            //this.loader.add('spin_disabled', 'assets/spin_disabled.png');
            //
            //this.loader.add('win', 'assets/win.png');
            //this.loader.add('balance', 'assets/balance.png');

            //this.loader.add('bet', 'assets/bet.png');
            //this.loader.add('bet_minus', 'assets/bet_minus.png');
            //this.loader.add('bet_minus_disabled', 'assets/bet_minus_disabled.png');
            //this.loader.add('bet_plus', 'assets/bet_plus.png');
            //this.loader.add('bet_plus_disabled', 'assets/bet_plus_disabled.png');

            //this.loader.on("progress", this.onGraphicsLoadProgress.bind(this));
            //this.loader.load(this.onGraphicsLoadComplete.bind(this));

            this.sound = new Howl({
                src: ["assets/sounds.mp3"],
                sprite: {
                    bet: [0, 370],
                    spin: [370, 220],
                    win_s1: [3940, 1200],
                    win_s2: [590, 1400],
                    win_s3: [5980, 1060],
                    win_s4: [2110, 1630],
                    win_royal: [7040, 720]
                }
            });

            this.sound.on("load", this.onSoundsLoadComplete.bind(this))
        },

        onSoundsLoadComplete: function(){
            this.soundsLoaded = true;
            this.sendAssetsLoadedNote();
        },

        onGraphicsLoadComplete: function(){
            this.graphicsLoaded = true;
            this.sendAssetsLoadedNote();
        },

        sendAssetsLoadedNote: function(){
            if(this.graphicsLoaded && this.soundsLoaded) {
                this.sendNotification(
                    slot.AppConstants.ASSETS_LOADED,
                    this.sound
                );
            }
        },

        onGraphicsLoadProgress: function(loader, file){
        }
    },

    // STATIC MEMBERS
    {
        NAME: "LoaderProxy"
    }
);
/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc
 * @class       ServerProxy
 */
puremvc.define(
    {
        name: 'slot.model.proxy.ServerProxy',
        parent: puremvc.Proxy
    },

    // INSTANCE MEMBERS
    {
        // Data
        resultVO: null,

        // Services
        server: null,

        onRegister: function () {
            this.resultVO = new slot.model.vo.ResultVO();

            this.server = new slot.model.proxy.service.ServerService();
        },

        init: function(){
            this.server.init(this.onServerInit.bind(this));
        },

        spin: function(betAmount) {
            this.server.loadSpinResult(betAmount, this.onResult.bind(this));
        },

        onServerInit: function(result){
            this.resultVO.update(result);
            this.sendNotification(slot.AppConstants.SERVER_INIT, this.resultVO);
        },

        onResult: function(result){
            this.resultVO.update(result);
            this.sendNotification(slot.AppConstants.SPIN_RESULT, this.resultVO);
        }

    },

    // STATIC MEMBERS
    {
        NAME: "ServerProxy"
    }
);

/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc
 * @class       WindowSizeProxy
 */
puremvc.define(
    {
        name: 'slot.model.proxy.WindowSizeProxy',
        parent: puremvc.Proxy
    },

    // INSTANCE MEMBERS
    {
        // Data
        windowSizeVO: null,

        onRegister: function () {
            this.windowSizeVO = new slot.model.vo.WindowSizeVO(window.innerWidth, window.innerHeight);
            console.log("Orientation: " + this.windowSizeVO.orientation);

            if(window.addEventListener) {
                window.addEventListener('resize', this.onResize.bind(this), true);
            }else{
                if(window.attachEvent) {
                    window.attachEvent('onresize', this.onResize.bind(this));
                }
            }
        },

        onResize: function(){
            this.windowSizeVO.update(window.innerWidth, window.innerHeight);
            this.sendNotification(slot.AppConstants.WINDOW_RESIZED, this.windowSizeVO);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "WindowSizeProxy"
    }
);

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
                //[4,4],
                //[4,4],
                //[4,4],
                //[1,2,4,4],
                //[1,2,4,4]
            ],
        paytable:
        {
            "1":
            {
                "3": 250,
                "4": 500,
                "5": 1000
            },
            "2":
            {
                "3": 200,
                "4": 450,
                "5": 800
            },
            "3":
            {
                "3": 150,
                "4": 400,
                "5": 700
            },
            "4":
            {
                "3": 100,
                "4": 350,
                "5": 600
            },
            "5":
            {
                "3": 90,
                "4": 300,
                "5": 700
            },
            "6":
            {
                "3": 80,
                "4": 250,
                "5": 600
            },
            "7":
            {
                "3": 70,
                "4": 200,
                "5": 500
            },
            "8":
            {
                "3": 60,
                "4": 100,
                "5": 400
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
        minOak: 3,
        hpSymbols: [1,2,3,4],
        royals: [5,6,7,8],

        // Returns array with all possible symbols
        getSymbols: function(){
            var symbols = [];
            for(var i = 1; i <= this.numSymbols; i++){
                symbols.push("s" + i);
            }
            return symbols;
        },

        isRoyalSymbol: function(symbolID){
            return this.royals.indexOf(symbolID) != -1;
        }

    },

    // STATIC MEMBERS
    {
        NAME: "GameConfigVO"
    }
);

/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc
 * @class       ResultVO
 */
puremvc.define(
    {
        name: 'slot.model.vo.ResultVO'
    },

    // INSTANCE MEMBERS
    {
        matrix:
            [
                [1,4,5],
                [5,6,3],
                [1,2,8],
                [3,7,6],
                [2,6,5]
            ],
        balance: 0,
        totalWin: 0,
        numWins: 0,
        wins: null,

        update: function(result){
            console.log(result);
            this.matrix = result.matrix;
            this.balance = result.balance;
            this.totalWin = result.totalWin;
            this.numWins = result.numWins;
            this.wins = result.wins;
        },

        getSymbolMatrix: function(){
            return this.matrix.map(function(_, index, matrix){
                return matrix[index].map(function(symbolID){
                    return "s" + symbolID;
                });
            });
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ResultVO"
    }
);

/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc
 * @class       UIConfigVO
 */
puremvc.define(
    {
        name: 'slot.model.vo.UIConfigVO'
    },

    // INSTANCE MEMBERS
    {
        symbolWidth: 130,
        symbolHeight: 130,

        reelHSeparator: 10,
        reelVSeparator: 10,
        reelHPadding: 20,
        reelVPadding: 20,

        currency: "$",

        reelSpinDelay: 0.1,
        minSpinDuration: 2,

        linePoints:
            [
                [[30,225],[700,225]],
                [[30,85],[700,85]],
                [[30,365],[700,365]],
                [[30,30],[365,365],[700,30]],
                [[30,420],[365,85],[700,420]],
            ],
        winAnnounceDelay: 2,
        repeatWins: 10,
        responsiveScale:
        {
            win:
            {
                x: 0.375,
                y: 0.01,
                w: 0.25,
                h: 0.10
            },
            txtWin:
            {
                x: 0.5,
                y: 0.7,
                font: 0.4
            },
            bet:
            {
                x: 0.045,
                y: 0.89,
                w: 0.25,
                h: 0.10
            },
            txtBet:
            {
                x: 0.5,
                y: 0.7,
                font: 0.4
            },
            balance:
            {
                x: 0.375,
                y: 0.89,
                w: 0.25,
                h: 0.10
            },
            txtBalance:
            {
                x: 0.5,
                y: 0.7,
                font: 0.4
            },
            spin:
            {
                x: 0.705,
                y: 0.89,
                w: 0.25,
                h: 0.10
            },
            reelArea:
            {
                x: 0.045,
                y: 0.125,
                w: 0.91,
                h: 0.75
            }
        },

        reelAreaBGColor: 0xFFFFFF,
        reelBGColor: 0x2B6F1A,
        reelHighlightColor: 0x006433,

        winLineWidth: 5,
        winLineColor: 0xA81C1D
    },

    // STATIC MEMBERS
    {
        NAME: "UIConfigVO"
    }
);

/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc
 * @class       WindowSizeVO
 */
puremvc.define(
    {
        name: 'slot.model.vo.WindowSizeVO',
        constructor: function(w, h){
            this.update(w, h);
        }
    },

    // INSTANCE MEMBERS
    {
        width: null,
        height: null,
        orientation: null,

        update: function(w, h){
            this.width = w;
            this.height = h;
            this.orientation = slot.model.lib.Utils.getOrientation(w, h);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "WindowSizeVO"
    }
);

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

        getSymbolAt: function(reel, pos){
            if(pos > reel.length - 1){
                return reel[pos - reel.length];
            }else{
                return reel[pos];
            }
        },

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

        forceResult: function(matrix){
            //return matrix;
            matrix = [[1,2,3],[1,2,3],[1,2,3],[1,2,3],[1,2,3]];
            matrix = [[4,5,6],[4,5,6],[4,5,6],[4,5,6],[4,5,6]];
            //matrix = [[7,8,1],[7,8,2],[7,8,3],[7,8,4],[7,8,5]];
            return matrix;
        }

    },

    // STATIC MEMBERS
    {
        NAME: "ServerService"
    }
);
/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc
 * @class       AssetsLoadedCommand
 */
puremvc.define(
    {
        name: 'slot.controller.command.AssetsLoadedCommand',
        parent: puremvc.SimpleCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (note) {
            var server = this.facade.retrieveProxy(slot.model.proxy.ServerProxy.NAME);
            server.init();
        }
    }
);

/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc
 * @class       PrepControllerCommand
 */
puremvc.define(
    {
        name: 'slot.controller.command.PrepControllerCommand',
        parent: puremvc.SimpleCommand
    },
  
    // INSTANCE MEMBERS
    {
        // Register all commands
        execute: function (note) {   
            this.facade.registerCommand(slot.AppConstants.ASSETS_LOADED, slot.controller.command.AssetsLoadedCommand);
            this.facade.registerCommand(slot.AppConstants.WINDOW_RESIZED, slot.controller.command.WindowResizeCommand);
            this.facade.registerCommand(slot.AppConstants.SPIN, slot.controller.command.SpinCommand);
            this.facade.registerCommand(slot.AppConstants.SPIN_END, slot.controller.command.SpinEndCommand);
        }
    }    
);
/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc
 * @class       PrepModelCommand
 */
puremvc.define(
    {
        name: 'slot.controller.command.PrepModelCommand',
        parent: puremvc.SimpleCommand
    },
  
    // INSTANCE MEMBERS
    {
        // Register all Proxys
        execute: function (note) {
            this.facade.registerProxy(new slot.model.proxy.LoaderProxy());
            this.facade.registerProxy(new slot.model.proxy.WindowSizeProxy());
            this.facade.registerProxy(new slot.model.proxy.ConfigProxy());
            this.facade.registerProxy(new slot.model.proxy.ServerProxy());
        }
    }    
);

/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc
 * @class       PrepPixiCommand
 */
puremvc.define(
    {
        name: 'slot.controller.command.PrepPixiCommand',
        parent: puremvc.SimpleCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (note) {
            PXRoot = new PIXI.Container();

            PXRenderer = new PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
            PXRenderer.view.style.display = "block";

            PXRoot.interactive = true;
            PXRoot.on("tap",this.setFullScreen);

            document.getElementById("game").appendChild(PXRenderer.view);

            // Render loop
            window.renderLoop = function(){
                PXRenderer.render(PXRoot);
                requestAnimationFrame(window.renderLoop);
            };
            window.renderLoop();
        },

        setFullScreen: function(){
            if (screenfull.enabled && !screenfull.isFullscreen) {
                screenfull.request();
            }
        }

    }
);

/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc
 * @class       PrepViewCommand
 */
puremvc.define (
    {
        name: 'slot.controller.command.PrepViewCommand',
        parent: puremvc.SimpleCommand
    },
 
    // INSTANCE MEMBERS
    {
        execute: function (note) {
            this.facade.registerMediator(new slot.view.mediator.BGMediator());
            this.facade.registerMediator(new slot.view.mediator.ReelContainerMediator());
            this.facade.registerMediator(new slot.view.mediator.WinAnnounceMediator());
            this.facade.registerMediator(new slot.view.mediator.SoundPlayerMediator());
            this.facade.registerMediator(new slot.view.mediator.PanelMediator());
        }
    }
);

/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc
 * @class       SpinCommand
 */
puremvc.define(
    {
        name: 'slot.controller.command.SpinCommand',
        parent: puremvc.SimpleCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (note) {
            var server = this.facade.retrieveProxy(slot.model.proxy.ServerProxy.NAME);
            this.sendNotification(slot.AppConstants.STOP_WIN_ANNOUNCEMENTS);

            server.spin(note.getBody());
        }
    }
);

/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc
 * @class       SpinEndCommand
 */
puremvc.define(
    {
        name: 'slot.controller.command.SpinEndCommand',
        parent: puremvc.SimpleCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (note) {
            this.sendNotification(slot.AppConstants.START_WIN_ANNOUNCEMENTS);
        }
    }
);

/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc
 * @class       StartupCommand
 */
puremvc.define(
    {
        name: 'slot.controller.command.StartupCommand',
        parent: puremvc.MacroCommand
    },

    // INSTANCE MEMBERS 
    {
        /**
         * Subcommands to handle facade registrations for
         * Model, View and Controller
         * Also runs sub command to initialize PIXI framework
         */
        initializeMacroCommand: function (note) {
            this.addSubCommand(slot.controller.command.PrepPixiCommand);

            this.addSubCommand(slot.controller.command.PrepControllerCommand);
            this.addSubCommand(slot.controller.command.PrepModelCommand);
            this.addSubCommand(slot.controller.command.PrepViewCommand);
        }

    }
);

/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc
 * @class       WindowResizeCommand
 */
puremvc.define(
    {
        name: 'slot.controller.command.WindowResizeCommand',
        parent: puremvc.SimpleCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (note) {
            var windowSizeVO = note.getBody();
            console.log(windowSizeVO);
            PXRenderer.resize(windowSizeVO.width, windowSizeVO.height);
        }
    }
);

/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc
 * @class       BG
 */
puremvc.define(
    {
        name: 'slot.view.component.BG',
        constructor: function () {
            this.stage = new PIXI.Container();
        }
    },

    // INSTANCE MEMBERS
    {
        // Stage Members
        stage: null,
        bg: null,

        // References
        ORIENTATION: slot.model.enum.ORIENTATION,

        init: function(windowSizeVO){
            this.addChildren();
            this.setupView(windowSizeVO);

            PXRoot.addChild(this.stage);
        },

        addChildren: function(){
            this.bg = new PIXI.Sprite(PIXI.Texture.fromFrame("bg"));
            this.bg.anchor.set(0.5,0.5);
            this.stage.addChild(this.bg);
        },

        setupView: function(windowSizeVO){
            // Fill screen
            var size = slot.model.lib.Utils.getSizeToFillScreen(
                {
                    width:this.bg.width,
                    height: this.bg.height
                },
                {
                    width:windowSizeVO.width,
                    height: windowSizeVO.height
                }
            );

            this.bg.width = size.width;
            this.bg.height = size.height;

            this.bg.x = windowSizeVO.width/2;
            this.bg.y = windowSizeVO.height/2;
        },

        handleResize: function(windowSizeVO){
            this.setupView(windowSizeVO);
        }
    },

    // STATIC MEMBERS
    {
        NAME: 'BG'
    }
);

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

/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc
 * @class       Reel
 */
puremvc.define(
    {
        name: 'slot.view.component.Reel',
        constructor: function () {
            this.stage = new PIXI.Container();
        }
    },

    // INSTANCE MEMBERS
    {
        // Stage Members
        stage: null,

        reelIndex: null,

        numRows: null,
        width: null,
        height: null,

        cells: null,
        spinTrickCells: null,
        cellPosOriginal: null,
        reelCellHeight: null,
        reelHeight: null,

        resultReel: null,
        isResultReceived: null,

        highlight: null,

        init: function (index, data) {
            this.reelIndex = index;
            this.numRows = data.gameConfigVO.numRows;

            // Calculating size of single reel area
            this.width = data.uiConfigVO.symbolWidth;
            this.height =
                (this.numRows * data.uiConfigVO.symbolHeight) +
                ((this.numRows - 1) * data.uiConfigVO.reelVSeparator);

            // Yellow rounded rectangle strip behind each reel
            var bgRect = new PIXI.Graphics();
            bgRect.beginFill(data.uiConfigVO.reelBGColor);
            bgRect.drawRoundedRect(0, 0, this.width, this.height, 10);
            bgRect.alpha = 0.4;
            this.stage.addChild(bgRect);

            this.createReelCells(data);
        },

        createReelCells: function(data){
            // The distance each symbol is animated to create spin effect
            this.reelCellHeight = data.uiConfigVO.symbolHeight + data.uiConfigVO.reelVSeparator;
            this.reelHeight =
                (data.uiConfigVO.symbolHeight * this.numRows) +
                (data.uiConfigVO.reelVSeparator * (this.numRows - 1));

            var xp = 0;
            var yp = -(this.reelCellHeight * this.numRows);

            // Storing positions of all cells
            // (both on screen and off screen trick cells)
            this.cellPosOriginal = [];

            var reelCell;

            // Creating cells used to create continous spin
            // These stay off screen and only come on to visible area
            // when the reel is spinning
            // These will be the first set in cellPosOriginal array
            this.spinTrickCells = [];
            for(var i = 0; i < this.numRows; i++){
                reelCell = new slot.view.component.ReelCell();
                this.stage.addChild(reelCell.stage);
                this.spinTrickCells.push(reelCell);
                reelCell.stage.x = xp;
                reelCell.stage.y = yp;
                this.cellPosOriginal.push({x: xp, y: yp});
                reelCell.init(data);
                yp += data.uiConfigVO.symbolHeight + data.uiConfigVO.reelVSeparator;
            }

            // Reel cells to display spin result
            // These will be the last set in cellPosOriginal array
            this.cells = [];
            for(i = 0; i < this.numRows; i++){
                reelCell = new slot.view.component.ReelCell();
                this.stage.addChild(reelCell.stage);
                this.cells.push(reelCell);
                reelCell.stage.x = xp;
                reelCell.stage.y = yp;
                this.cellPosOriginal.push({x: xp, y: yp});
                reelCell.init(data);
                yp += data.uiConfigVO.symbolHeight + data.uiConfigVO.reelVSeparator;
            }
        },

        spin: function(){
            this.isResultReceived = false;
            this.startSpin();
        },

        startSpin: function(){
            var easeType = Power1.easeIn;
            for(var i = 0; i < this.numRows; i++){
                this.spinTrickCells[i].updateWithRandomSymbol();
                TweenLite.to(
                    this.spinTrickCells[i].stage,
                    0.5,
                    {
                        y: this.spinTrickCells[i].stage.y + (this.reelCellHeight * this.numRows),
                        ease: easeType
                    }
                );
                // Tween onComplete callback to be added only to one Symbol.
                var callback = (i === this.numRows - 1) ? this.continueSpin.bind(this) : null;
                TweenLite.to(
                    this.cells[i].stage,
                    0.5,
                    {
                        y: this.cells[i].stage.y + (this.reelCellHeight * this.numRows),
                        ease: easeType,
                        onComplete: callback
                    }
                );
            }
        },

        continueSpin: function(){
            if(this.isResultReceived){
                this.stopSpin();
                return;
            }
            var offScreenCells = this.getOffScreenCells();
            var easeType = Linear.easeNone;
            for(var i = 0; i < this.numRows; i++){
                offScreenCells[i].updateWithRandomSymbol();
                offScreenCells[i].stage.y = this.cellPosOriginal[i].y;
                TweenLite.to(
                    this.spinTrickCells[i].stage,
                    0.1,
                    {
                        y: this.spinTrickCells[i].stage.y + (this.reelCellHeight),
                        ease: easeType
                    }
                );
                // Tween onComplete callback to be added only to one Symbol.
                var callback = (i === this.numRows - 1) ? this.continueSpin.bind(this) : null;
                TweenLite.to(
                    this.cells[i].stage,
                    0.1,
                    {
                        y: this.cells[i].stage.y + (this.reelCellHeight),
                        ease: easeType,
                        onComplete: callback
                    }
                );
                TweenLite.to(this.cells[i].stage, 0.1, {ease: easeType, onComplete: callback});
            }
        },

        stopSpin: function(){
            var offScreenCells = this.getOffScreenCells();
            var easeType = Power1.easeOut;
            for(var i = 0; i < this.numRows; i++){
                offScreenCells[i].updateSymbol(this.resultReel[i]);
                offScreenCells[i].stage.y = this.cellPosOriginal[i].y;
                TweenLite.to(
                    this.spinTrickCells[i].stage,
                    0.5,
                    {
                        y: this.spinTrickCells[i].stage.y + (this.reelCellHeight * this.numRows),
                        ease: easeType
                    }
                );
                // Tween onComplete callback to be added only to one Symbol.
                var callback = (i === this.numRows - 1) ? this.onSpinStop.bind(this) : null;
                TweenLite.to(
                    this.cells[i].stage,
                    0.5,
                    {
                        y: this.cells[i].stage.y + (this.reelCellHeight * this.numRows),
                        ease: easeType,
                        onComplete: callback
                    }
                );
            }
        },

        onSpinStop: function(){
            for(var i = 0, j = 0; i < this.numRows; i++, j++){
                this.spinTrickCells[i].stage.y = this.cellPosOriginal[j].y;
                this.spinTrickCells[i].removeSymbol();
            }
            for(i = 0; i < this.numRows; i++, j++){
                this.cells[i].stage.y = this.cellPosOriginal[j].y;
                this.cells[i].updateSymbol(this.resultReel[i]);
            }
            this.stage.emit(slot.view.event.ViewEvents.REEL_SPIN_END, this.reelIndex);
        },

        /**
         * Offscreen cells are the ones which are below the reel area
         * One of the cell set, either the actual result cell set,
         * or the trick cell set is returned as an array
         * @returns {null}
         */
        getOffScreenCells: function(){
            var offScreenCells = [];
            for(var i = 0, j = 0; i < this.numRows; i++, j++){
                if(this.spinTrickCells[i].stage.y < 0 || this.spinTrickCells[i].stage.y > this.reelHeight){
                    offScreenCells.push(this.spinTrickCells[i]);
                }
                if(this.cells[i].stage.y < 0 || this.cells[i].stage.y > this.reelHeight){
                    offScreenCells.push(this.cells[i]);
                }
            }
            return offScreenCells;
        },

        stopAndUpdateSymbols: function(result){
            this.resultReel = result;
            this.isResultReceived = true;
        },

        updateSymbolsWithoutSpin: function(result){
            for(var i = 0; i < this.numRows; i++){
                this.cells[i].updateSymbol(result[i]);
            }
        },

        showWinHighlight: function(row){
            this.hideWinHighlight();
            this.highlight = this.cells[row].highlight;
            this.highlight.visible = true;
        },

        hideWinHighlight: function(){
            if(this.highlight){
                this.highlight.visible = false;
            }
        },

        handleResize: function () {
        }
    },

    // STATIC MEMBERS
    {
        NAME: 'Reel'
    }
);

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

/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc
 * @class       ReelContainer
 */
puremvc.define(
    {
        name: 'slot.view.component.ReelContainer',
        constructor: function () {
            this.stage = new PIXI.Container();
        }
    },

    // INSTANCE MEMBERS
    {
        // Stage Members
        stage: null,
        bgRect: null,

        numReels: null,
        numRows: null,
        width: null,
        height: null,

        reels: null,

        isSpinning: null,
        reelSpinDelay: null,
        minSpinDuration: null,
        minSpinDurationElapsed: null,
        resultMatrixReceived: null,
        resultMatrix: null,

        respScale: null,

        init: function (data) {
            this.numReels = data.gameConfigVO.numReels;
            this.numRows = data.gameConfigVO.numRows;

            this.minSpinDuration = data.uiConfigVO.minSpinDuration;
            this.reelSpinDelay = data.uiConfigVO.reelSpinDelay;
            this.respScale = data.uiConfigVO.responsiveScale.reelArea;


            // Calculating size of whole reel area using values provided in config
            this.width =
                (this.numReels * data.uiConfigVO.symbolWidth) +
                ((this.numReels - 1) * data.uiConfigVO.reelHSeparator) +
                (data.uiConfigVO.reelHPadding * 2);
            this.height =
                (this.numRows * data.uiConfigVO.symbolHeight) +
                ((this.numRows - 1) * data.uiConfigVO.reelVSeparator) +
                (data.uiConfigVO.reelVPadding * 2);

            // White rounded rectangle behind the whole reel area
            this.bgRect = new PIXI.Graphics();
            this.bgRect.beginFill(data.uiConfigVO.reelAreaBGColor);
            this.bgRect.drawRoundedRect(0, 0, this.width, this.height, 15);
            this.bgRect.alpha = 0.6;
            this.stage.addChild(this.bgRect);

            this.createReels(data);
            this.setupView(data.windowSizeVO);

            PXRoot.addChild(this.stage);
        },

        createReels: function(data) {
            var xp = data.uiConfigVO.reelHPadding;
            var yp = data.uiConfigVO.reelVPadding;
            this.reels = [];
            for(var i = 0; i < this.numReels; i++){
                var reel = new slot.view.component.Reel();
                this.stage.addChild(reel.stage);
                reel.init(i, data);
                reel.stage.x = xp;
                reel.stage.y = yp;
                reel.stage.mask = this.createMaskObject(xp, yp, reel.width, reel.height);
                reel.stage.on(
                    slot.view.event.ViewEvents.REEL_SPIN_END,
                    this.onReelStop.bind(this)
                );
                this.reels.push(reel);
                xp += data.uiConfigVO.symbolWidth + data.uiConfigVO.reelHSeparator;
            }
        },

        setupView: function(windowSizeVO){
            // Scaling and positioning as per responsive scale
            var substitute = {width: this.width, height: this.height};
            var fitContentOnScreen = new slot.model.lib.Utils().fitContentOnScreen;
            fitContentOnScreen(
                {
                    content: substitute,
                    screen: {
                        x: windowSizeVO.width * this.respScale.x,
                        y: windowSizeVO.height * this.respScale.y,
                        width: windowSizeVO.width * this.respScale.w,
                        height: windowSizeVO.height * this.respScale.h
                    }
                }
            );
            this.stage.x = substitute.x;
            this.stage.y = substitute.y;
            this.stage.scale.x = substitute.width/this.width;
            this.stage.scale.y = substitute.height/this.height;
        },

        createMaskObject: function(x, y, w, h){
            // Rounded rectangle on top of each reel for mask
            var mask = new PIXI.Graphics();
            mask.beginFill(0xFFFFFF);
            mask.drawRoundedRect(x, y, w, h, 10);
            this.stage.addChild(mask);
            return mask;
        },

        spin: function(){
            if(this.isSpinning) {
                throw(new Error("Cannot start new spin. Already spinning."));
            }
            this.isSpinning = true;
            this.minSpinDurationElapsed = false;
            this.resultMatrixReceived = false;
            for(var i = 0; i < this.numReels; i++){
                setTimeout(
                    this.reels[i].spin.bind(this.reels[i]),
                    i * this.reelSpinDelay * 1000
                );
            }
            setTimeout(this.elapseMinSpinDuration.bind(this), this.minSpinDuration * 1000);
        },

        elapseMinSpinDuration: function(){
            this.minSpinDurationElapsed = true;
            this.updateSymbolsIfReady();
        },

        stopAndUpdateSymbols: function(result){
            if(!this.isSpinning) {
                throw(new Error("Cannot update symbols. Reels not spinning. " +
                "Use updateSymbolsWithoutSpin method to update symbols when not spinning."));
            }
            this.resultMatrix = result;
            this.resultMatrixReceived = true;
            this.updateSymbolsIfReady();
        },

        /**
         * The method updateSymbolsIfReady makes sure that the reels have spun for the
         * minimum required duration and also verifies if spin result hav been received
         * by verifying that the associated flags are true.
         *
         * This method is invoked when results are received and when minimum spin duration
         * elapes. This function verifies both and then proceeds by providinng individual
         * reels with their symbols.
         */
        updateSymbolsIfReady: function(){
            if(this.minSpinDurationElapsed && this.resultMatrixReceived){
                for(var i = 0; i < this.numReels; i++){
                    setTimeout(
                        this.reels[i].stopAndUpdateSymbols.bind(this.reels[i], this.resultMatrix[i]),
                        i * this.reelSpinDelay * 1000
                    );
                }
            }
        },

        updateSymbolsWithoutSpin: function(result){
            if(this.isSpinning) {
                throw(new Error("Cannot update without spin. Already spinning."));
            }
            for(var i = 0; i < this.numReels; i++){
                this.reels[i].updateSymbolsWithoutSpin(result[i]);
            }
        },

        showWinHighlight: function(line, oak){
            for(var i = 0; i < oak; i++){
                this.reels[i].showWinHighlight(line[i]);
            }
        },

        hideWinHighlight: function(){
            for(var i = 0; i < this.numReels; i++){
                this.reels[i].hideWinHighlight();
            }
        },

        onReelStop: function(reelID){
            if(reelID === this.numReels - 1){
                this.isSpinning = false;
                this.stage.emit(slot.view.event.ViewEvents.REEL_SPIN_END);
            }
        },

        handleResize: function (windowSizeVO) {
            this.setupView(windowSizeVO);
        }
    },

    // STATIC MEMBERS
    {
        NAME: 'ReelContainer'
    }
);

/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc
 * @class       WinLines
 */
puremvc.define(
    {
        name: 'slot.view.component.WinLines',
        constructor: function () {
            this.stage = new PIXI.Container();
        }
    },

    // INSTANCE MEMBERS
    {
        // Stage Members
        stage: null,
        lines: null,

        numLines: null,
        visibleLine: null,

        init: function (data) {
            this.numLines = data.gameConfigVO.numLines;
            this.addLines(data);
            this.hideAllLines();
        },

        addLines: function(data){
            this.lines = [];

            var linePoints = data.uiConfigVO.linePoints;
            for(var i = 0; i < this.numLines; i++){
                var line = linePoints[i];
                var totalPoints = line.length;
                var lineGraphic = new PIXI.Graphics();
                lineGraphic.lineStyle(data.uiConfigVO.winLineWidth, data.uiConfigVO.winLineColor);
                lineGraphic.moveTo(line[0][0], line[0][1]);
                for(var j = 1; j < totalPoints; j++){
                    lineGraphic.lineTo(line[j][0], line[j][1]);
                }
                lineGraphic.endFill();
                this.stage.addChild(lineGraphic);
                this.lines.push(lineGraphic);
            }
        },

        showLine: function(lineNumber){
            if(this.visibleLine){
                this.visibleLine.visible = false;
            }
            this.visibleLine = this.lines[lineNumber];
            this.visibleLine.visible = true;
        },

        hideAllLines: function(){
            for(var i = 0; i < this.numLines; i++){
                this.lines[i].visible = false;
            }
        },

        handleResize: function () {
        }
    },

    // STATIC MEMBERS
    {
        NAME: 'WinLines'
    }
);

/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc
 * @class       ViewEvents
 */
puremvc.define(
    {
        name: "slot.view.event.ViewEvents"
    },

    {},

    // STATIC MEMBERS
    {
        CLICK:              ('ontouchstart' in window) ? "tap" : "click",
        SPIN_CLICK:         "ViewEvents_spin_click",
        REEL_SPIN_END:      "ViewEvents_reel_spin_end",
        BET_CLICK:          "ViewEvents_bet_click"
    }
);
/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc
 * @class       BGMediator
 */
puremvc.define(
    {
        name: 'slot.view.mediator.BGMediator',
        parent: puremvc.Mediator
    },

    // INSTANCE MEMBERS
    {
        // References
        windowSizeProxy: null,

        // Notifications this mediator is interested in
        listNotificationInterests: function () {
            return  [
                        slot.AppConstants.WINDOW_RESIZED,
                        slot.AppConstants.ASSETS_LOADED
                    ];
        },

        onRegister: function () {
            this.setViewComponent( new slot.view.component.BG() );

            this.windowSizeProxy = this.facade.retrieveProxy(slot.model.proxy.WindowSizeProxy.NAME);
        },

        // Handle notifications from other PureMVC actors
        handleNotification: function (note) {
            switch ( note.getName() ) {
                case slot.AppConstants.WINDOW_RESIZED:
                    this.viewComponent.handleResize(note.getBody());
                    break;
                case slot.AppConstants.ASSETS_LOADED:
                    this.viewComponent.init(this.windowSizeProxy.windowSizeVO);
                    break;
            }
        }
    },

    // STATIC MEMBERS
    {
        NAME: 'BGMediator'
    }
);

/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc
 * @class       PanelMediator
 */
puremvc.define(
    {
        name: 'slot.view.mediator.PanelMediator',
        parent: puremvc.Mediator
    },

    // INSTANCE MEMBERS
    {
        // References
        windowSizeProxy: null,
        configProxy: null,
        serverProxy: null,

        // Notifications this mediator is interested in 
        listNotificationInterests: function () {
            return [
                slot.AppConstants.WINDOW_RESIZED,
                slot.AppConstants.ASSETS_LOADED,
                slot.AppConstants.SPIN_END,
                slot.AppConstants.SERVER_INIT
            ];
        },

        onRegister: function () {
            this.setViewComponent(new slot.view.component.Panel());
            this.viewComponent.stage.on(
                slot.view.event.ViewEvents.SPIN_CLICK,
                this.onSpinClick.bind(this)
            );
            this.viewComponent.stage.on(
                slot.view.event.ViewEvents.BET_CLICK,
                this.onBetUpdate.bind(this)
            )

            this.windowSizeProxy = this.facade.retrieveProxy(slot.model.proxy.WindowSizeProxy.NAME);
            this.configProxy = this.facade.retrieveProxy(slot.model.proxy.ConfigProxy.NAME);
            this.serverProxy = this.facade.retrieveProxy(slot.model.proxy.ServerProxy.NAME);
        },

        onSpinClick: function(betAmount){
            this.viewComponent.updateBalance(this.serverProxy.resultVO.balance - betAmount);
            this.sendNotification(slot.AppConstants.SPIN, betAmount);
        },

        onBetUpdate: function(){
            this.sendNotification(slot.AppConstants.BET_UPDATED);
        },

        // Handle notifications from other PureMVC actors
        handleNotification: function (note) {
            switch ( note.getName() ) {
                case slot.AppConstants.WINDOW_RESIZED:
                    this.viewComponent.handleResize(note.getBody());
                    break;
                case slot.AppConstants.ASSETS_LOADED:
                    this.viewComponent.init(
                        {
                            gameConfigVO: this.configProxy.gameConfigVO,
                            uiConfigVO: this.configProxy.uiConfigVO,
                            windowSizeVO: this.windowSizeProxy.windowSizeVO
                        }
                    );
                    break;
                case slot.AppConstants.SERVER_INIT:
                    this.viewComponent.enableBet();
                    this.viewComponent.enableSpin();
                    this.viewComponent.updateBalance(this.serverProxy.resultVO.balance);
                    break;
                case slot.AppConstants.SPIN_END:
                    var resultVO = note.getBody();
                    this.viewComponent.enableBet();
                    this.viewComponent.enableSpin();
                    this.viewComponent.updateBalance(this.serverProxy.resultVO.balance);
                    this.viewComponent.updateWin(this.serverProxy.resultVO.totalWin);
                    break;
            }
        }
    },

    // STATIC MEMBERS
    {
        NAME: 'PanelMediator'
    }
);

/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc
 * @class       ReelContainerMediator
 */
puremvc.define(
    {
        name: 'slot.view.mediator.ReelContainerMediator',
        parent: puremvc.Mediator
    },

    // INSTANCE MEMBERS
    {
        // References
        windowSizeProxy: null,
        configProxy: null,
        serverProxy: null,

        // Additional views
        winLinesView: null,

        // Notifications this mediator is interested in 
        listNotificationInterests: function () {
            return [
                slot.AppConstants.WINDOW_RESIZED,
                slot.AppConstants.ASSETS_LOADED,
                slot.AppConstants.SPIN,
                slot.AppConstants.SPIN_RESULT,
                slot.AppConstants.WIN_ANNOUNCEMENT,
                slot.AppConstants.CLEAR_WIN_ANNOUNCEMENT,
                slot.AppConstants.SERVER_INIT
            ];
        },

        onRegister: function () {
            this.setViewComponent(new slot.view.component.ReelContainer());
            this.viewComponent.stage.on(
                slot.view.event.ViewEvents.REEL_SPIN_END,
                this.onReelSpinEnd.bind(this)
            );

            this.winLinesView = new slot.view.component.WinLines();

            this.windowSizeProxy = this.facade.retrieveProxy(slot.model.proxy.WindowSizeProxy.NAME);
            this.configProxy = this.facade.retrieveProxy(slot.model.proxy.ConfigProxy.NAME);
            this.serverProxy = this.facade.retrieveProxy(slot.model.proxy.ServerProxy.NAME);
        },

        onReelSpinEnd: function(){
            this.sendNotification(slot.AppConstants.SPIN_END);
        },

        // Handle notifications from other PureMVC actors
        handleNotification: function (note) {
            switch ( note.getName() ) {
                case slot.AppConstants.WINDOW_RESIZED:
                    this.viewComponent.handleResize(note.getBody());
                    break;
                case slot.AppConstants.ASSETS_LOADED:
                    var data = {
                        gameConfigVO: this.configProxy.gameConfigVO,
                        uiConfigVO: this.configProxy.uiConfigVO,
                        windowSizeVO: this.windowSizeProxy.windowSizeVO
                    };
                    this.viewComponent.init(data);
                    this.winLinesView.init(data);
                    this.viewComponent.stage.addChild(this.winLinesView.stage);
                    break;
                case slot.AppConstants.SERVER_INIT:
                    this.viewComponent.updateSymbolsWithoutSpin(this.serverProxy.resultVO.getSymbolMatrix());
                    break;
                case slot.AppConstants.SPIN:
                    this.viewComponent.spin();
                    break;
                case slot.AppConstants.SPIN_RESULT:
                    this.viewComponent.stopAndUpdateSymbols(note.getBody().getSymbolMatrix());
                    break;
                case slot.AppConstants.WIN_ANNOUNCEMENT:
                    this.winLinesView.showLine(note.getBody().win.lineNumber);
                    this.viewComponent.showWinHighlight(
                        this.configProxy.gameConfigVO.lines[note.getBody().win.lineNumber],
                        note.getBody().win.oak
                    );
                    break;
                case slot.AppConstants.CLEAR_WIN_ANNOUNCEMENT:
                    this.winLinesView.hideAllLines();
                    this.viewComponent.hideWinHighlight();
                    break;
            }
        }
    },

    // STATIC MEMBERS
    {
        NAME: 'ReelContainerMediator'
    }
);

/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc
 * @class       SoundPlayerMediator
 */
puremvc.define(
    {
        name: 'slot.view.mediator.SoundPlayerMediator',
        parent: puremvc.Mediator
    },

    // INSTANCE MEMBERS
    {
        // References
        sound: null,
        configProxy: null,

        // Notifications this mediator is interested in 
        listNotificationInterests: function () {
            return [
                slot.AppConstants.ASSETS_LOADED,
                slot.AppConstants.BET_UPDATED,
                slot.AppConstants.SPIN,
                slot.AppConstants.WIN_ANNOUNCEMENT
            ];
        },

        onRegister: function () {
            //this.setViewComponent( ... );

            this.configProxy = this.facade.retrieveProxy(slot.model.proxy.ConfigProxy.NAME);
        },

        // Handle notifications from other PureMVC actors
        handleNotification: function (note) {
            switch ( note.getName() ) {
                case slot.AppConstants.ASSETS_LOADED:
                    this.sound = note.getBody();
                    break;
                case slot.AppConstants.BET_UPDATED:
                    this.sound.play("bet");
                    break;
                case slot.AppConstants.SPIN:
                    this.sound.play("spin");
                    break;
                case slot.AppConstants.WIN_ANNOUNCEMENT:
                    if(!note.getBody().isRepeating) {
                        var winSymbol = note.getBody().win.symbol;
                        if (this.configProxy.gameConfigVO.isRoyalSymbol(winSymbol)) {
                            this.sound.play("win_royal");
                        } else {
                            this.sound.play("win_s" + winSymbol);
                        }
                    }
                    break;
            }
        }
    },

    // STATIC MEMBERS
    {
        NAME: 'SoundPlayerMediator'
    }
);

/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc
 * @class       WinAnnounceMediator
 */
puremvc.define(
    {
        name: 'slot.view.mediator.WinAnnounceMediator',
        parent: puremvc.Mediator
    },

    // INSTANCE MEMBERS
    {
        // References
        serverProxy: null,
        configProxy: null,

        currentWinIndex: null,
        isAnnouncing: null,
        winAnnounceDelay: null,
        repeatCount: null,
        intervalID: null,

        // Notifications this mediator is interested in 
        listNotificationInterests: function () {
            return [
                slot.AppConstants.START_WIN_ANNOUNCEMENTS,
                slot.AppConstants.STOP_WIN_ANNOUNCEMENTS
            ];
        },

        onRegister: function () {
            this.serverProxy = this.facade.retrieveProxy(slot.model.proxy.ServerProxy.NAME);
            this.configProxy = this.facade.retrieveProxy(slot.model.proxy.ConfigProxy.NAME);
        },

        announceWin: function(){
            if(this.repeatCount >= this.configProxy.uiConfigVO.repeatWins) {
                this.stopAnnouncementInterval();
            }else if(this.isAnnouncing){
                this.sendNotification(
                    slot.AppConstants.WIN_ANNOUNCEMENT,
                    {
                        win: this.serverProxy.resultVO.wins[this.currentWinIndex],
                        isRepeating: this.repeatCount > 0
                    }
                );
                if(this.currentWinIndex < this.serverProxy.resultVO.wins.length - 1){
                    this.currentWinIndex++;
                }else{
                    this.currentWinIndex = 0;
                    this.repeatCount++;
                }

                this.intervalID = setTimeout(
                    this.announceWin.bind(this),
                    this.configProxy.uiConfigVO.winAnnounceDelay * 1000
                );
            }
        },

        stopAnnouncementInterval: function(){
            clearInterval(this.intervalID);
            this.isAnnouncing = false;
            this.sendNotification(slot.AppConstants.CLEAR_WIN_ANNOUNCEMENT);
        },

        // Handle notifications from other PureMVC actors
        handleNotification: function (note) {
            switch ( note.getName() ) {
                case slot.AppConstants.START_WIN_ANNOUNCEMENTS:
                    if(this.serverProxy.resultVO.wins.length > 0){
                        clearInterval(this.intervalID);
                        this.currentWinIndex = 0;
                        this.isAnnouncing = true;
                        this.repeatCount = 0;
                        this.announceWin();
                    }
                    break;
                case slot.AppConstants.STOP_WIN_ANNOUNCEMENTS:
                    this.stopAnnouncementInterval();
                    break;
            }
        }
    },

    // STATIC MEMBERS
    {
        NAME: 'WinAnnounceMediator'
    }
);

/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc
 * @class       App
 */

/**
 * PIXI global variables */
var PXRoot, PXRenderer;

puremvc.define(
    {
        name: 'slot.App',
        constructor: function() {
            this.facade.registerCommand(slot.AppConstants.STARTUP, slot.controller.command.StartupCommand);
            this.facade.sendNotification(slot.AppConstants.STARTUP);

            var loaderProxy = this.facade.retrieveProxy(slot.model.proxy.LoaderProxy.NAME);
            loaderProxy.loadAssets();
        }
    },

    // INSTANCE MEMBERS
    {
        STARTUP: 'startup',
        facade: puremvc.Facade.getInstance( slot.AppConstants.CORE_NAME )
    }
);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFwcENvbnN0YW50cy5qcyIsImVudW0vT1JJRU5UQVRJT04uanMiLCJsaWIvVXRpbHMuanMiLCJwcm94eS9Db25maWdQcm94eS5qcyIsInByb3h5L0xvYWRlclByb3h5LmpzIiwicHJveHkvU2VydmVyUHJveHkuanMiLCJwcm94eS9XaW5kb3dTaXplUHJveHkuanMiLCJ2by9HYW1lQ29uZmlnVk8uanMiLCJ2by9SZXN1bHRWTy5qcyIsInZvL1VJQ29uZmlnVk8uanMiLCJ2by9XaW5kb3dTaXplVk8uanMiLCJwcm94eS9zZXJ2aWNlL1NlcnZlclNlcnZpY2UuanMiLCJjb21tYW5kL0Fzc2V0c0xvYWRlZENvbW1hbmQuanMiLCJjb21tYW5kL1ByZXBDb250cm9sbGVyQ29tbWFuZC5qcyIsImNvbW1hbmQvUHJlcE1vZGVsQ29tbWFuZC5qcyIsImNvbW1hbmQvUHJlcFBpeGlDb21tYW5kLmpzIiwiY29tbWFuZC9QcmVwVmlld0NvbW1hbmQuanMiLCJjb21tYW5kL1NwaW5Db21tYW5kLmpzIiwiY29tbWFuZC9TcGluRW5kQ29tbWFuZC5qcyIsImNvbW1hbmQvU3RhcnR1cENvbW1hbmQuanMiLCJjb21tYW5kL1dpbmRvd1Jlc2l6ZUNvbW1hbmQuanMiLCJjb21wb25lbnQvQkcuanMiLCJjb21wb25lbnQvUGFuZWwuanMiLCJjb21wb25lbnQvUmVlbC5qcyIsImNvbXBvbmVudC9SZWVsQ2VsbC5qcyIsImNvbXBvbmVudC9SZWVsQ29udGFpbmVyLmpzIiwiY29tcG9uZW50L1dpbkxpbmVzLmpzIiwiZXZlbnQvVmlld0V2ZW50cy5qcyIsIm1lZGlhdG9yL0JHTWVkaWF0b3IuanMiLCJtZWRpYXRvci9QYW5lbE1lZGlhdG9yLmpzIiwibWVkaWF0b3IvUmVlbENvbnRhaW5lck1lZGlhdG9yLmpzIiwibWVkaWF0b3IvU291bmRQbGF5ZXJNZWRpYXRvci5qcyIsIm1lZGlhdG9yL1dpbkFubm91bmNlTWVkaWF0b3IuanMiLCJBcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjhFQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic2xvdGdhbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgQXBwQ29uc3RhbnRzXHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiBcInNsb3QuQXBwQ29uc3RhbnRzXCJcclxuICAgIH0sXHJcblxyXG4gICAge30sXHJcblxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvLyBUaGUgbXVsdGl0b24ga2V5IGZvciB0aGlzIGFwcCdzIHNpbmdsZSBjb3JlXHJcbiAgICAgICAgQ09SRV9OQU1FOiAgICAgICAgICAgICAgJ1Nsb3RHYW1lJyxcclxuXHJcbiAgICAgICAgLy8gTm90aWZpY2F0aW9uc1xyXG4gICAgICAgIFNUQVJUVVA6ICAgICAgICAgICAgICAgICAgICBcIkFwcENvbnN0YW50c19zdGFydHVwXCIsXHJcblxyXG4gICAgICAgIC8vID09PVxyXG4gICAgICAgIEFTU0VUU19MT0FERUQ6ICAgICAgICAgICAgICBcIkFwcENvbnN0YW50c19hc3NldHNfbG9hZGVkXCIsXHJcbiAgICAgICAgV0lORE9XX1JFU0laRUQ6ICAgICAgICAgICAgIFwiQXBwQ29uc3RhbnRzX3dpbmRvd19yZXNpemVkXCIsXHJcbiAgICAgICAgU0VSVkVSX0lOSVQ6ICAgICAgICAgICAgICAgIFwiQXBwQ29uc3RhbnRzX3NlcnZlcl9pbml0XCIsXHJcbiAgICAgICAgU1BJTjogICAgICAgICAgICAgICAgICAgICAgIFwiQXBwQ29uc3RhbnRzX3NwaW5cIixcclxuICAgICAgICBTUElOX1JFU1VMVDogICAgICAgICAgICAgICAgXCJBcHBDb25zdGFudHNfc3Bpbl9yZXN1bHRcIixcclxuICAgICAgICBTUElOX0VORDogICAgICAgICAgICAgICAgICAgXCJBcHBDb25zdGFudHNfc3Bpbl9lbmRcIixcclxuXHJcbiAgICAgICAgU1RBUlRfV0lOX0FOTk9VTkNFTUVOVFM6ICAgIFwiQXBwQ29uc3RhbnRzX3N0YXJ0X3dpbl9hbm5vdW5jZW1lbnRzXCIsXHJcbiAgICAgICAgU1RPUF9XSU5fQU5OT1VOQ0VNRU5UUzogICAgIFwiQXBwQ29uc3RhbnRzX3N0b3Bfd2luX2Fubm91bmNlbWVudHNcIixcclxuICAgICAgICBXSU5fQU5OT1VOQ0VNRU5UOiAgICAgICAgICAgXCJBcHBDb25zdGFudHNfd2luX2Fubm91bmNlbWVudFwiLFxyXG4gICAgICAgIENMRUFSX1dJTl9BTk5PVU5DRU1FTlQ6ICAgICBcIkFwcENvbnN0YW50c19jbGVhcl93aW5fYW5ub3VuY2VtZW50XCIsXHJcblxyXG4gICAgICAgIEJFVF9VUERBVEVEOiAgICAgICAgICAgICAgICBcIkFwcENvbnN0YW50c19iZXRfdXBkYXRlZFwiXHJcbiAgICB9XHJcbik7IiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2NcclxuICogQGNsYXNzICAgICAgIE9SSUVOVEFUSU9OXHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC5tb2RlbC5lbnVtLk9SSUVOVEFUSU9OJ1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7fSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6IFwiT1JJRU5UQVRJT05cIixcclxuICAgICAgICBMQU5EU0NBUEU6IFwibGFuZHNjYXBlXCIsXHJcbiAgICAgICAgUE9SVFJBSVQ6IFwicG9ydHJhaXRcIlxyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgVXRpbHNcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90Lm1vZGVsLmxpYi5VdGlscydcclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIGZpdENvbnRlbnRPblNjcmVlbjogZnVuY3Rpb24obyl7XHJcbiAgICAgICAgICAgIHZhciBjb250ZW50ID0gby5jb250ZW50O1xyXG4gICAgICAgICAgICB2YXIgY29udGVudERpbWVuc2lvbnMgPSBvLmNvbnRlbnREaW1lbnNpb25zIHx8IG8uY29udGVudDtcclxuXHJcbiAgICAgICAgICAgIHZhciBzaXplID0gc2xvdC5tb2RlbC5saWIuVXRpbHMuZ2V0U2l6ZVRvRml0U2NyZWVuKFxyXG4gICAgICAgICAgICAgICAgY29udGVudERpbWVuc2lvbnMsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IG8uc2NyZWVuLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogby5zY3JlZW4uaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGNvbnRlbnQueCA9IG8uc2NyZWVuLnggKyAoKG8uc2NyZWVuLndpZHRoIC0gc2l6ZS53aWR0aCkvMik7XHJcbiAgICAgICAgICAgIGNvbnRlbnQueSA9IG8uc2NyZWVuLnkgKyAoKG8uc2NyZWVuLmhlaWdodCAtIHNpemUuaGVpZ2h0KS8yKTtcclxuICAgICAgICAgICAgY29udGVudC53aWR0aCA9IHNpemUud2lkdGg7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuaGVpZ2h0ID0gc2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBOQU1FOiBcIlV0aWxzXCIsXHJcblxyXG4gICAgICAgIGdldE9yaWVudGF0aW9uOiBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KXtcclxuICAgICAgICAgICAgcmV0dXJuICAod2lkdGggPiBoZWlnaHQpID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xvdC5tb2RlbC5lbnVtLk9SSUVOVEFUSU9OLkxBTkRTQ0FQRTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xvdC5tb2RlbC5lbnVtLk9SSUVOVEFUSU9OLlBPUlRSQUlUO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdldFNpemVUb0ZpbGxTY3JlZW46IGZ1bmN0aW9uKGNvbnRlbnQsIHNjcmVlbil7XHJcbiAgICAgICAgICAgIGlmKChzY3JlZW4ud2lkdGgvc2NyZWVuLmhlaWdodCkgPiAoY29udGVudC53aWR0aC9jb250ZW50LmhlaWdodCkpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogc2NyZWVuLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBjb250ZW50LmhlaWdodCAqIChzY3JlZW4ud2lkdGgvY29udGVudC53aWR0aClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGNvbnRlbnQud2lkdGggKiAoc2NyZWVuLmhlaWdodC9jb250ZW50LmhlaWdodCksXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBzY3JlZW4uaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRml0IGdpdmVuIGNvbnRlbnQgaW50byBhIGdpdmVuIHNjcmVlbiB3aXRoaG91dCBkaXN0dXJiaW5nIHRoZSBhc3BlY3QgcmF0aW9cclxuICAgICAgICAgKiBvZiB0aGUgY29udGVudC5cclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gZml0T2JqIC0gT2JqZWN0IHdpdGggZGF0YSB0byBhcHBseSBmaXRcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXRTaXplVG9GaXRTY3JlZW46IGZ1bmN0aW9uKGNvbnRlbnQsIHNjcmVlbil7XHJcbiAgICAgICAgICAgIGlmKChzY3JlZW4ud2lkdGgvc2NyZWVuLmhlaWdodCkgPiAoY29udGVudC53aWR0aC9jb250ZW50LmhlaWdodCkpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGNvbnRlbnQud2lkdGggKiAoc2NyZWVuLmhlaWdodC9jb250ZW50LmhlaWdodCksXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBzY3JlZW4uaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIHtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogc2NyZWVuLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogY29udGVudC5oZWlnaHQgKiAoc2NyZWVuLndpZHRoL2NvbnRlbnQud2lkdGgpXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdG9nZ2xlRnVsbFNjcmVlbjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBkb2MgPSB3aW5kb3cuZG9jdW1lbnQ7XHJcbiAgICAgICAgICAgIHZhciBkb2NFbCA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XHJcblxyXG4gICAgICAgICAgICB2YXIgcmVxdWVzdEZ1bGxTY3JlZW4gPSBkb2NFbC5yZXF1ZXN0RnVsbHNjcmVlbiB8fCBkb2NFbC5tb3pSZXF1ZXN0RnVsbFNjcmVlbiB8fCBkb2NFbC53ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbiB8fCBkb2NFbC5tc1JlcXVlc3RGdWxsc2NyZWVuO1xyXG4gICAgICAgICAgICB2YXIgY2FuY2VsRnVsbFNjcmVlbiA9IGRvYy5leGl0RnVsbHNjcmVlbiB8fCBkb2MubW96Q2FuY2VsRnVsbFNjcmVlbiB8fCBkb2Mud2Via2l0RXhpdEZ1bGxzY3JlZW4gfHwgZG9jLm1zRXhpdEZ1bGxzY3JlZW47XHJcblxyXG4gICAgICAgICAgICBpZighZG9jLmZ1bGxzY3JlZW5FbGVtZW50ICYmICFkb2MubW96RnVsbFNjcmVlbkVsZW1lbnQgJiYgIWRvYy53ZWJraXRGdWxsc2NyZWVuRWxlbWVudCAmJiAhZG9jLm1zRnVsbHNjcmVlbkVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RGdWxsU2NyZWVuLmNhbGwoZG9jRWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2FuY2VsRnVsbFNjcmVlbi5jYWxsKGRvYyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBDb25maWdQcm94eVxyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3QubW9kZWwucHJveHkuQ29uZmlnUHJveHknLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5Qcm94eVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLy8gRGF0YVxyXG4gICAgICAgIGdhbWVDb25maWdWTzogbnVsbCxcclxuICAgICAgICB1aUNvbmZpZ1ZPOiBudWxsLFxyXG5cclxuICAgICAgICBvblJlZ2lzdGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUNvbmZpZ1ZPID0gbmV3IHNsb3QubW9kZWwudm8uR2FtZUNvbmZpZ1ZPKCk7XHJcbiAgICAgICAgICAgIHRoaXMudWlDb25maWdWTyA9IG5ldyBzbG90Lm1vZGVsLnZvLlVJQ29uZmlnVk8oKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogXCJDb25maWdQcm94eVwiXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBMb2FkZXJQcm94eVxyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3QubW9kZWwucHJveHkuTG9hZGVyUHJveHknLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5Qcm94eVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgbG9hZGVyOiBudWxsLFxyXG4gICAgICAgIHNvdW5kOiBudWxsLFxyXG5cclxuICAgICAgICBncmFwaGljc0xvYWRlZDogbnVsbCxcclxuICAgICAgICBzb3VuZHNMb2FkZWQ6IG51bGwsXHJcblxyXG4gICAgICAgIG9uUmVnaXN0ZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbG9hZEFzc2V0czogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGVyID0gbmV3IFBJWEkubG9hZGVycy5Mb2FkZXIoXCJcIiwzKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkZXJcclxuICAgICAgICAgICAgICAgIC5hZGQoJ2Fzc2V0cy9zcHJpdGVzaGVldC5qc29uJylcclxuICAgICAgICAgICAgICAgIC5sb2FkKHRoaXMub25HcmFwaGljc0xvYWRDb21wbGV0ZS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy5sb2FkZXIuYWRkKCdiZycsICdhc3NldHMvYmFja2dyb3VuZC5qcGcnKTtcclxuICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgLy90aGlzLmxvYWRlci5hZGQoJ3MxJywgJ2Fzc2V0cy9zbm93Zmxha2UucG5nJyk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5sb2FkZXIuYWRkKCdzMicsICdhc3NldHMvc3VuLnBuZycpO1xyXG4gICAgICAgICAgICAvL3RoaXMubG9hZGVyLmFkZCgnczMnLCAnYXNzZXRzL3NhbmRnbGFzcy5wbmcnKTtcclxuICAgICAgICAgICAgLy90aGlzLmxvYWRlci5hZGQoJ3M0JywgJ2Fzc2V0cy92aWN0b3J5LnBuZycpO1xyXG4gICAgICAgICAgICAvL3RoaXMubG9hZGVyLmFkZCgnczUnLCAnYXNzZXRzL2EucG5nJyk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5sb2FkZXIuYWRkKCdzNicsICdhc3NldHMvay5wbmcnKTtcclxuICAgICAgICAgICAgLy90aGlzLmxvYWRlci5hZGQoJ3M3JywgJ2Fzc2V0cy9xLnBuZycpO1xyXG4gICAgICAgICAgICAvL3RoaXMubG9hZGVyLmFkZCgnczgnLCAnYXNzZXRzL2oucG5nJyk7XHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIC8vdGhpcy5sb2FkZXIuYWRkKCdzcGluJywgJ2Fzc2V0cy9zcGluLnBuZycpO1xyXG4gICAgICAgICAgICAvL3RoaXMubG9hZGVyLmFkZCgnc3Bpbl9kaXNhYmxlZCcsICdhc3NldHMvc3Bpbl9kaXNhYmxlZC5wbmcnKTtcclxuICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgLy90aGlzLmxvYWRlci5hZGQoJ3dpbicsICdhc3NldHMvd2luLnBuZycpO1xyXG4gICAgICAgICAgICAvL3RoaXMubG9hZGVyLmFkZCgnYmFsYW5jZScsICdhc3NldHMvYmFsYW5jZS5wbmcnKTtcclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy5sb2FkZXIuYWRkKCdiZXQnLCAnYXNzZXRzL2JldC5wbmcnKTtcclxuICAgICAgICAgICAgLy90aGlzLmxvYWRlci5hZGQoJ2JldF9taW51cycsICdhc3NldHMvYmV0X21pbnVzLnBuZycpO1xyXG4gICAgICAgICAgICAvL3RoaXMubG9hZGVyLmFkZCgnYmV0X21pbnVzX2Rpc2FibGVkJywgJ2Fzc2V0cy9iZXRfbWludXNfZGlzYWJsZWQucG5nJyk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5sb2FkZXIuYWRkKCdiZXRfcGx1cycsICdhc3NldHMvYmV0X3BsdXMucG5nJyk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5sb2FkZXIuYWRkKCdiZXRfcGx1c19kaXNhYmxlZCcsICdhc3NldHMvYmV0X3BsdXNfZGlzYWJsZWQucG5nJyk7XHJcblxyXG4gICAgICAgICAgICAvL3RoaXMubG9hZGVyLm9uKFwicHJvZ3Jlc3NcIiwgdGhpcy5vbkdyYXBoaWNzTG9hZFByb2dyZXNzLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAvL3RoaXMubG9hZGVyLmxvYWQodGhpcy5vbkdyYXBoaWNzTG9hZENvbXBsZXRlLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zb3VuZCA9IG5ldyBIb3dsKHtcclxuICAgICAgICAgICAgICAgIHNyYzogW1wiYXNzZXRzL3NvdW5kcy5tcDNcIl0sXHJcbiAgICAgICAgICAgICAgICBzcHJpdGU6IHtcclxuICAgICAgICAgICAgICAgICAgICBiZXQ6IFswLCAzNzBdLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwaW46IFszNzAsIDIyMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgd2luX3MxOiBbMzk0MCwgMTIwMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgd2luX3MyOiBbNTkwLCAxNDAwXSxcclxuICAgICAgICAgICAgICAgICAgICB3aW5fczM6IFs1OTgwLCAxMDYwXSxcclxuICAgICAgICAgICAgICAgICAgICB3aW5fczQ6IFsyMTEwLCAxNjMwXSxcclxuICAgICAgICAgICAgICAgICAgICB3aW5fcm95YWw6IFs3MDQwLCA3MjBdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zb3VuZC5vbihcImxvYWRcIiwgdGhpcy5vblNvdW5kc0xvYWRDb21wbGV0ZS5iaW5kKHRoaXMpKVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uU291bmRzTG9hZENvbXBsZXRlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLnNvdW5kc0xvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZEFzc2V0c0xvYWRlZE5vdGUoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvbkdyYXBoaWNzTG9hZENvbXBsZXRlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLmdyYXBoaWNzTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zZW5kQXNzZXRzTG9hZGVkTm90ZSgpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNlbmRBc3NldHNMb2FkZWROb3RlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmdyYXBoaWNzTG9hZGVkICYmIHRoaXMuc291bmRzTG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oXHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdC5BcHBDb25zdGFudHMuQVNTRVRTX0xPQURFRCxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdW5kXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25HcmFwaGljc0xvYWRQcm9ncmVzczogZnVuY3Rpb24obG9hZGVyLCBmaWxlKXtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogXCJMb2FkZXJQcm94eVwiXHJcbiAgICB9XHJcbik7IiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2NcclxuICogQGNsYXNzICAgICAgIFNlcnZlclByb3h5XHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC5tb2RlbC5wcm94eS5TZXJ2ZXJQcm94eScsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLlByb3h5XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvLyBEYXRhXHJcbiAgICAgICAgcmVzdWx0Vk86IG51bGwsXHJcblxyXG4gICAgICAgIC8vIFNlcnZpY2VzXHJcbiAgICAgICAgc2VydmVyOiBudWxsLFxyXG5cclxuICAgICAgICBvblJlZ2lzdGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzdWx0Vk8gPSBuZXcgc2xvdC5tb2RlbC52by5SZXN1bHRWTygpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXJ2ZXIgPSBuZXcgc2xvdC5tb2RlbC5wcm94eS5zZXJ2aWNlLlNlcnZlclNlcnZpY2UoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLnNlcnZlci5pbml0KHRoaXMub25TZXJ2ZXJJbml0LmJpbmQodGhpcykpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNwaW46IGZ1bmN0aW9uKGJldEFtb3VudCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlcnZlci5sb2FkU3BpblJlc3VsdChiZXRBbW91bnQsIHRoaXMub25SZXN1bHQuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25TZXJ2ZXJJbml0OiBmdW5jdGlvbihyZXN1bHQpe1xyXG4gICAgICAgICAgICB0aGlzLnJlc3VsdFZPLnVwZGF0ZShyZXN1bHQpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oc2xvdC5BcHBDb25zdGFudHMuU0VSVkVSX0lOSVQsIHRoaXMucmVzdWx0Vk8pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uUmVzdWx0OiBmdW5jdGlvbihyZXN1bHQpe1xyXG4gICAgICAgICAgICB0aGlzLnJlc3VsdFZPLnVwZGF0ZShyZXN1bHQpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oc2xvdC5BcHBDb25zdGFudHMuU1BJTl9SRVNVTFQsIHRoaXMucmVzdWx0Vk8pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogXCJTZXJ2ZXJQcm94eVwiXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBXaW5kb3dTaXplUHJveHlcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90Lm1vZGVsLnByb3h5LldpbmRvd1NpemVQcm94eScsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLlByb3h5XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvLyBEYXRhXHJcbiAgICAgICAgd2luZG93U2l6ZVZPOiBudWxsLFxyXG5cclxuICAgICAgICBvblJlZ2lzdGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2luZG93U2l6ZVZPID0gbmV3IHNsb3QubW9kZWwudm8uV2luZG93U2l6ZVZPKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9yaWVudGF0aW9uOiBcIiArIHRoaXMud2luZG93U2l6ZVZPLm9yaWVudGF0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpLCB0cnVlKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZih3aW5kb3cuYXR0YWNoRXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYXR0YWNoRXZlbnQoJ29ucmVzaXplJywgdGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uUmVzaXplOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLndpbmRvd1NpemVWTy51cGRhdGUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihzbG90LkFwcENvbnN0YW50cy5XSU5ET1dfUkVTSVpFRCwgdGhpcy53aW5kb3dTaXplVk8pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBOQU1FOiBcIldpbmRvd1NpemVQcm94eVwiXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBHYW1lQ29uZmlnVk9cclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90Lm1vZGVsLnZvLkdhbWVDb25maWdWTydcclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIG51bVJlZWxzOiA1LFxyXG4gICAgICAgIG51bVJvd3M6IDMsXHJcbiAgICAgICAgbnVtU3ltYm9sczogOCxcclxuICAgICAgICBudW1MaW5lczogNSxcclxuICAgICAgICByZWVsczpcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgWzEsNSwyLDEsNiw1LDgsNSwxLDIsMyw3LDQsNSw4LDEsNCwzLDIsNSw2XSxcclxuICAgICAgICAgICAgICAgIFs1LDEsNiwzLDcsOCwxLDMsMiw0LDYsOCw1LDQsNSwzLDgsNyw1LDQsMSw3LDQsOCw0XSxcclxuICAgICAgICAgICAgICAgIFs4LDQsMSwzLDIsNiw3LDIsMyw0LDEsNSw2LDcsOCwyLDUsNCwzLDEsMiw3LDYsNywxLDQsMywyLDRdLFxyXG4gICAgICAgICAgICAgICAgWzEsNyw0LDIsMyw4LDQsMywyLDUsNiw3LDIsMyw0LDUsOCwxLDIsNiwyLDQsMiw2LDMsNyw4LDQsNiwyLDMsMSwyLDUsNiwzLDRdLFxyXG4gICAgICAgICAgICAgICAgWzgsNSwxXVxyXG4gICAgICAgICAgICAgICAgLy9bNCw0XSxcclxuICAgICAgICAgICAgICAgIC8vWzQsNF0sXHJcbiAgICAgICAgICAgICAgICAvL1s0LDRdLFxyXG4gICAgICAgICAgICAgICAgLy9bMSwyLDQsNF0sXHJcbiAgICAgICAgICAgICAgICAvL1sxLDIsNCw0XVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIHBheXRhYmxlOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCIxXCI6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiM1wiOiAyNTAsXHJcbiAgICAgICAgICAgICAgICBcIjRcIjogNTAwLFxyXG4gICAgICAgICAgICAgICAgXCI1XCI6IDEwMDBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCIyXCI6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiM1wiOiAyMDAsXHJcbiAgICAgICAgICAgICAgICBcIjRcIjogNDUwLFxyXG4gICAgICAgICAgICAgICAgXCI1XCI6IDgwMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIjNcIjpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCIzXCI6IDE1MCxcclxuICAgICAgICAgICAgICAgIFwiNFwiOiA0MDAsXHJcbiAgICAgICAgICAgICAgICBcIjVcIjogNzAwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiNFwiOlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcIjNcIjogMTAwLFxyXG4gICAgICAgICAgICAgICAgXCI0XCI6IDM1MCxcclxuICAgICAgICAgICAgICAgIFwiNVwiOiA2MDBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCI1XCI6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiM1wiOiA5MCxcclxuICAgICAgICAgICAgICAgIFwiNFwiOiAzMDAsXHJcbiAgICAgICAgICAgICAgICBcIjVcIjogNzAwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiNlwiOlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcIjNcIjogODAsXHJcbiAgICAgICAgICAgICAgICBcIjRcIjogMjUwLFxyXG4gICAgICAgICAgICAgICAgXCI1XCI6IDYwMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIjdcIjpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCIzXCI6IDcwLFxyXG4gICAgICAgICAgICAgICAgXCI0XCI6IDIwMCxcclxuICAgICAgICAgICAgICAgIFwiNVwiOiA1MDBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCI4XCI6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiM1wiOiA2MCxcclxuICAgICAgICAgICAgICAgIFwiNFwiOiAxMDAsXHJcbiAgICAgICAgICAgICAgICBcIjVcIjogNDAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlbm9taW5hdGlvbnM6XHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIDAuMjUsIDAuNTAsIDEsIDIsIDUsIDEwXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgZGVmYXVsdERlbm9taW5hdGlvbjogMixcclxuICAgICAgICBsaW5lczpcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgWzEsIDEsIDEsIDEsIDFdLFxyXG4gICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgWzIsIDIsIDIsIDIsIDJdLFxyXG4gICAgICAgICAgICAgICAgWzAsIDEsIDIsIDEsIDBdLFxyXG4gICAgICAgICAgICAgICAgWzIsIDEsIDAsIDEsIDJdXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgbWluT2FrOiAzLFxyXG4gICAgICAgIGhwU3ltYm9sczogWzEsMiwzLDRdLFxyXG4gICAgICAgIHJveWFsczogWzUsNiw3LDhdLFxyXG5cclxuICAgICAgICAvLyBSZXR1cm5zIGFycmF5IHdpdGggYWxsIHBvc3NpYmxlIHN5bWJvbHNcclxuICAgICAgICBnZXRTeW1ib2xzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgc3ltYm9scyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAxOyBpIDw9IHRoaXMubnVtU3ltYm9sczsgaSsrKXtcclxuICAgICAgICAgICAgICAgIHN5bWJvbHMucHVzaChcInNcIiArIGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzeW1ib2xzO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGlzUm95YWxTeW1ib2w6IGZ1bmN0aW9uKHN5bWJvbElEKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm95YWxzLmluZGV4T2Yoc3ltYm9sSUQpICE9IC0xO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogXCJHYW1lQ29uZmlnVk9cIlxyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgUmVzdWx0Vk9cclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90Lm1vZGVsLnZvLlJlc3VsdFZPJ1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgbWF0cml4OlxyXG4gICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICBbMSw0LDVdLFxyXG4gICAgICAgICAgICAgICAgWzUsNiwzXSxcclxuICAgICAgICAgICAgICAgIFsxLDIsOF0sXHJcbiAgICAgICAgICAgICAgICBbMyw3LDZdLFxyXG4gICAgICAgICAgICAgICAgWzIsNiw1XVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIGJhbGFuY2U6IDAsXHJcbiAgICAgICAgdG90YWxXaW46IDAsXHJcbiAgICAgICAgbnVtV2luczogMCxcclxuICAgICAgICB3aW5zOiBudWxsLFxyXG5cclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uKHJlc3VsdCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIHRoaXMubWF0cml4ID0gcmVzdWx0Lm1hdHJpeDtcclxuICAgICAgICAgICAgdGhpcy5iYWxhbmNlID0gcmVzdWx0LmJhbGFuY2U7XHJcbiAgICAgICAgICAgIHRoaXMudG90YWxXaW4gPSByZXN1bHQudG90YWxXaW47XHJcbiAgICAgICAgICAgIHRoaXMubnVtV2lucyA9IHJlc3VsdC5udW1XaW5zO1xyXG4gICAgICAgICAgICB0aGlzLndpbnMgPSByZXN1bHQud2lucztcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXRTeW1ib2xNYXRyaXg6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1hdHJpeC5tYXAoZnVuY3Rpb24oXywgaW5kZXgsIG1hdHJpeCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWF0cml4W2luZGV4XS5tYXAoZnVuY3Rpb24oc3ltYm9sSUQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInNcIiArIHN5bWJvbElEO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBOQU1FOiBcIlJlc3VsdFZPXCJcclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2NcclxuICogQGNsYXNzICAgICAgIFVJQ29uZmlnVk9cclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90Lm1vZGVsLnZvLlVJQ29uZmlnVk8nXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBzeW1ib2xXaWR0aDogMTMwLFxyXG4gICAgICAgIHN5bWJvbEhlaWdodDogMTMwLFxyXG5cclxuICAgICAgICByZWVsSFNlcGFyYXRvcjogMTAsXHJcbiAgICAgICAgcmVlbFZTZXBhcmF0b3I6IDEwLFxyXG4gICAgICAgIHJlZWxIUGFkZGluZzogMjAsXHJcbiAgICAgICAgcmVlbFZQYWRkaW5nOiAyMCxcclxuXHJcbiAgICAgICAgY3VycmVuY3k6IFwiJFwiLFxyXG5cclxuICAgICAgICByZWVsU3BpbkRlbGF5OiAwLjEsXHJcbiAgICAgICAgbWluU3BpbkR1cmF0aW9uOiAyLFxyXG5cclxuICAgICAgICBsaW5lUG9pbnRzOlxyXG4gICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICBbWzMwLDIyNV0sWzcwMCwyMjVdXSxcclxuICAgICAgICAgICAgICAgIFtbMzAsODVdLFs3MDAsODVdXSxcclxuICAgICAgICAgICAgICAgIFtbMzAsMzY1XSxbNzAwLDM2NV1dLFxyXG4gICAgICAgICAgICAgICAgW1szMCwzMF0sWzM2NSwzNjVdLFs3MDAsMzBdXSxcclxuICAgICAgICAgICAgICAgIFtbMzAsNDIwXSxbMzY1LDg1XSxbNzAwLDQyMF1dLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIHdpbkFubm91bmNlRGVsYXk6IDIsXHJcbiAgICAgICAgcmVwZWF0V2luczogMTAsXHJcbiAgICAgICAgcmVzcG9uc2l2ZVNjYWxlOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgd2luOlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB4OiAwLjM3NSxcclxuICAgICAgICAgICAgICAgIHk6IDAuMDEsXHJcbiAgICAgICAgICAgICAgICB3OiAwLjI1LFxyXG4gICAgICAgICAgICAgICAgaDogMC4xMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0eHRXaW46XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHg6IDAuNSxcclxuICAgICAgICAgICAgICAgIHk6IDAuNyxcclxuICAgICAgICAgICAgICAgIGZvbnQ6IDAuNFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBiZXQ6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHg6IDAuMDQ1LFxyXG4gICAgICAgICAgICAgICAgeTogMC44OSxcclxuICAgICAgICAgICAgICAgIHc6IDAuMjUsXHJcbiAgICAgICAgICAgICAgICBoOiAwLjEwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHR4dEJldDpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgeDogMC41LFxyXG4gICAgICAgICAgICAgICAgeTogMC43LFxyXG4gICAgICAgICAgICAgICAgZm9udDogMC40XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJhbGFuY2U6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHg6IDAuMzc1LFxyXG4gICAgICAgICAgICAgICAgeTogMC44OSxcclxuICAgICAgICAgICAgICAgIHc6IDAuMjUsXHJcbiAgICAgICAgICAgICAgICBoOiAwLjEwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHR4dEJhbGFuY2U6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHg6IDAuNSxcclxuICAgICAgICAgICAgICAgIHk6IDAuNyxcclxuICAgICAgICAgICAgICAgIGZvbnQ6IDAuNFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzcGluOlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB4OiAwLjcwNSxcclxuICAgICAgICAgICAgICAgIHk6IDAuODksXHJcbiAgICAgICAgICAgICAgICB3OiAwLjI1LFxyXG4gICAgICAgICAgICAgICAgaDogMC4xMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZWVsQXJlYTpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgeDogMC4wNDUsXHJcbiAgICAgICAgICAgICAgICB5OiAwLjEyNSxcclxuICAgICAgICAgICAgICAgIHc6IDAuOTEsXHJcbiAgICAgICAgICAgICAgICBoOiAwLjc1XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZWVsQXJlYUJHQ29sb3I6IDB4RkZGRkZGLFxyXG4gICAgICAgIHJlZWxCR0NvbG9yOiAweDJCNkYxQSxcclxuICAgICAgICByZWVsSGlnaGxpZ2h0Q29sb3I6IDB4MDA2NDMzLFxyXG5cclxuICAgICAgICB3aW5MaW5lV2lkdGg6IDUsXHJcbiAgICAgICAgd2luTGluZUNvbG9yOiAweEE4MUMxRFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6IFwiVUlDb25maWdWT1wiXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBXaW5kb3dTaXplVk9cclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90Lm1vZGVsLnZvLldpbmRvd1NpemVWTycsXHJcbiAgICAgICAgY29uc3RydWN0b3I6IGZ1bmN0aW9uKHcsIGgpe1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSh3LCBoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICB3aWR0aDogbnVsbCxcclxuICAgICAgICBoZWlnaHQ6IG51bGwsXHJcbiAgICAgICAgb3JpZW50YXRpb246IG51bGwsXHJcblxyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24odywgaCl7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB3O1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IGg7XHJcbiAgICAgICAgICAgIHRoaXMub3JpZW50YXRpb24gPSBzbG90Lm1vZGVsLmxpYi5VdGlscy5nZXRPcmllbnRhdGlvbih3LCBoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogXCJXaW5kb3dTaXplVk9cIlxyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgU2VydmVyU2VydmljZVxyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3QubW9kZWwucHJveHkuc2VydmljZS5TZXJ2ZXJTZXJ2aWNlJyxcclxuICAgICAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy5nYW1lQ29uZmlnVk8gPSBuZXcgc2xvdC5tb2RlbC52by5HYW1lQ29uZmlnVk8oKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBjYWxsYmFjazogbnVsbCxcclxuICAgICAgICBnYW1lQ29uZmlnVk86IG51bGwsXHJcbiAgICAgICAgYmV0QW1vdW50OiBudWxsLFxyXG4gICAgICAgIGJhbGFuY2U6IG51bGwsXHJcblxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLmJldEFtb3VudCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuZGVwb3NpdCgpO1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQodGhpcy5zZW5kU3BpblJlc3VsdC5iaW5kKHRoaXMpLCA1MDApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGVwb3NpdDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy5iYWxhbmNlID0gKE1hdGgucmFuZG9tKCkgKiA1MDApICsgNTAwO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGxvYWRTcGluUmVzdWx0OiBmdW5jdGlvbiAoYmV0QW1vdW50LCBjYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLmJldEFtb3VudCA9IGJldEFtb3VudDtcclxuICAgICAgICAgICAgdGhpcy5iYWxhbmNlIC09IHRoaXMuYmV0QW1vdW50O1xyXG4gICAgICAgICAgICBpZih0aGlzLmJhbGFuY2UgPCB0aGlzLmdhbWVDb25maWdWTy5kZW5vbWluYXRpb25zW3RoaXMuZ2FtZUNvbmZpZ1ZPLmRlbm9taW5hdGlvbnMubGVuZ3RoIC0gMV0pe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZXBvc2l0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMuc2VuZFNwaW5SZXN1bHQuYmluZCh0aGlzKSwgMTAwMCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2VuZFNwaW5SZXN1bHQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2sodGhpcy5jYWxjdWxhdGVTcGluUmVzdWx0KCkpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNhbGN1bGF0ZVNwaW5SZXN1bHQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcclxuICAgICAgICAgICAgdmFyIHJlZWxzID0gdGhpcy5nYW1lQ29uZmlnVk8ucmVlbHM7XHJcbiAgICAgICAgICAgIHZhciByZWVsTWF0cml4ID0gW107XHJcbiAgICAgICAgICAgIGZvciAodmFyIGk9MDsgaTx0aGlzLmdhbWVDb25maWdWTy5udW1SZWVsczsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVlbFN0b3BQb3MgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiByZWVsc1tpXS5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgcmVlbE1hdHJpeFtpXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IHRoaXMuZ2FtZUNvbmZpZ1ZPLm51bVJvd3M7IGorKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVlbE1hdHJpeFtpXVtqXSA9IHRoaXMuZ2V0U3ltYm9sQXQocmVlbHNbaV0sIHJlZWxTdG9wUG9zICsgaik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVlbE1hdHJpeCA9IHRoaXMuZm9yY2VSZXN1bHQocmVlbE1hdHJpeCk7XHJcbiAgICAgICAgICAgIHZhciBsaW5lU3ltYm9scyA9IHRoaXMuZ2V0TGluZVN5bWJvbHMocmVlbE1hdHJpeCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgd2lucyA9IHRoaXMuZ2V0V2lucyhsaW5lU3ltYm9scyk7XHJcblxyXG4gICAgICAgICAgICByZXN1bHQubWF0cml4ID0gcmVlbE1hdHJpeDtcclxuICAgICAgICAgICAgcmVzdWx0Lm51bVdpbnMgPSB3aW5zLmxlbmd0aDtcclxuICAgICAgICAgICAgcmVzdWx0LnRvdGFsV2luID0gd2lucy5yZWR1Y2UoZnVuY3Rpb24ocHYsIGN2KXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwdiArIGN2LndpbkFtb3VudDtcclxuICAgICAgICAgICAgfSwgMCk7XHJcbiAgICAgICAgICAgIHJlc3VsdC53aW5zID0gd2lucztcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYmFsYW5jZSArPSByZXN1bHQudG90YWxXaW47XHJcbiAgICAgICAgICAgIHJlc3VsdC5iYWxhbmNlID0gdGhpcy5iYWxhbmNlO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXRTeW1ib2xBdDogZnVuY3Rpb24ocmVlbCwgcG9zKXtcclxuICAgICAgICAgICAgaWYocG9zID4gcmVlbC5sZW5ndGggLSAxKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWVsW3BvcyAtIHJlZWwubGVuZ3RoXTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVlbFtwb3NdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0TGluZVN5bWJvbHM6IGZ1bmN0aW9uKG1hdHJpeCl7XHJcbiAgICAgICAgICAgIHZhciBsaW5lcyA9IHRoaXMuZ2FtZUNvbmZpZ1ZPLmxpbmVzO1xyXG4gICAgICAgICAgICB2YXIgbGluZVN5bWJvbHMgPSBbXTtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMuZ2FtZUNvbmZpZ1ZPLm51bUxpbmVzOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGluZVN5bWJvbHNbaV0gPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCB0aGlzLmdhbWVDb25maWdWTy5udW1SZWVsczsgaisrKXtcclxuICAgICAgICAgICAgICAgICAgICBsaW5lU3ltYm9sc1tpXVtqXSA9IG1hdHJpeFtqXVtsaW5lc1tpXVtqXV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGxpbmVTeW1ib2xzO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdldFdpbnM6IGZ1bmN0aW9uKGxpbmVTeW1ib2xzKXtcclxuICAgICAgICAgICAgdmFyIHdpbnMgPSBbXTtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMuZ2FtZUNvbmZpZ1ZPLm51bUxpbmVzOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgdmFyIG9hayA9IDE7XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGogPSAxOyBqIDwgdGhpcy5nYW1lQ29uZmlnVk8ubnVtUmVlbHM7IGorKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYobGluZVN5bWJvbHNbaV1bal0gPT0gbGluZVN5bWJvbHNbaV1bai0xXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9haysrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihvYWsgPj0gdGhpcy5nYW1lQ29uZmlnVk8ubWluT2FrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHdpbm5pbmdTeW1ib2wgPSBsaW5lU3ltYm9sc1tpXVswXTtcclxuICAgICAgICAgICAgICAgICAgICB3aW5zLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVOdW1iZXI6IGksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYWs6IG9hayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN5bWJvbDogd2lubmluZ1N5bWJvbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbkFtb3VudDogdGhpcy5nYW1lQ29uZmlnVk8ucGF5dGFibGVbd2lubmluZ1N5bWJvbF1bb2FrXSAqIHRoaXMuYmV0QW1vdW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB3aW5zO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGZvcmNlUmVzdWx0OiBmdW5jdGlvbihtYXRyaXgpe1xyXG4gICAgICAgICAgICAvL3JldHVybiBtYXRyaXg7XHJcbiAgICAgICAgICAgIG1hdHJpeCA9IFtbMSwyLDNdLFsxLDIsM10sWzEsMiwzXSxbMSwyLDNdLFsxLDIsM11dO1xyXG4gICAgICAgICAgICBtYXRyaXggPSBbWzQsNSw2XSxbNCw1LDZdLFs0LDUsNl0sWzQsNSw2XSxbNCw1LDZdXTtcclxuICAgICAgICAgICAgLy9tYXRyaXggPSBbWzcsOCwxXSxbNyw4LDJdLFs3LDgsM10sWzcsOCw0XSxbNyw4LDVdXTtcclxuICAgICAgICAgICAgcmV0dXJuIG1hdHJpeDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6IFwiU2VydmVyU2VydmljZVwiXHJcbiAgICB9XHJcbik7IiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2NcclxuICogQGNsYXNzICAgICAgIEFzc2V0c0xvYWRlZENvbW1hbmRcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LmNvbnRyb2xsZXIuY29tbWFuZC5Bc3NldHNMb2FkZWRDb21tYW5kJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuU2ltcGxlQ29tbWFuZFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKG5vdGUpIHtcclxuICAgICAgICAgICAgdmFyIHNlcnZlciA9IHRoaXMuZmFjYWRlLnJldHJpZXZlUHJveHkoc2xvdC5tb2RlbC5wcm94eS5TZXJ2ZXJQcm94eS5OQU1FKTtcclxuICAgICAgICAgICAgc2VydmVyLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBQcmVwQ29udHJvbGxlckNvbW1hbmRcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LmNvbnRyb2xsZXIuY29tbWFuZC5QcmVwQ29udHJvbGxlckNvbW1hbmQnLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5TaW1wbGVDb21tYW5kXHJcbiAgICB9LFxyXG4gIFxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIC8vIFJlZ2lzdGVyIGFsbCBjb21tYW5kc1xyXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uIChub3RlKSB7ICAgXHJcbiAgICAgICAgICAgIHRoaXMuZmFjYWRlLnJlZ2lzdGVyQ29tbWFuZChzbG90LkFwcENvbnN0YW50cy5BU1NFVFNfTE9BREVELCBzbG90LmNvbnRyb2xsZXIuY29tbWFuZC5Bc3NldHNMb2FkZWRDb21tYW5kKTtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJDb21tYW5kKHNsb3QuQXBwQ29uc3RhbnRzLldJTkRPV19SRVNJWkVELCBzbG90LmNvbnRyb2xsZXIuY29tbWFuZC5XaW5kb3dSZXNpemVDb21tYW5kKTtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJDb21tYW5kKHNsb3QuQXBwQ29uc3RhbnRzLlNQSU4sIHNsb3QuY29udHJvbGxlci5jb21tYW5kLlNwaW5Db21tYW5kKTtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJDb21tYW5kKHNsb3QuQXBwQ29uc3RhbnRzLlNQSU5fRU5ELCBzbG90LmNvbnRyb2xsZXIuY29tbWFuZC5TcGluRW5kQ29tbWFuZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSAgICBcclxuKTsiLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgUHJlcE1vZGVsQ29tbWFuZFxyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3QuY29udHJvbGxlci5jb21tYW5kLlByZXBNb2RlbENvbW1hbmQnLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5TaW1wbGVDb21tYW5kXHJcbiAgICB9LFxyXG4gIFxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIC8vIFJlZ2lzdGVyIGFsbCBQcm94eXNcclxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAobm90ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3RlclByb3h5KG5ldyBzbG90Lm1vZGVsLnByb3h5LkxvYWRlclByb3h5KCkpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3RlclByb3h5KG5ldyBzbG90Lm1vZGVsLnByb3h5LldpbmRvd1NpemVQcm94eSgpKTtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJQcm94eShuZXcgc2xvdC5tb2RlbC5wcm94eS5Db25maWdQcm94eSgpKTtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJQcm94eShuZXcgc2xvdC5tb2RlbC5wcm94eS5TZXJ2ZXJQcm94eSgpKTtcclxuICAgICAgICB9XHJcbiAgICB9ICAgIFxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgUHJlcFBpeGlDb21tYW5kXHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC5jb250cm9sbGVyLmNvbW1hbmQuUHJlcFBpeGlDb21tYW5kJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuU2ltcGxlQ29tbWFuZFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKG5vdGUpIHtcclxuICAgICAgICAgICAgUFhSb290ID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XHJcblxyXG4gICAgICAgICAgICBQWFJlbmRlcmVyID0gbmV3IFBJWEkuYXV0b0RldGVjdFJlbmRlcmVyKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xyXG4gICAgICAgICAgICBQWFJlbmRlcmVyLnZpZXcuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuXHJcbiAgICAgICAgICAgIFBYUm9vdC5pbnRlcmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIFBYUm9vdC5vbihcInRhcFwiLHRoaXMuc2V0RnVsbFNjcmVlbik7XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWVcIikuYXBwZW5kQ2hpbGQoUFhSZW5kZXJlci52aWV3KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlbmRlciBsb29wXHJcbiAgICAgICAgICAgIHdpbmRvdy5yZW5kZXJMb29wID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIFBYUmVuZGVyZXIucmVuZGVyKFBYUm9vdCk7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUod2luZG93LnJlbmRlckxvb3ApO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB3aW5kb3cucmVuZGVyTG9vcCgpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNldEZ1bGxTY3JlZW46IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmIChzY3JlZW5mdWxsLmVuYWJsZWQgJiYgIXNjcmVlbmZ1bGwuaXNGdWxsc2NyZWVuKSB7XHJcbiAgICAgICAgICAgICAgICBzY3JlZW5mdWxsLnJlcXVlc3QoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBQcmVwVmlld0NvbW1hbmRcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lIChcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC5jb250cm9sbGVyLmNvbW1hbmQuUHJlcFZpZXdDb21tYW5kJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuU2ltcGxlQ29tbWFuZFxyXG4gICAgfSxcclxuIFxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uIChub3RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjYWRlLnJlZ2lzdGVyTWVkaWF0b3IobmV3IHNsb3Qudmlldy5tZWRpYXRvci5CR01lZGlhdG9yKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3Rlck1lZGlhdG9yKG5ldyBzbG90LnZpZXcubWVkaWF0b3IuUmVlbENvbnRhaW5lck1lZGlhdG9yKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3Rlck1lZGlhdG9yKG5ldyBzbG90LnZpZXcubWVkaWF0b3IuV2luQW5ub3VuY2VNZWRpYXRvcigpKTtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJNZWRpYXRvcihuZXcgc2xvdC52aWV3Lm1lZGlhdG9yLlNvdW5kUGxheWVyTWVkaWF0b3IoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjYWRlLnJlZ2lzdGVyTWVkaWF0b3IobmV3IHNsb3Qudmlldy5tZWRpYXRvci5QYW5lbE1lZGlhdG9yKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2NcclxuICogQGNsYXNzICAgICAgIFNwaW5Db21tYW5kXHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC5jb250cm9sbGVyLmNvbW1hbmQuU3BpbkNvbW1hbmQnLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5TaW1wbGVDb21tYW5kXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAobm90ZSkge1xyXG4gICAgICAgICAgICB2YXIgc2VydmVyID0gdGhpcy5mYWNhZGUucmV0cmlldmVQcm94eShzbG90Lm1vZGVsLnByb3h5LlNlcnZlclByb3h5Lk5BTUUpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oc2xvdC5BcHBDb25zdGFudHMuU1RPUF9XSU5fQU5OT1VOQ0VNRU5UUyk7XHJcblxyXG4gICAgICAgICAgICBzZXJ2ZXIuc3Bpbihub3RlLmdldEJvZHkoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgU3BpbkVuZENvbW1hbmRcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LmNvbnRyb2xsZXIuY29tbWFuZC5TcGluRW5kQ29tbWFuZCcsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLlNpbXBsZUNvbW1hbmRcclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uIChub3RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihzbG90LkFwcENvbnN0YW50cy5TVEFSVF9XSU5fQU5OT1VOQ0VNRU5UUyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgU3RhcnR1cENvbW1hbmRcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LmNvbnRyb2xsZXIuY29tbWFuZC5TdGFydHVwQ29tbWFuZCcsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLk1hY3JvQ29tbWFuZFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTIFxyXG4gICAge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFN1YmNvbW1hbmRzIHRvIGhhbmRsZSBmYWNhZGUgcmVnaXN0cmF0aW9ucyBmb3JcclxuICAgICAgICAgKiBNb2RlbCwgVmlldyBhbmQgQ29udHJvbGxlclxyXG4gICAgICAgICAqIEFsc28gcnVucyBzdWIgY29tbWFuZCB0byBpbml0aWFsaXplIFBJWEkgZnJhbWV3b3JrXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaW5pdGlhbGl6ZU1hY3JvQ29tbWFuZDogZnVuY3Rpb24gKG5vdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRTdWJDb21tYW5kKHNsb3QuY29udHJvbGxlci5jb21tYW5kLlByZXBQaXhpQ29tbWFuZCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZFN1YkNvbW1hbmQoc2xvdC5jb250cm9sbGVyLmNvbW1hbmQuUHJlcENvbnRyb2xsZXJDb21tYW5kKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRTdWJDb21tYW5kKHNsb3QuY29udHJvbGxlci5jb21tYW5kLlByZXBNb2RlbENvbW1hbmQpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZFN1YkNvbW1hbmQoc2xvdC5jb250cm9sbGVyLmNvbW1hbmQuUHJlcFZpZXdDb21tYW5kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgV2luZG93UmVzaXplQ29tbWFuZFxyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3QuY29udHJvbGxlci5jb21tYW5kLldpbmRvd1Jlc2l6ZUNvbW1hbmQnLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5TaW1wbGVDb21tYW5kXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAobm90ZSkge1xyXG4gICAgICAgICAgICB2YXIgd2luZG93U2l6ZVZPID0gbm90ZS5nZXRCb2R5KCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHdpbmRvd1NpemVWTyk7XHJcbiAgICAgICAgICAgIFBYUmVuZGVyZXIucmVzaXplKHdpbmRvd1NpemVWTy53aWR0aCwgd2luZG93U2l6ZVZPLmhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgQkdcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LnZpZXcuY29tcG9uZW50LkJHJyxcclxuICAgICAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLy8gU3RhZ2UgTWVtYmVyc1xyXG4gICAgICAgIHN0YWdlOiBudWxsLFxyXG4gICAgICAgIGJnOiBudWxsLFxyXG5cclxuICAgICAgICAvLyBSZWZlcmVuY2VzXHJcbiAgICAgICAgT1JJRU5UQVRJT046IHNsb3QubW9kZWwuZW51bS5PUklFTlRBVElPTixcclxuXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24od2luZG93U2l6ZVZPKXtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLnNldHVwVmlldyh3aW5kb3dTaXplVk8pO1xyXG5cclxuICAgICAgICAgICAgUFhSb290LmFkZENoaWxkKHRoaXMuc3RhZ2UpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFkZENoaWxkcmVuOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLmJnID0gbmV3IFBJWEkuU3ByaXRlKFBJWEkuVGV4dHVyZS5mcm9tRnJhbWUoXCJiZ1wiKSk7XHJcbiAgICAgICAgICAgIHRoaXMuYmcuYW5jaG9yLnNldCgwLjUsMC41KTtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmJnKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZXR1cFZpZXc6IGZ1bmN0aW9uKHdpbmRvd1NpemVWTyl7XHJcbiAgICAgICAgICAgIC8vIEZpbGwgc2NyZWVuXHJcbiAgICAgICAgICAgIHZhciBzaXplID0gc2xvdC5tb2RlbC5saWIuVXRpbHMuZ2V0U2l6ZVRvRmlsbFNjcmVlbihcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDp0aGlzLmJnLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogdGhpcy5iZy5oZWlnaHRcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6d2luZG93U2l6ZVZPLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogd2luZG93U2l6ZVZPLmhlaWdodFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5iZy53aWR0aCA9IHNpemUud2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuYmcuaGVpZ2h0ID0gc2l6ZS5oZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJnLnggPSB3aW5kb3dTaXplVk8ud2lkdGgvMjtcclxuICAgICAgICAgICAgdGhpcy5iZy55ID0gd2luZG93U2l6ZVZPLmhlaWdodC8yO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGhhbmRsZVJlc2l6ZTogZnVuY3Rpb24od2luZG93U2l6ZVZPKXtcclxuICAgICAgICAgICAgdGhpcy5zZXR1cFZpZXcod2luZG93U2l6ZVZPKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogJ0JHJ1xyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgUGFuZWxcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LnZpZXcuY29tcG9uZW50LlBhbmVsJyxcclxuICAgICAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLy8gU3RhZ2UgTWVtYmVyc1xyXG4gICAgICAgIHN0YWdlOiBudWxsLFxyXG5cclxuICAgICAgICBzcGluOiBudWxsLFxyXG4gICAgICAgIGJ0blNwaW46IG51bGwsXHJcblxyXG4gICAgICAgIHdpbjogbnVsbCxcclxuICAgICAgICB0eHRXaW46IG51bGwsXHJcblxyXG4gICAgICAgIGJhbGFuY2U6IG51bGwsXHJcbiAgICAgICAgdHh0QmFsYW5jZTogbnVsbCxcclxuXHJcbiAgICAgICAgYmV0OiBudWxsLFxyXG4gICAgICAgIGJ0bkJldFBsdXM6IG51bGwsXHJcbiAgICAgICAgYnRuQmV0TWludXM6IG51bGwsXHJcbiAgICAgICAgdHh0QmV0OiBudWxsLFxyXG4gICAgICAgIGJldEFtb3VudDogbnVsbCxcclxuXHJcbiAgICAgICAgY3VycmVuY3k6IG51bGwsXHJcbiAgICAgICAgZGVub21pbmF0aW9uczogbnVsbCxcclxuICAgICAgICBjdXJyZW50RGVub21pbmF0aW9uOiBudWxsLFxyXG5cclxuICAgICAgICByZXNwU2NhbGU6IG51bGwsXHJcblxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVuY3kgPSBkYXRhLnVpQ29uZmlnVk8uY3VycmVuY3k7XHJcbiAgICAgICAgICAgIHRoaXMucmVzcFNjYWxlID0gZGF0YS51aUNvbmZpZ1ZPLnJlc3BvbnNpdmVTY2FsZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGVub21pbmF0aW9ucyA9IGRhdGEuZ2FtZUNvbmZpZ1ZPLmRlbm9taW5hdGlvbnM7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudERlbm9taW5hdGlvbiA9IGRhdGEuZ2FtZUNvbmZpZ1ZPLmRlZmF1bHREZW5vbWluYXRpb247XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dXBWaWV3KGRhdGEud2luZG93U2l6ZVZPKTtcclxuXHJcbiAgICAgICAgICAgIFBYUm9vdC5hZGRDaGlsZCh0aGlzLnN0YWdlKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBhZGRDaGlsZHJlbjogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgLy8gU3BpbiBjb21wb25lbnRcclxuICAgICAgICAgICAgdGhpcy5zcGluID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3Bpbi5hZGRDaGlsZChuZXcgUElYSS5TcHJpdGUoUElYSS5UZXh0dXJlLmZyb21GcmFtZShcInNwaW5fZGlzYWJsZWRcIikpKTtcclxuICAgICAgICAgICAgdGhpcy5zcGluLmFkZENoaWxkKHRoaXMuYnRuU3BpbiA9IG5ldyBQSVhJLlNwcml0ZShQSVhJLlRleHR1cmUuZnJvbUZyYW1lKFwic3BpblwiKSkpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuc3Bpbik7XHJcblxyXG4gICAgICAgICAgICAvLyBXaW4gY29tcG9uZW50ID09PlxyXG4gICAgICAgICAgICB0aGlzLndpbiA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xyXG4gICAgICAgICAgICB0aGlzLndpbi5hZGRDaGlsZChuZXcgUElYSS5TcHJpdGUoUElYSS5UZXh0dXJlLmZyb21GcmFtZShcIndpblwiKSkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50eHRXaW4gPSBuZXcgUElYSS5UZXh0KCk7XHJcbiAgICAgICAgICAgIHRoaXMudHh0V2luLnN0eWxlID0ge2ZvbnRTaXplOiAzMCwgYWxpZ246ICdjZW50ZXInfTtcclxuICAgICAgICAgICAgdGhpcy50eHRXaW4uYW5jaG9yLnNldCgwLjUsIDAuNSk7XHJcbiAgICAgICAgICAgIHRoaXMudHh0V2luLnggPSAxMDA7XHJcbiAgICAgICAgICAgIHRoaXMudHh0V2luLnkgPSA1MjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMud2luLmFkZENoaWxkKHRoaXMudHh0V2luKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy53aW4pO1xyXG4gICAgICAgICAgICAvLyBXaW4gY29tcG9uZW50IDw9PVxyXG5cclxuICAgICAgICAgICAgLy8gQmFsYW5jZSBjb21wb25lbnQgPT0+XHJcbiAgICAgICAgICAgIHRoaXMuYmFsYW5jZSA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xyXG4gICAgICAgICAgICB0aGlzLmJhbGFuY2UuYWRkQ2hpbGQobmV3IFBJWEkuU3ByaXRlKFBJWEkuVGV4dHVyZS5mcm9tRnJhbWUoXCJiYWxhbmNlXCIpKSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnR4dEJhbGFuY2UgPSBuZXcgUElYSS5UZXh0KCk7XHJcbiAgICAgICAgICAgIHRoaXMudHh0QmFsYW5jZS5zdHlsZSA9IHtmb250U2l6ZTogMzAsIGFsaWduOiAnY2VudGVyJ307XHJcbiAgICAgICAgICAgIHRoaXMudHh0QmFsYW5jZS5hbmNob3Iuc2V0KDAuNSwgMC41KTtcclxuICAgICAgICAgICAgdGhpcy50eHRCYWxhbmNlLnggPSAxMDA7XHJcbiAgICAgICAgICAgIHRoaXMudHh0QmFsYW5jZS55ID0gNTI7XHJcbiAgICAgICAgICAgIHRoaXMuYmFsYW5jZS5hZGRDaGlsZCh0aGlzLnR4dEJhbGFuY2UpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmJhbGFuY2UpO1xyXG4gICAgICAgICAgICAvLyA8PT0gQmFsYW5jZSBjb21wb25lbnRcclxuXHJcbiAgICAgICAgICAgIC8vIEJldCBjb21wb25lbnQgPT09PlxyXG4gICAgICAgICAgICB0aGlzLmJldCA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xyXG4gICAgICAgICAgICB0aGlzLmJldC5hZGRDaGlsZChuZXcgUElYSS5TcHJpdGUoUElYSS5UZXh0dXJlLmZyb21GcmFtZShcImJldF9taW51c19kaXNhYmxlZFwiKSkpO1xyXG4gICAgICAgICAgICB0aGlzLmJldC5hZGRDaGlsZCh0aGlzLmJ0bkJldE1pbnVzID0gbmV3IFBJWEkuU3ByaXRlKFBJWEkuVGV4dHVyZS5mcm9tRnJhbWUoXCJiZXRfbWludXNcIikpKTtcclxuICAgICAgICAgICAgdmFyIGJldFNwcml0ZSA9IG5ldyBQSVhJLlNwcml0ZShQSVhJLlRleHR1cmUuZnJvbUZyYW1lKFwiYmV0XCIpKTtcclxuICAgICAgICAgICAgYmV0U3ByaXRlLnggKz0gdGhpcy5idG5CZXRNaW51cy53aWR0aCArIDI7XHJcbiAgICAgICAgICAgIHRoaXMuYmV0LmFkZENoaWxkKGJldFNwcml0ZSk7XHJcbiAgICAgICAgICAgIHZhciBiZXRQbHVzRFNwcml0ZSA9IG5ldyBQSVhJLlNwcml0ZShQSVhJLlRleHR1cmUuZnJvbUZyYW1lKFwiYmV0X3BsdXNfZGlzYWJsZWRcIikpO1xyXG4gICAgICAgICAgICBiZXRQbHVzRFNwcml0ZS54ID0gYmV0U3ByaXRlLnggKyBiZXRTcHJpdGUud2lkdGggKyAyO1xyXG4gICAgICAgICAgICB0aGlzLmJldC5hZGRDaGlsZChiZXRQbHVzRFNwcml0ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYmV0LmFkZENoaWxkKHRoaXMuYnRuQmV0UGx1cyA9IG5ldyBQSVhJLlNwcml0ZShQSVhJLlRleHR1cmUuZnJvbUZyYW1lKFwiYmV0X3BsdXNcIikpKTtcclxuICAgICAgICAgICAgdGhpcy5idG5CZXRQbHVzLnggPSBiZXRQbHVzRFNwcml0ZS54O1xyXG5cclxuICAgICAgICAgICAgdGhpcy50eHRCZXQgPSBuZXcgUElYSS5UZXh0KCk7XHJcbiAgICAgICAgICAgIHRoaXMudHh0QmV0LnN0eWxlID0ge2ZvbnRTaXplOiAzMCwgYWxpZ246ICdjZW50ZXInfTtcclxuICAgICAgICAgICAgdGhpcy50eHRCZXQuYW5jaG9yLnNldCgwLjUsIDAuNSk7XHJcbiAgICAgICAgICAgIHRoaXMudHh0QmV0LnggPSBiZXRTcHJpdGUueCArIDY4O1xyXG4gICAgICAgICAgICB0aGlzLnR4dEJldC55ID0gYmV0U3ByaXRlLnkgKyA1MjtcclxuICAgICAgICAgICAgdGhpcy5iZXQuYWRkQ2hpbGQodGhpcy50eHRCZXQpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmJldCk7XHJcbiAgICAgICAgICAgIC8vIDw9PT0gQmV0IGNvbXBvbmVudFxyXG5cclxuICAgICAgICAgICAgLy8gQnV0dG9uc1xyXG4gICAgICAgICAgICB0aGlzLmJ0blNwaW4uaW50ZXJhY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmJ0blNwaW4ub24oc2xvdC52aWV3LmV2ZW50LlZpZXdFdmVudHMuQ0xJQ0ssIHRoaXMub25TcGluQ2xpY2suYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuQmV0TWludXMuaW50ZXJhY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmJ0bkJldE1pbnVzLm9uKHNsb3Qudmlldy5ldmVudC5WaWV3RXZlbnRzLkNMSUNLLCB0aGlzLm9uQmV0TWludXNDbGljay5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgdGhpcy5idG5CZXRQbHVzLmludGVyYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5idG5CZXRQbHVzLm9uKHNsb3Qudmlldy5ldmVudC5WaWV3RXZlbnRzLkNMSUNLLCB0aGlzLm9uQmV0UGx1c0NsaWNrLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICB0aGlzLmRpc2FibGVCZXQoKTtcclxuICAgICAgICAgICAgdGhpcy5kaXNhYmxlU3BpbigpO1xyXG5cclxuICAgICAgICAgICAgLy8gSW5pdGlhbCB2YWx1ZXNcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVCZXQoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucmVzVHh0ID0gbmV3IFBJWEkuVGV4dCgpO1xyXG4gICAgICAgICAgICB0aGlzLnJlc1R4dC5zdHlsZSA9IHtmb250U2l6ZTogMTUsIGFsaWduOiAnbGVmdCcsIHdvcmR3cmFwOiB0cnVlLHN0cm9rZToweEZGRkZGRixzdHJva2VUaGlja25lc3M6Mn07XHJcbiAgICAgICAgICAgIFBYUm9vdC5hZGRDaGlsZCh0aGlzLnJlc1R4dCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2V0dXBWaWV3OiBmdW5jdGlvbih3aW5kb3dTaXplVk8pe1xyXG4gICAgICAgICAgICAvLyBTY2FsaW5nIGFuZCBwb3NpdGlvbmluZyBhcyBwZXIgcmVzcG9uc2l2ZSBzY2FsZVxyXG4gICAgICAgICAgICB2YXIgY29tcG9uZW50cyA9IFtcInNwaW5cIixcIndpblwiLFwiYmFsYW5jZVwiLFwiYmV0XCJdO1xyXG4gICAgICAgICAgICB2YXIgbGVuID0gY29tcG9uZW50cy5sZW5ndGg7XHJcbiAgICAgICAgICAgIHZhciBmaXRDb250ZW50T25TY3JlZW4gPSBuZXcgc2xvdC5tb2RlbC5saWIuVXRpbHMoKS5maXRDb250ZW50T25TY3JlZW47XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbXAgPSBjb21wb25lbnRzW2ldO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNjYWxlID0gdGhpcy5yZXNwU2NhbGVbY29tcF07XHJcbiAgICAgICAgICAgICAgICBmaXRDb250ZW50T25TY3JlZW4oXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiB0aGlzW2NvbXBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JlZW46IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHdpbmRvd1NpemVWTy53aWR0aCAqIHNjYWxlLngsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiB3aW5kb3dTaXplVk8uaGVpZ2h0ICogc2NhbGUueSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB3aW5kb3dTaXplVk8ud2lkdGggKiBzY2FsZS53LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiB3aW5kb3dTaXplVk8uaGVpZ2h0ICogc2NhbGUuaFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnJlc1R4dC50ZXh0ID0gd2luZG93U2l6ZVZPLndpZHRoICsgXCJ4XCIgKyB3aW5kb3dTaXplVk8uaGVpZ2h0ICtcIlxcblwiO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHVwZGF0ZUJhbGFuY2U6IGZ1bmN0aW9uKGJhbGFuY2Upe1xyXG4gICAgICAgICAgICB0aGlzLnR4dEJhbGFuY2UudGV4dCA9IHRoaXMuY3VycmVuY3kgKyBiYWxhbmNlLnRvRml4ZWQoMik7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlV2luOiBmdW5jdGlvbih3aW4pe1xyXG4gICAgICAgICAgICB0aGlzLnR4dFdpbi50ZXh0ID0gdGhpcy5jdXJyZW5jeSArIHdpbi50b0ZpeGVkKDIpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHVwZGF0ZUJldDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy50eHRCZXQudGV4dCA9IHRoaXMuY3VycmVuY3kgKyB0aGlzLmRlbm9taW5hdGlvbnNbdGhpcy5jdXJyZW50RGVub21pbmF0aW9uXS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICB0aGlzLmJldEFtb3VudCA9IHRoaXMuZGVub21pbmF0aW9uc1t0aGlzLmN1cnJlbnREZW5vbWluYXRpb25dO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGluY3JlYXNlQmV0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmN1cnJlbnREZW5vbWluYXRpb24gPCB0aGlzLmRlbm9taW5hdGlvbnMubGVuZ3RoIC0gMSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnREZW5vbWluYXRpb24rKztcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQmV0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlQmV0QnV0dG9ucygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGVjcmVhc2VCZXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY3VycmVudERlbm9taW5hdGlvbiA+IDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50RGVub21pbmF0aW9uLS07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUJldCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZUJldEJ1dHRvbnMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHZhbGlkYXRlQmV0QnV0dG9uczogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYodGhpcy5jdXJyZW50RGVub21pbmF0aW9uID09PSB0aGlzLmRlbm9taW5hdGlvbnMubGVuZ3RoIC0gMSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpc2FibGVCZXRQbHVzKCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmFibGVCZXRQbHVzKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMuY3VycmVudERlbm9taW5hdGlvbiA9PT0gMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpc2FibGVCZXRNaW51cygpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlQmV0TWludXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRpc2FibGVTcGluOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLmJ0blNwaW4udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGVuYWJsZVNwaW46IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuU3Bpbi52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkaXNhYmxlQmV0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLmRpc2FibGVCZXRQbHVzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZUJldE1pbnVzKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbmFibGVCZXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGVCZXRCdXR0b25zKCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGlzYWJsZUJldFBsdXM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuQmV0UGx1cy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZW5hYmxlQmV0UGx1czogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy5idG5CZXRQbHVzLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRpc2FibGVCZXRNaW51czogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy5idG5CZXRNaW51cy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZW5hYmxlQmV0TWludXM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuQmV0TWludXMudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gRXZlbnQgSGFuZGxlcnNcclxuICAgICAgICBvblNwaW5DbGljazogZnVuY3Rpb24oZXZ0KXtcclxuICAgICAgICAgICAgdGhpcy5kaXNhYmxlU3BpbigpO1xyXG4gICAgICAgICAgICB0aGlzLmRpc2FibGVCZXQoKTtcclxuICAgICAgICAgICAgdGhpcy50eHRXaW4udGV4dCA9IFwiXCI7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UuZW1pdChzbG90LnZpZXcuZXZlbnQuVmlld0V2ZW50cy5TUElOX0NMSUNLLCB0aGlzLmJldEFtb3VudCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25CZXRNaW51c0NsaWNrOiBmdW5jdGlvbihldnQpe1xyXG4gICAgICAgICAgICB0aGlzLmRlY3JlYXNlQmV0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UuZW1pdChzbG90LnZpZXcuZXZlbnQuVmlld0V2ZW50cy5CRVRfQ0xJQ0spO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uQmV0UGx1c0NsaWNrOiBmdW5jdGlvbihldnQpe1xyXG4gICAgICAgICAgICB0aGlzLmluY3JlYXNlQmV0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UuZW1pdChzbG90LnZpZXcuZXZlbnQuVmlld0V2ZW50cy5CRVRfQ0xJQ0spO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGhhbmRsZVJlc2l6ZTogZnVuY3Rpb24gKHdpbmRvd1NpemVWTykge1xyXG4gICAgICAgICAgICB0aGlzLnNldHVwVmlldyh3aW5kb3dTaXplVk8pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBOQU1FOiAnUGFuZWwnXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBSZWVsXHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC52aWV3LmNvbXBvbmVudC5SZWVsJyxcclxuICAgICAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLy8gU3RhZ2UgTWVtYmVyc1xyXG4gICAgICAgIHN0YWdlOiBudWxsLFxyXG5cclxuICAgICAgICByZWVsSW5kZXg6IG51bGwsXHJcblxyXG4gICAgICAgIG51bVJvd3M6IG51bGwsXHJcbiAgICAgICAgd2lkdGg6IG51bGwsXHJcbiAgICAgICAgaGVpZ2h0OiBudWxsLFxyXG5cclxuICAgICAgICBjZWxsczogbnVsbCxcclxuICAgICAgICBzcGluVHJpY2tDZWxsczogbnVsbCxcclxuICAgICAgICBjZWxsUG9zT3JpZ2luYWw6IG51bGwsXHJcbiAgICAgICAgcmVlbENlbGxIZWlnaHQ6IG51bGwsXHJcbiAgICAgICAgcmVlbEhlaWdodDogbnVsbCxcclxuXHJcbiAgICAgICAgcmVzdWx0UmVlbDogbnVsbCxcclxuICAgICAgICBpc1Jlc3VsdFJlY2VpdmVkOiBudWxsLFxyXG5cclxuICAgICAgICBoaWdobGlnaHQ6IG51bGwsXHJcblxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIChpbmRleCwgZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZWxJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICB0aGlzLm51bVJvd3MgPSBkYXRhLmdhbWVDb25maWdWTy5udW1Sb3dzO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRpbmcgc2l6ZSBvZiBzaW5nbGUgcmVlbCBhcmVhXHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSBkYXRhLnVpQ29uZmlnVk8uc3ltYm9sV2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID1cclxuICAgICAgICAgICAgICAgICh0aGlzLm51bVJvd3MgKiBkYXRhLnVpQ29uZmlnVk8uc3ltYm9sSGVpZ2h0KSArXHJcbiAgICAgICAgICAgICAgICAoKHRoaXMubnVtUm93cyAtIDEpICogZGF0YS51aUNvbmZpZ1ZPLnJlZWxWU2VwYXJhdG9yKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFllbGxvdyByb3VuZGVkIHJlY3RhbmdsZSBzdHJpcCBiZWhpbmQgZWFjaCByZWVsXHJcbiAgICAgICAgICAgIHZhciBiZ1JlY3QgPSBuZXcgUElYSS5HcmFwaGljcygpO1xyXG4gICAgICAgICAgICBiZ1JlY3QuYmVnaW5GaWxsKGRhdGEudWlDb25maWdWTy5yZWVsQkdDb2xvcik7XHJcbiAgICAgICAgICAgIGJnUmVjdC5kcmF3Um91bmRlZFJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIDEwKTtcclxuICAgICAgICAgICAgYmdSZWN0LmFscGhhID0gMC40O1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKGJnUmVjdCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVJlZWxDZWxscyhkYXRhKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjcmVhdGVSZWVsQ2VsbHM6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICAvLyBUaGUgZGlzdGFuY2UgZWFjaCBzeW1ib2wgaXMgYW5pbWF0ZWQgdG8gY3JlYXRlIHNwaW4gZWZmZWN0XHJcbiAgICAgICAgICAgIHRoaXMucmVlbENlbGxIZWlnaHQgPSBkYXRhLnVpQ29uZmlnVk8uc3ltYm9sSGVpZ2h0ICsgZGF0YS51aUNvbmZpZ1ZPLnJlZWxWU2VwYXJhdG9yO1xyXG4gICAgICAgICAgICB0aGlzLnJlZWxIZWlnaHQgPVxyXG4gICAgICAgICAgICAgICAgKGRhdGEudWlDb25maWdWTy5zeW1ib2xIZWlnaHQgKiB0aGlzLm51bVJvd3MpICtcclxuICAgICAgICAgICAgICAgIChkYXRhLnVpQ29uZmlnVk8ucmVlbFZTZXBhcmF0b3IgKiAodGhpcy5udW1Sb3dzIC0gMSkpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHhwID0gMDtcclxuICAgICAgICAgICAgdmFyIHlwID0gLSh0aGlzLnJlZWxDZWxsSGVpZ2h0ICogdGhpcy5udW1Sb3dzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFN0b3JpbmcgcG9zaXRpb25zIG9mIGFsbCBjZWxsc1xyXG4gICAgICAgICAgICAvLyAoYm90aCBvbiBzY3JlZW4gYW5kIG9mZiBzY3JlZW4gdHJpY2sgY2VsbHMpXHJcbiAgICAgICAgICAgIHRoaXMuY2VsbFBvc09yaWdpbmFsID0gW107XHJcblxyXG4gICAgICAgICAgICB2YXIgcmVlbENlbGw7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGluZyBjZWxscyB1c2VkIHRvIGNyZWF0ZSBjb250aW5vdXMgc3BpblxyXG4gICAgICAgICAgICAvLyBUaGVzZSBzdGF5IG9mZiBzY3JlZW4gYW5kIG9ubHkgY29tZSBvbiB0byB2aXNpYmxlIGFyZWFcclxuICAgICAgICAgICAgLy8gd2hlbiB0aGUgcmVlbCBpcyBzcGlubmluZ1xyXG4gICAgICAgICAgICAvLyBUaGVzZSB3aWxsIGJlIHRoZSBmaXJzdCBzZXQgaW4gY2VsbFBvc09yaWdpbmFsIGFycmF5XHJcbiAgICAgICAgICAgIHRoaXMuc3BpblRyaWNrQ2VsbHMgPSBbXTtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMubnVtUm93czsgaSsrKXtcclxuICAgICAgICAgICAgICAgIHJlZWxDZWxsID0gbmV3IHNsb3Qudmlldy5jb21wb25lbnQuUmVlbENlbGwoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQocmVlbENlbGwuc3RhZ2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGluVHJpY2tDZWxscy5wdXNoKHJlZWxDZWxsKTtcclxuICAgICAgICAgICAgICAgIHJlZWxDZWxsLnN0YWdlLnggPSB4cDtcclxuICAgICAgICAgICAgICAgIHJlZWxDZWxsLnN0YWdlLnkgPSB5cDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2VsbFBvc09yaWdpbmFsLnB1c2goe3g6IHhwLCB5OiB5cH0pO1xyXG4gICAgICAgICAgICAgICAgcmVlbENlbGwuaW5pdChkYXRhKTtcclxuICAgICAgICAgICAgICAgIHlwICs9IGRhdGEudWlDb25maWdWTy5zeW1ib2xIZWlnaHQgKyBkYXRhLnVpQ29uZmlnVk8ucmVlbFZTZXBhcmF0b3I7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFJlZWwgY2VsbHMgdG8gZGlzcGxheSBzcGluIHJlc3VsdFxyXG4gICAgICAgICAgICAvLyBUaGVzZSB3aWxsIGJlIHRoZSBsYXN0IHNldCBpbiBjZWxsUG9zT3JpZ2luYWwgYXJyYXlcclxuICAgICAgICAgICAgdGhpcy5jZWxscyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCB0aGlzLm51bVJvd3M7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICByZWVsQ2VsbCA9IG5ldyBzbG90LnZpZXcuY29tcG9uZW50LlJlZWxDZWxsKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHJlZWxDZWxsLnN0YWdlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2VsbHMucHVzaChyZWVsQ2VsbCk7XHJcbiAgICAgICAgICAgICAgICByZWVsQ2VsbC5zdGFnZS54ID0geHA7XHJcbiAgICAgICAgICAgICAgICByZWVsQ2VsbC5zdGFnZS55ID0geXA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNlbGxQb3NPcmlnaW5hbC5wdXNoKHt4OiB4cCwgeTogeXB9KTtcclxuICAgICAgICAgICAgICAgIHJlZWxDZWxsLmluaXQoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB5cCArPSBkYXRhLnVpQ29uZmlnVk8uc3ltYm9sSGVpZ2h0ICsgZGF0YS51aUNvbmZpZ1ZPLnJlZWxWU2VwYXJhdG9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3BpbjogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy5pc1Jlc3VsdFJlY2VpdmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRTcGluKCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3RhcnRTcGluOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgZWFzZVR5cGUgPSBQb3dlcjEuZWFzZUluO1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5udW1Sb3dzOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGluVHJpY2tDZWxsc1tpXS51cGRhdGVXaXRoUmFuZG9tU3ltYm9sKCk7XHJcbiAgICAgICAgICAgICAgICBUd2VlbkxpdGUudG8oXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGluVHJpY2tDZWxsc1tpXS5zdGFnZSxcclxuICAgICAgICAgICAgICAgICAgICAwLjUsXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiB0aGlzLnNwaW5Ucmlja0NlbGxzW2ldLnN0YWdlLnkgKyAodGhpcy5yZWVsQ2VsbEhlaWdodCAqIHRoaXMubnVtUm93cyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVhc2U6IGVhc2VUeXBlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIC8vIFR3ZWVuIG9uQ29tcGxldGUgY2FsbGJhY2sgdG8gYmUgYWRkZWQgb25seSB0byBvbmUgU3ltYm9sLlxyXG4gICAgICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gKGkgPT09IHRoaXMubnVtUm93cyAtIDEpID8gdGhpcy5jb250aW51ZVNwaW4uYmluZCh0aGlzKSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICBUd2VlbkxpdGUudG8oXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1tpXS5zdGFnZSxcclxuICAgICAgICAgICAgICAgICAgICAwLjUsXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiB0aGlzLmNlbGxzW2ldLnN0YWdlLnkgKyAodGhpcy5yZWVsQ2VsbEhlaWdodCAqIHRoaXMubnVtUm93cyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVhc2U6IGVhc2VUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlOiBjYWxsYmFja1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb250aW51ZVNwaW46IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNSZXN1bHRSZWNlaXZlZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BTcGluKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIG9mZlNjcmVlbkNlbGxzID0gdGhpcy5nZXRPZmZTY3JlZW5DZWxscygpO1xyXG4gICAgICAgICAgICB2YXIgZWFzZVR5cGUgPSBMaW5lYXIuZWFzZU5vbmU7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLm51bVJvd3M7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBvZmZTY3JlZW5DZWxsc1tpXS51cGRhdGVXaXRoUmFuZG9tU3ltYm9sKCk7XHJcbiAgICAgICAgICAgICAgICBvZmZTY3JlZW5DZWxsc1tpXS5zdGFnZS55ID0gdGhpcy5jZWxsUG9zT3JpZ2luYWxbaV0ueTtcclxuICAgICAgICAgICAgICAgIFR3ZWVuTGl0ZS50byhcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwaW5Ucmlja0NlbGxzW2ldLnN0YWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIDAuMSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHRoaXMuc3BpblRyaWNrQ2VsbHNbaV0uc3RhZ2UueSArICh0aGlzLnJlZWxDZWxsSGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWFzZTogZWFzZVR5cGVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgLy8gVHdlZW4gb25Db21wbGV0ZSBjYWxsYmFjayB0byBiZSBhZGRlZCBvbmx5IHRvIG9uZSBTeW1ib2wuXHJcbiAgICAgICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSAoaSA9PT0gdGhpcy5udW1Sb3dzIC0gMSkgPyB0aGlzLmNvbnRpbnVlU3Bpbi5iaW5kKHRoaXMpIDogbnVsbDtcclxuICAgICAgICAgICAgICAgIFR3ZWVuTGl0ZS50byhcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW2ldLnN0YWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIDAuMSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHRoaXMuY2VsbHNbaV0uc3RhZ2UueSArICh0aGlzLnJlZWxDZWxsSGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWFzZTogZWFzZVR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU6IGNhbGxiYWNrXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIFR3ZWVuTGl0ZS50byh0aGlzLmNlbGxzW2ldLnN0YWdlLCAwLjEsIHtlYXNlOiBlYXNlVHlwZSwgb25Db21wbGV0ZTogY2FsbGJhY2t9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN0b3BTcGluOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgb2ZmU2NyZWVuQ2VsbHMgPSB0aGlzLmdldE9mZlNjcmVlbkNlbGxzKCk7XHJcbiAgICAgICAgICAgIHZhciBlYXNlVHlwZSA9IFBvd2VyMS5lYXNlT3V0O1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5udW1Sb3dzOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgb2ZmU2NyZWVuQ2VsbHNbaV0udXBkYXRlU3ltYm9sKHRoaXMucmVzdWx0UmVlbFtpXSk7XHJcbiAgICAgICAgICAgICAgICBvZmZTY3JlZW5DZWxsc1tpXS5zdGFnZS55ID0gdGhpcy5jZWxsUG9zT3JpZ2luYWxbaV0ueTtcclxuICAgICAgICAgICAgICAgIFR3ZWVuTGl0ZS50byhcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwaW5Ucmlja0NlbGxzW2ldLnN0YWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIDAuNSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHRoaXMuc3BpblRyaWNrQ2VsbHNbaV0uc3RhZ2UueSArICh0aGlzLnJlZWxDZWxsSGVpZ2h0ICogdGhpcy5udW1Sb3dzKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWFzZTogZWFzZVR5cGVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgLy8gVHdlZW4gb25Db21wbGV0ZSBjYWxsYmFjayB0byBiZSBhZGRlZCBvbmx5IHRvIG9uZSBTeW1ib2wuXHJcbiAgICAgICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSAoaSA9PT0gdGhpcy5udW1Sb3dzIC0gMSkgPyB0aGlzLm9uU3BpblN0b3AuYmluZCh0aGlzKSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICBUd2VlbkxpdGUudG8oXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1tpXS5zdGFnZSxcclxuICAgICAgICAgICAgICAgICAgICAwLjUsXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiB0aGlzLmNlbGxzW2ldLnN0YWdlLnkgKyAodGhpcy5yZWVsQ2VsbEhlaWdodCAqIHRoaXMubnVtUm93cyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVhc2U6IGVhc2VUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlOiBjYWxsYmFja1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvblNwaW5TdG9wOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwLCBqID0gMDsgaSA8IHRoaXMubnVtUm93czsgaSsrLCBqKyspe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGluVHJpY2tDZWxsc1tpXS5zdGFnZS55ID0gdGhpcy5jZWxsUG9zT3JpZ2luYWxbal0ueTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3BpblRyaWNrQ2VsbHNbaV0ucmVtb3ZlU3ltYm9sKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgdGhpcy5udW1Sb3dzOyBpKyssIGorKyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW2ldLnN0YWdlLnkgPSB0aGlzLmNlbGxQb3NPcmlnaW5hbFtqXS55O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jZWxsc1tpXS51cGRhdGVTeW1ib2wodGhpcy5yZXN1bHRSZWVsW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLmVtaXQoc2xvdC52aWV3LmV2ZW50LlZpZXdFdmVudHMuUkVFTF9TUElOX0VORCwgdGhpcy5yZWVsSW5kZXgpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE9mZnNjcmVlbiBjZWxscyBhcmUgdGhlIG9uZXMgd2hpY2ggYXJlIGJlbG93IHRoZSByZWVsIGFyZWFcclxuICAgICAgICAgKiBPbmUgb2YgdGhlIGNlbGwgc2V0LCBlaXRoZXIgdGhlIGFjdHVhbCByZXN1bHQgY2VsbCBzZXQsXHJcbiAgICAgICAgICogb3IgdGhlIHRyaWNrIGNlbGwgc2V0IGlzIHJldHVybmVkIGFzIGFuIGFycmF5XHJcbiAgICAgICAgICogQHJldHVybnMge251bGx9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0T2ZmU2NyZWVuQ2VsbHM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciBvZmZTY3JlZW5DZWxscyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwLCBqID0gMDsgaSA8IHRoaXMubnVtUm93czsgaSsrLCBqKyspe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5zcGluVHJpY2tDZWxsc1tpXS5zdGFnZS55IDwgMCB8fCB0aGlzLnNwaW5Ucmlja0NlbGxzW2ldLnN0YWdlLnkgPiB0aGlzLnJlZWxIZWlnaHQpe1xyXG4gICAgICAgICAgICAgICAgICAgIG9mZlNjcmVlbkNlbGxzLnB1c2godGhpcy5zcGluVHJpY2tDZWxsc1tpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNlbGxzW2ldLnN0YWdlLnkgPCAwIHx8IHRoaXMuY2VsbHNbaV0uc3RhZ2UueSA+IHRoaXMucmVlbEhlaWdodCl7XHJcbiAgICAgICAgICAgICAgICAgICAgb2ZmU2NyZWVuQ2VsbHMucHVzaCh0aGlzLmNlbGxzW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gb2ZmU2NyZWVuQ2VsbHM7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3RvcEFuZFVwZGF0ZVN5bWJvbHM6IGZ1bmN0aW9uKHJlc3VsdCl7XHJcbiAgICAgICAgICAgIHRoaXMucmVzdWx0UmVlbCA9IHJlc3VsdDtcclxuICAgICAgICAgICAgdGhpcy5pc1Jlc3VsdFJlY2VpdmVkID0gdHJ1ZTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB1cGRhdGVTeW1ib2xzV2l0aG91dFNwaW46IGZ1bmN0aW9uKHJlc3VsdCl7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLm51bVJvd3M7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW2ldLnVwZGF0ZVN5bWJvbChyZXN1bHRbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2hvd1dpbkhpZ2hsaWdodDogZnVuY3Rpb24ocm93KXtcclxuICAgICAgICAgICAgdGhpcy5oaWRlV2luSGlnaGxpZ2h0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0ID0gdGhpcy5jZWxsc1tyb3ddLmhpZ2hsaWdodDtcclxuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHQudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGlkZVdpbkhpZ2hsaWdodDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYodGhpcy5oaWdobGlnaHQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oaWdobGlnaHQudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGFuZGxlUmVzaXplOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdSZWVsJ1xyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgUmVlbENlbGxcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LnZpZXcuY29tcG9uZW50LlJlZWxDZWxsJyxcclxuICAgICAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLy8gU3RhZ2UgTWVtYmVyc1xyXG4gICAgICAgIHN0YWdlOiBudWxsLFxyXG4gICAgICAgIHN5bWJvbDogbnVsbCxcclxuICAgICAgICBoaWdobGlnaHQ6IG51bGwsXHJcblxyXG4gICAgICAgIHN5bWJvbElEOiBudWxsLFxyXG5cclxuICAgICAgICAvLyBBbGwgcG9zc2libGUgc3ltYm9sc1xyXG4gICAgICAgIG51bVN5bWJvbHM6IG51bGwsXHJcbiAgICAgICAgc3ltYm9sczogbnVsbCxcclxuXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5udW1TeW1ib2xzID0gZGF0YS5nYW1lQ29uZmlnVk8ubnVtU3ltYm9scztcclxuICAgICAgICAgICAgdGhpcy5zeW1ib2xzID0gZGF0YS5nYW1lQ29uZmlnVk8uZ2V0U3ltYm9scygpO1xyXG5cclxuICAgICAgICAgICAgLy8gWWVsbG93IHJvdW5kZWQgcmVjdGFuZ2xlIHN0cmlwIGJlaGluZCBlYWNoIHJlZWxcclxuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHQgPSBuZXcgUElYSS5HcmFwaGljcygpO1xyXG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodC5iZWdpbkZpbGwoZGF0YS51aUNvbmZpZ1ZPLnJlZWxIaWdobGlnaHRDb2xvcik7XHJcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0LmRyYXdSb3VuZGVkUmVjdCgwLCAwLCBkYXRhLnVpQ29uZmlnVk8uc3ltYm9sV2lkdGgsIGRhdGEudWlDb25maWdWTy5zeW1ib2xIZWlnaHQsIDEwKTtcclxuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHQuYWxwaGEgPSAwLjc7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5oaWdobGlnaHQpO1xyXG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodC52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlU3ltYm9sOiBmdW5jdGlvbihzeW1ib2xJRCl7XHJcbiAgICAgICAgICAgIHRoaXMuc3ltYm9sSUQgPSBzeW1ib2xJRDtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVTeW1ib2woKTtcclxuICAgICAgICAgICAgdGhpcy5zeW1ib2wgPSBuZXcgUElYSS5TcHJpdGUoUElYSS5UZXh0dXJlLmZyb21GcmFtZShzeW1ib2xJRCkpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuc3ltYm9sKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB1cGRhdGVXaXRoUmFuZG9tU3ltYm9sOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVN5bWJvbCh0aGlzLnN5bWJvbHNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5udW1TeW1ib2xzKV0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlbW92ZVN5bWJvbDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYodGhpcy5zeW1ib2wpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFnZS5yZW1vdmVDaGlsZCh0aGlzLnN5bWJvbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoYW5kbGVSZXNpemU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogJ1JlZWxDZWxsJ1xyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgUmVlbENvbnRhaW5lclxyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3Qudmlldy5jb21wb25lbnQuUmVlbENvbnRhaW5lcicsXHJcbiAgICAgICAgY29uc3RydWN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZSA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIC8vIFN0YWdlIE1lbWJlcnNcclxuICAgICAgICBzdGFnZTogbnVsbCxcclxuICAgICAgICBiZ1JlY3Q6IG51bGwsXHJcblxyXG4gICAgICAgIG51bVJlZWxzOiBudWxsLFxyXG4gICAgICAgIG51bVJvd3M6IG51bGwsXHJcbiAgICAgICAgd2lkdGg6IG51bGwsXHJcbiAgICAgICAgaGVpZ2h0OiBudWxsLFxyXG5cclxuICAgICAgICByZWVsczogbnVsbCxcclxuXHJcbiAgICAgICAgaXNTcGlubmluZzogbnVsbCxcclxuICAgICAgICByZWVsU3BpbkRlbGF5OiBudWxsLFxyXG4gICAgICAgIG1pblNwaW5EdXJhdGlvbjogbnVsbCxcclxuICAgICAgICBtaW5TcGluRHVyYXRpb25FbGFwc2VkOiBudWxsLFxyXG4gICAgICAgIHJlc3VsdE1hdHJpeFJlY2VpdmVkOiBudWxsLFxyXG4gICAgICAgIHJlc3VsdE1hdHJpeDogbnVsbCxcclxuXHJcbiAgICAgICAgcmVzcFNjYWxlOiBudWxsLFxyXG5cclxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLm51bVJlZWxzID0gZGF0YS5nYW1lQ29uZmlnVk8ubnVtUmVlbHM7XHJcbiAgICAgICAgICAgIHRoaXMubnVtUm93cyA9IGRhdGEuZ2FtZUNvbmZpZ1ZPLm51bVJvd3M7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1pblNwaW5EdXJhdGlvbiA9IGRhdGEudWlDb25maWdWTy5taW5TcGluRHVyYXRpb247XHJcbiAgICAgICAgICAgIHRoaXMucmVlbFNwaW5EZWxheSA9IGRhdGEudWlDb25maWdWTy5yZWVsU3BpbkRlbGF5O1xyXG4gICAgICAgICAgICB0aGlzLnJlc3BTY2FsZSA9IGRhdGEudWlDb25maWdWTy5yZXNwb25zaXZlU2NhbGUucmVlbEFyZWE7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRpbmcgc2l6ZSBvZiB3aG9sZSByZWVsIGFyZWEgdXNpbmcgdmFsdWVzIHByb3ZpZGVkIGluIGNvbmZpZ1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoID1cclxuICAgICAgICAgICAgICAgICh0aGlzLm51bVJlZWxzICogZGF0YS51aUNvbmZpZ1ZPLnN5bWJvbFdpZHRoKSArXHJcbiAgICAgICAgICAgICAgICAoKHRoaXMubnVtUmVlbHMgLSAxKSAqIGRhdGEudWlDb25maWdWTy5yZWVsSFNlcGFyYXRvcikgK1xyXG4gICAgICAgICAgICAgICAgKGRhdGEudWlDb25maWdWTy5yZWVsSFBhZGRpbmcgKiAyKTtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPVxyXG4gICAgICAgICAgICAgICAgKHRoaXMubnVtUm93cyAqIGRhdGEudWlDb25maWdWTy5zeW1ib2xIZWlnaHQpICtcclxuICAgICAgICAgICAgICAgICgodGhpcy5udW1Sb3dzIC0gMSkgKiBkYXRhLnVpQ29uZmlnVk8ucmVlbFZTZXBhcmF0b3IpICtcclxuICAgICAgICAgICAgICAgIChkYXRhLnVpQ29uZmlnVk8ucmVlbFZQYWRkaW5nICogMik7XHJcblxyXG4gICAgICAgICAgICAvLyBXaGl0ZSByb3VuZGVkIHJlY3RhbmdsZSBiZWhpbmQgdGhlIHdob2xlIHJlZWwgYXJlYVxyXG4gICAgICAgICAgICB0aGlzLmJnUmVjdCA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYmdSZWN0LmJlZ2luRmlsbChkYXRhLnVpQ29uZmlnVk8ucmVlbEFyZWFCR0NvbG9yKTtcclxuICAgICAgICAgICAgdGhpcy5iZ1JlY3QuZHJhd1JvdW5kZWRSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAxNSk7XHJcbiAgICAgICAgICAgIHRoaXMuYmdSZWN0LmFscGhhID0gMC42O1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuYmdSZWN0KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlUmVlbHMoZGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dXBWaWV3KGRhdGEud2luZG93U2l6ZVZPKTtcclxuXHJcbiAgICAgICAgICAgIFBYUm9vdC5hZGRDaGlsZCh0aGlzLnN0YWdlKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjcmVhdGVSZWVsczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICB2YXIgeHAgPSBkYXRhLnVpQ29uZmlnVk8ucmVlbEhQYWRkaW5nO1xyXG4gICAgICAgICAgICB2YXIgeXAgPSBkYXRhLnVpQ29uZmlnVk8ucmVlbFZQYWRkaW5nO1xyXG4gICAgICAgICAgICB0aGlzLnJlZWxzID0gW107XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLm51bVJlZWxzOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlZWwgPSBuZXcgc2xvdC52aWV3LmNvbXBvbmVudC5SZWVsKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHJlZWwuc3RhZ2UpO1xyXG4gICAgICAgICAgICAgICAgcmVlbC5pbml0KGksIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgcmVlbC5zdGFnZS54ID0geHA7XHJcbiAgICAgICAgICAgICAgICByZWVsLnN0YWdlLnkgPSB5cDtcclxuICAgICAgICAgICAgICAgIHJlZWwuc3RhZ2UubWFzayA9IHRoaXMuY3JlYXRlTWFza09iamVjdCh4cCwgeXAsIHJlZWwud2lkdGgsIHJlZWwuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIHJlZWwuc3RhZ2Uub24oXHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdC52aWV3LmV2ZW50LlZpZXdFdmVudHMuUkVFTF9TUElOX0VORCxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uUmVlbFN0b3AuYmluZCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVlbHMucHVzaChyZWVsKTtcclxuICAgICAgICAgICAgICAgIHhwICs9IGRhdGEudWlDb25maWdWTy5zeW1ib2xXaWR0aCArIGRhdGEudWlDb25maWdWTy5yZWVsSFNlcGFyYXRvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNldHVwVmlldzogZnVuY3Rpb24od2luZG93U2l6ZVZPKXtcclxuICAgICAgICAgICAgLy8gU2NhbGluZyBhbmQgcG9zaXRpb25pbmcgYXMgcGVyIHJlc3BvbnNpdmUgc2NhbGVcclxuICAgICAgICAgICAgdmFyIHN1YnN0aXR1dGUgPSB7d2lkdGg6IHRoaXMud2lkdGgsIGhlaWdodDogdGhpcy5oZWlnaHR9O1xyXG4gICAgICAgICAgICB2YXIgZml0Q29udGVudE9uU2NyZWVuID0gbmV3IHNsb3QubW9kZWwubGliLlV0aWxzKCkuZml0Q29udGVudE9uU2NyZWVuO1xyXG4gICAgICAgICAgICBmaXRDb250ZW50T25TY3JlZW4oXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogc3Vic3RpdHV0ZSxcclxuICAgICAgICAgICAgICAgICAgICBzY3JlZW46IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeDogd2luZG93U2l6ZVZPLndpZHRoICogdGhpcy5yZXNwU2NhbGUueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeTogd2luZG93U2l6ZVZPLmhlaWdodCAqIHRoaXMucmVzcFNjYWxlLnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB3aW5kb3dTaXplVk8ud2lkdGggKiB0aGlzLnJlc3BTY2FsZS53LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHdpbmRvd1NpemVWTy5oZWlnaHQgKiB0aGlzLnJlc3BTY2FsZS5oXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLnggPSBzdWJzdGl0dXRlLng7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UueSA9IHN1YnN0aXR1dGUueTtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZS5zY2FsZS54ID0gc3Vic3RpdHV0ZS53aWR0aC90aGlzLndpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLnNjYWxlLnkgPSBzdWJzdGl0dXRlLmhlaWdodC90aGlzLmhlaWdodDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjcmVhdGVNYXNrT2JqZWN0OiBmdW5jdGlvbih4LCB5LCB3LCBoKXtcclxuICAgICAgICAgICAgLy8gUm91bmRlZCByZWN0YW5nbGUgb24gdG9wIG9mIGVhY2ggcmVlbCBmb3IgbWFza1xyXG4gICAgICAgICAgICB2YXIgbWFzayA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XHJcbiAgICAgICAgICAgIG1hc2suYmVnaW5GaWxsKDB4RkZGRkZGKTtcclxuICAgICAgICAgICAgbWFzay5kcmF3Um91bmRlZFJlY3QoeCwgeSwgdywgaCwgMTApO1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKG1hc2spO1xyXG4gICAgICAgICAgICByZXR1cm4gbWFzaztcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzcGluOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzU3Bpbm5pbmcpIHtcclxuICAgICAgICAgICAgICAgIHRocm93KG5ldyBFcnJvcihcIkNhbm5vdCBzdGFydCBuZXcgc3Bpbi4gQWxyZWFkeSBzcGlubmluZy5cIikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNTcGlubmluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubWluU3BpbkR1cmF0aW9uRWxhcHNlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnJlc3VsdE1hdHJpeFJlY2VpdmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLm51bVJlZWxzOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZWxzW2ldLnNwaW4uYmluZCh0aGlzLnJlZWxzW2ldKSxcclxuICAgICAgICAgICAgICAgICAgICBpICogdGhpcy5yZWVsU3BpbkRlbGF5ICogMTAwMFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMuZWxhcHNlTWluU3BpbkR1cmF0aW9uLmJpbmQodGhpcyksIHRoaXMubWluU3BpbkR1cmF0aW9uICogMTAwMCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZWxhcHNlTWluU3BpbkR1cmF0aW9uOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLm1pblNwaW5EdXJhdGlvbkVsYXBzZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVN5bWJvbHNJZlJlYWR5KCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3RvcEFuZFVwZGF0ZVN5bWJvbHM6IGZ1bmN0aW9uKHJlc3VsdCl7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLmlzU3Bpbm5pbmcpIHtcclxuICAgICAgICAgICAgICAgIHRocm93KG5ldyBFcnJvcihcIkNhbm5vdCB1cGRhdGUgc3ltYm9scy4gUmVlbHMgbm90IHNwaW5uaW5nLiBcIiArXHJcbiAgICAgICAgICAgICAgICBcIlVzZSB1cGRhdGVTeW1ib2xzV2l0aG91dFNwaW4gbWV0aG9kIHRvIHVwZGF0ZSBzeW1ib2xzIHdoZW4gbm90IHNwaW5uaW5nLlwiKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5yZXN1bHRNYXRyaXggPSByZXN1bHQ7XHJcbiAgICAgICAgICAgIHRoaXMucmVzdWx0TWF0cml4UmVjZWl2ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVN5bWJvbHNJZlJlYWR5KCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhlIG1ldGhvZCB1cGRhdGVTeW1ib2xzSWZSZWFkeSBtYWtlcyBzdXJlIHRoYXQgdGhlIHJlZWxzIGhhdmUgc3B1biBmb3IgdGhlXHJcbiAgICAgICAgICogbWluaW11bSByZXF1aXJlZCBkdXJhdGlvbiBhbmQgYWxzbyB2ZXJpZmllcyBpZiBzcGluIHJlc3VsdCBoYXYgYmVlbiByZWNlaXZlZFxyXG4gICAgICAgICAqIGJ5IHZlcmlmeWluZyB0aGF0IHRoZSBhc3NvY2lhdGVkIGZsYWdzIGFyZSB0cnVlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogVGhpcyBtZXRob2QgaXMgaW52b2tlZCB3aGVuIHJlc3VsdHMgYXJlIHJlY2VpdmVkIGFuZCB3aGVuIG1pbmltdW0gc3BpbiBkdXJhdGlvblxyXG4gICAgICAgICAqIGVsYXBlcy4gVGhpcyBmdW5jdGlvbiB2ZXJpZmllcyBib3RoIGFuZCB0aGVuIHByb2NlZWRzIGJ5IHByb3ZpZGlubmcgaW5kaXZpZHVhbFxyXG4gICAgICAgICAqIHJlZWxzIHdpdGggdGhlaXIgc3ltYm9scy5cclxuICAgICAgICAgKi9cclxuICAgICAgICB1cGRhdGVTeW1ib2xzSWZSZWFkeTogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYodGhpcy5taW5TcGluRHVyYXRpb25FbGFwc2VkICYmIHRoaXMucmVzdWx0TWF0cml4UmVjZWl2ZWQpe1xyXG4gICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMubnVtUmVlbHM7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWVsc1tpXS5zdG9wQW5kVXBkYXRlU3ltYm9scy5iaW5kKHRoaXMucmVlbHNbaV0sIHRoaXMucmVzdWx0TWF0cml4W2ldKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaSAqIHRoaXMucmVlbFNwaW5EZWxheSAqIDEwMDBcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlU3ltYm9sc1dpdGhvdXRTcGluOiBmdW5jdGlvbihyZXN1bHQpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzU3Bpbm5pbmcpIHtcclxuICAgICAgICAgICAgICAgIHRocm93KG5ldyBFcnJvcihcIkNhbm5vdCB1cGRhdGUgd2l0aG91dCBzcGluLiBBbHJlYWR5IHNwaW5uaW5nLlwiKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMubnVtUmVlbHM7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZWxzW2ldLnVwZGF0ZVN5bWJvbHNXaXRob3V0U3BpbihyZXN1bHRbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2hvd1dpbkhpZ2hsaWdodDogZnVuY3Rpb24obGluZSwgb2FrKXtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IG9hazsgaSsrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVlbHNbaV0uc2hvd1dpbkhpZ2hsaWdodChsaW5lW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGhpZGVXaW5IaWdobGlnaHQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLm51bVJlZWxzOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWVsc1tpXS5oaWRlV2luSGlnaGxpZ2h0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvblJlZWxTdG9wOiBmdW5jdGlvbihyZWVsSUQpe1xyXG4gICAgICAgICAgICBpZihyZWVsSUQgPT09IHRoaXMubnVtUmVlbHMgLSAxKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNTcGlubmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFnZS5lbWl0KHNsb3Qudmlldy5ldmVudC5WaWV3RXZlbnRzLlJFRUxfU1BJTl9FTkQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGFuZGxlUmVzaXplOiBmdW5jdGlvbiAod2luZG93U2l6ZVZPKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dXBWaWV3KHdpbmRvd1NpemVWTyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdSZWVsQ29udGFpbmVyJ1xyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgV2luTGluZXNcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LnZpZXcuY29tcG9uZW50LldpbkxpbmVzJyxcclxuICAgICAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLy8gU3RhZ2UgTWVtYmVyc1xyXG4gICAgICAgIHN0YWdlOiBudWxsLFxyXG4gICAgICAgIGxpbmVzOiBudWxsLFxyXG5cclxuICAgICAgICBudW1MaW5lczogbnVsbCxcclxuICAgICAgICB2aXNpYmxlTGluZTogbnVsbCxcclxuXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5udW1MaW5lcyA9IGRhdGEuZ2FtZUNvbmZpZ1ZPLm51bUxpbmVzO1xyXG4gICAgICAgICAgICB0aGlzLmFkZExpbmVzKGRhdGEpO1xyXG4gICAgICAgICAgICB0aGlzLmhpZGVBbGxMaW5lcygpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFkZExpbmVzOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICAgdGhpcy5saW5lcyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgdmFyIGxpbmVQb2ludHMgPSBkYXRhLnVpQ29uZmlnVk8ubGluZVBvaW50cztcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMubnVtTGluZXM7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGluZSA9IGxpbmVQb2ludHNbaV07XHJcbiAgICAgICAgICAgICAgICB2YXIgdG90YWxQb2ludHMgPSBsaW5lLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHZhciBsaW5lR3JhcGhpYyA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XHJcbiAgICAgICAgICAgICAgICBsaW5lR3JhcGhpYy5saW5lU3R5bGUoZGF0YS51aUNvbmZpZ1ZPLndpbkxpbmVXaWR0aCwgZGF0YS51aUNvbmZpZ1ZPLndpbkxpbmVDb2xvcik7XHJcbiAgICAgICAgICAgICAgICBsaW5lR3JhcGhpYy5tb3ZlVG8obGluZVswXVswXSwgbGluZVswXVsxXSk7XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGogPSAxOyBqIDwgdG90YWxQb2ludHM7IGorKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZUdyYXBoaWMubGluZVRvKGxpbmVbal1bMF0sIGxpbmVbal1bMV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGluZUdyYXBoaWMuZW5kRmlsbCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZChsaW5lR3JhcGhpYyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmVzLnB1c2gobGluZUdyYXBoaWMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2hvd0xpbmU6IGZ1bmN0aW9uKGxpbmVOdW1iZXIpe1xyXG4gICAgICAgICAgICBpZih0aGlzLnZpc2libGVMaW5lKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJsZUxpbmUudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudmlzaWJsZUxpbmUgPSB0aGlzLmxpbmVzW2xpbmVOdW1iZXJdO1xyXG4gICAgICAgICAgICB0aGlzLnZpc2libGVMaW5lLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGhpZGVBbGxMaW5lczogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMubnVtTGluZXM7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmVzW2ldLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGhhbmRsZVJlc2l6ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBOQU1FOiAnV2luTGluZXMnXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBWaWV3RXZlbnRzXHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiBcInNsb3Qudmlldy5ldmVudC5WaWV3RXZlbnRzXCJcclxuICAgIH0sXHJcblxyXG4gICAge30sXHJcblxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBDTElDSzogICAgICAgICAgICAgICgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpID8gXCJ0YXBcIiA6IFwiY2xpY2tcIixcclxuICAgICAgICBTUElOX0NMSUNLOiAgICAgICAgIFwiVmlld0V2ZW50c19zcGluX2NsaWNrXCIsXHJcbiAgICAgICAgUkVFTF9TUElOX0VORDogICAgICBcIlZpZXdFdmVudHNfcmVlbF9zcGluX2VuZFwiLFxyXG4gICAgICAgIEJFVF9DTElDSzogICAgICAgICAgXCJWaWV3RXZlbnRzX2JldF9jbGlja1wiXHJcbiAgICB9XHJcbik7IiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2NcclxuICogQGNsYXNzICAgICAgIEJHTWVkaWF0b3JcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LnZpZXcubWVkaWF0b3IuQkdNZWRpYXRvcicsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLk1lZGlhdG9yXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvLyBSZWZlcmVuY2VzXHJcbiAgICAgICAgd2luZG93U2l6ZVByb3h5OiBudWxsLFxyXG5cclxuICAgICAgICAvLyBOb3RpZmljYXRpb25zIHRoaXMgbWVkaWF0b3IgaXMgaW50ZXJlc3RlZCBpblxyXG4gICAgICAgIGxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsb3QuQXBwQ29uc3RhbnRzLldJTkRPV19SRVNJWkVELFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbG90LkFwcENvbnN0YW50cy5BU1NFVFNfTE9BREVEXHJcbiAgICAgICAgICAgICAgICAgICAgXTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvblJlZ2lzdGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Vmlld0NvbXBvbmVudCggbmV3IHNsb3Qudmlldy5jb21wb25lbnQuQkcoKSApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy53aW5kb3dTaXplUHJveHkgPSB0aGlzLmZhY2FkZS5yZXRyaWV2ZVByb3h5KHNsb3QubW9kZWwucHJveHkuV2luZG93U2l6ZVByb3h5Lk5BTUUpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIEhhbmRsZSBub3RpZmljYXRpb25zIGZyb20gb3RoZXIgUHVyZU1WQyBhY3RvcnNcclxuICAgICAgICBoYW5kbGVOb3RpZmljYXRpb246IGZ1bmN0aW9uIChub3RlKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoIG5vdGUuZ2V0TmFtZSgpICkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBzbG90LkFwcENvbnN0YW50cy5XSU5ET1dfUkVTSVpFRDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQuaGFuZGxlUmVzaXplKG5vdGUuZ2V0Qm9keSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2Ugc2xvdC5BcHBDb25zdGFudHMuQVNTRVRTX0xPQURFRDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQuaW5pdCh0aGlzLndpbmRvd1NpemVQcm94eS53aW5kb3dTaXplVk8pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdCR01lZGlhdG9yJ1xyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgUGFuZWxNZWRpYXRvclxyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3Qudmlldy5tZWRpYXRvci5QYW5lbE1lZGlhdG9yJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuTWVkaWF0b3JcclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIC8vIFJlZmVyZW5jZXNcclxuICAgICAgICB3aW5kb3dTaXplUHJveHk6IG51bGwsXHJcbiAgICAgICAgY29uZmlnUHJveHk6IG51bGwsXHJcbiAgICAgICAgc2VydmVyUHJveHk6IG51bGwsXHJcblxyXG4gICAgICAgIC8vIE5vdGlmaWNhdGlvbnMgdGhpcyBtZWRpYXRvciBpcyBpbnRlcmVzdGVkIGluIFxyXG4gICAgICAgIGxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgIHNsb3QuQXBwQ29uc3RhbnRzLldJTkRPV19SRVNJWkVELFxyXG4gICAgICAgICAgICAgICAgc2xvdC5BcHBDb25zdGFudHMuQVNTRVRTX0xPQURFRCxcclxuICAgICAgICAgICAgICAgIHNsb3QuQXBwQ29uc3RhbnRzLlNQSU5fRU5ELFxyXG4gICAgICAgICAgICAgICAgc2xvdC5BcHBDb25zdGFudHMuU0VSVkVSX0lOSVRcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvblJlZ2lzdGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Vmlld0NvbXBvbmVudChuZXcgc2xvdC52aWV3LmNvbXBvbmVudC5QYW5lbCgpKTtcclxuICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LnN0YWdlLm9uKFxyXG4gICAgICAgICAgICAgICAgc2xvdC52aWV3LmV2ZW50LlZpZXdFdmVudHMuU1BJTl9DTElDSyxcclxuICAgICAgICAgICAgICAgIHRoaXMub25TcGluQ2xpY2suYmluZCh0aGlzKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQuc3RhZ2Uub24oXHJcbiAgICAgICAgICAgICAgICBzbG90LnZpZXcuZXZlbnQuVmlld0V2ZW50cy5CRVRfQ0xJQ0ssXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQmV0VXBkYXRlLmJpbmQodGhpcylcclxuICAgICAgICAgICAgKVxyXG5cclxuICAgICAgICAgICAgdGhpcy53aW5kb3dTaXplUHJveHkgPSB0aGlzLmZhY2FkZS5yZXRyaWV2ZVByb3h5KHNsb3QubW9kZWwucHJveHkuV2luZG93U2l6ZVByb3h5Lk5BTUUpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZ1Byb3h5ID0gdGhpcy5mYWNhZGUucmV0cmlldmVQcm94eShzbG90Lm1vZGVsLnByb3h5LkNvbmZpZ1Byb3h5Lk5BTUUpO1xyXG4gICAgICAgICAgICB0aGlzLnNlcnZlclByb3h5ID0gdGhpcy5mYWNhZGUucmV0cmlldmVQcm94eShzbG90Lm1vZGVsLnByb3h5LlNlcnZlclByb3h5Lk5BTUUpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uU3BpbkNsaWNrOiBmdW5jdGlvbihiZXRBbW91bnQpe1xyXG4gICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQudXBkYXRlQmFsYW5jZSh0aGlzLnNlcnZlclByb3h5LnJlc3VsdFZPLmJhbGFuY2UgLSBiZXRBbW91bnQpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oc2xvdC5BcHBDb25zdGFudHMuU1BJTiwgYmV0QW1vdW50KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvbkJldFVwZGF0ZTogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKHNsb3QuQXBwQ29uc3RhbnRzLkJFVF9VUERBVEVEKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBIYW5kbGUgbm90aWZpY2F0aW9ucyBmcm9tIG90aGVyIFB1cmVNVkMgYWN0b3JzXHJcbiAgICAgICAgaGFuZGxlTm90aWZpY2F0aW9uOiBmdW5jdGlvbiAobm90ZSkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKCBub3RlLmdldE5hbWUoKSApIHtcclxuICAgICAgICAgICAgICAgIGNhc2Ugc2xvdC5BcHBDb25zdGFudHMuV0lORE9XX1JFU0laRUQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LmhhbmRsZVJlc2l6ZShub3RlLmdldEJvZHkoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHNsb3QuQXBwQ29uc3RhbnRzLkFTU0VUU19MT0FERUQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LmluaXQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhbWVDb25maWdWTzogdGhpcy5jb25maWdQcm94eS5nYW1lQ29uZmlnVk8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aUNvbmZpZ1ZPOiB0aGlzLmNvbmZpZ1Byb3h5LnVpQ29uZmlnVk8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dTaXplVk86IHRoaXMud2luZG93U2l6ZVByb3h5LndpbmRvd1NpemVWT1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2Ugc2xvdC5BcHBDb25zdGFudHMuU0VSVkVSX0lOSVQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LmVuYWJsZUJldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld0NvbXBvbmVudC5lbmFibGVTcGluKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LnVwZGF0ZUJhbGFuY2UodGhpcy5zZXJ2ZXJQcm94eS5yZXN1bHRWTy5iYWxhbmNlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2Ugc2xvdC5BcHBDb25zdGFudHMuU1BJTl9FTkQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdFZPID0gbm90ZS5nZXRCb2R5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LmVuYWJsZUJldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld0NvbXBvbmVudC5lbmFibGVTcGluKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LnVwZGF0ZUJhbGFuY2UodGhpcy5zZXJ2ZXJQcm94eS5yZXN1bHRWTy5iYWxhbmNlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQudXBkYXRlV2luKHRoaXMuc2VydmVyUHJveHkucmVzdWx0Vk8udG90YWxXaW4pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdQYW5lbE1lZGlhdG9yJ1xyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgUmVlbENvbnRhaW5lck1lZGlhdG9yXHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC52aWV3Lm1lZGlhdG9yLlJlZWxDb250YWluZXJNZWRpYXRvcicsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLk1lZGlhdG9yXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvLyBSZWZlcmVuY2VzXHJcbiAgICAgICAgd2luZG93U2l6ZVByb3h5OiBudWxsLFxyXG4gICAgICAgIGNvbmZpZ1Byb3h5OiBudWxsLFxyXG4gICAgICAgIHNlcnZlclByb3h5OiBudWxsLFxyXG5cclxuICAgICAgICAvLyBBZGRpdGlvbmFsIHZpZXdzXHJcbiAgICAgICAgd2luTGluZXNWaWV3OiBudWxsLFxyXG5cclxuICAgICAgICAvLyBOb3RpZmljYXRpb25zIHRoaXMgbWVkaWF0b3IgaXMgaW50ZXJlc3RlZCBpbiBcclxuICAgICAgICBsaXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICBzbG90LkFwcENvbnN0YW50cy5XSU5ET1dfUkVTSVpFRCxcclxuICAgICAgICAgICAgICAgIHNsb3QuQXBwQ29uc3RhbnRzLkFTU0VUU19MT0FERUQsXHJcbiAgICAgICAgICAgICAgICBzbG90LkFwcENvbnN0YW50cy5TUElOLFxyXG4gICAgICAgICAgICAgICAgc2xvdC5BcHBDb25zdGFudHMuU1BJTl9SRVNVTFQsXHJcbiAgICAgICAgICAgICAgICBzbG90LkFwcENvbnN0YW50cy5XSU5fQU5OT1VOQ0VNRU5ULFxyXG4gICAgICAgICAgICAgICAgc2xvdC5BcHBDb25zdGFudHMuQ0xFQVJfV0lOX0FOTk9VTkNFTUVOVCxcclxuICAgICAgICAgICAgICAgIHNsb3QuQXBwQ29uc3RhbnRzLlNFUlZFUl9JTklUXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25SZWdpc3RlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFZpZXdDb21wb25lbnQobmV3IHNsb3Qudmlldy5jb21wb25lbnQuUmVlbENvbnRhaW5lcigpKTtcclxuICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LnN0YWdlLm9uKFxyXG4gICAgICAgICAgICAgICAgc2xvdC52aWV3LmV2ZW50LlZpZXdFdmVudHMuUkVFTF9TUElOX0VORCxcclxuICAgICAgICAgICAgICAgIHRoaXMub25SZWVsU3BpbkVuZC5iaW5kKHRoaXMpXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLndpbkxpbmVzVmlldyA9IG5ldyBzbG90LnZpZXcuY29tcG9uZW50LldpbkxpbmVzKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLndpbmRvd1NpemVQcm94eSA9IHRoaXMuZmFjYWRlLnJldHJpZXZlUHJveHkoc2xvdC5tb2RlbC5wcm94eS5XaW5kb3dTaXplUHJveHkuTkFNRSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlnUHJveHkgPSB0aGlzLmZhY2FkZS5yZXRyaWV2ZVByb3h5KHNsb3QubW9kZWwucHJveHkuQ29uZmlnUHJveHkuTkFNRSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VydmVyUHJveHkgPSB0aGlzLmZhY2FkZS5yZXRyaWV2ZVByb3h5KHNsb3QubW9kZWwucHJveHkuU2VydmVyUHJveHkuTkFNRSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25SZWVsU3BpbkVuZDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKHNsb3QuQXBwQ29uc3RhbnRzLlNQSU5fRU5EKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBIYW5kbGUgbm90aWZpY2F0aW9ucyBmcm9tIG90aGVyIFB1cmVNVkMgYWN0b3JzXHJcbiAgICAgICAgaGFuZGxlTm90aWZpY2F0aW9uOiBmdW5jdGlvbiAobm90ZSkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKCBub3RlLmdldE5hbWUoKSApIHtcclxuICAgICAgICAgICAgICAgIGNhc2Ugc2xvdC5BcHBDb25zdGFudHMuV0lORE9XX1JFU0laRUQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LmhhbmRsZVJlc2l6ZShub3RlLmdldEJvZHkoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHNsb3QuQXBwQ29uc3RhbnRzLkFTU0VUU19MT0FERUQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWVDb25maWdWTzogdGhpcy5jb25maWdQcm94eS5nYW1lQ29uZmlnVk8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVpQ29uZmlnVk86IHRoaXMuY29uZmlnUHJveHkudWlDb25maWdWTyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93U2l6ZVZPOiB0aGlzLndpbmRvd1NpemVQcm94eS53aW5kb3dTaXplVk9cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld0NvbXBvbmVudC5pbml0KGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2luTGluZXNWaWV3LmluaXQoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LnN0YWdlLmFkZENoaWxkKHRoaXMud2luTGluZXNWaWV3LnN0YWdlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2Ugc2xvdC5BcHBDb25zdGFudHMuU0VSVkVSX0lOSVQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LnVwZGF0ZVN5bWJvbHNXaXRob3V0U3Bpbih0aGlzLnNlcnZlclByb3h5LnJlc3VsdFZPLmdldFN5bWJvbE1hdHJpeCgpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2Ugc2xvdC5BcHBDb25zdGFudHMuU1BJTjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQuc3BpbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBzbG90LkFwcENvbnN0YW50cy5TUElOX1JFU1VMVDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQuc3RvcEFuZFVwZGF0ZVN5bWJvbHMobm90ZS5nZXRCb2R5KCkuZ2V0U3ltYm9sTWF0cml4KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBzbG90LkFwcENvbnN0YW50cy5XSU5fQU5OT1VOQ0VNRU5UOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2luTGluZXNWaWV3LnNob3dMaW5lKG5vdGUuZ2V0Qm9keSgpLndpbi5saW5lTnVtYmVyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQuc2hvd1dpbkhpZ2hsaWdodChcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWdQcm94eS5nYW1lQ29uZmlnVk8ubGluZXNbbm90ZS5nZXRCb2R5KCkud2luLmxpbmVOdW1iZXJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBub3RlLmdldEJvZHkoKS53aW4ub2FrXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2Ugc2xvdC5BcHBDb25zdGFudHMuQ0xFQVJfV0lOX0FOTk9VTkNFTUVOVDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndpbkxpbmVzVmlldy5oaWRlQWxsTGluZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQuaGlkZVdpbkhpZ2hsaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdSZWVsQ29udGFpbmVyTWVkaWF0b3InXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBTb3VuZFBsYXllck1lZGlhdG9yXHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC52aWV3Lm1lZGlhdG9yLlNvdW5kUGxheWVyTWVkaWF0b3InLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5NZWRpYXRvclxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLy8gUmVmZXJlbmNlc1xyXG4gICAgICAgIHNvdW5kOiBudWxsLFxyXG4gICAgICAgIGNvbmZpZ1Byb3h5OiBudWxsLFxyXG5cclxuICAgICAgICAvLyBOb3RpZmljYXRpb25zIHRoaXMgbWVkaWF0b3IgaXMgaW50ZXJlc3RlZCBpbiBcclxuICAgICAgICBsaXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICBzbG90LkFwcENvbnN0YW50cy5BU1NFVFNfTE9BREVELFxyXG4gICAgICAgICAgICAgICAgc2xvdC5BcHBDb25zdGFudHMuQkVUX1VQREFURUQsXHJcbiAgICAgICAgICAgICAgICBzbG90LkFwcENvbnN0YW50cy5TUElOLFxyXG4gICAgICAgICAgICAgICAgc2xvdC5BcHBDb25zdGFudHMuV0lOX0FOTk9VTkNFTUVOVFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uUmVnaXN0ZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy90aGlzLnNldFZpZXdDb21wb25lbnQoIC4uLiApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jb25maWdQcm94eSA9IHRoaXMuZmFjYWRlLnJldHJpZXZlUHJveHkoc2xvdC5tb2RlbC5wcm94eS5Db25maWdQcm94eS5OQU1FKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBIYW5kbGUgbm90aWZpY2F0aW9ucyBmcm9tIG90aGVyIFB1cmVNVkMgYWN0b3JzXHJcbiAgICAgICAgaGFuZGxlTm90aWZpY2F0aW9uOiBmdW5jdGlvbiAobm90ZSkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKCBub3RlLmdldE5hbWUoKSApIHtcclxuICAgICAgICAgICAgICAgIGNhc2Ugc2xvdC5BcHBDb25zdGFudHMuQVNTRVRTX0xPQURFRDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdW5kID0gbm90ZS5nZXRCb2R5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHNsb3QuQXBwQ29uc3RhbnRzLkJFVF9VUERBVEVEOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc291bmQucGxheShcImJldFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2Ugc2xvdC5BcHBDb25zdGFudHMuU1BJTjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdW5kLnBsYXkoXCJzcGluXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBzbG90LkFwcENvbnN0YW50cy5XSU5fQU5OT1VOQ0VNRU5UOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFub3RlLmdldEJvZHkoKS5pc1JlcGVhdGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgd2luU3ltYm9sID0gbm90ZS5nZXRCb2R5KCkud2luLnN5bWJvbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnUHJveHkuZ2FtZUNvbmZpZ1ZPLmlzUm95YWxTeW1ib2wod2luU3ltYm9sKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3VuZC5wbGF5KFwid2luX3JveWFsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3VuZC5wbGF5KFwid2luX3NcIiArIHdpblN5bWJvbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogJ1NvdW5kUGxheWVyTWVkaWF0b3InXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBXaW5Bbm5vdW5jZU1lZGlhdG9yXHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC52aWV3Lm1lZGlhdG9yLldpbkFubm91bmNlTWVkaWF0b3InLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5NZWRpYXRvclxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLy8gUmVmZXJlbmNlc1xyXG4gICAgICAgIHNlcnZlclByb3h5OiBudWxsLFxyXG4gICAgICAgIGNvbmZpZ1Byb3h5OiBudWxsLFxyXG5cclxuICAgICAgICBjdXJyZW50V2luSW5kZXg6IG51bGwsXHJcbiAgICAgICAgaXNBbm5vdW5jaW5nOiBudWxsLFxyXG4gICAgICAgIHdpbkFubm91bmNlRGVsYXk6IG51bGwsXHJcbiAgICAgICAgcmVwZWF0Q291bnQ6IG51bGwsXHJcbiAgICAgICAgaW50ZXJ2YWxJRDogbnVsbCxcclxuXHJcbiAgICAgICAgLy8gTm90aWZpY2F0aW9ucyB0aGlzIG1lZGlhdG9yIGlzIGludGVyZXN0ZWQgaW4gXHJcbiAgICAgICAgbGlzdE5vdGlmaWNhdGlvbkludGVyZXN0czogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAgc2xvdC5BcHBDb25zdGFudHMuU1RBUlRfV0lOX0FOTk9VTkNFTUVOVFMsXHJcbiAgICAgICAgICAgICAgICBzbG90LkFwcENvbnN0YW50cy5TVE9QX1dJTl9BTk5PVU5DRU1FTlRTXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25SZWdpc3RlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlcnZlclByb3h5ID0gdGhpcy5mYWNhZGUucmV0cmlldmVQcm94eShzbG90Lm1vZGVsLnByb3h5LlNlcnZlclByb3h5Lk5BTUUpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZ1Byb3h5ID0gdGhpcy5mYWNhZGUucmV0cmlldmVQcm94eShzbG90Lm1vZGVsLnByb3h5LkNvbmZpZ1Byb3h5Lk5BTUUpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFubm91bmNlV2luOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZih0aGlzLnJlcGVhdENvdW50ID49IHRoaXMuY29uZmlnUHJveHkudWlDb25maWdWTy5yZXBlYXRXaW5zKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BBbm5vdW5jZW1lbnRJbnRlcnZhbCgpO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmlzQW5ub3VuY2luZyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oXHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdC5BcHBDb25zdGFudHMuV0lOX0FOTk9VTkNFTUVOVCxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbjogdGhpcy5zZXJ2ZXJQcm94eS5yZXN1bHRWTy53aW5zW3RoaXMuY3VycmVudFdpbkluZGV4XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNSZXBlYXRpbmc6IHRoaXMucmVwZWF0Q291bnQgPiAwXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuY3VycmVudFdpbkluZGV4IDwgdGhpcy5zZXJ2ZXJQcm94eS5yZXN1bHRWTy53aW5zLmxlbmd0aCAtIDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFdpbkluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRXaW5JbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXBlYXRDb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuaW50ZXJ2YWxJRCA9IHNldFRpbWVvdXQoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbm5vdW5jZVdpbi5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnUHJveHkudWlDb25maWdWTy53aW5Bbm5vdW5jZURlbGF5ICogMTAwMFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN0b3BBbm5vdW5jZW1lbnRJbnRlcnZhbDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSUQpO1xyXG4gICAgICAgICAgICB0aGlzLmlzQW5ub3VuY2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oc2xvdC5BcHBDb25zdGFudHMuQ0xFQVJfV0lOX0FOTk9VTkNFTUVOVCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gSGFuZGxlIG5vdGlmaWNhdGlvbnMgZnJvbSBvdGhlciBQdXJlTVZDIGFjdG9yc1xyXG4gICAgICAgIGhhbmRsZU5vdGlmaWNhdGlvbjogZnVuY3Rpb24gKG5vdGUpIHtcclxuICAgICAgICAgICAgc3dpdGNoICggbm90ZS5nZXROYW1lKCkgKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHNsb3QuQXBwQ29uc3RhbnRzLlNUQVJUX1dJTl9BTk5PVU5DRU1FTlRTOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuc2VydmVyUHJveHkucmVzdWx0Vk8ud2lucy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRXaW5JbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNBbm5vdW5jaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXBlYXRDb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYW5ub3VuY2VXaW4oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHNsb3QuQXBwQ29uc3RhbnRzLlNUT1BfV0lOX0FOTk9VTkNFTUVOVFM6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wQW5ub3VuY2VtZW50SW50ZXJ2YWwoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBOQU1FOiAnV2luQW5ub3VuY2VNZWRpYXRvcidcclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2NcclxuICogQGNsYXNzICAgICAgIEFwcFxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBQSVhJIGdsb2JhbCB2YXJpYWJsZXMgKi9cclxudmFyIFBYUm9vdCwgUFhSZW5kZXJlcjtcclxuXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LkFwcCcsXHJcbiAgICAgICAgY29uc3RydWN0b3I6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3RlckNvbW1hbmQoc2xvdC5BcHBDb25zdGFudHMuU1RBUlRVUCwgc2xvdC5jb250cm9sbGVyLmNvbW1hbmQuU3RhcnR1cENvbW1hbmQpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5zZW5kTm90aWZpY2F0aW9uKHNsb3QuQXBwQ29uc3RhbnRzLlNUQVJUVVApO1xyXG5cclxuICAgICAgICAgICAgdmFyIGxvYWRlclByb3h5ID0gdGhpcy5mYWNhZGUucmV0cmlldmVQcm94eShzbG90Lm1vZGVsLnByb3h5LkxvYWRlclByb3h5Lk5BTUUpO1xyXG4gICAgICAgICAgICBsb2FkZXJQcm94eS5sb2FkQXNzZXRzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgU1RBUlRVUDogJ3N0YXJ0dXAnLFxyXG4gICAgICAgIGZhY2FkZTogcHVyZW12Yy5GYWNhZGUuZ2V0SW5zdGFuY2UoIHNsb3QuQXBwQ29uc3RhbnRzLkNPUkVfTkFNRSApXHJcbiAgICB9XHJcbik7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
