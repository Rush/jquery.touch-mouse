/**
 * Original code by Erwinus from http://stackoverflow.com/a/12558119/403571
 * Pluginized and delay option by Damian "Rush" Kaczmarek
 * Note: it still could use some clarifying.
 * 
 * License: WTFPL (unless original sender disapproves)
 */
define(['jquery'], function(jQuery) {

  var touchTypes = {
    touchstart: 'mousedown',
    touchmove: 'mousemove',
    touchend: 'mouseup'
  };

  var touchInputs = {
    INPUT: 1,
    TEXTAREA: 1,
    SELECT: 1,
    OPTION: 1,
    'input': 1,
    'textarea': 1,
    'select': 1,
    'option': 1
  };

  (function($) {
    $.fn.touchMouse = function(options) {
      var settings = $.extend({
        delay: 0,
      }, options);

      return this.each(function() {
        var $this = $(this),
          data = $this.data('touchMouse');
        if(data) return;
        data = {
          simEnable: false
        };

        $this.bind('touchstart touchmove touchend', function(ev) {
          var isSame = (ev.target == this);
          if(settings.ignoreChildren && !isSame) {
            return;
          }

          var b = (!isSame && ev.target.__ajqmeclk),
            // Get if object is already tested or input type
            e = ev.originalEvent;
          if(b === true || !e.touches || e.touches.length > 1 || !touchTypes[e.type]) {
            return;
          } //allow multi-touch gestures to work
          var oEv = (!isSame && typeof b != 'boolean') ? $(ev.target).data('events') : false,
            b = (!isSame) ? (ev.target.__ajqmeclk = oEv ? (oEv['click'] || oEv['mousedown'] || oEv['mouseup'] || oEv['mousemove']) : false) : false;

          if(b || touchInputs[ev.target.tagName]) {
            return;
          } //allow default clicks to work (and on inputs)
          var type = touchTypes[e.type];

          // https://developer.mozilla.org/en/DOM/event.initMouseEvent for API
          var touch = e.changedTouches[0],
            newEvent = document.createEvent("MouseEvent");

          newEvent.initMouseEvent(type, true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
          newEvent.synthetic = true;

          if(settings.delay) {
            if(type == "mousedown") {
              data.__t = setTimeout(function() {
                data.__simEnable = true;
                touch.target.dispatchEvent(newEvent);
              }, settings.delay);
              return;
            } else if((type == "mousemove" || type == "mousedown") && !data.__simEnable) {
              clearTimeout(data.__t);
            }
            if(!data.__simEnable) {
              clearTimeout(data.__t);
              return;
            }
            if(type == "mouseup") {
              data.__simEnable = false;
              clearTimeout(data.__t);
            }
          }
          touch.target.dispatchEvent(newEvent);
          e.preventDefault();
          ev.stopImmediatePropagation();
          ev.stopPropagation();
          ev.preventDefault();
        });
        return true;
      });

    }

  })(jQuery);
});