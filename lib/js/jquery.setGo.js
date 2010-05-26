/**
 * setGo - a jQuery proto-plugin.
 * http://www.github.com/seangirard/setGo
 *
 * Developed against jQuery 1.4.2
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
 * See the pattern by Keith Woods for another plugin framework:
 * http://keith-wood.name/pluginFramework.html
 *
 * Thanks to John Resig and the jQuery community.
 *
 */
 
(function($) {
    //
    // INIT PLUGIN
    //
    $.fn.setGo = function(options) {
        // Set default options prior to element iteration
        var opts = $.extend({}, $.fn.setGo.__defaults, options);
        // Iterate and __construct each matched element
        return this.each(function() {
            // Cache calling object
            var $this = $(this);
            // Get element-specific options; supports metadata plugin
            var $opts = $.metadata ?  $.extend({}, opts, $this.metadata()) : opts;
            // Attach options to calling object
            $this.data('setGo', $opts);
            // Attach calling object to plugin object
            $.fn.setGo.$obj = $this;
            // Plugin: set, Go!
            __construct($this);
        });
    };
    
    //
    // PLUGIN DEFAULTS
    //
    $.fn.setGo.__defaults = {
        // Plugin properties
        
        // Callbacks (reserved)
        __success: function($this, $opts) { __trace($opts); },
        __failure: function($this, $opts, $err) { __trace($err); }
    };
    
    //
    // PUBLIC METHODS
    //
    
    $.fn.setGo.publicOption = function() {
        var $this = this.$obj;
        /*
        // Method implementation
        */
        $this.init = function() {
            $opts = $this.setGo.getOptions();
            
        }
        // Init
        return __call($this);
    };
    
    $.fn.setGo.relExternal = function() {
        var $this = this.$obj;
        /*
        // Method implementation
        */
        $this.init = function() {
            $('a[rel=external]').attr('target','_blank');
        }
        // Init
        return __call($this);
    };
    
    $.fn.setGo.preventEvent = function(selector, custom, event, live) {
        var $this = this.$obj;
        /*
        // Method implementation
        */
        // Experimental wrapper to avoid calling preventDefault everywhere
        $this.init = function() {
            if (selector && custom) {
                if (!event) {
                    event = 'click';
                }
                if (false!==live && $(selector).live) {
                    $(selector).live(event,function(e,d,h) {
                        custom(e,d,h);
                        e.preventDefault();
                    });
                } else {
                    $(selector).bind(event,function(e,d,h) {
                        custom(e,d,h);
                        e.preventDefault();
                    });
                }
            }
        }
        // Init
        return __call($this);
    };
    
    $.fn.setGo.getOptions = function() {
        var $this = this.$obj;
        /*
        // Method implementation
        */
        $this.init = function() {
            return $this.data('setGo');;
        }
        // Init
        return __call($this);
    };
    
    $.fn.setGo.traceOptions = function() {
        var $this = this.$obj;
        /*
        // Method implementation
        */
        $this.init = function() {
            __trace($this.setGo.getOptions());
        }
        // Init
        return __call($this);
    };
    
    //
    // PRIVATE FUNCTIONS
    //
    
    /*
    // App implementation
    */
    __init = function($this, $opts) {        
        $this.setGo.relExternal();
        $this.hide().delay(1000).html('.ready(').fadeIn('slow').delay(2500).fadeOut();
    };
    
    //
    // UTILITIES
    //
    
    // Safe method call
    function __call($this) {
        try {
            return $this.init();
        } catch($err) { return __error($this, $err); }
    }
    
    // Auto-call plugin
    function __construct($this) {
        try {
            $opts = $this.setGo.getOptions();
            $this.queue(function () {
                 __init($this, $opts);
                $this.dequeue();
            });
            $this.queue(function () {
                __destruct($this, $opts);
                $this.dequeue();
            });
        } catch($err) { __error($this, $err); }
    };
    
    // Plugin auto-callback
    function __destruct ($this, $opts) {
        try {
            if ($.isFunction($opts.__success)) {
                $opts.__success($this, $opts);
            }
        } catch($err) { __error($this, $opts, $err); }
    };
    
    // Error handling
    function __error($this, $opts, $err) {
        try {
            if ($.isFunction($opts.__failure)) {
                return $opts.__failure($this, $err);
            }
        }
        catch($err) { return __trace($err); }
    };
    
    // Debug
    function __trace($obj) {
        if (window.console && window.console.log) {
            return window.console.log($obj);
        }
    };
    
// Closure
})(jQuery);