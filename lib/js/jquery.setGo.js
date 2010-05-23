/**
 * setGo
 *
 * A jQuery proto-plugin.
 *
 * Copyright (c) 2010 Sean Girard <sg@seangirard.com>
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Based on the original pattern by Mike Alsup:
 * http://www.learningjquery.com/2007/10/a-plugin-development-pattern
 *
 * Thanks to John Resig and the jQuery community.
 *
 */
 
// Open closure
(function($) {
    //
    // INIT PLUGIN
    //
    $.fn.setGo = function(options) {
        // Set default options prior to element iteration
        var opts = $.extend({}, $.fn.setGo.defaults, options);
        // Iterate and __construct each matched element
        return this.each(function() {
            // Cache calling object
            $this = $(this);
            // Get element-specific options; supports metadata plugin
            var $opts = $.metadata ?  $.extend({}, opts, $this.metadata()) : opts;
            // Attach options to calling object
            $this.$opts = $opts;
            // Attach calling object to plugin object
            $.fn.setGo.$obj = $this;
            // Plugin: set, Go!
            __construct($this);
        });
    };
    
    //
    // PLUGIN DEFAULTS
    //
    $.fn.setGo.defaults = {
        // Plugin properties
        
        // Callbacks (reserved)
        __success: function($this) {  },
        __failure: function($this, $err) {  }
    };
    
    //
    // PUBLIC METHODS
    //
    
    $.fn.setGo.relExternal = function() {
        var $this = this.$obj;
        /*
        // Method implementation
        */
        $this.init = function() {
            $('a[rel=external]').attr('target','_blank');
        }
        // Init
        __call($this);
    };
    
    $.fn.setGo.traceOptions = function() {
        var $this = this.$obj;
        /*
        // Method implementation
        */
        $this.init = function() {
            __trace($this.$opts);
        }
        // Init
        __call($this);
    };
    
    //
    // PRIVATE FUNCTIONS
    //
    
    /*
    // App implementation
    */
    __init = function($this) {
        $this.setGo.relExternal();
        
        $this.html('.ready(').delay(2500).fadeOut();
    };
    
    //
    // UTILITIES
    //
    
    // Safe method call
    function __call($this) {
        try {
            $this.init();
        } catch(err) { __error($this, err); }
    }
    
    // Auto-call plugin
    function __construct($this) {
        try {
           $this.queue(function () {
                __init($this);
                $this.dequeue();
            });
            $this.queue(function () {
                __destruct($this);
                $this.dequeue();
            });
        } catch(err) { __error($this, err); }
    };
    
    // Plugin auto-callback
    function __destruct ($this) {
        try {
            if ($.isFunction($this.$opts.__success)) {
                $this.$opts.__success($this);
            }
        } catch(err) { __error($this, err); }
    };
    
    // Error handling
    function __error($this, $err) {
        try {
            if ($.isFunction($this.$opts.__failure)) {
                $this.$opts.__failure($this, $err);
            }
        }
        catch(err) { __trace(err); }
    };
    
    // Debug
    function __trace($obj) {
        if (window.console && window.console.log) {
            window.console.log($obj);
        }
    };
    
// Return closure
})(jQuery);