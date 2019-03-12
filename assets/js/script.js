(function($) {
  $(window).resize(function() {
    $('.main-menu').removeAttr('style');
  });

  // Mobile Menu
  $('.mobile-menu-icon').click(function() {
    $(this).toggleClass('active');
    $('header nav .main-menu').slideToggle(500);
  });

  // Set active states for the Main Menu items and their subitems
  var path = window.location.pathname;

  $(".main-menu li a").each(function() {
    var href = $(this).attr('href');
    if (path.substring(0, href.length) === href) {
      $(this).closest('a').addClass('active');
    }
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

  // Navbar animation
  $('body').waypoint(function(direction) {
    var windowSize = $(window).width();

    if (direction == 'down') {
      $('header').animate({"padding":"0"}, 50);
      $('header .header-logo img').animate({"width":"10rem", "margin-top": "6px"}, 600);
      $('.main-menu li a').animate({"padding": "1.1rem 5px"}, 600);
    } else {
      if (windowSize > 979) {
        $('header').animate({"padding":"2rem 0"}, 50);
        $('header .header-logo img').animate({"width":"11.625rem", "margin-top": "0"}, 600);
        $('.main-menu li a').animate({"padding": "3.125rem 5px"}, 600);
      } else {
        $('header').animate({"padding":"1rem 0"}, 50);
        $('header .header-logo img').animate({"width":"11.625rem", "margin-top": "0.5rem"}, 600);
      }
    }
  }, { offset: 100 });

  // Blog posts
  $('.post').matchHeight();
  // Center single blog post
  var numberOfPost = $('.team-member-blog .post').length;
  if (numberOfPost === 1 || numberOfPost % 3 === 1) {
    $('.team-member-blog .post:last-child').addClass('single-center');
  }

  // Hide blogs greater than 3
  $('.team-member-blog .post:gt(2)').addClass('reveal');

  $('.see-all-blogs, .view-less-blogs').click(function() {
    $('.post.reveal').fadeToggle();
    $('body, html').animate({
        scrollTop: $('.team-member-blog' ).offset().top - 70
      }, 500, function() {
        // Animation complete.
        $('.post').matchHeight();
    });

    if ($('.view-less-blogs:visible').length < 1) {
        $('.view-less-blogs').fadeIn();
        $('.see-all-blogs').hide();
    } else {
      $('.see-all-blogs').fadeIn();
      $('.view-less-blogs').hide();
    }
  });

  // Blog Type selector
  var blogType = window.location.pathname.replace(/^\/|\/$/g, '').split('/').pop();
  if (blogType == 'blog') {
    blogType = 'all';
  } else {
    blogType = '/blog/topic/' + blogType;
  }

  $('#blog-filter')
    .val(blogType)
    .change(function(evt, params) {
      if (params === undefined || params.selected === undefined) {
         window.location.replace($(this).val())
      } else {
        if (params.selected != 'all') {
          window.location.replace(params.selected);
        } else {
          window.location.replace('/blog/');
        }
      }
    });

  if ($(window).width() >= 960) {
    $('#blog-filter').chosen({disable_search: true});
  }

  $('.case-study a, .blog-post a').each(function() {
     var a = new RegExp('/' + window.location.host + '/');
     if (!a.test(this.href)) {
        $(this).attr("target","_blank");
     }
  });

  // Add hotspot for featured case study
  var featuredCSLink = $('.featured-case-study').find('a').attr('href');
  $('.featured-case-study').click(function() {
    window.location = featuredCSLink;
  });


  //  Careers Page - whr
  $('li.whr-item a').click(function(e) {
    e.preventDefault();
    window.open(this.href, '_blank');
  });


  var isIE9OrBelow = function() {
     return /MSIE\s/.test(navigator.userAgent) && parseFloat(navigator.appVersion.split("MSIE")[1]) < 10;
  }

  // placeholders for forms (IE9)
  $(document).ready(function() {
  if(isIE9OrBelow){
    $("input").each(
    function(){
      var inputField = $(this);
      if(inputField.val()=="" && inputField.attr("placeholder")!=""){

        inputField.val(inputField.attr("placeholder"));

        inputField.focus(function(){
          if(inputField.val()==inputField.attr("placeholder")){ inputField.val(""); }
        });

        inputField.blur(function(){
          if(inputField.val()==""){ inputField.val(inputField.attr("placeholder")); }
        });

        $(inputField).closest('form').submit(function(){
          var form = $(this);
          if(!form.hasClass('placeholderPending')){
            $('input',this).each(function(){
              var clearInput = $(this);
              if(clearInput.val()==clearInput.attr("placeholder")){ clearInput.val(""); }
            });
            form.addClass('placeholderPending');
          }
        });
      }
    });
  }
  });


})(jQuery);
