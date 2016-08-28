/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc
 * @class       BGMediator
 */
puremvc.define(
    {
        name: 'slot.view.mediator.BGMediator',
        parent: puremvc.Mediator
    },

    // INSTANCE MEMBERS
    {
        // References
        windowSizeProxy: null,

        // Notifications this mediator is interested in
        listNotificationInterests: function () {
            return  [
                        slot.AppConstants.WINDOW_RESIZED,
                        slot.AppConstants.ASSETS_LOADED
                    ];
        },

        onRegister: function () {
            this.setViewComponent( new slot.view.component.BG() );

            this.windowSizeProxy = this.facade.retrieveProxy(slot.model.proxy.WindowSizeProxy.NAME);
        },

        // Handle notifications from other PureMVC actors
        handleNotification: function (note) {
            switch ( note.getName() ) {
                case slot.AppConstants.WINDOW_RESIZED:
                    this.viewComponent.handleResize(note.getBody());
                    break;
                case slot.AppConstants.ASSETS_LOADED:
                    this.viewComponent.init(
                        {
                            resources: note.getBody().resources,
                            windowSizeVO: this.windowSizeProxy.windowSizeVO
                        }
                    );
                    break;
            }
        }
    },

    // STATIC MEMBERS
    {
        NAME: 'BGMediator'
    }
);
