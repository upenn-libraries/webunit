/**
 * @file
 * A JavaScript file for the Common Press Homepage.
 *
 * adapted from commonpres.js from Drupal site by Linghan
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - http://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function($) {

  $(document).ready(function() {

    /*-------------- Begin Helper Functions -------------*/

    function clickIndex() {
      var toggleclicked = 0;
      return function(increment) {
        if (increment) {
          toggleclicked = (toggleclicked + 1) % 2;
          return toggleclicked;
        }
        else {
          return toggleclicked;
        }
      };
    }

    // Function for toggling a clickable, provides a behavior for odd/even clicks
    $.fn.clickToggle = function (func1, func2, clickIndex) {
      var funcs = [func1, func2];
      this.click(function () {
        var index = clickIndex();
        $.proxy(funcs[index], this)();
        clickIndex(true);
      });
      return this;
    };

    // Functions for checking whether an element comes before/after another element.
    // https://stackoverflow.com/questions/7208624/check-if-element-is-before-or-after-another-element-in-jquery
    $.fn.isBefore= function(selector) {
        return this.nextAll(selector).length !== 0;
    };
    $.fn.isAfter = function(selector) {
        return this.prevAll(selector).length !== 0;
    };

    /*---------- Build a simple responsive hamburger menu ----------*/

    var $mobileNav = $('#mobile-nav');
    var $mobileButton = $('#mobile-button');
    var $mobileMenu = $('ul.navbar-nav');
    // Define the closure that will track the mobile button's click index. Pass this to clickToggle, which adds the actual even listener
    var mobileButtonClickIndex = clickIndex();
    $mobileNav.find($mobileButton).clickToggle(function () {
      $(this).addClass('on');
      $mobileMenu.addClass('show hburgermenu');
      $("#mobile-button legend").html("hide menu items");
    }, function () {
      $(this).removeClass('on');
      $mobileMenu.removeClass('show hburgermenu');
      $("#mobile-button legend").html("show menu items");
    },
    mobileButtonClickIndex);

    /*Handle window resizes. If the window width > 960 pixels, the mobile menu should always be hidden.*/
    $(window).resize(function() {
      var width = window.innerWidth;
      if (width >= 960) {
          $mobileButton.removeClass('on');
          $mobileMenu.removeClass('show hburgermenu');
          // If the mobile menu is left open, the button will have the wrong index next time it is clicked. Increment it once here.
          if (mobileButtonClickIndex() === 1){
            mobileButtonClickIndex(true);
          }
      } else {
        // Do nothing if the window is resized to be in mobile view. #mobile-button handles toggling.
      }
    });       

    /**
     * Menubar: top-level link stays white when you hover on dropdown panel
     **/
    var btn = '<button class="accessibility_button expand_button">show submenu</button>';

    /* Accessible menu toggle button */
    $("#menubar .dropdown  h3").append(btn);
    $("#menubar .dropdown .expand_button")
      .on("click", function() {
        if($("#menubar .dropdown").hasClass('is-hovered')) {
          // from hover to not hover
          $("#menubar .dropdown").removeClass('is-hovered');
          $(this).text("show submenu");
          $("#menubar .dropdown h3 a").attr('aria-expanded', 'false');
        }
        else {
          // from not hover to hover
          $("#menubar .dropdown").addClass("is-hovered");
          $(this).text("hide submenu");
          $("#menubar .dropdown h3 a").attr('aria-expanded', 'true');
        }
      });

    /* Parent item hover; uses a handcrafted version of hoverIntent:
     *   https://briancherne.github.io/jquery-hoverIntent/
     * We're writing it ourselves so we don't have to pull in an external JS library.
     * We can always switch to using the hoverIntent module at any time; it will streamline this code. */
    $('#menubar .dropdown').hover(function() {
      var $this = $(this);
      // flag to indicate that the mouse has not left the area
      $this.attr('mouseIn', true);
      setTimeout(function () {
        // if the mouse is still in the area after the delay, trigger the hover effects.
        if ($this.attr('mouseIn')) {
          $this.addClass('is-hovered');
          $("#menubar .dropdown h3 a").attr('aria-expanded', 'true');
        }
      }, 150); // Note: hoverIntent library uses 100 as the default interval.
    }, function() { //on hover out (mouseleave)
      // remove the flag to indicate that the mouse has left
      $(this).removeAttr('mouseIn');
      // remove hover effects
      $(this).removeClass('is-hovered');
      $("#menubar .dropdown h3 a").attr('aria-expanded', 'false');
    });

    /* When submenu is hovered, retain is-hovered class */
    $("#menubar .dropdown .dropdown-content")
      .on("mouseover", function () {
        $(this).parent('li').addClass('is-hovered');
        $("#menubar .dropdown h3 a").attr('aria-expanded', 'true');
      })
      .on("mouseleave", function () {
        $(this).parent('li').removeClass('is-hovered');
        $("#menubar .dropdown h3 a").attr('aria-expanded', 'false');
      });


    /* Change "News:" to "News" in name */
    var title = '<h1 id="s-lg-guide-name"><span class="visually-hidden">Common Press </span>News</h1>';
    $('#s-lg-guide-name').replaceWith(title);

  }); // end document.ready()

})(jQuery);
