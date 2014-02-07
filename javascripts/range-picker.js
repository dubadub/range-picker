/* SuperControl v.1.1 by WSD */
;(function ($, window, document, undefined) {
    // "use strict";
    /*global document, window, jQuery, console */

    var $document,
        lastMousePosition={x:0,y:0},
        MEASURE_SCROLLBAR_TEMPLATE = "<div class='select2-measure-scrollbar'></div>";

    $document = $(document);

    function measureScrollbar() {
        var $template = $(MEASURE_SCROLLBAR_TEMPLATE);
        $template.appendTo('body');

        var dim = {
            width: $template.width() - $template[0].clientWidth,
            height: $template.height() - $template[0].clientHeight
        };
        $template.remove();

        return dim;
    }

    $document.on("mousemove", function (e) {
        lastMousePosition.x = e.pageX;
        lastMousePosition.y = e.pageY;
    });

    /**
     * filters mouse events so an event is fired only if the mouse moved.
     *
     * filters out mouse events that occur when mouse is stationary but
     * the elements under the pointer are scrolled.
     */
    function installFilteredMouseMove(element) {
        element.on("mousemove", function (e) {
            var lastpos = lastMousePosition;
            if (lastpos === undefined || lastpos.x !== e.pageX || lastpos.y !== e.pageY) {
                $(e.target).trigger("mousemove-filtered", e);
            }
        });
    }

    /**
     * Debounces a function. Returns a function that calls the original fn function only if no invocations have been made
     * within the last quietMillis milliseconds.
     *
     * @param quietMillis number of milliseconds to wait before invoking fn
     * @param fn function to be debounced
     * @param ctx object to be used as this reference within fn
     * @return debounced version of fn
     */
    function debounce(quietMillis, fn, ctx) {
        ctx = ctx || undefined;
        var timeout;
        return function () {
            var args = arguments;
            window.clearTimeout(timeout);
            timeout = window.setTimeout(function () {
                fn.apply(ctx, args);
            }, quietMillis);
        };
    }

    function killEvent(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    function killEventImmediately(event) {
        event.preventDefault();
        event.stopImmediatePropagation();
    }

    



    var defaults = {
        step: 40,
        dragger: {},
        slider: {},
        resizer: {},
        dragger_status: true,
        slider_status: true,
        resizer_status: true,
        resizer_sizeMin: 40,
        resizer_sizeMax: 320,
        initialPosition: 0,
        initialValue: 6,
        windowLength: 6
    };

   

    function RangePicker( element, options ) {
        this.element = element;

        // jQuery has an extend method that merges the 
        // contents of two or more objects, storing the 
        // result in the first object. The first object 
        // is generally empty because we don't want to alter 
        // the default options for future instances of the plugin
        this.options = $.extend( {}, defaults, options) ;
        
        this._defaults = defaults;
        this._name = "rangePicker";
        
        this.init();
    }

    RangePicker.prototype.init = function () {
        container = this.createContainer();
        container.insertAfter(this.element)
        console.log(this.container)
    };

    RangePicker.prototype.createContainer = function () {
        var container = $(document.createElement("div")).attr({
            "class": "select2-container"
        }).html([
            "<a href='javascript:void(0)' onclick='return false;' class='select2-choice' tabindex='-1'>",
            "   <span class='select2-chosen'>&nbsp;</span><abbr class='select2-search-choice-close'></abbr>",
            "   <span class='select2-arrow' role='presentation'><b role='presentation'></b></span>",
            "</a>",
            "<label for='' class='select2-offscreen'></label>",
            "<input class='select2-focusser select2-offscreen' type='text' aria-haspopup='true' role='button' />",
            "<div class='select2-drop select2-display-none'>",
            "   <div class='select2-search'>",
            "       <label for='' class='select2-offscreen'></label>",
            "       <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input' role='combobox' aria-expanded='true'",
            "       aria-autocomplete='list' />",
            "   </div>",
            "   <ul class='select2-results' role='listbox'>",
            "   </ul>",
            "</div>"].join(""));
        return container;
    };

    $.fn.rangePicker = function ( options ) {
        if (!$.data(this, 'plugin_range_picker')) {
            $.data(this, 'plugin_range_picker'; 
            return new RangePicker( this, options ); 
        }          
    }


})(jQuery, window, document);