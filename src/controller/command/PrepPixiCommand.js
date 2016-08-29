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
