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