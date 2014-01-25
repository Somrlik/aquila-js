var hnd = {}; /// Namespace for handlers
var win = {}; /// Namespace for windows classes

/* INHERITANCE IMPLEMENTATION */
/* http://www.crockford.com/javascript/inheritance.html */

/**
 * Adds method method to all Functions.
 */
 /*
Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};
*/

/**
 * Adds method inherits to all Functions.
 * Usage: foo.inherits(bar);
 * foo inherits all methods of bar.
 * Also adds method uber.
 */
/* 
Function.method('inherits', function (parent) {
    this.prototype = new parent();
    var d = {}, 
        p = this.prototype;
    this.prototype.constructor = parent; 
    this.method('uber', function uber(name) {
        if (!(name in d)) {
            d[name] = 0;
        }        
        var f, r, t = d[name], v = parent.prototype;
        if (t) {
            while (t) {
                v = v.constructor.prototype;
                t -= 1;
            }
            f = v[name];
        } else {
            f = p[name];
            if (f == this[name]) {
                f = v[name];
            }
        }
        d[name] += 1;
        r = f.apply(this, Array.prototype.slice.apply(arguments, [1]));
        d[name] -= 1;
        return r;
    });
    return this;
});
*/
/**
 * Adds swiss method to Functions.
 * Usage: foo.swiss(bar, 'barista', 'barcode');
 * foo inherits methods barista and barcode from bar.
 */
 /*
Function.method('swiss', function (parent) {
    for (var i = 1; i < arguments.length; i += 1) {
        var name = arguments[i];
        this.prototype[name] = parent.prototype[name];
    }
    return this;
    
});
*/
/**
 * Cookies handling
 * From http://www.quirksmode.org/js/cookies.html
 */

function createCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = escape(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return unescape(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

$(function() {
    /**
     * Basic class that provides interface.
     */
    function Canvas() {
        this.$ = $('#canvas');
        this.sizeX = this.$.width(); 
        this.sizeY = this.$.height(); 
        this.windows = [];
        this.displayedWindows = [];
        this.minimizedWindows = [];
        
        /**
         * Adds Window to Canvas.
         * @param name Name of the window
         * @param sizeX Horizontal size of window
         * @param sizeY Vertical size of window
         */
        this.addWindow = function(name, sizeX, sizeY) {
            var id = this.windows.length;
            console.log(id);
            var parent = canvas;
            var posX = 0, posY = 0; //compute from other windows...?
            if (id === 0) id = 1;
            var window_ = new Window(parent, id, name, sizeX, sizeY, posX, posY);
            this.windows[id] = window_;
            window_.render();
        };
        
        /**
         * Removes Window from Canvas. Use Window.destroy() for safety. TODO: or not?
         * @param id ID of Window.
         */
        this.removeWindow = function(id) {
            this.windows[id].destroy();
            delete this.windows[id];
            delete this.displayedWindows[id];
            delete this.minimizedWindows[id];
        };
        
        /**
         * Logs windows to console.
         */
        this.logWindows = function() {
            console.log(this.windows);
        };
        
        this.closeAll = function() {
            for (var windowID in this.windows)
                this.removeWindow(windowID);
            this.displayedWindows = [];
            this.minimizedWindows = [];
        };
        
        this.minimizeWindow = function(id) {
            
        };
        
        this.resetZIndex = function() {
            for (var window_ in this.windows) {
                this.windows[window_].moveZ('auto');
            }  
        };
        
        /**
         * Handler for window resizing
         */
         
        $(window).resize(function () {
            canvas.sizeX = canvas.$.width();
            canvas.sizeY = canvas.$.height();
        });
        
        /**
         * Abstract class to create windows.
         * @param id ID of window
         * @param name Name of window
         * @param sizeX Horizontal size of window
         * @param sizeY Vertical size of window
         */
        function Window(parent, id, name, sizeX, sizeY, posX, posY) {
            this.parent = parent;
            this.id = id;
            this.name = name;
            this.sizeX = sizeX;
            this.sizeY = sizeY;
            this.posX = posX;
            this.posY = posY;
            this.$ = $('<div id="'+id+'" class="window" style="width:200px;height:200px;"><div class="bar"><span class="window-name">'+name+'</span><div class="window-buttons"><a data-command="win_minimize" data-id="'+id+'">▼</a><a data-command="win_close" data-id="'+id+'">X</a></div></div><div class="content"><span>Ahoj!</span></div></div>');
            console.log(this.$);
            this.minimized = false;
            
            /**
             * Sets size to window.
             * @param size Object proto of size
             * Usage: foo.setSize({x: '42', y: '42'});
             */
            this.setSize = function(size) {
                console.log('Resizing window...'+size);
            };
            
            /**
             * Moves the window to specified coords.
             * @param coords Object proto of coords
             * Usage: foo.move({x: '42', y: '42'});
             */
            this.move = function(coords) {
                console.log('Moving window...'+coords);
            };
            
            /** 
             * Minimizes the window to bottom line.
             * This is also called when the window is out of bounds. ///todo
             */
            this.minimize = function() {
                console.log('Minimizing window...');
            };
            
            /**
             * Shows the window on canvas from minimized state.
             */
            this.show = function() {
                console.log('Showing window...');
            };
            
            /**
             * Puts the html code into page.
             */
            this.render = function() {
                console.log('Rendering window...');
                this.$.css('width', sizeX);
                this.$.css('height', sizeY);
                this.$.css('top', posX);
                this.$.css('left', posX);
                this.$.appendTo(canvas.$);
                $('#'+id+' a[data-command]').click( function () {
                    if ($(this).data('command') == "win_close") {
                        canvas.removeWindow($(this).data('id'));
                    } else {
                        canvas.minimizeWindow($(this).data('id'));
                    }
                    console.log('window press');
                });
                $('#'+id).drags({handle:".bar"}).click(function () {
                    canvas.resetZIndex();
                    canvas.windows[id].moveZ(1);
                });
                
            };
            
            /**
             * Destroys the window. As simple as that.
             * TODO: May save its sate.
             */
            this.destroy = function() {
                console.log('Destroying window...');
                this.$.remove();
            };
            
            /**
             * Moves the window in z-axis.
             * @param zIndex What value should z-index be set to.
             */
            this.moveZ = function(zIndex) {
                this.$.css('z-index', zIndex);
            };
             
        }
    }
    
    function StatusBar() {
        this.$ = $('#status-bar');
        this.cValues = 0;
        this.rValues = 0;
        this.text = "";
        this.defaultText = "";
        
        this.changeText = function (str) {
            $('#status-bar-text').text(str);
        };
        
        this.reset = function() {
            $('#status-bar-text').text(this.defaultText);
        };
    }
    
    var canvas = new Canvas();
    
    var statusBar = new StatusBar();
    
    /* HANDLERS */
    hnd.buttonHandler = function(command, values, castWindow) {
        var handler;
        if (castWindow === true) handler = win[command];
        else handler = hnd[command];
        if (handler === undefined) {
            handler = hnd.defaultHandler;
            values = command;
        }
        handler(values);
        return false;
    };
    
    var functionsBody = '';
    hnd.defaultHandler = function(values) {
        console.log(values);
        functionsBody += 'hnd.'+values+' = function(values) {\n\tconsole.log("");\n}\n\n';
    };
    
    hnd.dbg_printFunctionPrototypes = function(values) {
        console.log('Undefined functions prototypes:');
        console.log(functionsBody);
    };
    
    hnd.fil_save = function(values) {
        console.log("Saving");
    };
    
    hnd.fil_print = function(values) {
        console.log("Printing");
    };
    
    hnd.fil_pre_res_setValues = function(values) {
        console.log("Set resistor values");
    };
    
    hnd.fil_pre_cap_setValues = function(values) {
        console.log("Set capacitor values");
    };
    
    hnd.fil_quit = function(values) {
        console.log("Quiting");
    };
    
    hnd.win_closeAll = function(values) {
        console.log("Closing all windows");
        //TODO: Make it better?
        canvas.closeAll();
    };
    
    hnd.win_minimizeAll = function(values) {
        console.log("");
    };
    
    hnd.win_cascade = function(values) {
        console.log("");
    };
    
    hnd.dbg_printAllWindows = function(values) {
        canvas.logWindows();
    };
    
    /* WINDOW CLASSES */
    win.fil_options = function(values) {
        console.log("Options window");
    };
    
    win.res_code = function(values) {
        console.log("Resitors code window");
    };
    
    win.res_connections = function(values) {
        console.log("resitor connection window");
    };
    
    win.res_led = function(values) {
        console.log("LED resitance window");
    };
    
    win.cap_code = function(values) {
        console.log("capacitors code window");
    };
    
    win.cap_conncetions = function(values) {
        console.log("Capacitor connections window");
    };
    
    win.cap_units = function(values) {
        console.log("Capacitor units converter window");
    };
    
    win.cap_energy = function(values) {
        console.log("Capacitor energy calculator window");
    };
    
    win.ind_code = function(values) {
        console.log("");
    };
    
    win.pow_calculator = function(values) {
        console.log("");
    };
    
    win.fre_frequency = function(values) {
        console.log("");
    };
    
    win.fre_reactance = function(values) {
        console.log("");
    };
    
    win.fre_555 = function(values) {
        console.log("");
    };
    
    win.fre_rcFiler = function(values) {
        console.log("");
    };
    
    win.oth_calculator = function(values) {
        console.log("");
    };
    
    win.oth_ohm = function(values) {
        console.log("");
    };
    
    win.oth_peak = function(values) {
        console.log("");
    };
    
    win.oth_divider = function(values) {
        console.log("");
    };
    
    win.oth_regualtor = function(values) {
        console.log("");
    };
    
    win.oth_wheatstone = function(values) {
        console.log("");
    };
    
    win.hel_about = function(values) {
        console.log("");
    };
    
    win.hel_help = function(values) {
        console.log("");
    };
    
    win.hel_contact = function(values) {
        console.log("");
    };
    
    win.dbg_dummyWindow = function(values) {
        var sizeX = values.size;
        var sizeY = sizeX;
        canvas.addWindow("Dummy window", sizeX, sizeY);
    };
    
    /* MENU DROPDOWNING + STATUS BAR */
    $("#menu ul.dropdown li").hover(function(){
        $(this).addClass("hover");
        $('ul:first',this).css('visibility', 'visible');
    }, function(){
        $(this).removeClass("hover");
        $('ul:first',this).css('visibility', 'hidden');
    });
    $('#menu li').css('cursor', 'default');
    $('#menu li[data-command], #status-bar span.button').css('cursor', 'pointer');
    $('#menu ul.submenu li:has(ul)').append(" &raquo; ");

    /* MENU, STATUS BAR BUTTONS */
    $('#menu ul.dropdown li[data-command], #status-bar span.button').click( function() {
        hnd.buttonHandler($(this).data('command'), $(this).data('values'), $(this).data('castwindow'));
    });
    
    /* WINDOW BUTTONS HANDLER */
    $('#canvas .window-buttons a[data-command]').click( function () {
        if ($(this).data('command') == "win_close") {
            canvas.removeWindow($(this).data('id'));
        } else {
            canvas.minimizeWindow($(this).data('id'));
        }
        console.log('window press');
    });
    
    /*  CLICKING DEBUGGER */
    $('*').click(function (e) {
        document.title = e.target.tagName + '#' + e.target.id + '.' + e.target.className;
    });
    
    /* MOVING WINDOWS */
    $.fn.drags = function(opt) {

        opt = $.extend({
            handle: "",
            cursor: "move",
            draggableClass: "draggable",
            activeHandleClass: "active-handle"
        }, opt);

        var $selected = null;
        var $elements = (opt.handle === "") ? this : this.find(opt.handle);

        $elements.css('cursor', opt.cursor).on("mousedown", function(e) {
            $selected = $(this).parent();
            canvas.resetZIndex();
            canvas.windows[$selected.attr("id")].moveZ(1);
            var drg_h = $selected.outerHeight(),
                drg_w = $selected.outerWidth(),
                pos_y = $selected.offset().top + drg_h - e.pageY,
                pos_x = $selected.offset().left + drg_w - e.pageX;
            $(document).on("mousemove", function(e) {
                $selected.offset({
                    top: e.pageY + pos_y - drg_h,
                    left: e.pageX + pos_x - drg_w
                });
            }).on("mouseup", function() {
                $(this).off("mousemove"); // Unbind events from document
                if ($selected !== null) {
                    $selected = null;
                }
            });
            e.preventDefault(); // disable selection...?
        }).on("mouseup", function() {
            $selected = null;
        });
        return this;
    };
    
});
