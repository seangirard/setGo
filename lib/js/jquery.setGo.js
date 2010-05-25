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
    
    $.fn.setGo.preventEvent = function(selector, custom, event, live) {
        var $this = this.$obj;
        /*
        // Method implementation
        */
        // Experimental routine to avoid calling e.preventDefault everywhere
        $this.init = function() {
            if (selector && custom) {
                if (!event) {
                    event = 'click';
                }
                if (false===live) {
                    $(selector).bind(event,function(e,d,h) {
                        custom(e,d,h);
                        e.preventDefault();
                    });
                } else { // In case live isn't implemented for this event
                    try {
                        $(selector).live(event,function(e,d,h) {
                            custom(e,d,h);
                            e.preventDefault();
                        });
                    } catch(err) {
                        try {
                            $(selector).bind(event,function(e,d,h) {
                                custom(e,d,h);
                                e.preventDefault();
                            });
                        } catch (err) {
                            __error(err);
                        }
                    }
                }
            }
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
        
        $this.hide().delay(1000).html('.ready(').fadeIn('slow').delay(2500).fadeOut();
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
    
// Closure
})(jQuery);