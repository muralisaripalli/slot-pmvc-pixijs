/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc
 * @class       PreloaderMediator
 */
puremvc.define(
    {
        name: 'slot.view.mediator.PreloaderMediator',
        parent: puremvc.Mediator
    },

    // INSTANCE MEMBERS
    {
        // References
        windowSizeProxy: null,

        // Notifications this mediator is interested in 
        listNotificationInterests: function () {
            return [
                slot.AppConstants.ASSET_LOAD_BEGIN,
                slot.AppConstants.ASSET_LOAD_COMPLETE
            ];
        },

        onRegister: function () {
            this.setViewComponent(new slot.view.component.Preloader());
            this.windowSizeProxy = this.facade.retrieveProxy(slot.model.proxy.WindowSizeProxy.NAME);
        },

        // Handle notifications from other PureMVC actors
        handleNotification: function (note) {
            switch ( note.getName() ) {
                case slot.AppConstants.ASSET_LOAD_COMPLETE:
                    this.viewComponent.hide();
                    break;
                case slot.AppConstants.ASSET_LOAD_BEGIN:
                    this.viewComponent.init(this.windowSizeProxy.windowSizeVO);
                    break;
            }
        }
    },

    // STATIC MEMBERS
    {
        NAME: 'PreloaderMediator'
    }
);
