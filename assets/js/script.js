(function($) {
  $('.mobile-menu-icon').click(function() {
    $('header nav .main-menu').slideToggle(800);
    $(this).find('.fa').toggleClass('fa-bars fa-remove');
  });
})(jQuery);
