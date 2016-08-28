/**
 * Slot game demo - Pure MVC, Pixi.js v4
 * @author      Murali Saripalli
 * @desc
 * @class       Utils
 */
puremvc.define(
    {
        name: 'slot.model.lib.Utils'
    },

    // INSTANCE MEMBERS
    {
        fitContentOnScreen: function(o){
            var content = o.content;
            var contentDimensions = o.contentDimensions || o.content;

            var size = slot.model.lib.Utils.getSizeToFitScreen(
                contentDimensions,
                {
                    width: o.screen.width,
                    height: o.screen.height
                }
            );
            content.x = o.screen.x + ((o.screen.width - size.width)/2);
            content.y = o.screen.y + ((o.screen.height - size.height)/2);
            content.width = size.width;
            content.height = size.height;
        }

    },

    // STATIC MEMBERS
    {
        NAME: "Utils",

        getOrientation: function(width, height){
            return  (width > height) ?
                        slot.model.enum.ORIENTATION.LANDSCAPE:
                        slot.model.enum.ORIENTATION.PORTRAIT;
        },

        getSizeToFillScreen: function(content, screen){
            if((screen.width/screen.height) > (content.width/content.height)){
                return  {
                            width: screen.width,
                            height: content.height * (screen.width/content.width)
                        };
            }
            else{
                return  {
                    width: content.width * (screen.height/content.height),
                    height: screen.height
                };
            }
        },

        /**
         * Fit given content into a given screen withhout disturbing the aspect ratio
         * of the content.
         * @param {Object} fitObj - Object with data to apply fit
         * @param {Object}
         */
        getSizeToFitScreen: function(content, screen){
            if((screen.width/screen.height) > (content.width/content.height)){
                return  {
                    width: content.width * (screen.height/content.height),
                    height: screen.height
                };
            }
            else{
                return  {
                    width: screen.width,
                    height: content.height * (screen.width/content.width)
                };
            }
        },

        toggleFullScreen: function() {
            var doc = window.document;
            var docEl = doc.documentElement;

            var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
            var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

            if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
                requestFullScreen.call(docEl);
            }
            else {
                cancelFullScreen.call(doc);
            }
        }
    }
);
