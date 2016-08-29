/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc        Resgiters proxys with facade
 * @class       PrepModelCommand
 */
puremvc.define(
    {
        name: 'slot.controller.command.PrepModelCommand',
        parent: puremvc.SimpleCommand
    },
  
    // INSTANCE MEMBERS
    {
        execute: function (note) {
            this.facade.registerProxy(new slot.model.proxy.LoaderProxy());
            this.facade.registerProxy(new slot.model.proxy.WindowSizeProxy());
            this.facade.registerProxy(new slot.model.proxy.ConfigProxy());
            this.facade.registerProxy(new slot.model.proxy.ServerProxy());
        }
    }    
);
