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
