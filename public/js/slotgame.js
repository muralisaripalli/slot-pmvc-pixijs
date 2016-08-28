/*Generated on:Mon Aug 29 2016 02:36:58 GMT+1000 (AUS Eastern Standard Time)*//**
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
        SPIN:                       "AppConstants_spin",
        SPIN_RESULT:                "AppConstants_spin_result",
        SPIN_END:                   "AppConstants_spin_end",

        START_WIN_ANNOUNCEMENTS:    "AppConstants_start_win_announcements",
        STOP_WIN_ANNOUNCEMENTS:     "AppConstants_stop_win_announcements",
        WIN_ANNOUNCEMENT:           "AppConstants_win_announcement",
        CLEAR_WIN_ANNOUNCEMENT:     "AppConstants_clear_win_announcement"
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
                //[1,1,1,1,2,2,2,2],
                //[1,1,1,1,2,2,2,2],
                //[1,1,1,1,2,2,2,2],
                //[1,1,1,1,2,2,2,2],
                //[1,1,1,1,2,2,2,2]
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
        balance: 1000,
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
        winAnnounceDelay: 1.5,
        repeatWins: 2,
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
        onRegister: function(){
        },

        loadAssets: function() {
            var loader = new PIXI.loaders.Loader("",3);
            loader.add('bg', 'assets/background.jpg');

            loader.add('s1', 'assets/snowflake.png');
            loader.add('s2', 'assets/sun.png');
            loader.add('s3', 'assets/sandglass.png');
            loader.add('s4', 'assets/victory.png');
            loader.add('s5', 'assets/a.png');
            loader.add('s6', 'assets/k.png');
            loader.add('s7', 'assets/q.png');
            loader.add('s8', 'assets/j.png');

            loader.add('spin', 'assets/spin.png');
            loader.add('spin_disabled', 'assets/spin_disabled.png');

            loader.add('win', 'assets/win.png');
            loader.add('balance', 'assets/balance.png');

            loader.add('bet', 'assets/bet.png');
            loader.add('bet_minus', 'assets/bet_minus.png');
            loader.add('bet_minus_disabled', 'assets/bet_minus_disabled.png');
            loader.add('bet_plus', 'assets/bet_plus.png');
            loader.add('bet_plus_disabled', 'assets/bet_plus_disabled.png');

            loader.on("progress", this.onLoadProgress.bind(this));
            loader.load(this.onLoadComplete.bind(this));
        },

        onLoadComplete: function(loader, resources){
            this.setData(resources);
            this.sendNotification(slot.AppConstants.ASSETS_LOADED, resources);
        },

        onLoadProgress: function(loader, file){
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

        spin: function() {
            this.server.loadSpinResult(this.onResult.bind(this));
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
            this.facade.registerMediator(new slot.view.mediator.PanelMediator());
            this.facade.registerMediator(new slot.view.mediator.WinAnnounceMediator());
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

            server.spin();
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

        init: function(data){
            this.addChildren(data.resources);
            this.setupView(data.windowSizeVO);

            PXRoot.addChild(this.stage);
        },

        addChildren: function(resources){
            this.bg = new PIXI.Sprite(resources.bg.texture);
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

        currency: null,
        denominations: null,
        currentDenomination: null,

        respScale: null,

        init: function (data) {
            this.currency = data.uiConfigVO.currency;
            this.respScale = data.uiConfigVO.responsiveScale;

            this.denominations = data.gameConfigVO.denominations;
            this.currentDenomination = data.gameConfigVO.defaultDenomination;

            this.addChildren(data.resources);
            this.setupView(data.windowSizeVO);

            PXRoot.addChild(this.stage);
        },

        addChildren: function(resources){
            // Spin component
            this.spin = new PIXI.Container();
            this.spin.addChild(new PIXI.Sprite(resources.spin_disabled.texture));
            this.spin.addChild(this.btnSpin = new PIXI.Sprite(resources.spin.texture));
            this.stage.addChild(this.spin);

            // Win component ==>
            this.win = new PIXI.Container();
            this.win.addChild(new PIXI.Sprite(resources.win.texture));

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
            this.balance.addChild(new PIXI.Sprite(resources.balance.texture));

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
            this.bet.addChild(new PIXI.Sprite(resources.bet_minus_disabled.texture));
            this.bet.addChild(this.btnBetMinus = new PIXI.Sprite(resources.bet_minus.texture));
            var betSprite = new PIXI.Sprite(resources.bet.texture);
            betSprite.x += this.btnBetMinus.width + 2;
            this.bet.addChild(betSprite);
            var betPlusDSprite = new PIXI.Sprite(resources.bet_plus_disabled.texture);
            betPlusDSprite.x = betSprite.x + betSprite.width + 2;
            this.bet.addChild(betPlusDSprite);
            this.bet.addChild(this.btnBetPlus = new PIXI.Sprite(resources.bet_plus.texture));
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
            this.stage.emit(slot.view.event.ViewEvents.SPIN_CLICK);
        },

        onBetMinusClick: function(evt){
            this.decreaseBet();
        },

        onBetPlusClick: function(evt){
            this.increaseBet();
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

        symbolID: null,
        resources: null,

        // All possible symbols
        numSymbols: null,
        symbols: null,

        init: function (data) {
            this.resources = data.resources;
            this.numSymbols = data.gameConfigVO.numSymbols;
            this.symbols = data.gameConfigVO.getSymbols();

        },

        updateSymbol: function(symbolID){
            this.symbolID = symbolID;
            this.removeSymbol();
            this.symbol = new PIXI.Sprite(this.resources[symbolID].texture);
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
        REEL_SPIN_END:      "ViewEvents_reel_spin_end"
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
                    this.viewComponent.init(
                        {
                            resources: note.getBody(),
                            windowSizeVO: this.windowSizeProxy.windowSizeVO
                        }
                    );
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
                slot.AppConstants.SPIN_END
            ];
        },

        onRegister: function () {
            this.setViewComponent(new slot.view.component.Panel());
            this.viewComponent.stage.on(
                slot.view.event.ViewEvents.SPIN_CLICK,
                this.onSpinClick.bind(this)
            );

            this.windowSizeProxy = this.facade.retrieveProxy(slot.model.proxy.WindowSizeProxy.NAME);
            this.configProxy = this.facade.retrieveProxy(slot.model.proxy.ConfigProxy.NAME);
            this.serverProxy = this.facade.retrieveProxy(slot.model.proxy.ServerProxy.NAME);
        },

        onSpinClick: function(){
            this.sendNotification(slot.AppConstants.SPIN);
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
                            resources: note.getBody(),
                            gameConfigVO: this.configProxy.gameConfigVO,
                            uiConfigVO: this.configProxy.uiConfigVO,
                            windowSizeVO: this.windowSizeProxy.windowSizeVO
                        }
                    );
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
                slot.AppConstants.CLEAR_WIN_ANNOUNCEMENT
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
                        resources: note.getBody(),
                        gameConfigVO: this.configProxy.gameConfigVO,
                        uiConfigVO: this.configProxy.uiConfigVO,
                        windowSizeVO: this.windowSizeProxy.windowSizeVO
                    };
                    this.viewComponent.init(data);
                    this.viewComponent.updateSymbolsWithoutSpin(this.serverProxy.resultVO.getSymbolMatrix());
                    this.winLinesView.init(data);
                    this.viewComponent.stage.addChild(this.winLinesView.stage);
                    break;
                case slot.AppConstants.SPIN:
                    this.viewComponent.spin();
                    break;
                case slot.AppConstants.SPIN_RESULT:
                    this.viewComponent.stopAndUpdateSymbols(note.getBody().getSymbolMatrix());
                    break;
                case slot.AppConstants.WIN_ANNOUNCEMENT:
                    this.winLinesView.showLine(note.getBody().lineNumber);
                    break;
                case slot.AppConstants.CLEAR_WIN_ANNOUNCEMENT:
                    this.winLinesView.hideAllLines();
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

        currentWin: null,
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
                    this.serverProxy.resultVO.wins[this.currentWin]
                );
                if(this.currentWin < this.serverProxy.resultVO.wins.length - 1){
                    this.currentWin++;
                }else{
                    this.currentWin = 0;
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
                        this.currentWin = 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFwcENvbnN0YW50cy5qcyIsImVudW0vT1JJRU5UQVRJT04uanMiLCJsaWIvVXRpbHMuanMiLCJ2by9HYW1lQ29uZmlnVk8uanMiLCJ2by9SZXN1bHRWTy5qcyIsInZvL1VJQ29uZmlnVk8uanMiLCJ2by9XaW5kb3dTaXplVk8uanMiLCJwcm94eS9Db25maWdQcm94eS5qcyIsInByb3h5L0xvYWRlclByb3h5LmpzIiwicHJveHkvU2VydmVyUHJveHkuanMiLCJwcm94eS9XaW5kb3dTaXplUHJveHkuanMiLCJwcm94eS9zZXJ2aWNlL1NlcnZlclNlcnZpY2UuanMiLCJjb21tYW5kL1ByZXBDb250cm9sbGVyQ29tbWFuZC5qcyIsImNvbW1hbmQvUHJlcE1vZGVsQ29tbWFuZC5qcyIsImNvbW1hbmQvUHJlcFBpeGlDb21tYW5kLmpzIiwiY29tbWFuZC9QcmVwVmlld0NvbW1hbmQuanMiLCJjb21tYW5kL1NwaW5Db21tYW5kLmpzIiwiY29tbWFuZC9TcGluRW5kQ29tbWFuZC5qcyIsImNvbW1hbmQvU3RhcnR1cENvbW1hbmQuanMiLCJjb21tYW5kL1dpbmRvd1Jlc2l6ZUNvbW1hbmQuanMiLCJjb21wb25lbnQvQkcuanMiLCJjb21wb25lbnQvUGFuZWwuanMiLCJjb21wb25lbnQvUmVlbC5qcyIsImNvbXBvbmVudC9SZWVsQ2VsbC5qcyIsImNvbXBvbmVudC9SZWVsQ29udGFpbmVyLmpzIiwiY29tcG9uZW50L1dpbkxpbmVzLmpzIiwiZXZlbnQvVmlld0V2ZW50cy5qcyIsIm1lZGlhdG9yL0JHTWVkaWF0b3IuanMiLCJtZWRpYXRvci9QYW5lbE1lZGlhdG9yLmpzIiwibWVkaWF0b3IvUmVlbENvbnRhaW5lck1lZGlhdG9yLmpzIiwibWVkaWF0b3IvV2luQW5ub3VuY2VNZWRpYXRvci5qcyIsIkFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOEVBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMVBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic2xvdGdhbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgQXBwQ29uc3RhbnRzXHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiBcInNsb3QuQXBwQ29uc3RhbnRzXCJcclxuICAgIH0sXHJcblxyXG4gICAge30sXHJcblxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvLyBUaGUgbXVsdGl0b24ga2V5IGZvciB0aGlzIGFwcCdzIHNpbmdsZSBjb3JlXHJcbiAgICAgICAgQ09SRV9OQU1FOiAgICAgICAgICAgICAgJ1Nsb3RHYW1lJyxcclxuXHJcbiAgICAgICAgLy8gTm90aWZpY2F0aW9uc1xyXG4gICAgICAgIFNUQVJUVVA6ICAgICAgICAgICAgICAgICAgICBcIkFwcENvbnN0YW50c19zdGFydHVwXCIsXHJcblxyXG4gICAgICAgIC8vID09PVxyXG4gICAgICAgIEFTU0VUU19MT0FERUQ6ICAgICAgICAgICAgICBcIkFwcENvbnN0YW50c19hc3NldHNfbG9hZGVkXCIsXHJcbiAgICAgICAgV0lORE9XX1JFU0laRUQ6ICAgICAgICAgICAgIFwiQXBwQ29uc3RhbnRzX3dpbmRvd19yZXNpemVkXCIsXHJcbiAgICAgICAgU1BJTjogICAgICAgICAgICAgICAgICAgICAgIFwiQXBwQ29uc3RhbnRzX3NwaW5cIixcclxuICAgICAgICBTUElOX1JFU1VMVDogICAgICAgICAgICAgICAgXCJBcHBDb25zdGFudHNfc3Bpbl9yZXN1bHRcIixcclxuICAgICAgICBTUElOX0VORDogICAgICAgICAgICAgICAgICAgXCJBcHBDb25zdGFudHNfc3Bpbl9lbmRcIixcclxuXHJcbiAgICAgICAgU1RBUlRfV0lOX0FOTk9VTkNFTUVOVFM6ICAgIFwiQXBwQ29uc3RhbnRzX3N0YXJ0X3dpbl9hbm5vdW5jZW1lbnRzXCIsXHJcbiAgICAgICAgU1RPUF9XSU5fQU5OT1VOQ0VNRU5UUzogICAgIFwiQXBwQ29uc3RhbnRzX3N0b3Bfd2luX2Fubm91bmNlbWVudHNcIixcclxuICAgICAgICBXSU5fQU5OT1VOQ0VNRU5UOiAgICAgICAgICAgXCJBcHBDb25zdGFudHNfd2luX2Fubm91bmNlbWVudFwiLFxyXG4gICAgICAgIENMRUFSX1dJTl9BTk5PVU5DRU1FTlQ6ICAgICBcIkFwcENvbnN0YW50c19jbGVhcl93aW5fYW5ub3VuY2VtZW50XCJcclxuICAgIH1cclxuKTsiLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgT1JJRU5UQVRJT05cclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90Lm1vZGVsLmVudW0uT1JJRU5UQVRJT04nXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHt9LFxyXG5cclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogXCJPUklFTlRBVElPTlwiLFxyXG4gICAgICAgIExBTkRTQ0FQRTogXCJsYW5kc2NhcGVcIixcclxuICAgICAgICBQT1JUUkFJVDogXCJwb3J0cmFpdFwiXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBVdGlsc1xyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3QubW9kZWwubGliLlV0aWxzJ1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgZml0Q29udGVudE9uU2NyZWVuOiBmdW5jdGlvbihvKXtcclxuICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSBvLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIHZhciBjb250ZW50RGltZW5zaW9ucyA9IG8uY29udGVudERpbWVuc2lvbnMgfHwgby5jb250ZW50O1xyXG5cclxuICAgICAgICAgICAgdmFyIHNpemUgPSBzbG90Lm1vZGVsLmxpYi5VdGlscy5nZXRTaXplVG9GaXRTY3JlZW4oXHJcbiAgICAgICAgICAgICAgICBjb250ZW50RGltZW5zaW9ucyxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogby5zY3JlZW4ud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBvLnNjcmVlbi5oZWlnaHRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgY29udGVudC54ID0gby5zY3JlZW4ueCArICgoby5zY3JlZW4ud2lkdGggLSBzaXplLndpZHRoKS8yKTtcclxuICAgICAgICAgICAgY29udGVudC55ID0gby5zY3JlZW4ueSArICgoby5zY3JlZW4uaGVpZ2h0IC0gc2l6ZS5oZWlnaHQpLzIpO1xyXG4gICAgICAgICAgICBjb250ZW50LndpZHRoID0gc2l6ZS53aWR0aDtcclxuICAgICAgICAgICAgY29udGVudC5oZWlnaHQgPSBzaXplLmhlaWdodDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6IFwiVXRpbHNcIixcclxuXHJcbiAgICAgICAgZ2V0T3JpZW50YXRpb246IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQpe1xyXG4gICAgICAgICAgICByZXR1cm4gICh3aWR0aCA+IGhlaWdodCkgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbG90Lm1vZGVsLmVudW0uT1JJRU5UQVRJT04uTEFORFNDQVBFOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbG90Lm1vZGVsLmVudW0uT1JJRU5UQVRJT04uUE9SVFJBSVQ7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0U2l6ZVRvRmlsbFNjcmVlbjogZnVuY3Rpb24oY29udGVudCwgc2NyZWVuKXtcclxuICAgICAgICAgICAgaWYoKHNjcmVlbi53aWR0aC9zY3JlZW4uaGVpZ2h0KSA+IChjb250ZW50LndpZHRoL2NvbnRlbnQuaGVpZ2h0KSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBzY3JlZW4ud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGNvbnRlbnQuaGVpZ2h0ICogKHNjcmVlbi53aWR0aC9jb250ZW50LndpZHRoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIHtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogY29udGVudC53aWR0aCAqIChzY3JlZW4uaGVpZ2h0L2NvbnRlbnQuaGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHNjcmVlbi5oZWlnaHRcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBGaXQgZ2l2ZW4gY29udGVudCBpbnRvIGEgZ2l2ZW4gc2NyZWVuIHdpdGhob3V0IGRpc3R1cmJpbmcgdGhlIGFzcGVjdCByYXRpb1xyXG4gICAgICAgICAqIG9mIHRoZSBjb250ZW50LlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBmaXRPYmogLSBPYmplY3Qgd2l0aCBkYXRhIHRvIGFwcGx5IGZpdFxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldFNpemVUb0ZpdFNjcmVlbjogZnVuY3Rpb24oY29udGVudCwgc2NyZWVuKXtcclxuICAgICAgICAgICAgaWYoKHNjcmVlbi53aWR0aC9zY3JlZW4uaGVpZ2h0KSA+IChjb250ZW50LndpZHRoL2NvbnRlbnQuaGVpZ2h0KSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIHtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogY29udGVudC53aWR0aCAqIChzY3JlZW4uaGVpZ2h0L2NvbnRlbnQuaGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHNjcmVlbi5oZWlnaHRcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBzY3JlZW4ud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBjb250ZW50LmhlaWdodCAqIChzY3JlZW4ud2lkdGgvY29udGVudC53aWR0aClcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB0b2dnbGVGdWxsU2NyZWVuOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGRvYyA9IHdpbmRvdy5kb2N1bWVudDtcclxuICAgICAgICAgICAgdmFyIGRvY0VsID0gZG9jLmRvY3VtZW50RWxlbWVudDtcclxuXHJcbiAgICAgICAgICAgIHZhciByZXF1ZXN0RnVsbFNjcmVlbiA9IGRvY0VsLnJlcXVlc3RGdWxsc2NyZWVuIHx8IGRvY0VsLm1velJlcXVlc3RGdWxsU2NyZWVuIHx8IGRvY0VsLndlYmtpdFJlcXVlc3RGdWxsU2NyZWVuIHx8IGRvY0VsLm1zUmVxdWVzdEZ1bGxzY3JlZW47XHJcbiAgICAgICAgICAgIHZhciBjYW5jZWxGdWxsU2NyZWVuID0gZG9jLmV4aXRGdWxsc2NyZWVuIHx8IGRvYy5tb3pDYW5jZWxGdWxsU2NyZWVuIHx8IGRvYy53ZWJraXRFeGl0RnVsbHNjcmVlbiB8fCBkb2MubXNFeGl0RnVsbHNjcmVlbjtcclxuXHJcbiAgICAgICAgICAgIGlmKCFkb2MuZnVsbHNjcmVlbkVsZW1lbnQgJiYgIWRvYy5tb3pGdWxsU2NyZWVuRWxlbWVudCAmJiAhZG9jLndlYmtpdEZ1bGxzY3JlZW5FbGVtZW50ICYmICFkb2MubXNGdWxsc2NyZWVuRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdEZ1bGxTY3JlZW4uY2FsbChkb2NFbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYW5jZWxGdWxsU2NyZWVuLmNhbGwoZG9jKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2NcclxuICogQGNsYXNzICAgICAgIEdhbWVDb25maWdWT1xyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3QubW9kZWwudm8uR2FtZUNvbmZpZ1ZPJ1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgbnVtUmVlbHM6IDUsXHJcbiAgICAgICAgbnVtUm93czogMyxcclxuICAgICAgICBudW1TeW1ib2xzOiA4LFxyXG4gICAgICAgIG51bUxpbmVzOiA1LFxyXG4gICAgICAgIHJlZWxzOlxyXG4gICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICBbMSw1LDIsMSw2LDUsOCw1LDEsMiwzLDcsNCw1LDgsMSw0LDMsMiw1LDZdLFxyXG4gICAgICAgICAgICAgICAgWzUsMSw2LDMsNyw4LDEsMywyLDQsNiw4LDUsNCw1LDMsOCw3LDUsNCwxLDcsNCw4LDRdLFxyXG4gICAgICAgICAgICAgICAgWzgsNCwxLDMsMiw2LDcsMiwzLDQsMSw1LDYsNyw4LDIsNSw0LDMsMSwyLDcsNiw3LDEsNCwzLDIsNF0sXHJcbiAgICAgICAgICAgICAgICBbMSw3LDQsMiwzLDgsNCwzLDIsNSw2LDcsMiwzLDQsNSw4LDEsMiw2LDIsNCwyLDYsMyw3LDgsNCw2LDIsMywxLDIsNSw2LDMsNF0sXHJcbiAgICAgICAgICAgICAgICBbOCw1LDFdXHJcbiAgICAgICAgICAgICAgICAvL1sxLDEsMSwxLDIsMiwyLDJdLFxyXG4gICAgICAgICAgICAgICAgLy9bMSwxLDEsMSwyLDIsMiwyXSxcclxuICAgICAgICAgICAgICAgIC8vWzEsMSwxLDEsMiwyLDIsMl0sXHJcbiAgICAgICAgICAgICAgICAvL1sxLDEsMSwxLDIsMiwyLDJdLFxyXG4gICAgICAgICAgICAgICAgLy9bMSwxLDEsMSwyLDIsMiwyXVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIHBheXRhYmxlOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCIxXCI6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiM1wiOiAyNTAsXHJcbiAgICAgICAgICAgICAgICBcIjRcIjogNTAwLFxyXG4gICAgICAgICAgICAgICAgXCI1XCI6IDEwMDBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCIyXCI6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiM1wiOiAyMDAsXHJcbiAgICAgICAgICAgICAgICBcIjRcIjogNDUwLFxyXG4gICAgICAgICAgICAgICAgXCI1XCI6IDgwMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIjNcIjpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCIzXCI6IDE1MCxcclxuICAgICAgICAgICAgICAgIFwiNFwiOiA0MDAsXHJcbiAgICAgICAgICAgICAgICBcIjVcIjogNzAwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiNFwiOlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcIjNcIjogMTAwLFxyXG4gICAgICAgICAgICAgICAgXCI0XCI6IDM1MCxcclxuICAgICAgICAgICAgICAgIFwiNVwiOiA2MDBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCI1XCI6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiM1wiOiA5MCxcclxuICAgICAgICAgICAgICAgIFwiNFwiOiAzMDAsXHJcbiAgICAgICAgICAgICAgICBcIjVcIjogNzAwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiNlwiOlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcIjNcIjogODAsXHJcbiAgICAgICAgICAgICAgICBcIjRcIjogMjUwLFxyXG4gICAgICAgICAgICAgICAgXCI1XCI6IDYwMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIjdcIjpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCIzXCI6IDcwLFxyXG4gICAgICAgICAgICAgICAgXCI0XCI6IDIwMCxcclxuICAgICAgICAgICAgICAgIFwiNVwiOiA1MDBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCI4XCI6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiM1wiOiA2MCxcclxuICAgICAgICAgICAgICAgIFwiNFwiOiAxMDAsXHJcbiAgICAgICAgICAgICAgICBcIjVcIjogNDAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlbm9taW5hdGlvbnM6XHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIDAuMjUsIDAuNTAsIDEsIDIsIDUsIDEwXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgZGVmYXVsdERlbm9taW5hdGlvbjogMixcclxuICAgICAgICBsaW5lczpcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgWzEsIDEsIDEsIDEsIDFdLFxyXG4gICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgWzIsIDIsIDIsIDIsIDJdLFxyXG4gICAgICAgICAgICAgICAgWzAsIDEsIDIsIDEsIDBdLFxyXG4gICAgICAgICAgICAgICAgWzIsIDEsIDAsIDEsIDJdXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgbWluT2FrOiAzLFxyXG5cclxuICAgICAgICAvLyBSZXR1cm5zIGFycmF5IHdpdGggYWxsIHBvc3NpYmxlIHN5bWJvbHNcclxuICAgICAgICBnZXRTeW1ib2xzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgc3ltYm9scyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAxOyBpIDw9IHRoaXMubnVtU3ltYm9sczsgaSsrKXtcclxuICAgICAgICAgICAgICAgIHN5bWJvbHMucHVzaChcInNcIiArIGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzeW1ib2xzO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBOQU1FOiBcIkdhbWVDb25maWdWT1wiXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBSZXN1bHRWT1xyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3QubW9kZWwudm8uUmVzdWx0Vk8nXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBtYXRyaXg6XHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIFsxLDQsNV0sXHJcbiAgICAgICAgICAgICAgICBbNSw2LDNdLFxyXG4gICAgICAgICAgICAgICAgWzEsMiw4XSxcclxuICAgICAgICAgICAgICAgIFszLDcsNl0sXHJcbiAgICAgICAgICAgICAgICBbMiw2LDVdXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgYmFsYW5jZTogMTAwMCxcclxuICAgICAgICB0b3RhbFdpbjogMCxcclxuICAgICAgICBudW1XaW5zOiAwLFxyXG4gICAgICAgIHdpbnM6IG51bGwsXHJcblxyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24ocmVzdWx0KXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcclxuICAgICAgICAgICAgdGhpcy5tYXRyaXggPSByZXN1bHQubWF0cml4O1xyXG4gICAgICAgICAgICB0aGlzLmJhbGFuY2UgPSByZXN1bHQuYmFsYW5jZTtcclxuICAgICAgICAgICAgdGhpcy50b3RhbFdpbiA9IHJlc3VsdC50b3RhbFdpbjtcclxuICAgICAgICAgICAgdGhpcy5udW1XaW5zID0gcmVzdWx0Lm51bVdpbnM7XHJcbiAgICAgICAgICAgIHRoaXMud2lucyA9IHJlc3VsdC53aW5zO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdldFN5bWJvbE1hdHJpeDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWF0cml4Lm1hcChmdW5jdGlvbihfLCBpbmRleCwgbWF0cml4KXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtYXRyaXhbaW5kZXhdLm1hcChmdW5jdGlvbihzeW1ib2xJRCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwic1wiICsgc3ltYm9sSUQ7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6IFwiUmVzdWx0Vk9cIlxyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgVUlDb25maWdWT1xyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3QubW9kZWwudm8uVUlDb25maWdWTydcclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIHN5bWJvbFdpZHRoOiAxMzAsXHJcbiAgICAgICAgc3ltYm9sSGVpZ2h0OiAxMzAsXHJcblxyXG4gICAgICAgIHJlZWxIU2VwYXJhdG9yOiAxMCxcclxuICAgICAgICByZWVsVlNlcGFyYXRvcjogMTAsXHJcbiAgICAgICAgcmVlbEhQYWRkaW5nOiAyMCxcclxuICAgICAgICByZWVsVlBhZGRpbmc6IDIwLFxyXG5cclxuICAgICAgICBjdXJyZW5jeTogXCIkXCIsXHJcblxyXG4gICAgICAgIHJlZWxTcGluRGVsYXk6IDAuMSxcclxuICAgICAgICBtaW5TcGluRHVyYXRpb246IDIsXHJcblxyXG4gICAgICAgIGxpbmVQb2ludHM6XHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIFtbMzAsMjI1XSxbNzAwLDIyNV1dLFxyXG4gICAgICAgICAgICAgICAgW1szMCw4NV0sWzcwMCw4NV1dLFxyXG4gICAgICAgICAgICAgICAgW1szMCwzNjVdLFs3MDAsMzY1XV0sXHJcbiAgICAgICAgICAgICAgICBbWzMwLDMwXSxbMzY1LDM2NV0sWzcwMCwzMF1dLFxyXG4gICAgICAgICAgICAgICAgW1szMCw0MjBdLFszNjUsODVdLFs3MDAsNDIwXV0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgd2luQW5ub3VuY2VEZWxheTogMS41LFxyXG4gICAgICAgIHJlcGVhdFdpbnM6IDIsXHJcbiAgICAgICAgcmVzcG9uc2l2ZVNjYWxlOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgd2luOlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB4OiAwLjM3NSxcclxuICAgICAgICAgICAgICAgIHk6IDAuMDEsXHJcbiAgICAgICAgICAgICAgICB3OiAwLjI1LFxyXG4gICAgICAgICAgICAgICAgaDogMC4xMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0eHRXaW46XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHg6IDAuNSxcclxuICAgICAgICAgICAgICAgIHk6IDAuNyxcclxuICAgICAgICAgICAgICAgIGZvbnQ6IDAuNFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBiZXQ6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHg6IDAuMDQ1LFxyXG4gICAgICAgICAgICAgICAgeTogMC44OSxcclxuICAgICAgICAgICAgICAgIHc6IDAuMjUsXHJcbiAgICAgICAgICAgICAgICBoOiAwLjEwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHR4dEJldDpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgeDogMC41LFxyXG4gICAgICAgICAgICAgICAgeTogMC43LFxyXG4gICAgICAgICAgICAgICAgZm9udDogMC40XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJhbGFuY2U6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHg6IDAuMzc1LFxyXG4gICAgICAgICAgICAgICAgeTogMC44OSxcclxuICAgICAgICAgICAgICAgIHc6IDAuMjUsXHJcbiAgICAgICAgICAgICAgICBoOiAwLjEwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHR4dEJhbGFuY2U6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHg6IDAuNSxcclxuICAgICAgICAgICAgICAgIHk6IDAuNyxcclxuICAgICAgICAgICAgICAgIGZvbnQ6IDAuNFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzcGluOlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB4OiAwLjcwNSxcclxuICAgICAgICAgICAgICAgIHk6IDAuODksXHJcbiAgICAgICAgICAgICAgICB3OiAwLjI1LFxyXG4gICAgICAgICAgICAgICAgaDogMC4xMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZWVsQXJlYTpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgeDogMC4wNDUsXHJcbiAgICAgICAgICAgICAgICB5OiAwLjEyNSxcclxuICAgICAgICAgICAgICAgIHc6IDAuOTEsXHJcbiAgICAgICAgICAgICAgICBoOiAwLjc1XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZWVsQXJlYUJHQ29sb3I6IDB4RkZGRkZGLFxyXG4gICAgICAgIHJlZWxCR0NvbG9yOiAweDJCNkYxQSxcclxuXHJcbiAgICAgICAgd2luTGluZVdpZHRoOiA1LFxyXG4gICAgICAgIHdpbkxpbmVDb2xvcjogMHhBODFDMURcclxuICAgIH0sXHJcblxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBOQU1FOiBcIlVJQ29uZmlnVk9cIlxyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgV2luZG93U2l6ZVZPXHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC5tb2RlbC52by5XaW5kb3dTaXplVk8nLFxyXG4gICAgICAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbih3LCBoKXtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGUodywgaCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgd2lkdGg6IG51bGwsXHJcbiAgICAgICAgaGVpZ2h0OiBudWxsLFxyXG4gICAgICAgIG9yaWVudGF0aW9uOiBudWxsLFxyXG5cclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uKHcsIGgpe1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdztcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBoO1xyXG4gICAgICAgICAgICB0aGlzLm9yaWVudGF0aW9uID0gc2xvdC5tb2RlbC5saWIuVXRpbHMuZ2V0T3JpZW50YXRpb24odywgaCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6IFwiV2luZG93U2l6ZVZPXCJcclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2NcclxuICogQGNsYXNzICAgICAgIENvbmZpZ1Byb3h5XHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC5tb2RlbC5wcm94eS5Db25maWdQcm94eScsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLlByb3h5XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvLyBEYXRhXHJcbiAgICAgICAgZ2FtZUNvbmZpZ1ZPOiBudWxsLFxyXG4gICAgICAgIHVpQ29uZmlnVk86IG51bGwsXHJcblxyXG4gICAgICAgIG9uUmVnaXN0ZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lQ29uZmlnVk8gPSBuZXcgc2xvdC5tb2RlbC52by5HYW1lQ29uZmlnVk8oKTtcclxuICAgICAgICAgICAgdGhpcy51aUNvbmZpZ1ZPID0gbmV3IHNsb3QubW9kZWwudm8uVUlDb25maWdWTygpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBOQU1FOiBcIkNvbmZpZ1Byb3h5XCJcclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2NcclxuICogQGNsYXNzICAgICAgIExvYWRlclByb3h5XHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC5tb2RlbC5wcm94eS5Mb2FkZXJQcm94eScsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLlByb3h5XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBvblJlZ2lzdGVyOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGxvYWRBc3NldHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgbG9hZGVyID0gbmV3IFBJWEkubG9hZGVycy5Mb2FkZXIoXCJcIiwzKTtcclxuICAgICAgICAgICAgbG9hZGVyLmFkZCgnYmcnLCAnYXNzZXRzL2JhY2tncm91bmQuanBnJyk7XHJcblxyXG4gICAgICAgICAgICBsb2FkZXIuYWRkKCdzMScsICdhc3NldHMvc25vd2ZsYWtlLnBuZycpO1xyXG4gICAgICAgICAgICBsb2FkZXIuYWRkKCdzMicsICdhc3NldHMvc3VuLnBuZycpO1xyXG4gICAgICAgICAgICBsb2FkZXIuYWRkKCdzMycsICdhc3NldHMvc2FuZGdsYXNzLnBuZycpO1xyXG4gICAgICAgICAgICBsb2FkZXIuYWRkKCdzNCcsICdhc3NldHMvdmljdG9yeS5wbmcnKTtcclxuICAgICAgICAgICAgbG9hZGVyLmFkZCgnczUnLCAnYXNzZXRzL2EucG5nJyk7XHJcbiAgICAgICAgICAgIGxvYWRlci5hZGQoJ3M2JywgJ2Fzc2V0cy9rLnBuZycpO1xyXG4gICAgICAgICAgICBsb2FkZXIuYWRkKCdzNycsICdhc3NldHMvcS5wbmcnKTtcclxuICAgICAgICAgICAgbG9hZGVyLmFkZCgnczgnLCAnYXNzZXRzL2oucG5nJyk7XHJcblxyXG4gICAgICAgICAgICBsb2FkZXIuYWRkKCdzcGluJywgJ2Fzc2V0cy9zcGluLnBuZycpO1xyXG4gICAgICAgICAgICBsb2FkZXIuYWRkKCdzcGluX2Rpc2FibGVkJywgJ2Fzc2V0cy9zcGluX2Rpc2FibGVkLnBuZycpO1xyXG5cclxuICAgICAgICAgICAgbG9hZGVyLmFkZCgnd2luJywgJ2Fzc2V0cy93aW4ucG5nJyk7XHJcbiAgICAgICAgICAgIGxvYWRlci5hZGQoJ2JhbGFuY2UnLCAnYXNzZXRzL2JhbGFuY2UucG5nJyk7XHJcblxyXG4gICAgICAgICAgICBsb2FkZXIuYWRkKCdiZXQnLCAnYXNzZXRzL2JldC5wbmcnKTtcclxuICAgICAgICAgICAgbG9hZGVyLmFkZCgnYmV0X21pbnVzJywgJ2Fzc2V0cy9iZXRfbWludXMucG5nJyk7XHJcbiAgICAgICAgICAgIGxvYWRlci5hZGQoJ2JldF9taW51c19kaXNhYmxlZCcsICdhc3NldHMvYmV0X21pbnVzX2Rpc2FibGVkLnBuZycpO1xyXG4gICAgICAgICAgICBsb2FkZXIuYWRkKCdiZXRfcGx1cycsICdhc3NldHMvYmV0X3BsdXMucG5nJyk7XHJcbiAgICAgICAgICAgIGxvYWRlci5hZGQoJ2JldF9wbHVzX2Rpc2FibGVkJywgJ2Fzc2V0cy9iZXRfcGx1c19kaXNhYmxlZC5wbmcnKTtcclxuXHJcbiAgICAgICAgICAgIGxvYWRlci5vbihcInByb2dyZXNzXCIsIHRoaXMub25Mb2FkUHJvZ3Jlc3MuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIGxvYWRlci5sb2FkKHRoaXMub25Mb2FkQ29tcGxldGUuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25Mb2FkQ29tcGxldGU6IGZ1bmN0aW9uKGxvYWRlciwgcmVzb3VyY2VzKXtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHJlc291cmNlcyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihzbG90LkFwcENvbnN0YW50cy5BU1NFVFNfTE9BREVELCByZXNvdXJjZXMpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uTG9hZFByb2dyZXNzOiBmdW5jdGlvbihsb2FkZXIsIGZpbGUpe1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBOQU1FOiBcIkxvYWRlclByb3h5XCJcclxuICAgIH1cclxuKTsiLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgU2VydmVyUHJveHlcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90Lm1vZGVsLnByb3h5LlNlcnZlclByb3h5JyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuUHJveHlcclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIC8vIERhdGFcclxuICAgICAgICByZXN1bHRWTzogbnVsbCxcclxuXHJcbiAgICAgICAgLy8gU2VydmljZXNcclxuICAgICAgICBzZXJ2ZXI6IG51bGwsXHJcblxyXG4gICAgICAgIG9uUmVnaXN0ZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXN1bHRWTyA9IG5ldyBzbG90Lm1vZGVsLnZvLlJlc3VsdFZPKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNlcnZlciA9IG5ldyBzbG90Lm1vZGVsLnByb3h5LnNlcnZpY2UuU2VydmVyU2VydmljZSgpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNwaW46IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlcnZlci5sb2FkU3BpblJlc3VsdCh0aGlzLm9uUmVzdWx0LmJpbmQodGhpcykpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uUmVzdWx0OiBmdW5jdGlvbihyZXN1bHQpe1xyXG4gICAgICAgICAgICB0aGlzLnJlc3VsdFZPLnVwZGF0ZShyZXN1bHQpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oc2xvdC5BcHBDb25zdGFudHMuU1BJTl9SRVNVTFQsIHRoaXMucmVzdWx0Vk8pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogXCJTZXJ2ZXJQcm94eVwiXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBXaW5kb3dTaXplUHJveHlcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90Lm1vZGVsLnByb3h5LldpbmRvd1NpemVQcm94eScsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLlByb3h5XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvLyBEYXRhXHJcbiAgICAgICAgd2luZG93U2l6ZVZPOiBudWxsLFxyXG5cclxuICAgICAgICBvblJlZ2lzdGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2luZG93U2l6ZVZPID0gbmV3IHNsb3QubW9kZWwudm8uV2luZG93U2l6ZVZPKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9yaWVudGF0aW9uOiBcIiArIHRoaXMud2luZG93U2l6ZVZPLm9yaWVudGF0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpLCB0cnVlKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZih3aW5kb3cuYXR0YWNoRXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYXR0YWNoRXZlbnQoJ29ucmVzaXplJywgdGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uUmVzaXplOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLndpbmRvd1NpemVWTy51cGRhdGUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihzbG90LkFwcENvbnN0YW50cy5XSU5ET1dfUkVTSVpFRCwgdGhpcy53aW5kb3dTaXplVk8pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBOQU1FOiBcIldpbmRvd1NpemVQcm94eVwiXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBTZXJ2ZXJTZXJ2aWNlXHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC5tb2RlbC5wcm94eS5zZXJ2aWNlLlNlcnZlclNlcnZpY2UnLFxyXG4gICAgICAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVDb25maWdWTyA9IG5ldyBzbG90Lm1vZGVsLnZvLkdhbWVDb25maWdWTygpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIGNhbGxiYWNrOiBudWxsLFxyXG4gICAgICAgIGdhbWVDb25maWdWTzogbnVsbCxcclxuICAgICAgICBiZXRBbW91bnQ6IG51bGwsXHJcblxyXG4gICAgICAgIGxvYWRTcGluUmVzdWx0OiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5iZXRBbW91bnQgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQodGhpcy5zZW5kU3BpblJlc3VsdC5iaW5kKHRoaXMpLCAxMDAwKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZW5kU3BpblJlc3VsdDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayh0aGlzLmNhbGN1bGF0ZVNwaW5SZXN1bHQoKSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY2FsY3VsYXRlU3BpblJlc3VsdDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xyXG4gICAgICAgICAgICB2YXIgcmVlbHMgPSB0aGlzLmdhbWVDb25maWdWTy5yZWVscztcclxuICAgICAgICAgICAgdmFyIHJlZWxNYXRyaXggPSBbXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaT0wOyBpPHRoaXMuZ2FtZUNvbmZpZ1ZPLm51bVJlZWxzOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciByZWVsU3RvcFBvcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHJlZWxzW2ldLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICByZWVsTWF0cml4W2ldID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGogPSAwOyBqIDwgdGhpcy5nYW1lQ29uZmlnVk8ubnVtUm93czsgaisrKXtcclxuICAgICAgICAgICAgICAgICAgICByZWVsTWF0cml4W2ldW2pdID0gdGhpcy5nZXRTeW1ib2xBdChyZWVsc1tpXSwgcmVlbFN0b3BQb3MgKyBqKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgbGluZVN5bWJvbHMgPSB0aGlzLmdldExpbmVTdHJpbmdzKHJlZWxNYXRyaXgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHdpbnMgPSB0aGlzLmdldFdpbnMobGluZVN5bWJvbHMpO1xyXG5cclxuICAgICAgICAgICAgcmVzdWx0Lm1hdHJpeCA9IHJlZWxNYXRyaXg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5iYWxhbmNlID0gMTAwMDtcclxuICAgICAgICAgICAgcmVzdWx0Lm51bVdpbnMgPSB3aW5zLmxlbmd0aDtcclxuICAgICAgICAgICAgcmVzdWx0LnRvdGFsV2luID0gd2lucy5yZWR1Y2UoZnVuY3Rpb24ocHYsIGN2KXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwdiArIGN2LndpbkFtb3VudDtcclxuICAgICAgICAgICAgfSwgMCk7XHJcbiAgICAgICAgICAgIHJlc3VsdC53aW5zID0gd2lucztcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0U3ltYm9sQXQ6IGZ1bmN0aW9uKHJlZWwsIHBvcyl7XHJcbiAgICAgICAgICAgIGlmKHBvcyA+IHJlZWwubGVuZ3RoIC0gMSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVlbFtwb3MgLSByZWVsLmxlbmd0aF07XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlZWxbcG9zXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdldExpbmVTdHJpbmdzOiBmdW5jdGlvbihtYXRyaXgpe1xyXG4gICAgICAgICAgICB2YXIgbGluZXMgPSB0aGlzLmdhbWVDb25maWdWTy5saW5lcztcclxuICAgICAgICAgICAgdmFyIGxpbmVTeW1ib2xzID0gW107XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmdhbWVDb25maWdWTy5udW1MaW5lczsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxpbmVTeW1ib2xzW2ldID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGogPSAwOyBqIDwgdGhpcy5nYW1lQ29uZmlnVk8ubnVtUmVlbHM7IGorKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZVN5bWJvbHNbaV1bal0gPSBtYXRyaXhbal1bbGluZXNbaV1bal1dO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBsaW5lU3ltYm9scztcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXRXaW5zOiBmdW5jdGlvbihsaW5lU3ltYm9scyl7XHJcbiAgICAgICAgICAgIHZhciB3aW5zID0gW107XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmdhbWVDb25maWdWTy5udW1MaW5lczsgaSsrKXtcclxuICAgICAgICAgICAgICAgIHZhciBvYWsgPSAxO1xyXG4gICAgICAgICAgICAgICAgZm9yKHZhciBqID0gMTsgaiA8IHRoaXMuZ2FtZUNvbmZpZ1ZPLm51bVJlZWxzOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGxpbmVTeW1ib2xzW2ldW2pdID09IGxpbmVTeW1ib2xzW2ldW2otMV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYWsrKztcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYob2FrID49IHRoaXMuZ2FtZUNvbmZpZ1ZPLm1pbk9haykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB3aW5uaW5nU3ltYm9sID0gbGluZVN5bWJvbHNbaV1bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgd2lucy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lTnVtYmVyOiBpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2FrOiBvYWssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzeW1ib2w6IHdpbm5pbmdTeW1ib2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5BbW91bnQ6IHRoaXMuZ2FtZUNvbmZpZ1ZPLnBheXRhYmxlW3dpbm5pbmdTeW1ib2xdW29ha10gKiB0aGlzLmJldEFtb3VudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gd2lucztcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6IFwiU2VydmVyU2VydmljZVwiXHJcbiAgICB9XHJcbik7IiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2NcclxuICogQGNsYXNzICAgICAgIFByZXBDb250cm9sbGVyQ29tbWFuZFxyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3QuY29udHJvbGxlci5jb21tYW5kLlByZXBDb250cm9sbGVyQ29tbWFuZCcsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLlNpbXBsZUNvbW1hbmRcclxuICAgIH0sXHJcbiAgXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLy8gUmVnaXN0ZXIgYWxsIGNvbW1hbmRzXHJcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKG5vdGUpIHsgICBcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJDb21tYW5kKHNsb3QuQXBwQ29uc3RhbnRzLldJTkRPV19SRVNJWkVELCBzbG90LmNvbnRyb2xsZXIuY29tbWFuZC5XaW5kb3dSZXNpemVDb21tYW5kKTtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJDb21tYW5kKHNsb3QuQXBwQ29uc3RhbnRzLlNQSU4sIHNsb3QuY29udHJvbGxlci5jb21tYW5kLlNwaW5Db21tYW5kKTtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJDb21tYW5kKHNsb3QuQXBwQ29uc3RhbnRzLlNQSU5fRU5ELCBzbG90LmNvbnRyb2xsZXIuY29tbWFuZC5TcGluRW5kQ29tbWFuZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSAgICBcclxuKTsiLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgUHJlcE1vZGVsQ29tbWFuZFxyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3QuY29udHJvbGxlci5jb21tYW5kLlByZXBNb2RlbENvbW1hbmQnLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5TaW1wbGVDb21tYW5kXHJcbiAgICB9LFxyXG4gIFxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIC8vIFJlZ2lzdGVyIGFsbCBQcm94eXNcclxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAobm90ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3RlclByb3h5KG5ldyBzbG90Lm1vZGVsLnByb3h5LkxvYWRlclByb3h5KCkpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3RlclByb3h5KG5ldyBzbG90Lm1vZGVsLnByb3h5LldpbmRvd1NpemVQcm94eSgpKTtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJQcm94eShuZXcgc2xvdC5tb2RlbC5wcm94eS5Db25maWdQcm94eSgpKTtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJQcm94eShuZXcgc2xvdC5tb2RlbC5wcm94eS5TZXJ2ZXJQcm94eSgpKTtcclxuICAgICAgICB9XHJcbiAgICB9ICAgIFxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgUHJlcFBpeGlDb21tYW5kXHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC5jb250cm9sbGVyLmNvbW1hbmQuUHJlcFBpeGlDb21tYW5kJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuU2ltcGxlQ29tbWFuZFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKG5vdGUpIHtcclxuICAgICAgICAgICAgUFhSb290ID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XHJcblxyXG4gICAgICAgICAgICBQWFJlbmRlcmVyID0gbmV3IFBJWEkuYXV0b0RldGVjdFJlbmRlcmVyKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xyXG4gICAgICAgICAgICBQWFJlbmRlcmVyLnZpZXcuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuXHJcbiAgICAgICAgICAgIFBYUm9vdC5pbnRlcmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIFBYUm9vdC5vbihcInRhcFwiLHRoaXMuc2V0RnVsbFNjcmVlbik7XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWVcIikuYXBwZW5kQ2hpbGQoUFhSZW5kZXJlci52aWV3KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlbmRlciBsb29wXHJcbiAgICAgICAgICAgIHdpbmRvdy5yZW5kZXJMb29wID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIFBYUmVuZGVyZXIucmVuZGVyKFBYUm9vdCk7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUod2luZG93LnJlbmRlckxvb3ApO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB3aW5kb3cucmVuZGVyTG9vcCgpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNldEZ1bGxTY3JlZW46IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmIChzY3JlZW5mdWxsLmVuYWJsZWQgJiYgIXNjcmVlbmZ1bGwuaXNGdWxsc2NyZWVuKSB7XHJcbiAgICAgICAgICAgICAgICBzY3JlZW5mdWxsLnJlcXVlc3QoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBQcmVwVmlld0NvbW1hbmRcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lIChcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC5jb250cm9sbGVyLmNvbW1hbmQuUHJlcFZpZXdDb21tYW5kJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuU2ltcGxlQ29tbWFuZFxyXG4gICAgfSxcclxuIFxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uIChub3RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjYWRlLnJlZ2lzdGVyTWVkaWF0b3IobmV3IHNsb3Qudmlldy5tZWRpYXRvci5CR01lZGlhdG9yKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3Rlck1lZGlhdG9yKG5ldyBzbG90LnZpZXcubWVkaWF0b3IuUmVlbENvbnRhaW5lck1lZGlhdG9yKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3Rlck1lZGlhdG9yKG5ldyBzbG90LnZpZXcubWVkaWF0b3IuUGFuZWxNZWRpYXRvcigpKTtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJNZWRpYXRvcihuZXcgc2xvdC52aWV3Lm1lZGlhdG9yLldpbkFubm91bmNlTWVkaWF0b3IoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgU3BpbkNvbW1hbmRcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LmNvbnRyb2xsZXIuY29tbWFuZC5TcGluQ29tbWFuZCcsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLlNpbXBsZUNvbW1hbmRcclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uIChub3RlKSB7XHJcbiAgICAgICAgICAgIHZhciBzZXJ2ZXIgPSB0aGlzLmZhY2FkZS5yZXRyaWV2ZVByb3h5KHNsb3QubW9kZWwucHJveHkuU2VydmVyUHJveHkuTkFNRSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihzbG90LkFwcENvbnN0YW50cy5TVE9QX1dJTl9BTk5PVU5DRU1FTlRTKTtcclxuXHJcbiAgICAgICAgICAgIHNlcnZlci5zcGluKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgU3BpbkVuZENvbW1hbmRcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LmNvbnRyb2xsZXIuY29tbWFuZC5TcGluRW5kQ29tbWFuZCcsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLlNpbXBsZUNvbW1hbmRcclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uIChub3RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihzbG90LkFwcENvbnN0YW50cy5TVEFSVF9XSU5fQU5OT1VOQ0VNRU5UUyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgU3RhcnR1cENvbW1hbmRcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LmNvbnRyb2xsZXIuY29tbWFuZC5TdGFydHVwQ29tbWFuZCcsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLk1hY3JvQ29tbWFuZFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTIFxyXG4gICAge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFN1YmNvbW1hbmRzIHRvIGhhbmRsZSBmYWNhZGUgcmVnaXN0cmF0aW9ucyBmb3JcclxuICAgICAgICAgKiBNb2RlbCwgVmlldyBhbmQgQ29udHJvbGxlclxyXG4gICAgICAgICAqIEFsc28gcnVucyBzdWIgY29tbWFuZCB0byBpbml0aWFsaXplIFBJWEkgZnJhbWV3b3JrXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaW5pdGlhbGl6ZU1hY3JvQ29tbWFuZDogZnVuY3Rpb24gKG5vdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRTdWJDb21tYW5kKHNsb3QuY29udHJvbGxlci5jb21tYW5kLlByZXBQaXhpQ29tbWFuZCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZFN1YkNvbW1hbmQoc2xvdC5jb250cm9sbGVyLmNvbW1hbmQuUHJlcENvbnRyb2xsZXJDb21tYW5kKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRTdWJDb21tYW5kKHNsb3QuY29udHJvbGxlci5jb21tYW5kLlByZXBNb2RlbENvbW1hbmQpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZFN1YkNvbW1hbmQoc2xvdC5jb250cm9sbGVyLmNvbW1hbmQuUHJlcFZpZXdDb21tYW5kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgV2luZG93UmVzaXplQ29tbWFuZFxyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3QuY29udHJvbGxlci5jb21tYW5kLldpbmRvd1Jlc2l6ZUNvbW1hbmQnLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5TaW1wbGVDb21tYW5kXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAobm90ZSkge1xyXG4gICAgICAgICAgICB2YXIgd2luZG93U2l6ZVZPID0gbm90ZS5nZXRCb2R5KCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHdpbmRvd1NpemVWTyk7XHJcbiAgICAgICAgICAgIFBYUmVuZGVyZXIucmVzaXplKHdpbmRvd1NpemVWTy53aWR0aCwgd2luZG93U2l6ZVZPLmhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgQkdcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LnZpZXcuY29tcG9uZW50LkJHJyxcclxuICAgICAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLy8gU3RhZ2UgTWVtYmVyc1xyXG4gICAgICAgIHN0YWdlOiBudWxsLFxyXG4gICAgICAgIGJnOiBudWxsLFxyXG5cclxuICAgICAgICAvLyBSZWZlcmVuY2VzXHJcbiAgICAgICAgT1JJRU5UQVRJT046IHNsb3QubW9kZWwuZW51bS5PUklFTlRBVElPTixcclxuXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGRyZW4oZGF0YS5yZXNvdXJjZXMpO1xyXG4gICAgICAgICAgICB0aGlzLnNldHVwVmlldyhkYXRhLndpbmRvd1NpemVWTyk7XHJcblxyXG4gICAgICAgICAgICBQWFJvb3QuYWRkQ2hpbGQodGhpcy5zdGFnZSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYWRkQ2hpbGRyZW46IGZ1bmN0aW9uKHJlc291cmNlcyl7XHJcbiAgICAgICAgICAgIHRoaXMuYmcgPSBuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLmJnLnRleHR1cmUpO1xyXG4gICAgICAgICAgICB0aGlzLmJnLmFuY2hvci5zZXQoMC41LDAuNSk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5iZyk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2V0dXBWaWV3OiBmdW5jdGlvbih3aW5kb3dTaXplVk8pe1xyXG4gICAgICAgICAgICAvLyBGaWxsIHNjcmVlblxyXG4gICAgICAgICAgICB2YXIgc2l6ZSA9IHNsb3QubW9kZWwubGliLlV0aWxzLmdldFNpemVUb0ZpbGxTY3JlZW4oXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6dGhpcy5iZy53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHRoaXMuYmcuaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOndpbmRvd1NpemVWTy53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHdpbmRvd1NpemVWTy5oZWlnaHRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYmcud2lkdGggPSBzaXplLndpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLmJnLmhlaWdodCA9IHNpemUuaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5iZy54ID0gd2luZG93U2l6ZVZPLndpZHRoLzI7XHJcbiAgICAgICAgICAgIHRoaXMuYmcueSA9IHdpbmRvd1NpemVWTy5oZWlnaHQvMjtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoYW5kbGVSZXNpemU6IGZ1bmN0aW9uKHdpbmRvd1NpemVWTyl7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dXBWaWV3KHdpbmRvd1NpemVWTyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdCRydcclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2NcclxuICogQGNsYXNzICAgICAgIFBhbmVsXHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC52aWV3LmNvbXBvbmVudC5QYW5lbCcsXHJcbiAgICAgICAgY29uc3RydWN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZSA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIC8vIFN0YWdlIE1lbWJlcnNcclxuICAgICAgICBzdGFnZTogbnVsbCxcclxuXHJcbiAgICAgICAgc3BpbjogbnVsbCxcclxuICAgICAgICBidG5TcGluOiBudWxsLFxyXG5cclxuICAgICAgICB3aW46IG51bGwsXHJcbiAgICAgICAgdHh0V2luOiBudWxsLFxyXG5cclxuICAgICAgICBiYWxhbmNlOiBudWxsLFxyXG4gICAgICAgIHR4dEJhbGFuY2U6IG51bGwsXHJcblxyXG4gICAgICAgIGJldDogbnVsbCxcclxuICAgICAgICBidG5CZXRQbHVzOiBudWxsLFxyXG4gICAgICAgIGJ0bkJldE1pbnVzOiBudWxsLFxyXG4gICAgICAgIHR4dEJldDogbnVsbCxcclxuXHJcbiAgICAgICAgY3VycmVuY3k6IG51bGwsXHJcbiAgICAgICAgZGVub21pbmF0aW9uczogbnVsbCxcclxuICAgICAgICBjdXJyZW50RGVub21pbmF0aW9uOiBudWxsLFxyXG5cclxuICAgICAgICByZXNwU2NhbGU6IG51bGwsXHJcblxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVuY3kgPSBkYXRhLnVpQ29uZmlnVk8uY3VycmVuY3k7XHJcbiAgICAgICAgICAgIHRoaXMucmVzcFNjYWxlID0gZGF0YS51aUNvbmZpZ1ZPLnJlc3BvbnNpdmVTY2FsZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGVub21pbmF0aW9ucyA9IGRhdGEuZ2FtZUNvbmZpZ1ZPLmRlbm9taW5hdGlvbnM7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudERlbm9taW5hdGlvbiA9IGRhdGEuZ2FtZUNvbmZpZ1ZPLmRlZmF1bHREZW5vbWluYXRpb247XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkcmVuKGRhdGEucmVzb3VyY2VzKTtcclxuICAgICAgICAgICAgdGhpcy5zZXR1cFZpZXcoZGF0YS53aW5kb3dTaXplVk8pO1xyXG5cclxuICAgICAgICAgICAgUFhSb290LmFkZENoaWxkKHRoaXMuc3RhZ2UpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFkZENoaWxkcmVuOiBmdW5jdGlvbihyZXNvdXJjZXMpe1xyXG4gICAgICAgICAgICAvLyBTcGluIGNvbXBvbmVudFxyXG4gICAgICAgICAgICB0aGlzLnNwaW4gPSBuZXcgUElYSS5Db250YWluZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5zcGluLmFkZENoaWxkKG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMuc3Bpbl9kaXNhYmxlZC50ZXh0dXJlKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc3Bpbi5hZGRDaGlsZCh0aGlzLmJ0blNwaW4gPSBuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLnNwaW4udGV4dHVyZSkpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuc3Bpbik7XHJcblxyXG4gICAgICAgICAgICAvLyBXaW4gY29tcG9uZW50ID09PlxyXG4gICAgICAgICAgICB0aGlzLndpbiA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xyXG4gICAgICAgICAgICB0aGlzLndpbi5hZGRDaGlsZChuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLndpbi50ZXh0dXJlKSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnR4dFdpbiA9IG5ldyBQSVhJLlRleHQoKTtcclxuICAgICAgICAgICAgdGhpcy50eHRXaW4uc3R5bGUgPSB7Zm9udFNpemU6IDMwLCBhbGlnbjogJ2NlbnRlcid9O1xyXG4gICAgICAgICAgICB0aGlzLnR4dFdpbi5hbmNob3Iuc2V0KDAuNSwgMC41KTtcclxuICAgICAgICAgICAgdGhpcy50eHRXaW4ueCA9IDEwMDtcclxuICAgICAgICAgICAgdGhpcy50eHRXaW4ueSA9IDUyO1xyXG5cclxuICAgICAgICAgICAgdGhpcy53aW4uYWRkQ2hpbGQodGhpcy50eHRXaW4pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLndpbik7XHJcbiAgICAgICAgICAgIC8vIFdpbiBjb21wb25lbnQgPD09XHJcblxyXG4gICAgICAgICAgICAvLyBCYWxhbmNlIGNvbXBvbmVudCA9PT5cclxuICAgICAgICAgICAgdGhpcy5iYWxhbmNlID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYmFsYW5jZS5hZGRDaGlsZChuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLmJhbGFuY2UudGV4dHVyZSkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50eHRCYWxhbmNlID0gbmV3IFBJWEkuVGV4dCgpO1xyXG4gICAgICAgICAgICB0aGlzLnR4dEJhbGFuY2Uuc3R5bGUgPSB7Zm9udFNpemU6IDMwLCBhbGlnbjogJ2NlbnRlcid9O1xyXG4gICAgICAgICAgICB0aGlzLnR4dEJhbGFuY2UuYW5jaG9yLnNldCgwLjUsIDAuNSk7XHJcbiAgICAgICAgICAgIHRoaXMudHh0QmFsYW5jZS54ID0gMTAwO1xyXG4gICAgICAgICAgICB0aGlzLnR4dEJhbGFuY2UueSA9IDUyO1xyXG4gICAgICAgICAgICB0aGlzLmJhbGFuY2UuYWRkQ2hpbGQodGhpcy50eHRCYWxhbmNlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5iYWxhbmNlKTtcclxuICAgICAgICAgICAgLy8gPD09IEJhbGFuY2UgY29tcG9uZW50XHJcblxyXG4gICAgICAgICAgICAvLyBCZXQgY29tcG9uZW50ID09PT5cclxuICAgICAgICAgICAgdGhpcy5iZXQgPSBuZXcgUElYSS5Db250YWluZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5iZXQuYWRkQ2hpbGQobmV3IFBJWEkuU3ByaXRlKHJlc291cmNlcy5iZXRfbWludXNfZGlzYWJsZWQudGV4dHVyZSkpO1xyXG4gICAgICAgICAgICB0aGlzLmJldC5hZGRDaGlsZCh0aGlzLmJ0bkJldE1pbnVzID0gbmV3IFBJWEkuU3ByaXRlKHJlc291cmNlcy5iZXRfbWludXMudGV4dHVyZSkpO1xyXG4gICAgICAgICAgICB2YXIgYmV0U3ByaXRlID0gbmV3IFBJWEkuU3ByaXRlKHJlc291cmNlcy5iZXQudGV4dHVyZSk7XHJcbiAgICAgICAgICAgIGJldFNwcml0ZS54ICs9IHRoaXMuYnRuQmV0TWludXMud2lkdGggKyAyO1xyXG4gICAgICAgICAgICB0aGlzLmJldC5hZGRDaGlsZChiZXRTcHJpdGUpO1xyXG4gICAgICAgICAgICB2YXIgYmV0UGx1c0RTcHJpdGUgPSBuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLmJldF9wbHVzX2Rpc2FibGVkLnRleHR1cmUpO1xyXG4gICAgICAgICAgICBiZXRQbHVzRFNwcml0ZS54ID0gYmV0U3ByaXRlLnggKyBiZXRTcHJpdGUud2lkdGggKyAyO1xyXG4gICAgICAgICAgICB0aGlzLmJldC5hZGRDaGlsZChiZXRQbHVzRFNwcml0ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYmV0LmFkZENoaWxkKHRoaXMuYnRuQmV0UGx1cyA9IG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMuYmV0X3BsdXMudGV4dHVyZSkpO1xyXG4gICAgICAgICAgICB0aGlzLmJ0bkJldFBsdXMueCA9IGJldFBsdXNEU3ByaXRlLng7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnR4dEJldCA9IG5ldyBQSVhJLlRleHQoKTtcclxuICAgICAgICAgICAgdGhpcy50eHRCZXQuc3R5bGUgPSB7Zm9udFNpemU6IDMwLCBhbGlnbjogJ2NlbnRlcid9O1xyXG4gICAgICAgICAgICB0aGlzLnR4dEJldC5hbmNob3Iuc2V0KDAuNSwgMC41KTtcclxuICAgICAgICAgICAgdGhpcy50eHRCZXQueCA9IGJldFNwcml0ZS54ICsgNjg7XHJcbiAgICAgICAgICAgIHRoaXMudHh0QmV0LnkgPSBiZXRTcHJpdGUueSArIDUyO1xyXG4gICAgICAgICAgICB0aGlzLmJldC5hZGRDaGlsZCh0aGlzLnR4dEJldCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuYmV0KTtcclxuICAgICAgICAgICAgLy8gPD09PSBCZXQgY29tcG9uZW50XHJcblxyXG4gICAgICAgICAgICAvLyBCdXR0b25zXHJcbiAgICAgICAgICAgIHRoaXMuYnRuU3Bpbi5pbnRlcmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuU3Bpbi5vbihzbG90LnZpZXcuZXZlbnQuVmlld0V2ZW50cy5DTElDSywgdGhpcy5vblNwaW5DbGljay5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgdGhpcy5idG5CZXRNaW51cy5pbnRlcmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuQmV0TWludXMub24oc2xvdC52aWV3LmV2ZW50LlZpZXdFdmVudHMuQ0xJQ0ssIHRoaXMub25CZXRNaW51c0NsaWNrLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICB0aGlzLmJ0bkJldFBsdXMuaW50ZXJhY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmJ0bkJldFBsdXMub24oc2xvdC52aWV3LmV2ZW50LlZpZXdFdmVudHMuQ0xJQ0ssIHRoaXMub25CZXRQbHVzQ2xpY2suYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBJbml0aWFsIHZhbHVlc1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUJldCgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5yZXNUeHQgPSBuZXcgUElYSS5UZXh0KCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVzVHh0LnN0eWxlID0ge2ZvbnRTaXplOiAxNSwgYWxpZ246ICdsZWZ0Jywgd29yZHdyYXA6IHRydWUsc3Ryb2tlOjB4RkZGRkZGLHN0cm9rZVRoaWNrbmVzczoyfTtcclxuICAgICAgICAgICAgUFhSb290LmFkZENoaWxkKHRoaXMucmVzVHh0KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZXR1cFZpZXc6IGZ1bmN0aW9uKHdpbmRvd1NpemVWTyl7XHJcbiAgICAgICAgICAgIC8vIFNjYWxpbmcgYW5kIHBvc2l0aW9uaW5nIGFzIHBlciByZXNwb25zaXZlIHNjYWxlXHJcbiAgICAgICAgICAgIHZhciBjb21wb25lbnRzID0gW1wic3BpblwiLFwid2luXCIsXCJiYWxhbmNlXCIsXCJiZXRcIl07XHJcbiAgICAgICAgICAgIHZhciBsZW4gPSBjb21wb25lbnRzLmxlbmd0aDtcclxuICAgICAgICAgICAgdmFyIGZpdENvbnRlbnRPblNjcmVlbiA9IG5ldyBzbG90Lm1vZGVsLmxpYi5VdGlscygpLmZpdENvbnRlbnRPblNjcmVlbjtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29tcCA9IGNvbXBvbmVudHNbaV07XHJcbiAgICAgICAgICAgICAgICB2YXIgc2NhbGUgPSB0aGlzLnJlc3BTY2FsZVtjb21wXTtcclxuICAgICAgICAgICAgICAgIGZpdENvbnRlbnRPblNjcmVlbihcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXNbY29tcF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcmVlbjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogd2luZG93U2l6ZVZPLndpZHRoICogc2NhbGUueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IHdpbmRvd1NpemVWTy5oZWlnaHQgKiBzY2FsZS55LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHdpbmRvd1NpemVWTy53aWR0aCAqIHNjYWxlLncsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHdpbmRvd1NpemVWTy5oZWlnaHQgKiBzY2FsZS5oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucmVzVHh0LnRleHQgPSB3aW5kb3dTaXplVk8ud2lkdGggKyBcInhcIiArIHdpbmRvd1NpemVWTy5oZWlnaHQgK1wiXFxuXCI7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlQmFsYW5jZTogZnVuY3Rpb24oYmFsYW5jZSl7XHJcbiAgICAgICAgICAgIHRoaXMudHh0QmFsYW5jZS50ZXh0ID0gdGhpcy5jdXJyZW5jeSArIGJhbGFuY2UudG9GaXhlZCgyKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB1cGRhdGVXaW46IGZ1bmN0aW9uKHdpbil7XHJcbiAgICAgICAgICAgIHRoaXMudHh0V2luLnRleHQgPSB0aGlzLmN1cnJlbmN5ICsgd2luLnRvRml4ZWQoMik7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlQmV0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLnR4dEJldC50ZXh0ID0gdGhpcy5jdXJyZW5jeSArIHRoaXMuZGVub21pbmF0aW9uc1t0aGlzLmN1cnJlbnREZW5vbWluYXRpb25dLnRvRml4ZWQoMik7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaW5jcmVhc2VCZXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY3VycmVudERlbm9taW5hdGlvbiA8IHRoaXMuZGVub21pbmF0aW9ucy5sZW5ndGggLSAxKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudERlbm9taW5hdGlvbisrO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVCZXQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdGVCZXRCdXR0b25zKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkZWNyZWFzZUJldDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYodGhpcy5jdXJyZW50RGVub21pbmF0aW9uID4gMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnREZW5vbWluYXRpb24tLTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQmV0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlQmV0QnV0dG9ucygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdmFsaWRhdGVCZXRCdXR0b25zOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmN1cnJlbnREZW5vbWluYXRpb24gPT09IHRoaXMuZGVub21pbmF0aW9ucy5sZW5ndGggLSAxKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZUJldFBsdXMoKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZUJldFBsdXMoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5jdXJyZW50RGVub21pbmF0aW9uID09PSAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZUJldE1pbnVzKCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmFibGVCZXRNaW51cygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGlzYWJsZVNwaW46IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuU3Bpbi52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZW5hYmxlU3BpbjogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy5idG5TcGluLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRpc2FibGVCZXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZUJldFBsdXMoKTtcclxuICAgICAgICAgICAgdGhpcy5kaXNhYmxlQmV0TWludXMoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVuYWJsZUJldDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy52YWxpZGF0ZUJldEJ1dHRvbnMoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkaXNhYmxlQmV0UGx1czogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy5idG5CZXRQbHVzLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBlbmFibGVCZXRQbHVzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLmJ0bkJldFBsdXMudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGlzYWJsZUJldE1pbnVzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLmJ0bkJldE1pbnVzLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBlbmFibGVCZXRNaW51czogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy5idG5CZXRNaW51cy52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBFdmVudCBIYW5kbGVyc1xyXG4gICAgICAgIG9uU3BpbkNsaWNrOiBmdW5jdGlvbihldnQpe1xyXG4gICAgICAgICAgICB0aGlzLmRpc2FibGVTcGluKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZUJldCgpO1xyXG4gICAgICAgICAgICB0aGlzLnR4dFdpbi50ZXh0ID0gXCJcIjtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZS5lbWl0KHNsb3Qudmlldy5ldmVudC5WaWV3RXZlbnRzLlNQSU5fQ0xJQ0spO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uQmV0TWludXNDbGljazogZnVuY3Rpb24oZXZ0KXtcclxuICAgICAgICAgICAgdGhpcy5kZWNyZWFzZUJldCgpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uQmV0UGx1c0NsaWNrOiBmdW5jdGlvbihldnQpe1xyXG4gICAgICAgICAgICB0aGlzLmluY3JlYXNlQmV0KCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGFuZGxlUmVzaXplOiBmdW5jdGlvbiAod2luZG93U2l6ZVZPKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dXBWaWV3KHdpbmRvd1NpemVWTyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdQYW5lbCdcclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2NcclxuICogQGNsYXNzICAgICAgIFJlZWxcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LnZpZXcuY29tcG9uZW50LlJlZWwnLFxyXG4gICAgICAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UgPSBuZXcgUElYSS5Db250YWluZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvLyBTdGFnZSBNZW1iZXJzXHJcbiAgICAgICAgc3RhZ2U6IG51bGwsXHJcblxyXG4gICAgICAgIHJlZWxJbmRleDogbnVsbCxcclxuXHJcbiAgICAgICAgbnVtUm93czogbnVsbCxcclxuICAgICAgICB3aWR0aDogbnVsbCxcclxuICAgICAgICBoZWlnaHQ6IG51bGwsXHJcblxyXG4gICAgICAgIGNlbGxzOiBudWxsLFxyXG4gICAgICAgIHNwaW5Ucmlja0NlbGxzOiBudWxsLFxyXG4gICAgICAgIGNlbGxQb3NPcmlnaW5hbDogbnVsbCxcclxuICAgICAgICByZWVsQ2VsbEhlaWdodDogbnVsbCxcclxuICAgICAgICByZWVsSGVpZ2h0OiBudWxsLFxyXG5cclxuICAgICAgICByZXN1bHRSZWVsOiBudWxsLFxyXG4gICAgICAgIGlzUmVzdWx0UmVjZWl2ZWQ6IG51bGwsXHJcblxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIChpbmRleCwgZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZWxJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICB0aGlzLm51bVJvd3MgPSBkYXRhLmdhbWVDb25maWdWTy5udW1Sb3dzO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRpbmcgc2l6ZSBvZiBzaW5nbGUgcmVlbCBhcmVhXHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSBkYXRhLnVpQ29uZmlnVk8uc3ltYm9sV2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID1cclxuICAgICAgICAgICAgICAgICh0aGlzLm51bVJvd3MgKiBkYXRhLnVpQ29uZmlnVk8uc3ltYm9sSGVpZ2h0KSArXHJcbiAgICAgICAgICAgICAgICAoKHRoaXMubnVtUm93cyAtIDEpICogZGF0YS51aUNvbmZpZ1ZPLnJlZWxWU2VwYXJhdG9yKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFllbGxvdyByb3VuZGVkIHJlY3RhbmdsZSBzdHJpcCBiZWhpbmQgZWFjaCByZWVsXHJcbiAgICAgICAgICAgIHZhciBiZ1JlY3QgPSBuZXcgUElYSS5HcmFwaGljcygpO1xyXG4gICAgICAgICAgICBiZ1JlY3QuYmVnaW5GaWxsKGRhdGEudWlDb25maWdWTy5yZWVsQkdDb2xvcik7XHJcbiAgICAgICAgICAgIGJnUmVjdC5kcmF3Um91bmRlZFJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIDEwKTtcclxuICAgICAgICAgICAgYmdSZWN0LmFscGhhID0gMC40O1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKGJnUmVjdCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVJlZWxDZWxscyhkYXRhKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjcmVhdGVSZWVsQ2VsbHM6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICAvLyBUaGUgZGlzdGFuY2UgZWFjaCBzeW1ib2wgaXMgYW5pbWF0ZWQgdG8gY3JlYXRlIHNwaW4gZWZmZWN0XHJcbiAgICAgICAgICAgIHRoaXMucmVlbENlbGxIZWlnaHQgPSBkYXRhLnVpQ29uZmlnVk8uc3ltYm9sSGVpZ2h0ICsgZGF0YS51aUNvbmZpZ1ZPLnJlZWxWU2VwYXJhdG9yO1xyXG4gICAgICAgICAgICB0aGlzLnJlZWxIZWlnaHQgPVxyXG4gICAgICAgICAgICAgICAgKGRhdGEudWlDb25maWdWTy5zeW1ib2xIZWlnaHQgKiB0aGlzLm51bVJvd3MpICtcclxuICAgICAgICAgICAgICAgIChkYXRhLnVpQ29uZmlnVk8ucmVlbFZTZXBhcmF0b3IgKiAodGhpcy5udW1Sb3dzIC0gMSkpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHhwID0gMDtcclxuICAgICAgICAgICAgdmFyIHlwID0gLSh0aGlzLnJlZWxDZWxsSGVpZ2h0ICogdGhpcy5udW1Sb3dzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFN0b3JpbmcgcG9zaXRpb25zIG9mIGFsbCBjZWxsc1xyXG4gICAgICAgICAgICAvLyAoYm90aCBvbiBzY3JlZW4gYW5kIG9mZiBzY3JlZW4gdHJpY2sgY2VsbHMpXHJcbiAgICAgICAgICAgIHRoaXMuY2VsbFBvc09yaWdpbmFsID0gW107XHJcblxyXG4gICAgICAgICAgICB2YXIgcmVlbENlbGw7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGluZyBjZWxscyB1c2VkIHRvIGNyZWF0ZSBjb250aW5vdXMgc3BpblxyXG4gICAgICAgICAgICAvLyBUaGVzZSBzdGF5IG9mZiBzY3JlZW4gYW5kIG9ubHkgY29tZSBvbiB0byB2aXNpYmxlIGFyZWFcclxuICAgICAgICAgICAgLy8gd2hlbiB0aGUgcmVlbCBpcyBzcGlubmluZ1xyXG4gICAgICAgICAgICAvLyBUaGVzZSB3aWxsIGJlIHRoZSBmaXJzdCBzZXQgaW4gY2VsbFBvc09yaWdpbmFsIGFycmF5XHJcbiAgICAgICAgICAgIHRoaXMuc3BpblRyaWNrQ2VsbHMgPSBbXTtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMubnVtUm93czsgaSsrKXtcclxuICAgICAgICAgICAgICAgIHJlZWxDZWxsID0gbmV3IHNsb3Qudmlldy5jb21wb25lbnQuUmVlbENlbGwoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQocmVlbENlbGwuc3RhZ2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGluVHJpY2tDZWxscy5wdXNoKHJlZWxDZWxsKTtcclxuICAgICAgICAgICAgICAgIHJlZWxDZWxsLnN0YWdlLnggPSB4cDtcclxuICAgICAgICAgICAgICAgIHJlZWxDZWxsLnN0YWdlLnkgPSB5cDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2VsbFBvc09yaWdpbmFsLnB1c2goe3g6IHhwLCB5OiB5cH0pO1xyXG4gICAgICAgICAgICAgICAgcmVlbENlbGwuaW5pdChkYXRhKTtcclxuICAgICAgICAgICAgICAgIHlwICs9IGRhdGEudWlDb25maWdWTy5zeW1ib2xIZWlnaHQgKyBkYXRhLnVpQ29uZmlnVk8ucmVlbFZTZXBhcmF0b3I7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFJlZWwgY2VsbHMgdG8gZGlzcGxheSBzcGluIHJlc3VsdFxyXG4gICAgICAgICAgICAvLyBUaGVzZSB3aWxsIGJlIHRoZSBsYXN0IHNldCBpbiBjZWxsUG9zT3JpZ2luYWwgYXJyYXlcclxuICAgICAgICAgICAgdGhpcy5jZWxscyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCB0aGlzLm51bVJvd3M7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICByZWVsQ2VsbCA9IG5ldyBzbG90LnZpZXcuY29tcG9uZW50LlJlZWxDZWxsKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHJlZWxDZWxsLnN0YWdlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2VsbHMucHVzaChyZWVsQ2VsbCk7XHJcbiAgICAgICAgICAgICAgICByZWVsQ2VsbC5zdGFnZS54ID0geHA7XHJcbiAgICAgICAgICAgICAgICByZWVsQ2VsbC5zdGFnZS55ID0geXA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNlbGxQb3NPcmlnaW5hbC5wdXNoKHt4OiB4cCwgeTogeXB9KTtcclxuICAgICAgICAgICAgICAgIHJlZWxDZWxsLmluaXQoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB5cCArPSBkYXRhLnVpQ29uZmlnVk8uc3ltYm9sSGVpZ2h0ICsgZGF0YS51aUNvbmZpZ1ZPLnJlZWxWU2VwYXJhdG9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3BpbjogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy5pc1Jlc3VsdFJlY2VpdmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRTcGluKCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3RhcnRTcGluOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgZWFzZVR5cGUgPSBQb3dlcjEuZWFzZUluO1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5udW1Sb3dzOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGluVHJpY2tDZWxsc1tpXS51cGRhdGVXaXRoUmFuZG9tU3ltYm9sKCk7XHJcbiAgICAgICAgICAgICAgICBUd2VlbkxpdGUudG8oXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGluVHJpY2tDZWxsc1tpXS5zdGFnZSxcclxuICAgICAgICAgICAgICAgICAgICAwLjUsXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiB0aGlzLnNwaW5Ucmlja0NlbGxzW2ldLnN0YWdlLnkgKyAodGhpcy5yZWVsQ2VsbEhlaWdodCAqIHRoaXMubnVtUm93cyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVhc2U6IGVhc2VUeXBlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIC8vIFR3ZWVuIG9uQ29tcGxldGUgY2FsbGJhY2sgdG8gYmUgYWRkZWQgb25seSB0byBvbmUgU3ltYm9sLlxyXG4gICAgICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gKGkgPT09IHRoaXMubnVtUm93cyAtIDEpID8gdGhpcy5jb250aW51ZVNwaW4uYmluZCh0aGlzKSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICBUd2VlbkxpdGUudG8oXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1tpXS5zdGFnZSxcclxuICAgICAgICAgICAgICAgICAgICAwLjUsXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiB0aGlzLmNlbGxzW2ldLnN0YWdlLnkgKyAodGhpcy5yZWVsQ2VsbEhlaWdodCAqIHRoaXMubnVtUm93cyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVhc2U6IGVhc2VUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlOiBjYWxsYmFja1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb250aW51ZVNwaW46IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNSZXN1bHRSZWNlaXZlZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BTcGluKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIG9mZlNjcmVlbkNlbGxzID0gdGhpcy5nZXRPZmZTY3JlZW5DZWxscygpO1xyXG4gICAgICAgICAgICB2YXIgZWFzZVR5cGUgPSBMaW5lYXIuZWFzZU5vbmU7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLm51bVJvd3M7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBvZmZTY3JlZW5DZWxsc1tpXS51cGRhdGVXaXRoUmFuZG9tU3ltYm9sKCk7XHJcbiAgICAgICAgICAgICAgICBvZmZTY3JlZW5DZWxsc1tpXS5zdGFnZS55ID0gdGhpcy5jZWxsUG9zT3JpZ2luYWxbaV0ueTtcclxuICAgICAgICAgICAgICAgIFR3ZWVuTGl0ZS50byhcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwaW5Ucmlja0NlbGxzW2ldLnN0YWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIDAuMSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHRoaXMuc3BpblRyaWNrQ2VsbHNbaV0uc3RhZ2UueSArICh0aGlzLnJlZWxDZWxsSGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWFzZTogZWFzZVR5cGVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgLy8gVHdlZW4gb25Db21wbGV0ZSBjYWxsYmFjayB0byBiZSBhZGRlZCBvbmx5IHRvIG9uZSBTeW1ib2wuXHJcbiAgICAgICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSAoaSA9PT0gdGhpcy5udW1Sb3dzIC0gMSkgPyB0aGlzLmNvbnRpbnVlU3Bpbi5iaW5kKHRoaXMpIDogbnVsbDtcclxuICAgICAgICAgICAgICAgIFR3ZWVuTGl0ZS50byhcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW2ldLnN0YWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIDAuMSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHRoaXMuY2VsbHNbaV0uc3RhZ2UueSArICh0aGlzLnJlZWxDZWxsSGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWFzZTogZWFzZVR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU6IGNhbGxiYWNrXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIFR3ZWVuTGl0ZS50byh0aGlzLmNlbGxzW2ldLnN0YWdlLCAwLjEsIHtlYXNlOiBlYXNlVHlwZSwgb25Db21wbGV0ZTogY2FsbGJhY2t9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN0b3BTcGluOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgb2ZmU2NyZWVuQ2VsbHMgPSB0aGlzLmdldE9mZlNjcmVlbkNlbGxzKCk7XHJcbiAgICAgICAgICAgIHZhciBlYXNlVHlwZSA9IFBvd2VyMS5lYXNlT3V0O1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5udW1Sb3dzOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgb2ZmU2NyZWVuQ2VsbHNbaV0udXBkYXRlU3ltYm9sKHRoaXMucmVzdWx0UmVlbFtpXSk7XHJcbiAgICAgICAgICAgICAgICBvZmZTY3JlZW5DZWxsc1tpXS5zdGFnZS55ID0gdGhpcy5jZWxsUG9zT3JpZ2luYWxbaV0ueTtcclxuICAgICAgICAgICAgICAgIFR3ZWVuTGl0ZS50byhcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwaW5Ucmlja0NlbGxzW2ldLnN0YWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIDAuNSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHRoaXMuc3BpblRyaWNrQ2VsbHNbaV0uc3RhZ2UueSArICh0aGlzLnJlZWxDZWxsSGVpZ2h0ICogdGhpcy5udW1Sb3dzKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWFzZTogZWFzZVR5cGVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgLy8gVHdlZW4gb25Db21wbGV0ZSBjYWxsYmFjayB0byBiZSBhZGRlZCBvbmx5IHRvIG9uZSBTeW1ib2wuXHJcbiAgICAgICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSAoaSA9PT0gdGhpcy5udW1Sb3dzIC0gMSkgPyB0aGlzLm9uU3BpblN0b3AuYmluZCh0aGlzKSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICBUd2VlbkxpdGUudG8oXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1tpXS5zdGFnZSxcclxuICAgICAgICAgICAgICAgICAgICAwLjUsXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiB0aGlzLmNlbGxzW2ldLnN0YWdlLnkgKyAodGhpcy5yZWVsQ2VsbEhlaWdodCAqIHRoaXMubnVtUm93cyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVhc2U6IGVhc2VUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlOiBjYWxsYmFja1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvblNwaW5TdG9wOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwLCBqID0gMDsgaSA8IHRoaXMubnVtUm93czsgaSsrLCBqKyspe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGluVHJpY2tDZWxsc1tpXS5zdGFnZS55ID0gdGhpcy5jZWxsUG9zT3JpZ2luYWxbal0ueTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3BpblRyaWNrQ2VsbHNbaV0ucmVtb3ZlU3ltYm9sKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgdGhpcy5udW1Sb3dzOyBpKyssIGorKyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW2ldLnN0YWdlLnkgPSB0aGlzLmNlbGxQb3NPcmlnaW5hbFtqXS55O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jZWxsc1tpXS51cGRhdGVTeW1ib2wodGhpcy5yZXN1bHRSZWVsW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLmVtaXQoc2xvdC52aWV3LmV2ZW50LlZpZXdFdmVudHMuUkVFTF9TUElOX0VORCwgdGhpcy5yZWVsSW5kZXgpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE9mZnNjcmVlbiBjZWxscyBhcmUgdGhlIG9uZXMgd2hpY2ggYXJlIGJlbG93IHRoZSByZWVsIGFyZWFcclxuICAgICAgICAgKiBPbmUgb2YgdGhlIGNlbGwgc2V0LCBlaXRoZXIgdGhlIGFjdHVhbCByZXN1bHQgY2VsbCBzZXQsXHJcbiAgICAgICAgICogb3IgdGhlIHRyaWNrIGNlbGwgc2V0IGlzIHJldHVybmVkIGFzIGFuIGFycmF5XHJcbiAgICAgICAgICogQHJldHVybnMge251bGx9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0T2ZmU2NyZWVuQ2VsbHM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciBvZmZTY3JlZW5DZWxscyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwLCBqID0gMDsgaSA8IHRoaXMubnVtUm93czsgaSsrLCBqKyspe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5zcGluVHJpY2tDZWxsc1tpXS5zdGFnZS55IDwgMCB8fCB0aGlzLnNwaW5Ucmlja0NlbGxzW2ldLnN0YWdlLnkgPiB0aGlzLnJlZWxIZWlnaHQpe1xyXG4gICAgICAgICAgICAgICAgICAgIG9mZlNjcmVlbkNlbGxzLnB1c2godGhpcy5zcGluVHJpY2tDZWxsc1tpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNlbGxzW2ldLnN0YWdlLnkgPCAwIHx8IHRoaXMuY2VsbHNbaV0uc3RhZ2UueSA+IHRoaXMucmVlbEhlaWdodCl7XHJcbiAgICAgICAgICAgICAgICAgICAgb2ZmU2NyZWVuQ2VsbHMucHVzaCh0aGlzLmNlbGxzW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gb2ZmU2NyZWVuQ2VsbHM7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3RvcEFuZFVwZGF0ZVN5bWJvbHM6IGZ1bmN0aW9uKHJlc3VsdCl7XHJcbiAgICAgICAgICAgIHRoaXMucmVzdWx0UmVlbCA9IHJlc3VsdDtcclxuICAgICAgICAgICAgdGhpcy5pc1Jlc3VsdFJlY2VpdmVkID0gdHJ1ZTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB1cGRhdGVTeW1ib2xzV2l0aG91dFNwaW46IGZ1bmN0aW9uKHJlc3VsdCl7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLm51bVJvd3M7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW2ldLnVwZGF0ZVN5bWJvbChyZXN1bHRbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGFuZGxlUmVzaXplOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdSZWVsJ1xyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgUmVlbENlbGxcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LnZpZXcuY29tcG9uZW50LlJlZWxDZWxsJyxcclxuICAgICAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLy8gU3RhZ2UgTWVtYmVyc1xyXG4gICAgICAgIHN0YWdlOiBudWxsLFxyXG4gICAgICAgIHN5bWJvbDogbnVsbCxcclxuXHJcbiAgICAgICAgc3ltYm9sSUQ6IG51bGwsXHJcbiAgICAgICAgcmVzb3VyY2VzOiBudWxsLFxyXG5cclxuICAgICAgICAvLyBBbGwgcG9zc2libGUgc3ltYm9sc1xyXG4gICAgICAgIG51bVN5bWJvbHM6IG51bGwsXHJcbiAgICAgICAgc3ltYm9sczogbnVsbCxcclxuXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNvdXJjZXMgPSBkYXRhLnJlc291cmNlcztcclxuICAgICAgICAgICAgdGhpcy5udW1TeW1ib2xzID0gZGF0YS5nYW1lQ29uZmlnVk8ubnVtU3ltYm9scztcclxuICAgICAgICAgICAgdGhpcy5zeW1ib2xzID0gZGF0YS5nYW1lQ29uZmlnVk8uZ2V0U3ltYm9scygpO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB1cGRhdGVTeW1ib2w6IGZ1bmN0aW9uKHN5bWJvbElEKXtcclxuICAgICAgICAgICAgdGhpcy5zeW1ib2xJRCA9IHN5bWJvbElEO1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVN5bWJvbCgpO1xyXG4gICAgICAgICAgICB0aGlzLnN5bWJvbCA9IG5ldyBQSVhJLlNwcml0ZSh0aGlzLnJlc291cmNlc1tzeW1ib2xJRF0udGV4dHVyZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5zeW1ib2wpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHVwZGF0ZVdpdGhSYW5kb21TeW1ib2w6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU3ltYm9sKHRoaXMuc3ltYm9sc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLm51bVN5bWJvbHMpXSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVtb3ZlU3ltYm9sOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZih0aGlzLnN5bWJvbCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWdlLnJlbW92ZUNoaWxkKHRoaXMuc3ltYm9sKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGhhbmRsZVJlc2l6ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBOQU1FOiAnUmVlbENlbGwnXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBSZWVsQ29udGFpbmVyXHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC52aWV3LmNvbXBvbmVudC5SZWVsQ29udGFpbmVyJyxcclxuICAgICAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLy8gU3RhZ2UgTWVtYmVyc1xyXG4gICAgICAgIHN0YWdlOiBudWxsLFxyXG4gICAgICAgIGJnUmVjdDogbnVsbCxcclxuXHJcbiAgICAgICAgbnVtUmVlbHM6IG51bGwsXHJcbiAgICAgICAgbnVtUm93czogbnVsbCxcclxuICAgICAgICB3aWR0aDogbnVsbCxcclxuICAgICAgICBoZWlnaHQ6IG51bGwsXHJcblxyXG4gICAgICAgIHJlZWxzOiBudWxsLFxyXG5cclxuICAgICAgICBpc1NwaW5uaW5nOiBudWxsLFxyXG4gICAgICAgIHJlZWxTcGluRGVsYXk6IG51bGwsXHJcbiAgICAgICAgbWluU3BpbkR1cmF0aW9uOiBudWxsLFxyXG4gICAgICAgIG1pblNwaW5EdXJhdGlvbkVsYXBzZWQ6IG51bGwsXHJcbiAgICAgICAgcmVzdWx0TWF0cml4UmVjZWl2ZWQ6IG51bGwsXHJcbiAgICAgICAgcmVzdWx0TWF0cml4OiBudWxsLFxyXG5cclxuICAgICAgICByZXNwU2NhbGU6IG51bGwsXHJcblxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubnVtUmVlbHMgPSBkYXRhLmdhbWVDb25maWdWTy5udW1SZWVscztcclxuICAgICAgICAgICAgdGhpcy5udW1Sb3dzID0gZGF0YS5nYW1lQ29uZmlnVk8ubnVtUm93cztcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWluU3BpbkR1cmF0aW9uID0gZGF0YS51aUNvbmZpZ1ZPLm1pblNwaW5EdXJhdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5yZWVsU3BpbkRlbGF5ID0gZGF0YS51aUNvbmZpZ1ZPLnJlZWxTcGluRGVsYXk7XHJcbiAgICAgICAgICAgIHRoaXMucmVzcFNjYWxlID0gZGF0YS51aUNvbmZpZ1ZPLnJlc3BvbnNpdmVTY2FsZS5yZWVsQXJlYTtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyBDYWxjdWxhdGluZyBzaXplIG9mIHdob2xlIHJlZWwgYXJlYSB1c2luZyB2YWx1ZXMgcHJvdmlkZWQgaW4gY29uZmlnXHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPVxyXG4gICAgICAgICAgICAgICAgKHRoaXMubnVtUmVlbHMgKiBkYXRhLnVpQ29uZmlnVk8uc3ltYm9sV2lkdGgpICtcclxuICAgICAgICAgICAgICAgICgodGhpcy5udW1SZWVscyAtIDEpICogZGF0YS51aUNvbmZpZ1ZPLnJlZWxIU2VwYXJhdG9yKSArXHJcbiAgICAgICAgICAgICAgICAoZGF0YS51aUNvbmZpZ1ZPLnJlZWxIUGFkZGluZyAqIDIpO1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9XHJcbiAgICAgICAgICAgICAgICAodGhpcy5udW1Sb3dzICogZGF0YS51aUNvbmZpZ1ZPLnN5bWJvbEhlaWdodCkgK1xyXG4gICAgICAgICAgICAgICAgKCh0aGlzLm51bVJvd3MgLSAxKSAqIGRhdGEudWlDb25maWdWTy5yZWVsVlNlcGFyYXRvcikgK1xyXG4gICAgICAgICAgICAgICAgKGRhdGEudWlDb25maWdWTy5yZWVsVlBhZGRpbmcgKiAyKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFdoaXRlIHJvdW5kZWQgcmVjdGFuZ2xlIGJlaGluZCB0aGUgd2hvbGUgcmVlbCBhcmVhXHJcbiAgICAgICAgICAgIHRoaXMuYmdSZWN0ID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcclxuICAgICAgICAgICAgdGhpcy5iZ1JlY3QuYmVnaW5GaWxsKGRhdGEudWlDb25maWdWTy5yZWVsQXJlYUJHQ29sb3IpO1xyXG4gICAgICAgICAgICB0aGlzLmJnUmVjdC5kcmF3Um91bmRlZFJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIDE1KTtcclxuICAgICAgICAgICAgdGhpcy5iZ1JlY3QuYWxwaGEgPSAwLjY7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5iZ1JlY3QpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVSZWVscyhkYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5zZXR1cFZpZXcoZGF0YS53aW5kb3dTaXplVk8pO1xyXG5cclxuICAgICAgICAgICAgUFhSb290LmFkZENoaWxkKHRoaXMuc3RhZ2UpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNyZWF0ZVJlZWxzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciB4cCA9IGRhdGEudWlDb25maWdWTy5yZWVsSFBhZGRpbmc7XHJcbiAgICAgICAgICAgIHZhciB5cCA9IGRhdGEudWlDb25maWdWTy5yZWVsVlBhZGRpbmc7XHJcbiAgICAgICAgICAgIHRoaXMucmVlbHMgPSBbXTtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMubnVtUmVlbHM7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVlbCA9IG5ldyBzbG90LnZpZXcuY29tcG9uZW50LlJlZWwoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQocmVlbC5zdGFnZSk7XHJcbiAgICAgICAgICAgICAgICByZWVsLmluaXQoaSwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICByZWVsLnN0YWdlLnggPSB4cDtcclxuICAgICAgICAgICAgICAgIHJlZWwuc3RhZ2UueSA9IHlwO1xyXG4gICAgICAgICAgICAgICAgcmVlbC5zdGFnZS5tYXNrID0gdGhpcy5jcmVhdGVNYXNrT2JqZWN0KHhwLCB5cCwgcmVlbC53aWR0aCwgcmVlbC5oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgcmVlbC5zdGFnZS5vbihcclxuICAgICAgICAgICAgICAgICAgICBzbG90LnZpZXcuZXZlbnQuVmlld0V2ZW50cy5SRUVMX1NQSU5fRU5ELFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25SZWVsU3RvcC5iaW5kKHRoaXMpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWVscy5wdXNoKHJlZWwpO1xyXG4gICAgICAgICAgICAgICAgeHAgKz0gZGF0YS51aUNvbmZpZ1ZPLnN5bWJvbFdpZHRoICsgZGF0YS51aUNvbmZpZ1ZPLnJlZWxIU2VwYXJhdG9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2V0dXBWaWV3OiBmdW5jdGlvbih3aW5kb3dTaXplVk8pe1xyXG4gICAgICAgICAgICAvLyBTY2FsaW5nIGFuZCBwb3NpdGlvbmluZyBhcyBwZXIgcmVzcG9uc2l2ZSBzY2FsZVxyXG4gICAgICAgICAgICB2YXIgc3Vic3RpdHV0ZSA9IHt3aWR0aDogdGhpcy53aWR0aCwgaGVpZ2h0OiB0aGlzLmhlaWdodH07XHJcbiAgICAgICAgICAgIHZhciBmaXRDb250ZW50T25TY3JlZW4gPSBuZXcgc2xvdC5tb2RlbC5saWIuVXRpbHMoKS5maXRDb250ZW50T25TY3JlZW47XHJcbiAgICAgICAgICAgIGZpdENvbnRlbnRPblNjcmVlbihcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBzdWJzdGl0dXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNjcmVlbjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4OiB3aW5kb3dTaXplVk8ud2lkdGggKiB0aGlzLnJlc3BTY2FsZS54LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiB3aW5kb3dTaXplVk8uaGVpZ2h0ICogdGhpcy5yZXNwU2NhbGUueSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHdpbmRvd1NpemVWTy53aWR0aCAqIHRoaXMucmVzcFNjYWxlLncsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogd2luZG93U2l6ZVZPLmhlaWdodCAqIHRoaXMucmVzcFNjYWxlLmhcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UueCA9IHN1YnN0aXR1dGUueDtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZS55ID0gc3Vic3RpdHV0ZS55O1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLnNjYWxlLnggPSBzdWJzdGl0dXRlLndpZHRoL3RoaXMud2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2Uuc2NhbGUueSA9IHN1YnN0aXR1dGUuaGVpZ2h0L3RoaXMuaGVpZ2h0O1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNyZWF0ZU1hc2tPYmplY3Q6IGZ1bmN0aW9uKHgsIHksIHcsIGgpe1xyXG4gICAgICAgICAgICAvLyBSb3VuZGVkIHJlY3RhbmdsZSBvbiB0b3Agb2YgZWFjaCByZWVsIGZvciBtYXNrXHJcbiAgICAgICAgICAgIHZhciBtYXNrID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcclxuICAgICAgICAgICAgbWFzay5iZWdpbkZpbGwoMHhGRkZGRkYpO1xyXG4gICAgICAgICAgICBtYXNrLmRyYXdSb3VuZGVkUmVjdCh4LCB5LCB3LCBoLCAxMCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQobWFzayk7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXNrO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNwaW46IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNTcGlubmluZykge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cobmV3IEVycm9yKFwiQ2Fubm90IHN0YXJ0IG5ldyBzcGluLiBBbHJlYWR5IHNwaW5uaW5nLlwiKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc1NwaW5uaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5taW5TcGluRHVyYXRpb25FbGFwc2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMucmVzdWx0TWF0cml4UmVjZWl2ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMubnVtUmVlbHM7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVlbHNbaV0uc3Bpbi5iaW5kKHRoaXMucmVlbHNbaV0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGkgKiB0aGlzLnJlZWxTcGluRGVsYXkgKiAxMDAwXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQodGhpcy5lbGFwc2VNaW5TcGluRHVyYXRpb24uYmluZCh0aGlzKSwgdGhpcy5taW5TcGluRHVyYXRpb24gKiAxMDAwKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBlbGFwc2VNaW5TcGluRHVyYXRpb246IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoaXMubWluU3BpbkR1cmF0aW9uRWxhcHNlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU3ltYm9sc0lmUmVhZHkoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzdG9wQW5kVXBkYXRlU3ltYm9sczogZnVuY3Rpb24ocmVzdWx0KXtcclxuICAgICAgICAgICAgaWYoIXRoaXMuaXNTcGlubmluZykge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cobmV3IEVycm9yKFwiQ2Fubm90IHVwZGF0ZSBzeW1ib2xzLiBSZWVscyBub3Qgc3Bpbm5pbmcuIFwiICtcclxuICAgICAgICAgICAgICAgIFwiVXNlIHVwZGF0ZVN5bWJvbHNXaXRob3V0U3BpbiBtZXRob2QgdG8gdXBkYXRlIHN5bWJvbHMgd2hlbiBub3Qgc3Bpbm5pbmcuXCIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnJlc3VsdE1hdHJpeCA9IHJlc3VsdDtcclxuICAgICAgICAgICAgdGhpcy5yZXN1bHRNYXRyaXhSZWNlaXZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU3ltYm9sc0lmUmVhZHkoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGUgbWV0aG9kIHVwZGF0ZVN5bWJvbHNJZlJlYWR5IG1ha2VzIHN1cmUgdGhhdCB0aGUgcmVlbHMgaGF2ZSBzcHVuIGZvciB0aGVcclxuICAgICAgICAgKiBtaW5pbXVtIHJlcXVpcmVkIGR1cmF0aW9uIGFuZCBhbHNvIHZlcmlmaWVzIGlmIHNwaW4gcmVzdWx0IGhhdiBiZWVuIHJlY2VpdmVkXHJcbiAgICAgICAgICogYnkgdmVyaWZ5aW5nIHRoYXQgdGhlIGFzc29jaWF0ZWQgZmxhZ3MgYXJlIHRydWUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBUaGlzIG1ldGhvZCBpcyBpbnZva2VkIHdoZW4gcmVzdWx0cyBhcmUgcmVjZWl2ZWQgYW5kIHdoZW4gbWluaW11bSBzcGluIGR1cmF0aW9uXHJcbiAgICAgICAgICogZWxhcGVzLiBUaGlzIGZ1bmN0aW9uIHZlcmlmaWVzIGJvdGggYW5kIHRoZW4gcHJvY2VlZHMgYnkgcHJvdmlkaW5uZyBpbmRpdmlkdWFsXHJcbiAgICAgICAgICogcmVlbHMgd2l0aCB0aGVpciBzeW1ib2xzLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHVwZGF0ZVN5bWJvbHNJZlJlYWR5OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZih0aGlzLm1pblNwaW5EdXJhdGlvbkVsYXBzZWQgJiYgdGhpcy5yZXN1bHRNYXRyaXhSZWNlaXZlZCl7XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5udW1SZWVsczsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZWxzW2ldLnN0b3BBbmRVcGRhdGVTeW1ib2xzLmJpbmQodGhpcy5yZWVsc1tpXSwgdGhpcy5yZXN1bHRNYXRyaXhbaV0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpICogdGhpcy5yZWVsU3BpbkRlbGF5ICogMTAwMFxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB1cGRhdGVTeW1ib2xzV2l0aG91dFNwaW46IGZ1bmN0aW9uKHJlc3VsdCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNTcGlubmluZykge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cobmV3IEVycm9yKFwiQ2Fubm90IHVwZGF0ZSB3aXRob3V0IHNwaW4uIEFscmVhZHkgc3Bpbm5pbmcuXCIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5udW1SZWVsczsgaSsrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVlbHNbaV0udXBkYXRlU3ltYm9sc1dpdGhvdXRTcGluKHJlc3VsdFtpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvblJlZWxTdG9wOiBmdW5jdGlvbihyZWVsSUQpe1xyXG4gICAgICAgICAgICBpZihyZWVsSUQgPT09IHRoaXMubnVtUmVlbHMgLSAxKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNTcGlubmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFnZS5lbWl0KHNsb3Qudmlldy5ldmVudC5WaWV3RXZlbnRzLlJFRUxfU1BJTl9FTkQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGFuZGxlUmVzaXplOiBmdW5jdGlvbiAod2luZG93U2l6ZVZPKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dXBWaWV3KHdpbmRvd1NpemVWTyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdSZWVsQ29udGFpbmVyJ1xyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgV2luTGluZXNcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LnZpZXcuY29tcG9uZW50LldpbkxpbmVzJyxcclxuICAgICAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLy8gU3RhZ2UgTWVtYmVyc1xyXG4gICAgICAgIHN0YWdlOiBudWxsLFxyXG4gICAgICAgIGxpbmVzOiBudWxsLFxyXG5cclxuICAgICAgICBudW1MaW5lczogbnVsbCxcclxuICAgICAgICB2aXNpYmxlTGluZTogbnVsbCxcclxuXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5udW1MaW5lcyA9IGRhdGEuZ2FtZUNvbmZpZ1ZPLm51bUxpbmVzO1xyXG4gICAgICAgICAgICB0aGlzLmFkZExpbmVzKGRhdGEpO1xyXG4gICAgICAgICAgICB0aGlzLmhpZGVBbGxMaW5lcygpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFkZExpbmVzOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICAgdGhpcy5saW5lcyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgdmFyIGxpbmVQb2ludHMgPSBkYXRhLnVpQ29uZmlnVk8ubGluZVBvaW50cztcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMubnVtTGluZXM7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGluZSA9IGxpbmVQb2ludHNbaV07XHJcbiAgICAgICAgICAgICAgICB2YXIgdG90YWxQb2ludHMgPSBsaW5lLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHZhciBsaW5lR3JhcGhpYyA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XHJcbiAgICAgICAgICAgICAgICBsaW5lR3JhcGhpYy5saW5lU3R5bGUoZGF0YS51aUNvbmZpZ1ZPLndpbkxpbmVXaWR0aCwgZGF0YS51aUNvbmZpZ1ZPLndpbkxpbmVDb2xvcik7XHJcbiAgICAgICAgICAgICAgICBsaW5lR3JhcGhpYy5tb3ZlVG8obGluZVswXVswXSwgbGluZVswXVsxXSk7XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGogPSAxOyBqIDwgdG90YWxQb2ludHM7IGorKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZUdyYXBoaWMubGluZVRvKGxpbmVbal1bMF0sIGxpbmVbal1bMV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGluZUdyYXBoaWMuZW5kRmlsbCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZChsaW5lR3JhcGhpYyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmVzLnB1c2gobGluZUdyYXBoaWMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2hvd0xpbmU6IGZ1bmN0aW9uKGxpbmVOdW1iZXIpe1xyXG4gICAgICAgICAgICBpZih0aGlzLnZpc2libGVMaW5lKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJsZUxpbmUudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudmlzaWJsZUxpbmUgPSB0aGlzLmxpbmVzW2xpbmVOdW1iZXJdO1xyXG4gICAgICAgICAgICB0aGlzLnZpc2libGVMaW5lLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGhpZGVBbGxMaW5lczogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMubnVtTGluZXM7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmVzW2ldLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGhhbmRsZVJlc2l6ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBOQU1FOiAnV2luTGluZXMnXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBWaWV3RXZlbnRzXHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiBcInNsb3Qudmlldy5ldmVudC5WaWV3RXZlbnRzXCJcclxuICAgIH0sXHJcblxyXG4gICAge30sXHJcblxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBDTElDSzogICAgICAgICAgICAgICgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpID8gXCJ0YXBcIiA6IFwiY2xpY2tcIixcclxuICAgICAgICBTUElOX0NMSUNLOiAgICAgICAgIFwiVmlld0V2ZW50c19zcGluX2NsaWNrXCIsXHJcbiAgICAgICAgUkVFTF9TUElOX0VORDogICAgICBcIlZpZXdFdmVudHNfcmVlbF9zcGluX2VuZFwiXHJcbiAgICB9XHJcbik7IiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2NcclxuICogQGNsYXNzICAgICAgIEJHTWVkaWF0b3JcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LnZpZXcubWVkaWF0b3IuQkdNZWRpYXRvcicsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLk1lZGlhdG9yXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvLyBSZWZlcmVuY2VzXHJcbiAgICAgICAgd2luZG93U2l6ZVByb3h5OiBudWxsLFxyXG5cclxuICAgICAgICAvLyBOb3RpZmljYXRpb25zIHRoaXMgbWVkaWF0b3IgaXMgaW50ZXJlc3RlZCBpblxyXG4gICAgICAgIGxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsb3QuQXBwQ29uc3RhbnRzLldJTkRPV19SRVNJWkVELFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbG90LkFwcENvbnN0YW50cy5BU1NFVFNfTE9BREVEXHJcbiAgICAgICAgICAgICAgICAgICAgXTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvblJlZ2lzdGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Vmlld0NvbXBvbmVudCggbmV3IHNsb3Qudmlldy5jb21wb25lbnQuQkcoKSApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy53aW5kb3dTaXplUHJveHkgPSB0aGlzLmZhY2FkZS5yZXRyaWV2ZVByb3h5KHNsb3QubW9kZWwucHJveHkuV2luZG93U2l6ZVByb3h5Lk5BTUUpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIEhhbmRsZSBub3RpZmljYXRpb25zIGZyb20gb3RoZXIgUHVyZU1WQyBhY3RvcnNcclxuICAgICAgICBoYW5kbGVOb3RpZmljYXRpb246IGZ1bmN0aW9uIChub3RlKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoIG5vdGUuZ2V0TmFtZSgpICkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBzbG90LkFwcENvbnN0YW50cy5XSU5ET1dfUkVTSVpFRDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQuaGFuZGxlUmVzaXplKG5vdGUuZ2V0Qm9keSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2Ugc2xvdC5BcHBDb25zdGFudHMuQVNTRVRTX0xPQURFRDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQuaW5pdChcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VzOiBub3RlLmdldEJvZHkoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd1NpemVWTzogdGhpcy53aW5kb3dTaXplUHJveHkud2luZG93U2l6ZVZPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdCR01lZGlhdG9yJ1xyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgUGFuZWxNZWRpYXRvclxyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3Qudmlldy5tZWRpYXRvci5QYW5lbE1lZGlhdG9yJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuTWVkaWF0b3JcclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIC8vIFJlZmVyZW5jZXNcclxuICAgICAgICB3aW5kb3dTaXplUHJveHk6IG51bGwsXHJcbiAgICAgICAgY29uZmlnUHJveHk6IG51bGwsXHJcbiAgICAgICAgc2VydmVyUHJveHk6IG51bGwsXHJcblxyXG4gICAgICAgIC8vIE5vdGlmaWNhdGlvbnMgdGhpcyBtZWRpYXRvciBpcyBpbnRlcmVzdGVkIGluIFxyXG4gICAgICAgIGxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgIHNsb3QuQXBwQ29uc3RhbnRzLldJTkRPV19SRVNJWkVELFxyXG4gICAgICAgICAgICAgICAgc2xvdC5BcHBDb25zdGFudHMuQVNTRVRTX0xPQURFRCxcclxuICAgICAgICAgICAgICAgIHNsb3QuQXBwQ29uc3RhbnRzLlNQSU5fRU5EXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25SZWdpc3RlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFZpZXdDb21wb25lbnQobmV3IHNsb3Qudmlldy5jb21wb25lbnQuUGFuZWwoKSk7XHJcbiAgICAgICAgICAgIHRoaXMudmlld0NvbXBvbmVudC5zdGFnZS5vbihcclxuICAgICAgICAgICAgICAgIHNsb3Qudmlldy5ldmVudC5WaWV3RXZlbnRzLlNQSU5fQ0xJQ0ssXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uU3BpbkNsaWNrLmJpbmQodGhpcylcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMud2luZG93U2l6ZVByb3h5ID0gdGhpcy5mYWNhZGUucmV0cmlldmVQcm94eShzbG90Lm1vZGVsLnByb3h5LldpbmRvd1NpemVQcm94eS5OQU1FKTtcclxuICAgICAgICAgICAgdGhpcy5jb25maWdQcm94eSA9IHRoaXMuZmFjYWRlLnJldHJpZXZlUHJveHkoc2xvdC5tb2RlbC5wcm94eS5Db25maWdQcm94eS5OQU1FKTtcclxuICAgICAgICAgICAgdGhpcy5zZXJ2ZXJQcm94eSA9IHRoaXMuZmFjYWRlLnJldHJpZXZlUHJveHkoc2xvdC5tb2RlbC5wcm94eS5TZXJ2ZXJQcm94eS5OQU1FKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvblNwaW5DbGljazogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKHNsb3QuQXBwQ29uc3RhbnRzLlNQSU4pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIEhhbmRsZSBub3RpZmljYXRpb25zIGZyb20gb3RoZXIgUHVyZU1WQyBhY3RvcnNcclxuICAgICAgICBoYW5kbGVOb3RpZmljYXRpb246IGZ1bmN0aW9uIChub3RlKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoIG5vdGUuZ2V0TmFtZSgpICkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBzbG90LkFwcENvbnN0YW50cy5XSU5ET1dfUkVTSVpFRDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQuaGFuZGxlUmVzaXplKG5vdGUuZ2V0Qm9keSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2Ugc2xvdC5BcHBDb25zdGFudHMuQVNTRVRTX0xPQURFRDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQuaW5pdChcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VzOiBub3RlLmdldEJvZHkoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhbWVDb25maWdWTzogdGhpcy5jb25maWdQcm94eS5nYW1lQ29uZmlnVk8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aUNvbmZpZ1ZPOiB0aGlzLmNvbmZpZ1Byb3h5LnVpQ29uZmlnVk8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dTaXplVk86IHRoaXMud2luZG93U2l6ZVByb3h5LndpbmRvd1NpemVWT1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQudXBkYXRlQmFsYW5jZSh0aGlzLnNlcnZlclByb3h5LnJlc3VsdFZPLmJhbGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBzbG90LkFwcENvbnN0YW50cy5TUElOX0VORDpcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0Vk8gPSBub3RlLmdldEJvZHkoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQuZW5hYmxlQmV0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LmVuYWJsZVNwaW4oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQudXBkYXRlQmFsYW5jZSh0aGlzLnNlcnZlclByb3h5LnJlc3VsdFZPLmJhbGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld0NvbXBvbmVudC51cGRhdGVXaW4odGhpcy5zZXJ2ZXJQcm94eS5yZXN1bHRWTy50b3RhbFdpbik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogJ1BhbmVsTWVkaWF0b3InXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBSZWVsQ29udGFpbmVyTWVkaWF0b3JcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LnZpZXcubWVkaWF0b3IuUmVlbENvbnRhaW5lck1lZGlhdG9yJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuTWVkaWF0b3JcclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIC8vIFJlZmVyZW5jZXNcclxuICAgICAgICB3aW5kb3dTaXplUHJveHk6IG51bGwsXHJcbiAgICAgICAgY29uZmlnUHJveHk6IG51bGwsXHJcbiAgICAgICAgc2VydmVyUHJveHk6IG51bGwsXHJcblxyXG4gICAgICAgIC8vIEFkZGl0aW9uYWwgdmlld3NcclxuICAgICAgICB3aW5MaW5lc1ZpZXc6IG51bGwsXHJcblxyXG4gICAgICAgIC8vIE5vdGlmaWNhdGlvbnMgdGhpcyBtZWRpYXRvciBpcyBpbnRlcmVzdGVkIGluIFxyXG4gICAgICAgIGxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgIHNsb3QuQXBwQ29uc3RhbnRzLldJTkRPV19SRVNJWkVELFxyXG4gICAgICAgICAgICAgICAgc2xvdC5BcHBDb25zdGFudHMuQVNTRVRTX0xPQURFRCxcclxuICAgICAgICAgICAgICAgIHNsb3QuQXBwQ29uc3RhbnRzLlNQSU4sXHJcbiAgICAgICAgICAgICAgICBzbG90LkFwcENvbnN0YW50cy5TUElOX1JFU1VMVCxcclxuICAgICAgICAgICAgICAgIHNsb3QuQXBwQ29uc3RhbnRzLldJTl9BTk5PVU5DRU1FTlQsXHJcbiAgICAgICAgICAgICAgICBzbG90LkFwcENvbnN0YW50cy5DTEVBUl9XSU5fQU5OT1VOQ0VNRU5UXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25SZWdpc3RlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFZpZXdDb21wb25lbnQobmV3IHNsb3Qudmlldy5jb21wb25lbnQuUmVlbENvbnRhaW5lcigpKTtcclxuICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LnN0YWdlLm9uKFxyXG4gICAgICAgICAgICAgICAgc2xvdC52aWV3LmV2ZW50LlZpZXdFdmVudHMuUkVFTF9TUElOX0VORCxcclxuICAgICAgICAgICAgICAgIHRoaXMub25SZWVsU3BpbkVuZC5iaW5kKHRoaXMpXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLndpbkxpbmVzVmlldyA9IG5ldyBzbG90LnZpZXcuY29tcG9uZW50LldpbkxpbmVzKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLndpbmRvd1NpemVQcm94eSA9IHRoaXMuZmFjYWRlLnJldHJpZXZlUHJveHkoc2xvdC5tb2RlbC5wcm94eS5XaW5kb3dTaXplUHJveHkuTkFNRSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlnUHJveHkgPSB0aGlzLmZhY2FkZS5yZXRyaWV2ZVByb3h5KHNsb3QubW9kZWwucHJveHkuQ29uZmlnUHJveHkuTkFNRSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VydmVyUHJveHkgPSB0aGlzLmZhY2FkZS5yZXRyaWV2ZVByb3h5KHNsb3QubW9kZWwucHJveHkuU2VydmVyUHJveHkuTkFNRSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25SZWVsU3BpbkVuZDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKHNsb3QuQXBwQ29uc3RhbnRzLlNQSU5fRU5EKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBIYW5kbGUgbm90aWZpY2F0aW9ucyBmcm9tIG90aGVyIFB1cmVNVkMgYWN0b3JzXHJcbiAgICAgICAgaGFuZGxlTm90aWZpY2F0aW9uOiBmdW5jdGlvbiAobm90ZSkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKCBub3RlLmdldE5hbWUoKSApIHtcclxuICAgICAgICAgICAgICAgIGNhc2Ugc2xvdC5BcHBDb25zdGFudHMuV0lORE9XX1JFU0laRUQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LmhhbmRsZVJlc2l6ZShub3RlLmdldEJvZHkoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHNsb3QuQXBwQ29uc3RhbnRzLkFTU0VUU19MT0FERUQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlczogbm90ZS5nZXRCb2R5KCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWVDb25maWdWTzogdGhpcy5jb25maWdQcm94eS5nYW1lQ29uZmlnVk8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVpQ29uZmlnVk86IHRoaXMuY29uZmlnUHJveHkudWlDb25maWdWTyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93U2l6ZVZPOiB0aGlzLndpbmRvd1NpemVQcm94eS53aW5kb3dTaXplVk9cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld0NvbXBvbmVudC5pbml0KGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld0NvbXBvbmVudC51cGRhdGVTeW1ib2xzV2l0aG91dFNwaW4odGhpcy5zZXJ2ZXJQcm94eS5yZXN1bHRWTy5nZXRTeW1ib2xNYXRyaXgoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aW5MaW5lc1ZpZXcuaW5pdChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQuc3RhZ2UuYWRkQ2hpbGQodGhpcy53aW5MaW5lc1ZpZXcuc3RhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBzbG90LkFwcENvbnN0YW50cy5TUElOOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld0NvbXBvbmVudC5zcGluKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHNsb3QuQXBwQ29uc3RhbnRzLlNQSU5fUkVTVUxUOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld0NvbXBvbmVudC5zdG9wQW5kVXBkYXRlU3ltYm9scyhub3RlLmdldEJvZHkoKS5nZXRTeW1ib2xNYXRyaXgoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHNsb3QuQXBwQ29uc3RhbnRzLldJTl9BTk5PVU5DRU1FTlQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aW5MaW5lc1ZpZXcuc2hvd0xpbmUobm90ZS5nZXRCb2R5KCkubGluZU51bWJlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHNsb3QuQXBwQ29uc3RhbnRzLkNMRUFSX1dJTl9BTk5PVU5DRU1FTlQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aW5MaW5lc1ZpZXcuaGlkZUFsbExpbmVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogJ1JlZWxDb250YWluZXJNZWRpYXRvcidcclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2NcclxuICogQGNsYXNzICAgICAgIFdpbkFubm91bmNlTWVkaWF0b3JcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LnZpZXcubWVkaWF0b3IuV2luQW5ub3VuY2VNZWRpYXRvcicsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLk1lZGlhdG9yXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvLyBSZWZlcmVuY2VzXHJcbiAgICAgICAgc2VydmVyUHJveHk6IG51bGwsXHJcbiAgICAgICAgY29uZmlnUHJveHk6IG51bGwsXHJcblxyXG4gICAgICAgIGN1cnJlbnRXaW46IG51bGwsXHJcbiAgICAgICAgaXNBbm5vdW5jaW5nOiBudWxsLFxyXG4gICAgICAgIHdpbkFubm91bmNlRGVsYXk6IG51bGwsXHJcbiAgICAgICAgcmVwZWF0Q291bnQ6IG51bGwsXHJcbiAgICAgICAgaW50ZXJ2YWxJRDogbnVsbCxcclxuXHJcbiAgICAgICAgLy8gTm90aWZpY2F0aW9ucyB0aGlzIG1lZGlhdG9yIGlzIGludGVyZXN0ZWQgaW4gXHJcbiAgICAgICAgbGlzdE5vdGlmaWNhdGlvbkludGVyZXN0czogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAgc2xvdC5BcHBDb25zdGFudHMuU1RBUlRfV0lOX0FOTk9VTkNFTUVOVFMsXHJcbiAgICAgICAgICAgICAgICBzbG90LkFwcENvbnN0YW50cy5TVE9QX1dJTl9BTk5PVU5DRU1FTlRTXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25SZWdpc3RlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlcnZlclByb3h5ID0gdGhpcy5mYWNhZGUucmV0cmlldmVQcm94eShzbG90Lm1vZGVsLnByb3h5LlNlcnZlclByb3h5Lk5BTUUpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZ1Byb3h5ID0gdGhpcy5mYWNhZGUucmV0cmlldmVQcm94eShzbG90Lm1vZGVsLnByb3h5LkNvbmZpZ1Byb3h5Lk5BTUUpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFubm91bmNlV2luOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZih0aGlzLnJlcGVhdENvdW50ID49IHRoaXMuY29uZmlnUHJveHkudWlDb25maWdWTy5yZXBlYXRXaW5zKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BBbm5vdW5jZW1lbnRJbnRlcnZhbCgpO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmlzQW5ub3VuY2luZyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oXHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdC5BcHBDb25zdGFudHMuV0lOX0FOTk9VTkNFTUVOVCxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlcnZlclByb3h5LnJlc3VsdFZPLndpbnNbdGhpcy5jdXJyZW50V2luXVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuY3VycmVudFdpbiA8IHRoaXMuc2VydmVyUHJveHkucmVzdWx0Vk8ud2lucy5sZW5ndGggLSAxKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRXaW4rKztcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFdpbiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXBlYXRDb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuaW50ZXJ2YWxJRCA9IHNldFRpbWVvdXQoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbm5vdW5jZVdpbi5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnUHJveHkudWlDb25maWdWTy53aW5Bbm5vdW5jZURlbGF5ICogMTAwMFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN0b3BBbm5vdW5jZW1lbnRJbnRlcnZhbDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSUQpO1xyXG4gICAgICAgICAgICB0aGlzLmlzQW5ub3VuY2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oc2xvdC5BcHBDb25zdGFudHMuQ0xFQVJfV0lOX0FOTk9VTkNFTUVOVCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gSGFuZGxlIG5vdGlmaWNhdGlvbnMgZnJvbSBvdGhlciBQdXJlTVZDIGFjdG9yc1xyXG4gICAgICAgIGhhbmRsZU5vdGlmaWNhdGlvbjogZnVuY3Rpb24gKG5vdGUpIHtcclxuICAgICAgICAgICAgc3dpdGNoICggbm90ZS5nZXROYW1lKCkgKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHNsb3QuQXBwQ29uc3RhbnRzLlNUQVJUX1dJTl9BTk5PVU5DRU1FTlRTOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuc2VydmVyUHJveHkucmVzdWx0Vk8ud2lucy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRXaW4gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQW5ub3VuY2luZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVwZWF0Q291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFubm91bmNlV2luKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBzbG90LkFwcENvbnN0YW50cy5TVE9QX1dJTl9BTk5PVU5DRU1FTlRTOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcEFubm91bmNlbWVudEludGVydmFsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogJ1dpbkFubm91bmNlTWVkaWF0b3InXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBBcHBcclxuICovXHJcblxyXG4vKipcclxuICogUElYSSBnbG9iYWwgdmFyaWFibGVzICovXHJcbnZhciBQWFJvb3QsIFBYUmVuZGVyZXI7XHJcblxyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC5BcHAnLFxyXG4gICAgICAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJDb21tYW5kKHNsb3QuQXBwQ29uc3RhbnRzLlNUQVJUVVAsIHNsb3QuY29udHJvbGxlci5jb21tYW5kLlN0YXJ0dXBDb21tYW5kKTtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUuc2VuZE5vdGlmaWNhdGlvbihzbG90LkFwcENvbnN0YW50cy5TVEFSVFVQKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBsb2FkZXJQcm94eSA9IHRoaXMuZmFjYWRlLnJldHJpZXZlUHJveHkoc2xvdC5tb2RlbC5wcm94eS5Mb2FkZXJQcm94eS5OQU1FKTtcclxuICAgICAgICAgICAgbG9hZGVyUHJveHkubG9hZEFzc2V0cygpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIFNUQVJUVVA6ICdzdGFydHVwJyxcclxuICAgICAgICBmYWNhZGU6IHB1cmVtdmMuRmFjYWRlLmdldEluc3RhbmNlKCBzbG90LkFwcENvbnN0YW50cy5DT1JFX05BTUUgKVxyXG4gICAgfVxyXG4pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
