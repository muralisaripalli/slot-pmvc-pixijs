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
