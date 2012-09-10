jQuery getting too big? 

The primary goal of this project would be for the feedback/demand to kickstart jquery.com into re-organizing its code-base so it's more modular since we believe we've proved the most useful parts of jQuery is a fraction of its code-base. 

To this end, follow this project if you want jquery.com to measure the demand for this. Another project with 
similar goals is http://ender.no.de/ - for node.js. 

[Zepto.js](http://zeptojs.com/) is another great alternative to jQuery, it's fast, light and optimized for mobile/webkit browsers.
It's a popular option for PhoneGap developers with full support for the 
[Backbone.js](http://documentcloud.github.com/backbone/), [Underscore.js](http://documentcloud.github.com/underscore/) and [Spine.js](http://zeptojs.com/) frameworks.


Based on recent posts it does looks like jQuery wants to [build a slimmer jQuery](http://blog.jquery.com/2011/11/08/building-a-slimmer-jquery/). Although instead of just giving a trim, we hope they perform larger re-structural changes allowing us to use most of the useful parts at a fraction of their cost. Their [recent conversations into future file size reduction](https://groups.google.com/forum/#!topic/jquery-bugs-team/17rGK6eAAxI/discussion) sound promising. 

**Disclaimer:** This is **NOT** an official [jQuery.com](http://jquery.com/) project.
Also this is still under heavy development and some things are not fully implemented, please report issues so we can measure the API popularity of missing pieces.

## News

  - **New!** - Build customizable jquip packages with the new 
  [jQuip Library Builder service](http://www.servicestack.net/jqbuilder/).  
  - Node js build scripts added to minify jquip with UglifyJS.

## Roadmap

  - We want jquip core to work well 
  [Backbone.js](http://documentcloud.github.com/backbone/) and 
  [Spine.js](http://spinejs.com) so as a minium, we'll need:
    - Improved $().find
    - $().delegate
  - More plugins!

## Changes

  - $.addConstructor is now `$.hook`
  - $.addPlugin is now `$.plug`
  - **scrollLeft** and **scrollTop** is now in the **css** plugin
  - Due to a request by the jQuery team we're no longer assigning the **jQuery** variable, you will now need to manually change this yourself on the first line of jquip.js:    
    `window.**jquip** = window.$ = (function()..`

# Introducing jquip - aka jQuery-in-parts.

Smaller, Lighter, Faster, more modular jQuery - include only the parts you want! Don't use it, Don't include it.

The core **jquip.js** is only **4.28KB** (minified and gzipped) only **13%** of the size of jQuery.

Has 90% of the good parts of jQuery (rest to be added plugins as needed), small enough to drop-in as source saving an external js reference.

Includes 7-8x Faster DOM traversal for <= IE7. (i.e. where there's no querySelector) *see limitations below.

Most code has been ported from jQuery and optimized where possible, e.g. internals use underscore's native `_.each` over jquery's slower `$.each` etc.

Licence: http://www.opensource.org/licenses/mit-license.php

## What's in the box? - i.e. the 90% good parts

Methods marked with * are only partially implemented.

  - [$(selector)](http://api.jquery.com/jQuery/) 
	- $(selector, context), $(element), $(array)
	- $(callback) requires **docready** plugin.

### Methods operating on a `$(selctor)`
  
  - each
  - add
  - get
  - attr
  - bind
  - unbind
  - data
  - append
  - prepend
  - before
  - after
  - toggle*
  - hide, show, fadeIn and fadeOut - does so without animation, consider using [jquery.animate-enhanced plugin](http://playground.benbarnett.net/jquery-animate-enhanced/)*
  - eq
  - first
  - last
  - slice
  - find*
  - remove
  - val - does not do checkbox, select, etc.
  - html
  - addClass
  - removeClass
  - hasClass
  - trigger
  - parent
  - parents
  - parentsUntil
  - next
  - prev
  - nextAll
  - nextUntil
  - prevUntil
  - siblings
  - children
  - contents

### Events

blur focus focusin focusout load resize scroll unload click dblclick 
mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave 
change select submit keydown keypress keyup error

### static methods off $
  
  - $.each 
  - [$._each](http://documentcloud.github.com/underscore/#each) - Underscore's native each
  - [$._defaults](http://documentcloud.github.com/underscore/#defaults) - Underscore's defaults
  - $.filter
  - $.dir
  - $.nth
  - $.sibling
  - $.map
  - $.bind
  - $.unbind
  - $.data
  - $.attrs
  - $.trim
  - $.indexOf
  - $.isFunction
  - $.isArray
  - $.isWindow
  - $.isNaN
  - $.merge
  - $.extend
  - $.makeArray
  - $.htmlFrag - creates a document fragment from a html string **(name changed)**
  - $.walk - traveres all childElems including self `(predicateFn, [[, context], results])`
  - $.queryAll - Sizzle(or mock) || doc.querySelector || limitedQueryAll*
  - $.attrs - an elements attributes
  - $.unique - return a unique list of elements in document order

## Plugins

Pick and choose the parts of jQuery when and add you use them.

Other parts of jQuery can be Added via Plugins which is simply a matter of copying or including the 
script after the core `jquip.js`.

### [documentReady](https://github.com/mythz/jquip/blob/master/src/jquip.docready.js)
yep, it's a plugin!

  - [$(function())](http://api.jquery.com/ready/)
  - [$.ready](http://api.jquery.com/ready/)

### [css](https://github.com/mythz/jquip/blob/master/src/jquip.css.js)

  - [$.css](http://api.jquery.com/css/)
  - width
  - height
  - innerHeight
  - innerWidth
  - outerHeight
  - outerWidth
  - scrollLeft
  - scrollTop
  - $.camelCase

### [ajax](https://github.com/mythz/jquip/blob/master/src/jquip.ajax.js)
based on [David Flanagan HttpUtils](http://www.davidflanagan.com/javascript5/display.php?n=20-1&f=20/01.js) 
modfied to work like jQuery's ajax.

  - $.xhr (cross-browser XHR Native Object)
  - [$.ajax](http://api.jquery.com/jQuery.ajax/)
  - [$.getJSON](http://api.jquery.com/jQuery.getJSON/)
  - $.get
  - $.post
  - $.formData - convert object hash into a url Encoded string component

### [custom](https://github.com/mythz/jquip/blob/master/src/jquip.custom.js)

  - $.queryString - cached map of queryString variables 
  - $.is[Tab|Enter|Shift|...] - static functions to detect named keys pressed, e.g. `if ($.isEnter(e)) console.log("pressed enter")`
  - $.cancelEvent - cross-browser fn to `preventDefault()` and `stopPropogation()`, returns false.

### Plugin Authors (adding your own plugins)

Extending jquip:

  * `[elements] window.Sizzle (selector, context)` - Provide an alternate query engine.
  * `bool $.hook (function(selector, contxt))` - Intercept the constructor request.
  * `plug(name, fn($))` - Register your own plugin, mutate `$` to extend jquip.

Intercept the `$(){ .. }` constructor and inject your own implementation. Return true to short-circuit. e.g: from the **docready** plugin:

  $.plug("docready", function ($) {
    $.hook(function (selector, ctx) {
        if (typeof selector == "function") {
            this.ready(selector);
            return true;
        }
    });
    ... 
  });

### Limitations

Parts of jQuery that aren't ported over (because of code size) throw a "not implemented exception".
At the moment this only gets thrown for complex filters that filter (i.e $().find) on more than a tagName.

* For <= IE7 all selectors require an Id (i.e. #) Tag (e.g. INPUT) or class name in each child selector.
 
 Valid Examples:

   - TBODY TD.c1 INPUT
   - TH.c1 STRONG
   - #btnSubmit SPAN
   - FORM INPUT[name='chkProcess']
   - FORM INPUT[type='text']
   - FORM INPUT[type]
   - FORM#id.a.b
   - FORM#id .a.b
   - .a.b.c
   - .a 

For optimal performance in <= IE7 have the first child selector be a tag or an #id which cuts down the amount of DOM traversing needed to be done in JavaScript.

Events passed to your event handers are the 'real' browser DOM events. 
You can use the jquip.custom $.namedKey() feature for cross-browser key detection.

### jquip Library Builder Service

The project now includes the node.js **/server/jquip.builder.js**
so you can host your own jquip Library builder service internally.

### Contributing

I'd love help with this so Contributors and pull requests are very welcome!

The main task that needs doing is to get all the missing jQuery parts in as plugins 
and a comprehensive test suite so we can properly identify the parts of jQuery supported.

Feedback is welcome, drop me a line on [@demisbellot](http://twitter.com/demisbellot).

## Contributors

  - [@mythz](https://github.com/mythz) (Demis Bellot)
  - [@jeyb](https://github.com/jeyb) (Jey Balachandran)
