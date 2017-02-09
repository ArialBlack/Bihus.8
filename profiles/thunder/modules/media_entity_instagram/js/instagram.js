/**
 * @file
 */

(function ($, Drupal) {
  "use strict";

  Drupal.behaviors.instagramMediaEntity = {
    attach: function (context) {

      var fixIg = function () {
        $('iframe[src*="instagram.com"]').responsiveInstagram();
      };
      $(document).on('ready', function () {
        fixIg();
      });
      $(window).on('load resize',function () {
        fixIg();
      });

    }
  };

})(jQuery, Drupal);
