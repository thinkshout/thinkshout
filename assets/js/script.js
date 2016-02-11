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
    }, { offset: '25%' });
  });

    // $('.case-study').waypoint(function(direction) {
    //   if (direction == 'down') {
    //     $('.case-study:nth-of-type(1)').addClass('active');
    //
    //     setTimeout(function() {
    //       $('.case-study:nth-of-type(2)').addClass('active');
    //     }, 800);
    //
    //     setTimeout(function() {
    //       $('.case-study:nth-of-type(3)').addClass('active');
    //     }, 1200);
    //   } else {
    //       $('.case-study').removeClass('active');
    //   }
    // }, { offset: '25%' });
})(jQuery);
