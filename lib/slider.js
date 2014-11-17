(function(global) {
    var Slider = function Slider (options) {

        var defaultOptions = function(opts) {
            opts = opts || {};
            opts.label = opts.label || Slider.DEFAULTS.label;
            opts.min = opts.min || Slider.DEFAULTS.min;
            opts.max = opts.max || Slider.DEFAULTS.max;
            opts.initialValue = opts.initialValue && (100*opts.initialValue/(opts.max - opts.min)) || Slider.DEFAULTS.min;
            opts.value = opts.value || Slider.DEFAULTS.value;
            opts.onchange = opts.onchange || Slider.DEFAULTS.onchange;
            opts.labelLocation = opts.labelLocation || Slider.DEFAULTS.labelLocation;
            return opts;
        };

        options = this.options = defaultOptions(options);
        var slider = this,
            _root,
            selector = options.selector;
        // elem can be a DOM object or a id/class selector
        if ( typeof selector === "string" ) { // selector
            if ( selector.charAt(0) === "." ) { // class selector
                throw "Unsupported selector";
//                _root = document.getElementsByClassName(selector.substring(1));
            } else if ( selector.charAt(0) === "#" ) { // id selector
                _root = [ document.getElementById(selector.substring(1)) ];
            } else {
                throw "Unsupported selector";
            }

            // check if valid root
            if ( _root == null ) {
                throw "Invalid DOM object type";
            }
            for ( var i = 0; i < _root.length; i++ ) {
                if ( _root[i].tagName !== "DIV" ) {
                    throw "Invalid DOM object type";
                }
            }
        } else {
            throw "Invalid selector";
        }


        for ( var j = 0; j < _root.length; j++ ) {
            prepareDOM( _root[j] );
            setupEvents( _root[j] );
        }


        function prepareDOM (elem) {
            var wrapper = document.createElement("div"),
                knob = document.createElement("span"),
                value_label = document.createElement("label"),
                bar = document.createElement("div"),
                progress = document.createElement("div");

            elem._progress = 0;
            elem.getWrapper = function() { return wrapper; };
            elem.getKnob = function() { return knob; };
            elem.getValueLabel = function() { return value_label; };
            elem.getBar = function() { return bar; };
            elem.getProgressBar = function() { return progress; };
            elem.setProgress = function(val) {
                this._progress = val;
                progress.style.width = val + "%";
                value_label.innerHTML = options.label(options.value(val), options.min, options.max);
            };
            elem.getProgress = function() {
                return this._progress;
            };
            elem.getValue = function() {
                return options.value( this._progress );
            };

            wrapper.className = "slider-wrapper";
            bar.className = "slider-bar";
            progress.className = "slider-progress";
            knob.className = "slider-knob";
            if ( options.labelLocation === "right" ) {
                value_label.className = "slider-label slider-label-right";
            } else {
                value_label.className = "slider-label";
            }

            elem.appendChild( wrapper );
            wrapper.appendChild(value_label);
            wrapper.appendChild(bar);
            bar.appendChild(progress);
            bar.appendChild(knob);

            elem.setProgress(options.initialValue);
        }

        function setupEvents(elem) {

            var bar = elem.getBar(),
                knob = elem.getKnob(),
                progress = elem.getProgressBar(),
                knobmousedown = function(event) {
                    this._initX = bar.getBoundingClientRect().left;
                    document.onmousemove = knobmouselistener;
                    document.onmouseup = knobmouseup;
                },
                knobmouseup = function() {
                    document.onmousemove = undefined;
                    document.onmouseup = undefined;
                    options.onchange( { progess: elem._progress, target: elem, value: options.value( elem._progress ), _options: slider.options } );
                },
                knobmouselistener = function(event) {
                    var delta = event.x - knob._initX,
                        percent = 100 * delta / ( bar.offsetWidth - getBorderRightWidth(bar) - getBorderLeftWidth(bar) );
                    percent = Math.max( Math.min( percent, 100 ), 0 );
                    elem.setProgress( percent );
                },
                barclick = function(event) {
                    if ( event.target === bar || event.target === progress ) {
                        var percent = 100 * event.offsetX / ( bar.offsetWidth - getBorderRightWidth(bar) - getBorderLeftWidth(bar) );
                        percent = Math.max( Math.min( percent, 100 ), 0 );
                        elem.setProgress( percent );
                        options.onchange( { progess: elem._progress, target: elem, value: options.value( elem._progress ), _options: slider.options } );
                    }
                };

            knob.onmousedown = knobmousedown;
            bar.onclick = barclick;
        }

    };

    Slider.DEFAULTS = {
        label: function(val) { return val + "%"; },
        min: 0,
        max: 100,
        initialValue: 0,
        value: function(progress) { return (progress/100)*(this.max-this.min) + this.min; },
        onchange: function(){},
        labelLocation: 'left'
    };

    global.HTMLSlider = Slider;

    /* Helper functions */
    function getBorderLeftWidth(elem) {
        return parseFloat(getComputedStyle(elem,null).getPropertyValue('border-left-width').replace('px', '').replace('em', ''));
    }
    function getBorderRightWidth(elem) {
        return parseFloat(getComputedStyle(elem,null).getPropertyValue('border-right-width').replace('px', '').replace('em', ''));
    }

})(window);