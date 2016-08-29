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
