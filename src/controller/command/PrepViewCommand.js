/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc        Registers all mediators with the facade
 * @class       PrepViewCommand
 */
puremvc.define (
    {
        name: 'slot.controller.command.PrepViewCommand',
        parent: puremvc.SimpleCommand
    },
 
    // INSTANCE MEMBERS
    {
        execute: function (note) {
            this.facade.registerMediator(new slot.view.mediator.BGMediator());
            this.facade.registerMediator(new slot.view.mediator.ReelContainerMediator());
            this.facade.registerMediator(new slot.view.mediator.WinAnnounceMediator());
            this.facade.registerMediator(new slot.view.mediator.SoundPlayerMediator());
            this.facade.registerMediator(new slot.view.mediator.PanelMediator());
            this.facade.registerMediator(new slot.view.mediator.PreloaderMediator());
        }
    }
);
