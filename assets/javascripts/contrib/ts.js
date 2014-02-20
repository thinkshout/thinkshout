(function ($) {
  $.fn.countTo = function (options) {
    // merge the default plugin settings with the custom options
    options = $.extend({}, $.fn.countTo.defaults, options || {});

    // how many times to update the value, and how much to increment the value on each update
    var loops = Math.ceil(options.speed / options.refreshInterval),
        increment = (options.to - options.from) / loops;

    return $(this).each(function () {
      var _this = this,
          loopCount = 0,
          value = options.from,
          interval = setInterval(updateTimer, options.refreshInterval);

      function updateTimer() {
        value += increment;
        loopCount++;
        $(_this).html(value.toFixed(options.decimals));

        if (typeof(options.onUpdate) == 'function') {
          options.onUpdate.call(_this, value);
        }

        if (loopCount >= loops) {
          clearInterval(interval);
          value = options.to;

          if (typeof(options.onComplete) == 'function') {
            options.onComplete.call(_this, value);
          }
        }
      }
    });
  };

  $.fn.countTo.defaults = {
    from: 0,  // the number the element should start at
    to: 100,  // the number the element should end at
    speed: 400,  // how long it should take to count between the target numbers
    refreshInterval: 100,  // how often the element should be updated
    decimals: 0,  // the number of decimal places to show
    onUpdate: null,  // callback method for every time the element is updated,
    onComplete: null,  // callback method for when the element finishes updating
  };

  $('section.results').waypoint(function (direction) {
        for (var i = 1; i < 4; i++) {
          var total = $('.data-totalholder-' + i).html();
          $('.data-total-' + i).delay(500).countTo({
            from: 0,
            to: total,
            speed: 500,
            refreshInterval: 2,
          });
        }
      },
      {
        triggerOnce: true,
        offset: 800
      });

})(jQuery);

// Hide the logo and break crumb below the marquee
// $(function() {
// 	 $('.hero-image, .marquee').waypoint(function(direction) {
// 	     $('#branding, #title-flag').toggleClass('inactive', direction === 'down');
// 	     $('#branding, #title-flag').toggleClass('active', direction === 'up');
// 	 }, {
// 	   offset: function() {
// 	     return -$(this).height();
// 	   }
// 	 });
// });