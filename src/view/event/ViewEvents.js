/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc
 * @class       ViewEvents
 */
puremvc.define(
    {
        name: "slot.view.event.ViewEvents"
    },

    {},

    // STATIC MEMBERS
    {
        CLICK:              ('ontouchstart' in window) ? "tap" : "click",
        SPIN_CLICK:         "ViewEvents_spin_click",
        REEL_SPIN_END:      "ViewEvents_reel_spin_end",
        BET_CLICK:          "ViewEvents_bet_click"
    }
);