(function($) {

	$(document).ready(function() {
	    // Below are adapted from Drupal scripts.js
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

	    // Menubar Accessibility

	    var btn = '<button class="accessibility_button expand_button">show submenu</button>';
        var mobileBtn = '<button id="show-mobile-menu-button" class="accessibility_button mobile_expand_button"><span class="visually-hidden">Show menu items</span></button>';

		/* Accessible menu toggle button */

		console.log($(".wrapper--nav .main-nav > .main-nav__item.parent  > h3"));
		$(".wrapper--nav .main-nav > .main-nav__item.expanded  > h3").append(btn);
		$(".wrapper--nav .main-nav > .main-nav__item .expand_button")
		.on("click", function() {
		  if($(this).parent().parent().hasClass('is-hovered')) {
		    $(this).parent().parent().removeClass('is-hovered');
            $("body").removeClass('nav-expanded');
            $("body").removeClass('nav-keyboard');
		    $(this).text("show submenu");
		    $(this).parent().children('.menu_parent').attr('aria-expanded', 'false');
		  }
		  else {
		    // Clear all submenus
		    $(".wrapper--nav .main-nav").children('li').removeClass("is-hovered");
		    $(".wrapper--nav .main-nav > li > h3 .expand_button").text("show submenu");
		    $(this).parent().parent().addClass("is-hovered");
            $("body").addClass('nav-expanded');
            $("body").addClass('nav-keyboard');
		    $(this).text("hide submenu");
		    $(this).parent().children('.menu_parent').attr('aria-expanded', 'true');
		  }
		});


        $(".mobile-button").prepend(mobileBtn);
        $(".mobile-button .mobile_expand_button")
        .on("click", function() {
            if($(".nav-container>input:checked").length > 0) {
                $("#mobile-nav-toggle").prop("checked", false);
            }
            else {
                $("#mobile-nav-toggle").prop("checked", true);
            }
        })



		/* Parent item hover; uses a handcrafted version of hoverIntent:
		*   https://briancherne.github.io/jquery-hoverIntent/
		* We're writing it ourselves so we don't have to pull in an external JS library.
		* We can always switch to using the hoverIntent module at any time; it will streamline this code. */
		$('.main-nav > .expanded').hover(function() {
    		var $this = $(this);
    		// flag to indicate that the mouse has not left the area
    		$this.attr('mouseIn', true);
    		setTimeout(function () {
    		  // if the mouse is still in the area after the delay, trigger the hover effects.
    		  if ($this.attr('mouseIn')) {
                $this.addClass('is-hovered');
                $('body').addClass('nav-expanded');
    		    $this.children('h3').children('.menu_parent').attr('aria-expanded', 'true');
    		  }
    		}, 200); // Note: hoverIntent library uses 100 as the default interval.
    	}, function() { //on hover out (mouseleave)
            var $this = $(this);
            // remove the flag to indicate that the mouse has left
            $this.removeAttr('mouseIn');
            // add a delay for removing the hover effects, because
            // we don't want to remove them if the user simply hovered over a different <li>.
            setTimeout(function () {
              // if the mouse is outside the original <li> after the delay,
              // remove the hover effects specific to that <li>
              if (!$this.attr('mouseIn')) {
                $this.removeClass('is-hovered');
                $this.children('h3').children('.menu_parent').attr('aria-expanded', 'false');
    
                // if the mouse is also outside ALL <li>s, remove the nav-expanded effects.
                if (!$('.main-nav > .main-nav__item.expanded[mouseIn=true]').length) {
                  $('body').removeClass('nav-expanded');
                  $("body").removeClass('nav-keyboard');
                }
              }
            }, 200);
          });

		/* When submenu is hovered, retain is-hovered class */
		$(".main-nav > .main-nav__item  > ul.main-nav__sub")
    		.on("mouseover", function () {
              $(this).parent('li').addClass('is-hovered');
              $('body').addClass('nav-expanded');
    		  $(this).parent().children('h3').children('.menu_parent').attr('aria-expanded', 'true');
    		})
    		// .on("mouseleave", function () {
    		//   $(this).parent('li').removeClass('is-hovered');
    		//   $(this).parent().children('h3').children('.menu_parent').attr('aria-expanded', 'false');
    		// });

        // /**
        //  * Menubar sticks to top of the page when you scroll down.
        // **/
        // // Get the offset position of the navbar.
        // // TODO: This should probably be recalculated when the window gets resized.
        // var sticky = $('.wrapper--nav').offset().top;
        // // When the user scrolls the page,
        // // Add the sticky class to the header when you reach its scroll position.
        // // Remove sticky class when you leave the scroll position.
        // window.onscroll = function() {
        //   if (window.pageYOffset > sticky) {
        //     $('body').addClass('sticky');
        //   } else {
        //     $('body').removeClass('sticky');
        //   }
        // };

        /* make .site-header only active when in guide home page*/
        var pathname = window.location.pathname;
        if (pathname !== "/hometabs") {
            console.log(pathname);
            $(".site-header").addClass("inactive");
        }
	}); // end document.ready()
})(jQuery);