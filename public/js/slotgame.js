/*Generated on:Sun Aug 28 2016 04:26:43 GMT+1000 (AUS Eastern Standard Time)*//**
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
        STARTUP:                "AppConstants_startup",

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
        balance: 997.568,
        totalWin: 0,
        numWins: 0,
        wins: null,

        update: function(result){
            console.log("Result: ")
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
        repeatWinAnnounces: 2
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
        width: 0,
        height: 0,
        orientation: "",

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
 * @class       Utils
 */
puremvc.define(
    {
        name: 'slot.model.lib.Utils'
    },

    // INSTANCE MEMBERS
    {},

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
        }
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
            PXRenderer.backgroundColor = 0x66FF99;
            PXRenderer.view.style.display = "block";

            document.body.appendChild(PXRenderer.view);

            // Render loop
            window.renderLoop = function(){
                PXRenderer.render(PXRoot);
                requestAnimationFrame(window.renderLoop);
            };
            window.renderLoop();
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
            var bgSize = slot.model.lib.Utils.getSizeToFillScreen(
                {
                    width:this.bg.width,
                    height: this.bg.height
                },
                {
                    width:windowSizeVO.width,
                    height: windowSizeVO.height
                }
            );

            this.bg.width = bgSize.width;
            this.bg.height = bgSize.height;

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

        init: function (data) {
            this.currency = data.uiConfigVO.currency;
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
            this.txtWin.style = {fontSize: 24, align: 'center'};
            this.txtWin.x = 12;
            this.txtWin.y = 42;
            this.win.addChild(this.txtWin);

            this.stage.addChild(this.win);
            // Win component <==

            // Balance component ==>
            this.balance = new PIXI.Container();
            this.balance.addChild(new PIXI.Sprite(resources.balance.texture));

            this.txtBalance = new PIXI.Text();
            this.txtBalance.style = {fontSize: 24, align: 'center'};
            this.txtBalance.x = 12;
            this.txtBalance.y = 42;
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
            this.txtBet.style = {fontSize: 24, align: 'center'};
            this.txtBet.x = betSprite.x + 7;
            this.txtBet.y = betSprite.y + 40;
            this.bet.addChild(this.txtBet);

            this.stage.addChild(this.bet);
            // <=== Bet component

            // Buttons
            this.btnSpin.interactive = true;
            this.btnSpin.on("click", this.onSpinClick.bind(this));
            this.btnBetMinus.interactive = true;
            this.btnBetMinus.on("click", this.onBetMinusClick.bind(this));
            this.btnBetPlus.interactive = true;
            this.btnBetPlus.on("click", this.onBetPlusClick.bind(this));

            // Initial values
            this.updateBet();
        },

        setupView: function(windowSizeVO){
            this.spin.x = windowSizeVO.width - this.spin.width;
            this.spin.y = windowSizeVO.height - this.spin.height;

            this.win.x = (windowSizeVO.width - this.win.width)/2;
            this.win.y = 0;

            this.balance.x = (windowSizeVO.width - this.balance.width)/2;
            this.balance.y = windowSizeVO.height - this.balance.height;

            this.bet.x = 0;
            this.bet.y = windowSizeVO.height - this.bet.height;
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
            if(this.currentDenomination == this.denominations.length - 1){
                this.disableBetPlus();
            }else{
                this.enableBetPlus();
            }

            if(this.currentDenomination == 0){
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
            bgRect.beginFill(0x2B6F1A);
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

        init: function (data) {
            this.numReels = data.gameConfigVO.numReels;
            this.numRows = data.gameConfigVO.numRows;

            this.minSpinDuration = data.uiConfigVO.minSpinDuration;
            this.reelSpinDelay = data.uiConfigVO.reelSpinDelay;

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
            this.bgRect.beginFill(0xFFFFFF);
            this.bgRect.drawRoundedRect(0, 0, this.width, this.height, 15);
            this.bgRect.alpha = 0.6;
            this.stage.addChild(this.bgRect);

            this.createReels(data);

            this.stage.y += 50;

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

        createMaskObject: function(x, y, w, h){
            // Rounded rectangle on top of each reel for mask
            var mask = new PIXI.Graphics();
            mask.beginFill(0x2B6F1A);
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

        visibleLine: null,

        init: function (data) {
            this.addLines(data);
            this.hideAllLines();
        },

        addLines: function(data){
            this.lines = [];

            var linePoints = data.uiConfigVO.linePoints;
            for(var i = 0; i < linePoints.length; i++){
                var line = linePoints[i];
                var lineGraphic = new PIXI.Graphics();
                lineGraphic.lineStyle(5, 0xA81C1D);
                lineGraphic.moveTo(line[0][0], line[0][1]);
                for(var j = 1; j < line.length; j++){
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
            for(var i = 0; i < this.lines.length; i++){
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
                    }
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
            if(this.repeatCount >= this.configProxy.uiConfigVO.repeatWinAnnounces) {
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
            clearInterval(this.intervalID)
            this.isAnnouncing = false;
            this.sendNotification(slot.AppConstants.CLEAR_WIN_ANNOUNCEMENT);
        },

        // Handle notifications from other PureMVC actors
        handleNotification: function (note) {
            switch ( note.getName() ) {
                case slot.AppConstants.START_WIN_ANNOUNCEMENTS:
                    if(this.serverProxy.resultVO.wins.length > 0){
                        clearInterval(this.intervalID)
                        this.currentWin = 0;
                        this.isAnnouncing = true;
                        this.repeatCount = 0;
                        this.announceWin();
                        break;
                    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFwcENvbnN0YW50cy5qcyIsImVudW0vT1JJRU5UQVRJT04uanMiLCJwcm94eS9Db25maWdQcm94eS5qcyIsInByb3h5L0xvYWRlclByb3h5LmpzIiwicHJveHkvU2VydmVyUHJveHkuanMiLCJwcm94eS9XaW5kb3dTaXplUHJveHkuanMiLCJ2by9HYW1lQ29uZmlnVk8uanMiLCJ2by9SZXN1bHRWTy5qcyIsInZvL1VJQ29uZmlnVk8uanMiLCJ2by9XaW5kb3dTaXplVk8uanMiLCJsaWIvVXRpbHMuanMiLCJwcm94eS9zZXJ2aWNlL1NlcnZlclNlcnZpY2UuanMiLCJjb21tYW5kL1ByZXBDb250cm9sbGVyQ29tbWFuZC5qcyIsImNvbW1hbmQvUHJlcE1vZGVsQ29tbWFuZC5qcyIsImNvbW1hbmQvUHJlcFBpeGlDb21tYW5kLmpzIiwiY29tbWFuZC9QcmVwVmlld0NvbW1hbmQuanMiLCJjb21tYW5kL1NwaW5Db21tYW5kLmpzIiwiY29tbWFuZC9TcGluRW5kQ29tbWFuZC5qcyIsImNvbW1hbmQvU3RhcnR1cENvbW1hbmQuanMiLCJjb21tYW5kL1dpbmRvd1Jlc2l6ZUNvbW1hbmQuanMiLCJjb21wb25lbnQvQkcuanMiLCJjb21wb25lbnQvUGFuZWwuanMiLCJjb21wb25lbnQvUmVlbC5qcyIsImNvbXBvbmVudC9SZWVsQ2VsbC5qcyIsImNvbXBvbmVudC9SZWVsQ29udGFpbmVyLmpzIiwiY29tcG9uZW50L1dpbkxpbmVzLmpzIiwiZXZlbnQvVmlld0V2ZW50cy5qcyIsIm1lZGlhdG9yL0JHTWVkaWF0b3IuanMiLCJtZWRpYXRvci9QYW5lbE1lZGlhdG9yLmpzIiwibWVkaWF0b3IvUmVlbENvbnRhaW5lck1lZGlhdG9yLmpzIiwibWVkaWF0b3IvV2luQW5ub3VuY2VNZWRpYXRvci5qcyIsIkFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOEVBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InNsb3RnYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2NcclxuICogQGNsYXNzICAgICAgIEFwcENvbnN0YW50c1xyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogXCJzbG90LkFwcENvbnN0YW50c1wiXHJcbiAgICB9LFxyXG5cclxuICAgIHt9LFxyXG5cclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLy8gVGhlIG11bHRpdG9uIGtleSBmb3IgdGhpcyBhcHAncyBzaW5nbGUgY29yZVxyXG4gICAgICAgIENPUkVfTkFNRTogICAgICAgICAgICAgICdTbG90R2FtZScsXHJcblxyXG4gICAgICAgIC8vIE5vdGlmaWNhdGlvbnNcclxuICAgICAgICBTVEFSVFVQOiAgICAgICAgICAgICAgICBcIkFwcENvbnN0YW50c19zdGFydHVwXCIsXHJcblxyXG4gICAgICAgIC8vID09PVxyXG4gICAgICAgIEFTU0VUU19MT0FERUQ6ICAgICAgICAgICAgICBcIkFwcENvbnN0YW50c19hc3NldHNfbG9hZGVkXCIsXHJcbiAgICAgICAgV0lORE9XX1JFU0laRUQ6ICAgICAgICAgICAgIFwiQXBwQ29uc3RhbnRzX3dpbmRvd19yZXNpemVkXCIsXHJcbiAgICAgICAgU1BJTjogICAgICAgICAgICAgICAgICAgICAgIFwiQXBwQ29uc3RhbnRzX3NwaW5cIixcclxuICAgICAgICBTUElOX1JFU1VMVDogICAgICAgICAgICAgICAgXCJBcHBDb25zdGFudHNfc3Bpbl9yZXN1bHRcIixcclxuICAgICAgICBTUElOX0VORDogICAgICAgICAgICAgICAgICAgXCJBcHBDb25zdGFudHNfc3Bpbl9lbmRcIixcclxuXHJcbiAgICAgICAgU1RBUlRfV0lOX0FOTk9VTkNFTUVOVFM6ICAgIFwiQXBwQ29uc3RhbnRzX3N0YXJ0X3dpbl9hbm5vdW5jZW1lbnRzXCIsXHJcbiAgICAgICAgU1RPUF9XSU5fQU5OT1VOQ0VNRU5UUzogICAgIFwiQXBwQ29uc3RhbnRzX3N0b3Bfd2luX2Fubm91bmNlbWVudHNcIixcclxuICAgICAgICBXSU5fQU5OT1VOQ0VNRU5UOiAgICAgICAgICAgXCJBcHBDb25zdGFudHNfd2luX2Fubm91bmNlbWVudFwiLFxyXG4gICAgICAgIENMRUFSX1dJTl9BTk5PVU5DRU1FTlQ6ICAgICBcIkFwcENvbnN0YW50c19jbGVhcl93aW5fYW5ub3VuY2VtZW50XCJcclxuICAgIH1cclxuKTsiLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgT1JJRU5UQVRJT05cclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90Lm1vZGVsLmVudW0uT1JJRU5UQVRJT04nXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHt9LFxyXG5cclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogXCJPUklFTlRBVElPTlwiLFxyXG4gICAgICAgIExBTkRTQ0FQRTogXCJsYW5kc2NhcGVcIixcclxuICAgICAgICBQT1JUUkFJVDogXCJwb3J0cmFpdFwiXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBDb25maWdQcm94eVxyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3QubW9kZWwucHJveHkuQ29uZmlnUHJveHknLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5Qcm94eVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLy8gRGF0YVxyXG4gICAgICAgIGdhbWVDb25maWdWTzogbnVsbCxcclxuICAgICAgICB1aUNvbmZpZ1ZPOiBudWxsLFxyXG5cclxuICAgICAgICBvblJlZ2lzdGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUNvbmZpZ1ZPID0gbmV3IHNsb3QubW9kZWwudm8uR2FtZUNvbmZpZ1ZPKCk7XHJcbiAgICAgICAgICAgIHRoaXMudWlDb25maWdWTyA9IG5ldyBzbG90Lm1vZGVsLnZvLlVJQ29uZmlnVk8oKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogXCJDb25maWdQcm94eVwiXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBMb2FkZXJQcm94eVxyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3QubW9kZWwucHJveHkuTG9hZGVyUHJveHknLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5Qcm94eVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgb25SZWdpc3RlcjogZnVuY3Rpb24oKXtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBsb2FkQXNzZXRzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGxvYWRlciA9IG5ldyBQSVhJLmxvYWRlcnMuTG9hZGVyKFwiXCIsMyk7XHJcbiAgICAgICAgICAgIGxvYWRlci5hZGQoJ2JnJywgJ2Fzc2V0cy9iYWNrZ3JvdW5kLmpwZycpO1xyXG5cclxuICAgICAgICAgICAgbG9hZGVyLmFkZCgnczEnLCAnYXNzZXRzL3Nub3dmbGFrZS5wbmcnKTtcclxuICAgICAgICAgICAgbG9hZGVyLmFkZCgnczInLCAnYXNzZXRzL3N1bi5wbmcnKTtcclxuICAgICAgICAgICAgbG9hZGVyLmFkZCgnczMnLCAnYXNzZXRzL3NhbmRnbGFzcy5wbmcnKTtcclxuICAgICAgICAgICAgbG9hZGVyLmFkZCgnczQnLCAnYXNzZXRzL3ZpY3RvcnkucG5nJyk7XHJcbiAgICAgICAgICAgIGxvYWRlci5hZGQoJ3M1JywgJ2Fzc2V0cy9hLnBuZycpO1xyXG4gICAgICAgICAgICBsb2FkZXIuYWRkKCdzNicsICdhc3NldHMvay5wbmcnKTtcclxuICAgICAgICAgICAgbG9hZGVyLmFkZCgnczcnLCAnYXNzZXRzL3EucG5nJyk7XHJcbiAgICAgICAgICAgIGxvYWRlci5hZGQoJ3M4JywgJ2Fzc2V0cy9qLnBuZycpO1xyXG5cclxuICAgICAgICAgICAgbG9hZGVyLmFkZCgnc3BpbicsICdhc3NldHMvc3Bpbi5wbmcnKTtcclxuICAgICAgICAgICAgbG9hZGVyLmFkZCgnc3Bpbl9kaXNhYmxlZCcsICdhc3NldHMvc3Bpbl9kaXNhYmxlZC5wbmcnKTtcclxuXHJcbiAgICAgICAgICAgIGxvYWRlci5hZGQoJ3dpbicsICdhc3NldHMvd2luLnBuZycpO1xyXG4gICAgICAgICAgICBsb2FkZXIuYWRkKCdiYWxhbmNlJywgJ2Fzc2V0cy9iYWxhbmNlLnBuZycpO1xyXG5cclxuICAgICAgICAgICAgbG9hZGVyLmFkZCgnYmV0JywgJ2Fzc2V0cy9iZXQucG5nJyk7XHJcbiAgICAgICAgICAgIGxvYWRlci5hZGQoJ2JldF9taW51cycsICdhc3NldHMvYmV0X21pbnVzLnBuZycpO1xyXG4gICAgICAgICAgICBsb2FkZXIuYWRkKCdiZXRfbWludXNfZGlzYWJsZWQnLCAnYXNzZXRzL2JldF9taW51c19kaXNhYmxlZC5wbmcnKTtcclxuICAgICAgICAgICAgbG9hZGVyLmFkZCgnYmV0X3BsdXMnLCAnYXNzZXRzL2JldF9wbHVzLnBuZycpO1xyXG4gICAgICAgICAgICBsb2FkZXIuYWRkKCdiZXRfcGx1c19kaXNhYmxlZCcsICdhc3NldHMvYmV0X3BsdXNfZGlzYWJsZWQucG5nJyk7XHJcblxyXG4gICAgICAgICAgICBsb2FkZXIub24oXCJwcm9ncmVzc1wiLCB0aGlzLm9uTG9hZFByb2dyZXNzLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICBsb2FkZXIubG9hZCh0aGlzLm9uTG9hZENvbXBsZXRlLmJpbmQodGhpcykpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uTG9hZENvbXBsZXRlOiBmdW5jdGlvbihsb2FkZXIsIHJlc291cmNlcyl7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YShyZXNvdXJjZXMpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oc2xvdC5BcHBDb25zdGFudHMuQVNTRVRTX0xPQURFRCwgcmVzb3VyY2VzKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvbkxvYWRQcm9ncmVzczogZnVuY3Rpb24obG9hZGVyLCBmaWxlKXtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogXCJMb2FkZXJQcm94eVwiXHJcbiAgICB9XHJcbik7IiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2NcclxuICogQGNsYXNzICAgICAgIFNlcnZlclByb3h5XHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC5tb2RlbC5wcm94eS5TZXJ2ZXJQcm94eScsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLlByb3h5XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvLyBEYXRhXHJcbiAgICAgICAgcmVzdWx0Vk86IG51bGwsXHJcblxyXG4gICAgICAgIC8vIFNlcnZpY2VzXHJcbiAgICAgICAgc2VydmVyOiBudWxsLFxyXG5cclxuICAgICAgICBvblJlZ2lzdGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzdWx0Vk8gPSBuZXcgc2xvdC5tb2RlbC52by5SZXN1bHRWTygpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXJ2ZXIgPSBuZXcgc2xvdC5tb2RlbC5wcm94eS5zZXJ2aWNlLlNlcnZlclNlcnZpY2UoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzcGluOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXJ2ZXIubG9hZFNwaW5SZXN1bHQodGhpcy5vblJlc3VsdC5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvblJlc3VsdDogZnVuY3Rpb24ocmVzdWx0KXtcclxuICAgICAgICAgICAgdGhpcy5yZXN1bHRWTy51cGRhdGUocmVzdWx0KTtcclxuICAgICAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKHNsb3QuQXBwQ29uc3RhbnRzLlNQSU5fUkVTVUxULCB0aGlzLnJlc3VsdFZPKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6IFwiU2VydmVyUHJveHlcIlxyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgV2luZG93U2l6ZVByb3h5XHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC5tb2RlbC5wcm94eS5XaW5kb3dTaXplUHJveHknLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5Qcm94eVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLy8gRGF0YVxyXG4gICAgICAgIHdpbmRvd1NpemVWTzogbnVsbCxcclxuXHJcbiAgICAgICAgb25SZWdpc3RlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLndpbmRvd1NpemVWTyA9IG5ldyBzbG90Lm1vZGVsLnZvLldpbmRvd1NpemVWTyh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJPcmllbnRhdGlvbjogXCIgKyB0aGlzLndpbmRvd1NpemVWTy5vcmllbnRhdGlvbik7XHJcblxyXG4gICAgICAgICAgICBpZih3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMub25SZXNpemUuYmluZCh0aGlzKSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYod2luZG93LmF0dGFjaEV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmF0dGFjaEV2ZW50KCdvbnJlc2l6ZScsIHRoaXMub25SZXNpemUuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvblJlc2l6ZTogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy53aW5kb3dTaXplVk8udXBkYXRlKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oc2xvdC5BcHBDb25zdGFudHMuV0lORE9XX1JFU0laRUQsIHRoaXMud2luZG93U2l6ZVZPKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogXCJXaW5kb3dTaXplUHJveHlcIlxyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgR2FtZUNvbmZpZ1ZPXHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC5tb2RlbC52by5HYW1lQ29uZmlnVk8nXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBudW1SZWVsczogNSxcclxuICAgICAgICBudW1Sb3dzOiAzLFxyXG4gICAgICAgIG51bVN5bWJvbHM6IDgsXHJcbiAgICAgICAgcmVlbHM6XHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIFsxLDUsMiwxLDYsNSw4LDUsMSwyLDMsNyw0LDUsOCwxLDQsMywyLDUsNl0sXHJcbiAgICAgICAgICAgICAgICBbNSwxLDYsMyw3LDgsMSwzLDIsNCw2LDgsNSw0LDUsMyw4LDcsNSw0LDEsNyw0LDgsNF0sXHJcbiAgICAgICAgICAgICAgICBbOCw0LDEsMywyLDYsNywyLDMsNCwxLDUsNiw3LDgsMiw1LDQsMywxLDIsNyw2LDcsMSw0LDMsMiw0XSxcclxuICAgICAgICAgICAgICAgIFsxLDcsNCwyLDMsOCw0LDMsMiw1LDYsNywyLDMsNCw1LDgsMSwyLDYsMiw0LDIsNiwzLDcsOCw0LDYsMiwzLDEsMiw1LDYsMyw0XSxcclxuICAgICAgICAgICAgICAgIFs4LDUsMV1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICBwYXl0YWJsZTpcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiczFcIjpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCIzb2FrXCI6IDI1MCxcclxuICAgICAgICAgICAgICAgIFwiNG9ha1wiOiA1MDAsXHJcbiAgICAgICAgICAgICAgICBcIjVvYWtcIjogMTAwMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInMyXCI6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiM29ha1wiOiAyMDAsXHJcbiAgICAgICAgICAgICAgICBcIjRvYWtcIjogNDUwLFxyXG4gICAgICAgICAgICAgICAgXCI1b2FrXCI6IDgwMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInMzXCI6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiM29ha1wiOiAxNTAsXHJcbiAgICAgICAgICAgICAgICBcIjRvYWtcIjogNDAwLFxyXG4gICAgICAgICAgICAgICAgXCI1b2FrXCI6IDcwMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInM0XCI6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiM29ha1wiOiAxMDAsXHJcbiAgICAgICAgICAgICAgICBcIjRvYWtcIjogMzUwLFxyXG4gICAgICAgICAgICAgICAgXCI1b2FrXCI6IDYwMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInM1XCI6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiM29ha1wiOiA5MCxcclxuICAgICAgICAgICAgICAgIFwiNG9ha1wiOiAzMDAsXHJcbiAgICAgICAgICAgICAgICBcIjVvYWtcIjogNzAwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiczZcIjpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCIzb2FrXCI6IDgwLFxyXG4gICAgICAgICAgICAgICAgXCI0b2FrXCI6IDI1MCxcclxuICAgICAgICAgICAgICAgIFwiNW9ha1wiOiA2MDBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJzN1wiOlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcIjNvYWtcIjogNzAsXHJcbiAgICAgICAgICAgICAgICBcIjRvYWtcIjogMjAwLFxyXG4gICAgICAgICAgICAgICAgXCI1b2FrXCI6IDUwMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInM4XCI6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiM29ha1wiOiA2MCxcclxuICAgICAgICAgICAgICAgIFwiNG9ha1wiOiAxMDAsXHJcbiAgICAgICAgICAgICAgICBcIjVvYWtcIjogNDAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlbm9taW5hdGlvbnM6XHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIDAuMjUsIDAuNTAsIDEsIDIsIDUsIDEwXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgZGVmYXVsdERlbm9taW5hdGlvbjogMixcclxuICAgICAgICBsaW5lczpcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgWzEsIDEsIDEsIDEsIDFdLFxyXG4gICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgWzIsIDIsIDIsIDIsIDJdLFxyXG4gICAgICAgICAgICAgICAgWzAsIDEsIDIsIDEsIDBdLFxyXG4gICAgICAgICAgICAgICAgWzIsIDEsIDAsIDEsIDJdXHJcbiAgICAgICAgICAgIF0sXHJcblxyXG4gICAgICAgIC8vIFJldHVybnMgYXJyYXkgd2l0aCBhbGwgcG9zc2libGUgc3ltYm9sc1xyXG4gICAgICAgIGdldFN5bWJvbHM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciBzeW1ib2xzID0gW107XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDE7IGkgPD0gdGhpcy5udW1TeW1ib2xzOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgc3ltYm9scy5wdXNoKFwic1wiICsgaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHN5bWJvbHM7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6IFwiR2FtZUNvbmZpZ1ZPXCJcclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2NcclxuICogQGNsYXNzICAgICAgIFJlc3VsdFZPXHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC5tb2RlbC52by5SZXN1bHRWTydcclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIG1hdHJpeDpcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgWzEsNCw1XSxcclxuICAgICAgICAgICAgICAgIFs1LDYsM10sXHJcbiAgICAgICAgICAgICAgICBbMSwyLDhdLFxyXG4gICAgICAgICAgICAgICAgWzMsNyw2XSxcclxuICAgICAgICAgICAgICAgIFsyLDYsNV1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICBiYWxhbmNlOiA5OTcuNTY4LFxyXG4gICAgICAgIHRvdGFsV2luOiAwLFxyXG4gICAgICAgIG51bVdpbnM6IDAsXHJcbiAgICAgICAgd2luczogbnVsbCxcclxuXHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbihyZXN1bHQpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlc3VsdDogXCIpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIHRoaXMubWF0cml4ID0gcmVzdWx0Lm1hdHJpeDtcclxuICAgICAgICAgICAgdGhpcy5iYWxhbmNlID0gcmVzdWx0LmJhbGFuY2U7XHJcbiAgICAgICAgICAgIHRoaXMudG90YWxXaW4gPSByZXN1bHQudG90YWxXaW47XHJcbiAgICAgICAgICAgIHRoaXMubnVtV2lucyA9IHJlc3VsdC5udW1XaW5zO1xyXG4gICAgICAgICAgICB0aGlzLndpbnMgPSByZXN1bHQud2lucztcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXRTeW1ib2xNYXRyaXg6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1hdHJpeC5tYXAoZnVuY3Rpb24oXywgaW5kZXgsIG1hdHJpeCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWF0cml4W2luZGV4XS5tYXAoZnVuY3Rpb24oc3ltYm9sSUQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInNcIiArIHN5bWJvbElEO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBOQU1FOiBcIlJlc3VsdFZPXCJcclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2NcclxuICogQGNsYXNzICAgICAgIFVJQ29uZmlnVk9cclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90Lm1vZGVsLnZvLlVJQ29uZmlnVk8nXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBzeW1ib2xXaWR0aDogMTMwLFxyXG4gICAgICAgIHN5bWJvbEhlaWdodDogMTMwLFxyXG5cclxuICAgICAgICByZWVsSFNlcGFyYXRvcjogMTAsXHJcbiAgICAgICAgcmVlbFZTZXBhcmF0b3I6IDEwLFxyXG4gICAgICAgIHJlZWxIUGFkZGluZzogMjAsXHJcbiAgICAgICAgcmVlbFZQYWRkaW5nOiAyMCxcclxuXHJcbiAgICAgICAgY3VycmVuY3k6IFwiJFwiLFxyXG5cclxuICAgICAgICByZWVsU3BpbkRlbGF5OiAwLjEsXHJcbiAgICAgICAgbWluU3BpbkR1cmF0aW9uOiAyLFxyXG5cclxuICAgICAgICBsaW5lUG9pbnRzOlxyXG4gICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICBbWzMwLDIyNV0sWzcwMCwyMjVdXSxcclxuICAgICAgICAgICAgICAgIFtbMzAsODVdLFs3MDAsODVdXSxcclxuICAgICAgICAgICAgICAgIFtbMzAsMzY1XSxbNzAwLDM2NV1dLFxyXG4gICAgICAgICAgICAgICAgW1szMCwzMF0sWzM2NSwzNjVdLFs3MDAsMzBdXSxcclxuICAgICAgICAgICAgICAgIFtbMzAsNDIwXSxbMzY1LDg1XSxbNzAwLDQyMF1dLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIHdpbkFubm91bmNlRGVsYXk6IDIsXHJcbiAgICAgICAgcmVwZWF0V2luQW5ub3VuY2VzOiAyXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogXCJVSUNvbmZpZ1ZPXCJcclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2NcclxuICogQGNsYXNzICAgICAgIFdpbmRvd1NpemVWT1xyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3QubW9kZWwudm8uV2luZG93U2l6ZVZPJyxcclxuICAgICAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24odywgaCl7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKHcsIGgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIHdpZHRoOiAwLFxyXG4gICAgICAgIGhlaWdodDogMCxcclxuICAgICAgICBvcmllbnRhdGlvbjogXCJcIixcclxuXHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbih3LCBoKXtcclxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHc7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gaDtcclxuICAgICAgICAgICAgdGhpcy5vcmllbnRhdGlvbiA9IHNsb3QubW9kZWwubGliLlV0aWxzLmdldE9yaWVudGF0aW9uKHcsIGgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBOQU1FOiBcIldpbmRvd1NpemVWT1wiXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBVdGlsc1xyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3QubW9kZWwubGliLlV0aWxzJ1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7fSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6IFwiVXRpbHNcIixcclxuXHJcbiAgICAgICAgZ2V0T3JpZW50YXRpb246IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQpe1xyXG4gICAgICAgICAgICByZXR1cm4gICh3aWR0aCA+IGhlaWdodCkgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbG90Lm1vZGVsLmVudW0uT1JJRU5UQVRJT04uTEFORFNDQVBFOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbG90Lm1vZGVsLmVudW0uT1JJRU5UQVRJT04uUE9SVFJBSVQ7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0U2l6ZVRvRmlsbFNjcmVlbjogZnVuY3Rpb24oY29udGVudCwgc2NyZWVuKXtcclxuICAgICAgICAgICAgaWYoKHNjcmVlbi53aWR0aC9zY3JlZW4uaGVpZ2h0KSA+IChjb250ZW50LndpZHRoL2NvbnRlbnQuaGVpZ2h0KSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBzY3JlZW4ud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGNvbnRlbnQuaGVpZ2h0ICogKHNjcmVlbi53aWR0aC9jb250ZW50LndpZHRoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIHtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogY29udGVudC53aWR0aCAqIChzY3JlZW4uaGVpZ2h0L2NvbnRlbnQuaGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHNjcmVlbi5oZWlnaHRcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBTZXJ2ZXJTZXJ2aWNlXHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC5tb2RlbC5wcm94eS5zZXJ2aWNlLlNlcnZlclNlcnZpY2UnXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBjYWxsYmFjazogbnVsbCxcclxuXHJcbiAgICAgICAgbG9hZFNwaW5SZXN1bHQ6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQodGhpcy5zZW5kU3BpblJlc3VsdC5iaW5kKHRoaXMpLCAxMDAwKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZW5kU3BpblJlc3VsdDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHt9O1xyXG5cclxuICAgICAgICAgICAgcmVzdWx0Lm1hdHJpeCA9XHJcbiAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJTeW1ib2woKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yU3ltYm9sKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuclN5bWJvbCgpXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuclN5bWJvbCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJTeW1ib2woKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yU3ltYm9sKClcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yU3ltYm9sKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuclN5bWJvbCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJTeW1ib2woKVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJTeW1ib2woKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yU3ltYm9sKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuclN5bWJvbCgpXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuclN5bWJvbCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJTeW1ib2woKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yU3ltYm9sKClcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICByZXN1bHQuYmFsYW5jZSA9IE1hdGgucmFuZG9tKCkgKiAxMDAwO1xyXG4gICAgICAgICAgICByZXN1bHQudG90YWxXaW4gPSBNYXRoLnJhbmRvbSgpICogMTAwO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFyID0gWzAsMSwyLDMsNF07XHJcbiAgICAgICAgICAgIHRoaXMuc2h1ZmZsZShhcik7XHJcblxyXG4gICAgICAgICAgICByZXN1bHQubnVtV2lucyA9IE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogNSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC53aW5zID1bXTtcclxuICAgICAgICAgICAgZm9yKHZhciBpPSAwO2k8cmVzdWx0Lm51bVdpbnM7aSsrKXtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC53aW5zLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lTnVtYmVyOiBhcltpXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZVdpbjogTWF0aC5yYW5kb20oKSAqIDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lubmluZ0NlbGxzOiB0aGlzLmNyZWF0ZVdpbm5pbmdDZWxsc0FycmF5KClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlc3VsdC53aW5zLnNvcnQoZnVuY3Rpb24oYSwgYikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGEubGluZU51bWJlciA8IGIubGluZU51bWJlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrKHJlc3VsdCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2h1ZmZsZTogZnVuY3Rpb24oYSkge1xyXG4gICAgICAgICAgICB2YXIgaiwgeCwgaTtcclxuICAgICAgICAgICAgZm9yIChpID0gYS5sZW5ndGg7IGk7IGktLSkge1xyXG4gICAgICAgICAgICAgICAgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGkpO1xyXG4gICAgICAgICAgICAgICAgeCA9IGFbaSAtIDFdO1xyXG4gICAgICAgICAgICAgICAgYVtpIC0gMV0gPSBhW2pdO1xyXG4gICAgICAgICAgICAgICAgYVtqXSA9IHg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjcmVhdGVXaW5uaW5nQ2VsbHNBcnJheTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgYXIgPSBbXTtcclxuICAgICAgICAgICAgdmFyIG4gPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDMpICsgMjtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDtpPG47aSsrKXtcclxuICAgICAgICAgICAgICAgIGFyLnB1c2goMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGFyO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNhbXBsZVdpbnM6XHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIHtsaW5lTnVtYmVyOiAwLCB3aW5BbW91bnQ6IE1hdGgucmFuZG9tKCkgKiAxMDAsIHdpbm5pbmdDZWxsczogWzEsMSwxXX0sXHJcbiAgICAgICAgICAgICAgICB7bGluZU51bWJlcjogMywgd2luQW1vdW50OiBNYXRoLnJhbmRvbSgpICogMTAwLCB3aW5uaW5nQ2VsbHM6IFsxLDEsMSwxXX0sXHJcbiAgICAgICAgICAgICAgICB7bGluZU51bWJlcjogMywgd2luQW1vdW50OiBNYXRoLnJhbmRvbSgpICogMTAwLCB3aW5uaW5nQ2VsbHM6IFsxLDEsMV19LFxyXG4gICAgICAgICAgICBdLFxyXG5cclxuICAgICAgICByU3ltYm9sOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAvL3JldHVybiAyO1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiA4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6IFwiU2VydmVyU2VydmljZVwiXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBQcmVwQ29udHJvbGxlckNvbW1hbmRcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LmNvbnRyb2xsZXIuY29tbWFuZC5QcmVwQ29udHJvbGxlckNvbW1hbmQnLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5TaW1wbGVDb21tYW5kXHJcbiAgICB9LFxyXG4gIFxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIC8vIFJlZ2lzdGVyIGFsbCBjb21tYW5kc1xyXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uIChub3RlKSB7ICAgXHJcbiAgICAgICAgICAgIHRoaXMuZmFjYWRlLnJlZ2lzdGVyQ29tbWFuZChzbG90LkFwcENvbnN0YW50cy5XSU5ET1dfUkVTSVpFRCwgc2xvdC5jb250cm9sbGVyLmNvbW1hbmQuV2luZG93UmVzaXplQ29tbWFuZCk7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjYWRlLnJlZ2lzdGVyQ29tbWFuZChzbG90LkFwcENvbnN0YW50cy5TUElOLCBzbG90LmNvbnRyb2xsZXIuY29tbWFuZC5TcGluQ29tbWFuZCk7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjYWRlLnJlZ2lzdGVyQ29tbWFuZChzbG90LkFwcENvbnN0YW50cy5TUElOX0VORCwgc2xvdC5jb250cm9sbGVyLmNvbW1hbmQuU3BpbkVuZENvbW1hbmQpO1xyXG4gICAgICAgIH1cclxuICAgIH0gICAgXHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBQcmVwTW9kZWxDb21tYW5kXHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC5jb250cm9sbGVyLmNvbW1hbmQuUHJlcE1vZGVsQ29tbWFuZCcsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLlNpbXBsZUNvbW1hbmRcclxuICAgIH0sXHJcbiAgXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLy8gUmVnaXN0ZXIgYWxsIFByb3h5c1xyXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uIChub3RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjYWRlLnJlZ2lzdGVyUHJveHkobmV3IHNsb3QubW9kZWwucHJveHkuTG9hZGVyUHJveHkoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjYWRlLnJlZ2lzdGVyUHJveHkobmV3IHNsb3QubW9kZWwucHJveHkuV2luZG93U2l6ZVByb3h5KCkpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3RlclByb3h5KG5ldyBzbG90Lm1vZGVsLnByb3h5LkNvbmZpZ1Byb3h5KCkpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3RlclByb3h5KG5ldyBzbG90Lm1vZGVsLnByb3h5LlNlcnZlclByb3h5KCkpO1xyXG4gICAgICAgIH1cclxuICAgIH0gICAgXHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBQcmVwUGl4aUNvbW1hbmRcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LmNvbnRyb2xsZXIuY29tbWFuZC5QcmVwUGl4aUNvbW1hbmQnLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5TaW1wbGVDb21tYW5kXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAobm90ZSkge1xyXG4gICAgICAgICAgICBQWFJvb3QgPSBuZXcgUElYSS5Db250YWluZXIoKTtcclxuXHJcbiAgICAgICAgICAgIFBYUmVuZGVyZXIgPSBuZXcgUElYSS5hdXRvRGV0ZWN0UmVuZGVyZXIod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XHJcbiAgICAgICAgICAgIFBYUmVuZGVyZXIuYmFja2dyb3VuZENvbG9yID0gMHg2NkZGOTk7XHJcbiAgICAgICAgICAgIFBYUmVuZGVyZXIudmlldy5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChQWFJlbmRlcmVyLnZpZXcpO1xyXG5cclxuICAgICAgICAgICAgLy8gUmVuZGVyIGxvb3BcclxuICAgICAgICAgICAgd2luZG93LnJlbmRlckxvb3AgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgUFhSZW5kZXJlci5yZW5kZXIoUFhSb290KTtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh3aW5kb3cucmVuZGVyTG9vcCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHdpbmRvdy5yZW5kZXJMb29wKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2NcclxuICogQGNsYXNzICAgICAgIFByZXBWaWV3Q29tbWFuZFxyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUgKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LmNvbnRyb2xsZXIuY29tbWFuZC5QcmVwVmlld0NvbW1hbmQnLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5TaW1wbGVDb21tYW5kXHJcbiAgICB9LFxyXG4gXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKG5vdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJNZWRpYXRvcihuZXcgc2xvdC52aWV3Lm1lZGlhdG9yLkJHTWVkaWF0b3IoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjYWRlLnJlZ2lzdGVyTWVkaWF0b3IobmV3IHNsb3Qudmlldy5tZWRpYXRvci5SZWVsQ29udGFpbmVyTWVkaWF0b3IoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjYWRlLnJlZ2lzdGVyTWVkaWF0b3IobmV3IHNsb3Qudmlldy5tZWRpYXRvci5QYW5lbE1lZGlhdG9yKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3Rlck1lZGlhdG9yKG5ldyBzbG90LnZpZXcubWVkaWF0b3IuV2luQW5ub3VuY2VNZWRpYXRvcigpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBTcGluQ29tbWFuZFxyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3QuY29udHJvbGxlci5jb21tYW5kLlNwaW5Db21tYW5kJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuU2ltcGxlQ29tbWFuZFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKG5vdGUpIHtcclxuICAgICAgICAgICAgdmFyIHNlcnZlciA9IHRoaXMuZmFjYWRlLnJldHJpZXZlUHJveHkoc2xvdC5tb2RlbC5wcm94eS5TZXJ2ZXJQcm94eS5OQU1FKTtcclxuICAgICAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKHNsb3QuQXBwQ29uc3RhbnRzLlNUT1BfV0lOX0FOTk9VTkNFTUVOVFMpO1xyXG5cclxuICAgICAgICAgICAgc2VydmVyLnNwaW4oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBTcGluRW5kQ29tbWFuZFxyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3QuY29udHJvbGxlci5jb21tYW5kLlNwaW5FbmRDb21tYW5kJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuU2ltcGxlQ29tbWFuZFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKG5vdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKHNsb3QuQXBwQ29uc3RhbnRzLlNUQVJUX1dJTl9BTk5PVU5DRU1FTlRTKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBTdGFydHVwQ29tbWFuZFxyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3QuY29udHJvbGxlci5jb21tYW5kLlN0YXJ0dXBDb21tYW5kJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuTWFjcm9Db21tYW5kXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlMgXHJcbiAgICB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU3ViY29tbWFuZHMgdG8gaGFuZGxlIGZhY2FkZSByZWdpc3RyYXRpb25zIGZvclxyXG4gICAgICAgICAqIE1vZGVsLCBWaWV3IGFuZCBDb250cm9sbGVyXHJcbiAgICAgICAgICogQWxzbyBydW5zIHN1YiBjb21tYW5kIHRvIGluaXRpYWxpemUgUElYSSBmcmFtZXdvcmtcclxuICAgICAgICAgKi9cclxuICAgICAgICBpbml0aWFsaXplTWFjcm9Db21tYW5kOiBmdW5jdGlvbiAobm90ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZFN1YkNvbW1hbmQoc2xvdC5jb250cm9sbGVyLmNvbW1hbmQuUHJlcFBpeGlDb21tYW5kKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkU3ViQ29tbWFuZChzbG90LmNvbnRyb2xsZXIuY29tbWFuZC5QcmVwQ29udHJvbGxlckNvbW1hbmQpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZFN1YkNvbW1hbmQoc2xvdC5jb250cm9sbGVyLmNvbW1hbmQuUHJlcE1vZGVsQ29tbWFuZCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkU3ViQ29tbWFuZChzbG90LmNvbnRyb2xsZXIuY29tbWFuZC5QcmVwVmlld0NvbW1hbmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBXaW5kb3dSZXNpemVDb21tYW5kXHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC5jb250cm9sbGVyLmNvbW1hbmQuV2luZG93UmVzaXplQ29tbWFuZCcsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLlNpbXBsZUNvbW1hbmRcclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uIChub3RlKSB7XHJcbiAgICAgICAgICAgIHZhciB3aW5kb3dTaXplVk8gPSBub3RlLmdldEJvZHkoKTtcclxuICAgICAgICAgICAgUFhSZW5kZXJlci5yZXNpemUod2luZG93U2l6ZVZPLndpZHRoLCB3aW5kb3dTaXplVk8uaGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBCR1xyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3Qudmlldy5jb21wb25lbnQuQkcnLFxyXG4gICAgICAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UgPSBuZXcgUElYSS5Db250YWluZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvLyBTdGFnZSBNZW1iZXJzXHJcbiAgICAgICAgc3RhZ2U6IG51bGwsXHJcbiAgICAgICAgYmc6IG51bGwsXHJcblxyXG4gICAgICAgIC8vIFJlZmVyZW5jZXNcclxuICAgICAgICBPUklFTlRBVElPTjogc2xvdC5tb2RlbC5lbnVtLk9SSUVOVEFUSU9OLFxyXG5cclxuICAgICAgICBpbml0OiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZHJlbihkYXRhLnJlc291cmNlcyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dXBWaWV3KGRhdGEud2luZG93U2l6ZVZPKTtcclxuXHJcbiAgICAgICAgICAgIFBYUm9vdC5hZGRDaGlsZCh0aGlzLnN0YWdlKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBhZGRDaGlsZHJlbjogZnVuY3Rpb24ocmVzb3VyY2VzKXtcclxuICAgICAgICAgICAgdGhpcy5iZyA9IG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMuYmcudGV4dHVyZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYmcuYW5jaG9yLnNldCgwLjUsMC41KTtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmJnKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZXR1cFZpZXc6IGZ1bmN0aW9uKHdpbmRvd1NpemVWTyl7XHJcbiAgICAgICAgICAgIC8vIEZpbGwgc2NyZWVuXHJcbiAgICAgICAgICAgIHZhciBiZ1NpemUgPSBzbG90Lm1vZGVsLmxpYi5VdGlscy5nZXRTaXplVG9GaWxsU2NyZWVuKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOnRoaXMuYmcud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLmJnLmhlaWdodFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDp3aW5kb3dTaXplVk8ud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiB3aW5kb3dTaXplVk8uaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJnLndpZHRoID0gYmdTaXplLndpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLmJnLmhlaWdodCA9IGJnU2l6ZS5oZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJnLnggPSB3aW5kb3dTaXplVk8ud2lkdGgvMjtcclxuICAgICAgICAgICAgdGhpcy5iZy55ID0gd2luZG93U2l6ZVZPLmhlaWdodC8yO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGhhbmRsZVJlc2l6ZTogZnVuY3Rpb24od2luZG93U2l6ZVZPKXtcclxuICAgICAgICAgICAgdGhpcy5zZXR1cFZpZXcod2luZG93U2l6ZVZPKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogJ0JHJ1xyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgUGFuZWxcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LnZpZXcuY29tcG9uZW50LlBhbmVsJyxcclxuICAgICAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLy8gU3RhZ2UgTWVtYmVyc1xyXG4gICAgICAgIHN0YWdlOiBudWxsLFxyXG5cclxuICAgICAgICBzcGluOiBudWxsLFxyXG4gICAgICAgIGJ0blNwaW46IG51bGwsXHJcblxyXG4gICAgICAgIHdpbjogbnVsbCxcclxuICAgICAgICB0eHRXaW46IG51bGwsXHJcblxyXG4gICAgICAgIGJhbGFuY2U6IG51bGwsXHJcbiAgICAgICAgdHh0QmFsYW5jZTogbnVsbCxcclxuXHJcbiAgICAgICAgYmV0OiBudWxsLFxyXG4gICAgICAgIGJ0bkJldFBsdXM6IG51bGwsXHJcbiAgICAgICAgYnRuQmV0TWludXM6IG51bGwsXHJcbiAgICAgICAgdHh0QmV0OiBudWxsLFxyXG5cclxuICAgICAgICBjdXJyZW5jeTogbnVsbCxcclxuICAgICAgICBkZW5vbWluYXRpb25zOiBudWxsLFxyXG4gICAgICAgIGN1cnJlbnREZW5vbWluYXRpb246IG51bGwsXHJcblxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVuY3kgPSBkYXRhLnVpQ29uZmlnVk8uY3VycmVuY3k7XHJcbiAgICAgICAgICAgIHRoaXMuZGVub21pbmF0aW9ucyA9IGRhdGEuZ2FtZUNvbmZpZ1ZPLmRlbm9taW5hdGlvbnM7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudERlbm9taW5hdGlvbiA9IGRhdGEuZ2FtZUNvbmZpZ1ZPLmRlZmF1bHREZW5vbWluYXRpb247XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkcmVuKGRhdGEucmVzb3VyY2VzKTtcclxuICAgICAgICAgICAgdGhpcy5zZXR1cFZpZXcoZGF0YS53aW5kb3dTaXplVk8pO1xyXG5cclxuICAgICAgICAgICAgUFhSb290LmFkZENoaWxkKHRoaXMuc3RhZ2UpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFkZENoaWxkcmVuOiBmdW5jdGlvbihyZXNvdXJjZXMpe1xyXG4gICAgICAgICAgICAvLyBTcGluIGNvbXBvbmVudFxyXG4gICAgICAgICAgICB0aGlzLnNwaW4gPSBuZXcgUElYSS5Db250YWluZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5zcGluLmFkZENoaWxkKG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMuc3Bpbl9kaXNhYmxlZC50ZXh0dXJlKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc3Bpbi5hZGRDaGlsZCh0aGlzLmJ0blNwaW4gPSBuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLnNwaW4udGV4dHVyZSkpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuc3Bpbik7XHJcblxyXG4gICAgICAgICAgICAvLyBXaW4gY29tcG9uZW50ID09PlxyXG4gICAgICAgICAgICB0aGlzLndpbiA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xyXG4gICAgICAgICAgICB0aGlzLndpbi5hZGRDaGlsZChuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLndpbi50ZXh0dXJlKSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnR4dFdpbiA9IG5ldyBQSVhJLlRleHQoKTtcclxuICAgICAgICAgICAgdGhpcy50eHRXaW4uc3R5bGUgPSB7Zm9udFNpemU6IDI0LCBhbGlnbjogJ2NlbnRlcid9O1xyXG4gICAgICAgICAgICB0aGlzLnR4dFdpbi54ID0gMTI7XHJcbiAgICAgICAgICAgIHRoaXMudHh0V2luLnkgPSA0MjtcclxuICAgICAgICAgICAgdGhpcy53aW4uYWRkQ2hpbGQodGhpcy50eHRXaW4pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLndpbik7XHJcbiAgICAgICAgICAgIC8vIFdpbiBjb21wb25lbnQgPD09XHJcblxyXG4gICAgICAgICAgICAvLyBCYWxhbmNlIGNvbXBvbmVudCA9PT5cclxuICAgICAgICAgICAgdGhpcy5iYWxhbmNlID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYmFsYW5jZS5hZGRDaGlsZChuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLmJhbGFuY2UudGV4dHVyZSkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50eHRCYWxhbmNlID0gbmV3IFBJWEkuVGV4dCgpO1xyXG4gICAgICAgICAgICB0aGlzLnR4dEJhbGFuY2Uuc3R5bGUgPSB7Zm9udFNpemU6IDI0LCBhbGlnbjogJ2NlbnRlcid9O1xyXG4gICAgICAgICAgICB0aGlzLnR4dEJhbGFuY2UueCA9IDEyO1xyXG4gICAgICAgICAgICB0aGlzLnR4dEJhbGFuY2UueSA9IDQyO1xyXG4gICAgICAgICAgICB0aGlzLmJhbGFuY2UuYWRkQ2hpbGQodGhpcy50eHRCYWxhbmNlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5iYWxhbmNlKTtcclxuICAgICAgICAgICAgLy8gPD09IEJhbGFuY2UgY29tcG9uZW50XHJcblxyXG4gICAgICAgICAgICAvLyBCZXQgY29tcG9uZW50ID09PT5cclxuICAgICAgICAgICAgdGhpcy5iZXQgPSBuZXcgUElYSS5Db250YWluZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5iZXQuYWRkQ2hpbGQobmV3IFBJWEkuU3ByaXRlKHJlc291cmNlcy5iZXRfbWludXNfZGlzYWJsZWQudGV4dHVyZSkpO1xyXG4gICAgICAgICAgICB0aGlzLmJldC5hZGRDaGlsZCh0aGlzLmJ0bkJldE1pbnVzID0gbmV3IFBJWEkuU3ByaXRlKHJlc291cmNlcy5iZXRfbWludXMudGV4dHVyZSkpO1xyXG4gICAgICAgICAgICB2YXIgYmV0U3ByaXRlID0gbmV3IFBJWEkuU3ByaXRlKHJlc291cmNlcy5iZXQudGV4dHVyZSk7XHJcbiAgICAgICAgICAgIGJldFNwcml0ZS54ICs9IHRoaXMuYnRuQmV0TWludXMud2lkdGggKyAyO1xyXG4gICAgICAgICAgICB0aGlzLmJldC5hZGRDaGlsZChiZXRTcHJpdGUpO1xyXG4gICAgICAgICAgICB2YXIgYmV0UGx1c0RTcHJpdGUgPSBuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLmJldF9wbHVzX2Rpc2FibGVkLnRleHR1cmUpO1xyXG4gICAgICAgICAgICBiZXRQbHVzRFNwcml0ZS54ID0gYmV0U3ByaXRlLnggKyBiZXRTcHJpdGUud2lkdGggKyAyO1xyXG4gICAgICAgICAgICB0aGlzLmJldC5hZGRDaGlsZChiZXRQbHVzRFNwcml0ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYmV0LmFkZENoaWxkKHRoaXMuYnRuQmV0UGx1cyA9IG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMuYmV0X3BsdXMudGV4dHVyZSkpO1xyXG4gICAgICAgICAgICB0aGlzLmJ0bkJldFBsdXMueCA9IGJldFBsdXNEU3ByaXRlLng7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnR4dEJldCA9IG5ldyBQSVhJLlRleHQoKTtcclxuICAgICAgICAgICAgdGhpcy50eHRCZXQuc3R5bGUgPSB7Zm9udFNpemU6IDI0LCBhbGlnbjogJ2NlbnRlcid9O1xyXG4gICAgICAgICAgICB0aGlzLnR4dEJldC54ID0gYmV0U3ByaXRlLnggKyA3O1xyXG4gICAgICAgICAgICB0aGlzLnR4dEJldC55ID0gYmV0U3ByaXRlLnkgKyA0MDtcclxuICAgICAgICAgICAgdGhpcy5iZXQuYWRkQ2hpbGQodGhpcy50eHRCZXQpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmJldCk7XHJcbiAgICAgICAgICAgIC8vIDw9PT0gQmV0IGNvbXBvbmVudFxyXG5cclxuICAgICAgICAgICAgLy8gQnV0dG9uc1xyXG4gICAgICAgICAgICB0aGlzLmJ0blNwaW4uaW50ZXJhY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmJ0blNwaW4ub24oXCJjbGlja1wiLCB0aGlzLm9uU3BpbkNsaWNrLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICB0aGlzLmJ0bkJldE1pbnVzLmludGVyYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5idG5CZXRNaW51cy5vbihcImNsaWNrXCIsIHRoaXMub25CZXRNaW51c0NsaWNrLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICB0aGlzLmJ0bkJldFBsdXMuaW50ZXJhY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmJ0bkJldFBsdXMub24oXCJjbGlja1wiLCB0aGlzLm9uQmV0UGx1c0NsaWNrLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICAgICAgLy8gSW5pdGlhbCB2YWx1ZXNcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVCZXQoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZXR1cFZpZXc6IGZ1bmN0aW9uKHdpbmRvd1NpemVWTyl7XHJcbiAgICAgICAgICAgIHRoaXMuc3Bpbi54ID0gd2luZG93U2l6ZVZPLndpZHRoIC0gdGhpcy5zcGluLndpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLnNwaW4ueSA9IHdpbmRvd1NpemVWTy5oZWlnaHQgLSB0aGlzLnNwaW4uaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgdGhpcy53aW4ueCA9ICh3aW5kb3dTaXplVk8ud2lkdGggLSB0aGlzLndpbi53aWR0aCkvMjtcclxuICAgICAgICAgICAgdGhpcy53aW4ueSA9IDA7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJhbGFuY2UueCA9ICh3aW5kb3dTaXplVk8ud2lkdGggLSB0aGlzLmJhbGFuY2Uud2lkdGgpLzI7XHJcbiAgICAgICAgICAgIHRoaXMuYmFsYW5jZS55ID0gd2luZG93U2l6ZVZPLmhlaWdodCAtIHRoaXMuYmFsYW5jZS5oZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJldC54ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5iZXQueSA9IHdpbmRvd1NpemVWTy5oZWlnaHQgLSB0aGlzLmJldC5oZWlnaHQ7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlQmFsYW5jZTogZnVuY3Rpb24oYmFsYW5jZSl7XHJcbiAgICAgICAgICAgIHRoaXMudHh0QmFsYW5jZS50ZXh0ID0gdGhpcy5jdXJyZW5jeSArIGJhbGFuY2UudG9GaXhlZCgyKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB1cGRhdGVXaW46IGZ1bmN0aW9uKHdpbil7XHJcbiAgICAgICAgICAgIHRoaXMudHh0V2luLnRleHQgPSB0aGlzLmN1cnJlbmN5ICsgd2luLnRvRml4ZWQoMik7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlQmV0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLnR4dEJldC50ZXh0ID0gdGhpcy5jdXJyZW5jeSArIHRoaXMuZGVub21pbmF0aW9uc1t0aGlzLmN1cnJlbnREZW5vbWluYXRpb25dLnRvRml4ZWQoMik7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaW5jcmVhc2VCZXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY3VycmVudERlbm9taW5hdGlvbiA8IHRoaXMuZGVub21pbmF0aW9ucy5sZW5ndGggLSAxKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudERlbm9taW5hdGlvbisrO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVCZXQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdGVCZXRCdXR0b25zKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkZWNyZWFzZUJldDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYodGhpcy5jdXJyZW50RGVub21pbmF0aW9uID4gMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnREZW5vbWluYXRpb24tLTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQmV0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlQmV0QnV0dG9ucygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdmFsaWRhdGVCZXRCdXR0b25zOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmN1cnJlbnREZW5vbWluYXRpb24gPT0gdGhpcy5kZW5vbWluYXRpb25zLmxlbmd0aCAtIDEpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlQmV0UGx1cygpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlQmV0UGx1cygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLmN1cnJlbnREZW5vbWluYXRpb24gPT0gMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpc2FibGVCZXRNaW51cygpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlQmV0TWludXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRpc2FibGVTcGluOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLmJ0blNwaW4udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGVuYWJsZVNwaW46IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuU3Bpbi52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkaXNhYmxlQmV0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLmRpc2FibGVCZXRQbHVzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZUJldE1pbnVzKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbmFibGVCZXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGVCZXRCdXR0b25zKCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGlzYWJsZUJldFBsdXM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuQmV0UGx1cy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZW5hYmxlQmV0UGx1czogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy5idG5CZXRQbHVzLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRpc2FibGVCZXRNaW51czogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy5idG5CZXRNaW51cy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZW5hYmxlQmV0TWludXM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuQmV0TWludXMudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gRXZlbnQgSGFuZGxlcnNcclxuICAgICAgICBvblNwaW5DbGljazogZnVuY3Rpb24oZXZ0KXtcclxuICAgICAgICAgICAgdGhpcy5kaXNhYmxlU3BpbigpO1xyXG4gICAgICAgICAgICB0aGlzLmRpc2FibGVCZXQoKTtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZS5lbWl0KHNsb3Qudmlldy5ldmVudC5WaWV3RXZlbnRzLlNQSU5fQ0xJQ0spO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uQmV0TWludXNDbGljazogZnVuY3Rpb24oZXZ0KXtcclxuICAgICAgICAgICAgdGhpcy5kZWNyZWFzZUJldCgpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uQmV0UGx1c0NsaWNrOiBmdW5jdGlvbihldnQpe1xyXG4gICAgICAgICAgICB0aGlzLmluY3JlYXNlQmV0KCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGFuZGxlUmVzaXplOiBmdW5jdGlvbiAod2luZG93U2l6ZVZPKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dXBWaWV3KHdpbmRvd1NpemVWTyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdQYW5lbCdcclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2NcclxuICogQGNsYXNzICAgICAgIFJlZWxcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LnZpZXcuY29tcG9uZW50LlJlZWwnLFxyXG4gICAgICAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UgPSBuZXcgUElYSS5Db250YWluZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvLyBTdGFnZSBNZW1iZXJzXHJcbiAgICAgICAgc3RhZ2U6IG51bGwsXHJcblxyXG4gICAgICAgIHJlZWxJbmRleDogbnVsbCxcclxuXHJcbiAgICAgICAgbnVtUm93czogbnVsbCxcclxuICAgICAgICB3aWR0aDogbnVsbCxcclxuICAgICAgICBoZWlnaHQ6IG51bGwsXHJcblxyXG4gICAgICAgIGNlbGxzOiBudWxsLFxyXG4gICAgICAgIHNwaW5Ucmlja0NlbGxzOiBudWxsLFxyXG4gICAgICAgIGNlbGxQb3NPcmlnaW5hbDogbnVsbCxcclxuICAgICAgICByZWVsQ2VsbEhlaWdodDogbnVsbCxcclxuICAgICAgICByZWVsSGVpZ2h0OiBudWxsLFxyXG5cclxuICAgICAgICByZXN1bHRSZWVsOiBudWxsLFxyXG4gICAgICAgIGlzUmVzdWx0UmVjZWl2ZWQ6IG51bGwsXHJcblxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIChpbmRleCwgZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZWxJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICB0aGlzLm51bVJvd3MgPSBkYXRhLmdhbWVDb25maWdWTy5udW1Sb3dzO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRpbmcgc2l6ZSBvZiBzaW5nbGUgcmVlbCBhcmVhXHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSBkYXRhLnVpQ29uZmlnVk8uc3ltYm9sV2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID1cclxuICAgICAgICAgICAgICAgICh0aGlzLm51bVJvd3MgKiBkYXRhLnVpQ29uZmlnVk8uc3ltYm9sSGVpZ2h0KSArXHJcbiAgICAgICAgICAgICAgICAoKHRoaXMubnVtUm93cyAtIDEpICogZGF0YS51aUNvbmZpZ1ZPLnJlZWxWU2VwYXJhdG9yKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFllbGxvdyByb3VuZGVkIHJlY3RhbmdsZSBzdHJpcCBiZWhpbmQgZWFjaCByZWVsXHJcbiAgICAgICAgICAgIHZhciBiZ1JlY3QgPSBuZXcgUElYSS5HcmFwaGljcygpO1xyXG4gICAgICAgICAgICBiZ1JlY3QuYmVnaW5GaWxsKDB4MkI2RjFBKTtcclxuICAgICAgICAgICAgYmdSZWN0LmRyYXdSb3VuZGVkUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgMTApO1xyXG4gICAgICAgICAgICBiZ1JlY3QuYWxwaGEgPSAwLjQ7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQoYmdSZWN0KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlUmVlbENlbGxzKGRhdGEpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNyZWF0ZVJlZWxDZWxsczogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgICAgIC8vIFRoZSBkaXN0YW5jZSBlYWNoIHN5bWJvbCBpcyBhbmltYXRlZCB0byBjcmVhdGUgc3BpbiBlZmZlY3RcclxuICAgICAgICAgICAgdGhpcy5yZWVsQ2VsbEhlaWdodCA9IGRhdGEudWlDb25maWdWTy5zeW1ib2xIZWlnaHQgKyBkYXRhLnVpQ29uZmlnVk8ucmVlbFZTZXBhcmF0b3I7XHJcbiAgICAgICAgICAgIHRoaXMucmVlbEhlaWdodCA9XHJcbiAgICAgICAgICAgICAgICAoZGF0YS51aUNvbmZpZ1ZPLnN5bWJvbEhlaWdodCAqIHRoaXMubnVtUm93cykgK1xyXG4gICAgICAgICAgICAgICAgKGRhdGEudWlDb25maWdWTy5yZWVsVlNlcGFyYXRvciAqICh0aGlzLm51bVJvd3MgLSAxKSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgeHAgPSAwO1xyXG4gICAgICAgICAgICB2YXIgeXAgPSAtKHRoaXMucmVlbENlbGxIZWlnaHQgKiB0aGlzLm51bVJvd3MpO1xyXG5cclxuICAgICAgICAgICAgLy8gU3RvcmluZyBwb3NpdGlvbnMgb2YgYWxsIGNlbGxzXHJcbiAgICAgICAgICAgIC8vIChib3RoIG9uIHNjcmVlbiBhbmQgb2ZmIHNjcmVlbiB0cmljayBjZWxscylcclxuICAgICAgICAgICAgdGhpcy5jZWxsUG9zT3JpZ2luYWwgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIHZhciByZWVsQ2VsbDtcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0aW5nIGNlbGxzIHVzZWQgdG8gY3JlYXRlIGNvbnRpbm91cyBzcGluXHJcbiAgICAgICAgICAgIC8vIFRoZXNlIHN0YXkgb2ZmIHNjcmVlbiBhbmQgb25seSBjb21lIG9uIHRvIHZpc2libGUgYXJlYVxyXG4gICAgICAgICAgICAvLyB3aGVuIHRoZSByZWVsIGlzIHNwaW5uaW5nXHJcbiAgICAgICAgICAgIC8vIFRoZXNlIHdpbGwgYmUgdGhlIGZpcnN0IHNldCBpbiBjZWxsUG9zT3JpZ2luYWwgYXJyYXlcclxuICAgICAgICAgICAgdGhpcy5zcGluVHJpY2tDZWxscyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5udW1Sb3dzOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgcmVlbENlbGwgPSBuZXcgc2xvdC52aWV3LmNvbXBvbmVudC5SZWVsQ2VsbCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZChyZWVsQ2VsbC5zdGFnZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwaW5Ucmlja0NlbGxzLnB1c2gocmVlbENlbGwpO1xyXG4gICAgICAgICAgICAgICAgcmVlbENlbGwuc3RhZ2UueCA9IHhwO1xyXG4gICAgICAgICAgICAgICAgcmVlbENlbGwuc3RhZ2UueSA9IHlwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jZWxsUG9zT3JpZ2luYWwucHVzaCh7eDogeHAsIHk6IHlwfSk7XHJcbiAgICAgICAgICAgICAgICByZWVsQ2VsbC5pbml0KGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgeXAgKz0gZGF0YS51aUNvbmZpZ1ZPLnN5bWJvbEhlaWdodCArIGRhdGEudWlDb25maWdWTy5yZWVsVlNlcGFyYXRvcjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gUmVlbCBjZWxscyB0byBkaXNwbGF5IHNwaW4gcmVzdWx0XHJcbiAgICAgICAgICAgIC8vIFRoZXNlIHdpbGwgYmUgdGhlIGxhc3Qgc2V0IGluIGNlbGxQb3NPcmlnaW5hbCBhcnJheVxyXG4gICAgICAgICAgICB0aGlzLmNlbGxzID0gW107XHJcbiAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IHRoaXMubnVtUm93czsgaSsrKXtcclxuICAgICAgICAgICAgICAgIHJlZWxDZWxsID0gbmV3IHNsb3Qudmlldy5jb21wb25lbnQuUmVlbENlbGwoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQocmVlbENlbGwuc3RhZ2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jZWxscy5wdXNoKHJlZWxDZWxsKTtcclxuICAgICAgICAgICAgICAgIHJlZWxDZWxsLnN0YWdlLnggPSB4cDtcclxuICAgICAgICAgICAgICAgIHJlZWxDZWxsLnN0YWdlLnkgPSB5cDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2VsbFBvc09yaWdpbmFsLnB1c2goe3g6IHhwLCB5OiB5cH0pO1xyXG4gICAgICAgICAgICAgICAgcmVlbENlbGwuaW5pdChkYXRhKTtcclxuICAgICAgICAgICAgICAgIHlwICs9IGRhdGEudWlDb25maWdWTy5zeW1ib2xIZWlnaHQgKyBkYXRhLnVpQ29uZmlnVk8ucmVlbFZTZXBhcmF0b3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzcGluOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLmlzUmVzdWx0UmVjZWl2ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zdGFydFNwaW4oKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzdGFydFNwaW46IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciBlYXNlVHlwZSA9IFBvd2VyMS5lYXNlSW47XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLm51bVJvd3M7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwaW5Ucmlja0NlbGxzW2ldLnVwZGF0ZVdpdGhSYW5kb21TeW1ib2woKTtcclxuICAgICAgICAgICAgICAgIFR3ZWVuTGl0ZS50byhcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwaW5Ucmlja0NlbGxzW2ldLnN0YWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIDAuNSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHRoaXMuc3BpblRyaWNrQ2VsbHNbaV0uc3RhZ2UueSArICh0aGlzLnJlZWxDZWxsSGVpZ2h0ICogdGhpcy5udW1Sb3dzKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWFzZTogZWFzZVR5cGVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgLy8gVHdlZW4gb25Db21wbGV0ZSBjYWxsYmFjayB0byBiZSBhZGRlZCBvbmx5IHRvIG9uZSBTeW1ib2wuXHJcbiAgICAgICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSAoaSA9PT0gdGhpcy5udW1Sb3dzIC0gMSkgPyB0aGlzLmNvbnRpbnVlU3Bpbi5iaW5kKHRoaXMpIDogbnVsbDtcclxuICAgICAgICAgICAgICAgIFR3ZWVuTGl0ZS50byhcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW2ldLnN0YWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIDAuNSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHRoaXMuY2VsbHNbaV0uc3RhZ2UueSArICh0aGlzLnJlZWxDZWxsSGVpZ2h0ICogdGhpcy5udW1Sb3dzKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWFzZTogZWFzZVR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU6IGNhbGxiYWNrXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNvbnRpbnVlU3BpbjogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYodGhpcy5pc1Jlc3VsdFJlY2VpdmVkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcFNwaW4oKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgb2ZmU2NyZWVuQ2VsbHMgPSB0aGlzLmdldE9mZlNjcmVlbkNlbGxzKCk7XHJcbiAgICAgICAgICAgIHZhciBlYXNlVHlwZSA9IExpbmVhci5lYXNlTm9uZTtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMubnVtUm93czsgaSsrKXtcclxuICAgICAgICAgICAgICAgIG9mZlNjcmVlbkNlbGxzW2ldLnVwZGF0ZVdpdGhSYW5kb21TeW1ib2woKTtcclxuICAgICAgICAgICAgICAgIG9mZlNjcmVlbkNlbGxzW2ldLnN0YWdlLnkgPSB0aGlzLmNlbGxQb3NPcmlnaW5hbFtpXS55O1xyXG4gICAgICAgICAgICAgICAgVHdlZW5MaXRlLnRvKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3BpblRyaWNrQ2VsbHNbaV0uc3RhZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgMC4xLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeTogdGhpcy5zcGluVHJpY2tDZWxsc1tpXS5zdGFnZS55ICsgKHRoaXMucmVlbENlbGxIZWlnaHQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlYXNlOiBlYXNlVHlwZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAvLyBUd2VlbiBvbkNvbXBsZXRlIGNhbGxiYWNrIHRvIGJlIGFkZGVkIG9ubHkgdG8gb25lIFN5bWJvbC5cclxuICAgICAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IChpID09PSB0aGlzLm51bVJvd3MgLSAxKSA/IHRoaXMuY29udGludWVTcGluLmJpbmQodGhpcykgOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgVHdlZW5MaXRlLnRvKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2VsbHNbaV0uc3RhZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgMC4xLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeTogdGhpcy5jZWxsc1tpXS5zdGFnZS55ICsgKHRoaXMucmVlbENlbGxIZWlnaHQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlYXNlOiBlYXNlVHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZTogY2FsbGJhY2tcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgVHdlZW5MaXRlLnRvKHRoaXMuY2VsbHNbaV0uc3RhZ2UsIDAuMSwge2Vhc2U6IGVhc2VUeXBlLCBvbkNvbXBsZXRlOiBjYWxsYmFja30pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3RvcFNwaW46IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciBvZmZTY3JlZW5DZWxscyA9IHRoaXMuZ2V0T2ZmU2NyZWVuQ2VsbHMoKTtcclxuICAgICAgICAgICAgdmFyIGVhc2VUeXBlID0gUG93ZXIxLmVhc2VPdXQ7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLm51bVJvd3M7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBvZmZTY3JlZW5DZWxsc1tpXS51cGRhdGVTeW1ib2wodGhpcy5yZXN1bHRSZWVsW2ldKTtcclxuICAgICAgICAgICAgICAgIG9mZlNjcmVlbkNlbGxzW2ldLnN0YWdlLnkgPSB0aGlzLmNlbGxQb3NPcmlnaW5hbFtpXS55O1xyXG4gICAgICAgICAgICAgICAgVHdlZW5MaXRlLnRvKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3BpblRyaWNrQ2VsbHNbaV0uc3RhZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgMC41LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeTogdGhpcy5zcGluVHJpY2tDZWxsc1tpXS5zdGFnZS55ICsgKHRoaXMucmVlbENlbGxIZWlnaHQgKiB0aGlzLm51bVJvd3MpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlYXNlOiBlYXNlVHlwZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAvLyBUd2VlbiBvbkNvbXBsZXRlIGNhbGxiYWNrIHRvIGJlIGFkZGVkIG9ubHkgdG8gb25lIFN5bWJvbC5cclxuICAgICAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IChpID09PSB0aGlzLm51bVJvd3MgLSAxKSA/IHRoaXMub25TcGluU3RvcC5iaW5kKHRoaXMpIDogbnVsbDtcclxuICAgICAgICAgICAgICAgIFR3ZWVuTGl0ZS50byhcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW2ldLnN0YWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIDAuNSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHRoaXMuY2VsbHNbaV0uc3RhZ2UueSArICh0aGlzLnJlZWxDZWxsSGVpZ2h0ICogdGhpcy5udW1Sb3dzKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWFzZTogZWFzZVR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU6IGNhbGxiYWNrXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uU3BpblN0b3A6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDAsIGogPSAwOyBpIDwgdGhpcy5udW1Sb3dzOyBpKyssIGorKyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwaW5Ucmlja0NlbGxzW2ldLnN0YWdlLnkgPSB0aGlzLmNlbGxQb3NPcmlnaW5hbFtqXS55O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGluVHJpY2tDZWxsc1tpXS5yZW1vdmVTeW1ib2woKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCB0aGlzLm51bVJvd3M7IGkrKywgaisrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2VsbHNbaV0uc3RhZ2UueSA9IHRoaXMuY2VsbFBvc09yaWdpbmFsW2pdLnk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW2ldLnVwZGF0ZVN5bWJvbCh0aGlzLnJlc3VsdFJlZWxbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UuZW1pdChzbG90LnZpZXcuZXZlbnQuVmlld0V2ZW50cy5SRUVMX1NQSU5fRU5ELCB0aGlzLnJlZWxJbmRleCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT2Zmc2NyZWVuIGNlbGxzIGFyZSB0aGUgb25lcyB3aGljaCBhcmUgYmVsb3cgdGhlIHJlZWwgYXJlYVxyXG4gICAgICAgICAqIE9uZSBvZiB0aGUgY2VsbCBzZXQsIGVpdGhlciB0aGUgYWN0dWFsIHJlc3VsdCBjZWxsIHNldCxcclxuICAgICAgICAgKiBvciB0aGUgdHJpY2sgY2VsbCBzZXQgaXMgcmV0dXJuZWQgYXMgYW4gYXJyYXlcclxuICAgICAgICAgKiBAcmV0dXJucyB7bnVsbH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXRPZmZTY3JlZW5DZWxsczogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyIG9mZlNjcmVlbkNlbGxzID0gW107XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDAsIGogPSAwOyBpIDwgdGhpcy5udW1Sb3dzOyBpKyssIGorKyl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNwaW5Ucmlja0NlbGxzW2ldLnN0YWdlLnkgPCAwIHx8IHRoaXMuc3BpblRyaWNrQ2VsbHNbaV0uc3RhZ2UueSA+IHRoaXMucmVlbEhlaWdodCl7XHJcbiAgICAgICAgICAgICAgICAgICAgb2ZmU2NyZWVuQ2VsbHMucHVzaCh0aGlzLnNwaW5Ucmlja0NlbGxzW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuY2VsbHNbaV0uc3RhZ2UueSA8IDAgfHwgdGhpcy5jZWxsc1tpXS5zdGFnZS55ID4gdGhpcy5yZWVsSGVpZ2h0KXtcclxuICAgICAgICAgICAgICAgICAgICBvZmZTY3JlZW5DZWxscy5wdXNoKHRoaXMuY2VsbHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBvZmZTY3JlZW5DZWxscztcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzdG9wQW5kVXBkYXRlU3ltYm9sczogZnVuY3Rpb24ocmVzdWx0KXtcclxuICAgICAgICAgICAgdGhpcy5yZXN1bHRSZWVsID0gcmVzdWx0O1xyXG4gICAgICAgICAgICB0aGlzLmlzUmVzdWx0UmVjZWl2ZWQgPSB0cnVlO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHVwZGF0ZVN5bWJvbHNXaXRob3V0U3BpbjogZnVuY3Rpb24ocmVzdWx0KXtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMubnVtUm93czsgaSsrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2VsbHNbaV0udXBkYXRlU3ltYm9sKHJlc3VsdFtpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoYW5kbGVSZXNpemU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogJ1JlZWwnXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBSZWVsQ2VsbFxyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3Qudmlldy5jb21wb25lbnQuUmVlbENlbGwnLFxyXG4gICAgICAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UgPSBuZXcgUElYSS5Db250YWluZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvLyBTdGFnZSBNZW1iZXJzXHJcbiAgICAgICAgc3RhZ2U6IG51bGwsXHJcbiAgICAgICAgc3ltYm9sOiBudWxsLFxyXG5cclxuICAgICAgICBzeW1ib2xJRDogbnVsbCxcclxuICAgICAgICByZXNvdXJjZXM6IG51bGwsXHJcblxyXG4gICAgICAgIC8vIEFsbCBwb3NzaWJsZSBzeW1ib2xzXHJcbiAgICAgICAgbnVtU3ltYm9sczogbnVsbCxcclxuICAgICAgICBzeW1ib2xzOiBudWxsLFxyXG5cclxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlc291cmNlcyA9IGRhdGEucmVzb3VyY2VzO1xyXG4gICAgICAgICAgICB0aGlzLm51bVN5bWJvbHMgPSBkYXRhLmdhbWVDb25maWdWTy5udW1TeW1ib2xzO1xyXG4gICAgICAgICAgICB0aGlzLnN5bWJvbHMgPSBkYXRhLmdhbWVDb25maWdWTy5nZXRTeW1ib2xzKCk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHVwZGF0ZVN5bWJvbDogZnVuY3Rpb24oc3ltYm9sSUQpe1xyXG4gICAgICAgICAgICB0aGlzLnN5bWJvbElEID0gc3ltYm9sSUQ7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlU3ltYm9sKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3ltYm9sID0gbmV3IFBJWEkuU3ByaXRlKHRoaXMucmVzb3VyY2VzW3N5bWJvbElEXS50ZXh0dXJlKTtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLnN5bWJvbCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlV2l0aFJhbmRvbVN5bWJvbDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVTeW1ib2wodGhpcy5zeW1ib2xzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMubnVtU3ltYm9scyldKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZW1vdmVTeW1ib2w6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc3ltYm9sKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcy5zeW1ib2wpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGFuZGxlUmVzaXplOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdSZWVsQ2VsbCdcclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2NcclxuICogQGNsYXNzICAgICAgIFJlZWxDb250YWluZXJcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LnZpZXcuY29tcG9uZW50LlJlZWxDb250YWluZXInLFxyXG4gICAgICAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UgPSBuZXcgUElYSS5Db250YWluZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvLyBTdGFnZSBNZW1iZXJzXHJcbiAgICAgICAgc3RhZ2U6IG51bGwsXHJcbiAgICAgICAgYmdSZWN0OiBudWxsLFxyXG5cclxuICAgICAgICBudW1SZWVsczogbnVsbCxcclxuICAgICAgICBudW1Sb3dzOiBudWxsLFxyXG4gICAgICAgIHdpZHRoOiBudWxsLFxyXG4gICAgICAgIGhlaWdodDogbnVsbCxcclxuXHJcbiAgICAgICAgcmVlbHM6IG51bGwsXHJcblxyXG4gICAgICAgIGlzU3Bpbm5pbmc6IG51bGwsXHJcbiAgICAgICAgcmVlbFNwaW5EZWxheTogbnVsbCxcclxuICAgICAgICBtaW5TcGluRHVyYXRpb246IG51bGwsXHJcbiAgICAgICAgbWluU3BpbkR1cmF0aW9uRWxhcHNlZDogbnVsbCxcclxuICAgICAgICByZXN1bHRNYXRyaXhSZWNlaXZlZDogbnVsbCxcclxuICAgICAgICByZXN1bHRNYXRyaXg6IG51bGwsXHJcblxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubnVtUmVlbHMgPSBkYXRhLmdhbWVDb25maWdWTy5udW1SZWVscztcclxuICAgICAgICAgICAgdGhpcy5udW1Sb3dzID0gZGF0YS5nYW1lQ29uZmlnVk8ubnVtUm93cztcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWluU3BpbkR1cmF0aW9uID0gZGF0YS51aUNvbmZpZ1ZPLm1pblNwaW5EdXJhdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5yZWVsU3BpbkRlbGF5ID0gZGF0YS51aUNvbmZpZ1ZPLnJlZWxTcGluRGVsYXk7XHJcblxyXG4gICAgICAgICAgICAvLyBDYWxjdWxhdGluZyBzaXplIG9mIHdob2xlIHJlZWwgYXJlYSB1c2luZyB2YWx1ZXMgcHJvdmlkZWQgaW4gY29uZmlnXHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPVxyXG4gICAgICAgICAgICAgICAgKHRoaXMubnVtUmVlbHMgKiBkYXRhLnVpQ29uZmlnVk8uc3ltYm9sV2lkdGgpICtcclxuICAgICAgICAgICAgICAgICgodGhpcy5udW1SZWVscyAtIDEpICogZGF0YS51aUNvbmZpZ1ZPLnJlZWxIU2VwYXJhdG9yKSArXHJcbiAgICAgICAgICAgICAgICAoZGF0YS51aUNvbmZpZ1ZPLnJlZWxIUGFkZGluZyAqIDIpO1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9XHJcbiAgICAgICAgICAgICAgICAodGhpcy5udW1Sb3dzICogZGF0YS51aUNvbmZpZ1ZPLnN5bWJvbEhlaWdodCkgK1xyXG4gICAgICAgICAgICAgICAgKCh0aGlzLm51bVJvd3MgLSAxKSAqIGRhdGEudWlDb25maWdWTy5yZWVsVlNlcGFyYXRvcikgK1xyXG4gICAgICAgICAgICAgICAgKGRhdGEudWlDb25maWdWTy5yZWVsVlBhZGRpbmcgKiAyKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFdoaXRlIHJvdW5kZWQgcmVjdGFuZ2xlIGJlaGluZCB0aGUgd2hvbGUgcmVlbCBhcmVhXHJcbiAgICAgICAgICAgIHRoaXMuYmdSZWN0ID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcclxuICAgICAgICAgICAgdGhpcy5iZ1JlY3QuYmVnaW5GaWxsKDB4RkZGRkZGKTtcclxuICAgICAgICAgICAgdGhpcy5iZ1JlY3QuZHJhd1JvdW5kZWRSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAxNSk7XHJcbiAgICAgICAgICAgIHRoaXMuYmdSZWN0LmFscGhhID0gMC42O1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuYmdSZWN0KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlUmVlbHMoZGF0YSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLnkgKz0gNTA7XHJcblxyXG4gICAgICAgICAgICBQWFJvb3QuYWRkQ2hpbGQodGhpcy5zdGFnZSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY3JlYXRlUmVlbHM6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgdmFyIHhwID0gZGF0YS51aUNvbmZpZ1ZPLnJlZWxIUGFkZGluZztcclxuICAgICAgICAgICAgdmFyIHlwID0gZGF0YS51aUNvbmZpZ1ZPLnJlZWxWUGFkZGluZztcclxuICAgICAgICAgICAgdGhpcy5yZWVscyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5udW1SZWVsczsgaSsrKXtcclxuICAgICAgICAgICAgICAgIHZhciByZWVsID0gbmV3IHNsb3Qudmlldy5jb21wb25lbnQuUmVlbCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZChyZWVsLnN0YWdlKTtcclxuICAgICAgICAgICAgICAgIHJlZWwuaW5pdChpLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgIHJlZWwuc3RhZ2UueCA9IHhwO1xyXG4gICAgICAgICAgICAgICAgcmVlbC5zdGFnZS55ID0geXA7XHJcbiAgICAgICAgICAgICAgICByZWVsLnN0YWdlLm1hc2sgPSB0aGlzLmNyZWF0ZU1hc2tPYmplY3QoeHAsIHlwLCByZWVsLndpZHRoLCByZWVsLmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICByZWVsLnN0YWdlLm9uKFxyXG4gICAgICAgICAgICAgICAgICAgIHNsb3Qudmlldy5ldmVudC5WaWV3RXZlbnRzLlJFRUxfU1BJTl9FTkQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblJlZWxTdG9wLmJpbmQodGhpcylcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZWxzLnB1c2gocmVlbCk7XHJcbiAgICAgICAgICAgICAgICB4cCArPSBkYXRhLnVpQ29uZmlnVk8uc3ltYm9sV2lkdGggKyBkYXRhLnVpQ29uZmlnVk8ucmVlbEhTZXBhcmF0b3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjcmVhdGVNYXNrT2JqZWN0OiBmdW5jdGlvbih4LCB5LCB3LCBoKXtcclxuICAgICAgICAgICAgLy8gUm91bmRlZCByZWN0YW5nbGUgb24gdG9wIG9mIGVhY2ggcmVlbCBmb3IgbWFza1xyXG4gICAgICAgICAgICB2YXIgbWFzayA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XHJcbiAgICAgICAgICAgIG1hc2suYmVnaW5GaWxsKDB4MkI2RjFBKTtcclxuICAgICAgICAgICAgbWFzay5kcmF3Um91bmRlZFJlY3QoeCwgeSwgdywgaCwgMTApO1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKG1hc2spO1xyXG4gICAgICAgICAgICByZXR1cm4gbWFzaztcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzcGluOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzU3Bpbm5pbmcpIHtcclxuICAgICAgICAgICAgICAgIHRocm93KG5ldyBFcnJvcihcIkNhbm5vdCBzdGFydCBuZXcgc3Bpbi4gQWxyZWFkeSBzcGlubmluZy5cIikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNTcGlubmluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubWluU3BpbkR1cmF0aW9uRWxhcHNlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnJlc3VsdE1hdHJpeFJlY2VpdmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLm51bVJlZWxzOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZWxzW2ldLnNwaW4uYmluZCh0aGlzLnJlZWxzW2ldKSxcclxuICAgICAgICAgICAgICAgICAgICBpICogdGhpcy5yZWVsU3BpbkRlbGF5ICogMTAwMFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMuZWxhcHNlTWluU3BpbkR1cmF0aW9uLmJpbmQodGhpcyksIHRoaXMubWluU3BpbkR1cmF0aW9uICogMTAwMCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZWxhcHNlTWluU3BpbkR1cmF0aW9uOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLm1pblNwaW5EdXJhdGlvbkVsYXBzZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVN5bWJvbHNJZlJlYWR5KCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3RvcEFuZFVwZGF0ZVN5bWJvbHM6IGZ1bmN0aW9uKHJlc3VsdCl7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLmlzU3Bpbm5pbmcpIHtcclxuICAgICAgICAgICAgICAgIHRocm93KG5ldyBFcnJvcihcIkNhbm5vdCB1cGRhdGUgc3ltYm9scy4gUmVlbHMgbm90IHNwaW5uaW5nLiBcIiArXHJcbiAgICAgICAgICAgICAgICBcIlVzZSB1cGRhdGVTeW1ib2xzV2l0aG91dFNwaW4gbWV0aG9kIHRvIHVwZGF0ZSBzeW1ib2xzIHdoZW4gbm90IHNwaW5uaW5nLlwiKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5yZXN1bHRNYXRyaXggPSByZXN1bHQ7XHJcbiAgICAgICAgICAgIHRoaXMucmVzdWx0TWF0cml4UmVjZWl2ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVN5bWJvbHNJZlJlYWR5KCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhlIG1ldGhvZCB1cGRhdGVTeW1ib2xzSWZSZWFkeSBtYWtlcyBzdXJlIHRoYXQgdGhlIHJlZWxzIGhhdmUgc3B1biBmb3IgdGhlXHJcbiAgICAgICAgICogbWluaW11bSByZXF1aXJlZCBkdXJhdGlvbiBhbmQgYWxzbyB2ZXJpZmllcyBpZiBzcGluIHJlc3VsdCBoYXYgYmVlbiByZWNlaXZlZFxyXG4gICAgICAgICAqIGJ5IHZlcmlmeWluZyB0aGF0IHRoZSBhc3NvY2lhdGVkIGZsYWdzIGFyZSB0cnVlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogVGhpcyBtZXRob2QgaXMgaW52b2tlZCB3aGVuIHJlc3VsdHMgYXJlIHJlY2VpdmVkIGFuZCB3aGVuIG1pbmltdW0gc3BpbiBkdXJhdGlvblxyXG4gICAgICAgICAqIGVsYXBlcy4gVGhpcyBmdW5jdGlvbiB2ZXJpZmllcyBib3RoIGFuZCB0aGVuIHByb2NlZWRzIGJ5IHByb3ZpZGlubmcgaW5kaXZpZHVhbFxyXG4gICAgICAgICAqIHJlZWxzIHdpdGggdGhlaXIgc3ltYm9scy5cclxuICAgICAgICAgKi9cclxuICAgICAgICB1cGRhdGVTeW1ib2xzSWZSZWFkeTogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYodGhpcy5taW5TcGluRHVyYXRpb25FbGFwc2VkICYmIHRoaXMucmVzdWx0TWF0cml4UmVjZWl2ZWQpe1xyXG4gICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMubnVtUmVlbHM7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWVsc1tpXS5zdG9wQW5kVXBkYXRlU3ltYm9scy5iaW5kKHRoaXMucmVlbHNbaV0sIHRoaXMucmVzdWx0TWF0cml4W2ldKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaSAqIHRoaXMucmVlbFNwaW5EZWxheSAqIDEwMDBcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlU3ltYm9sc1dpdGhvdXRTcGluOiBmdW5jdGlvbihyZXN1bHQpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzU3Bpbm5pbmcpIHtcclxuICAgICAgICAgICAgICAgIHRocm93KG5ldyBFcnJvcihcIkNhbm5vdCB1cGRhdGUgd2l0aG91dCBzcGluLiBBbHJlYWR5IHNwaW5uaW5nLlwiKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMubnVtUmVlbHM7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZWxzW2ldLnVwZGF0ZVN5bWJvbHNXaXRob3V0U3BpbihyZXN1bHRbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25SZWVsU3RvcDogZnVuY3Rpb24ocmVlbElEKXtcclxuICAgICAgICAgICAgaWYocmVlbElEID09PSB0aGlzLm51bVJlZWxzIC0gMSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzU3Bpbm5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhZ2UuZW1pdChzbG90LnZpZXcuZXZlbnQuVmlld0V2ZW50cy5SRUVMX1NQSU5fRU5EKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGhhbmRsZVJlc2l6ZTogZnVuY3Rpb24gKHdpbmRvd1NpemVWTykge1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogJ1JlZWxDb250YWluZXInXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBXaW5MaW5lc1xyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3Qudmlldy5jb21wb25lbnQuV2luTGluZXMnLFxyXG4gICAgICAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UgPSBuZXcgUElYSS5Db250YWluZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvLyBTdGFnZSBNZW1iZXJzXHJcbiAgICAgICAgc3RhZ2U6IG51bGwsXHJcbiAgICAgICAgbGluZXM6IG51bGwsXHJcblxyXG4gICAgICAgIHZpc2libGVMaW5lOiBudWxsLFxyXG5cclxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZExpbmVzKGRhdGEpO1xyXG4gICAgICAgICAgICB0aGlzLmhpZGVBbGxMaW5lcygpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFkZExpbmVzOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICAgdGhpcy5saW5lcyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgdmFyIGxpbmVQb2ludHMgPSBkYXRhLnVpQ29uZmlnVk8ubGluZVBvaW50cztcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGxpbmVQb2ludHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgdmFyIGxpbmUgPSBsaW5lUG9pbnRzW2ldO1xyXG4gICAgICAgICAgICAgICAgdmFyIGxpbmVHcmFwaGljID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcclxuICAgICAgICAgICAgICAgIGxpbmVHcmFwaGljLmxpbmVTdHlsZSg1LCAweEE4MUMxRCk7XHJcbiAgICAgICAgICAgICAgICBsaW5lR3JhcGhpYy5tb3ZlVG8obGluZVswXVswXSwgbGluZVswXVsxXSk7XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGogPSAxOyBqIDwgbGluZS5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZUdyYXBoaWMubGluZVRvKGxpbmVbal1bMF0sIGxpbmVbal1bMV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGluZUdyYXBoaWMuZW5kRmlsbCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZChsaW5lR3JhcGhpYyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmVzLnB1c2gobGluZUdyYXBoaWMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2hvd0xpbmU6IGZ1bmN0aW9uKGxpbmVOdW1iZXIpe1xyXG4gICAgICAgICAgICBpZih0aGlzLnZpc2libGVMaW5lKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJsZUxpbmUudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudmlzaWJsZUxpbmUgPSB0aGlzLmxpbmVzW2xpbmVOdW1iZXJdO1xyXG4gICAgICAgICAgICB0aGlzLnZpc2libGVMaW5lLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGhpZGVBbGxMaW5lczogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGluZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saW5lc1tpXS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoYW5kbGVSZXNpemU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogJ1dpbkxpbmVzJ1xyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgVmlld0V2ZW50c1xyXG4gKi9cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogXCJzbG90LnZpZXcuZXZlbnQuVmlld0V2ZW50c1wiXHJcbiAgICB9LFxyXG5cclxuICAgIHt9LFxyXG5cclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgU1BJTl9DTElDSzogICAgICAgICBcIlZpZXdFdmVudHNfc3Bpbl9jbGlja1wiLFxyXG4gICAgICAgIFJFRUxfU1BJTl9FTkQ6ICAgICAgXCJWaWV3RXZlbnRzX3JlZWxfc3Bpbl9lbmRcIlxyXG4gICAgfVxyXG4pOyIsIi8qKlxyXG4gKiBTbG90IGdhbWUgZGVtbyAtIFB1cmUgTVZDLCBQaXhpLmpzIHY0XHJcbiAqIEBhdXRob3IgICAgICBNdXJhbGkgU2FyaXBhbGxpXHJcbiAqIEBkZXNjXHJcbiAqIEBjbGFzcyAgICAgICBCR01lZGlhdG9yXHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC52aWV3Lm1lZGlhdG9yLkJHTWVkaWF0b3InLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5NZWRpYXRvclxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLy8gUmVmZXJlbmNlc1xyXG4gICAgICAgIHdpbmRvd1NpemVQcm94eTogbnVsbCxcclxuXHJcbiAgICAgICAgLy8gTm90aWZpY2F0aW9ucyB0aGlzIG1lZGlhdG9yIGlzIGludGVyZXN0ZWQgaW5cclxuICAgICAgICBsaXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbG90LkFwcENvbnN0YW50cy5XSU5ET1dfUkVTSVpFRCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xvdC5BcHBDb25zdGFudHMuQVNTRVRTX0xPQURFRFxyXG4gICAgICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25SZWdpc3RlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFZpZXdDb21wb25lbnQoIG5ldyBzbG90LnZpZXcuY29tcG9uZW50LkJHKCkgKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMud2luZG93U2l6ZVByb3h5ID0gdGhpcy5mYWNhZGUucmV0cmlldmVQcm94eShzbG90Lm1vZGVsLnByb3h5LldpbmRvd1NpemVQcm94eS5OQU1FKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBIYW5kbGUgbm90aWZpY2F0aW9ucyBmcm9tIG90aGVyIFB1cmVNVkMgYWN0b3JzXHJcbiAgICAgICAgaGFuZGxlTm90aWZpY2F0aW9uOiBmdW5jdGlvbiAobm90ZSkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKCBub3RlLmdldE5hbWUoKSApIHtcclxuICAgICAgICAgICAgICAgIGNhc2Ugc2xvdC5BcHBDb25zdGFudHMuV0lORE9XX1JFU0laRUQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LmhhbmRsZVJlc2l6ZShub3RlLmdldEJvZHkoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHNsb3QuQXBwQ29uc3RhbnRzLkFTU0VUU19MT0FERUQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LmluaXQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlczogbm90ZS5nZXRCb2R5KCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dTaXplVk86IHRoaXMud2luZG93U2l6ZVByb3h5LndpbmRvd1NpemVWT1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBOQU1FOiAnQkdNZWRpYXRvcidcclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2NcclxuICogQGNsYXNzICAgICAgIFBhbmVsTWVkaWF0b3JcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LnZpZXcubWVkaWF0b3IuUGFuZWxNZWRpYXRvcicsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLk1lZGlhdG9yXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvLyBSZWZlcmVuY2VzXHJcbiAgICAgICAgd2luZG93U2l6ZVByb3h5OiBudWxsLFxyXG4gICAgICAgIGNvbmZpZ1Byb3h5OiBudWxsLFxyXG4gICAgICAgIHNlcnZlclByb3h5OiBudWxsLFxyXG5cclxuICAgICAgICAvLyBOb3RpZmljYXRpb25zIHRoaXMgbWVkaWF0b3IgaXMgaW50ZXJlc3RlZCBpbiBcclxuICAgICAgICBsaXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICBzbG90LkFwcENvbnN0YW50cy5XSU5ET1dfUkVTSVpFRCxcclxuICAgICAgICAgICAgICAgIHNsb3QuQXBwQ29uc3RhbnRzLkFTU0VUU19MT0FERUQsXHJcbiAgICAgICAgICAgICAgICBzbG90LkFwcENvbnN0YW50cy5TUElOX0VORFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uUmVnaXN0ZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRWaWV3Q29tcG9uZW50KG5ldyBzbG90LnZpZXcuY29tcG9uZW50LlBhbmVsKCkpO1xyXG4gICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQuc3RhZ2Uub24oXHJcbiAgICAgICAgICAgICAgICBzbG90LnZpZXcuZXZlbnQuVmlld0V2ZW50cy5TUElOX0NMSUNLLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5vblNwaW5DbGljay5iaW5kKHRoaXMpXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLndpbmRvd1NpemVQcm94eSA9IHRoaXMuZmFjYWRlLnJldHJpZXZlUHJveHkoc2xvdC5tb2RlbC5wcm94eS5XaW5kb3dTaXplUHJveHkuTkFNRSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlnUHJveHkgPSB0aGlzLmZhY2FkZS5yZXRyaWV2ZVByb3h5KHNsb3QubW9kZWwucHJveHkuQ29uZmlnUHJveHkuTkFNRSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VydmVyUHJveHkgPSB0aGlzLmZhY2FkZS5yZXRyaWV2ZVByb3h5KHNsb3QubW9kZWwucHJveHkuU2VydmVyUHJveHkuTkFNRSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25TcGluQ2xpY2s6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihzbG90LkFwcENvbnN0YW50cy5TUElOKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBIYW5kbGUgbm90aWZpY2F0aW9ucyBmcm9tIG90aGVyIFB1cmVNVkMgYWN0b3JzXHJcbiAgICAgICAgaGFuZGxlTm90aWZpY2F0aW9uOiBmdW5jdGlvbiAobm90ZSkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKCBub3RlLmdldE5hbWUoKSApIHtcclxuICAgICAgICAgICAgICAgIGNhc2Ugc2xvdC5BcHBDb25zdGFudHMuV0lORE9XX1JFU0laRUQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LmhhbmRsZVJlc2l6ZShub3RlLmdldEJvZHkoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHNsb3QuQXBwQ29uc3RhbnRzLkFTU0VUU19MT0FERUQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LmluaXQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlczogbm90ZS5nZXRCb2R5KCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYW1lQ29uZmlnVk86IHRoaXMuY29uZmlnUHJveHkuZ2FtZUNvbmZpZ1ZPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlDb25maWdWTzogdGhpcy5jb25maWdQcm94eS51aUNvbmZpZ1ZPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93U2l6ZVZPOiB0aGlzLndpbmRvd1NpemVQcm94eS53aW5kb3dTaXplVk9cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LnVwZGF0ZUJhbGFuY2UodGhpcy5zZXJ2ZXJQcm94eS5yZXN1bHRWTy5iYWxhbmNlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2Ugc2xvdC5BcHBDb25zdGFudHMuU1BJTl9FTkQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdFZPID0gbm90ZS5nZXRCb2R5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LmVuYWJsZUJldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld0NvbXBvbmVudC5lbmFibGVTcGluKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LnVwZGF0ZUJhbGFuY2UodGhpcy5zZXJ2ZXJQcm94eS5yZXN1bHRWTy5iYWxhbmNlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQudXBkYXRlV2luKHRoaXMuc2VydmVyUHJveHkucmVzdWx0Vk8udG90YWxXaW4pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdQYW5lbE1lZGlhdG9yJ1xyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgUmVlbENvbnRhaW5lck1lZGlhdG9yXHJcbiAqL1xyXG5wdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnc2xvdC52aWV3Lm1lZGlhdG9yLlJlZWxDb250YWluZXJNZWRpYXRvcicsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLk1lZGlhdG9yXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvLyBSZWZlcmVuY2VzXHJcbiAgICAgICAgd2luZG93U2l6ZVByb3h5OiBudWxsLFxyXG4gICAgICAgIGNvbmZpZ1Byb3h5OiBudWxsLFxyXG4gICAgICAgIHNlcnZlclByb3h5OiBudWxsLFxyXG5cclxuICAgICAgICAvLyBBZGRpdGlvbmFsIHZpZXdzXHJcbiAgICAgICAgd2luTGluZXNWaWV3OiBudWxsLFxyXG5cclxuICAgICAgICAvLyBOb3RpZmljYXRpb25zIHRoaXMgbWVkaWF0b3IgaXMgaW50ZXJlc3RlZCBpbiBcclxuICAgICAgICBsaXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICBzbG90LkFwcENvbnN0YW50cy5XSU5ET1dfUkVTSVpFRCxcclxuICAgICAgICAgICAgICAgIHNsb3QuQXBwQ29uc3RhbnRzLkFTU0VUU19MT0FERUQsXHJcbiAgICAgICAgICAgICAgICBzbG90LkFwcENvbnN0YW50cy5TUElOLFxyXG4gICAgICAgICAgICAgICAgc2xvdC5BcHBDb25zdGFudHMuU1BJTl9SRVNVTFQsXHJcbiAgICAgICAgICAgICAgICBzbG90LkFwcENvbnN0YW50cy5XSU5fQU5OT1VOQ0VNRU5ULFxyXG4gICAgICAgICAgICAgICAgc2xvdC5BcHBDb25zdGFudHMuQ0xFQVJfV0lOX0FOTk9VTkNFTUVOVFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uUmVnaXN0ZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRWaWV3Q29tcG9uZW50KG5ldyBzbG90LnZpZXcuY29tcG9uZW50LlJlZWxDb250YWluZXIoKSk7XHJcbiAgICAgICAgICAgIHRoaXMudmlld0NvbXBvbmVudC5zdGFnZS5vbihcclxuICAgICAgICAgICAgICAgIHNsb3Qudmlldy5ldmVudC5WaWV3RXZlbnRzLlJFRUxfU1BJTl9FTkQsXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uUmVlbFNwaW5FbmQuYmluZCh0aGlzKVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy53aW5MaW5lc1ZpZXcgPSBuZXcgc2xvdC52aWV3LmNvbXBvbmVudC5XaW5MaW5lcygpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy53aW5kb3dTaXplUHJveHkgPSB0aGlzLmZhY2FkZS5yZXRyaWV2ZVByb3h5KHNsb3QubW9kZWwucHJveHkuV2luZG93U2l6ZVByb3h5Lk5BTUUpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZ1Byb3h5ID0gdGhpcy5mYWNhZGUucmV0cmlldmVQcm94eShzbG90Lm1vZGVsLnByb3h5LkNvbmZpZ1Byb3h5Lk5BTUUpO1xyXG4gICAgICAgICAgICB0aGlzLnNlcnZlclByb3h5ID0gdGhpcy5mYWNhZGUucmV0cmlldmVQcm94eShzbG90Lm1vZGVsLnByb3h5LlNlcnZlclByb3h5Lk5BTUUpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uUmVlbFNwaW5FbmQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihzbG90LkFwcENvbnN0YW50cy5TUElOX0VORCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gSGFuZGxlIG5vdGlmaWNhdGlvbnMgZnJvbSBvdGhlciBQdXJlTVZDIGFjdG9yc1xyXG4gICAgICAgIGhhbmRsZU5vdGlmaWNhdGlvbjogZnVuY3Rpb24gKG5vdGUpIHtcclxuICAgICAgICAgICAgc3dpdGNoICggbm90ZS5nZXROYW1lKCkgKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHNsb3QuQXBwQ29uc3RhbnRzLldJTkRPV19SRVNJWkVEOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld0NvbXBvbmVudC5oYW5kbGVSZXNpemUobm90ZS5nZXRCb2R5KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBzbG90LkFwcENvbnN0YW50cy5BU1NFVFNfTE9BREVEOlxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZXM6IG5vdGUuZ2V0Qm9keSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnYW1lQ29uZmlnVk86IHRoaXMuY29uZmlnUHJveHkuZ2FtZUNvbmZpZ1ZPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1aUNvbmZpZ1ZPOiB0aGlzLmNvbmZpZ1Byb3h5LnVpQ29uZmlnVk8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd1NpemVWTzogdGhpcy53aW5kb3dTaXplUHJveHkud2luZG93U2l6ZVZPXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld0NvbXBvbmVudC5pbml0KGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld0NvbXBvbmVudC51cGRhdGVTeW1ib2xzV2l0aG91dFNwaW4odGhpcy5zZXJ2ZXJQcm94eS5yZXN1bHRWTy5nZXRTeW1ib2xNYXRyaXgoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aW5MaW5lc1ZpZXcuaW5pdChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQuc3RhZ2UuYWRkQ2hpbGQodGhpcy53aW5MaW5lc1ZpZXcuc3RhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBzbG90LkFwcENvbnN0YW50cy5TUElOOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld0NvbXBvbmVudC5zcGluKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHNsb3QuQXBwQ29uc3RhbnRzLlNQSU5fUkVTVUxUOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld0NvbXBvbmVudC5zdG9wQW5kVXBkYXRlU3ltYm9scyhub3RlLmdldEJvZHkoKS5nZXRTeW1ib2xNYXRyaXgoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHNsb3QuQXBwQ29uc3RhbnRzLldJTl9BTk5PVU5DRU1FTlQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aW5MaW5lc1ZpZXcuc2hvd0xpbmUobm90ZS5nZXRCb2R5KCkubGluZU51bWJlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHNsb3QuQXBwQ29uc3RhbnRzLkNMRUFSX1dJTl9BTk5PVU5DRU1FTlQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aW5MaW5lc1ZpZXcuaGlkZUFsbExpbmVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogJ1JlZWxDb250YWluZXJNZWRpYXRvcidcclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIFNsb3QgZ2FtZSBkZW1vIC0gUHVyZSBNVkMsIFBpeGkuanMgdjRcclxuICogQGF1dGhvciAgICAgIE11cmFsaSBTYXJpcGFsbGlcclxuICogQGRlc2NcclxuICogQGNsYXNzICAgICAgIFdpbkFubm91bmNlTWVkaWF0b3JcclxuICovXHJcbnB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdzbG90LnZpZXcubWVkaWF0b3IuV2luQW5ub3VuY2VNZWRpYXRvcicsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLk1lZGlhdG9yXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvLyBSZWZlcmVuY2VzXHJcbiAgICAgICAgc2VydmVyUHJveHk6IG51bGwsXHJcbiAgICAgICAgY29uZmlnUHJveHk6IG51bGwsXHJcblxyXG4gICAgICAgIGN1cnJlbnRXaW46IG51bGwsXHJcbiAgICAgICAgaXNBbm5vdW5jaW5nOiBudWxsLFxyXG4gICAgICAgIHdpbkFubm91bmNlRGVsYXk6IG51bGwsXHJcbiAgICAgICAgcmVwZWF0Q291bnQ6IG51bGwsXHJcbiAgICAgICAgaW50ZXJ2YWxJRDogbnVsbCxcclxuXHJcbiAgICAgICAgLy8gTm90aWZpY2F0aW9ucyB0aGlzIG1lZGlhdG9yIGlzIGludGVyZXN0ZWQgaW4gXHJcbiAgICAgICAgbGlzdE5vdGlmaWNhdGlvbkludGVyZXN0czogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAgc2xvdC5BcHBDb25zdGFudHMuU1RBUlRfV0lOX0FOTk9VTkNFTUVOVFMsXHJcbiAgICAgICAgICAgICAgICBzbG90LkFwcENvbnN0YW50cy5TVE9QX1dJTl9BTk5PVU5DRU1FTlRTXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25SZWdpc3RlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlcnZlclByb3h5ID0gdGhpcy5mYWNhZGUucmV0cmlldmVQcm94eShzbG90Lm1vZGVsLnByb3h5LlNlcnZlclByb3h5Lk5BTUUpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZ1Byb3h5ID0gdGhpcy5mYWNhZGUucmV0cmlldmVQcm94eShzbG90Lm1vZGVsLnByb3h5LkNvbmZpZ1Byb3h5Lk5BTUUpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFubm91bmNlV2luOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZih0aGlzLnJlcGVhdENvdW50ID49IHRoaXMuY29uZmlnUHJveHkudWlDb25maWdWTy5yZXBlYXRXaW5Bbm5vdW5jZXMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcEFubm91bmNlbWVudEludGVydmFsKCk7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuaXNBbm5vdW5jaW5nKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihcclxuICAgICAgICAgICAgICAgICAgICBzbG90LkFwcENvbnN0YW50cy5XSU5fQU5OT1VOQ0VNRU5ULFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VydmVyUHJveHkucmVzdWx0Vk8ud2luc1t0aGlzLmN1cnJlbnRXaW5dXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5jdXJyZW50V2luIDwgdGhpcy5zZXJ2ZXJQcm94eS5yZXN1bHRWTy53aW5zLmxlbmd0aCAtIDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFdpbisrO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50V2luID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlcGVhdENvdW50Kys7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnRlcnZhbElEID0gc2V0VGltZW91dChcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFubm91bmNlV2luLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWdQcm94eS51aUNvbmZpZ1ZPLndpbkFubm91bmNlRGVsYXkgKiAxMDAwXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3RvcEFubm91bmNlbWVudEludGVydmFsOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWxJRClcclxuICAgICAgICAgICAgdGhpcy5pc0Fubm91bmNpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKHNsb3QuQXBwQ29uc3RhbnRzLkNMRUFSX1dJTl9BTk5PVU5DRU1FTlQpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIEhhbmRsZSBub3RpZmljYXRpb25zIGZyb20gb3RoZXIgUHVyZU1WQyBhY3RvcnNcclxuICAgICAgICBoYW5kbGVOb3RpZmljYXRpb246IGZ1bmN0aW9uIChub3RlKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoIG5vdGUuZ2V0TmFtZSgpICkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBzbG90LkFwcENvbnN0YW50cy5TVEFSVF9XSU5fQU5OT1VOQ0VNRU5UUzpcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnNlcnZlclByb3h5LnJlc3VsdFZPLndpbnMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElEKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRXaW4gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQW5ub3VuY2luZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVwZWF0Q291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFubm91bmNlV2luKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhc2Ugc2xvdC5BcHBDb25zdGFudHMuU1RPUF9XSU5fQU5OT1VOQ0VNRU5UUzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BBbm5vdW5jZW1lbnRJbnRlcnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdXaW5Bbm5vdW5jZU1lZGlhdG9yJ1xyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogU2xvdCBnYW1lIGRlbW8gLSBQdXJlIE1WQywgUGl4aS5qcyB2NFxyXG4gKiBAYXV0aG9yICAgICAgTXVyYWxpIFNhcmlwYWxsaVxyXG4gKiBAZGVzY1xyXG4gKiBAY2xhc3MgICAgICAgQXBwXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFBJWEkgZ2xvYmFsIHZhcmlhYmxlcyAqL1xyXG52YXIgUFhSb290LCBQWFJlbmRlcmVyO1xyXG5cclxucHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3Nsb3QuQXBwJyxcclxuICAgICAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjYWRlLnJlZ2lzdGVyQ29tbWFuZChzbG90LkFwcENvbnN0YW50cy5TVEFSVFVQLCBzbG90LmNvbnRyb2xsZXIuY29tbWFuZC5TdGFydHVwQ29tbWFuZCk7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjYWRlLnNlbmROb3RpZmljYXRpb24oc2xvdC5BcHBDb25zdGFudHMuU1RBUlRVUCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbG9hZGVyUHJveHkgPSB0aGlzLmZhY2FkZS5yZXRyaWV2ZVByb3h5KHNsb3QubW9kZWwucHJveHkuTG9hZGVyUHJveHkuTkFNRSk7XHJcbiAgICAgICAgICAgIGxvYWRlclByb3h5LmxvYWRBc3NldHMoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBTVEFSVFVQOiAnc3RhcnR1cCcsXHJcbiAgICAgICAgZmFjYWRlOiBwdXJlbXZjLkZhY2FkZS5nZXRJbnN0YW5jZSggc2xvdC5BcHBDb25zdGFudHMuQ09SRV9OQU1FIClcclxuICAgIH1cclxuKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
