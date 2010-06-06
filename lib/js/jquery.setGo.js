/**
 *
 * setGo - a jQuery proto-plugin.
 * http://www.github.com/seangirard/setGo
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
 * This article by Hector Virgen outlines a similar approach to the one used here: 
 * http://www.virgentech.com/blog/2009/10/building-object-oriented-jquery-plugin.html
 *
 * Also see the pattern by Keith Woods for another plugin framework:
 * http://keith-wood.name/pluginFramework.html
 *
 * Thanks to John Resig and the jQuery community!
 *
 * @requires jQuery 1.4.2
 * 
 */
 
 
(function($) {
    
    // Datastore Location
    var __namespace = 'setGo';
    
    /**
     * 
     * setGo provides a simple plugin framework and namespace for your jQuery application.
     * 
     * $(document).ready(function() {
     *     $('#app').setGo();
     * });
     *
     * @param {Object} options (optional) - plugin data object, override and/or add your own
     * @param {Object} target (optional) - change 'this' context to custom *selector* (not object)
     * 
     * @return {Object} jQuery chain
     * @see README
     * 
     */
    $.fn.setGo = function(options, target) {
        // Set default options prior to element iteration
        var opts = $.extend({}, __options, options);
        // Iterate and __construct each matched element
        return this.each(function() {
            // Cache calling/target object
            var $this = target && $(target) ? $(target) : $(this);
            // Get element-specific options; supports metadata plugin
            var $opts = $.metadata ?  $.extend({}, opts, $this.metadata()) : opts;
            // Attach options to calling object
            $this.data(__namespace, $opts);
            // Attach calling/target object to plugin object
            $.fn.setGo.$obj = $this;
            // Plugin: set, Go!
            __construct($this);
        });
    };
    
    /**
     * 
     * Application properties - stored in .data()
     *
     * @see .setGo()
     * @see .setGo.setOptions()
     * 
     */
    __options = {
        // Plugin properties
        
        // Callbacks (reserved)
        __success: function($this, $opts) { __trace($opts); },
        __failure: function($this, $opts, err) { __trace(err); }
    };
    
    /**
     * 
     * App implementation
     *
     * @private 
     *
     * @param {Object} $this - calling/target (this) context
     * @param {Object} $opts - plugin properties
     *
     * @see __construct() 
     * @see __options
     *
     */
    __init = function($this, $opts) {        
        $this.setGo.relExternal();
        $this.hide().delay(1000).fadeIn('slow').delay(2500).fadeOut();
    };
    
    //
    // PUBLIC METHODS
    //
    
    /**
     *
     * Sample public method
     *
     * @see __call()
     * @see __private()
     *
     */
    $.fn.setGo.publicOption = function() {
        var $this = this.$obj;
        var $opts = $this.setGo.getOptions();
        
        // Method implementation
        $this.init = function() {
            
            __private();
        
        };
        
        // Init
        return __call($this);
    };
    
    //
    // PUBLIC UTILITIES
    //
    
    /**
     *
     * Anchors w/ rel attribute value of external target _blank viewport
     *
     */
    $.fn.setGo.relExternal = function() {
        var $this = this.$obj;
        
        $this.init = function() {
            $('a[rel=external]').attr('target','_blank');
        };
        
        return __call($this);
    };
    
    /**
     *
     * Convert line endings to <br /> tags
     *
     * @param {String} txt
     *
     */
    $.fn.setGo.newLine = function(txt) {
        var $this = this.$obj;
        
        $this.init = function() {
            if (txt && typeof(txt) !== 'String') {
                return nl2br(txt);
            }    
        };
        
        function nl2br(str) {
            return str.replace(/\r\n|\r|\n/g, '<br />');
        }
        
        return __call($this);
    };
    
    /**
     *
     * Bind handler to event on selected element
     * Experimental wrapper to avoid calling preventDefault everywhere
     *
     * @param {String} selector - Bind to this element
     * @param {Object} custom - Bind this function
     * @param {String} event - (optional ) Event to bind, default=Click 
     * @param {Boolean} live - (optional) Whether to bind as live event, default=True
     * 
     */
    $.fn.setGo.preventEvent = function(selector, custom, event, live) {
        var $this = this.$obj;
        
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
        };
        
        return __call($this);
    };
    
    /**
     *
     * Override plugin property defalts, optionally merge
     *
     * @param {Object} $opts - New plugin options
     * @param {Boolean} merge (optional) - Whether to merge new values
     *                  False=overwrite, True=merge (default=True)
     *
     * @see __options
     * @see getOptions() 
     *
     */
    $.fn.setGo.setOptions = function($opts, merge) {
        var $this = this.$obj;
        
        $this.init = function() {
            if (merge) {
                $.extend($this.data(__namespace), $opts);
            } else {
                $this.data(__namespace, $opts);
            }
        };
        
        return __call($this);
    };
    
    /**
     *
     * Get plugin properties
     *
     * @return {Object} $this.data(__namespace)
     *
     * @see setOptions()
     * @see __options
     *
     */
    $.fn.setGo.getOptions = function() {
        var $this = this.$obj;
        
        $this.init = function() {
            return $this.data(__namespace);
        };
        
        return __call($this);
    };
    
    /**
     *
     * Echo plugin properties to console
     *
     * @see getOptions()
     *
     */
    $.fn.setGo.traceOptions = function() {
        var $this = this.$obj;
        
        $this.init = function() {
            __trace($this.setGo.getOptions());
        };
        
        return __call($this);
    };
    
    //
    // PRIVATE FUNCTIONS
    //
    
    /**
     *
     * Sample private function
     *
     * @private
     *
     */
    function __private() {
        alert('');
    }
    
    
    //
    // PLUGIN CORE
    //
    
    /**
     * 
     * Safe method call
     *
     * @private 
     *
     * @param {Object} $this - calling/target (this) context
     *
     * @see .init() - (all public methods) 
     *
     */
    function __call($this) {
        try {
            return $this.init();
        } catch(err) { return __error($this, err); }
    }
    
    /**
     * 
     * Auto-call plugin
     *
     * @private 
     *
     * @param {Object} $this - calling/target (this) context
     *
     * @see __init()
     *
     */
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
        } catch(err) { __error($this, err); }
    }
    
    /**
     * 
     * Plugin auto-callback (trigger success/failure handlers)
     *
     * @private 
     *
     * @param {Object} $this - calling/target (this) context
     * @param {Object} $opts - plugin properties
     *
     * @see __success()
     *
     */
    function __destruct ($this, $opts) {
        try {
            if ($.isFunction($opts.__success)) {
                $opts.__success($this, $opts);
            }
        } catch(err) { __error($this, $opts, err); }
    }
    
    /**
     * 
     * Error handler
     *
     * @private 
     *
     * @param {Object} $this - calling/target (this) context
     * @param {Object} $opts - plugin properties
     * @param {Object} err - caught error
     *
     * @see __failure()
     * @see __call()
     *
     */
    function __error($this, $opts, err) {
        try {
            if ($.isFunction($opts.__failure)) {
                return $opts.__failure($this, err);
            }
        }
        catch(e) { return __trace(e); }
    }
    
    /**
     * 
     * Debug
     *
     * @private 
     *
     */
    function __trace($obj) {
        if (window.console && window.console.log) {
            return window.console.log($obj);
        }
    }
    
// Closure
})(jQuery);
