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