/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc        Handles sounds
 * @class       SoundPlayerMediator
 */
puremvc.define(
    {
        name: 'slot.view.mediator.SoundPlayerMediator',
        parent: puremvc.Mediator
    },

    // INSTANCE MEMBERS
    {
        // References
        sound: null,
        configProxy: null,

        // Notifications this mediator is interested in 
        listNotificationInterests: function () {
            return [
                slot.AppConstants.ASSET_LOAD_COMPLETE,
                slot.AppConstants.BET_UPDATED,
                slot.AppConstants.SPIN,
                slot.AppConstants.WIN_ANNOUNCEMENT
            ];
        },

        onRegister: function () {
            //this.setViewComponent( ... );

            this.configProxy = this.facade.retrieveProxy(slot.model.proxy.ConfigProxy.NAME);
        },

        // Handle notifications from other PureMVC actors
        handleNotification: function (note) {
            switch ( note.getName() ) {
                case slot.AppConstants.ASSET_LOAD_COMPLETE:
                    this.sound = note.getBody();
                    break;
                case slot.AppConstants.BET_UPDATED:
                    this.sound.play("bet");
                    break;
                case slot.AppConstants.SPIN:
                    this.sound.play("spin");
                    break;
                case slot.AppConstants.WIN_ANNOUNCEMENT:
                    if(!note.getBody().isRepeating) {
                        var winSymbol = note.getBody().win.symbol;
                        if (this.configProxy.gameConfigVO.isRoyalSymbol(winSymbol)) {
                            this.sound.play("win_royal");
                        } else {
                            this.sound.play("win_s" + winSymbol);
                        }
                    }
                    break;
            }
        }
    },

    // STATIC MEMBERS
    {
        NAME: 'SoundPlayerMediator'
    }
);
