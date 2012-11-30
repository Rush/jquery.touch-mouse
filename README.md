jquery.touch-mouse
==================
Simulates mouse events on touch-enabled devices. With delay option it allows for hybrid usage that does not block scrolling and tapping.
This plugin requires AMD. To make AMD optional please contribute an improvement.

Example usages:

    $('body').touchMouse();
  
To use with fullCalendar plugin:

    $('#calendar').touchMouse({delay: 500});
  
The above requires user to hold a press for 500ms.


License
==================
Original code is CC BY-SA 2.5, by Erwinus from http://stackoverflow.com/a/12558119/403571
Rest of it is WTFPL, pluginized and exteded by Damian "Rush" Kaczmarek.
Other contributors welcome.
