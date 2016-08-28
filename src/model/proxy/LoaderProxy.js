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