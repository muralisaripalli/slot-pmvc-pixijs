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
