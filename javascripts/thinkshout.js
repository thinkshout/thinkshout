jQuery(document).ready(function () {
  //clean up empty tags
  jQuery('.google-form-wrapper p, .google-form-wrapper br')
      .filter(function () {
        return jQuery(this).html() == '';
      })
      .remove();

  //add required class to required elements
  jQuery('.google-form-wrapper form')
      .find('.ss-item-required input, .ss-item-required textarea')
      .filter(function () {
        return jQuery(this).attr('name').match(/entry\.\d\.single/);
      })
      .addClass('required');

  //validate the form
  jQuery('.google-form-wrapper form').validate({
    submitHandler: function (form) {
      jQuery(form)
          .ajaxSubmit({
            success: function (data) {
              if (data) {
                jQuery(form)
                    .hide(200, function () {
                      jQuery(this)
                          .prev('.success-msg')
                          .fadeIn('slow')
                    })
              }
            },
            error: function (data) {
              console.error(data);
            }
          });
    }
  });
});
