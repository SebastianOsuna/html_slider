HTML Slider
====

Simple HTML slider. No dependecies!

# Usage

- Mark your HTML correctly with `<!DOCTYPE HTML SYSTEM>`.
- Include `lib/slider.js` and `styles/slider.css` for development,  or `dist/slider.min.js` and `dist/slider.min.css` for
  production.
- Place an empty `<div>` where you want the slider to be.

```
<div id="mySlider"></div>
```

- Initialize the slider.

```
new Slider({selector: "#mySlider"})
```

# Options

The slider constructor accepts a configuration object with the following options:

Option | Defaults | Description
--- | --- | ---
min | 0 | Minimum value the slider can take
max | 100 |  Maximum value the slider can take
initialValue | 0 | Initial value of the slider
value | Linear Interpolation from min to max | Value transforming function. The current progress of the slider is given as a value from 0 to 100, where 0 corresponds to `min` and 100 to `max`. `function(progress) { ... }` 
label | *format:* 80% | Formatting function for the slider value label. The value passed is the result of the `value` function. `function(val) { ... }`
labelLocation | left | Label position. Can be `left` or `right`. 
onchange | | On change listener function. A object with several useful value is give. `function({ progress, target, value, _options }){ ... }`

# Styling

I'd recommend only overriding the following css rules for aesthetics.

```
.slider-bar { broder-color: ... }
.slider-progress { background-color: ... } /* Slider inner color */
.slider-knob {
    background-color: ...;
    border-color: ...;
}
```

Check `styles/slider.css` for more details.