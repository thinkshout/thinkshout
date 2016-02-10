(function($) {
  $('.mobile-menu-icon').click(function() {
    $('header nav .main-menu').slideToggle(800);
    $(this).find('.fa').toggleClass('fa-bars fa-remove');
  });

  // Waypoints
  $('.case-study').each(function() {
    var current_item = $(this);
    $(this).waypoint(function(direction) {
      if (direction == 'down') {
        current_item.addClass('active');
      } else {
        current_item.removeClass('active');
      }
    });
  })
})(jQuery);
