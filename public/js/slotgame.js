/*Generated on:Mon Aug 29 2016 10:43:44 GMT+1000 (AUS Eastern Standard Time)*//**
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
        ASSET_LOAD_BEGIN:           "AppConstants_asset_load_begin",
        ASSET_LOAD_COMPLETE:        "AppConstants_asset_load_complete",
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

        /**
         * Provides dimensions of content to fill whole area of the screen
         * without disturbing the aspect ratio
         * @param content
         * @param screen
         * @returns {object}
         */
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
         * Provides dimensionss of content to fit whole area of the screen
         * wihtout disturbing the aspect ratio.
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
        }
    }
);

/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc        Collection of all configs
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
 * @desc        Loads assets and sounds
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

            this.sound = new Howl({
                src: ["assets/sounds.mp3", "assets/sounds.ogg"],
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

            this.sendNotification(slot.AppConstants.ASSET_LOAD_BEGIN, this.sound);
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
                this.sendNotification(slot.AppConstants.ASSET_LOAD_COMPLETE, this.sound);
            }
        },

    },

    // STATIC MEMBERS
    {
        NAME: "LoaderProxy"
    }
);
/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc        Communicates with server and handles data
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
 * @desc        Listens to browser's resize event and informs app if resized
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
 * @desc        Generic game configuration
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
 * @desc        Frontend configuration
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
/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @class       AssetLoadCompleteCommand
 * @memberof    slot.controller.command
 * @desc        Command registered to ASSET_LOAD_COMPLETE notification.
 *              Fired when asset loading is complete. Initializes server.
 */
puremvc.define(
    {
        name: 'slot.controller.command.AssetLoadCompleteCommand',
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
 * @desc        Registers commands with notifications
 * @class       PrepControllerCommand
 */
puremvc.define(
    {
        name: 'slot.controller.command.PrepControllerCommand',
        parent: puremvc.SimpleCommand
    },
  
    // INSTANCE MEMBERS
    {
        execute: function (note) {
            this.facade.registerCommand(slot.AppConstants.ASSET_LOAD_COMPLETE, slot.controller.command.AssetLoadCompleteCommand);
            this.facade.registerCommand(slot.AppConstants.WINDOW_RESIZED, slot.controller.command.WindowResizeCommand);
            this.facade.registerCommand(slot.AppConstants.SPIN, slot.controller.command.SpinCommand);
            this.facade.registerCommand(slot.AppConstants.SPIN_END, slot.controller.command.SpinEndCommand);
        }
    }    
);
/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc        Resgiters proxys with facade
 * @class       PrepModelCommand
 */
puremvc.define(
    {
        name: 'slot.controller.command.PrepModelCommand',
        parent: puremvc.SimpleCommand
    },
  
    // INSTANCE MEMBERS
    {
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
 * @desc        Initializes Pixi
 *              Creates PXRoot which is used through the App to refer main stage
 *              Tap event to switch to fullscreen on mobiles
 *              Contains main render loop.
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
 * @desc        Registers all mediators with the facade
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
            this.facade.registerMediator(new slot.view.mediator.PreloaderMediator());
        }
    }
);

/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc        Registered to SPIN note
 *              Calls server spin
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
 * @desc        Win announcements start now
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
 * @desc        Main command which starts
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
 * @desc        Resizes Pixi renderer as per new width and height
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
            console.log(windowSizeVO.width + " x " + windowSizeVO.height);
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
 * @class       Preloader
 */
puremvc.define(
    {
        name: 'slot.view.component.Preloader',
        constructor: function () {
            this.stage = new PIXI.Container();
        }
    },

    // INSTANCE MEMBERS
    {
        // Stage Members
        stage: null,
        preloader: null,
        loadComplete: null,

        init: function (windowSizeVO) {
            // White rounded rectangle behind the whole reel area
            this.preloader = new PIXI.Graphics();
            this.preloader.beginFill(0xFFFFFF);
            this.preloader.drawRect(0, 0, windowSizeVO.width * 0.1, windowSizeVO.height * 0.01);
            this.stage.pivot.set(this.preloader.width/2, this.preloader.height/2);
            this.stage.x = windowSizeVO.width/2;
            this.stage.y = windowSizeVO.height/2;
            this.stage.addChild(this.preloader);
            PXRoot.addChild(this.stage);

            requestAnimationFrame(this.rotate.bind(this));
        },

        rotate: function(){
            if(this.loadComplete){
                PXRoot.removeChild(this.stage);
            }else{
                this.stage.rotation += 0.1;
                requestAnimationFrame(this.rotate.bind(this));
            }
        },

        hide: function () {
            this.loadComplete = true;
        }
    },

    // STATIC MEMBERS
    {
        NAME: 'Preloader'
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
                        slot.AppConstants.ASSET_LOAD_COMPLETE
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
                case slot.AppConstants.ASSET_LOAD_COMPLETE:
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
                slot.AppConstants.ASSET_LOAD_COMPLETE,
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
                case slot.AppConstants.ASSET_LOAD_COMPLETE:
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
 * @class       PreloaderMediator
 */
puremvc.define(
    {
        name: 'slot.view.mediator.PreloaderMediator',
        parent: puremvc.Mediator
    },

    // INSTANCE MEMBERS
    {
        // References
        windowSizeProxy: null,

        // Notifications this mediator is interested in 
        listNotificationInterests: function () {
            return [
                slot.AppConstants.ASSET_LOAD_BEGIN,
                slot.AppConstants.ASSET_LOAD_COMPLETE
            ];
        },

        onRegister: function () {
            this.setViewComponent(new slot.view.component.Preloader());
            this.windowSizeProxy = this.facade.retrieveProxy(slot.model.proxy.WindowSizeProxy.NAME);
        },

        // Handle notifications from other PureMVC actors
        handleNotification: function (note) {
            switch ( note.getName() ) {
                case slot.AppConstants.ASSET_LOAD_COMPLETE:
                    this.viewComponent.hide();
                    break;
                case slot.AppConstants.ASSET_LOAD_BEGIN:
                    this.viewComponent.init(this.windowSizeProxy.windowSizeVO);
                    break;
            }
        }
    },

    // STATIC MEMBERS
    {
        NAME: 'PreloaderMediator'
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
                slot.AppConstants.ASSET_LOAD_COMPLETE,
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
                case slot.AppConstants.ASSET_LOAD_COMPLETE:
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
                slot.AppConstants.ASSET_LOAD_COMPLETE,
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
                case slot.AppConstants.ASSET_LOAD_COMPLETE:
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFwcENvbnN0YW50cy5qcyIsImVudW0vT1JJRU5UQVRJT04uanMiLCJsaWIvVXRpbHMuanMiLCJwcm94eS9Db25maWdQcm94eS5qcyIsInByb3h5L0xvYWRlclByb3h5LmpzIiwicHJveHkvU2VydmVyUHJveHkuanMiLCJwcm94eS9XaW5kb3dTaXplUHJveHkuanMiLCJ2by9HYW1lQ29uZmlnVk8uanMiLCJ2by9SZXN1bHRWTy5qcyIsInZvL1VJQ29uZmlnVk8uanMiLCJ2by9XaW5kb3dTaXplVk8uanMiLCJwcm94eS9zZXJ2aWNlL1NlcnZlclNlcnZpY2UuanMiLCJjb21tYW5kL0Fzc2V0TG9hZENvbXBsZXRlQ29tbWFuZC5qcyIsImNvbW1hbmQvUHJlcENvbnRyb2xsZXJDb21tYW5kLmpzIiwiY29tbWFuZC9QcmVwTW9kZWxDb21tYW5kLmpzIiwiY29tbWFuZC9QcmVwUGl4aUNvbW1hbmQuanMiLCJjb21tYW5kL1ByZXBWaWV3Q29tbWFuZC5qcyIsImNvbW1hbmQvU3BpbkNvbW1hbmQuanMiLCJjb21tYW5kL1NwaW5FbmRDb21tYW5kLmpzIiwiY29tbWFuZC9TdGFydHVwQ29tbWFuZC5qcyIsImNvbW1hbmQvV2luZG93UmVzaXplQ29tbWFuZC5qcyIsImNvbXBvbmVudC9CRy5qcyIsImNvbXBvbmVudC9QYW5lbC5qcyIsImNvbXBvbmVudC9QcmVsb2FkZXIuanMiLCJjb21wb25lbnQvUmVlbC5qcyIsImNvbXBvbmVudC9SZWVsQ2VsbC5qcyIsImNvbXBvbmVudC9SZWVsQ29udGFpbmVyLmpzIiwiY29tcG9uZW50L1dpbkxpbmVzLmpzIiwiZXZlbnQvVmlld0V2ZW50cy5qcyIsIm1lZGlhdG9yL0JHTWVkaWF0b3IuanMiLCJtZWRpYXRvci9QYW5lbE1lZGlhdG9yLmpzIiwibWVkaWF0b3IvUHJlbG9hZGVyTWVkaWF0b3IuanMiLCJtZWRpYXRvci9SZWVsQ29udGFpbmVyTWVkaWF0b3IuanMiLCJtZWRpYXRvci9Tb3VuZFBsYXllck1lZGlhdG9yLmpzIiwibWVkaWF0b3IvV2luQW5ub3VuY2VNZWRpYXRvci5qcyIsIkFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOEVBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic2xvdGdhbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgQXBwQ29uc3RhbnRzXHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiBcInNsb3QuQXBwQ29uc3RhbnRzXCJcclxuICAgIH0sXHJcblxyXG4gICAge30sXHJcblxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvLyBUaGUgbXVsdGl0b24ga2V5IGZvciB0aGlzIGFwcCdzIHNpbmdsZSBjb3JlXHJcbiAgICAgICAgQ09SRV9OQU1FOiAgICAgICAgICAgICAgJ1Nsb3RHYW1lJyxcclxuXHJcbiAgICAgICAgLy8gTm90aWZpY2F0aW9uc1xyXG4gICAgICAgIFNUQVJUVVA6ICAgICAgICAgICAgICAgICAgICBcIkFwcENvbnN0YW50c19zdGFydHVwXCIsXHJcblxyXG4gICAgICAgIC8vID09PVxyXG4gICAgICAgIEFTU0VUX0xPQURfQkVHSU46ICAgICAgICAgICBcIkFwcENvbnN0YW50c19hc3NldF9sb2FkX2JlZ2luXCIsXHJcbiAgICAgICAgQVNTRVRfTE9BRF9DT01QTEVURTogICAgICAgIFwiQXBwQ29uc3RhbnRzX2Fzc2V0X2xvYWRfY29tcGxldGVcIixcclxuICAgICAgICBXSU5ET1dfUkVTSVpFRDogICAgICAgICAgICAgXCJBcHBDb25zdGFudHNfd2luZG93X3Jlc2l6ZWRcIixcclxuICAgICAgICBTRVJWRVJfSU5JVDogICAgICAgICAgICAgICAgXCJBcHBDb25zdGFudHNfc2VydmVyX2luaXRcIixcclxuICAgICAgICBTUElOOiAgICAgICAgICAgICAgICAgICAgICAgXCJBcHBDb25zdGFudHNfc3BpblwiLFxyXG4gICAgICAgIFNQSU5fUkVTVUxUOiAgICAgICAgICAgICAgICBcIkFwcENvbnN0YW50c19zcGluX3Jlc3VsdFwiLFxyXG4gICAgICAgIFNQSU5fRU5EOiAgICAgICAgICAgICAgICAgICBcIkFwcENvbnN0YW50c19zcGluX2VuZFwiLFxyXG5cclxuICAgICAgICBTVEFSVF9XSU5fQU5OT1VOQ0VNRU5UUzogICAgXCJBcHBDb25zdGFudHNfc3RhcnRfd2luX2Fubm91bmNlbWVudHNcIixcclxuICAgICAgICBTVE9QX1dJTl9BTk5PVU5DRU1FTlRTOiAgICAgXCJBcHBDb25zdGFudHNfc3RvcF93aW5fYW5ub3VuY2VtZW50c1wiLFxyXG4gICAgICAgIFdJTl9BTk5PVU5DRU1FTlQ6ICAgICAgICAgICBcIkFwcENvbnN0YW50c193aW5fYW5ub3VuY2VtZW50XCIsXHJcbiAgICAgICAgQ0xFQVJfV0lOX0FOTk9VTkNFTUVOVDogICAgIFwiQXBwQ29uc3RhbnRzX2NsZWFyX3dpbl9hbm5vdW5jZW1lbnRcIixcclxuXHJcbiAgICAgICAgQkVUX1VQREFURUQ6ICAgICAgICAgICAgICAgIFwiQXBwQ29uc3RhbnRzX2JldF91cGRhdGVkXCJcclxuICAgIH1cclxuKTsiLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgT1JJRU5UQVRJT05cclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90Lm1vZGVsLmVudW0uT1JJRU5UQVRJT04nXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHt9LFxyXG5cclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogXCJPUklFTlRBVElPTlwiLFxyXG4gICAgICAgIExBTkRTQ0FQRTogXCJsYW5kc2NhcGVcIixcclxuICAgICAgICBQT1JUUkFJVDogXCJwb3J0cmFpdFwiXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBVdGlsc1xyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3QubW9kZWwubGliLlV0aWxzJ1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgZml0Q29udGVudE9uU2NyZWVuOiBmdW5jdGlvbihvKXtcclxuICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSBvLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIHZhciBjb250ZW50RGltZW5zaW9ucyA9IG8uY29udGVudERpbWVuc2lvbnMgfHwgby5jb250ZW50O1xyXG5cclxuICAgICAgICAgICAgdmFyIHNpemUgPSBzbG90Lm1vZGVsLmxpYi5VdGlscy5nZXRTaXplVG9GaXRTY3JlZW4oXHJcbiAgICAgICAgICAgICAgICBjb250ZW50RGltZW5zaW9ucyxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogby5zY3JlZW4ud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBvLnNjcmVlbi5oZWlnaHRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgY29udGVudC54ID0gby5zY3JlZW4ueCArICgoby5zY3JlZW4ud2lkdGggLSBzaXplLndpZHRoKS8yKTtcclxuICAgICAgICAgICAgY29udGVudC55ID0gby5zY3JlZW4ueSArICgoby5zY3JlZW4uaGVpZ2h0IC0gc2l6ZS5oZWlnaHQpLzIpO1xyXG4gICAgICAgICAgICBjb250ZW50LndpZHRoID0gc2l6ZS53aWR0aDtcclxuICAgICAgICAgICAgY29udGVudC5oZWlnaHQgPSBzaXplLmhlaWdodDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6IFwiVXRpbHNcIixcclxuXHJcbiAgICAgICAgZ2V0T3JpZW50YXRpb246IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQpe1xyXG4gICAgICAgICAgICByZXR1cm4gICh3aWR0aCA+IGhlaWdodCkgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbG90Lm1vZGVsLmVudW0uT1JJRU5UQVRJT04uTEFORFNDQVBFOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbG90Lm1vZGVsLmVudW0uT1JJRU5UQVRJT04uUE9SVFJBSVQ7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHJvdmlkZXMgZGltZW5zaW9ucyBvZiBjb250ZW50IHRvIGZpbGwgd2hvbGUgYXJlYSBvZiB0aGUgc2NyZWVuXHJcbiAgICAgICAgICogd2l0aG91dCBkaXN0dXJiaW5nIHRoZSBhc3BlY3QgcmF0aW9cclxuICAgICAgICAgKiBAcGFyYW0gY29udGVudFxyXG4gICAgICAgICAqIEBwYXJhbSBzY3JlZW5cclxuICAgICAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldFNpemVUb0ZpbGxTY3JlZW46IGZ1bmN0aW9uKGNvbnRlbnQsIHNjcmVlbil7XHJcbiAgICAgICAgICAgIGlmKChzY3JlZW4ud2lkdGgvc2NyZWVuLmhlaWdodCkgPiAoY29udGVudC53aWR0aC9jb250ZW50LmhlaWdodCkpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogc2NyZWVuLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBjb250ZW50LmhlaWdodCAqIChzY3JlZW4ud2lkdGgvY29udGVudC53aWR0aClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGNvbnRlbnQud2lkdGggKiAoc2NyZWVuLmhlaWdodC9jb250ZW50LmhlaWdodCksXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBzY3JlZW4uaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHJvdmlkZXMgZGltZW5zaW9uc3Mgb2YgY29udGVudCB0byBmaXQgd2hvbGUgYXJlYSBvZiB0aGUgc2NyZWVuXHJcbiAgICAgICAgICogd2lodG91dCBkaXN0dXJiaW5nIHRoZSBhc3BlY3QgcmF0aW8uXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGZpdE9iaiAtIE9iamVjdCB3aXRoIGRhdGEgdG8gYXBwbHkgZml0XHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0U2l6ZVRvRml0U2NyZWVuOiBmdW5jdGlvbihjb250ZW50LCBzY3JlZW4pe1xyXG4gICAgICAgICAgICBpZigoc2NyZWVuLndpZHRoL3NjcmVlbi5oZWlnaHQpID4gKGNvbnRlbnQud2lkdGgvY29udGVudC5oZWlnaHQpKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBjb250ZW50LndpZHRoICogKHNjcmVlbi5oZWlnaHQvY29udGVudC5oZWlnaHQpLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogc2NyZWVuLmhlaWdodFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHNjcmVlbi53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGNvbnRlbnQuaGVpZ2h0ICogKHNjcmVlbi53aWR0aC9jb250ZW50LndpZHRoKVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2MgICAgICAgIENvbGxlY3Rpb24gb2YgYWxsIGNvbmZpZ3NcclxuICogQGNsYXNzICAgICAgIENvbmZpZ1Byb3h5XHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC5tb2RlbC5wcm94eS5Db25maWdQcm94eScsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLlByb3h5XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvLyBEYXRhXHJcbiAgICAgICAgZ2FtZUNvbmZpZ1ZPOiBudWxsLFxyXG4gICAgICAgIHVpQ29uZmlnVk86IG51bGwsXHJcblxyXG4gICAgICAgIG9uUmVnaXN0ZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lQ29uZmlnVk8gPSBuZXcgc2xvdC5tb2RlbC52by5HYW1lQ29uZmlnVk8oKTtcclxuICAgICAgICAgICAgdGhpcy51aUNvbmZpZ1ZPID0gbmV3IHNsb3QubW9kZWwudm8uVUlDb25maWdWTygpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBOQU1FOiBcIkNvbmZpZ1Byb3h5XCJcclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2MgICAgICAgIExvYWRzIGFzc2V0cyBhbmQgc291bmRzXHJcbiAqIEBjbGFzcyAgICAgICBMb2FkZXJQcm94eVxyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3QubW9kZWwucHJveHkuTG9hZGVyUHJveHknLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5Qcm94eVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgbG9hZGVyOiBudWxsLFxyXG4gICAgICAgIHNvdW5kOiBudWxsLFxyXG5cclxuICAgICAgICBncmFwaGljc0xvYWRlZDogbnVsbCxcclxuICAgICAgICBzb3VuZHNMb2FkZWQ6IG51bGwsXHJcblxyXG4gICAgICAgIG9uUmVnaXN0ZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbG9hZEFzc2V0czogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGVyID0gbmV3IFBJWEkubG9hZGVycy5Mb2FkZXIoXCJcIiwzKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkZXJcclxuICAgICAgICAgICAgICAgIC5hZGQoJ2Fzc2V0cy9zcHJpdGVzaGVldC5qc29uJylcclxuICAgICAgICAgICAgICAgIC5sb2FkKHRoaXMub25HcmFwaGljc0xvYWRDb21wbGV0ZS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc291bmQgPSBuZXcgSG93bCh7XHJcbiAgICAgICAgICAgICAgICBzcmM6IFtcImFzc2V0cy9zb3VuZHMubXAzXCIsIFwiYXNzZXRzL3NvdW5kcy5vZ2dcIl0sXHJcbiAgICAgICAgICAgICAgICBzcHJpdGU6IHtcclxuICAgICAgICAgICAgICAgICAgICBiZXQ6IFswLCAzNzBdLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwaW46IFszNzAsIDIyMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgd2luX3MxOiBbMzk0MCwgMTIwMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgd2luX3MyOiBbNTkwLCAxNDAwXSxcclxuICAgICAgICAgICAgICAgICAgICB3aW5fczM6IFs1OTgwLCAxMDYwXSxcclxuICAgICAgICAgICAgICAgICAgICB3aW5fczQ6IFsyMTEwLCAxNjMwXSxcclxuICAgICAgICAgICAgICAgICAgICB3aW5fcm95YWw6IFs3MDQwLCA3MjBdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zb3VuZC5vbihcImxvYWRcIiwgdGhpcy5vblNvdW5kc0xvYWRDb21wbGV0ZS5iaW5kKHRoaXMpKVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKHNsb3QuQXBwQ29uc3RhbnRzLkFTU0VUX0xPQURfQkVHSU4sIHRoaXMuc291bmQpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uU291bmRzTG9hZENvbXBsZXRlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLnNvdW5kc0xvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZEFzc2V0c0xvYWRlZE5vdGUoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvbkdyYXBoaWNzTG9hZENvbXBsZXRlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLmdyYXBoaWNzTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zZW5kQXNzZXRzTG9hZGVkTm90ZSgpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNlbmRBc3NldHNMb2FkZWROb3RlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmdyYXBoaWNzTG9hZGVkICYmIHRoaXMuc291bmRzTG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oc2xvdC5BcHBDb25zdGFudHMuQVNTRVRfTE9BRF9DT01QTEVURSwgdGhpcy5zb3VuZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBOQU1FOiBcIkxvYWRlclByb3h5XCJcclxuICAgIH1cclxuKTsiLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzYyAgICAgICAgQ29tbXVuaWNhdGVzIHdpdGggc2VydmVyIGFuZCBoYW5kbGVzIGRhdGFcclxuICogQGNsYXNzICAgICAgIFNlcnZlclByb3h5XHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC5tb2RlbC5wcm94eS5TZXJ2ZXJQcm94eScsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLlByb3h5XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvLyBEYXRhXHJcbiAgICAgICAgcmVzdWx0Vk86IG51bGwsXHJcblxyXG4gICAgICAgIC8vIFNlcnZpY2VzXHJcbiAgICAgICAgc2VydmVyOiBudWxsLFxyXG5cclxuICAgICAgICBvblJlZ2lzdGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzdWx0Vk8gPSBuZXcgc2xvdC5tb2RlbC52by5SZXN1bHRWTygpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXJ2ZXIgPSBuZXcgc2xvdC5tb2RlbC5wcm94eS5zZXJ2aWNlLlNlcnZlclNlcnZpY2UoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLnNlcnZlci5pbml0KHRoaXMub25TZXJ2ZXJJbml0LmJpbmQodGhpcykpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNwaW46IGZ1bmN0aW9uKGJldEFtb3VudCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlcnZlci5sb2FkU3BpblJlc3VsdChiZXRBbW91bnQsIHRoaXMub25SZXN1bHQuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25TZXJ2ZXJJbml0OiBmdW5jdGlvbihyZXN1bHQpe1xyXG4gICAgICAgICAgICB0aGlzLnJlc3VsdFZPLnVwZGF0ZShyZXN1bHQpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oc2xvdC5BcHBDb25zdGFudHMuU0VSVkVSX0lOSVQsIHRoaXMucmVzdWx0Vk8pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uUmVzdWx0OiBmdW5jdGlvbihyZXN1bHQpe1xyXG4gICAgICAgICAgICB0aGlzLnJlc3VsdFZPLnVwZGF0ZShyZXN1bHQpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oc2xvdC5BcHBDb25zdGFudHMuU1BJTl9SRVNVTFQsIHRoaXMucmVzdWx0Vk8pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogXCJTZXJ2ZXJQcm94eVwiXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjICAgICAgICBMaXN0ZW5zIHRvIGJyb3dzZXIncyByZXNpemUgZXZlbnQgYW5kIGluZm9ybXMgYXBwIGlmIHJlc2l6ZWRcclxuICogQGNsYXNzICAgICAgIFdpbmRvd1NpemVQcm94eVxyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3QubW9kZWwucHJveHkuV2luZG93U2l6ZVByb3h5JyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuUHJveHlcclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIC8vIERhdGFcclxuICAgICAgICB3aW5kb3dTaXplVk86IG51bGwsXHJcblxyXG4gICAgICAgIG9uUmVnaXN0ZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy53aW5kb3dTaXplVk8gPSBuZXcgc2xvdC5tb2RlbC52by5XaW5kb3dTaXplVk8od2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XHJcblxyXG4gICAgICAgICAgICBpZih3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMub25SZXNpemUuYmluZCh0aGlzKSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYod2luZG93LmF0dGFjaEV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmF0dGFjaEV2ZW50KCdvbnJlc2l6ZScsIHRoaXMub25SZXNpemUuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvblJlc2l6ZTogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy53aW5kb3dTaXplVk8udXBkYXRlKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oc2xvdC5BcHBDb25zdGFudHMuV0lORE9XX1JFU0laRUQsIHRoaXMud2luZG93U2l6ZVZPKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogXCJXaW5kb3dTaXplUHJveHlcIlxyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzYyAgICAgICAgR2VuZXJpYyBnYW1lIGNvbmZpZ3VyYXRpb25cclxuICogQGNsYXNzICAgICAgIEdhbWVDb25maWdWT1xyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3QubW9kZWwudm8uR2FtZUNvbmZpZ1ZPJ1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgbnVtUmVlbHM6IDUsXHJcbiAgICAgICAgbnVtUm93czogMyxcclxuICAgICAgICBudW1TeW1ib2xzOiA4LFxyXG4gICAgICAgIG51bUxpbmVzOiA1LFxyXG4gICAgICAgIHJlZWxzOlxyXG4gICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICBbMSw1LDIsMSw2LDUsOCw1LDEsMiwzLDcsNCw1LDgsMSw0LDMsMiw1LDZdLFxyXG4gICAgICAgICAgICAgICAgWzUsMSw2LDMsNyw4LDEsMywyLDQsNiw4LDUsNCw1LDMsOCw3LDUsNCwxLDcsNCw4LDRdLFxyXG4gICAgICAgICAgICAgICAgWzgsNCwxLDMsMiw2LDcsMiwzLDQsMSw1LDYsNyw4LDIsNSw0LDMsMSwyLDcsNiw3LDEsNCwzLDIsNF0sXHJcbiAgICAgICAgICAgICAgICBbMSw3LDQsMiwzLDgsNCwzLDIsNSw2LDcsMiwzLDQsNSw4LDEsMiw2LDIsNCwyLDYsMyw3LDgsNCw2LDIsMywxLDIsNSw2LDMsNF0sXHJcbiAgICAgICAgICAgICAgICBbOCw1LDFdXHJcbiAgICAgICAgICAgICAgICAvL1s0LDRdLFxyXG4gICAgICAgICAgICAgICAgLy9bNCw0XSxcclxuICAgICAgICAgICAgICAgIC8vWzQsNF0sXHJcbiAgICAgICAgICAgICAgICAvL1sxLDIsNCw0XSxcclxuICAgICAgICAgICAgICAgIC8vWzEsMiw0LDRdXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgcGF5dGFibGU6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcIjFcIjpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCIzXCI6IDI1MCxcclxuICAgICAgICAgICAgICAgIFwiNFwiOiA1MDAsXHJcbiAgICAgICAgICAgICAgICBcIjVcIjogMTAwMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIjJcIjpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCIzXCI6IDIwMCxcclxuICAgICAgICAgICAgICAgIFwiNFwiOiA0NTAsXHJcbiAgICAgICAgICAgICAgICBcIjVcIjogODAwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiM1wiOlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcIjNcIjogMTUwLFxyXG4gICAgICAgICAgICAgICAgXCI0XCI6IDQwMCxcclxuICAgICAgICAgICAgICAgIFwiNVwiOiA3MDBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCI0XCI6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiM1wiOiAxMDAsXHJcbiAgICAgICAgICAgICAgICBcIjRcIjogMzUwLFxyXG4gICAgICAgICAgICAgICAgXCI1XCI6IDYwMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIjVcIjpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCIzXCI6IDkwLFxyXG4gICAgICAgICAgICAgICAgXCI0XCI6IDMwMCxcclxuICAgICAgICAgICAgICAgIFwiNVwiOiA3MDBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCI2XCI6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiM1wiOiA4MCxcclxuICAgICAgICAgICAgICAgIFwiNFwiOiAyNTAsXHJcbiAgICAgICAgICAgICAgICBcIjVcIjogNjAwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiN1wiOlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcIjNcIjogNzAsXHJcbiAgICAgICAgICAgICAgICBcIjRcIjogMjAwLFxyXG4gICAgICAgICAgICAgICAgXCI1XCI6IDUwMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIjhcIjpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCIzXCI6IDYwLFxyXG4gICAgICAgICAgICAgICAgXCI0XCI6IDEwMCxcclxuICAgICAgICAgICAgICAgIFwiNVwiOiA0MDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGVub21pbmF0aW9uczpcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgMC4yNSwgMC41MCwgMSwgMiwgNSwgMTBcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICBkZWZhdWx0RGVub21pbmF0aW9uOiAyLFxyXG4gICAgICAgIGxpbmVzOlxyXG4gICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICBbMSwgMSwgMSwgMSwgMV0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMiwgMiwgMiwgMiwgMl0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMSwgMiwgMSwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMiwgMSwgMCwgMSwgMl1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICBtaW5PYWs6IDMsXHJcbiAgICAgICAgaHBTeW1ib2xzOiBbMSwyLDMsNF0sXHJcbiAgICAgICAgcm95YWxzOiBbNSw2LDcsOF0sXHJcblxyXG4gICAgICAgIC8vIFJldHVybnMgYXJyYXkgd2l0aCBhbGwgcG9zc2libGUgc3ltYm9sc1xyXG4gICAgICAgIGdldFN5bWJvbHM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciBzeW1ib2xzID0gW107XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDE7IGkgPD0gdGhpcy5udW1TeW1ib2xzOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgc3ltYm9scy5wdXNoKFwic1wiICsgaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHN5bWJvbHM7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaXNSb3lhbFN5bWJvbDogZnVuY3Rpb24oc3ltYm9sSUQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yb3lhbHMuaW5kZXhPZihzeW1ib2xJRCkgIT0gLTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBOQU1FOiBcIkdhbWVDb25maWdWT1wiXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBSZXN1bHRWT1xyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3QubW9kZWwudm8uUmVzdWx0Vk8nXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBtYXRyaXg6XHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIFsxLDQsNV0sXHJcbiAgICAgICAgICAgICAgICBbNSw2LDNdLFxyXG4gICAgICAgICAgICAgICAgWzEsMiw4XSxcclxuICAgICAgICAgICAgICAgIFszLDcsNl0sXHJcbiAgICAgICAgICAgICAgICBbMiw2LDVdXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgYmFsYW5jZTogMCxcclxuICAgICAgICB0b3RhbFdpbjogMCxcclxuICAgICAgICBudW1XaW5zOiAwLFxyXG4gICAgICAgIHdpbnM6IG51bGwsXHJcblxyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24ocmVzdWx0KXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcclxuICAgICAgICAgICAgdGhpcy5tYXRyaXggPSByZXN1bHQubWF0cml4O1xyXG4gICAgICAgICAgICB0aGlzLmJhbGFuY2UgPSByZXN1bHQuYmFsYW5jZTtcclxuICAgICAgICAgICAgdGhpcy50b3RhbFdpbiA9IHJlc3VsdC50b3RhbFdpbjtcclxuICAgICAgICAgICAgdGhpcy5udW1XaW5zID0gcmVzdWx0Lm51bVdpbnM7XHJcbiAgICAgICAgICAgIHRoaXMud2lucyA9IHJlc3VsdC53aW5zO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdldFN5bWJvbE1hdHJpeDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWF0cml4Lm1hcChmdW5jdGlvbihfLCBpbmRleCwgbWF0cml4KXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtYXRyaXhbaW5kZXhdLm1hcChmdW5jdGlvbihzeW1ib2xJRCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwic1wiICsgc3ltYm9sSUQ7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6IFwiUmVzdWx0Vk9cIlxyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzYyAgICAgICAgRnJvbnRlbmQgY29uZmlndXJhdGlvblxyXG4gKiBAY2xhc3MgICAgICAgVUlDb25maWdWT1xyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3QubW9kZWwudm8uVUlDb25maWdWTydcclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIHN5bWJvbFdpZHRoOiAxMzAsXHJcbiAgICAgICAgc3ltYm9sSGVpZ2h0OiAxMzAsXHJcblxyXG4gICAgICAgIHJlZWxIU2VwYXJhdG9yOiAxMCxcclxuICAgICAgICByZWVsVlNlcGFyYXRvcjogMTAsXHJcbiAgICAgICAgcmVlbEhQYWRkaW5nOiAyMCxcclxuICAgICAgICByZWVsVlBhZGRpbmc6IDIwLFxyXG5cclxuICAgICAgICBjdXJyZW5jeTogXCIkXCIsXHJcblxyXG4gICAgICAgIHJlZWxTcGluRGVsYXk6IDAuMSxcclxuICAgICAgICBtaW5TcGluRHVyYXRpb246IDIsXHJcblxyXG4gICAgICAgIGxpbmVQb2ludHM6XHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIFtbMzAsMjI1XSxbNzAwLDIyNV1dLFxyXG4gICAgICAgICAgICAgICAgW1szMCw4NV0sWzcwMCw4NV1dLFxyXG4gICAgICAgICAgICAgICAgW1szMCwzNjVdLFs3MDAsMzY1XV0sXHJcbiAgICAgICAgICAgICAgICBbWzMwLDMwXSxbMzY1LDM2NV0sWzcwMCwzMF1dLFxyXG4gICAgICAgICAgICAgICAgW1szMCw0MjBdLFszNjUsODVdLFs3MDAsNDIwXV0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgd2luQW5ub3VuY2VEZWxheTogMixcclxuICAgICAgICByZXBlYXRXaW5zOiAxMCxcclxuICAgICAgICByZXNwb25zaXZlU2NhbGU6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB3aW46XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHg6IDAuMzc1LFxyXG4gICAgICAgICAgICAgICAgeTogMC4wMSxcclxuICAgICAgICAgICAgICAgIHc6IDAuMjUsXHJcbiAgICAgICAgICAgICAgICBoOiAwLjEwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHR4dFdpbjpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgeDogMC41LFxyXG4gICAgICAgICAgICAgICAgeTogMC43LFxyXG4gICAgICAgICAgICAgICAgZm9udDogMC40XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJldDpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgeDogMC4wNDUsXHJcbiAgICAgICAgICAgICAgICB5OiAwLjg5LFxyXG4gICAgICAgICAgICAgICAgdzogMC4yNSxcclxuICAgICAgICAgICAgICAgIGg6IDAuMTBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdHh0QmV0OlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB4OiAwLjUsXHJcbiAgICAgICAgICAgICAgICB5OiAwLjcsXHJcbiAgICAgICAgICAgICAgICBmb250OiAwLjRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYmFsYW5jZTpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgeDogMC4zNzUsXHJcbiAgICAgICAgICAgICAgICB5OiAwLjg5LFxyXG4gICAgICAgICAgICAgICAgdzogMC4yNSxcclxuICAgICAgICAgICAgICAgIGg6IDAuMTBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdHh0QmFsYW5jZTpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgeDogMC41LFxyXG4gICAgICAgICAgICAgICAgeTogMC43LFxyXG4gICAgICAgICAgICAgICAgZm9udDogMC40XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNwaW46XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHg6IDAuNzA1LFxyXG4gICAgICAgICAgICAgICAgeTogMC44OSxcclxuICAgICAgICAgICAgICAgIHc6IDAuMjUsXHJcbiAgICAgICAgICAgICAgICBoOiAwLjEwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlZWxBcmVhOlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB4OiAwLjA0NSxcclxuICAgICAgICAgICAgICAgIHk6IDAuMTI1LFxyXG4gICAgICAgICAgICAgICAgdzogMC45MSxcclxuICAgICAgICAgICAgICAgIGg6IDAuNzVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlZWxBcmVhQkdDb2xvcjogMHhGRkZGRkYsXHJcbiAgICAgICAgcmVlbEJHQ29sb3I6IDB4MkI2RjFBLFxyXG4gICAgICAgIHJlZWxIaWdobGlnaHRDb2xvcjogMHgwMDY0MzMsXHJcblxyXG4gICAgICAgIHdpbkxpbmVXaWR0aDogNSxcclxuICAgICAgICB3aW5MaW5lQ29sb3I6IDB4QTgxQzFEXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogXCJVSUNvbmZpZ1ZPXCJcclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2NcclxuICogQGNsYXNzICAgICAgIFdpbmRvd1NpemVWT1xyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3QubW9kZWwudm8uV2luZG93U2l6ZVZPJyxcclxuICAgICAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24odywgaCl7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKHcsIGgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIHdpZHRoOiBudWxsLFxyXG4gICAgICAgIGhlaWdodDogbnVsbCxcclxuICAgICAgICBvcmllbnRhdGlvbjogbnVsbCxcclxuXHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbih3LCBoKXtcclxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHc7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gaDtcclxuICAgICAgICAgICAgdGhpcy5vcmllbnRhdGlvbiA9IHNsb3QubW9kZWwubGliLlV0aWxzLmdldE9yaWVudGF0aW9uKHcsIGgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBOQU1FOiBcIldpbmRvd1NpemVWT1wiXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBTZXJ2ZXJTZXJ2aWNlXHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC5tb2RlbC5wcm94eS5zZXJ2aWNlLlNlcnZlclNlcnZpY2UnLFxyXG4gICAgICAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVDb25maWdWTyA9IG5ldyBzbG90Lm1vZGVsLnZvLkdhbWVDb25maWdWTygpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIGNhbGxiYWNrOiBudWxsLFxyXG4gICAgICAgIGdhbWVDb25maWdWTzogbnVsbCxcclxuICAgICAgICBiZXRBbW91bnQ6IG51bGwsXHJcbiAgICAgICAgYmFsYW5jZTogbnVsbCxcclxuXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmV0QW1vdW50ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5kZXBvc2l0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICAgICAgc2V0VGltZW91dCh0aGlzLnNlbmRTcGluUmVzdWx0LmJpbmQodGhpcyksIDUwMCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZXBvc2l0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLmJhbGFuY2UgPSAoTWF0aC5yYW5kb20oKSAqIDUwMCkgKyA1MDA7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbG9hZFNwaW5SZXN1bHQ6IGZ1bmN0aW9uIChiZXRBbW91bnQsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmV0QW1vdW50ID0gYmV0QW1vdW50O1xyXG4gICAgICAgICAgICB0aGlzLmJhbGFuY2UgLT0gdGhpcy5iZXRBbW91bnQ7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYmFsYW5jZSA8IHRoaXMuZ2FtZUNvbmZpZ1ZPLmRlbm9taW5hdGlvbnNbdGhpcy5nYW1lQ29uZmlnVk8uZGVub21pbmF0aW9ucy5sZW5ndGggLSAxXSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlcG9zaXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQodGhpcy5zZW5kU3BpblJlc3VsdC5iaW5kKHRoaXMpLCAxMDAwKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZW5kU3BpblJlc3VsdDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayh0aGlzLmNhbGN1bGF0ZVNwaW5SZXN1bHQoKSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmV0dXJucyBmdWxsIHNwaW4gcmVzdWx0XHJcbiAgICAgICAgICogQHJldHVybnMge0FycmF5fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNhbGN1bGF0ZVNwaW5SZXN1bHQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcclxuICAgICAgICAgICAgdmFyIHJlZWxzID0gdGhpcy5nYW1lQ29uZmlnVk8ucmVlbHM7XHJcbiAgICAgICAgICAgIHZhciByZWVsTWF0cml4ID0gW107XHJcbiAgICAgICAgICAgIGZvciAodmFyIGk9MDsgaTx0aGlzLmdhbWVDb25maWdWTy5udW1SZWVsczsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVlbFN0b3BQb3MgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiByZWVsc1tpXS5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgcmVlbE1hdHJpeFtpXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IHRoaXMuZ2FtZUNvbmZpZ1ZPLm51bVJvd3M7IGorKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVlbE1hdHJpeFtpXVtqXSA9IHRoaXMuZ2V0U3ltYm9sQXQocmVlbHNbaV0sIHJlZWxTdG9wUG9zICsgaik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVlbE1hdHJpeCA9IHRoaXMuZm9yY2VSZXN1bHQocmVlbE1hdHJpeCk7XHJcbiAgICAgICAgICAgIHZhciBsaW5lU3ltYm9scyA9IHRoaXMuZ2V0TGluZVN5bWJvbHMocmVlbE1hdHJpeCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgd2lucyA9IHRoaXMuZ2V0V2lucyhsaW5lU3ltYm9scyk7XHJcblxyXG4gICAgICAgICAgICByZXN1bHQubWF0cml4ID0gcmVlbE1hdHJpeDtcclxuICAgICAgICAgICAgcmVzdWx0Lm51bVdpbnMgPSB3aW5zLmxlbmd0aDtcclxuICAgICAgICAgICAgcmVzdWx0LnRvdGFsV2luID0gd2lucy5yZWR1Y2UoZnVuY3Rpb24ocHYsIGN2KXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwdiArIGN2LndpbkFtb3VudDtcclxuICAgICAgICAgICAgfSwgMCk7XHJcbiAgICAgICAgICAgIHJlc3VsdC53aW5zID0gd2lucztcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYmFsYW5jZSArPSByZXN1bHQudG90YWxXaW47XHJcbiAgICAgICAgICAgIHJlc3VsdC5iYWxhbmNlID0gdGhpcy5iYWxhbmNlO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXR1cm5zIHJlZWwgc3ltYm9scyBjaXJjdWxhcmx5IGlmIHJlZWwgc3RvcHMgYXQgdGhlIGVuZFxyXG4gICAgICAgICAqIEBwYXJhbSByZWVsXHJcbiAgICAgICAgICogQHBhcmFtIHBvc1xyXG4gICAgICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldFN5bWJvbEF0OiBmdW5jdGlvbihyZWVsLCBwb3Mpe1xyXG4gICAgICAgICAgICBpZihwb3MgPiByZWVsLmxlbmd0aCAtIDEpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlZWxbcG9zIC0gcmVlbC5sZW5ndGhdO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWVsW3Bvc107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUYWtlcyByZWVsIG91dHB1dCBtYXRyaXggYW5kIGNyZWF0ZXMgYW4gYXJyYXkgd2l0aCBsaW5lIHJlc3VsdHNcclxuICAgICAgICAgKiBAcGFyYW0gbWF0cml4XHJcbiAgICAgICAgICogQHJldHVybnMge0FycmF5fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldExpbmVTeW1ib2xzOiBmdW5jdGlvbihtYXRyaXgpe1xyXG4gICAgICAgICAgICB2YXIgbGluZXMgPSB0aGlzLmdhbWVDb25maWdWTy5saW5lcztcclxuICAgICAgICAgICAgdmFyIGxpbmVTeW1ib2xzID0gW107XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmdhbWVDb25maWdWTy5udW1MaW5lczsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxpbmVTeW1ib2xzW2ldID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGogPSAwOyBqIDwgdGhpcy5nYW1lQ29uZmlnVk8ubnVtUmVlbHM7IGorKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZVN5bWJvbHNbaV1bal0gPSBtYXRyaXhbal1bbGluZXNbaV1bal1dO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBsaW5lU3ltYm9scztcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUYWtlcyByZXN1bHQgb2YgZWFjaCBsaW5lIGFuZCBsb29rcyBmb3Igd2lubmluZyBjb21iaW5hdGlvbnNcclxuICAgICAgICAgKiBDYWxjdWxhdGVzIHdpbnMgaWYgd2lubmluZyBjb21iaW5hdGlvbiBleGlzdFxyXG4gICAgICAgICAqIEBwYXJhbSBsaW5lU3ltYm9sc1xyXG4gICAgICAgICAqIEByZXR1cm5zIHtBcnJheX1cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXRXaW5zOiBmdW5jdGlvbihsaW5lU3ltYm9scyl7XHJcbiAgICAgICAgICAgIHZhciB3aW5zID0gW107XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmdhbWVDb25maWdWTy5udW1MaW5lczsgaSsrKXtcclxuICAgICAgICAgICAgICAgIHZhciBvYWsgPSAxO1xyXG4gICAgICAgICAgICAgICAgZm9yKHZhciBqID0gMTsgaiA8IHRoaXMuZ2FtZUNvbmZpZ1ZPLm51bVJlZWxzOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGxpbmVTeW1ib2xzW2ldW2pdID09IGxpbmVTeW1ib2xzW2ldW2otMV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYWsrKztcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYob2FrID49IHRoaXMuZ2FtZUNvbmZpZ1ZPLm1pbk9haykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB3aW5uaW5nU3ltYm9sID0gbGluZVN5bWJvbHNbaV1bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgd2lucy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lTnVtYmVyOiBpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2FrOiBvYWssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzeW1ib2w6IHdpbm5pbmdTeW1ib2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5BbW91bnQ6IHRoaXMuZ2FtZUNvbmZpZ1ZPLnBheXRhYmxlW3dpbm5pbmdTeW1ib2xdW29ha10gKiB0aGlzLmJldEFtb3VudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gd2lucztcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBGb3JjZXMgcmVzdWx0IGZvciB0ZXN0aWcgZHVyaW5nIGRldmVsb3BtZW50XHJcbiAgICAgICAgZm9yY2VSZXN1bHQ6IGZ1bmN0aW9uKG1hdHJpeCl7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXRyaXg7XHJcbiAgICAgICAgICAgIC8vbWF0cml4ID0gW1sxLDIsM10sWzEsMiwzXSxbMSwyLDNdLFsxLDIsM10sWzEsMiwzXV07XHJcbiAgICAgICAgICAgIC8vbWF0cml4ID0gW1s0LDUsNl0sWzQsNSw2XSxbNCw1LDZdLFs0LDUsNl0sWzQsNSw2XV07XHJcbiAgICAgICAgICAgIC8vbWF0cml4ID0gW1s3LDgsMV0sWzcsOCwyXSxbNyw4LDNdLFs3LDgsNF0sWzcsOCw1XV07XHJcbiAgICAgICAgICAgIC8vcmV0dXJuIG1hdHJpeDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6IFwiU2VydmVyU2VydmljZVwiXHJcbiAgICB9XHJcbik7IiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGNsYXNzICAgICAgIEFzc2V0TG9hZENvbXBsZXRlQ29tbWFuZFxyXG4gKiBAbWVtYmVyb2YgICAgc2xvdC5jb250cm9sbGVyLmNvbW1hbmRcclxuICogQGRlc2MgICAgICAgIENvbW1hbmQgcmVnaXN0ZXJlZCB0byBBU1NFVF9MT0FEX0NPTVBMRVRFIG5vdGlmaWNhdGlvbi5cclxuICogICAgICAgICAgICAgIEZpcmVkIHdoZW4gYXNzZXQgbG9hZGluZyBpcyBjb21wbGV0ZS4gSW5pdGlhbGl6ZXMgc2VydmVyLlxyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3QuY29udHJvbGxlci5jb21tYW5kLkFzc2V0TG9hZENvbXBsZXRlQ29tbWFuZCcsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLlNpbXBsZUNvbW1hbmRcclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uIChub3RlKSB7XHJcbiAgICAgICAgICAgIHZhciBzZXJ2ZXIgPSB0aGlzLmZhY2FkZS5yZXRyaWV2ZVByb3h5KHNsb3QubW9kZWwucHJveHkuU2VydmVyUHJveHkuTkFNRSk7XHJcbiAgICAgICAgICAgIHNlcnZlci5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzYyAgICAgICAgUmVnaXN0ZXJzIGNvbW1hbmRzIHdpdGggbm90aWZpY2F0aW9uc1xyXG4gKiBAY2xhc3MgICAgICAgUHJlcENvbnRyb2xsZXJDb21tYW5kXHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC5jb250cm9sbGVyLmNvbW1hbmQuUHJlcENvbnRyb2xsZXJDb21tYW5kJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuU2ltcGxlQ29tbWFuZFxyXG4gICAgfSxcclxuICBcclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAobm90ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3RlckNvbW1hbmQoc2xvdC5BcHBDb25zdGFudHMuQVNTRVRfTE9BRF9DT01QTEVURSwgc2xvdC5jb250cm9sbGVyLmNvbW1hbmQuQXNzZXRMb2FkQ29tcGxldGVDb21tYW5kKTtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJDb21tYW5kKHNsb3QuQXBwQ29uc3RhbnRzLldJTkRPV19SRVNJWkVELCBzbG90LmNvbnRyb2xsZXIuY29tbWFuZC5XaW5kb3dSZXNpemVDb21tYW5kKTtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJDb21tYW5kKHNsb3QuQXBwQ29uc3RhbnRzLlNQSU4sIHNsb3QuY29udHJvbGxlci5jb21tYW5kLlNwaW5Db21tYW5kKTtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJDb21tYW5kKHNsb3QuQXBwQ29uc3RhbnRzLlNQSU5fRU5ELCBzbG90LmNvbnRyb2xsZXIuY29tbWFuZC5TcGluRW5kQ29tbWFuZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSAgICBcclxuKTsiLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzYyAgICAgICAgUmVzZ2l0ZXJzIHByb3h5cyB3aXRoIGZhY2FkZVxyXG4gKiBAY2xhc3MgICAgICAgUHJlcE1vZGVsQ29tbWFuZFxyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3QuY29udHJvbGxlci5jb21tYW5kLlByZXBNb2RlbENvbW1hbmQnLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5TaW1wbGVDb21tYW5kXHJcbiAgICB9LFxyXG4gIFxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uIChub3RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjYWRlLnJlZ2lzdGVyUHJveHkobmV3IHNsb3QubW9kZWwucHJveHkuTG9hZGVyUHJveHkoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjYWRlLnJlZ2lzdGVyUHJveHkobmV3IHNsb3QubW9kZWwucHJveHkuV2luZG93U2l6ZVByb3h5KCkpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3RlclByb3h5KG5ldyBzbG90Lm1vZGVsLnByb3h5LkNvbmZpZ1Byb3h5KCkpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3RlclByb3h5KG5ldyBzbG90Lm1vZGVsLnByb3h5LlNlcnZlclByb3h5KCkpO1xyXG4gICAgICAgIH1cclxuICAgIH0gICAgXHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjICAgICAgICBJbml0aWFsaXplcyBQaXhpXHJcbiAqICAgICAgICAgICAgICBDcmVhdGVzIFBYUm9vdCB3aGljaCBpcyB1c2VkIHRocm91Z2ggdGhlIEFwcCB0byByZWZlciBtYWluIHN0YWdlXHJcbiAqICAgICAgICAgICAgICBUYXAgZXZlbnQgdG8gc3dpdGNoIHRvIGZ1bGxzY3JlZW4gb24gbW9iaWxlc1xyXG4gKiAgICAgICAgICAgICAgQ29udGFpbnMgbWFpbiByZW5kZXIgbG9vcC5cclxuICogQGNsYXNzICAgICAgIFByZXBQaXhpQ29tbWFuZFxyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3QuY29udHJvbGxlci5jb21tYW5kLlByZXBQaXhpQ29tbWFuZCcsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLlNpbXBsZUNvbW1hbmRcclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uIChub3RlKSB7XHJcbiAgICAgICAgICAgIFBYUm9vdCA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xyXG5cclxuICAgICAgICAgICAgUFhSZW5kZXJlciA9IG5ldyBQSVhJLmF1dG9EZXRlY3RSZW5kZXJlcih3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcclxuICAgICAgICAgICAgUFhSZW5kZXJlci52aWV3LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcblxyXG4gICAgICAgICAgICBQWFJvb3QuaW50ZXJhY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBQWFJvb3Qub24oXCJ0YXBcIix0aGlzLnNldEZ1bGxTY3JlZW4pO1xyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lXCIpLmFwcGVuZENoaWxkKFBYUmVuZGVyZXIudmlldyk7XHJcblxyXG4gICAgICAgICAgICAvLyBSZW5kZXIgbG9vcFxyXG4gICAgICAgICAgICB3aW5kb3cucmVuZGVyTG9vcCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBQWFJlbmRlcmVyLnJlbmRlcihQWFJvb3QpO1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHdpbmRvdy5yZW5kZXJMb29wKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgd2luZG93LnJlbmRlckxvb3AoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZXRGdWxsU2NyZWVuOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZiAoc2NyZWVuZnVsbC5lbmFibGVkICYmICFzY3JlZW5mdWxsLmlzRnVsbHNjcmVlbikge1xyXG4gICAgICAgICAgICAgICAgc2NyZWVuZnVsbC5yZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzYyAgICAgICAgUmVnaXN0ZXJzIGFsbCBtZWRpYXRvcnMgd2l0aCB0aGUgZmFjYWRlXHJcbiAqIEBjbGFzcyAgICAgICBQcmVwVmlld0NvbW1hbmRcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lIChcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC5jb250cm9sbGVyLmNvbW1hbmQuUHJlcFZpZXdDb21tYW5kJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuU2ltcGxlQ29tbWFuZFxyXG4gICAgfSxcclxuIFxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uIChub3RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjYWRlLnJlZ2lzdGVyTWVkaWF0b3IobmV3IHNsb3Qudmlldy5tZWRpYXRvci5CR01lZGlhdG9yKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3Rlck1lZGlhdG9yKG5ldyBzbG90LnZpZXcubWVkaWF0b3IuUmVlbENvbnRhaW5lck1lZGlhdG9yKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3Rlck1lZGlhdG9yKG5ldyBzbG90LnZpZXcubWVkaWF0b3IuV2luQW5ub3VuY2VNZWRpYXRvcigpKTtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJNZWRpYXRvcihuZXcgc2xvdC52aWV3Lm1lZGlhdG9yLlNvdW5kUGxheWVyTWVkaWF0b3IoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjYWRlLnJlZ2lzdGVyTWVkaWF0b3IobmV3IHNsb3Qudmlldy5tZWRpYXRvci5QYW5lbE1lZGlhdG9yKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3Rlck1lZGlhdG9yKG5ldyBzbG90LnZpZXcubWVkaWF0b3IuUHJlbG9hZGVyTWVkaWF0b3IoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzYyAgICAgICAgUmVnaXN0ZXJlZCB0byBTUElOIG5vdGVcclxuICogICAgICAgICAgICAgIENhbGxzIHNlcnZlciBzcGluXHJcbiAqIEBjbGFzcyAgICAgICBTcGluQ29tbWFuZFxyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3QuY29udHJvbGxlci5jb21tYW5kLlNwaW5Db21tYW5kJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuU2ltcGxlQ29tbWFuZFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKG5vdGUpIHtcclxuICAgICAgICAgICAgdmFyIHNlcnZlciA9IHRoaXMuZmFjYWRlLnJldHJpZXZlUHJveHkoc2xvdC5tb2RlbC5wcm94eS5TZXJ2ZXJQcm94eS5OQU1FKTtcclxuICAgICAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKHNsb3QuQXBwQ29uc3RhbnRzLlNUT1BfV0lOX0FOTk9VTkNFTUVOVFMpO1xyXG5cclxuICAgICAgICAgICAgc2VydmVyLnNwaW4obm90ZS5nZXRCb2R5KCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2MgICAgICAgIFdpbiBhbm5vdW5jZW1lbnRzIHN0YXJ0IG5vd1xyXG4gKiBAY2xhc3MgICAgICAgU3BpbkVuZENvbW1hbmRcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LmNvbnRyb2xsZXIuY29tbWFuZC5TcGluRW5kQ29tbWFuZCcsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLlNpbXBsZUNvbW1hbmRcclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uIChub3RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihzbG90LkFwcENvbnN0YW50cy5TVEFSVF9XSU5fQU5OT1VOQ0VNRU5UUyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzYyAgICAgICAgTWFpbiBjb21tYW5kIHdoaWNoIHN0YXJ0c1xyXG4gKiBAY2xhc3MgICAgICAgU3RhcnR1cENvbW1hbmRcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LmNvbnRyb2xsZXIuY29tbWFuZC5TdGFydHVwQ29tbWFuZCcsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLk1hY3JvQ29tbWFuZFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTIFxyXG4gICAge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFN1YmNvbW1hbmRzIHRvIGhhbmRsZSBmYWNhZGUgcmVnaXN0cmF0aW9ucyBmb3JcclxuICAgICAgICAgKiBNb2RlbCwgVmlldyBhbmQgQ29udHJvbGxlclxyXG4gICAgICAgICAqIEFsc28gcnVucyBzdWIgY29tbWFuZCB0byBpbml0aWFsaXplIFBJWEkgZnJhbWV3b3JrXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaW5pdGlhbGl6ZU1hY3JvQ29tbWFuZDogZnVuY3Rpb24gKG5vdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRTdWJDb21tYW5kKHNsb3QuY29udHJvbGxlci5jb21tYW5kLlByZXBQaXhpQ29tbWFuZCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZFN1YkNvbW1hbmQoc2xvdC5jb250cm9sbGVyLmNvbW1hbmQuUHJlcENvbnRyb2xsZXJDb21tYW5kKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRTdWJDb21tYW5kKHNsb3QuY29udHJvbGxlci5jb21tYW5kLlByZXBNb2RlbENvbW1hbmQpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZFN1YkNvbW1hbmQoc2xvdC5jb250cm9sbGVyLmNvbW1hbmQuUHJlcFZpZXdDb21tYW5kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzYyAgICAgICAgUmVzaXplcyBQaXhpIHJlbmRlcmVyIGFzIHBlciBuZXcgd2lkdGggYW5kIGhlaWdodFxyXG4gKiBAY2xhc3MgICAgICAgV2luZG93UmVzaXplQ29tbWFuZFxyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3QuY29udHJvbGxlci5jb21tYW5kLldpbmRvd1Jlc2l6ZUNvbW1hbmQnLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5TaW1wbGVDb21tYW5kXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAobm90ZSkge1xyXG4gICAgICAgICAgICB2YXIgd2luZG93U2l6ZVZPID0gbm90ZS5nZXRCb2R5KCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHdpbmRvd1NpemVWTy53aWR0aCArIFwiIHggXCIgKyB3aW5kb3dTaXplVk8uaGVpZ2h0KTtcclxuICAgICAgICAgICAgUFhSZW5kZXJlci5yZXNpemUod2luZG93U2l6ZVZPLndpZHRoLCB3aW5kb3dTaXplVk8uaGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBCR1xyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3Qudmlldy5jb21wb25lbnQuQkcnLFxyXG4gICAgICAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UgPSBuZXcgUElYSS5Db250YWluZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvLyBTdGFnZSBNZW1iZXJzXHJcbiAgICAgICAgc3RhZ2U6IG51bGwsXHJcbiAgICAgICAgYmc6IG51bGwsXHJcblxyXG4gICAgICAgIC8vIFJlZmVyZW5jZXNcclxuICAgICAgICBPUklFTlRBVElPTjogc2xvdC5tb2RlbC5lbnVtLk9SSUVOVEFUSU9OLFxyXG5cclxuICAgICAgICBpbml0OiBmdW5jdGlvbih3aW5kb3dTaXplVk8pe1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dXBWaWV3KHdpbmRvd1NpemVWTyk7XHJcblxyXG4gICAgICAgICAgICBQWFJvb3QuYWRkQ2hpbGQodGhpcy5zdGFnZSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYWRkQ2hpbGRyZW46IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoaXMuYmcgPSBuZXcgUElYSS5TcHJpdGUoUElYSS5UZXh0dXJlLmZyb21GcmFtZShcImJnXCIpKTtcclxuICAgICAgICAgICAgdGhpcy5iZy5hbmNob3Iuc2V0KDAuNSwwLjUpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuYmcpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNldHVwVmlldzogZnVuY3Rpb24od2luZG93U2l6ZVZPKXtcclxuICAgICAgICAgICAgLy8gRmlsbCBzY3JlZW5cclxuICAgICAgICAgICAgdmFyIHNpemUgPSBzbG90Lm1vZGVsLmxpYi5VdGlscy5nZXRTaXplVG9GaWxsU2NyZWVuKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOnRoaXMuYmcud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLmJnLmhlaWdodFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDp3aW5kb3dTaXplVk8ud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiB3aW5kb3dTaXplVk8uaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJnLndpZHRoID0gc2l6ZS53aWR0aDtcclxuICAgICAgICAgICAgdGhpcy5iZy5oZWlnaHQgPSBzaXplLmhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYmcueCA9IHdpbmRvd1NpemVWTy53aWR0aC8yO1xyXG4gICAgICAgICAgICB0aGlzLmJnLnkgPSB3aW5kb3dTaXplVk8uaGVpZ2h0LzI7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGFuZGxlUmVzaXplOiBmdW5jdGlvbih3aW5kb3dTaXplVk8pe1xyXG4gICAgICAgICAgICB0aGlzLnNldHVwVmlldyh3aW5kb3dTaXplVk8pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBOQU1FOiAnQkcnXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBQYW5lbFxyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3Qudmlldy5jb21wb25lbnQuUGFuZWwnLFxyXG4gICAgICAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UgPSBuZXcgUElYSS5Db250YWluZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvLyBTdGFnZSBNZW1iZXJzXHJcbiAgICAgICAgc3RhZ2U6IG51bGwsXHJcblxyXG4gICAgICAgIHNwaW46IG51bGwsXHJcbiAgICAgICAgYnRuU3BpbjogbnVsbCxcclxuXHJcbiAgICAgICAgd2luOiBudWxsLFxyXG4gICAgICAgIHR4dFdpbjogbnVsbCxcclxuXHJcbiAgICAgICAgYmFsYW5jZTogbnVsbCxcclxuICAgICAgICB0eHRCYWxhbmNlOiBudWxsLFxyXG5cclxuICAgICAgICBiZXQ6IG51bGwsXHJcbiAgICAgICAgYnRuQmV0UGx1czogbnVsbCxcclxuICAgICAgICBidG5CZXRNaW51czogbnVsbCxcclxuICAgICAgICB0eHRCZXQ6IG51bGwsXHJcbiAgICAgICAgYmV0QW1vdW50OiBudWxsLFxyXG5cclxuICAgICAgICBjdXJyZW5jeTogbnVsbCxcclxuICAgICAgICBkZW5vbWluYXRpb25zOiBudWxsLFxyXG4gICAgICAgIGN1cnJlbnREZW5vbWluYXRpb246IG51bGwsXHJcblxyXG4gICAgICAgIHJlc3BTY2FsZTogbnVsbCxcclxuXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW5jeSA9IGRhdGEudWlDb25maWdWTy5jdXJyZW5jeTtcclxuICAgICAgICAgICAgdGhpcy5yZXNwU2NhbGUgPSBkYXRhLnVpQ29uZmlnVk8ucmVzcG9uc2l2ZVNjYWxlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kZW5vbWluYXRpb25zID0gZGF0YS5nYW1lQ29uZmlnVk8uZGVub21pbmF0aW9ucztcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50RGVub21pbmF0aW9uID0gZGF0YS5nYW1lQ29uZmlnVk8uZGVmYXVsdERlbm9taW5hdGlvbjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5zZXR1cFZpZXcoZGF0YS53aW5kb3dTaXplVk8pO1xyXG5cclxuICAgICAgICAgICAgUFhSb290LmFkZENoaWxkKHRoaXMuc3RhZ2UpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFkZENoaWxkcmVuOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAvLyBTcGluIGNvbXBvbmVudFxyXG4gICAgICAgICAgICB0aGlzLnNwaW4gPSBuZXcgUElYSS5Db250YWluZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5zcGluLmFkZENoaWxkKG5ldyBQSVhJLlNwcml0ZShQSVhJLlRleHR1cmUuZnJvbUZyYW1lKFwic3Bpbl9kaXNhYmxlZFwiKSkpO1xyXG4gICAgICAgICAgICB0aGlzLnNwaW4uYWRkQ2hpbGQodGhpcy5idG5TcGluID0gbmV3IFBJWEkuU3ByaXRlKFBJWEkuVGV4dHVyZS5mcm9tRnJhbWUoXCJzcGluXCIpKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5zcGluKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFdpbiBjb21wb25lbnQgPT0+XHJcbiAgICAgICAgICAgIHRoaXMud2luID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMud2luLmFkZENoaWxkKG5ldyBQSVhJLlNwcml0ZShQSVhJLlRleHR1cmUuZnJvbUZyYW1lKFwid2luXCIpKSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnR4dFdpbiA9IG5ldyBQSVhJLlRleHQoKTtcclxuICAgICAgICAgICAgdGhpcy50eHRXaW4uc3R5bGUgPSB7Zm9udFNpemU6IDMwLCBhbGlnbjogJ2NlbnRlcid9O1xyXG4gICAgICAgICAgICB0aGlzLnR4dFdpbi5hbmNob3Iuc2V0KDAuNSwgMC41KTtcclxuICAgICAgICAgICAgdGhpcy50eHRXaW4ueCA9IDEwMDtcclxuICAgICAgICAgICAgdGhpcy50eHRXaW4ueSA9IDUyO1xyXG5cclxuICAgICAgICAgICAgdGhpcy53aW4uYWRkQ2hpbGQodGhpcy50eHRXaW4pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLndpbik7XHJcbiAgICAgICAgICAgIC8vIFdpbiBjb21wb25lbnQgPD09XHJcblxyXG4gICAgICAgICAgICAvLyBCYWxhbmNlIGNvbXBvbmVudCA9PT5cclxuICAgICAgICAgICAgdGhpcy5iYWxhbmNlID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYmFsYW5jZS5hZGRDaGlsZChuZXcgUElYSS5TcHJpdGUoUElYSS5UZXh0dXJlLmZyb21GcmFtZShcImJhbGFuY2VcIikpKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudHh0QmFsYW5jZSA9IG5ldyBQSVhJLlRleHQoKTtcclxuICAgICAgICAgICAgdGhpcy50eHRCYWxhbmNlLnN0eWxlID0ge2ZvbnRTaXplOiAzMCwgYWxpZ246ICdjZW50ZXInfTtcclxuICAgICAgICAgICAgdGhpcy50eHRCYWxhbmNlLmFuY2hvci5zZXQoMC41LCAwLjUpO1xyXG4gICAgICAgICAgICB0aGlzLnR4dEJhbGFuY2UueCA9IDEwMDtcclxuICAgICAgICAgICAgdGhpcy50eHRCYWxhbmNlLnkgPSA1MjtcclxuICAgICAgICAgICAgdGhpcy5iYWxhbmNlLmFkZENoaWxkKHRoaXMudHh0QmFsYW5jZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuYmFsYW5jZSk7XHJcbiAgICAgICAgICAgIC8vIDw9PSBCYWxhbmNlIGNvbXBvbmVudFxyXG5cclxuICAgICAgICAgICAgLy8gQmV0IGNvbXBvbmVudCA9PT0+XHJcbiAgICAgICAgICAgIHRoaXMuYmV0ID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYmV0LmFkZENoaWxkKG5ldyBQSVhJLlNwcml0ZShQSVhJLlRleHR1cmUuZnJvbUZyYW1lKFwiYmV0X21pbnVzX2Rpc2FibGVkXCIpKSk7XHJcbiAgICAgICAgICAgIHRoaXMuYmV0LmFkZENoaWxkKHRoaXMuYnRuQmV0TWludXMgPSBuZXcgUElYSS5TcHJpdGUoUElYSS5UZXh0dXJlLmZyb21GcmFtZShcImJldF9taW51c1wiKSkpO1xyXG4gICAgICAgICAgICB2YXIgYmV0U3ByaXRlID0gbmV3IFBJWEkuU3ByaXRlKFBJWEkuVGV4dHVyZS5mcm9tRnJhbWUoXCJiZXRcIikpO1xyXG4gICAgICAgICAgICBiZXRTcHJpdGUueCArPSB0aGlzLmJ0bkJldE1pbnVzLndpZHRoICsgMjtcclxuICAgICAgICAgICAgdGhpcy5iZXQuYWRkQ2hpbGQoYmV0U3ByaXRlKTtcclxuICAgICAgICAgICAgdmFyIGJldFBsdXNEU3ByaXRlID0gbmV3IFBJWEkuU3ByaXRlKFBJWEkuVGV4dHVyZS5mcm9tRnJhbWUoXCJiZXRfcGx1c19kaXNhYmxlZFwiKSk7XHJcbiAgICAgICAgICAgIGJldFBsdXNEU3ByaXRlLnggPSBiZXRTcHJpdGUueCArIGJldFNwcml0ZS53aWR0aCArIDI7XHJcbiAgICAgICAgICAgIHRoaXMuYmV0LmFkZENoaWxkKGJldFBsdXNEU3ByaXRlKTtcclxuICAgICAgICAgICAgdGhpcy5iZXQuYWRkQ2hpbGQodGhpcy5idG5CZXRQbHVzID0gbmV3IFBJWEkuU3ByaXRlKFBJWEkuVGV4dHVyZS5mcm9tRnJhbWUoXCJiZXRfcGx1c1wiKSkpO1xyXG4gICAgICAgICAgICB0aGlzLmJ0bkJldFBsdXMueCA9IGJldFBsdXNEU3ByaXRlLng7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnR4dEJldCA9IG5ldyBQSVhJLlRleHQoKTtcclxuICAgICAgICAgICAgdGhpcy50eHRCZXQuc3R5bGUgPSB7Zm9udFNpemU6IDMwLCBhbGlnbjogJ2NlbnRlcid9O1xyXG4gICAgICAgICAgICB0aGlzLnR4dEJldC5hbmNob3Iuc2V0KDAuNSwgMC41KTtcclxuICAgICAgICAgICAgdGhpcy50eHRCZXQueCA9IGJldFNwcml0ZS54ICsgNjg7XHJcbiAgICAgICAgICAgIHRoaXMudHh0QmV0LnkgPSBiZXRTcHJpdGUueSArIDUyO1xyXG4gICAgICAgICAgICB0aGlzLmJldC5hZGRDaGlsZCh0aGlzLnR4dEJldCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuYmV0KTtcclxuICAgICAgICAgICAgLy8gPD09PSBCZXQgY29tcG9uZW50XHJcblxyXG4gICAgICAgICAgICAvLyBCdXR0b25zXHJcbiAgICAgICAgICAgIHRoaXMuYnRuU3Bpbi5pbnRlcmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuU3Bpbi5vbihzbG90LnZpZXcuZXZlbnQuVmlld0V2ZW50cy5DTElDSywgdGhpcy5vblNwaW5DbGljay5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgdGhpcy5idG5CZXRNaW51cy5pbnRlcmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuQmV0TWludXMub24oc2xvdC52aWV3LmV2ZW50LlZpZXdFdmVudHMuQ0xJQ0ssIHRoaXMub25CZXRNaW51c0NsaWNrLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICB0aGlzLmJ0bkJldFBsdXMuaW50ZXJhY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmJ0bkJldFBsdXMub24oc2xvdC52aWV3LmV2ZW50LlZpZXdFdmVudHMuQ0xJQ0ssIHRoaXMub25CZXRQbHVzQ2xpY2suYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZUJldCgpO1xyXG4gICAgICAgICAgICB0aGlzLmRpc2FibGVTcGluKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBJbml0aWFsIHZhbHVlc1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUJldCgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5yZXNUeHQgPSBuZXcgUElYSS5UZXh0KCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVzVHh0LnN0eWxlID0ge2ZvbnRTaXplOiAxNSwgYWxpZ246ICdsZWZ0Jywgd29yZHdyYXA6IHRydWUsc3Ryb2tlOjB4RkZGRkZGLHN0cm9rZVRoaWNrbmVzczoyfTtcclxuICAgICAgICAgICAgUFhSb290LmFkZENoaWxkKHRoaXMucmVzVHh0KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZXR1cFZpZXc6IGZ1bmN0aW9uKHdpbmRvd1NpemVWTyl7XHJcbiAgICAgICAgICAgIC8vIFNjYWxpbmcgYW5kIHBvc2l0aW9uaW5nIGFzIHBlciByZXNwb25zaXZlIHNjYWxlXHJcbiAgICAgICAgICAgIHZhciBjb21wb25lbnRzID0gW1wic3BpblwiLFwid2luXCIsXCJiYWxhbmNlXCIsXCJiZXRcIl07XHJcbiAgICAgICAgICAgIHZhciBsZW4gPSBjb21wb25lbnRzLmxlbmd0aDtcclxuICAgICAgICAgICAgdmFyIGZpdENvbnRlbnRPblNjcmVlbiA9IG5ldyBzbG90Lm1vZGVsLmxpYi5VdGlscygpLmZpdENvbnRlbnRPblNjcmVlbjtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29tcCA9IGNvbXBvbmVudHNbaV07XHJcbiAgICAgICAgICAgICAgICB2YXIgc2NhbGUgPSB0aGlzLnJlc3BTY2FsZVtjb21wXTtcclxuICAgICAgICAgICAgICAgIGZpdENvbnRlbnRPblNjcmVlbihcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXNbY29tcF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcmVlbjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogd2luZG93U2l6ZVZPLndpZHRoICogc2NhbGUueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IHdpbmRvd1NpemVWTy5oZWlnaHQgKiBzY2FsZS55LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHdpbmRvd1NpemVWTy53aWR0aCAqIHNjYWxlLncsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHdpbmRvd1NpemVWTy5oZWlnaHQgKiBzY2FsZS5oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucmVzVHh0LnRleHQgPSB3aW5kb3dTaXplVk8ud2lkdGggKyBcInhcIiArIHdpbmRvd1NpemVWTy5oZWlnaHQgK1wiXFxuXCI7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlQmFsYW5jZTogZnVuY3Rpb24oYmFsYW5jZSl7XHJcbiAgICAgICAgICAgIHRoaXMudHh0QmFsYW5jZS50ZXh0ID0gdGhpcy5jdXJyZW5jeSArIGJhbGFuY2UudG9GaXhlZCgyKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB1cGRhdGVXaW46IGZ1bmN0aW9uKHdpbil7XHJcbiAgICAgICAgICAgIHRoaXMudHh0V2luLnRleHQgPSB0aGlzLmN1cnJlbmN5ICsgd2luLnRvRml4ZWQoMik7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlQmV0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLnR4dEJldC50ZXh0ID0gdGhpcy5jdXJyZW5jeSArIHRoaXMuZGVub21pbmF0aW9uc1t0aGlzLmN1cnJlbnREZW5vbWluYXRpb25dLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgIHRoaXMuYmV0QW1vdW50ID0gdGhpcy5kZW5vbWluYXRpb25zW3RoaXMuY3VycmVudERlbm9taW5hdGlvbl07XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaW5jcmVhc2VCZXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY3VycmVudERlbm9taW5hdGlvbiA8IHRoaXMuZGVub21pbmF0aW9ucy5sZW5ndGggLSAxKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudERlbm9taW5hdGlvbisrO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVCZXQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdGVCZXRCdXR0b25zKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkZWNyZWFzZUJldDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYodGhpcy5jdXJyZW50RGVub21pbmF0aW9uID4gMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnREZW5vbWluYXRpb24tLTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQmV0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlQmV0QnV0dG9ucygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdmFsaWRhdGVCZXRCdXR0b25zOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmN1cnJlbnREZW5vbWluYXRpb24gPT09IHRoaXMuZGVub21pbmF0aW9ucy5sZW5ndGggLSAxKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZUJldFBsdXMoKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZUJldFBsdXMoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5jdXJyZW50RGVub21pbmF0aW9uID09PSAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZUJldE1pbnVzKCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmFibGVCZXRNaW51cygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGlzYWJsZVNwaW46IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuU3Bpbi52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZW5hYmxlU3BpbjogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy5idG5TcGluLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRpc2FibGVCZXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZUJldFBsdXMoKTtcclxuICAgICAgICAgICAgdGhpcy5kaXNhYmxlQmV0TWludXMoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVuYWJsZUJldDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy52YWxpZGF0ZUJldEJ1dHRvbnMoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkaXNhYmxlQmV0UGx1czogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy5idG5CZXRQbHVzLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBlbmFibGVCZXRQbHVzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLmJ0bkJldFBsdXMudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGlzYWJsZUJldE1pbnVzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLmJ0bkJldE1pbnVzLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBlbmFibGVCZXRNaW51czogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy5idG5CZXRNaW51cy52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBFdmVudCBIYW5kbGVyc1xyXG4gICAgICAgIG9uU3BpbkNsaWNrOiBmdW5jdGlvbihldnQpe1xyXG4gICAgICAgICAgICB0aGlzLmRpc2FibGVTcGluKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZUJldCgpO1xyXG4gICAgICAgICAgICB0aGlzLnR4dFdpbi50ZXh0ID0gXCJcIjtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZS5lbWl0KHNsb3Qudmlldy5ldmVudC5WaWV3RXZlbnRzLlNQSU5fQ0xJQ0ssIHRoaXMuYmV0QW1vdW50KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvbkJldE1pbnVzQ2xpY2s6IGZ1bmN0aW9uKGV2dCl7XHJcbiAgICAgICAgICAgIHRoaXMuZGVjcmVhc2VCZXQoKTtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZS5lbWl0KHNsb3Qudmlldy5ldmVudC5WaWV3RXZlbnRzLkJFVF9DTElDSyk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25CZXRQbHVzQ2xpY2s6IGZ1bmN0aW9uKGV2dCl7XHJcbiAgICAgICAgICAgIHRoaXMuaW5jcmVhc2VCZXQoKTtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZS5lbWl0KHNsb3Qudmlldy5ldmVudC5WaWV3RXZlbnRzLkJFVF9DTElDSyk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGFuZGxlUmVzaXplOiBmdW5jdGlvbiAod2luZG93U2l6ZVZPKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dXBWaWV3KHdpbmRvd1NpemVWTyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdQYW5lbCdcclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2NcclxuICogQGNsYXNzICAgICAgIFByZWxvYWRlclxyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3Qudmlldy5jb21wb25lbnQuUHJlbG9hZGVyJyxcclxuICAgICAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLy8gU3RhZ2UgTWVtYmVyc1xyXG4gICAgICAgIHN0YWdlOiBudWxsLFxyXG4gICAgICAgIHByZWxvYWRlcjogbnVsbCxcclxuICAgICAgICBsb2FkQ29tcGxldGU6IG51bGwsXHJcblxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICh3aW5kb3dTaXplVk8pIHtcclxuICAgICAgICAgICAgLy8gV2hpdGUgcm91bmRlZCByZWN0YW5nbGUgYmVoaW5kIHRoZSB3aG9sZSByZWVsIGFyZWFcclxuICAgICAgICAgICAgdGhpcy5wcmVsb2FkZXIgPSBuZXcgUElYSS5HcmFwaGljcygpO1xyXG4gICAgICAgICAgICB0aGlzLnByZWxvYWRlci5iZWdpbkZpbGwoMHhGRkZGRkYpO1xyXG4gICAgICAgICAgICB0aGlzLnByZWxvYWRlci5kcmF3UmVjdCgwLCAwLCB3aW5kb3dTaXplVk8ud2lkdGggKiAwLjEsIHdpbmRvd1NpemVWTy5oZWlnaHQgKiAwLjAxKTtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZS5waXZvdC5zZXQodGhpcy5wcmVsb2FkZXIud2lkdGgvMiwgdGhpcy5wcmVsb2FkZXIuaGVpZ2h0LzIpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLnggPSB3aW5kb3dTaXplVk8ud2lkdGgvMjtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZS55ID0gd2luZG93U2l6ZVZPLmhlaWdodC8yO1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMucHJlbG9hZGVyKTtcclxuICAgICAgICAgICAgUFhSb290LmFkZENoaWxkKHRoaXMuc3RhZ2UpO1xyXG5cclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMucm90YXRlLmJpbmQodGhpcykpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJvdGF0ZTogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYodGhpcy5sb2FkQ29tcGxldGUpe1xyXG4gICAgICAgICAgICAgICAgUFhSb290LnJlbW92ZUNoaWxkKHRoaXMuc3RhZ2UpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhZ2Uucm90YXRpb24gKz0gMC4xO1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMucm90YXRlLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGlkZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRDb21wbGV0ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdQcmVsb2FkZXInXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBSZWVsXHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC52aWV3LmNvbXBvbmVudC5SZWVsJyxcclxuICAgICAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLy8gU3RhZ2UgTWVtYmVyc1xyXG4gICAgICAgIHN0YWdlOiBudWxsLFxyXG5cclxuICAgICAgICByZWVsSW5kZXg6IG51bGwsXHJcblxyXG4gICAgICAgIG51bVJvd3M6IG51bGwsXHJcbiAgICAgICAgd2lkdGg6IG51bGwsXHJcbiAgICAgICAgaGVpZ2h0OiBudWxsLFxyXG5cclxuICAgICAgICBjZWxsczogbnVsbCxcclxuICAgICAgICBzcGluVHJpY2tDZWxsczogbnVsbCxcclxuICAgICAgICBjZWxsUG9zT3JpZ2luYWw6IG51bGwsXHJcbiAgICAgICAgcmVlbENlbGxIZWlnaHQ6IG51bGwsXHJcbiAgICAgICAgcmVlbEhlaWdodDogbnVsbCxcclxuXHJcbiAgICAgICAgcmVzdWx0UmVlbDogbnVsbCxcclxuICAgICAgICBpc1Jlc3VsdFJlY2VpdmVkOiBudWxsLFxyXG5cclxuICAgICAgICBoaWdobGlnaHQ6IG51bGwsXHJcblxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIChpbmRleCwgZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZWxJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICB0aGlzLm51bVJvd3MgPSBkYXRhLmdhbWVDb25maWdWTy5udW1Sb3dzO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRpbmcgc2l6ZSBvZiBzaW5nbGUgcmVlbCBhcmVhXHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSBkYXRhLnVpQ29uZmlnVk8uc3ltYm9sV2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID1cclxuICAgICAgICAgICAgICAgICh0aGlzLm51bVJvd3MgKiBkYXRhLnVpQ29uZmlnVk8uc3ltYm9sSGVpZ2h0KSArXHJcbiAgICAgICAgICAgICAgICAoKHRoaXMubnVtUm93cyAtIDEpICogZGF0YS51aUNvbmZpZ1ZPLnJlZWxWU2VwYXJhdG9yKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFllbGxvdyByb3VuZGVkIHJlY3RhbmdsZSBzdHJpcCBiZWhpbmQgZWFjaCByZWVsXHJcbiAgICAgICAgICAgIHZhciBiZ1JlY3QgPSBuZXcgUElYSS5HcmFwaGljcygpO1xyXG4gICAgICAgICAgICBiZ1JlY3QuYmVnaW5GaWxsKGRhdGEudWlDb25maWdWTy5yZWVsQkdDb2xvcik7XHJcbiAgICAgICAgICAgIGJnUmVjdC5kcmF3Um91bmRlZFJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIDEwKTtcclxuICAgICAgICAgICAgYmdSZWN0LmFscGhhID0gMC40O1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKGJnUmVjdCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVJlZWxDZWxscyhkYXRhKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjcmVhdGVSZWVsQ2VsbHM6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICAvLyBUaGUgZGlzdGFuY2UgZWFjaCBzeW1ib2wgaXMgYW5pbWF0ZWQgdG8gY3JlYXRlIHNwaW4gZWZmZWN0XHJcbiAgICAgICAgICAgIHRoaXMucmVlbENlbGxIZWlnaHQgPSBkYXRhLnVpQ29uZmlnVk8uc3ltYm9sSGVpZ2h0ICsgZGF0YS51aUNvbmZpZ1ZPLnJlZWxWU2VwYXJhdG9yO1xyXG4gICAgICAgICAgICB0aGlzLnJlZWxIZWlnaHQgPVxyXG4gICAgICAgICAgICAgICAgKGRhdGEudWlDb25maWdWTy5zeW1ib2xIZWlnaHQgKiB0aGlzLm51bVJvd3MpICtcclxuICAgICAgICAgICAgICAgIChkYXRhLnVpQ29uZmlnVk8ucmVlbFZTZXBhcmF0b3IgKiAodGhpcy5udW1Sb3dzIC0gMSkpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHhwID0gMDtcclxuICAgICAgICAgICAgdmFyIHlwID0gLSh0aGlzLnJlZWxDZWxsSGVpZ2h0ICogdGhpcy5udW1Sb3dzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFN0b3JpbmcgcG9zaXRpb25zIG9mIGFsbCBjZWxsc1xyXG4gICAgICAgICAgICAvLyAoYm90aCBvbiBzY3JlZW4gYW5kIG9mZiBzY3JlZW4gdHJpY2sgY2VsbHMpXHJcbiAgICAgICAgICAgIHRoaXMuY2VsbFBvc09yaWdpbmFsID0gW107XHJcblxyXG4gICAgICAgICAgICB2YXIgcmVlbENlbGw7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGluZyBjZWxscyB1c2VkIHRvIGNyZWF0ZSBjb250aW5vdXMgc3BpblxyXG4gICAgICAgICAgICAvLyBUaGVzZSBzdGF5IG9mZiBzY3JlZW4gYW5kIG9ubHkgY29tZSBvbiB0byB2aXNpYmxlIGFyZWFcclxuICAgICAgICAgICAgLy8gd2hlbiB0aGUgcmVlbCBpcyBzcGlubmluZ1xyXG4gICAgICAgICAgICAvLyBUaGVzZSB3aWxsIGJlIHRoZSBmaXJzdCBzZXQgaW4gY2VsbFBvc09yaWdpbmFsIGFycmF5XHJcbiAgICAgICAgICAgIHRoaXMuc3BpblRyaWNrQ2VsbHMgPSBbXTtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMubnVtUm93czsgaSsrKXtcclxuICAgICAgICAgICAgICAgIHJlZWxDZWxsID0gbmV3IHNsb3Qudmlldy5jb21wb25lbnQuUmVlbENlbGwoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQocmVlbENlbGwuc3RhZ2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGluVHJpY2tDZWxscy5wdXNoKHJlZWxDZWxsKTtcclxuICAgICAgICAgICAgICAgIHJlZWxDZWxsLnN0YWdlLnggPSB4cDtcclxuICAgICAgICAgICAgICAgIHJlZWxDZWxsLnN0YWdlLnkgPSB5cDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2VsbFBvc09yaWdpbmFsLnB1c2goe3g6IHhwLCB5OiB5cH0pO1xyXG4gICAgICAgICAgICAgICAgcmVlbENlbGwuaW5pdChkYXRhKTtcclxuICAgICAgICAgICAgICAgIHlwICs9IGRhdGEudWlDb25maWdWTy5zeW1ib2xIZWlnaHQgKyBkYXRhLnVpQ29uZmlnVk8ucmVlbFZTZXBhcmF0b3I7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFJlZWwgY2VsbHMgdG8gZGlzcGxheSBzcGluIHJlc3VsdFxyXG4gICAgICAgICAgICAvLyBUaGVzZSB3aWxsIGJlIHRoZSBsYXN0IHNldCBpbiBjZWxsUG9zT3JpZ2luYWwgYXJyYXlcclxuICAgICAgICAgICAgdGhpcy5jZWxscyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCB0aGlzLm51bVJvd3M7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICByZWVsQ2VsbCA9IG5ldyBzbG90LnZpZXcuY29tcG9uZW50LlJlZWxDZWxsKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHJlZWxDZWxsLnN0YWdlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2VsbHMucHVzaChyZWVsQ2VsbCk7XHJcbiAgICAgICAgICAgICAgICByZWVsQ2VsbC5zdGFnZS54ID0geHA7XHJcbiAgICAgICAgICAgICAgICByZWVsQ2VsbC5zdGFnZS55ID0geXA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNlbGxQb3NPcmlnaW5hbC5wdXNoKHt4OiB4cCwgeTogeXB9KTtcclxuICAgICAgICAgICAgICAgIHJlZWxDZWxsLmluaXQoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB5cCArPSBkYXRhLnVpQ29uZmlnVk8uc3ltYm9sSGVpZ2h0ICsgZGF0YS51aUNvbmZpZ1ZPLnJlZWxWU2VwYXJhdG9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3BpbjogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy5pc1Jlc3VsdFJlY2VpdmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRTcGluKCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3RhcnRTcGluOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgZWFzZVR5cGUgPSBQb3dlcjEuZWFzZUluO1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5udW1Sb3dzOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGluVHJpY2tDZWxsc1tpXS51cGRhdGVXaXRoUmFuZG9tU3ltYm9sKCk7XHJcbiAgICAgICAgICAgICAgICBUd2VlbkxpdGUudG8oXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGluVHJpY2tDZWxsc1tpXS5zdGFnZSxcclxuICAgICAgICAgICAgICAgICAgICAwLjUsXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiB0aGlzLnNwaW5Ucmlja0NlbGxzW2ldLnN0YWdlLnkgKyAodGhpcy5yZWVsQ2VsbEhlaWdodCAqIHRoaXMubnVtUm93cyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVhc2U6IGVhc2VUeXBlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIC8vIFR3ZWVuIG9uQ29tcGxldGUgY2FsbGJhY2sgdG8gYmUgYWRkZWQgb25seSB0byBvbmUgU3ltYm9sLlxyXG4gICAgICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gKGkgPT09IHRoaXMubnVtUm93cyAtIDEpID8gdGhpcy5jb250aW51ZVNwaW4uYmluZCh0aGlzKSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICBUd2VlbkxpdGUudG8oXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1tpXS5zdGFnZSxcclxuICAgICAgICAgICAgICAgICAgICAwLjUsXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiB0aGlzLmNlbGxzW2ldLnN0YWdlLnkgKyAodGhpcy5yZWVsQ2VsbEhlaWdodCAqIHRoaXMubnVtUm93cyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVhc2U6IGVhc2VUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlOiBjYWxsYmFja1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb250aW51ZVNwaW46IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNSZXN1bHRSZWNlaXZlZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BTcGluKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIG9mZlNjcmVlbkNlbGxzID0gdGhpcy5nZXRPZmZTY3JlZW5DZWxscygpO1xyXG4gICAgICAgICAgICB2YXIgZWFzZVR5cGUgPSBMaW5lYXIuZWFzZU5vbmU7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLm51bVJvd3M7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBvZmZTY3JlZW5DZWxsc1tpXS51cGRhdGVXaXRoUmFuZG9tU3ltYm9sKCk7XHJcbiAgICAgICAgICAgICAgICBvZmZTY3JlZW5DZWxsc1tpXS5zdGFnZS55ID0gdGhpcy5jZWxsUG9zT3JpZ2luYWxbaV0ueTtcclxuICAgICAgICAgICAgICAgIFR3ZWVuTGl0ZS50byhcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwaW5Ucmlja0NlbGxzW2ldLnN0YWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIDAuMSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHRoaXMuc3BpblRyaWNrQ2VsbHNbaV0uc3RhZ2UueSArICh0aGlzLnJlZWxDZWxsSGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWFzZTogZWFzZVR5cGVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgLy8gVHdlZW4gb25Db21wbGV0ZSBjYWxsYmFjayB0byBiZSBhZGRlZCBvbmx5IHRvIG9uZSBTeW1ib2wuXHJcbiAgICAgICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSAoaSA9PT0gdGhpcy5udW1Sb3dzIC0gMSkgPyB0aGlzLmNvbnRpbnVlU3Bpbi5iaW5kKHRoaXMpIDogbnVsbDtcclxuICAgICAgICAgICAgICAgIFR3ZWVuTGl0ZS50byhcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW2ldLnN0YWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIDAuMSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHRoaXMuY2VsbHNbaV0uc3RhZ2UueSArICh0aGlzLnJlZWxDZWxsSGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWFzZTogZWFzZVR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU6IGNhbGxiYWNrXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIFR3ZWVuTGl0ZS50byh0aGlzLmNlbGxzW2ldLnN0YWdlLCAwLjEsIHtlYXNlOiBlYXNlVHlwZSwgb25Db21wbGV0ZTogY2FsbGJhY2t9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN0b3BTcGluOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgb2ZmU2NyZWVuQ2VsbHMgPSB0aGlzLmdldE9mZlNjcmVlbkNlbGxzKCk7XHJcbiAgICAgICAgICAgIHZhciBlYXNlVHlwZSA9IFBvd2VyMS5lYXNlT3V0O1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5udW1Sb3dzOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgb2ZmU2NyZWVuQ2VsbHNbaV0udXBkYXRlU3ltYm9sKHRoaXMucmVzdWx0UmVlbFtpXSk7XHJcbiAgICAgICAgICAgICAgICBvZmZTY3JlZW5DZWxsc1tpXS5zdGFnZS55ID0gdGhpcy5jZWxsUG9zT3JpZ2luYWxbaV0ueTtcclxuICAgICAgICAgICAgICAgIFR3ZWVuTGl0ZS50byhcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwaW5Ucmlja0NlbGxzW2ldLnN0YWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIDAuNSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHRoaXMuc3BpblRyaWNrQ2VsbHNbaV0uc3RhZ2UueSArICh0aGlzLnJlZWxDZWxsSGVpZ2h0ICogdGhpcy5udW1Sb3dzKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWFzZTogZWFzZVR5cGVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgLy8gVHdlZW4gb25Db21wbGV0ZSBjYWxsYmFjayB0byBiZSBhZGRlZCBvbmx5IHRvIG9uZSBTeW1ib2wuXHJcbiAgICAgICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSAoaSA9PT0gdGhpcy5udW1Sb3dzIC0gMSkgPyB0aGlzLm9uU3BpblN0b3AuYmluZCh0aGlzKSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICBUd2VlbkxpdGUudG8oXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1tpXS5zdGFnZSxcclxuICAgICAgICAgICAgICAgICAgICAwLjUsXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiB0aGlzLmNlbGxzW2ldLnN0YWdlLnkgKyAodGhpcy5yZWVsQ2VsbEhlaWdodCAqIHRoaXMubnVtUm93cyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVhc2U6IGVhc2VUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlOiBjYWxsYmFja1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvblNwaW5TdG9wOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwLCBqID0gMDsgaSA8IHRoaXMubnVtUm93czsgaSsrLCBqKyspe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGluVHJpY2tDZWxsc1tpXS5zdGFnZS55ID0gdGhpcy5jZWxsUG9zT3JpZ2luYWxbal0ueTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3BpblRyaWNrQ2VsbHNbaV0ucmVtb3ZlU3ltYm9sKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgdGhpcy5udW1Sb3dzOyBpKyssIGorKyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW2ldLnN0YWdlLnkgPSB0aGlzLmNlbGxQb3NPcmlnaW5hbFtqXS55O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jZWxsc1tpXS51cGRhdGVTeW1ib2wodGhpcy5yZXN1bHRSZWVsW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLmVtaXQoc2xvdC52aWV3LmV2ZW50LlZpZXdFdmVudHMuUkVFTF9TUElOX0VORCwgdGhpcy5yZWVsSW5kZXgpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE9mZnNjcmVlbiBjZWxscyBhcmUgdGhlIG9uZXMgd2hpY2ggYXJlIGJlbG93IHRoZSByZWVsIGFyZWFcclxuICAgICAgICAgKiBPbmUgb2YgdGhlIGNlbGwgc2V0LCBlaXRoZXIgdGhlIGFjdHVhbCByZXN1bHQgY2VsbCBzZXQsXHJcbiAgICAgICAgICogb3IgdGhlIHRyaWNrIGNlbGwgc2V0IGlzIHJldHVybmVkIGFzIGFuIGFycmF5XHJcbiAgICAgICAgICogQHJldHVybnMge251bGx9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0T2ZmU2NyZWVuQ2VsbHM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciBvZmZTY3JlZW5DZWxscyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwLCBqID0gMDsgaSA8IHRoaXMubnVtUm93czsgaSsrLCBqKyspe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5zcGluVHJpY2tDZWxsc1tpXS5zdGFnZS55IDwgMCB8fCB0aGlzLnNwaW5Ucmlja0NlbGxzW2ldLnN0YWdlLnkgPiB0aGlzLnJlZWxIZWlnaHQpe1xyXG4gICAgICAgICAgICAgICAgICAgIG9mZlNjcmVlbkNlbGxzLnB1c2godGhpcy5zcGluVHJpY2tDZWxsc1tpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNlbGxzW2ldLnN0YWdlLnkgPCAwIHx8IHRoaXMuY2VsbHNbaV0uc3RhZ2UueSA+IHRoaXMucmVlbEhlaWdodCl7XHJcbiAgICAgICAgICAgICAgICAgICAgb2ZmU2NyZWVuQ2VsbHMucHVzaCh0aGlzLmNlbGxzW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gb2ZmU2NyZWVuQ2VsbHM7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3RvcEFuZFVwZGF0ZVN5bWJvbHM6IGZ1bmN0aW9uKHJlc3VsdCl7XHJcbiAgICAgICAgICAgIHRoaXMucmVzdWx0UmVlbCA9IHJlc3VsdDtcclxuICAgICAgICAgICAgdGhpcy5pc1Jlc3VsdFJlY2VpdmVkID0gdHJ1ZTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB1cGRhdGVTeW1ib2xzV2l0aG91dFNwaW46IGZ1bmN0aW9uKHJlc3VsdCl7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLm51bVJvd3M7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW2ldLnVwZGF0ZVN5bWJvbChyZXN1bHRbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2hvd1dpbkhpZ2hsaWdodDogZnVuY3Rpb24ocm93KXtcclxuICAgICAgICAgICAgdGhpcy5oaWRlV2luSGlnaGxpZ2h0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0ID0gdGhpcy5jZWxsc1tyb3ddLmhpZ2hsaWdodDtcclxuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHQudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGlkZVdpbkhpZ2hsaWdodDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYodGhpcy5oaWdobGlnaHQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oaWdobGlnaHQudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGFuZGxlUmVzaXplOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdSZWVsJ1xyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgUmVlbENlbGxcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LnZpZXcuY29tcG9uZW50LlJlZWxDZWxsJyxcclxuICAgICAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLy8gU3RhZ2UgTWVtYmVyc1xyXG4gICAgICAgIHN0YWdlOiBudWxsLFxyXG4gICAgICAgIHN5bWJvbDogbnVsbCxcclxuICAgICAgICBoaWdobGlnaHQ6IG51bGwsXHJcblxyXG4gICAgICAgIHN5bWJvbElEOiBudWxsLFxyXG5cclxuICAgICAgICAvLyBBbGwgcG9zc2libGUgc3ltYm9sc1xyXG4gICAgICAgIG51bVN5bWJvbHM6IG51bGwsXHJcbiAgICAgICAgc3ltYm9sczogbnVsbCxcclxuXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5udW1TeW1ib2xzID0gZGF0YS5nYW1lQ29uZmlnVk8ubnVtU3ltYm9scztcclxuICAgICAgICAgICAgdGhpcy5zeW1ib2xzID0gZGF0YS5nYW1lQ29uZmlnVk8uZ2V0U3ltYm9scygpO1xyXG5cclxuICAgICAgICAgICAgLy8gWWVsbG93IHJvdW5kZWQgcmVjdGFuZ2xlIHN0cmlwIGJlaGluZCBlYWNoIHJlZWxcclxuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHQgPSBuZXcgUElYSS5HcmFwaGljcygpO1xyXG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodC5iZWdpbkZpbGwoZGF0YS51aUNvbmZpZ1ZPLnJlZWxIaWdobGlnaHRDb2xvcik7XHJcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0LmRyYXdSb3VuZGVkUmVjdCgwLCAwLCBkYXRhLnVpQ29uZmlnVk8uc3ltYm9sV2lkdGgsIGRhdGEudWlDb25maWdWTy5zeW1ib2xIZWlnaHQsIDEwKTtcclxuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHQuYWxwaGEgPSAwLjc7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5oaWdobGlnaHQpO1xyXG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodC52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlU3ltYm9sOiBmdW5jdGlvbihzeW1ib2xJRCl7XHJcbiAgICAgICAgICAgIHRoaXMuc3ltYm9sSUQgPSBzeW1ib2xJRDtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVTeW1ib2woKTtcclxuICAgICAgICAgICAgdGhpcy5zeW1ib2wgPSBuZXcgUElYSS5TcHJpdGUoUElYSS5UZXh0dXJlLmZyb21GcmFtZShzeW1ib2xJRCkpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuc3ltYm9sKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB1cGRhdGVXaXRoUmFuZG9tU3ltYm9sOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVN5bWJvbCh0aGlzLnN5bWJvbHNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5udW1TeW1ib2xzKV0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlbW92ZVN5bWJvbDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYodGhpcy5zeW1ib2wpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFnZS5yZW1vdmVDaGlsZCh0aGlzLnN5bWJvbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoYW5kbGVSZXNpemU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogJ1JlZWxDZWxsJ1xyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgUmVlbENvbnRhaW5lclxyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3Qudmlldy5jb21wb25lbnQuUmVlbENvbnRhaW5lcicsXHJcbiAgICAgICAgY29uc3RydWN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZSA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIC8vIFN0YWdlIE1lbWJlcnNcclxuICAgICAgICBzdGFnZTogbnVsbCxcclxuICAgICAgICBiZ1JlY3Q6IG51bGwsXHJcblxyXG4gICAgICAgIG51bVJlZWxzOiBudWxsLFxyXG4gICAgICAgIG51bVJvd3M6IG51bGwsXHJcbiAgICAgICAgd2lkdGg6IG51bGwsXHJcbiAgICAgICAgaGVpZ2h0OiBudWxsLFxyXG5cclxuICAgICAgICByZWVsczogbnVsbCxcclxuXHJcbiAgICAgICAgaXNTcGlubmluZzogbnVsbCxcclxuICAgICAgICByZWVsU3BpbkRlbGF5OiBudWxsLFxyXG4gICAgICAgIG1pblNwaW5EdXJhdGlvbjogbnVsbCxcclxuICAgICAgICBtaW5TcGluRHVyYXRpb25FbGFwc2VkOiBudWxsLFxyXG4gICAgICAgIHJlc3VsdE1hdHJpeFJlY2VpdmVkOiBudWxsLFxyXG4gICAgICAgIHJlc3VsdE1hdHJpeDogbnVsbCxcclxuXHJcbiAgICAgICAgcmVzcFNjYWxlOiBudWxsLFxyXG5cclxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLm51bVJlZWxzID0gZGF0YS5nYW1lQ29uZmlnVk8ubnVtUmVlbHM7XHJcbiAgICAgICAgICAgIHRoaXMubnVtUm93cyA9IGRhdGEuZ2FtZUNvbmZpZ1ZPLm51bVJvd3M7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1pblNwaW5EdXJhdGlvbiA9IGRhdGEudWlDb25maWdWTy5taW5TcGluRHVyYXRpb247XHJcbiAgICAgICAgICAgIHRoaXMucmVlbFNwaW5EZWxheSA9IGRhdGEudWlDb25maWdWTy5yZWVsU3BpbkRlbGF5O1xyXG4gICAgICAgICAgICB0aGlzLnJlc3BTY2FsZSA9IGRhdGEudWlDb25maWdWTy5yZXNwb25zaXZlU2NhbGUucmVlbEFyZWE7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRpbmcgc2l6ZSBvZiB3aG9sZSByZWVsIGFyZWEgdXNpbmcgdmFsdWVzIHByb3ZpZGVkIGluIGNvbmZpZ1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoID1cclxuICAgICAgICAgICAgICAgICh0aGlzLm51bVJlZWxzICogZGF0YS51aUNvbmZpZ1ZPLnN5bWJvbFdpZHRoKSArXHJcbiAgICAgICAgICAgICAgICAoKHRoaXMubnVtUmVlbHMgLSAxKSAqIGRhdGEudWlDb25maWdWTy5yZWVsSFNlcGFyYXRvcikgK1xyXG4gICAgICAgICAgICAgICAgKGRhdGEudWlDb25maWdWTy5yZWVsSFBhZGRpbmcgKiAyKTtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPVxyXG4gICAgICAgICAgICAgICAgKHRoaXMubnVtUm93cyAqIGRhdGEudWlDb25maWdWTy5zeW1ib2xIZWlnaHQpICtcclxuICAgICAgICAgICAgICAgICgodGhpcy5udW1Sb3dzIC0gMSkgKiBkYXRhLnVpQ29uZmlnVk8ucmVlbFZTZXBhcmF0b3IpICtcclxuICAgICAgICAgICAgICAgIChkYXRhLnVpQ29uZmlnVk8ucmVlbFZQYWRkaW5nICogMik7XHJcblxyXG4gICAgICAgICAgICAvLyBXaGl0ZSByb3VuZGVkIHJlY3RhbmdsZSBiZWhpbmQgdGhlIHdob2xlIHJlZWwgYXJlYVxyXG4gICAgICAgICAgICB0aGlzLmJnUmVjdCA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYmdSZWN0LmJlZ2luRmlsbChkYXRhLnVpQ29uZmlnVk8ucmVlbEFyZWFCR0NvbG9yKTtcclxuICAgICAgICAgICAgdGhpcy5iZ1JlY3QuZHJhd1JvdW5kZWRSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAxNSk7XHJcbiAgICAgICAgICAgIHRoaXMuYmdSZWN0LmFscGhhID0gMC42O1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuYmdSZWN0KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlUmVlbHMoZGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dXBWaWV3KGRhdGEud2luZG93U2l6ZVZPKTtcclxuXHJcbiAgICAgICAgICAgIFBYUm9vdC5hZGRDaGlsZCh0aGlzLnN0YWdlKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjcmVhdGVSZWVsczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICB2YXIgeHAgPSBkYXRhLnVpQ29uZmlnVk8ucmVlbEhQYWRkaW5nO1xyXG4gICAgICAgICAgICB2YXIgeXAgPSBkYXRhLnVpQ29uZmlnVk8ucmVlbFZQYWRkaW5nO1xyXG4gICAgICAgICAgICB0aGlzLnJlZWxzID0gW107XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLm51bVJlZWxzOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlZWwgPSBuZXcgc2xvdC52aWV3LmNvbXBvbmVudC5SZWVsKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHJlZWwuc3RhZ2UpO1xyXG4gICAgICAgICAgICAgICAgcmVlbC5pbml0KGksIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgcmVlbC5zdGFnZS54ID0geHA7XHJcbiAgICAgICAgICAgICAgICByZWVsLnN0YWdlLnkgPSB5cDtcclxuICAgICAgICAgICAgICAgIHJlZWwuc3RhZ2UubWFzayA9IHRoaXMuY3JlYXRlTWFza09iamVjdCh4cCwgeXAsIHJlZWwud2lkdGgsIHJlZWwuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIHJlZWwuc3RhZ2Uub24oXHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdC52aWV3LmV2ZW50LlZpZXdFdmVudHMuUkVFTF9TUElOX0VORCxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uUmVlbFN0b3AuYmluZCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVlbHMucHVzaChyZWVsKTtcclxuICAgICAgICAgICAgICAgIHhwICs9IGRhdGEudWlDb25maWdWTy5zeW1ib2xXaWR0aCArIGRhdGEudWlDb25maWdWTy5yZWVsSFNlcGFyYXRvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNldHVwVmlldzogZnVuY3Rpb24od2luZG93U2l6ZVZPKXtcclxuICAgICAgICAgICAgLy8gU2NhbGluZyBhbmQgcG9zaXRpb25pbmcgYXMgcGVyIHJlc3BvbnNpdmUgc2NhbGVcclxuICAgICAgICAgICAgdmFyIHN1YnN0aXR1dGUgPSB7d2lkdGg6IHRoaXMud2lkdGgsIGhlaWdodDogdGhpcy5oZWlnaHR9O1xyXG4gICAgICAgICAgICB2YXIgZml0Q29udGVudE9uU2NyZWVuID0gbmV3IHNsb3QubW9kZWwubGliLlV0aWxzKCkuZml0Q29udGVudE9uU2NyZWVuO1xyXG4gICAgICAgICAgICBmaXRDb250ZW50T25TY3JlZW4oXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogc3Vic3RpdHV0ZSxcclxuICAgICAgICAgICAgICAgICAgICBzY3JlZW46IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeDogd2luZG93U2l6ZVZPLndpZHRoICogdGhpcy5yZXNwU2NhbGUueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeTogd2luZG93U2l6ZVZPLmhlaWdodCAqIHRoaXMucmVzcFNjYWxlLnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB3aW5kb3dTaXplVk8ud2lkdGggKiB0aGlzLnJlc3BTY2FsZS53LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHdpbmRvd1NpemVWTy5oZWlnaHQgKiB0aGlzLnJlc3BTY2FsZS5oXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLnggPSBzdWJzdGl0dXRlLng7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UueSA9IHN1YnN0aXR1dGUueTtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZS5zY2FsZS54ID0gc3Vic3RpdHV0ZS53aWR0aC90aGlzLndpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLnNjYWxlLnkgPSBzdWJzdGl0dXRlLmhlaWdodC90aGlzLmhlaWdodDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjcmVhdGVNYXNrT2JqZWN0OiBmdW5jdGlvbih4LCB5LCB3LCBoKXtcclxuICAgICAgICAgICAgLy8gUm91bmRlZCByZWN0YW5nbGUgb24gdG9wIG9mIGVhY2ggcmVlbCBmb3IgbWFza1xyXG4gICAgICAgICAgICB2YXIgbWFzayA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XHJcbiAgICAgICAgICAgIG1hc2suYmVnaW5GaWxsKDB4RkZGRkZGKTtcclxuICAgICAgICAgICAgbWFzay5kcmF3Um91bmRlZFJlY3QoeCwgeSwgdywgaCwgMTApO1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKG1hc2spO1xyXG4gICAgICAgICAgICByZXR1cm4gbWFzaztcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzcGluOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzU3Bpbm5pbmcpIHtcclxuICAgICAgICAgICAgICAgIHRocm93KG5ldyBFcnJvcihcIkNhbm5vdCBzdGFydCBuZXcgc3Bpbi4gQWxyZWFkeSBzcGlubmluZy5cIikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNTcGlubmluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubWluU3BpbkR1cmF0aW9uRWxhcHNlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnJlc3VsdE1hdHJpeFJlY2VpdmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLm51bVJlZWxzOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZWxzW2ldLnNwaW4uYmluZCh0aGlzLnJlZWxzW2ldKSxcclxuICAgICAgICAgICAgICAgICAgICBpICogdGhpcy5yZWVsU3BpbkRlbGF5ICogMTAwMFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMuZWxhcHNlTWluU3BpbkR1cmF0aW9uLmJpbmQodGhpcyksIHRoaXMubWluU3BpbkR1cmF0aW9uICogMTAwMCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZWxhcHNlTWluU3BpbkR1cmF0aW9uOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLm1pblNwaW5EdXJhdGlvbkVsYXBzZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVN5bWJvbHNJZlJlYWR5KCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3RvcEFuZFVwZGF0ZVN5bWJvbHM6IGZ1bmN0aW9uKHJlc3VsdCl7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLmlzU3Bpbm5pbmcpIHtcclxuICAgICAgICAgICAgICAgIHRocm93KG5ldyBFcnJvcihcIkNhbm5vdCB1cGRhdGUgc3ltYm9scy4gUmVlbHMgbm90IHNwaW5uaW5nLiBcIiArXHJcbiAgICAgICAgICAgICAgICBcIlVzZSB1cGRhdGVTeW1ib2xzV2l0aG91dFNwaW4gbWV0aG9kIHRvIHVwZGF0ZSBzeW1ib2xzIHdoZW4gbm90IHNwaW5uaW5nLlwiKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5yZXN1bHRNYXRyaXggPSByZXN1bHQ7XHJcbiAgICAgICAgICAgIHRoaXMucmVzdWx0TWF0cml4UmVjZWl2ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVN5bWJvbHNJZlJlYWR5KCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhlIG1ldGhvZCB1cGRhdGVTeW1ib2xzSWZSZWFkeSBtYWtlcyBzdXJlIHRoYXQgdGhlIHJlZWxzIGhhdmUgc3B1biBmb3IgdGhlXHJcbiAgICAgICAgICogbWluaW11bSByZXF1aXJlZCBkdXJhdGlvbiBhbmQgYWxzbyB2ZXJpZmllcyBpZiBzcGluIHJlc3VsdCBoYXYgYmVlbiByZWNlaXZlZFxyXG4gICAgICAgICAqIGJ5IHZlcmlmeWluZyB0aGF0IHRoZSBhc3NvY2lhdGVkIGZsYWdzIGFyZSB0cnVlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogVGhpcyBtZXRob2QgaXMgaW52b2tlZCB3aGVuIHJlc3VsdHMgYXJlIHJlY2VpdmVkIGFuZCB3aGVuIG1pbmltdW0gc3BpbiBkdXJhdGlvblxyXG4gICAgICAgICAqIGVsYXBlcy4gVGhpcyBmdW5jdGlvbiB2ZXJpZmllcyBib3RoIGFuZCB0aGVuIHByb2NlZWRzIGJ5IHByb3ZpZGlubmcgaW5kaXZpZHVhbFxyXG4gICAgICAgICAqIHJlZWxzIHdpdGggdGhlaXIgc3ltYm9scy5cclxuICAgICAgICAgKi9cclxuICAgICAgICB1cGRhdGVTeW1ib2xzSWZSZWFkeTogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYodGhpcy5taW5TcGluRHVyYXRpb25FbGFwc2VkICYmIHRoaXMucmVzdWx0TWF0cml4UmVjZWl2ZWQpe1xyXG4gICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMubnVtUmVlbHM7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWVsc1tpXS5zdG9wQW5kVXBkYXRlU3ltYm9scy5iaW5kKHRoaXMucmVlbHNbaV0sIHRoaXMucmVzdWx0TWF0cml4W2ldKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaSAqIHRoaXMucmVlbFNwaW5EZWxheSAqIDEwMDBcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlU3ltYm9sc1dpdGhvdXRTcGluOiBmdW5jdGlvbihyZXN1bHQpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzU3Bpbm5pbmcpIHtcclxuICAgICAgICAgICAgICAgIHRocm93KG5ldyBFcnJvcihcIkNhbm5vdCB1cGRhdGUgd2l0aG91dCBzcGluLiBBbHJlYWR5IHNwaW5uaW5nLlwiKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMubnVtUmVlbHM7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZWxzW2ldLnVwZGF0ZVN5bWJvbHNXaXRob3V0U3BpbihyZXN1bHRbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2hvd1dpbkhpZ2hsaWdodDogZnVuY3Rpb24obGluZSwgb2FrKXtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IG9hazsgaSsrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVlbHNbaV0uc2hvd1dpbkhpZ2hsaWdodChsaW5lW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGhpZGVXaW5IaWdobGlnaHQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLm51bVJlZWxzOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWVsc1tpXS5oaWRlV2luSGlnaGxpZ2h0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvblJlZWxTdG9wOiBmdW5jdGlvbihyZWVsSUQpe1xyXG4gICAgICAgICAgICBpZihyZWVsSUQgPT09IHRoaXMubnVtUmVlbHMgLSAxKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNTcGlubmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFnZS5lbWl0KHNsb3Qudmlldy5ldmVudC5WaWV3RXZlbnRzLlJFRUxfU1BJTl9FTkQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGFuZGxlUmVzaXplOiBmdW5jdGlvbiAod2luZG93U2l6ZVZPKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dXBWaWV3KHdpbmRvd1NpemVWTyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdSZWVsQ29udGFpbmVyJ1xyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgV2luTGluZXNcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LnZpZXcuY29tcG9uZW50LldpbkxpbmVzJyxcclxuICAgICAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLy8gU3RhZ2UgTWVtYmVyc1xyXG4gICAgICAgIHN0YWdlOiBudWxsLFxyXG4gICAgICAgIGxpbmVzOiBudWxsLFxyXG5cclxuICAgICAgICBudW1MaW5lczogbnVsbCxcclxuICAgICAgICB2aXNpYmxlTGluZTogbnVsbCxcclxuXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5udW1MaW5lcyA9IGRhdGEuZ2FtZUNvbmZpZ1ZPLm51bUxpbmVzO1xyXG4gICAgICAgICAgICB0aGlzLmFkZExpbmVzKGRhdGEpO1xyXG4gICAgICAgICAgICB0aGlzLmhpZGVBbGxMaW5lcygpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFkZExpbmVzOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICAgdGhpcy5saW5lcyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgdmFyIGxpbmVQb2ludHMgPSBkYXRhLnVpQ29uZmlnVk8ubGluZVBvaW50cztcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMubnVtTGluZXM7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGluZSA9IGxpbmVQb2ludHNbaV07XHJcbiAgICAgICAgICAgICAgICB2YXIgdG90YWxQb2ludHMgPSBsaW5lLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHZhciBsaW5lR3JhcGhpYyA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XHJcbiAgICAgICAgICAgICAgICBsaW5lR3JhcGhpYy5saW5lU3R5bGUoZGF0YS51aUNvbmZpZ1ZPLndpbkxpbmVXaWR0aCwgZGF0YS51aUNvbmZpZ1ZPLndpbkxpbmVDb2xvcik7XHJcbiAgICAgICAgICAgICAgICBsaW5lR3JhcGhpYy5tb3ZlVG8obGluZVswXVswXSwgbGluZVswXVsxXSk7XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGogPSAxOyBqIDwgdG90YWxQb2ludHM7IGorKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZUdyYXBoaWMubGluZVRvKGxpbmVbal1bMF0sIGxpbmVbal1bMV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGluZUdyYXBoaWMuZW5kRmlsbCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZChsaW5lR3JhcGhpYyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmVzLnB1c2gobGluZUdyYXBoaWMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2hvd0xpbmU6IGZ1bmN0aW9uKGxpbmVOdW1iZXIpe1xyXG4gICAgICAgICAgICBpZih0aGlzLnZpc2libGVMaW5lKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJsZUxpbmUudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudmlzaWJsZUxpbmUgPSB0aGlzLmxpbmVzW2xpbmVOdW1iZXJdO1xyXG4gICAgICAgICAgICB0aGlzLnZpc2libGVMaW5lLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGhpZGVBbGxMaW5lczogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMubnVtTGluZXM7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmVzW2ldLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGhhbmRsZVJlc2l6ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBOQU1FOiAnV2luTGluZXMnXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBWaWV3RXZlbnRzXHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiBcInNsb3Qudmlldy5ldmVudC5WaWV3RXZlbnRzXCJcclxuICAgIH0sXHJcblxyXG4gICAge30sXHJcblxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBDTElDSzogICAgICAgICAgICAgICgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpID8gXCJ0YXBcIiA6IFwiY2xpY2tcIixcclxuICAgICAgICBTUElOX0NMSUNLOiAgICAgICAgIFwiVmlld0V2ZW50c19zcGluX2NsaWNrXCIsXHJcbiAgICAgICAgUkVFTF9TUElOX0VORDogICAgICBcIlZpZXdFdmVudHNfcmVlbF9zcGluX2VuZFwiLFxyXG4gICAgICAgIEJFVF9DTElDSzogICAgICAgICAgXCJWaWV3RXZlbnRzX2JldF9jbGlja1wiXHJcbiAgICB9XHJcbik7IiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2NcclxuICogQGNsYXNzICAgICAgIEJHTWVkaWF0b3JcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LnZpZXcubWVkaWF0b3IuQkdNZWRpYXRvcicsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLk1lZGlhdG9yXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvLyBSZWZlcmVuY2VzXHJcbiAgICAgICAgd2luZG93U2l6ZVByb3h5OiBudWxsLFxyXG5cclxuICAgICAgICAvLyBOb3RpZmljYXRpb25zIHRoaXMgbWVkaWF0b3IgaXMgaW50ZXJlc3RlZCBpblxyXG4gICAgICAgIGxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsb3QuQXBwQ29uc3RhbnRzLldJTkRPV19SRVNJWkVELFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbG90LkFwcENvbnN0YW50cy5BU1NFVF9MT0FEX0NPTVBMRVRFXHJcbiAgICAgICAgICAgICAgICAgICAgXTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvblJlZ2lzdGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Vmlld0NvbXBvbmVudCggbmV3IHNsb3Qudmlldy5jb21wb25lbnQuQkcoKSApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy53aW5kb3dTaXplUHJveHkgPSB0aGlzLmZhY2FkZS5yZXRyaWV2ZVByb3h5KHNsb3QubW9kZWwucHJveHkuV2luZG93U2l6ZVByb3h5Lk5BTUUpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIEhhbmRsZSBub3RpZmljYXRpb25zIGZyb20gb3RoZXIgUHVyZU1WQyBhY3RvcnNcclxuICAgICAgICBoYW5kbGVOb3RpZmljYXRpb246IGZ1bmN0aW9uIChub3RlKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoIG5vdGUuZ2V0TmFtZSgpICkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBzbG90LkFwcENvbnN0YW50cy5XSU5ET1dfUkVTSVpFRDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQuaGFuZGxlUmVzaXplKG5vdGUuZ2V0Qm9keSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2Ugc2xvdC5BcHBDb25zdGFudHMuQVNTRVRfTE9BRF9DT01QTEVURTpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQuaW5pdCh0aGlzLndpbmRvd1NpemVQcm94eS53aW5kb3dTaXplVk8pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdCR01lZGlhdG9yJ1xyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgUGFuZWxNZWRpYXRvclxyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3Qudmlldy5tZWRpYXRvci5QYW5lbE1lZGlhdG9yJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuTWVkaWF0b3JcclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIC8vIFJlZmVyZW5jZXNcclxuICAgICAgICB3aW5kb3dTaXplUHJveHk6IG51bGwsXHJcbiAgICAgICAgY29uZmlnUHJveHk6IG51bGwsXHJcbiAgICAgICAgc2VydmVyUHJveHk6IG51bGwsXHJcblxyXG4gICAgICAgIC8vIE5vdGlmaWNhdGlvbnMgdGhpcyBtZWRpYXRvciBpcyBpbnRlcmVzdGVkIGluIFxyXG4gICAgICAgIGxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgIHNsb3QuQXBwQ29uc3RhbnRzLldJTkRPV19SRVNJWkVELFxyXG4gICAgICAgICAgICAgICAgc2xvdC5BcHBDb25zdGFudHMuQVNTRVRfTE9BRF9DT01QTEVURSxcclxuICAgICAgICAgICAgICAgIHNsb3QuQXBwQ29uc3RhbnRzLlNQSU5fRU5ELFxyXG4gICAgICAgICAgICAgICAgc2xvdC5BcHBDb25zdGFudHMuU0VSVkVSX0lOSVRcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvblJlZ2lzdGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Vmlld0NvbXBvbmVudChuZXcgc2xvdC52aWV3LmNvbXBvbmVudC5QYW5lbCgpKTtcclxuICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LnN0YWdlLm9uKFxyXG4gICAgICAgICAgICAgICAgc2xvdC52aWV3LmV2ZW50LlZpZXdFdmVudHMuU1BJTl9DTElDSyxcclxuICAgICAgICAgICAgICAgIHRoaXMub25TcGluQ2xpY2suYmluZCh0aGlzKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQuc3RhZ2Uub24oXHJcbiAgICAgICAgICAgICAgICBzbG90LnZpZXcuZXZlbnQuVmlld0V2ZW50cy5CRVRfQ0xJQ0ssXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQmV0VXBkYXRlLmJpbmQodGhpcylcclxuICAgICAgICAgICAgKVxyXG5cclxuICAgICAgICAgICAgdGhpcy53aW5kb3dTaXplUHJveHkgPSB0aGlzLmZhY2FkZS5yZXRyaWV2ZVByb3h5KHNsb3QubW9kZWwucHJveHkuV2luZG93U2l6ZVByb3h5Lk5BTUUpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZ1Byb3h5ID0gdGhpcy5mYWNhZGUucmV0cmlldmVQcm94eShzbG90Lm1vZGVsLnByb3h5LkNvbmZpZ1Byb3h5Lk5BTUUpO1xyXG4gICAgICAgICAgICB0aGlzLnNlcnZlclByb3h5ID0gdGhpcy5mYWNhZGUucmV0cmlldmVQcm94eShzbG90Lm1vZGVsLnByb3h5LlNlcnZlclByb3h5Lk5BTUUpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uU3BpbkNsaWNrOiBmdW5jdGlvbihiZXRBbW91bnQpe1xyXG4gICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQudXBkYXRlQmFsYW5jZSh0aGlzLnNlcnZlclByb3h5LnJlc3VsdFZPLmJhbGFuY2UgLSBiZXRBbW91bnQpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oc2xvdC5BcHBDb25zdGFudHMuU1BJTiwgYmV0QW1vdW50KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvbkJldFVwZGF0ZTogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKHNsb3QuQXBwQ29uc3RhbnRzLkJFVF9VUERBVEVEKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBIYW5kbGUgbm90aWZpY2F0aW9ucyBmcm9tIG90aGVyIFB1cmVNVkMgYWN0b3JzXHJcbiAgICAgICAgaGFuZGxlTm90aWZpY2F0aW9uOiBmdW5jdGlvbiAobm90ZSkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKCBub3RlLmdldE5hbWUoKSApIHtcclxuICAgICAgICAgICAgICAgIGNhc2Ugc2xvdC5BcHBDb25zdGFudHMuV0lORE9XX1JFU0laRUQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LmhhbmRsZVJlc2l6ZShub3RlLmdldEJvZHkoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHNsb3QuQXBwQ29uc3RhbnRzLkFTU0VUX0xPQURfQ09NUExFVEU6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LmluaXQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhbWVDb25maWdWTzogdGhpcy5jb25maWdQcm94eS5nYW1lQ29uZmlnVk8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aUNvbmZpZ1ZPOiB0aGlzLmNvbmZpZ1Byb3h5LnVpQ29uZmlnVk8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dTaXplVk86IHRoaXMud2luZG93U2l6ZVByb3h5LndpbmRvd1NpemVWT1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2Ugc2xvdC5BcHBDb25zdGFudHMuU0VSVkVSX0lOSVQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LmVuYWJsZUJldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld0NvbXBvbmVudC5lbmFibGVTcGluKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LnVwZGF0ZUJhbGFuY2UodGhpcy5zZXJ2ZXJQcm94eS5yZXN1bHRWTy5iYWxhbmNlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2Ugc2xvdC5BcHBDb25zdGFudHMuU1BJTl9FTkQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdFZPID0gbm90ZS5nZXRCb2R5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LmVuYWJsZUJldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld0NvbXBvbmVudC5lbmFibGVTcGluKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LnVwZGF0ZUJhbGFuY2UodGhpcy5zZXJ2ZXJQcm94eS5yZXN1bHRWTy5iYWxhbmNlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQudXBkYXRlV2luKHRoaXMuc2VydmVyUHJveHkucmVzdWx0Vk8udG90YWxXaW4pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdQYW5lbE1lZGlhdG9yJ1xyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgUHJlbG9hZGVyTWVkaWF0b3JcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LnZpZXcubWVkaWF0b3IuUHJlbG9hZGVyTWVkaWF0b3InLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5NZWRpYXRvclxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLy8gUmVmZXJlbmNlc1xyXG4gICAgICAgIHdpbmRvd1NpemVQcm94eTogbnVsbCxcclxuXHJcbiAgICAgICAgLy8gTm90aWZpY2F0aW9ucyB0aGlzIG1lZGlhdG9yIGlzIGludGVyZXN0ZWQgaW4gXHJcbiAgICAgICAgbGlzdE5vdGlmaWNhdGlvbkludGVyZXN0czogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAgc2xvdC5BcHBDb25zdGFudHMuQVNTRVRfTE9BRF9CRUdJTixcclxuICAgICAgICAgICAgICAgIHNsb3QuQXBwQ29uc3RhbnRzLkFTU0VUX0xPQURfQ09NUExFVEVcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvblJlZ2lzdGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Vmlld0NvbXBvbmVudChuZXcgc2xvdC52aWV3LmNvbXBvbmVudC5QcmVsb2FkZXIoKSk7XHJcbiAgICAgICAgICAgIHRoaXMud2luZG93U2l6ZVByb3h5ID0gdGhpcy5mYWNhZGUucmV0cmlldmVQcm94eShzbG90Lm1vZGVsLnByb3h5LldpbmRvd1NpemVQcm94eS5OQU1FKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBIYW5kbGUgbm90aWZpY2F0aW9ucyBmcm9tIG90aGVyIFB1cmVNVkMgYWN0b3JzXHJcbiAgICAgICAgaGFuZGxlTm90aWZpY2F0aW9uOiBmdW5jdGlvbiAobm90ZSkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKCBub3RlLmdldE5hbWUoKSApIHtcclxuICAgICAgICAgICAgICAgIGNhc2Ugc2xvdC5BcHBDb25zdGFudHMuQVNTRVRfTE9BRF9DT01QTEVURTpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBzbG90LkFwcENvbnN0YW50cy5BU1NFVF9MT0FEX0JFR0lOOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld0NvbXBvbmVudC5pbml0KHRoaXMud2luZG93U2l6ZVByb3h5LndpbmRvd1NpemVWTyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogJ1ByZWxvYWRlck1lZGlhdG9yJ1xyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgUmVlbENvbnRhaW5lck1lZGlhdG9yXHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC52aWV3Lm1lZGlhdG9yLlJlZWxDb250YWluZXJNZWRpYXRvcicsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLk1lZGlhdG9yXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvLyBSZWZlcmVuY2VzXHJcbiAgICAgICAgd2luZG93U2l6ZVByb3h5OiBudWxsLFxyXG4gICAgICAgIGNvbmZpZ1Byb3h5OiBudWxsLFxyXG4gICAgICAgIHNlcnZlclByb3h5OiBudWxsLFxyXG5cclxuICAgICAgICAvLyBBZGRpdGlvbmFsIHZpZXdzXHJcbiAgICAgICAgd2luTGluZXNWaWV3OiBudWxsLFxyXG5cclxuICAgICAgICAvLyBOb3RpZmljYXRpb25zIHRoaXMgbWVkaWF0b3IgaXMgaW50ZXJlc3RlZCBpbiBcclxuICAgICAgICBsaXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICBzbG90LkFwcENvbnN0YW50cy5XSU5ET1dfUkVTSVpFRCxcclxuICAgICAgICAgICAgICAgIHNsb3QuQXBwQ29uc3RhbnRzLkFTU0VUX0xPQURfQ09NUExFVEUsXHJcbiAgICAgICAgICAgICAgICBzbG90LkFwcENvbnN0YW50cy5TUElOLFxyXG4gICAgICAgICAgICAgICAgc2xvdC5BcHBDb25zdGFudHMuU1BJTl9SRVNVTFQsXHJcbiAgICAgICAgICAgICAgICBzbG90LkFwcENvbnN0YW50cy5XSU5fQU5OT1VOQ0VNRU5ULFxyXG4gICAgICAgICAgICAgICAgc2xvdC5BcHBDb25zdGFudHMuQ0xFQVJfV0lOX0FOTk9VTkNFTUVOVCxcclxuICAgICAgICAgICAgICAgIHNsb3QuQXBwQ29uc3RhbnRzLlNFUlZFUl9JTklUXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25SZWdpc3RlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFZpZXdDb21wb25lbnQobmV3IHNsb3Qudmlldy5jb21wb25lbnQuUmVlbENvbnRhaW5lcigpKTtcclxuICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LnN0YWdlLm9uKFxyXG4gICAgICAgICAgICAgICAgc2xvdC52aWV3LmV2ZW50LlZpZXdFdmVudHMuUkVFTF9TUElOX0VORCxcclxuICAgICAgICAgICAgICAgIHRoaXMub25SZWVsU3BpbkVuZC5iaW5kKHRoaXMpXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLndpbkxpbmVzVmlldyA9IG5ldyBzbG90LnZpZXcuY29tcG9uZW50LldpbkxpbmVzKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLndpbmRvd1NpemVQcm94eSA9IHRoaXMuZmFjYWRlLnJldHJpZXZlUHJveHkoc2xvdC5tb2RlbC5wcm94eS5XaW5kb3dTaXplUHJveHkuTkFNRSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlnUHJveHkgPSB0aGlzLmZhY2FkZS5yZXRyaWV2ZVByb3h5KHNsb3QubW9kZWwucHJveHkuQ29uZmlnUHJveHkuTkFNRSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VydmVyUHJveHkgPSB0aGlzLmZhY2FkZS5yZXRyaWV2ZVByb3h5KHNsb3QubW9kZWwucHJveHkuU2VydmVyUHJveHkuTkFNRSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25SZWVsU3BpbkVuZDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKHNsb3QuQXBwQ29uc3RhbnRzLlNQSU5fRU5EKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBIYW5kbGUgbm90aWZpY2F0aW9ucyBmcm9tIG90aGVyIFB1cmVNVkMgYWN0b3JzXHJcbiAgICAgICAgaGFuZGxlTm90aWZpY2F0aW9uOiBmdW5jdGlvbiAobm90ZSkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKCBub3RlLmdldE5hbWUoKSApIHtcclxuICAgICAgICAgICAgICAgIGNhc2Ugc2xvdC5BcHBDb25zdGFudHMuV0lORE9XX1JFU0laRUQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LmhhbmRsZVJlc2l6ZShub3RlLmdldEJvZHkoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHNsb3QuQXBwQ29uc3RhbnRzLkFTU0VUX0xPQURfQ09NUExFVEU6XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWVDb25maWdWTzogdGhpcy5jb25maWdQcm94eS5nYW1lQ29uZmlnVk8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVpQ29uZmlnVk86IHRoaXMuY29uZmlnUHJveHkudWlDb25maWdWTyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93U2l6ZVZPOiB0aGlzLndpbmRvd1NpemVQcm94eS53aW5kb3dTaXplVk9cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld0NvbXBvbmVudC5pbml0KGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2luTGluZXNWaWV3LmluaXQoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LnN0YWdlLmFkZENoaWxkKHRoaXMud2luTGluZXNWaWV3LnN0YWdlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2Ugc2xvdC5BcHBDb25zdGFudHMuU0VSVkVSX0lOSVQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LnVwZGF0ZVN5bWJvbHNXaXRob3V0U3Bpbih0aGlzLnNlcnZlclByb3h5LnJlc3VsdFZPLmdldFN5bWJvbE1hdHJpeCgpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2Ugc2xvdC5BcHBDb25zdGFudHMuU1BJTjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQuc3BpbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBzbG90LkFwcENvbnN0YW50cy5TUElOX1JFU1VMVDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQuc3RvcEFuZFVwZGF0ZVN5bWJvbHMobm90ZS5nZXRCb2R5KCkuZ2V0U3ltYm9sTWF0cml4KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBzbG90LkFwcENvbnN0YW50cy5XSU5fQU5OT1VOQ0VNRU5UOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2luTGluZXNWaWV3LnNob3dMaW5lKG5vdGUuZ2V0Qm9keSgpLndpbi5saW5lTnVtYmVyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQuc2hvd1dpbkhpZ2hsaWdodChcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWdQcm94eS5nYW1lQ29uZmlnVk8ubGluZXNbbm90ZS5nZXRCb2R5KCkud2luLmxpbmVOdW1iZXJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBub3RlLmdldEJvZHkoKS53aW4ub2FrXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2Ugc2xvdC5BcHBDb25zdGFudHMuQ0xFQVJfV0lOX0FOTk9VTkNFTUVOVDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndpbkxpbmVzVmlldy5oaWRlQWxsTGluZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQuaGlkZVdpbkhpZ2hsaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdSZWVsQ29udGFpbmVyTWVkaWF0b3InXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBTb3VuZFBsYXllck1lZGlhdG9yXHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC52aWV3Lm1lZGlhdG9yLlNvdW5kUGxheWVyTWVkaWF0b3InLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5NZWRpYXRvclxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLy8gUmVmZXJlbmNlc1xyXG4gICAgICAgIHNvdW5kOiBudWxsLFxyXG4gICAgICAgIGNvbmZpZ1Byb3h5OiBudWxsLFxyXG5cclxuICAgICAgICAvLyBOb3RpZmljYXRpb25zIHRoaXMgbWVkaWF0b3IgaXMgaW50ZXJlc3RlZCBpbiBcclxuICAgICAgICBsaXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICBzbG90LkFwcENvbnN0YW50cy5BU1NFVF9MT0FEX0NPTVBMRVRFLFxyXG4gICAgICAgICAgICAgICAgc2xvdC5BcHBDb25zdGFudHMuQkVUX1VQREFURUQsXHJcbiAgICAgICAgICAgICAgICBzbG90LkFwcENvbnN0YW50cy5TUElOLFxyXG4gICAgICAgICAgICAgICAgc2xvdC5BcHBDb25zdGFudHMuV0lOX0FOTk9VTkNFTUVOVFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uUmVnaXN0ZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy90aGlzLnNldFZpZXdDb21wb25lbnQoIC4uLiApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jb25maWdQcm94eSA9IHRoaXMuZmFjYWRlLnJldHJpZXZlUHJveHkoc2xvdC5tb2RlbC5wcm94eS5Db25maWdQcm94eS5OQU1FKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBIYW5kbGUgbm90aWZpY2F0aW9ucyBmcm9tIG90aGVyIFB1cmVNVkMgYWN0b3JzXHJcbiAgICAgICAgaGFuZGxlTm90aWZpY2F0aW9uOiBmdW5jdGlvbiAobm90ZSkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKCBub3RlLmdldE5hbWUoKSApIHtcclxuICAgICAgICAgICAgICAgIGNhc2Ugc2xvdC5BcHBDb25zdGFudHMuQVNTRVRfTE9BRF9DT01QTEVURTpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdW5kID0gbm90ZS5nZXRCb2R5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHNsb3QuQXBwQ29uc3RhbnRzLkJFVF9VUERBVEVEOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc291bmQucGxheShcImJldFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2Ugc2xvdC5BcHBDb25zdGFudHMuU1BJTjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdW5kLnBsYXkoXCJzcGluXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBzbG90LkFwcENvbnN0YW50cy5XSU5fQU5OT1VOQ0VNRU5UOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFub3RlLmdldEJvZHkoKS5pc1JlcGVhdGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgd2luU3ltYm9sID0gbm90ZS5nZXRCb2R5KCkud2luLnN5bWJvbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnUHJveHkuZ2FtZUNvbmZpZ1ZPLmlzUm95YWxTeW1ib2wod2luU3ltYm9sKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3VuZC5wbGF5KFwid2luX3JveWFsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3VuZC5wbGF5KFwid2luX3NcIiArIHdpblN5bWJvbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogJ1NvdW5kUGxheWVyTWVkaWF0b3InXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBXaW5Bbm5vdW5jZU1lZGlhdG9yXHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC52aWV3Lm1lZGlhdG9yLldpbkFubm91bmNlTWVkaWF0b3InLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5NZWRpYXRvclxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLy8gUmVmZXJlbmNlc1xyXG4gICAgICAgIHNlcnZlclByb3h5OiBudWxsLFxyXG4gICAgICAgIGNvbmZpZ1Byb3h5OiBudWxsLFxyXG5cclxuICAgICAgICBjdXJyZW50V2luSW5kZXg6IG51bGwsXHJcbiAgICAgICAgaXNBbm5vdW5jaW5nOiBudWxsLFxyXG4gICAgICAgIHdpbkFubm91bmNlRGVsYXk6IG51bGwsXHJcbiAgICAgICAgcmVwZWF0Q291bnQ6IG51bGwsXHJcbiAgICAgICAgaW50ZXJ2YWxJRDogbnVsbCxcclxuXHJcbiAgICAgICAgLy8gTm90aWZpY2F0aW9ucyB0aGlzIG1lZGlhdG9yIGlzIGludGVyZXN0ZWQgaW4gXHJcbiAgICAgICAgbGlzdE5vdGlmaWNhdGlvbkludGVyZXN0czogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAgc2xvdC5BcHBDb25zdGFudHMuU1RBUlRfV0lOX0FOTk9VTkNFTUVOVFMsXHJcbiAgICAgICAgICAgICAgICBzbG90LkFwcENvbnN0YW50cy5TVE9QX1dJTl9BTk5PVU5DRU1FTlRTXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25SZWdpc3RlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlcnZlclByb3h5ID0gdGhpcy5mYWNhZGUucmV0cmlldmVQcm94eShzbG90Lm1vZGVsLnByb3h5LlNlcnZlclByb3h5Lk5BTUUpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZ1Byb3h5ID0gdGhpcy5mYWNhZGUucmV0cmlldmVQcm94eShzbG90Lm1vZGVsLnByb3h5LkNvbmZpZ1Byb3h5Lk5BTUUpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFubm91bmNlV2luOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZih0aGlzLnJlcGVhdENvdW50ID49IHRoaXMuY29uZmlnUHJveHkudWlDb25maWdWTy5yZXBlYXRXaW5zKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BBbm5vdW5jZW1lbnRJbnRlcnZhbCgpO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmlzQW5ub3VuY2luZyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oXHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdC5BcHBDb25zdGFudHMuV0lOX0FOTk9VTkNFTUVOVCxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbjogdGhpcy5zZXJ2ZXJQcm94eS5yZXN1bHRWTy53aW5zW3RoaXMuY3VycmVudFdpbkluZGV4XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNSZXBlYXRpbmc6IHRoaXMucmVwZWF0Q291bnQgPiAwXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuY3VycmVudFdpbkluZGV4IDwgdGhpcy5zZXJ2ZXJQcm94eS5yZXN1bHRWTy53aW5zLmxlbmd0aCAtIDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFdpbkluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRXaW5JbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXBlYXRDb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuaW50ZXJ2YWxJRCA9IHNldFRpbWVvdXQoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbm5vdW5jZVdpbi5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnUHJveHkudWlDb25maWdWTy53aW5Bbm5vdW5jZURlbGF5ICogMTAwMFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN0b3BBbm5vdW5jZW1lbnRJbnRlcnZhbDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSUQpO1xyXG4gICAgICAgICAgICB0aGlzLmlzQW5ub3VuY2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oc2xvdC5BcHBDb25zdGFudHMuQ0xFQVJfV0lOX0FOTk9VTkNFTUVOVCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gSGFuZGxlIG5vdGlmaWNhdGlvbnMgZnJvbSBvdGhlciBQdXJlTVZDIGFjdG9yc1xyXG4gICAgICAgIGhhbmRsZU5vdGlmaWNhdGlvbjogZnVuY3Rpb24gKG5vdGUpIHtcclxuICAgICAgICAgICAgc3dpdGNoICggbm90ZS5nZXROYW1lKCkgKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHNsb3QuQXBwQ29uc3RhbnRzLlNUQVJUX1dJTl9BTk5PVU5DRU1FTlRTOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuc2VydmVyUHJveHkucmVzdWx0Vk8ud2lucy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRXaW5JbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNBbm5vdW5jaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXBlYXRDb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYW5ub3VuY2VXaW4oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHNsb3QuQXBwQ29uc3RhbnRzLlNUT1BfV0lOX0FOTk9VTkNFTUVOVFM6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wQW5ub3VuY2VtZW50SW50ZXJ2YWwoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBOQU1FOiAnV2luQW5ub3VuY2VNZWRpYXRvcidcclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2NcclxuICogQGNsYXNzICAgICAgIEFwcFxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBQSVhJIGdsb2JhbCB2YXJpYWJsZXMgKi9cclxudmFyIFBYUm9vdCwgUFhSZW5kZXJlcjtcclxuXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LkFwcCcsXHJcbiAgICAgICAgY29uc3RydWN0b3I6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3RlckNvbW1hbmQoc2xvdC5BcHBDb25zdGFudHMuU1RBUlRVUCwgc2xvdC5jb250cm9sbGVyLmNvbW1hbmQuU3RhcnR1cENvbW1hbmQpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5zZW5kTm90aWZpY2F0aW9uKHNsb3QuQXBwQ29uc3RhbnRzLlNUQVJUVVApO1xyXG5cclxuICAgICAgICAgICAgdmFyIGxvYWRlclByb3h5ID0gdGhpcy5mYWNhZGUucmV0cmlldmVQcm94eShzbG90Lm1vZGVsLnByb3h5LkxvYWRlclByb3h5Lk5BTUUpO1xyXG4gICAgICAgICAgICBsb2FkZXJQcm94eS5sb2FkQXNzZXRzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgU1RBUlRVUDogJ3N0YXJ0dXAnLFxyXG4gICAgICAgIGZhY2FkZTogcHVyZW12Yy5GYWNhZGUuZ2V0SW5zdGFuY2UoIHNsb3QuQXBwQ29uc3RhbnRzLkNPUkVfTkFNRSApXHJcbiAgICB9XHJcbik7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
