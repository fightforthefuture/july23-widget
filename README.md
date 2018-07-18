# July 23, 2018 Widget

This is the source code for Battle for the Net's July 23 day of action widget. Net neutrality was repealed, but the fight has just begun. [Click here to learn more.](https://www.battleforthenet.com/)

## How to install the widget on your site

Add this one line of JavaScript to any page, and you're good to go: ([**See the demo!**](https://www.fightforthefuture.org?widget=july23))

```html
<script src="https://july23.battleforthenet.com/widget.js" async></script>
```

You can do some customization via the `BFTN_WIDGET_OPTIONS` [described below](#customization-options).

If you have any problems or questions regarding the widget, please [submit an issue](https://github.com/fightforthefuture/july23-widget/issues).


## How it works

The goal of this project is to allow anyone with a web site to run their own campaign to save net neutrality. Simply add one line of JavaScript and you're good to go! The modal animation will show up front-and-center on your page, prompting visitors to contact Congress and the FCC.

![A screenshot of the widget](https://www.battleforthenet.com/images/july-23-widget-screenshot.jpg)

The widget is designed to appear once per user, per device, per day, but can be configured to display at a different interval. If you'd like to force it to show up on your page for testing, reload the page with `#ALWAYS_SHOW_WIDGET` at the end of the URL.

Please take a look at [**widget.js**](https://github.com/fightforthefuture/july23-widget/blob/master/static/widget.js) if you want to see exactly what you're embedding on your page.

The widget is compatible with Firefox, Chrome (desktop and mobile), Safari (desktop and mobile), Microsoft Edge, and Internet Explorer 11.

## Customization options

If you define an object called `BFTN_WIDGET_OPTIONS` before including the widget code, you can pass some properties in to customize the default behavior.

```html
<script type="text/javascript">
  var BFTN_WIDGET_OPTIONS = {
    /*
     * Choose from 'fp' for Free Press, 'dp' for Demand Progress or
     * 'fftf' for Fight for the Future. Omit this property to randomly split
     * form submissions between all organizations in the Battle for the Net 
     * coalition. Defaults to null.
     */
    org: null, // @type {string}

    /*
     * Specify view cookie expiration. After initial view, modal will not be
     * displayed to a user again until after this cookie expires. Defaults to 
     * one day.
     */
    cookieExpirationDays: 1, // @type {number}

    /*
     * Prevents the widget iframe from loading Google Analytics. Defaults to 
     * false. (Google Analytics will also be disabled if doNotTrack is set on
     * the user's browser.)
     */
    disableGoogleAnalytics: false, // @type {boolean}

    /*
     * Prevent the donate button from showing. Defaults to false.
     */
    disableDonations: false, // @type {boolean}
    
    /*
     * Always show the widget. Useful for testing. Defaults to false.
     */
    alwaysShow: false, // @type {boolean}
  };
</script>
<script src="https://july23.battleforthenet.com/widget.js" async></script>
```
