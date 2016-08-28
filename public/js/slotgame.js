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
            this.loader.add('bg', 'assets/background.jpg');

            this.loader.add('s1', 'assets/snowflake.png');
            this.loader.add('s2', 'assets/sun.png');
            this.loader.add('s3', 'assets/sandglass.png');
            this.loader.add('s4', 'assets/victory.png');
            this.loader.add('s5', 'assets/a.png');
            this.loader.add('s6', 'assets/k.png');
            this.loader.add('s7', 'assets/q.png');
            this.loader.add('s8', 'assets/j.png');

            this.loader.add('spin', 'assets/spin.png');
            this.loader.add('spin_disabled', 'assets/spin_disabled.png');

            this.loader.add('win', 'assets/win.png');
            this.loader.add('balance', 'assets/balance.png');

            this.loader.add('bet', 'assets/bet.png');
            this.loader.add('bet_minus', 'assets/bet_minus.png');
            this.loader.add('bet_minus_disabled', 'assets/bet_minus_disabled.png');
            this.loader.add('bet_plus', 'assets/bet_plus.png');
            this.loader.add('bet_plus_disabled', 'assets/bet_plus_disabled.png');

            this.loader.on("progress", this.onGraphicsLoadProgress.bind(this));
            this.loader.load(this.onGraphicsLoadComplete.bind(this));

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
                    {resources: this.loader.resources, sound: this.sound}
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
            reelMatrix = this.forceResult(reelMatrix);
            var lineSymbols = this.getLineSymbols(reelMatrix);

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
            matrix = [[7,8,1],[7,8,2],[7,8,3],[7,8,4],[7,8,5]];
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
            this.facade.registerMediator(new slot.view.mediator.SoundPlayerMediator());
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
                    this.viewComponent.init(
                        {
                            resources: note.getBody().resources,
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
            this.viewComponent.stage.on(
                slot.view.event.ViewEvents.BET_CLICK,
                this.onBetUpdate.bind(this)
            )

            this.windowSizeProxy = this.facade.retrieveProxy(slot.model.proxy.WindowSizeProxy.NAME);
            this.configProxy = this.facade.retrieveProxy(slot.model.proxy.ConfigProxy.NAME);
            this.serverProxy = this.facade.retrieveProxy(slot.model.proxy.ServerProxy.NAME);
        },

        onSpinClick: function(){
            this.sendNotification(slot.AppConstants.SPIN);
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
                            resources: note.getBody().resources,
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
                        resources: note.getBody().resources,
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
                    this.winLinesView.showLine(note.getBody().win.lineNumber);
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
                    this.sound = note.getBody().sound;
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
                        console.log("winSymbol: " + winSymbol);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFwcENvbnN0YW50cy5qcyIsImVudW0vT1JJRU5UQVRJT04uanMiLCJsaWIvVXRpbHMuanMiLCJwcm94eS9Db25maWdQcm94eS5qcyIsInByb3h5L0xvYWRlclByb3h5LmpzIiwicHJveHkvU2VydmVyUHJveHkuanMiLCJwcm94eS9XaW5kb3dTaXplUHJveHkuanMiLCJ2by9HYW1lQ29uZmlnVk8uanMiLCJ2by9SZXN1bHRWTy5qcyIsInZvL1VJQ29uZmlnVk8uanMiLCJ2by9XaW5kb3dTaXplVk8uanMiLCJwcm94eS9zZXJ2aWNlL1NlcnZlclNlcnZpY2UuanMiLCJjb21tYW5kL1ByZXBDb250cm9sbGVyQ29tbWFuZC5qcyIsImNvbW1hbmQvUHJlcE1vZGVsQ29tbWFuZC5qcyIsImNvbW1hbmQvUHJlcFBpeGlDb21tYW5kLmpzIiwiY29tbWFuZC9QcmVwVmlld0NvbW1hbmQuanMiLCJjb21tYW5kL1NwaW5Db21tYW5kLmpzIiwiY29tbWFuZC9TcGluRW5kQ29tbWFuZC5qcyIsImNvbW1hbmQvU3RhcnR1cENvbW1hbmQuanMiLCJjb21tYW5kL1dpbmRvd1Jlc2l6ZUNvbW1hbmQuanMiLCJjb21wb25lbnQvQkcuanMiLCJjb21wb25lbnQvUGFuZWwuanMiLCJjb21wb25lbnQvUmVlbC5qcyIsImNvbXBvbmVudC9SZWVsQ2VsbC5qcyIsImNvbXBvbmVudC9SZWVsQ29udGFpbmVyLmpzIiwiY29tcG9uZW50L1dpbkxpbmVzLmpzIiwiZXZlbnQvVmlld0V2ZW50cy5qcyIsIm1lZGlhdG9yL0JHTWVkaWF0b3IuanMiLCJtZWRpYXRvci9QYW5lbE1lZGlhdG9yLmpzIiwibWVkaWF0b3IvUmVlbENvbnRhaW5lck1lZGlhdG9yLmpzIiwibWVkaWF0b3IvU291bmRQbGF5ZXJNZWRpYXRvci5qcyIsIm1lZGlhdG9yL1dpbkFubm91bmNlTWVkaWF0b3IuanMiLCJBcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjhFQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1UEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25NQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJzbG90Z2FtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBBcHBDb25zdGFudHNcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6IFwic2xvdC5BcHBDb25zdGFudHNcIlxyXG4gICAgfSxcclxuXHJcbiAgICB7fSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIC8vIFRoZSBtdWx0aXRvbiBrZXkgZm9yIHRoaXMgYXBwJ3Mgc2luZ2xlIGNvcmVcclxuICAgICAgICBDT1JFX05BTUU6ICAgICAgICAgICAgICAnU2xvdEdhbWUnLFxyXG5cclxuICAgICAgICAvLyBOb3RpZmljYXRpb25zXHJcbiAgICAgICAgU1RBUlRVUDogICAgICAgICAgICAgICAgICAgIFwiQXBwQ29uc3RhbnRzX3N0YXJ0dXBcIixcclxuXHJcbiAgICAgICAgLy8gPT09XHJcbiAgICAgICAgQVNTRVRTX0xPQURFRDogICAgICAgICAgICAgIFwiQXBwQ29uc3RhbnRzX2Fzc2V0c19sb2FkZWRcIixcclxuICAgICAgICBXSU5ET1dfUkVTSVpFRDogICAgICAgICAgICAgXCJBcHBDb25zdGFudHNfd2luZG93X3Jlc2l6ZWRcIixcclxuICAgICAgICBTUElOOiAgICAgICAgICAgICAgICAgICAgICAgXCJBcHBDb25zdGFudHNfc3BpblwiLFxyXG4gICAgICAgIFNQSU5fUkVTVUxUOiAgICAgICAgICAgICAgICBcIkFwcENvbnN0YW50c19zcGluX3Jlc3VsdFwiLFxyXG4gICAgICAgIFNQSU5fRU5EOiAgICAgICAgICAgICAgICAgICBcIkFwcENvbnN0YW50c19zcGluX2VuZFwiLFxyXG5cclxuICAgICAgICBTVEFSVF9XSU5fQU5OT1VOQ0VNRU5UUzogICAgXCJBcHBDb25zdGFudHNfc3RhcnRfd2luX2Fubm91bmNlbWVudHNcIixcclxuICAgICAgICBTVE9QX1dJTl9BTk5PVU5DRU1FTlRTOiAgICAgXCJBcHBDb25zdGFudHNfc3RvcF93aW5fYW5ub3VuY2VtZW50c1wiLFxyXG4gICAgICAgIFdJTl9BTk5PVU5DRU1FTlQ6ICAgICAgICAgICBcIkFwcENvbnN0YW50c193aW5fYW5ub3VuY2VtZW50XCIsXHJcbiAgICAgICAgQ0xFQVJfV0lOX0FOTk9VTkNFTUVOVDogICAgIFwiQXBwQ29uc3RhbnRzX2NsZWFyX3dpbl9hbm5vdW5jZW1lbnRcIixcclxuXHJcbiAgICAgICAgQkVUX1VQREFURUQ6ICAgICAgICAgICAgICAgIFwiQXBwQ29uc3RhbnRzX2JldF91cGRhdGVkXCJcclxuICAgIH1cclxuKTsiLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgT1JJRU5UQVRJT05cclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90Lm1vZGVsLmVudW0uT1JJRU5UQVRJT04nXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHt9LFxyXG5cclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogXCJPUklFTlRBVElPTlwiLFxyXG4gICAgICAgIExBTkRTQ0FQRTogXCJsYW5kc2NhcGVcIixcclxuICAgICAgICBQT1JUUkFJVDogXCJwb3J0cmFpdFwiXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBVdGlsc1xyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3QubW9kZWwubGliLlV0aWxzJ1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgZml0Q29udGVudE9uU2NyZWVuOiBmdW5jdGlvbihvKXtcclxuICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSBvLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIHZhciBjb250ZW50RGltZW5zaW9ucyA9IG8uY29udGVudERpbWVuc2lvbnMgfHwgby5jb250ZW50O1xyXG5cclxuICAgICAgICAgICAgdmFyIHNpemUgPSBzbG90Lm1vZGVsLmxpYi5VdGlscy5nZXRTaXplVG9GaXRTY3JlZW4oXHJcbiAgICAgICAgICAgICAgICBjb250ZW50RGltZW5zaW9ucyxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogby5zY3JlZW4ud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBvLnNjcmVlbi5oZWlnaHRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgY29udGVudC54ID0gby5zY3JlZW4ueCArICgoby5zY3JlZW4ud2lkdGggLSBzaXplLndpZHRoKS8yKTtcclxuICAgICAgICAgICAgY29udGVudC55ID0gby5zY3JlZW4ueSArICgoby5zY3JlZW4uaGVpZ2h0IC0gc2l6ZS5oZWlnaHQpLzIpO1xyXG4gICAgICAgICAgICBjb250ZW50LndpZHRoID0gc2l6ZS53aWR0aDtcclxuICAgICAgICAgICAgY29udGVudC5oZWlnaHQgPSBzaXplLmhlaWdodDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6IFwiVXRpbHNcIixcclxuXHJcbiAgICAgICAgZ2V0T3JpZW50YXRpb246IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQpe1xyXG4gICAgICAgICAgICByZXR1cm4gICh3aWR0aCA+IGhlaWdodCkgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbG90Lm1vZGVsLmVudW0uT1JJRU5UQVRJT04uTEFORFNDQVBFOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbG90Lm1vZGVsLmVudW0uT1JJRU5UQVRJT04uUE9SVFJBSVQ7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0U2l6ZVRvRmlsbFNjcmVlbjogZnVuY3Rpb24oY29udGVudCwgc2NyZWVuKXtcclxuICAgICAgICAgICAgaWYoKHNjcmVlbi53aWR0aC9zY3JlZW4uaGVpZ2h0KSA+IChjb250ZW50LndpZHRoL2NvbnRlbnQuaGVpZ2h0KSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBzY3JlZW4ud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGNvbnRlbnQuaGVpZ2h0ICogKHNjcmVlbi53aWR0aC9jb250ZW50LndpZHRoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIHtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogY29udGVudC53aWR0aCAqIChzY3JlZW4uaGVpZ2h0L2NvbnRlbnQuaGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHNjcmVlbi5oZWlnaHRcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBGaXQgZ2l2ZW4gY29udGVudCBpbnRvIGEgZ2l2ZW4gc2NyZWVuIHdpdGhob3V0IGRpc3R1cmJpbmcgdGhlIGFzcGVjdCByYXRpb1xyXG4gICAgICAgICAqIG9mIHRoZSBjb250ZW50LlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBmaXRPYmogLSBPYmplY3Qgd2l0aCBkYXRhIHRvIGFwcGx5IGZpdFxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldFNpemVUb0ZpdFNjcmVlbjogZnVuY3Rpb24oY29udGVudCwgc2NyZWVuKXtcclxuICAgICAgICAgICAgaWYoKHNjcmVlbi53aWR0aC9zY3JlZW4uaGVpZ2h0KSA+IChjb250ZW50LndpZHRoL2NvbnRlbnQuaGVpZ2h0KSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIHtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogY29udGVudC53aWR0aCAqIChzY3JlZW4uaGVpZ2h0L2NvbnRlbnQuaGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHNjcmVlbi5oZWlnaHRcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBzY3JlZW4ud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBjb250ZW50LmhlaWdodCAqIChzY3JlZW4ud2lkdGgvY29udGVudC53aWR0aClcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB0b2dnbGVGdWxsU2NyZWVuOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGRvYyA9IHdpbmRvdy5kb2N1bWVudDtcclxuICAgICAgICAgICAgdmFyIGRvY0VsID0gZG9jLmRvY3VtZW50RWxlbWVudDtcclxuXHJcbiAgICAgICAgICAgIHZhciByZXF1ZXN0RnVsbFNjcmVlbiA9IGRvY0VsLnJlcXVlc3RGdWxsc2NyZWVuIHx8IGRvY0VsLm1velJlcXVlc3RGdWxsU2NyZWVuIHx8IGRvY0VsLndlYmtpdFJlcXVlc3RGdWxsU2NyZWVuIHx8IGRvY0VsLm1zUmVxdWVzdEZ1bGxzY3JlZW47XHJcbiAgICAgICAgICAgIHZhciBjYW5jZWxGdWxsU2NyZWVuID0gZG9jLmV4aXRGdWxsc2NyZWVuIHx8IGRvYy5tb3pDYW5jZWxGdWxsU2NyZWVuIHx8IGRvYy53ZWJraXRFeGl0RnVsbHNjcmVlbiB8fCBkb2MubXNFeGl0RnVsbHNjcmVlbjtcclxuXHJcbiAgICAgICAgICAgIGlmKCFkb2MuZnVsbHNjcmVlbkVsZW1lbnQgJiYgIWRvYy5tb3pGdWxsU2NyZWVuRWxlbWVudCAmJiAhZG9jLndlYmtpdEZ1bGxzY3JlZW5FbGVtZW50ICYmICFkb2MubXNGdWxsc2NyZWVuRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdEZ1bGxTY3JlZW4uY2FsbChkb2NFbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYW5jZWxGdWxsU2NyZWVuLmNhbGwoZG9jKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2NcclxuICogQGNsYXNzICAgICAgIENvbmZpZ1Byb3h5XHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC5tb2RlbC5wcm94eS5Db25maWdQcm94eScsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLlByb3h5XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvLyBEYXRhXHJcbiAgICAgICAgZ2FtZUNvbmZpZ1ZPOiBudWxsLFxyXG4gICAgICAgIHVpQ29uZmlnVk86IG51bGwsXHJcblxyXG4gICAgICAgIG9uUmVnaXN0ZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lQ29uZmlnVk8gPSBuZXcgc2xvdC5tb2RlbC52by5HYW1lQ29uZmlnVk8oKTtcclxuICAgICAgICAgICAgdGhpcy51aUNvbmZpZ1ZPID0gbmV3IHNsb3QubW9kZWwudm8uVUlDb25maWdWTygpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBOQU1FOiBcIkNvbmZpZ1Byb3h5XCJcclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2NcclxuICogQGNsYXNzICAgICAgIExvYWRlclByb3h5XHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC5tb2RlbC5wcm94eS5Mb2FkZXJQcm94eScsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLlByb3h5XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBsb2FkZXI6IG51bGwsXHJcbiAgICAgICAgc291bmQ6IG51bGwsXHJcblxyXG4gICAgICAgIGdyYXBoaWNzTG9hZGVkOiBudWxsLFxyXG4gICAgICAgIHNvdW5kc0xvYWRlZDogbnVsbCxcclxuXHJcbiAgICAgICAgb25SZWdpc3RlcjogZnVuY3Rpb24oKXtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBsb2FkQXNzZXRzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkZXIgPSBuZXcgUElYSS5sb2FkZXJzLkxvYWRlcihcIlwiLDMpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRlci5hZGQoJ2JnJywgJ2Fzc2V0cy9iYWNrZ3JvdW5kLmpwZycpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5sb2FkZXIuYWRkKCdzMScsICdhc3NldHMvc25vd2ZsYWtlLnBuZycpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRlci5hZGQoJ3MyJywgJ2Fzc2V0cy9zdW4ucG5nJyk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGVyLmFkZCgnczMnLCAnYXNzZXRzL3NhbmRnbGFzcy5wbmcnKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkZXIuYWRkKCdzNCcsICdhc3NldHMvdmljdG9yeS5wbmcnKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkZXIuYWRkKCdzNScsICdhc3NldHMvYS5wbmcnKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkZXIuYWRkKCdzNicsICdhc3NldHMvay5wbmcnKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkZXIuYWRkKCdzNycsICdhc3NldHMvcS5wbmcnKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkZXIuYWRkKCdzOCcsICdhc3NldHMvai5wbmcnKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubG9hZGVyLmFkZCgnc3BpbicsICdhc3NldHMvc3Bpbi5wbmcnKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkZXIuYWRkKCdzcGluX2Rpc2FibGVkJywgJ2Fzc2V0cy9zcGluX2Rpc2FibGVkLnBuZycpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5sb2FkZXIuYWRkKCd3aW4nLCAnYXNzZXRzL3dpbi5wbmcnKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkZXIuYWRkKCdiYWxhbmNlJywgJ2Fzc2V0cy9iYWxhbmNlLnBuZycpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5sb2FkZXIuYWRkKCdiZXQnLCAnYXNzZXRzL2JldC5wbmcnKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkZXIuYWRkKCdiZXRfbWludXMnLCAnYXNzZXRzL2JldF9taW51cy5wbmcnKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkZXIuYWRkKCdiZXRfbWludXNfZGlzYWJsZWQnLCAnYXNzZXRzL2JldF9taW51c19kaXNhYmxlZC5wbmcnKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkZXIuYWRkKCdiZXRfcGx1cycsICdhc3NldHMvYmV0X3BsdXMucG5nJyk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGVyLmFkZCgnYmV0X3BsdXNfZGlzYWJsZWQnLCAnYXNzZXRzL2JldF9wbHVzX2Rpc2FibGVkLnBuZycpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5sb2FkZXIub24oXCJwcm9ncmVzc1wiLCB0aGlzLm9uR3JhcGhpY3NMb2FkUHJvZ3Jlc3MuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGVyLmxvYWQodGhpcy5vbkdyYXBoaWNzTG9hZENvbXBsZXRlLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zb3VuZCA9IG5ldyBIb3dsKHtcclxuICAgICAgICAgICAgICAgIHNyYzogW1wiYXNzZXRzL3NvdW5kcy5tcDNcIl0sXHJcbiAgICAgICAgICAgICAgICBzcHJpdGU6IHtcclxuICAgICAgICAgICAgICAgICAgICBiZXQ6IFswLCAzNzBdLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwaW46IFszNzAsIDIyMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgd2luX3MxOiBbMzk0MCwgMTIwMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgd2luX3MyOiBbNTkwLCAxNDAwXSxcclxuICAgICAgICAgICAgICAgICAgICB3aW5fczM6IFs1OTgwLCAxMDYwXSxcclxuICAgICAgICAgICAgICAgICAgICB3aW5fczQ6IFsyMTEwLCAxNjMwXSxcclxuICAgICAgICAgICAgICAgICAgICB3aW5fcm95YWw6IFs3MDQwLCA3MjBdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zb3VuZC5vbihcImxvYWRcIiwgdGhpcy5vblNvdW5kc0xvYWRDb21wbGV0ZS5iaW5kKHRoaXMpKVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uU291bmRzTG9hZENvbXBsZXRlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLnNvdW5kc0xvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZEFzc2V0c0xvYWRlZE5vdGUoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvbkdyYXBoaWNzTG9hZENvbXBsZXRlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLmdyYXBoaWNzTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zZW5kQXNzZXRzTG9hZGVkTm90ZSgpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNlbmRBc3NldHNMb2FkZWROb3RlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmdyYXBoaWNzTG9hZGVkICYmIHRoaXMuc291bmRzTG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oXHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdC5BcHBDb25zdGFudHMuQVNTRVRTX0xPQURFRCxcclxuICAgICAgICAgICAgICAgICAgICB7cmVzb3VyY2VzOiB0aGlzLmxvYWRlci5yZXNvdXJjZXMsIHNvdW5kOiB0aGlzLnNvdW5kfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uR3JhcGhpY3NMb2FkUHJvZ3Jlc3M6IGZ1bmN0aW9uKGxvYWRlciwgZmlsZSl7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6IFwiTG9hZGVyUHJveHlcIlxyXG4gICAgfVxyXG4pOyIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBTZXJ2ZXJQcm94eVxyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3QubW9kZWwucHJveHkuU2VydmVyUHJveHknLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5Qcm94eVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLy8gRGF0YVxyXG4gICAgICAgIHJlc3VsdFZPOiBudWxsLFxyXG5cclxuICAgICAgICAvLyBTZXJ2aWNlc1xyXG4gICAgICAgIHNlcnZlcjogbnVsbCxcclxuXHJcbiAgICAgICAgb25SZWdpc3RlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlc3VsdFZPID0gbmV3IHNsb3QubW9kZWwudm8uUmVzdWx0Vk8oKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2VydmVyID0gbmV3IHNsb3QubW9kZWwucHJveHkuc2VydmljZS5TZXJ2ZXJTZXJ2aWNlKCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3BpbjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VydmVyLmxvYWRTcGluUmVzdWx0KHRoaXMub25SZXN1bHQuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25SZXN1bHQ6IGZ1bmN0aW9uKHJlc3VsdCl7XHJcbiAgICAgICAgICAgIHRoaXMucmVzdWx0Vk8udXBkYXRlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihzbG90LkFwcENvbnN0YW50cy5TUElOX1JFU1VMVCwgdGhpcy5yZXN1bHRWTyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBOQU1FOiBcIlNlcnZlclByb3h5XCJcclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2NcclxuICogQGNsYXNzICAgICAgIFdpbmRvd1NpemVQcm94eVxyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3QubW9kZWwucHJveHkuV2luZG93U2l6ZVByb3h5JyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuUHJveHlcclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIC8vIERhdGFcclxuICAgICAgICB3aW5kb3dTaXplVk86IG51bGwsXHJcblxyXG4gICAgICAgIG9uUmVnaXN0ZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy53aW5kb3dTaXplVk8gPSBuZXcgc2xvdC5tb2RlbC52by5XaW5kb3dTaXplVk8od2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT3JpZW50YXRpb246IFwiICsgdGhpcy53aW5kb3dTaXplVk8ub3JpZW50YXRpb24pO1xyXG5cclxuICAgICAgICAgICAgaWYod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLm9uUmVzaXplLmJpbmQodGhpcyksIHRydWUpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmKHdpbmRvdy5hdHRhY2hFdmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hdHRhY2hFdmVudCgnb25yZXNpemUnLCB0aGlzLm9uUmVzaXplLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25SZXNpemU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoaXMud2luZG93U2l6ZVZPLnVwZGF0ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcclxuICAgICAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKHNsb3QuQXBwQ29uc3RhbnRzLldJTkRPV19SRVNJWkVELCB0aGlzLndpbmRvd1NpemVWTyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6IFwiV2luZG93U2l6ZVByb3h5XCJcclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2NcclxuICogQGNsYXNzICAgICAgIEdhbWVDb25maWdWT1xyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3QubW9kZWwudm8uR2FtZUNvbmZpZ1ZPJ1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgbnVtUmVlbHM6IDUsXHJcbiAgICAgICAgbnVtUm93czogMyxcclxuICAgICAgICBudW1TeW1ib2xzOiA4LFxyXG4gICAgICAgIG51bUxpbmVzOiA1LFxyXG4gICAgICAgIHJlZWxzOlxyXG4gICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICBbMSw1LDIsMSw2LDUsOCw1LDEsMiwzLDcsNCw1LDgsMSw0LDMsMiw1LDZdLFxyXG4gICAgICAgICAgICAgICAgWzUsMSw2LDMsNyw4LDEsMywyLDQsNiw4LDUsNCw1LDMsOCw3LDUsNCwxLDcsNCw4LDRdLFxyXG4gICAgICAgICAgICAgICAgWzgsNCwxLDMsMiw2LDcsMiwzLDQsMSw1LDYsNyw4LDIsNSw0LDMsMSwyLDcsNiw3LDEsNCwzLDIsNF0sXHJcbiAgICAgICAgICAgICAgICBbMSw3LDQsMiwzLDgsNCwzLDIsNSw2LDcsMiwzLDQsNSw4LDEsMiw2LDIsNCwyLDYsMyw3LDgsNCw2LDIsMywxLDIsNSw2LDMsNF0sXHJcbiAgICAgICAgICAgICAgICBbOCw1LDFdXHJcbiAgICAgICAgICAgICAgICAvL1s0LDRdLFxyXG4gICAgICAgICAgICAgICAgLy9bNCw0XSxcclxuICAgICAgICAgICAgICAgIC8vWzQsNF0sXHJcbiAgICAgICAgICAgICAgICAvL1sxLDIsNCw0XSxcclxuICAgICAgICAgICAgICAgIC8vWzEsMiw0LDRdXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgcGF5dGFibGU6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcIjFcIjpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCIzXCI6IDI1MCxcclxuICAgICAgICAgICAgICAgIFwiNFwiOiA1MDAsXHJcbiAgICAgICAgICAgICAgICBcIjVcIjogMTAwMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIjJcIjpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCIzXCI6IDIwMCxcclxuICAgICAgICAgICAgICAgIFwiNFwiOiA0NTAsXHJcbiAgICAgICAgICAgICAgICBcIjVcIjogODAwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiM1wiOlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcIjNcIjogMTUwLFxyXG4gICAgICAgICAgICAgICAgXCI0XCI6IDQwMCxcclxuICAgICAgICAgICAgICAgIFwiNVwiOiA3MDBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCI0XCI6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiM1wiOiAxMDAsXHJcbiAgICAgICAgICAgICAgICBcIjRcIjogMzUwLFxyXG4gICAgICAgICAgICAgICAgXCI1XCI6IDYwMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIjVcIjpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCIzXCI6IDkwLFxyXG4gICAgICAgICAgICAgICAgXCI0XCI6IDMwMCxcclxuICAgICAgICAgICAgICAgIFwiNVwiOiA3MDBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCI2XCI6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiM1wiOiA4MCxcclxuICAgICAgICAgICAgICAgIFwiNFwiOiAyNTAsXHJcbiAgICAgICAgICAgICAgICBcIjVcIjogNjAwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiN1wiOlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcIjNcIjogNzAsXHJcbiAgICAgICAgICAgICAgICBcIjRcIjogMjAwLFxyXG4gICAgICAgICAgICAgICAgXCI1XCI6IDUwMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIjhcIjpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCIzXCI6IDYwLFxyXG4gICAgICAgICAgICAgICAgXCI0XCI6IDEwMCxcclxuICAgICAgICAgICAgICAgIFwiNVwiOiA0MDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGVub21pbmF0aW9uczpcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgMC4yNSwgMC41MCwgMSwgMiwgNSwgMTBcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICBkZWZhdWx0RGVub21pbmF0aW9uOiAyLFxyXG4gICAgICAgIGxpbmVzOlxyXG4gICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICBbMSwgMSwgMSwgMSwgMV0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMiwgMiwgMiwgMiwgMl0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMSwgMiwgMSwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMiwgMSwgMCwgMSwgMl1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICBtaW5PYWs6IDMsXHJcbiAgICAgICAgaHBTeW1ib2xzOiBbMSwyLDMsNF0sXHJcbiAgICAgICAgcm95YWxzOiBbNSw2LDcsOF0sXHJcblxyXG4gICAgICAgIC8vIFJldHVybnMgYXJyYXkgd2l0aCBhbGwgcG9zc2libGUgc3ltYm9sc1xyXG4gICAgICAgIGdldFN5bWJvbHM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciBzeW1ib2xzID0gW107XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDE7IGkgPD0gdGhpcy5udW1TeW1ib2xzOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgc3ltYm9scy5wdXNoKFwic1wiICsgaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHN5bWJvbHM7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaXNSb3lhbFN5bWJvbDogZnVuY3Rpb24oc3ltYm9sSUQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yb3lhbHMuaW5kZXhPZihzeW1ib2xJRCkgIT0gLTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBOQU1FOiBcIkdhbWVDb25maWdWT1wiXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBSZXN1bHRWT1xyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3QubW9kZWwudm8uUmVzdWx0Vk8nXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBtYXRyaXg6XHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIFsxLDQsNV0sXHJcbiAgICAgICAgICAgICAgICBbNSw2LDNdLFxyXG4gICAgICAgICAgICAgICAgWzEsMiw4XSxcclxuICAgICAgICAgICAgICAgIFszLDcsNl0sXHJcbiAgICAgICAgICAgICAgICBbMiw2LDVdXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgYmFsYW5jZTogMTAwMCxcclxuICAgICAgICB0b3RhbFdpbjogMCxcclxuICAgICAgICBudW1XaW5zOiAwLFxyXG4gICAgICAgIHdpbnM6IG51bGwsXHJcblxyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24ocmVzdWx0KXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcclxuICAgICAgICAgICAgdGhpcy5tYXRyaXggPSByZXN1bHQubWF0cml4O1xyXG4gICAgICAgICAgICB0aGlzLmJhbGFuY2UgPSByZXN1bHQuYmFsYW5jZTtcclxuICAgICAgICAgICAgdGhpcy50b3RhbFdpbiA9IHJlc3VsdC50b3RhbFdpbjtcclxuICAgICAgICAgICAgdGhpcy5udW1XaW5zID0gcmVzdWx0Lm51bVdpbnM7XHJcbiAgICAgICAgICAgIHRoaXMud2lucyA9IHJlc3VsdC53aW5zO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdldFN5bWJvbE1hdHJpeDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWF0cml4Lm1hcChmdW5jdGlvbihfLCBpbmRleCwgbWF0cml4KXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtYXRyaXhbaW5kZXhdLm1hcChmdW5jdGlvbihzeW1ib2xJRCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwic1wiICsgc3ltYm9sSUQ7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6IFwiUmVzdWx0Vk9cIlxyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgVUlDb25maWdWT1xyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3QubW9kZWwudm8uVUlDb25maWdWTydcclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIHN5bWJvbFdpZHRoOiAxMzAsXHJcbiAgICAgICAgc3ltYm9sSGVpZ2h0OiAxMzAsXHJcblxyXG4gICAgICAgIHJlZWxIU2VwYXJhdG9yOiAxMCxcclxuICAgICAgICByZWVsVlNlcGFyYXRvcjogMTAsXHJcbiAgICAgICAgcmVlbEhQYWRkaW5nOiAyMCxcclxuICAgICAgICByZWVsVlBhZGRpbmc6IDIwLFxyXG5cclxuICAgICAgICBjdXJyZW5jeTogXCIkXCIsXHJcblxyXG4gICAgICAgIHJlZWxTcGluRGVsYXk6IDAuMSxcclxuICAgICAgICBtaW5TcGluRHVyYXRpb246IDIsXHJcblxyXG4gICAgICAgIGxpbmVQb2ludHM6XHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIFtbMzAsMjI1XSxbNzAwLDIyNV1dLFxyXG4gICAgICAgICAgICAgICAgW1szMCw4NV0sWzcwMCw4NV1dLFxyXG4gICAgICAgICAgICAgICAgW1szMCwzNjVdLFs3MDAsMzY1XV0sXHJcbiAgICAgICAgICAgICAgICBbWzMwLDMwXSxbMzY1LDM2NV0sWzcwMCwzMF1dLFxyXG4gICAgICAgICAgICAgICAgW1szMCw0MjBdLFszNjUsODVdLFs3MDAsNDIwXV0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgd2luQW5ub3VuY2VEZWxheTogMS41LFxyXG4gICAgICAgIHJlcGVhdFdpbnM6IDIsXHJcbiAgICAgICAgcmVzcG9uc2l2ZVNjYWxlOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgd2luOlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB4OiAwLjM3NSxcclxuICAgICAgICAgICAgICAgIHk6IDAuMDEsXHJcbiAgICAgICAgICAgICAgICB3OiAwLjI1LFxyXG4gICAgICAgICAgICAgICAgaDogMC4xMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0eHRXaW46XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHg6IDAuNSxcclxuICAgICAgICAgICAgICAgIHk6IDAuNyxcclxuICAgICAgICAgICAgICAgIGZvbnQ6IDAuNFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBiZXQ6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHg6IDAuMDQ1LFxyXG4gICAgICAgICAgICAgICAgeTogMC44OSxcclxuICAgICAgICAgICAgICAgIHc6IDAuMjUsXHJcbiAgICAgICAgICAgICAgICBoOiAwLjEwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHR4dEJldDpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgeDogMC41LFxyXG4gICAgICAgICAgICAgICAgeTogMC43LFxyXG4gICAgICAgICAgICAgICAgZm9udDogMC40XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJhbGFuY2U6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHg6IDAuMzc1LFxyXG4gICAgICAgICAgICAgICAgeTogMC44OSxcclxuICAgICAgICAgICAgICAgIHc6IDAuMjUsXHJcbiAgICAgICAgICAgICAgICBoOiAwLjEwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHR4dEJhbGFuY2U6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHg6IDAuNSxcclxuICAgICAgICAgICAgICAgIHk6IDAuNyxcclxuICAgICAgICAgICAgICAgIGZvbnQ6IDAuNFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzcGluOlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB4OiAwLjcwNSxcclxuICAgICAgICAgICAgICAgIHk6IDAuODksXHJcbiAgICAgICAgICAgICAgICB3OiAwLjI1LFxyXG4gICAgICAgICAgICAgICAgaDogMC4xMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZWVsQXJlYTpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgeDogMC4wNDUsXHJcbiAgICAgICAgICAgICAgICB5OiAwLjEyNSxcclxuICAgICAgICAgICAgICAgIHc6IDAuOTEsXHJcbiAgICAgICAgICAgICAgICBoOiAwLjc1XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZWVsQXJlYUJHQ29sb3I6IDB4RkZGRkZGLFxyXG4gICAgICAgIHJlZWxCR0NvbG9yOiAweDJCNkYxQSxcclxuXHJcbiAgICAgICAgd2luTGluZVdpZHRoOiA1LFxyXG4gICAgICAgIHdpbkxpbmVDb2xvcjogMHhBODFDMURcclxuICAgIH0sXHJcblxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBOQU1FOiBcIlVJQ29uZmlnVk9cIlxyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgV2luZG93U2l6ZVZPXHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC5tb2RlbC52by5XaW5kb3dTaXplVk8nLFxyXG4gICAgICAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbih3LCBoKXtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGUodywgaCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgd2lkdGg6IG51bGwsXHJcbiAgICAgICAgaGVpZ2h0OiBudWxsLFxyXG4gICAgICAgIG9yaWVudGF0aW9uOiBudWxsLFxyXG5cclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uKHcsIGgpe1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdztcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBoO1xyXG4gICAgICAgICAgICB0aGlzLm9yaWVudGF0aW9uID0gc2xvdC5tb2RlbC5saWIuVXRpbHMuZ2V0T3JpZW50YXRpb24odywgaCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6IFwiV2luZG93U2l6ZVZPXCJcclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2NcclxuICogQGNsYXNzICAgICAgIFNlcnZlclNlcnZpY2VcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90Lm1vZGVsLnByb3h5LnNlcnZpY2UuU2VydmVyU2VydmljZScsXHJcbiAgICAgICAgY29uc3RydWN0b3I6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUNvbmZpZ1ZPID0gbmV3IHNsb3QubW9kZWwudm8uR2FtZUNvbmZpZ1ZPKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgY2FsbGJhY2s6IG51bGwsXHJcbiAgICAgICAgZ2FtZUNvbmZpZ1ZPOiBudWxsLFxyXG4gICAgICAgIGJldEFtb3VudDogbnVsbCxcclxuXHJcbiAgICAgICAgbG9hZFNwaW5SZXN1bHQ6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLmJldEFtb3VudCA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICAgICAgc2V0VGltZW91dCh0aGlzLnNlbmRTcGluUmVzdWx0LmJpbmQodGhpcyksIDEwMDApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNlbmRTcGluUmVzdWx0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrKHRoaXMuY2FsY3VsYXRlU3BpblJlc3VsdCgpKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjYWxjdWxhdGVTcGluUmVzdWx0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XHJcbiAgICAgICAgICAgIHZhciByZWVscyA9IHRoaXMuZ2FtZUNvbmZpZ1ZPLnJlZWxzO1xyXG4gICAgICAgICAgICB2YXIgcmVlbE1hdHJpeCA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpPTA7IGk8dGhpcy5nYW1lQ29uZmlnVk8ubnVtUmVlbHM7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlZWxTdG9wUG9zID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcmVlbHNbaV0ubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIHJlZWxNYXRyaXhbaV0gPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCB0aGlzLmdhbWVDb25maWdWTy5udW1Sb3dzOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZWxNYXRyaXhbaV1bal0gPSB0aGlzLmdldFN5bWJvbEF0KHJlZWxzW2ldLCByZWVsU3RvcFBvcyArIGopO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlZWxNYXRyaXggPSB0aGlzLmZvcmNlUmVzdWx0KHJlZWxNYXRyaXgpO1xyXG4gICAgICAgICAgICB2YXIgbGluZVN5bWJvbHMgPSB0aGlzLmdldExpbmVTeW1ib2xzKHJlZWxNYXRyaXgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHdpbnMgPSB0aGlzLmdldFdpbnMobGluZVN5bWJvbHMpO1xyXG5cclxuICAgICAgICAgICAgcmVzdWx0Lm1hdHJpeCA9IHJlZWxNYXRyaXg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5iYWxhbmNlID0gMTAwMDtcclxuICAgICAgICAgICAgcmVzdWx0Lm51bVdpbnMgPSB3aW5zLmxlbmd0aDtcclxuICAgICAgICAgICAgcmVzdWx0LnRvdGFsV2luID0gd2lucy5yZWR1Y2UoZnVuY3Rpb24ocHYsIGN2KXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwdiArIGN2LndpbkFtb3VudDtcclxuICAgICAgICAgICAgfSwgMCk7XHJcbiAgICAgICAgICAgIHJlc3VsdC53aW5zID0gd2lucztcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0U3ltYm9sQXQ6IGZ1bmN0aW9uKHJlZWwsIHBvcyl7XHJcbiAgICAgICAgICAgIGlmKHBvcyA+IHJlZWwubGVuZ3RoIC0gMSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVlbFtwb3MgLSByZWVsLmxlbmd0aF07XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlZWxbcG9zXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdldExpbmVTeW1ib2xzOiBmdW5jdGlvbihtYXRyaXgpe1xyXG4gICAgICAgICAgICB2YXIgbGluZXMgPSB0aGlzLmdhbWVDb25maWdWTy5saW5lcztcclxuICAgICAgICAgICAgdmFyIGxpbmVTeW1ib2xzID0gW107XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmdhbWVDb25maWdWTy5udW1MaW5lczsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxpbmVTeW1ib2xzW2ldID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGogPSAwOyBqIDwgdGhpcy5nYW1lQ29uZmlnVk8ubnVtUmVlbHM7IGorKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZVN5bWJvbHNbaV1bal0gPSBtYXRyaXhbal1bbGluZXNbaV1bal1dO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBsaW5lU3ltYm9scztcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXRXaW5zOiBmdW5jdGlvbihsaW5lU3ltYm9scyl7XHJcbiAgICAgICAgICAgIHZhciB3aW5zID0gW107XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmdhbWVDb25maWdWTy5udW1MaW5lczsgaSsrKXtcclxuICAgICAgICAgICAgICAgIHZhciBvYWsgPSAxO1xyXG4gICAgICAgICAgICAgICAgZm9yKHZhciBqID0gMTsgaiA8IHRoaXMuZ2FtZUNvbmZpZ1ZPLm51bVJlZWxzOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGxpbmVTeW1ib2xzW2ldW2pdID09IGxpbmVTeW1ib2xzW2ldW2otMV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYWsrKztcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYob2FrID49IHRoaXMuZ2FtZUNvbmZpZ1ZPLm1pbk9haykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB3aW5uaW5nU3ltYm9sID0gbGluZVN5bWJvbHNbaV1bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgd2lucy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lTnVtYmVyOiBpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2FrOiBvYWssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzeW1ib2w6IHdpbm5pbmdTeW1ib2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5BbW91bnQ6IHRoaXMuZ2FtZUNvbmZpZ1ZPLnBheXRhYmxlW3dpbm5pbmdTeW1ib2xdW29ha10gKiB0aGlzLmJldEFtb3VudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gd2lucztcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBmb3JjZVJlc3VsdDogZnVuY3Rpb24obWF0cml4KXtcclxuICAgICAgICAgICAgLy9yZXR1cm4gbWF0cml4O1xyXG4gICAgICAgICAgICBtYXRyaXggPSBbWzEsMiwzXSxbMSwyLDNdLFsxLDIsM10sWzEsMiwzXSxbMSwyLDNdXTtcclxuICAgICAgICAgICAgbWF0cml4ID0gW1s0LDUsNl0sWzQsNSw2XSxbNCw1LDZdLFs0LDUsNl0sWzQsNSw2XV07XHJcbiAgICAgICAgICAgIG1hdHJpeCA9IFtbNyw4LDFdLFs3LDgsMl0sWzcsOCwzXSxbNyw4LDRdLFs3LDgsNV1dO1xyXG4gICAgICAgICAgICByZXR1cm4gbWF0cml4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogXCJTZXJ2ZXJTZXJ2aWNlXCJcclxuICAgIH1cclxuKTsiLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgUHJlcENvbnRyb2xsZXJDb21tYW5kXHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC5jb250cm9sbGVyLmNvbW1hbmQuUHJlcENvbnRyb2xsZXJDb21tYW5kJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuU2ltcGxlQ29tbWFuZFxyXG4gICAgfSxcclxuICBcclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvLyBSZWdpc3RlciBhbGwgY29tbWFuZHNcclxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAobm90ZSkgeyAgIFxyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3RlckNvbW1hbmQoc2xvdC5BcHBDb25zdGFudHMuV0lORE9XX1JFU0laRUQsIHNsb3QuY29udHJvbGxlci5jb21tYW5kLldpbmRvd1Jlc2l6ZUNvbW1hbmQpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3RlckNvbW1hbmQoc2xvdC5BcHBDb25zdGFudHMuU1BJTiwgc2xvdC5jb250cm9sbGVyLmNvbW1hbmQuU3BpbkNvbW1hbmQpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3RlckNvbW1hbmQoc2xvdC5BcHBDb25zdGFudHMuU1BJTl9FTkQsIHNsb3QuY29udHJvbGxlci5jb21tYW5kLlNwaW5FbmRDb21tYW5kKTtcclxuICAgICAgICB9XHJcbiAgICB9ICAgIFxyXG4pOyIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBQcmVwTW9kZWxDb21tYW5kXHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC5jb250cm9sbGVyLmNvbW1hbmQuUHJlcE1vZGVsQ29tbWFuZCcsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLlNpbXBsZUNvbW1hbmRcclxuICAgIH0sXHJcbiAgXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLy8gUmVnaXN0ZXIgYWxsIFByb3h5c1xyXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uIChub3RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjYWRlLnJlZ2lzdGVyUHJveHkobmV3IHNsb3QubW9kZWwucHJveHkuTG9hZGVyUHJveHkoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjYWRlLnJlZ2lzdGVyUHJveHkobmV3IHNsb3QubW9kZWwucHJveHkuV2luZG93U2l6ZVByb3h5KCkpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3RlclByb3h5KG5ldyBzbG90Lm1vZGVsLnByb3h5LkNvbmZpZ1Byb3h5KCkpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3RlclByb3h5KG5ldyBzbG90Lm1vZGVsLnByb3h5LlNlcnZlclByb3h5KCkpO1xyXG4gICAgICAgIH1cclxuICAgIH0gICAgXHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBQcmVwUGl4aUNvbW1hbmRcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LmNvbnRyb2xsZXIuY29tbWFuZC5QcmVwUGl4aUNvbW1hbmQnLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5TaW1wbGVDb21tYW5kXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAobm90ZSkge1xyXG4gICAgICAgICAgICBQWFJvb3QgPSBuZXcgUElYSS5Db250YWluZXIoKTtcclxuXHJcbiAgICAgICAgICAgIFBYUmVuZGVyZXIgPSBuZXcgUElYSS5hdXRvRGV0ZWN0UmVuZGVyZXIod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XHJcbiAgICAgICAgICAgIFBYUmVuZGVyZXIudmlldy5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG5cclxuICAgICAgICAgICAgUFhSb290LmludGVyYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgUFhSb290Lm9uKFwidGFwXCIsdGhpcy5zZXRGdWxsU2NyZWVuKTtcclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZVwiKS5hcHBlbmRDaGlsZChQWFJlbmRlcmVyLnZpZXcpO1xyXG5cclxuICAgICAgICAgICAgLy8gUmVuZGVyIGxvb3BcclxuICAgICAgICAgICAgd2luZG93LnJlbmRlckxvb3AgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgUFhSZW5kZXJlci5yZW5kZXIoUFhSb290KTtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh3aW5kb3cucmVuZGVyTG9vcCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHdpbmRvdy5yZW5kZXJMb29wKCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2V0RnVsbFNjcmVlbjogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYgKHNjcmVlbmZ1bGwuZW5hYmxlZCAmJiAhc2NyZWVuZnVsbC5pc0Z1bGxzY3JlZW4pIHtcclxuICAgICAgICAgICAgICAgIHNjcmVlbmZ1bGwucmVxdWVzdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2NcclxuICogQGNsYXNzICAgICAgIFByZXBWaWV3Q29tbWFuZFxyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUgKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LmNvbnRyb2xsZXIuY29tbWFuZC5QcmVwVmlld0NvbW1hbmQnLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5TaW1wbGVDb21tYW5kXHJcbiAgICB9LFxyXG4gXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKG5vdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJNZWRpYXRvcihuZXcgc2xvdC52aWV3Lm1lZGlhdG9yLkJHTWVkaWF0b3IoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjYWRlLnJlZ2lzdGVyTWVkaWF0b3IobmV3IHNsb3Qudmlldy5tZWRpYXRvci5SZWVsQ29udGFpbmVyTWVkaWF0b3IoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjYWRlLnJlZ2lzdGVyTWVkaWF0b3IobmV3IHNsb3Qudmlldy5tZWRpYXRvci5QYW5lbE1lZGlhdG9yKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3Rlck1lZGlhdG9yKG5ldyBzbG90LnZpZXcubWVkaWF0b3IuV2luQW5ub3VuY2VNZWRpYXRvcigpKTtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJNZWRpYXRvcihuZXcgc2xvdC52aWV3Lm1lZGlhdG9yLlNvdW5kUGxheWVyTWVkaWF0b3IoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgU3BpbkNvbW1hbmRcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LmNvbnRyb2xsZXIuY29tbWFuZC5TcGluQ29tbWFuZCcsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLlNpbXBsZUNvbW1hbmRcclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uIChub3RlKSB7XHJcbiAgICAgICAgICAgIHZhciBzZXJ2ZXIgPSB0aGlzLmZhY2FkZS5yZXRyaWV2ZVByb3h5KHNsb3QubW9kZWwucHJveHkuU2VydmVyUHJveHkuTkFNRSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihzbG90LkFwcENvbnN0YW50cy5TVE9QX1dJTl9BTk5PVU5DRU1FTlRTKTtcclxuXHJcbiAgICAgICAgICAgIHNlcnZlci5zcGluKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgU3BpbkVuZENvbW1hbmRcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LmNvbnRyb2xsZXIuY29tbWFuZC5TcGluRW5kQ29tbWFuZCcsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLlNpbXBsZUNvbW1hbmRcclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uIChub3RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihzbG90LkFwcENvbnN0YW50cy5TVEFSVF9XSU5fQU5OT1VOQ0VNRU5UUyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgU3RhcnR1cENvbW1hbmRcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LmNvbnRyb2xsZXIuY29tbWFuZC5TdGFydHVwQ29tbWFuZCcsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLk1hY3JvQ29tbWFuZFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTIFxyXG4gICAge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFN1YmNvbW1hbmRzIHRvIGhhbmRsZSBmYWNhZGUgcmVnaXN0cmF0aW9ucyBmb3JcclxuICAgICAgICAgKiBNb2RlbCwgVmlldyBhbmQgQ29udHJvbGxlclxyXG4gICAgICAgICAqIEFsc28gcnVucyBzdWIgY29tbWFuZCB0byBpbml0aWFsaXplIFBJWEkgZnJhbWV3b3JrXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaW5pdGlhbGl6ZU1hY3JvQ29tbWFuZDogZnVuY3Rpb24gKG5vdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRTdWJDb21tYW5kKHNsb3QuY29udHJvbGxlci5jb21tYW5kLlByZXBQaXhpQ29tbWFuZCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZFN1YkNvbW1hbmQoc2xvdC5jb250cm9sbGVyLmNvbW1hbmQuUHJlcENvbnRyb2xsZXJDb21tYW5kKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRTdWJDb21tYW5kKHNsb3QuY29udHJvbGxlci5jb21tYW5kLlByZXBNb2RlbENvbW1hbmQpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZFN1YkNvbW1hbmQoc2xvdC5jb250cm9sbGVyLmNvbW1hbmQuUHJlcFZpZXdDb21tYW5kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgV2luZG93UmVzaXplQ29tbWFuZFxyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3QuY29udHJvbGxlci5jb21tYW5kLldpbmRvd1Jlc2l6ZUNvbW1hbmQnLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5TaW1wbGVDb21tYW5kXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAobm90ZSkge1xyXG4gICAgICAgICAgICB2YXIgd2luZG93U2l6ZVZPID0gbm90ZS5nZXRCb2R5KCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHdpbmRvd1NpemVWTyk7XHJcbiAgICAgICAgICAgIFBYUmVuZGVyZXIucmVzaXplKHdpbmRvd1NpemVWTy53aWR0aCwgd2luZG93U2l6ZVZPLmhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgQkdcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LnZpZXcuY29tcG9uZW50LkJHJyxcclxuICAgICAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLy8gU3RhZ2UgTWVtYmVyc1xyXG4gICAgICAgIHN0YWdlOiBudWxsLFxyXG4gICAgICAgIGJnOiBudWxsLFxyXG5cclxuICAgICAgICAvLyBSZWZlcmVuY2VzXHJcbiAgICAgICAgT1JJRU5UQVRJT046IHNsb3QubW9kZWwuZW51bS5PUklFTlRBVElPTixcclxuXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGRyZW4oZGF0YS5yZXNvdXJjZXMpO1xyXG4gICAgICAgICAgICB0aGlzLnNldHVwVmlldyhkYXRhLndpbmRvd1NpemVWTyk7XHJcblxyXG4gICAgICAgICAgICBQWFJvb3QuYWRkQ2hpbGQodGhpcy5zdGFnZSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYWRkQ2hpbGRyZW46IGZ1bmN0aW9uKHJlc291cmNlcyl7XHJcbiAgICAgICAgICAgIHRoaXMuYmcgPSBuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLmJnLnRleHR1cmUpO1xyXG4gICAgICAgICAgICB0aGlzLmJnLmFuY2hvci5zZXQoMC41LDAuNSk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5iZyk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2V0dXBWaWV3OiBmdW5jdGlvbih3aW5kb3dTaXplVk8pe1xyXG4gICAgICAgICAgICAvLyBGaWxsIHNjcmVlblxyXG4gICAgICAgICAgICB2YXIgc2l6ZSA9IHNsb3QubW9kZWwubGliLlV0aWxzLmdldFNpemVUb0ZpbGxTY3JlZW4oXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6dGhpcy5iZy53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHRoaXMuYmcuaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOndpbmRvd1NpemVWTy53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHdpbmRvd1NpemVWTy5oZWlnaHRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYmcud2lkdGggPSBzaXplLndpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLmJnLmhlaWdodCA9IHNpemUuaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5iZy54ID0gd2luZG93U2l6ZVZPLndpZHRoLzI7XHJcbiAgICAgICAgICAgIHRoaXMuYmcueSA9IHdpbmRvd1NpemVWTy5oZWlnaHQvMjtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoYW5kbGVSZXNpemU6IGZ1bmN0aW9uKHdpbmRvd1NpemVWTyl7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dXBWaWV3KHdpbmRvd1NpemVWTyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdCRydcclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2NcclxuICogQGNsYXNzICAgICAgIFBhbmVsXHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC52aWV3LmNvbXBvbmVudC5QYW5lbCcsXHJcbiAgICAgICAgY29uc3RydWN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZSA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIC8vIFN0YWdlIE1lbWJlcnNcclxuICAgICAgICBzdGFnZTogbnVsbCxcclxuXHJcbiAgICAgICAgc3BpbjogbnVsbCxcclxuICAgICAgICBidG5TcGluOiBudWxsLFxyXG5cclxuICAgICAgICB3aW46IG51bGwsXHJcbiAgICAgICAgdHh0V2luOiBudWxsLFxyXG5cclxuICAgICAgICBiYWxhbmNlOiBudWxsLFxyXG4gICAgICAgIHR4dEJhbGFuY2U6IG51bGwsXHJcblxyXG4gICAgICAgIGJldDogbnVsbCxcclxuICAgICAgICBidG5CZXRQbHVzOiBudWxsLFxyXG4gICAgICAgIGJ0bkJldE1pbnVzOiBudWxsLFxyXG4gICAgICAgIHR4dEJldDogbnVsbCxcclxuXHJcbiAgICAgICAgY3VycmVuY3k6IG51bGwsXHJcbiAgICAgICAgZGVub21pbmF0aW9uczogbnVsbCxcclxuICAgICAgICBjdXJyZW50RGVub21pbmF0aW9uOiBudWxsLFxyXG5cclxuICAgICAgICByZXNwU2NhbGU6IG51bGwsXHJcblxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVuY3kgPSBkYXRhLnVpQ29uZmlnVk8uY3VycmVuY3k7XHJcbiAgICAgICAgICAgIHRoaXMucmVzcFNjYWxlID0gZGF0YS51aUNvbmZpZ1ZPLnJlc3BvbnNpdmVTY2FsZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGVub21pbmF0aW9ucyA9IGRhdGEuZ2FtZUNvbmZpZ1ZPLmRlbm9taW5hdGlvbnM7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudERlbm9taW5hdGlvbiA9IGRhdGEuZ2FtZUNvbmZpZ1ZPLmRlZmF1bHREZW5vbWluYXRpb247XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkcmVuKGRhdGEucmVzb3VyY2VzKTtcclxuICAgICAgICAgICAgdGhpcy5zZXR1cFZpZXcoZGF0YS53aW5kb3dTaXplVk8pO1xyXG5cclxuICAgICAgICAgICAgUFhSb290LmFkZENoaWxkKHRoaXMuc3RhZ2UpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFkZENoaWxkcmVuOiBmdW5jdGlvbihyZXNvdXJjZXMpe1xyXG4gICAgICAgICAgICAvLyBTcGluIGNvbXBvbmVudFxyXG4gICAgICAgICAgICB0aGlzLnNwaW4gPSBuZXcgUElYSS5Db250YWluZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5zcGluLmFkZENoaWxkKG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMuc3Bpbl9kaXNhYmxlZC50ZXh0dXJlKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc3Bpbi5hZGRDaGlsZCh0aGlzLmJ0blNwaW4gPSBuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLnNwaW4udGV4dHVyZSkpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuc3Bpbik7XHJcblxyXG4gICAgICAgICAgICAvLyBXaW4gY29tcG9uZW50ID09PlxyXG4gICAgICAgICAgICB0aGlzLndpbiA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xyXG4gICAgICAgICAgICB0aGlzLndpbi5hZGRDaGlsZChuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLndpbi50ZXh0dXJlKSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnR4dFdpbiA9IG5ldyBQSVhJLlRleHQoKTtcclxuICAgICAgICAgICAgdGhpcy50eHRXaW4uc3R5bGUgPSB7Zm9udFNpemU6IDMwLCBhbGlnbjogJ2NlbnRlcid9O1xyXG4gICAgICAgICAgICB0aGlzLnR4dFdpbi5hbmNob3Iuc2V0KDAuNSwgMC41KTtcclxuICAgICAgICAgICAgdGhpcy50eHRXaW4ueCA9IDEwMDtcclxuICAgICAgICAgICAgdGhpcy50eHRXaW4ueSA9IDUyO1xyXG5cclxuICAgICAgICAgICAgdGhpcy53aW4uYWRkQ2hpbGQodGhpcy50eHRXaW4pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLndpbik7XHJcbiAgICAgICAgICAgIC8vIFdpbiBjb21wb25lbnQgPD09XHJcblxyXG4gICAgICAgICAgICAvLyBCYWxhbmNlIGNvbXBvbmVudCA9PT5cclxuICAgICAgICAgICAgdGhpcy5iYWxhbmNlID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYmFsYW5jZS5hZGRDaGlsZChuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLmJhbGFuY2UudGV4dHVyZSkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50eHRCYWxhbmNlID0gbmV3IFBJWEkuVGV4dCgpO1xyXG4gICAgICAgICAgICB0aGlzLnR4dEJhbGFuY2Uuc3R5bGUgPSB7Zm9udFNpemU6IDMwLCBhbGlnbjogJ2NlbnRlcid9O1xyXG4gICAgICAgICAgICB0aGlzLnR4dEJhbGFuY2UuYW5jaG9yLnNldCgwLjUsIDAuNSk7XHJcbiAgICAgICAgICAgIHRoaXMudHh0QmFsYW5jZS54ID0gMTAwO1xyXG4gICAgICAgICAgICB0aGlzLnR4dEJhbGFuY2UueSA9IDUyO1xyXG4gICAgICAgICAgICB0aGlzLmJhbGFuY2UuYWRkQ2hpbGQodGhpcy50eHRCYWxhbmNlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5iYWxhbmNlKTtcclxuICAgICAgICAgICAgLy8gPD09IEJhbGFuY2UgY29tcG9uZW50XHJcblxyXG4gICAgICAgICAgICAvLyBCZXQgY29tcG9uZW50ID09PT5cclxuICAgICAgICAgICAgdGhpcy5iZXQgPSBuZXcgUElYSS5Db250YWluZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5iZXQuYWRkQ2hpbGQobmV3IFBJWEkuU3ByaXRlKHJlc291cmNlcy5iZXRfbWludXNfZGlzYWJsZWQudGV4dHVyZSkpO1xyXG4gICAgICAgICAgICB0aGlzLmJldC5hZGRDaGlsZCh0aGlzLmJ0bkJldE1pbnVzID0gbmV3IFBJWEkuU3ByaXRlKHJlc291cmNlcy5iZXRfbWludXMudGV4dHVyZSkpO1xyXG4gICAgICAgICAgICB2YXIgYmV0U3ByaXRlID0gbmV3IFBJWEkuU3ByaXRlKHJlc291cmNlcy5iZXQudGV4dHVyZSk7XHJcbiAgICAgICAgICAgIGJldFNwcml0ZS54ICs9IHRoaXMuYnRuQmV0TWludXMud2lkdGggKyAyO1xyXG4gICAgICAgICAgICB0aGlzLmJldC5hZGRDaGlsZChiZXRTcHJpdGUpO1xyXG4gICAgICAgICAgICB2YXIgYmV0UGx1c0RTcHJpdGUgPSBuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLmJldF9wbHVzX2Rpc2FibGVkLnRleHR1cmUpO1xyXG4gICAgICAgICAgICBiZXRQbHVzRFNwcml0ZS54ID0gYmV0U3ByaXRlLnggKyBiZXRTcHJpdGUud2lkdGggKyAyO1xyXG4gICAgICAgICAgICB0aGlzLmJldC5hZGRDaGlsZChiZXRQbHVzRFNwcml0ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYmV0LmFkZENoaWxkKHRoaXMuYnRuQmV0UGx1cyA9IG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMuYmV0X3BsdXMudGV4dHVyZSkpO1xyXG4gICAgICAgICAgICB0aGlzLmJ0bkJldFBsdXMueCA9IGJldFBsdXNEU3ByaXRlLng7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnR4dEJldCA9IG5ldyBQSVhJLlRleHQoKTtcclxuICAgICAgICAgICAgdGhpcy50eHRCZXQuc3R5bGUgPSB7Zm9udFNpemU6IDMwLCBhbGlnbjogJ2NlbnRlcid9O1xyXG4gICAgICAgICAgICB0aGlzLnR4dEJldC5hbmNob3Iuc2V0KDAuNSwgMC41KTtcclxuICAgICAgICAgICAgdGhpcy50eHRCZXQueCA9IGJldFNwcml0ZS54ICsgNjg7XHJcbiAgICAgICAgICAgIHRoaXMudHh0QmV0LnkgPSBiZXRTcHJpdGUueSArIDUyO1xyXG4gICAgICAgICAgICB0aGlzLmJldC5hZGRDaGlsZCh0aGlzLnR4dEJldCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuYmV0KTtcclxuICAgICAgICAgICAgLy8gPD09PSBCZXQgY29tcG9uZW50XHJcblxyXG4gICAgICAgICAgICAvLyBCdXR0b25zXHJcbiAgICAgICAgICAgIHRoaXMuYnRuU3Bpbi5pbnRlcmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuU3Bpbi5vbihzbG90LnZpZXcuZXZlbnQuVmlld0V2ZW50cy5DTElDSywgdGhpcy5vblNwaW5DbGljay5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgdGhpcy5idG5CZXRNaW51cy5pbnRlcmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuQmV0TWludXMub24oc2xvdC52aWV3LmV2ZW50LlZpZXdFdmVudHMuQ0xJQ0ssIHRoaXMub25CZXRNaW51c0NsaWNrLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICB0aGlzLmJ0bkJldFBsdXMuaW50ZXJhY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmJ0bkJldFBsdXMub24oc2xvdC52aWV3LmV2ZW50LlZpZXdFdmVudHMuQ0xJQ0ssIHRoaXMub25CZXRQbHVzQ2xpY2suYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBJbml0aWFsIHZhbHVlc1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUJldCgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5yZXNUeHQgPSBuZXcgUElYSS5UZXh0KCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVzVHh0LnN0eWxlID0ge2ZvbnRTaXplOiAxNSwgYWxpZ246ICdsZWZ0Jywgd29yZHdyYXA6IHRydWUsc3Ryb2tlOjB4RkZGRkZGLHN0cm9rZVRoaWNrbmVzczoyfTtcclxuICAgICAgICAgICAgUFhSb290LmFkZENoaWxkKHRoaXMucmVzVHh0KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZXR1cFZpZXc6IGZ1bmN0aW9uKHdpbmRvd1NpemVWTyl7XHJcbiAgICAgICAgICAgIC8vIFNjYWxpbmcgYW5kIHBvc2l0aW9uaW5nIGFzIHBlciByZXNwb25zaXZlIHNjYWxlXHJcbiAgICAgICAgICAgIHZhciBjb21wb25lbnRzID0gW1wic3BpblwiLFwid2luXCIsXCJiYWxhbmNlXCIsXCJiZXRcIl07XHJcbiAgICAgICAgICAgIHZhciBsZW4gPSBjb21wb25lbnRzLmxlbmd0aDtcclxuICAgICAgICAgICAgdmFyIGZpdENvbnRlbnRPblNjcmVlbiA9IG5ldyBzbG90Lm1vZGVsLmxpYi5VdGlscygpLmZpdENvbnRlbnRPblNjcmVlbjtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29tcCA9IGNvbXBvbmVudHNbaV07XHJcbiAgICAgICAgICAgICAgICB2YXIgc2NhbGUgPSB0aGlzLnJlc3BTY2FsZVtjb21wXTtcclxuICAgICAgICAgICAgICAgIGZpdENvbnRlbnRPblNjcmVlbihcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXNbY29tcF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcmVlbjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogd2luZG93U2l6ZVZPLndpZHRoICogc2NhbGUueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IHdpbmRvd1NpemVWTy5oZWlnaHQgKiBzY2FsZS55LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHdpbmRvd1NpemVWTy53aWR0aCAqIHNjYWxlLncsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHdpbmRvd1NpemVWTy5oZWlnaHQgKiBzY2FsZS5oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucmVzVHh0LnRleHQgPSB3aW5kb3dTaXplVk8ud2lkdGggKyBcInhcIiArIHdpbmRvd1NpemVWTy5oZWlnaHQgK1wiXFxuXCI7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlQmFsYW5jZTogZnVuY3Rpb24oYmFsYW5jZSl7XHJcbiAgICAgICAgICAgIHRoaXMudHh0QmFsYW5jZS50ZXh0ID0gdGhpcy5jdXJyZW5jeSArIGJhbGFuY2UudG9GaXhlZCgyKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB1cGRhdGVXaW46IGZ1bmN0aW9uKHdpbil7XHJcbiAgICAgICAgICAgIHRoaXMudHh0V2luLnRleHQgPSB0aGlzLmN1cnJlbmN5ICsgd2luLnRvRml4ZWQoMik7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlQmV0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLnR4dEJldC50ZXh0ID0gdGhpcy5jdXJyZW5jeSArIHRoaXMuZGVub21pbmF0aW9uc1t0aGlzLmN1cnJlbnREZW5vbWluYXRpb25dLnRvRml4ZWQoMik7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaW5jcmVhc2VCZXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY3VycmVudERlbm9taW5hdGlvbiA8IHRoaXMuZGVub21pbmF0aW9ucy5sZW5ndGggLSAxKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudERlbm9taW5hdGlvbisrO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVCZXQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdGVCZXRCdXR0b25zKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkZWNyZWFzZUJldDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYodGhpcy5jdXJyZW50RGVub21pbmF0aW9uID4gMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnREZW5vbWluYXRpb24tLTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQmV0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlQmV0QnV0dG9ucygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdmFsaWRhdGVCZXRCdXR0b25zOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmN1cnJlbnREZW5vbWluYXRpb24gPT09IHRoaXMuZGVub21pbmF0aW9ucy5sZW5ndGggLSAxKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZUJldFBsdXMoKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZUJldFBsdXMoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5jdXJyZW50RGVub21pbmF0aW9uID09PSAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZUJldE1pbnVzKCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmFibGVCZXRNaW51cygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGlzYWJsZVNwaW46IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuU3Bpbi52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZW5hYmxlU3BpbjogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy5idG5TcGluLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRpc2FibGVCZXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZUJldFBsdXMoKTtcclxuICAgICAgICAgICAgdGhpcy5kaXNhYmxlQmV0TWludXMoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVuYWJsZUJldDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy52YWxpZGF0ZUJldEJ1dHRvbnMoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkaXNhYmxlQmV0UGx1czogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy5idG5CZXRQbHVzLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBlbmFibGVCZXRQbHVzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLmJ0bkJldFBsdXMudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGlzYWJsZUJldE1pbnVzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLmJ0bkJldE1pbnVzLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBlbmFibGVCZXRNaW51czogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy5idG5CZXRNaW51cy52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBFdmVudCBIYW5kbGVyc1xyXG4gICAgICAgIG9uU3BpbkNsaWNrOiBmdW5jdGlvbihldnQpe1xyXG4gICAgICAgICAgICB0aGlzLmRpc2FibGVTcGluKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZUJldCgpO1xyXG4gICAgICAgICAgICB0aGlzLnR4dFdpbi50ZXh0ID0gXCJcIjtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZS5lbWl0KHNsb3Qudmlldy5ldmVudC5WaWV3RXZlbnRzLlNQSU5fQ0xJQ0spO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uQmV0TWludXNDbGljazogZnVuY3Rpb24oZXZ0KXtcclxuICAgICAgICAgICAgdGhpcy5kZWNyZWFzZUJldCgpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLmVtaXQoc2xvdC52aWV3LmV2ZW50LlZpZXdFdmVudHMuQkVUX0NMSUNLKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvbkJldFBsdXNDbGljazogZnVuY3Rpb24oZXZ0KXtcclxuICAgICAgICAgICAgdGhpcy5pbmNyZWFzZUJldCgpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLmVtaXQoc2xvdC52aWV3LmV2ZW50LlZpZXdFdmVudHMuQkVUX0NMSUNLKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoYW5kbGVSZXNpemU6IGZ1bmN0aW9uICh3aW5kb3dTaXplVk8pIHtcclxuICAgICAgICAgICAgdGhpcy5zZXR1cFZpZXcod2luZG93U2l6ZVZPKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogJ1BhbmVsJ1xyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgUmVlbFxyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3Qudmlldy5jb21wb25lbnQuUmVlbCcsXHJcbiAgICAgICAgY29uc3RydWN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZSA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIC8vIFN0YWdlIE1lbWJlcnNcclxuICAgICAgICBzdGFnZTogbnVsbCxcclxuXHJcbiAgICAgICAgcmVlbEluZGV4OiBudWxsLFxyXG5cclxuICAgICAgICBudW1Sb3dzOiBudWxsLFxyXG4gICAgICAgIHdpZHRoOiBudWxsLFxyXG4gICAgICAgIGhlaWdodDogbnVsbCxcclxuXHJcbiAgICAgICAgY2VsbHM6IG51bGwsXHJcbiAgICAgICAgc3BpblRyaWNrQ2VsbHM6IG51bGwsXHJcbiAgICAgICAgY2VsbFBvc09yaWdpbmFsOiBudWxsLFxyXG4gICAgICAgIHJlZWxDZWxsSGVpZ2h0OiBudWxsLFxyXG4gICAgICAgIHJlZWxIZWlnaHQ6IG51bGwsXHJcblxyXG4gICAgICAgIHJlc3VsdFJlZWw6IG51bGwsXHJcbiAgICAgICAgaXNSZXN1bHRSZWNlaXZlZDogbnVsbCxcclxuXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKGluZGV4LCBkYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVlbEluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgIHRoaXMubnVtUm93cyA9IGRhdGEuZ2FtZUNvbmZpZ1ZPLm51bVJvd3M7XHJcblxyXG4gICAgICAgICAgICAvLyBDYWxjdWxhdGluZyBzaXplIG9mIHNpbmdsZSByZWVsIGFyZWFcclxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IGRhdGEudWlDb25maWdWTy5zeW1ib2xXaWR0aDtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPVxyXG4gICAgICAgICAgICAgICAgKHRoaXMubnVtUm93cyAqIGRhdGEudWlDb25maWdWTy5zeW1ib2xIZWlnaHQpICtcclxuICAgICAgICAgICAgICAgICgodGhpcy5udW1Sb3dzIC0gMSkgKiBkYXRhLnVpQ29uZmlnVk8ucmVlbFZTZXBhcmF0b3IpO1xyXG5cclxuICAgICAgICAgICAgLy8gWWVsbG93IHJvdW5kZWQgcmVjdGFuZ2xlIHN0cmlwIGJlaGluZCBlYWNoIHJlZWxcclxuICAgICAgICAgICAgdmFyIGJnUmVjdCA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XHJcbiAgICAgICAgICAgIGJnUmVjdC5iZWdpbkZpbGwoZGF0YS51aUNvbmZpZ1ZPLnJlZWxCR0NvbG9yKTtcclxuICAgICAgICAgICAgYmdSZWN0LmRyYXdSb3VuZGVkUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgMTApO1xyXG4gICAgICAgICAgICBiZ1JlY3QuYWxwaGEgPSAwLjQ7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQoYmdSZWN0KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlUmVlbENlbGxzKGRhdGEpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNyZWF0ZVJlZWxDZWxsczogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgICAgIC8vIFRoZSBkaXN0YW5jZSBlYWNoIHN5bWJvbCBpcyBhbmltYXRlZCB0byBjcmVhdGUgc3BpbiBlZmZlY3RcclxuICAgICAgICAgICAgdGhpcy5yZWVsQ2VsbEhlaWdodCA9IGRhdGEudWlDb25maWdWTy5zeW1ib2xIZWlnaHQgKyBkYXRhLnVpQ29uZmlnVk8ucmVlbFZTZXBhcmF0b3I7XHJcbiAgICAgICAgICAgIHRoaXMucmVlbEhlaWdodCA9XHJcbiAgICAgICAgICAgICAgICAoZGF0YS51aUNvbmZpZ1ZPLnN5bWJvbEhlaWdodCAqIHRoaXMubnVtUm93cykgK1xyXG4gICAgICAgICAgICAgICAgKGRhdGEudWlDb25maWdWTy5yZWVsVlNlcGFyYXRvciAqICh0aGlzLm51bVJvd3MgLSAxKSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgeHAgPSAwO1xyXG4gICAgICAgICAgICB2YXIgeXAgPSAtKHRoaXMucmVlbENlbGxIZWlnaHQgKiB0aGlzLm51bVJvd3MpO1xyXG5cclxuICAgICAgICAgICAgLy8gU3RvcmluZyBwb3NpdGlvbnMgb2YgYWxsIGNlbGxzXHJcbiAgICAgICAgICAgIC8vIChib3RoIG9uIHNjcmVlbiBhbmQgb2ZmIHNjcmVlbiB0cmljayBjZWxscylcclxuICAgICAgICAgICAgdGhpcy5jZWxsUG9zT3JpZ2luYWwgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIHZhciByZWVsQ2VsbDtcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0aW5nIGNlbGxzIHVzZWQgdG8gY3JlYXRlIGNvbnRpbm91cyBzcGluXHJcbiAgICAgICAgICAgIC8vIFRoZXNlIHN0YXkgb2ZmIHNjcmVlbiBhbmQgb25seSBjb21lIG9uIHRvIHZpc2libGUgYXJlYVxyXG4gICAgICAgICAgICAvLyB3aGVuIHRoZSByZWVsIGlzIHNwaW5uaW5nXHJcbiAgICAgICAgICAgIC8vIFRoZXNlIHdpbGwgYmUgdGhlIGZpcnN0IHNldCBpbiBjZWxsUG9zT3JpZ2luYWwgYXJyYXlcclxuICAgICAgICAgICAgdGhpcy5zcGluVHJpY2tDZWxscyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5udW1Sb3dzOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgcmVlbENlbGwgPSBuZXcgc2xvdC52aWV3LmNvbXBvbmVudC5SZWVsQ2VsbCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZChyZWVsQ2VsbC5zdGFnZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwaW5Ucmlja0NlbGxzLnB1c2gocmVlbENlbGwpO1xyXG4gICAgICAgICAgICAgICAgcmVlbENlbGwuc3RhZ2UueCA9IHhwO1xyXG4gICAgICAgICAgICAgICAgcmVlbENlbGwuc3RhZ2UueSA9IHlwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jZWxsUG9zT3JpZ2luYWwucHVzaCh7eDogeHAsIHk6IHlwfSk7XHJcbiAgICAgICAgICAgICAgICByZWVsQ2VsbC5pbml0KGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgeXAgKz0gZGF0YS51aUNvbmZpZ1ZPLnN5bWJvbEhlaWdodCArIGRhdGEudWlDb25maWdWTy5yZWVsVlNlcGFyYXRvcjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gUmVlbCBjZWxscyB0byBkaXNwbGF5IHNwaW4gcmVzdWx0XHJcbiAgICAgICAgICAgIC8vIFRoZXNlIHdpbGwgYmUgdGhlIGxhc3Qgc2V0IGluIGNlbGxQb3NPcmlnaW5hbCBhcnJheVxyXG4gICAgICAgICAgICB0aGlzLmNlbGxzID0gW107XHJcbiAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IHRoaXMubnVtUm93czsgaSsrKXtcclxuICAgICAgICAgICAgICAgIHJlZWxDZWxsID0gbmV3IHNsb3Qudmlldy5jb21wb25lbnQuUmVlbENlbGwoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQocmVlbENlbGwuc3RhZ2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jZWxscy5wdXNoKHJlZWxDZWxsKTtcclxuICAgICAgICAgICAgICAgIHJlZWxDZWxsLnN0YWdlLnggPSB4cDtcclxuICAgICAgICAgICAgICAgIHJlZWxDZWxsLnN0YWdlLnkgPSB5cDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2VsbFBvc09yaWdpbmFsLnB1c2goe3g6IHhwLCB5OiB5cH0pO1xyXG4gICAgICAgICAgICAgICAgcmVlbENlbGwuaW5pdChkYXRhKTtcclxuICAgICAgICAgICAgICAgIHlwICs9IGRhdGEudWlDb25maWdWTy5zeW1ib2xIZWlnaHQgKyBkYXRhLnVpQ29uZmlnVk8ucmVlbFZTZXBhcmF0b3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzcGluOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLmlzUmVzdWx0UmVjZWl2ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zdGFydFNwaW4oKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzdGFydFNwaW46IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciBlYXNlVHlwZSA9IFBvd2VyMS5lYXNlSW47XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLm51bVJvd3M7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwaW5Ucmlja0NlbGxzW2ldLnVwZGF0ZVdpdGhSYW5kb21TeW1ib2woKTtcclxuICAgICAgICAgICAgICAgIFR3ZWVuTGl0ZS50byhcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwaW5Ucmlja0NlbGxzW2ldLnN0YWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIDAuNSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHRoaXMuc3BpblRyaWNrQ2VsbHNbaV0uc3RhZ2UueSArICh0aGlzLnJlZWxDZWxsSGVpZ2h0ICogdGhpcy5udW1Sb3dzKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWFzZTogZWFzZVR5cGVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgLy8gVHdlZW4gb25Db21wbGV0ZSBjYWxsYmFjayB0byBiZSBhZGRlZCBvbmx5IHRvIG9uZSBTeW1ib2wuXHJcbiAgICAgICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSAoaSA9PT0gdGhpcy5udW1Sb3dzIC0gMSkgPyB0aGlzLmNvbnRpbnVlU3Bpbi5iaW5kKHRoaXMpIDogbnVsbDtcclxuICAgICAgICAgICAgICAgIFR3ZWVuTGl0ZS50byhcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW2ldLnN0YWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIDAuNSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHRoaXMuY2VsbHNbaV0uc3RhZ2UueSArICh0aGlzLnJlZWxDZWxsSGVpZ2h0ICogdGhpcy5udW1Sb3dzKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWFzZTogZWFzZVR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU6IGNhbGxiYWNrXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNvbnRpbnVlU3BpbjogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYodGhpcy5pc1Jlc3VsdFJlY2VpdmVkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcFNwaW4oKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgb2ZmU2NyZWVuQ2VsbHMgPSB0aGlzLmdldE9mZlNjcmVlbkNlbGxzKCk7XHJcbiAgICAgICAgICAgIHZhciBlYXNlVHlwZSA9IExpbmVhci5lYXNlTm9uZTtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMubnVtUm93czsgaSsrKXtcclxuICAgICAgICAgICAgICAgIG9mZlNjcmVlbkNlbGxzW2ldLnVwZGF0ZVdpdGhSYW5kb21TeW1ib2woKTtcclxuICAgICAgICAgICAgICAgIG9mZlNjcmVlbkNlbGxzW2ldLnN0YWdlLnkgPSB0aGlzLmNlbGxQb3NPcmlnaW5hbFtpXS55O1xyXG4gICAgICAgICAgICAgICAgVHdlZW5MaXRlLnRvKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3BpblRyaWNrQ2VsbHNbaV0uc3RhZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgMC4xLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeTogdGhpcy5zcGluVHJpY2tDZWxsc1tpXS5zdGFnZS55ICsgKHRoaXMucmVlbENlbGxIZWlnaHQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlYXNlOiBlYXNlVHlwZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAvLyBUd2VlbiBvbkNvbXBsZXRlIGNhbGxiYWNrIHRvIGJlIGFkZGVkIG9ubHkgdG8gb25lIFN5bWJvbC5cclxuICAgICAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IChpID09PSB0aGlzLm51bVJvd3MgLSAxKSA/IHRoaXMuY29udGludWVTcGluLmJpbmQodGhpcykgOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgVHdlZW5MaXRlLnRvKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2VsbHNbaV0uc3RhZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgMC4xLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeTogdGhpcy5jZWxsc1tpXS5zdGFnZS55ICsgKHRoaXMucmVlbENlbGxIZWlnaHQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlYXNlOiBlYXNlVHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZTogY2FsbGJhY2tcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgVHdlZW5MaXRlLnRvKHRoaXMuY2VsbHNbaV0uc3RhZ2UsIDAuMSwge2Vhc2U6IGVhc2VUeXBlLCBvbkNvbXBsZXRlOiBjYWxsYmFja30pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3RvcFNwaW46IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciBvZmZTY3JlZW5DZWxscyA9IHRoaXMuZ2V0T2ZmU2NyZWVuQ2VsbHMoKTtcclxuICAgICAgICAgICAgdmFyIGVhc2VUeXBlID0gUG93ZXIxLmVhc2VPdXQ7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLm51bVJvd3M7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBvZmZTY3JlZW5DZWxsc1tpXS51cGRhdGVTeW1ib2wodGhpcy5yZXN1bHRSZWVsW2ldKTtcclxuICAgICAgICAgICAgICAgIG9mZlNjcmVlbkNlbGxzW2ldLnN0YWdlLnkgPSB0aGlzLmNlbGxQb3NPcmlnaW5hbFtpXS55O1xyXG4gICAgICAgICAgICAgICAgVHdlZW5MaXRlLnRvKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3BpblRyaWNrQ2VsbHNbaV0uc3RhZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgMC41LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeTogdGhpcy5zcGluVHJpY2tDZWxsc1tpXS5zdGFnZS55ICsgKHRoaXMucmVlbENlbGxIZWlnaHQgKiB0aGlzLm51bVJvd3MpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlYXNlOiBlYXNlVHlwZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAvLyBUd2VlbiBvbkNvbXBsZXRlIGNhbGxiYWNrIHRvIGJlIGFkZGVkIG9ubHkgdG8gb25lIFN5bWJvbC5cclxuICAgICAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IChpID09PSB0aGlzLm51bVJvd3MgLSAxKSA/IHRoaXMub25TcGluU3RvcC5iaW5kKHRoaXMpIDogbnVsbDtcclxuICAgICAgICAgICAgICAgIFR3ZWVuTGl0ZS50byhcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW2ldLnN0YWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIDAuNSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHRoaXMuY2VsbHNbaV0uc3RhZ2UueSArICh0aGlzLnJlZWxDZWxsSGVpZ2h0ICogdGhpcy5udW1Sb3dzKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWFzZTogZWFzZVR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU6IGNhbGxiYWNrXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uU3BpblN0b3A6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDAsIGogPSAwOyBpIDwgdGhpcy5udW1Sb3dzOyBpKyssIGorKyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwaW5Ucmlja0NlbGxzW2ldLnN0YWdlLnkgPSB0aGlzLmNlbGxQb3NPcmlnaW5hbFtqXS55O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGluVHJpY2tDZWxsc1tpXS5yZW1vdmVTeW1ib2woKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCB0aGlzLm51bVJvd3M7IGkrKywgaisrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2VsbHNbaV0uc3RhZ2UueSA9IHRoaXMuY2VsbFBvc09yaWdpbmFsW2pdLnk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW2ldLnVwZGF0ZVN5bWJvbCh0aGlzLnJlc3VsdFJlZWxbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UuZW1pdChzbG90LnZpZXcuZXZlbnQuVmlld0V2ZW50cy5SRUVMX1NQSU5fRU5ELCB0aGlzLnJlZWxJbmRleCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT2Zmc2NyZWVuIGNlbGxzIGFyZSB0aGUgb25lcyB3aGljaCBhcmUgYmVsb3cgdGhlIHJlZWwgYXJlYVxyXG4gICAgICAgICAqIE9uZSBvZiB0aGUgY2VsbCBzZXQsIGVpdGhlciB0aGUgYWN0dWFsIHJlc3VsdCBjZWxsIHNldCxcclxuICAgICAgICAgKiBvciB0aGUgdHJpY2sgY2VsbCBzZXQgaXMgcmV0dXJuZWQgYXMgYW4gYXJyYXlcclxuICAgICAgICAgKiBAcmV0dXJucyB7bnVsbH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXRPZmZTY3JlZW5DZWxsczogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyIG9mZlNjcmVlbkNlbGxzID0gW107XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDAsIGogPSAwOyBpIDwgdGhpcy5udW1Sb3dzOyBpKyssIGorKyl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNwaW5Ucmlja0NlbGxzW2ldLnN0YWdlLnkgPCAwIHx8IHRoaXMuc3BpblRyaWNrQ2VsbHNbaV0uc3RhZ2UueSA+IHRoaXMucmVlbEhlaWdodCl7XHJcbiAgICAgICAgICAgICAgICAgICAgb2ZmU2NyZWVuQ2VsbHMucHVzaCh0aGlzLnNwaW5Ucmlja0NlbGxzW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuY2VsbHNbaV0uc3RhZ2UueSA8IDAgfHwgdGhpcy5jZWxsc1tpXS5zdGFnZS55ID4gdGhpcy5yZWVsSGVpZ2h0KXtcclxuICAgICAgICAgICAgICAgICAgICBvZmZTY3JlZW5DZWxscy5wdXNoKHRoaXMuY2VsbHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBvZmZTY3JlZW5DZWxscztcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzdG9wQW5kVXBkYXRlU3ltYm9sczogZnVuY3Rpb24ocmVzdWx0KXtcclxuICAgICAgICAgICAgdGhpcy5yZXN1bHRSZWVsID0gcmVzdWx0O1xyXG4gICAgICAgICAgICB0aGlzLmlzUmVzdWx0UmVjZWl2ZWQgPSB0cnVlO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHVwZGF0ZVN5bWJvbHNXaXRob3V0U3BpbjogZnVuY3Rpb24ocmVzdWx0KXtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMubnVtUm93czsgaSsrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2VsbHNbaV0udXBkYXRlU3ltYm9sKHJlc3VsdFtpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoYW5kbGVSZXNpemU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogJ1JlZWwnXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBSZWVsQ2VsbFxyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3Qudmlldy5jb21wb25lbnQuUmVlbENlbGwnLFxyXG4gICAgICAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UgPSBuZXcgUElYSS5Db250YWluZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvLyBTdGFnZSBNZW1iZXJzXHJcbiAgICAgICAgc3RhZ2U6IG51bGwsXHJcbiAgICAgICAgc3ltYm9sOiBudWxsLFxyXG5cclxuICAgICAgICBzeW1ib2xJRDogbnVsbCxcclxuICAgICAgICByZXNvdXJjZXM6IG51bGwsXHJcblxyXG4gICAgICAgIC8vIEFsbCBwb3NzaWJsZSBzeW1ib2xzXHJcbiAgICAgICAgbnVtU3ltYm9sczogbnVsbCxcclxuICAgICAgICBzeW1ib2xzOiBudWxsLFxyXG5cclxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlc291cmNlcyA9IGRhdGEucmVzb3VyY2VzO1xyXG4gICAgICAgICAgICB0aGlzLm51bVN5bWJvbHMgPSBkYXRhLmdhbWVDb25maWdWTy5udW1TeW1ib2xzO1xyXG4gICAgICAgICAgICB0aGlzLnN5bWJvbHMgPSBkYXRhLmdhbWVDb25maWdWTy5nZXRTeW1ib2xzKCk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHVwZGF0ZVN5bWJvbDogZnVuY3Rpb24oc3ltYm9sSUQpe1xyXG4gICAgICAgICAgICB0aGlzLnN5bWJvbElEID0gc3ltYm9sSUQ7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlU3ltYm9sKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3ltYm9sID0gbmV3IFBJWEkuU3ByaXRlKHRoaXMucmVzb3VyY2VzW3N5bWJvbElEXS50ZXh0dXJlKTtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLnN5bWJvbCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlV2l0aFJhbmRvbVN5bWJvbDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVTeW1ib2wodGhpcy5zeW1ib2xzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMubnVtU3ltYm9scyldKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZW1vdmVTeW1ib2w6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc3ltYm9sKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcy5zeW1ib2wpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGFuZGxlUmVzaXplOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdSZWVsQ2VsbCdcclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2NcclxuICogQGNsYXNzICAgICAgIFJlZWxDb250YWluZXJcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LnZpZXcuY29tcG9uZW50LlJlZWxDb250YWluZXInLFxyXG4gICAgICAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UgPSBuZXcgUElYSS5Db250YWluZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvLyBTdGFnZSBNZW1iZXJzXHJcbiAgICAgICAgc3RhZ2U6IG51bGwsXHJcbiAgICAgICAgYmdSZWN0OiBudWxsLFxyXG5cclxuICAgICAgICBudW1SZWVsczogbnVsbCxcclxuICAgICAgICBudW1Sb3dzOiBudWxsLFxyXG4gICAgICAgIHdpZHRoOiBudWxsLFxyXG4gICAgICAgIGhlaWdodDogbnVsbCxcclxuXHJcbiAgICAgICAgcmVlbHM6IG51bGwsXHJcblxyXG4gICAgICAgIGlzU3Bpbm5pbmc6IG51bGwsXHJcbiAgICAgICAgcmVlbFNwaW5EZWxheTogbnVsbCxcclxuICAgICAgICBtaW5TcGluRHVyYXRpb246IG51bGwsXHJcbiAgICAgICAgbWluU3BpbkR1cmF0aW9uRWxhcHNlZDogbnVsbCxcclxuICAgICAgICByZXN1bHRNYXRyaXhSZWNlaXZlZDogbnVsbCxcclxuICAgICAgICByZXN1bHRNYXRyaXg6IG51bGwsXHJcblxyXG4gICAgICAgIHJlc3BTY2FsZTogbnVsbCxcclxuXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5udW1SZWVscyA9IGRhdGEuZ2FtZUNvbmZpZ1ZPLm51bVJlZWxzO1xyXG4gICAgICAgICAgICB0aGlzLm51bVJvd3MgPSBkYXRhLmdhbWVDb25maWdWTy5udW1Sb3dzO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5taW5TcGluRHVyYXRpb24gPSBkYXRhLnVpQ29uZmlnVk8ubWluU3BpbkR1cmF0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLnJlZWxTcGluRGVsYXkgPSBkYXRhLnVpQ29uZmlnVk8ucmVlbFNwaW5EZWxheTtcclxuICAgICAgICAgICAgdGhpcy5yZXNwU2NhbGUgPSBkYXRhLnVpQ29uZmlnVk8ucmVzcG9uc2l2ZVNjYWxlLnJlZWxBcmVhO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIENhbGN1bGF0aW5nIHNpemUgb2Ygd2hvbGUgcmVlbCBhcmVhIHVzaW5nIHZhbHVlcyBwcm92aWRlZCBpbiBjb25maWdcclxuICAgICAgICAgICAgdGhpcy53aWR0aCA9XHJcbiAgICAgICAgICAgICAgICAodGhpcy5udW1SZWVscyAqIGRhdGEudWlDb25maWdWTy5zeW1ib2xXaWR0aCkgK1xyXG4gICAgICAgICAgICAgICAgKCh0aGlzLm51bVJlZWxzIC0gMSkgKiBkYXRhLnVpQ29uZmlnVk8ucmVlbEhTZXBhcmF0b3IpICtcclxuICAgICAgICAgICAgICAgIChkYXRhLnVpQ29uZmlnVk8ucmVlbEhQYWRkaW5nICogMik7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID1cclxuICAgICAgICAgICAgICAgICh0aGlzLm51bVJvd3MgKiBkYXRhLnVpQ29uZmlnVk8uc3ltYm9sSGVpZ2h0KSArXHJcbiAgICAgICAgICAgICAgICAoKHRoaXMubnVtUm93cyAtIDEpICogZGF0YS51aUNvbmZpZ1ZPLnJlZWxWU2VwYXJhdG9yKSArXHJcbiAgICAgICAgICAgICAgICAoZGF0YS51aUNvbmZpZ1ZPLnJlZWxWUGFkZGluZyAqIDIpO1xyXG5cclxuICAgICAgICAgICAgLy8gV2hpdGUgcm91bmRlZCByZWN0YW5nbGUgYmVoaW5kIHRoZSB3aG9sZSByZWVsIGFyZWFcclxuICAgICAgICAgICAgdGhpcy5iZ1JlY3QgPSBuZXcgUElYSS5HcmFwaGljcygpO1xyXG4gICAgICAgICAgICB0aGlzLmJnUmVjdC5iZWdpbkZpbGwoZGF0YS51aUNvbmZpZ1ZPLnJlZWxBcmVhQkdDb2xvcik7XHJcbiAgICAgICAgICAgIHRoaXMuYmdSZWN0LmRyYXdSb3VuZGVkUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgMTUpO1xyXG4gICAgICAgICAgICB0aGlzLmJnUmVjdC5hbHBoYSA9IDAuNjtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmJnUmVjdCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVJlZWxzKGRhdGEpO1xyXG4gICAgICAgICAgICB0aGlzLnNldHVwVmlldyhkYXRhLndpbmRvd1NpemVWTyk7XHJcblxyXG4gICAgICAgICAgICBQWFJvb3QuYWRkQ2hpbGQodGhpcy5zdGFnZSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY3JlYXRlUmVlbHM6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgdmFyIHhwID0gZGF0YS51aUNvbmZpZ1ZPLnJlZWxIUGFkZGluZztcclxuICAgICAgICAgICAgdmFyIHlwID0gZGF0YS51aUNvbmZpZ1ZPLnJlZWxWUGFkZGluZztcclxuICAgICAgICAgICAgdGhpcy5yZWVscyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5udW1SZWVsczsgaSsrKXtcclxuICAgICAgICAgICAgICAgIHZhciByZWVsID0gbmV3IHNsb3Qudmlldy5jb21wb25lbnQuUmVlbCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZChyZWVsLnN0YWdlKTtcclxuICAgICAgICAgICAgICAgIHJlZWwuaW5pdChpLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgIHJlZWwuc3RhZ2UueCA9IHhwO1xyXG4gICAgICAgICAgICAgICAgcmVlbC5zdGFnZS55ID0geXA7XHJcbiAgICAgICAgICAgICAgICByZWVsLnN0YWdlLm1hc2sgPSB0aGlzLmNyZWF0ZU1hc2tPYmplY3QoeHAsIHlwLCByZWVsLndpZHRoLCByZWVsLmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICByZWVsLnN0YWdlLm9uKFxyXG4gICAgICAgICAgICAgICAgICAgIHNsb3Qudmlldy5ldmVudC5WaWV3RXZlbnRzLlJFRUxfU1BJTl9FTkQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblJlZWxTdG9wLmJpbmQodGhpcylcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZWxzLnB1c2gocmVlbCk7XHJcbiAgICAgICAgICAgICAgICB4cCArPSBkYXRhLnVpQ29uZmlnVk8uc3ltYm9sV2lkdGggKyBkYXRhLnVpQ29uZmlnVk8ucmVlbEhTZXBhcmF0b3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZXR1cFZpZXc6IGZ1bmN0aW9uKHdpbmRvd1NpemVWTyl7XHJcbiAgICAgICAgICAgIC8vIFNjYWxpbmcgYW5kIHBvc2l0aW9uaW5nIGFzIHBlciByZXNwb25zaXZlIHNjYWxlXHJcbiAgICAgICAgICAgIHZhciBzdWJzdGl0dXRlID0ge3dpZHRoOiB0aGlzLndpZHRoLCBoZWlnaHQ6IHRoaXMuaGVpZ2h0fTtcclxuICAgICAgICAgICAgdmFyIGZpdENvbnRlbnRPblNjcmVlbiA9IG5ldyBzbG90Lm1vZGVsLmxpYi5VdGlscygpLmZpdENvbnRlbnRPblNjcmVlbjtcclxuICAgICAgICAgICAgZml0Q29udGVudE9uU2NyZWVuKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHN1YnN0aXR1dGUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2NyZWVuOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IHdpbmRvd1NpemVWTy53aWR0aCAqIHRoaXMucmVzcFNjYWxlLngsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHdpbmRvd1NpemVWTy5oZWlnaHQgKiB0aGlzLnJlc3BTY2FsZS55LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogd2luZG93U2l6ZVZPLndpZHRoICogdGhpcy5yZXNwU2NhbGUudyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiB3aW5kb3dTaXplVk8uaGVpZ2h0ICogdGhpcy5yZXNwU2NhbGUuaFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZS54ID0gc3Vic3RpdHV0ZS54O1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLnkgPSBzdWJzdGl0dXRlLnk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2Uuc2NhbGUueCA9IHN1YnN0aXR1dGUud2lkdGgvdGhpcy53aWR0aDtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZS5zY2FsZS55ID0gc3Vic3RpdHV0ZS5oZWlnaHQvdGhpcy5oZWlnaHQ7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY3JlYXRlTWFza09iamVjdDogZnVuY3Rpb24oeCwgeSwgdywgaCl7XHJcbiAgICAgICAgICAgIC8vIFJvdW5kZWQgcmVjdGFuZ2xlIG9uIHRvcCBvZiBlYWNoIHJlZWwgZm9yIG1hc2tcclxuICAgICAgICAgICAgdmFyIG1hc2sgPSBuZXcgUElYSS5HcmFwaGljcygpO1xyXG4gICAgICAgICAgICBtYXNrLmJlZ2luRmlsbCgweEZGRkZGRik7XHJcbiAgICAgICAgICAgIG1hc2suZHJhd1JvdW5kZWRSZWN0KHgsIHksIHcsIGgsIDEwKTtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZChtYXNrKTtcclxuICAgICAgICAgICAgcmV0dXJuIG1hc2s7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3BpbjogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYodGhpcy5pc1NwaW5uaW5nKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyhuZXcgRXJyb3IoXCJDYW5ub3Qgc3RhcnQgbmV3IHNwaW4uIEFscmVhZHkgc3Bpbm5pbmcuXCIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzU3Bpbm5pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1pblNwaW5EdXJhdGlvbkVsYXBzZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5yZXN1bHRNYXRyaXhSZWNlaXZlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5udW1SZWVsczsgaSsrKXtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWVsc1tpXS5zcGluLmJpbmQodGhpcy5yZWVsc1tpXSksXHJcbiAgICAgICAgICAgICAgICAgICAgaSAqIHRoaXMucmVlbFNwaW5EZWxheSAqIDEwMDBcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0VGltZW91dCh0aGlzLmVsYXBzZU1pblNwaW5EdXJhdGlvbi5iaW5kKHRoaXMpLCB0aGlzLm1pblNwaW5EdXJhdGlvbiAqIDEwMDApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGVsYXBzZU1pblNwaW5EdXJhdGlvbjogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy5taW5TcGluRHVyYXRpb25FbGFwc2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVTeW1ib2xzSWZSZWFkeSgpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN0b3BBbmRVcGRhdGVTeW1ib2xzOiBmdW5jdGlvbihyZXN1bHQpe1xyXG4gICAgICAgICAgICBpZighdGhpcy5pc1NwaW5uaW5nKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyhuZXcgRXJyb3IoXCJDYW5ub3QgdXBkYXRlIHN5bWJvbHMuIFJlZWxzIG5vdCBzcGlubmluZy4gXCIgK1xyXG4gICAgICAgICAgICAgICAgXCJVc2UgdXBkYXRlU3ltYm9sc1dpdGhvdXRTcGluIG1ldGhvZCB0byB1cGRhdGUgc3ltYm9scyB3aGVuIG5vdCBzcGlubmluZy5cIikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucmVzdWx0TWF0cml4ID0gcmVzdWx0O1xyXG4gICAgICAgICAgICB0aGlzLnJlc3VsdE1hdHJpeFJlY2VpdmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVTeW1ib2xzSWZSZWFkeSgpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRoZSBtZXRob2QgdXBkYXRlU3ltYm9sc0lmUmVhZHkgbWFrZXMgc3VyZSB0aGF0IHRoZSByZWVscyBoYXZlIHNwdW4gZm9yIHRoZVxyXG4gICAgICAgICAqIG1pbmltdW0gcmVxdWlyZWQgZHVyYXRpb24gYW5kIGFsc28gdmVyaWZpZXMgaWYgc3BpbiByZXN1bHQgaGF2IGJlZW4gcmVjZWl2ZWRcclxuICAgICAgICAgKiBieSB2ZXJpZnlpbmcgdGhhdCB0aGUgYXNzb2NpYXRlZCBmbGFncyBhcmUgdHJ1ZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIFRoaXMgbWV0aG9kIGlzIGludm9rZWQgd2hlbiByZXN1bHRzIGFyZSByZWNlaXZlZCBhbmQgd2hlbiBtaW5pbXVtIHNwaW4gZHVyYXRpb25cclxuICAgICAgICAgKiBlbGFwZXMuIFRoaXMgZnVuY3Rpb24gdmVyaWZpZXMgYm90aCBhbmQgdGhlbiBwcm9jZWVkcyBieSBwcm92aWRpbm5nIGluZGl2aWR1YWxcclxuICAgICAgICAgKiByZWVscyB3aXRoIHRoZWlyIHN5bWJvbHMuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdXBkYXRlU3ltYm9sc0lmUmVhZHk6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubWluU3BpbkR1cmF0aW9uRWxhcHNlZCAmJiB0aGlzLnJlc3VsdE1hdHJpeFJlY2VpdmVkKXtcclxuICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLm51bVJlZWxzOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVlbHNbaV0uc3RvcEFuZFVwZGF0ZVN5bWJvbHMuYmluZCh0aGlzLnJlZWxzW2ldLCB0aGlzLnJlc3VsdE1hdHJpeFtpXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgKiB0aGlzLnJlZWxTcGluRGVsYXkgKiAxMDAwXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHVwZGF0ZVN5bWJvbHNXaXRob3V0U3BpbjogZnVuY3Rpb24ocmVzdWx0KXtcclxuICAgICAgICAgICAgaWYodGhpcy5pc1NwaW5uaW5nKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyhuZXcgRXJyb3IoXCJDYW5ub3QgdXBkYXRlIHdpdGhvdXQgc3Bpbi4gQWxyZWFkeSBzcGlubmluZy5cIikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLm51bVJlZWxzOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWVsc1tpXS51cGRhdGVTeW1ib2xzV2l0aG91dFNwaW4ocmVzdWx0W2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uUmVlbFN0b3A6IGZ1bmN0aW9uKHJlZWxJRCl7XHJcbiAgICAgICAgICAgIGlmKHJlZWxJRCA9PT0gdGhpcy5udW1SZWVscyAtIDEpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1NwaW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWdlLmVtaXQoc2xvdC52aWV3LmV2ZW50LlZpZXdFdmVudHMuUkVFTF9TUElOX0VORCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoYW5kbGVSZXNpemU6IGZ1bmN0aW9uICh3aW5kb3dTaXplVk8pIHtcclxuICAgICAgICAgICAgdGhpcy5zZXR1cFZpZXcod2luZG93U2l6ZVZPKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogJ1JlZWxDb250YWluZXInXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBXaW5MaW5lc1xyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3Qudmlldy5jb21wb25lbnQuV2luTGluZXMnLFxyXG4gICAgICAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UgPSBuZXcgUElYSS5Db250YWluZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvLyBTdGFnZSBNZW1iZXJzXHJcbiAgICAgICAgc3RhZ2U6IG51bGwsXHJcbiAgICAgICAgbGluZXM6IG51bGwsXHJcblxyXG4gICAgICAgIG51bUxpbmVzOiBudWxsLFxyXG4gICAgICAgIHZpc2libGVMaW5lOiBudWxsLFxyXG5cclxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLm51bUxpbmVzID0gZGF0YS5nYW1lQ29uZmlnVk8ubnVtTGluZXM7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkTGluZXMoZGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZUFsbExpbmVzKCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYWRkTGluZXM6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICB0aGlzLmxpbmVzID0gW107XHJcblxyXG4gICAgICAgICAgICB2YXIgbGluZVBvaW50cyA9IGRhdGEudWlDb25maWdWTy5saW5lUG9pbnRzO1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5udW1MaW5lczsgaSsrKXtcclxuICAgICAgICAgICAgICAgIHZhciBsaW5lID0gbGluZVBvaW50c1tpXTtcclxuICAgICAgICAgICAgICAgIHZhciB0b3RhbFBvaW50cyA9IGxpbmUubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgdmFyIGxpbmVHcmFwaGljID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcclxuICAgICAgICAgICAgICAgIGxpbmVHcmFwaGljLmxpbmVTdHlsZShkYXRhLnVpQ29uZmlnVk8ud2luTGluZVdpZHRoLCBkYXRhLnVpQ29uZmlnVk8ud2luTGluZUNvbG9yKTtcclxuICAgICAgICAgICAgICAgIGxpbmVHcmFwaGljLm1vdmVUbyhsaW5lWzBdWzBdLCBsaW5lWzBdWzFdKTtcclxuICAgICAgICAgICAgICAgIGZvcih2YXIgaiA9IDE7IGogPCB0b3RhbFBvaW50czsgaisrKXtcclxuICAgICAgICAgICAgICAgICAgICBsaW5lR3JhcGhpYy5saW5lVG8obGluZVtqXVswXSwgbGluZVtqXVsxXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsaW5lR3JhcGhpYy5lbmRGaWxsKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKGxpbmVHcmFwaGljKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGluZXMucHVzaChsaW5lR3JhcGhpYyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzaG93TGluZTogZnVuY3Rpb24obGluZU51bWJlcil7XHJcbiAgICAgICAgICAgIGlmKHRoaXMudmlzaWJsZUxpbmUpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmxlTGluZS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy52aXNpYmxlTGluZSA9IHRoaXMubGluZXNbbGluZU51bWJlcl07XHJcbiAgICAgICAgICAgIHRoaXMudmlzaWJsZUxpbmUudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGlkZUFsbExpbmVzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5udW1MaW5lczsgaSsrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubGluZXNbaV0udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGFuZGxlUmVzaXplOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdXaW5MaW5lcydcclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2NcclxuICogQGNsYXNzICAgICAgIFZpZXdFdmVudHNcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6IFwic2xvdC52aWV3LmV2ZW50LlZpZXdFdmVudHNcIlxyXG4gICAgfSxcclxuXHJcbiAgICB7fSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIENMSUNLOiAgICAgICAgICAgICAgKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykgPyBcInRhcFwiIDogXCJjbGlja1wiLFxyXG4gICAgICAgIFNQSU5fQ0xJQ0s6ICAgICAgICAgXCJWaWV3RXZlbnRzX3NwaW5fY2xpY2tcIixcclxuICAgICAgICBSRUVMX1NQSU5fRU5EOiAgICAgIFwiVmlld0V2ZW50c19yZWVsX3NwaW5fZW5kXCIsXHJcbiAgICAgICAgQkVUX0NMSUNLOiAgICAgICAgICBcIlZpZXdFdmVudHNfYmV0X2NsaWNrXCJcclxuICAgIH1cclxuKTsiLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgQkdNZWRpYXRvclxyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3Qudmlldy5tZWRpYXRvci5CR01lZGlhdG9yJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuTWVkaWF0b3JcclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIC8vIFJlZmVyZW5jZXNcclxuICAgICAgICB3aW5kb3dTaXplUHJveHk6IG51bGwsXHJcblxyXG4gICAgICAgIC8vIE5vdGlmaWNhdGlvbnMgdGhpcyBtZWRpYXRvciBpcyBpbnRlcmVzdGVkIGluXHJcbiAgICAgICAgbGlzdE5vdGlmaWNhdGlvbkludGVyZXN0czogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xvdC5BcHBDb25zdGFudHMuV0lORE9XX1JFU0laRUQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsb3QuQXBwQ29uc3RhbnRzLkFTU0VUU19MT0FERURcclxuICAgICAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uUmVnaXN0ZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRWaWV3Q29tcG9uZW50KCBuZXcgc2xvdC52aWV3LmNvbXBvbmVudC5CRygpICk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLndpbmRvd1NpemVQcm94eSA9IHRoaXMuZmFjYWRlLnJldHJpZXZlUHJveHkoc2xvdC5tb2RlbC5wcm94eS5XaW5kb3dTaXplUHJveHkuTkFNRSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gSGFuZGxlIG5vdGlmaWNhdGlvbnMgZnJvbSBvdGhlciBQdXJlTVZDIGFjdG9yc1xyXG4gICAgICAgIGhhbmRsZU5vdGlmaWNhdGlvbjogZnVuY3Rpb24gKG5vdGUpIHtcclxuICAgICAgICAgICAgc3dpdGNoICggbm90ZS5nZXROYW1lKCkgKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHNsb3QuQXBwQ29uc3RhbnRzLldJTkRPV19SRVNJWkVEOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld0NvbXBvbmVudC5oYW5kbGVSZXNpemUobm90ZS5nZXRCb2R5KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBzbG90LkFwcENvbnN0YW50cy5BU1NFVFNfTE9BREVEOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld0NvbXBvbmVudC5pbml0KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZXM6IG5vdGUuZ2V0Qm9keSgpLnJlc291cmNlcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd1NpemVWTzogdGhpcy53aW5kb3dTaXplUHJveHkud2luZG93U2l6ZVZPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdCR01lZGlhdG9yJ1xyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgUGFuZWxNZWRpYXRvclxyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3Qudmlldy5tZWRpYXRvci5QYW5lbE1lZGlhdG9yJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuTWVkaWF0b3JcclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIC8vIFJlZmVyZW5jZXNcclxuICAgICAgICB3aW5kb3dTaXplUHJveHk6IG51bGwsXHJcbiAgICAgICAgY29uZmlnUHJveHk6IG51bGwsXHJcbiAgICAgICAgc2VydmVyUHJveHk6IG51bGwsXHJcblxyXG4gICAgICAgIC8vIE5vdGlmaWNhdGlvbnMgdGhpcyBtZWRpYXRvciBpcyBpbnRlcmVzdGVkIGluIFxyXG4gICAgICAgIGxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgIHNsb3QuQXBwQ29uc3RhbnRzLldJTkRPV19SRVNJWkVELFxyXG4gICAgICAgICAgICAgICAgc2xvdC5BcHBDb25zdGFudHMuQVNTRVRTX0xPQURFRCxcclxuICAgICAgICAgICAgICAgIHNsb3QuQXBwQ29uc3RhbnRzLlNQSU5fRU5EXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25SZWdpc3RlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFZpZXdDb21wb25lbnQobmV3IHNsb3Qudmlldy5jb21wb25lbnQuUGFuZWwoKSk7XHJcbiAgICAgICAgICAgIHRoaXMudmlld0NvbXBvbmVudC5zdGFnZS5vbihcclxuICAgICAgICAgICAgICAgIHNsb3Qudmlldy5ldmVudC5WaWV3RXZlbnRzLlNQSU5fQ0xJQ0ssXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uU3BpbkNsaWNrLmJpbmQodGhpcylcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LnN0YWdlLm9uKFxyXG4gICAgICAgICAgICAgICAgc2xvdC52aWV3LmV2ZW50LlZpZXdFdmVudHMuQkVUX0NMSUNLLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkJldFVwZGF0ZS5iaW5kKHRoaXMpXHJcbiAgICAgICAgICAgIClcclxuXHJcbiAgICAgICAgICAgIHRoaXMud2luZG93U2l6ZVByb3h5ID0gdGhpcy5mYWNhZGUucmV0cmlldmVQcm94eShzbG90Lm1vZGVsLnByb3h5LldpbmRvd1NpemVQcm94eS5OQU1FKTtcclxuICAgICAgICAgICAgdGhpcy5jb25maWdQcm94eSA9IHRoaXMuZmFjYWRlLnJldHJpZXZlUHJveHkoc2xvdC5tb2RlbC5wcm94eS5Db25maWdQcm94eS5OQU1FKTtcclxuICAgICAgICAgICAgdGhpcy5zZXJ2ZXJQcm94eSA9IHRoaXMuZmFjYWRlLnJldHJpZXZlUHJveHkoc2xvdC5tb2RlbC5wcm94eS5TZXJ2ZXJQcm94eS5OQU1FKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvblNwaW5DbGljazogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKHNsb3QuQXBwQ29uc3RhbnRzLlNQSU4pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uQmV0VXBkYXRlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oc2xvdC5BcHBDb25zdGFudHMuQkVUX1VQREFURUQpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIEhhbmRsZSBub3RpZmljYXRpb25zIGZyb20gb3RoZXIgUHVyZU1WQyBhY3RvcnNcclxuICAgICAgICBoYW5kbGVOb3RpZmljYXRpb246IGZ1bmN0aW9uIChub3RlKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoIG5vdGUuZ2V0TmFtZSgpICkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBzbG90LkFwcENvbnN0YW50cy5XSU5ET1dfUkVTSVpFRDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQuaGFuZGxlUmVzaXplKG5vdGUuZ2V0Qm9keSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2Ugc2xvdC5BcHBDb25zdGFudHMuQVNTRVRTX0xPQURFRDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQuaW5pdChcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VzOiBub3RlLmdldEJvZHkoKS5yZXNvdXJjZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYW1lQ29uZmlnVk86IHRoaXMuY29uZmlnUHJveHkuZ2FtZUNvbmZpZ1ZPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlDb25maWdWTzogdGhpcy5jb25maWdQcm94eS51aUNvbmZpZ1ZPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93U2l6ZVZPOiB0aGlzLndpbmRvd1NpemVQcm94eS53aW5kb3dTaXplVk9cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LnVwZGF0ZUJhbGFuY2UodGhpcy5zZXJ2ZXJQcm94eS5yZXN1bHRWTy5iYWxhbmNlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2Ugc2xvdC5BcHBDb25zdGFudHMuU1BJTl9FTkQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdFZPID0gbm90ZS5nZXRCb2R5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LmVuYWJsZUJldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld0NvbXBvbmVudC5lbmFibGVTcGluKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LnVwZGF0ZUJhbGFuY2UodGhpcy5zZXJ2ZXJQcm94eS5yZXN1bHRWTy5iYWxhbmNlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQudXBkYXRlV2luKHRoaXMuc2VydmVyUHJveHkucmVzdWx0Vk8udG90YWxXaW4pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdQYW5lbE1lZGlhdG9yJ1xyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgUmVlbENvbnRhaW5lck1lZGlhdG9yXHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC52aWV3Lm1lZGlhdG9yLlJlZWxDb250YWluZXJNZWRpYXRvcicsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLk1lZGlhdG9yXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvLyBSZWZlcmVuY2VzXHJcbiAgICAgICAgd2luZG93U2l6ZVByb3h5OiBudWxsLFxyXG4gICAgICAgIGNvbmZpZ1Byb3h5OiBudWxsLFxyXG4gICAgICAgIHNlcnZlclByb3h5OiBudWxsLFxyXG5cclxuICAgICAgICAvLyBBZGRpdGlvbmFsIHZpZXdzXHJcbiAgICAgICAgd2luTGluZXNWaWV3OiBudWxsLFxyXG5cclxuICAgICAgICAvLyBOb3RpZmljYXRpb25zIHRoaXMgbWVkaWF0b3IgaXMgaW50ZXJlc3RlZCBpbiBcclxuICAgICAgICBsaXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICBzbG90LkFwcENvbnN0YW50cy5XSU5ET1dfUkVTSVpFRCxcclxuICAgICAgICAgICAgICAgIHNsb3QuQXBwQ29uc3RhbnRzLkFTU0VUU19MT0FERUQsXHJcbiAgICAgICAgICAgICAgICBzbG90LkFwcENvbnN0YW50cy5TUElOLFxyXG4gICAgICAgICAgICAgICAgc2xvdC5BcHBDb25zdGFudHMuU1BJTl9SRVNVTFQsXHJcbiAgICAgICAgICAgICAgICBzbG90LkFwcENvbnN0YW50cy5XSU5fQU5OT1VOQ0VNRU5ULFxyXG4gICAgICAgICAgICAgICAgc2xvdC5BcHBDb25zdGFudHMuQ0xFQVJfV0lOX0FOTk9VTkNFTUVOVFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uUmVnaXN0ZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRWaWV3Q29tcG9uZW50KG5ldyBzbG90LnZpZXcuY29tcG9uZW50LlJlZWxDb250YWluZXIoKSk7XHJcbiAgICAgICAgICAgIHRoaXMudmlld0NvbXBvbmVudC5zdGFnZS5vbihcclxuICAgICAgICAgICAgICAgIHNsb3Qudmlldy5ldmVudC5WaWV3RXZlbnRzLlJFRUxfU1BJTl9FTkQsXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uUmVlbFNwaW5FbmQuYmluZCh0aGlzKVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy53aW5MaW5lc1ZpZXcgPSBuZXcgc2xvdC52aWV3LmNvbXBvbmVudC5XaW5MaW5lcygpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy53aW5kb3dTaXplUHJveHkgPSB0aGlzLmZhY2FkZS5yZXRyaWV2ZVByb3h5KHNsb3QubW9kZWwucHJveHkuV2luZG93U2l6ZVByb3h5Lk5BTUUpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZ1Byb3h5ID0gdGhpcy5mYWNhZGUucmV0cmlldmVQcm94eShzbG90Lm1vZGVsLnByb3h5LkNvbmZpZ1Byb3h5Lk5BTUUpO1xyXG4gICAgICAgICAgICB0aGlzLnNlcnZlclByb3h5ID0gdGhpcy5mYWNhZGUucmV0cmlldmVQcm94eShzbG90Lm1vZGVsLnByb3h5LlNlcnZlclByb3h5Lk5BTUUpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uUmVlbFNwaW5FbmQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihzbG90LkFwcENvbnN0YW50cy5TUElOX0VORCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gSGFuZGxlIG5vdGlmaWNhdGlvbnMgZnJvbSBvdGhlciBQdXJlTVZDIGFjdG9yc1xyXG4gICAgICAgIGhhbmRsZU5vdGlmaWNhdGlvbjogZnVuY3Rpb24gKG5vdGUpIHtcclxuICAgICAgICAgICAgc3dpdGNoICggbm90ZS5nZXROYW1lKCkgKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHNsb3QuQXBwQ29uc3RhbnRzLldJTkRPV19SRVNJWkVEOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld0NvbXBvbmVudC5oYW5kbGVSZXNpemUobm90ZS5nZXRCb2R5KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBzbG90LkFwcENvbnN0YW50cy5BU1NFVFNfTE9BREVEOlxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZXM6IG5vdGUuZ2V0Qm9keSgpLnJlc291cmNlcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZUNvbmZpZ1ZPOiB0aGlzLmNvbmZpZ1Byb3h5LmdhbWVDb25maWdWTyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdWlDb25maWdWTzogdGhpcy5jb25maWdQcm94eS51aUNvbmZpZ1ZPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dTaXplVk86IHRoaXMud2luZG93U2l6ZVByb3h5LndpbmRvd1NpemVWT1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LmluaXQoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LnVwZGF0ZVN5bWJvbHNXaXRob3V0U3Bpbih0aGlzLnNlcnZlclByb3h5LnJlc3VsdFZPLmdldFN5bWJvbE1hdHJpeCgpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndpbkxpbmVzVmlldy5pbml0KGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld0NvbXBvbmVudC5zdGFnZS5hZGRDaGlsZCh0aGlzLndpbkxpbmVzVmlldy5zdGFnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHNsb3QuQXBwQ29uc3RhbnRzLlNQSU46XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LnNwaW4oKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2Ugc2xvdC5BcHBDb25zdGFudHMuU1BJTl9SRVNVTFQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LnN0b3BBbmRVcGRhdGVTeW1ib2xzKG5vdGUuZ2V0Qm9keSgpLmdldFN5bWJvbE1hdHJpeCgpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2Ugc2xvdC5BcHBDb25zdGFudHMuV0lOX0FOTk9VTkNFTUVOVDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndpbkxpbmVzVmlldy5zaG93TGluZShub3RlLmdldEJvZHkoKS53aW4ubGluZU51bWJlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHNsb3QuQXBwQ29uc3RhbnRzLkNMRUFSX1dJTl9BTk5PVU5DRU1FTlQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aW5MaW5lc1ZpZXcuaGlkZUFsbExpbmVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogJ1JlZWxDb250YWluZXJNZWRpYXRvcidcclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2NcclxuICogQGNsYXNzICAgICAgIFNvdW5kUGxheWVyTWVkaWF0b3JcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LnZpZXcubWVkaWF0b3IuU291bmRQbGF5ZXJNZWRpYXRvcicsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLk1lZGlhdG9yXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvLyBSZWZlcmVuY2VzXHJcbiAgICAgICAgc291bmQ6IG51bGwsXHJcbiAgICAgICAgY29uZmlnUHJveHk6IG51bGwsXHJcblxyXG4gICAgICAgIC8vIE5vdGlmaWNhdGlvbnMgdGhpcyBtZWRpYXRvciBpcyBpbnRlcmVzdGVkIGluIFxyXG4gICAgICAgIGxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgIHNsb3QuQXBwQ29uc3RhbnRzLkFTU0VUU19MT0FERUQsXHJcbiAgICAgICAgICAgICAgICBzbG90LkFwcENvbnN0YW50cy5CRVRfVVBEQVRFRCxcclxuICAgICAgICAgICAgICAgIHNsb3QuQXBwQ29uc3RhbnRzLlNQSU4sXHJcbiAgICAgICAgICAgICAgICBzbG90LkFwcENvbnN0YW50cy5XSU5fQU5OT1VOQ0VNRU5UXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25SZWdpc3RlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvL3RoaXMuc2V0Vmlld0NvbXBvbmVudCggLi4uICk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZ1Byb3h5ID0gdGhpcy5mYWNhZGUucmV0cmlldmVQcm94eShzbG90Lm1vZGVsLnByb3h5LkNvbmZpZ1Byb3h5Lk5BTUUpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIEhhbmRsZSBub3RpZmljYXRpb25zIGZyb20gb3RoZXIgUHVyZU1WQyBhY3RvcnNcclxuICAgICAgICBoYW5kbGVOb3RpZmljYXRpb246IGZ1bmN0aW9uIChub3RlKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoIG5vdGUuZ2V0TmFtZSgpICkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBzbG90LkFwcENvbnN0YW50cy5BU1NFVFNfTE9BREVEOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc291bmQgPSBub3RlLmdldEJvZHkoKS5zb3VuZDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2Ugc2xvdC5BcHBDb25zdGFudHMuQkVUX1VQREFURUQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3VuZC5wbGF5KFwiYmV0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBzbG90LkFwcENvbnN0YW50cy5TUElOOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc291bmQucGxheShcInNwaW5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHNsb3QuQXBwQ29uc3RhbnRzLldJTl9BTk5PVU5DRU1FTlQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIW5vdGUuZ2V0Qm9keSgpLmlzUmVwZWF0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3aW5TeW1ib2wgPSBub3RlLmdldEJvZHkoKS53aW4uc3ltYm9sO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIndpblN5bWJvbDogXCIgKyB3aW5TeW1ib2wpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25maWdQcm94eS5nYW1lQ29uZmlnVk8uaXNSb3lhbFN5bWJvbCh3aW5TeW1ib2wpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdW5kLnBsYXkoXCJ3aW5fcm95YWxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdW5kLnBsYXkoXCJ3aW5fc1wiICsgd2luU3ltYm9sKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBOQU1FOiAnU291bmRQbGF5ZXJNZWRpYXRvcidcclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2NcclxuICogQGNsYXNzICAgICAgIFdpbkFubm91bmNlTWVkaWF0b3JcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LnZpZXcubWVkaWF0b3IuV2luQW5ub3VuY2VNZWRpYXRvcicsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLk1lZGlhdG9yXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvLyBSZWZlcmVuY2VzXHJcbiAgICAgICAgc2VydmVyUHJveHk6IG51bGwsXHJcbiAgICAgICAgY29uZmlnUHJveHk6IG51bGwsXHJcblxyXG4gICAgICAgIGN1cnJlbnRXaW5JbmRleDogbnVsbCxcclxuICAgICAgICBpc0Fubm91bmNpbmc6IG51bGwsXHJcbiAgICAgICAgd2luQW5ub3VuY2VEZWxheTogbnVsbCxcclxuICAgICAgICByZXBlYXRDb3VudDogbnVsbCxcclxuICAgICAgICBpbnRlcnZhbElEOiBudWxsLFxyXG5cclxuICAgICAgICAvLyBOb3RpZmljYXRpb25zIHRoaXMgbWVkaWF0b3IgaXMgaW50ZXJlc3RlZCBpbiBcclxuICAgICAgICBsaXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICBzbG90LkFwcENvbnN0YW50cy5TVEFSVF9XSU5fQU5OT1VOQ0VNRU5UUyxcclxuICAgICAgICAgICAgICAgIHNsb3QuQXBwQ29uc3RhbnRzLlNUT1BfV0lOX0FOTk9VTkNFTUVOVFNcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvblJlZ2lzdGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VydmVyUHJveHkgPSB0aGlzLmZhY2FkZS5yZXRyaWV2ZVByb3h5KHNsb3QubW9kZWwucHJveHkuU2VydmVyUHJveHkuTkFNRSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlnUHJveHkgPSB0aGlzLmZhY2FkZS5yZXRyaWV2ZVByb3h5KHNsb3QubW9kZWwucHJveHkuQ29uZmlnUHJveHkuTkFNRSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYW5ub3VuY2VXaW46IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMucmVwZWF0Q291bnQgPj0gdGhpcy5jb25maWdQcm94eS51aUNvbmZpZ1ZPLnJlcGVhdFdpbnMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcEFubm91bmNlbWVudEludGVydmFsKCk7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuaXNBbm5vdW5jaW5nKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihcclxuICAgICAgICAgICAgICAgICAgICBzbG90LkFwcENvbnN0YW50cy5XSU5fQU5OT1VOQ0VNRU5ULFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luOiB0aGlzLnNlcnZlclByb3h5LnJlc3VsdFZPLndpbnNbdGhpcy5jdXJyZW50V2luSW5kZXhdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1JlcGVhdGluZzogdGhpcy5yZXBlYXRDb3VudCA+IDBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5jdXJyZW50V2luSW5kZXggPCB0aGlzLnNlcnZlclByb3h5LnJlc3VsdFZPLndpbnMubGVuZ3RoIC0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50V2luSW5kZXgrKztcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFdpbkluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlcGVhdENvdW50Kys7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnRlcnZhbElEID0gc2V0VGltZW91dChcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFubm91bmNlV2luLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWdQcm94eS51aUNvbmZpZ1ZPLndpbkFubm91bmNlRGVsYXkgKiAxMDAwXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3RvcEFubm91bmNlbWVudEludGVydmFsOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWxJRCk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNBbm5vdW5jaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihzbG90LkFwcENvbnN0YW50cy5DTEVBUl9XSU5fQU5OT1VOQ0VNRU5UKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBIYW5kbGUgbm90aWZpY2F0aW9ucyBmcm9tIG90aGVyIFB1cmVNVkMgYWN0b3JzXHJcbiAgICAgICAgaGFuZGxlTm90aWZpY2F0aW9uOiBmdW5jdGlvbiAobm90ZSkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKCBub3RlLmdldE5hbWUoKSApIHtcclxuICAgICAgICAgICAgICAgIGNhc2Ugc2xvdC5BcHBDb25zdGFudHMuU1RBUlRfV0lOX0FOTk9VTkNFTUVOVFM6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5zZXJ2ZXJQcm94eS5yZXN1bHRWTy53aW5zLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWxJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFdpbkluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0Fubm91bmNpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlcGVhdENvdW50ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbm5vdW5jZVdpbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2Ugc2xvdC5BcHBDb25zdGFudHMuU1RPUF9XSU5fQU5OT1VOQ0VNRU5UUzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BBbm5vdW5jZW1lbnRJbnRlcnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdXaW5Bbm5vdW5jZU1lZGlhdG9yJ1xyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgQXBwXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFBJWEkgZ2xvYmFsIHZhcmlhYmxlcyAqL1xyXG52YXIgUFhSb290LCBQWFJlbmRlcmVyO1xyXG5cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3QuQXBwJyxcclxuICAgICAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjYWRlLnJlZ2lzdGVyQ29tbWFuZChzbG90LkFwcENvbnN0YW50cy5TVEFSVFVQLCBzbG90LmNvbnRyb2xsZXIuY29tbWFuZC5TdGFydHVwQ29tbWFuZCk7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjYWRlLnNlbmROb3RpZmljYXRpb24oc2xvdC5BcHBDb25zdGFudHMuU1RBUlRVUCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbG9hZGVyUHJveHkgPSB0aGlzLmZhY2FkZS5yZXRyaWV2ZVByb3h5KHNsb3QubW9kZWwucHJveHkuTG9hZGVyUHJveHkuTkFNRSk7XHJcbiAgICAgICAgICAgIGxvYWRlclByb3h5LmxvYWRBc3NldHMoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBTVEFSVFVQOiAnc3RhcnR1cCcsXHJcbiAgICAgICAgZmFjYWRlOiBwdXJlbXZjLkZhY2FkZS5nZXRJbnN0YW5jZSggc2xvdC5BcHBDb25zdGFudHMuQ09SRV9OQU1FIClcclxuICAgIH1cclxuKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
