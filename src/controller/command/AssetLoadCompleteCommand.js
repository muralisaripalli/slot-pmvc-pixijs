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
