/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc        Win announcements start now
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
