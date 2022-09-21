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

		/* Accessible menu toggle button */
		console.log($(".main-nav > .main-nav__item  > h3"));
		$(".main-nav > .main-nav__item  > h3").append(btn);
		$(".main-nav > .main-nav__item .expand_button")
		.on("click", function() {
		  if($(this).parent().parent().hasClass('is-hovered')) {
		    $(this).parent().parent().removeClass('is-hovered');
		    $(this).text("show submenu");
		    $(this).parent().children('.menu_parent').attr('aria-expanded', 'false');
		  }
		  else {
		    // Clear all submenus
		    $(".main-nav").children('li').removeClass("is-hovered");
		    $(".main-nav > li > h3 .expand_button").text("show submenu");
		    $(this).parent().parent().addClass("is-hovered");
		    $(this).text("hide submenu");
		    $(this).parent().children('.menu_parent').attr('aria-expanded', 'true');
		  }
		});

		/* Parent item hover; uses a handcrafted version of hoverIntent:
		*   https://briancherne.github.io/jquery-hoverIntent/
		* We're writing it ourselves so we don't have to pull in an external JS library.
		* We can always switch to using the hoverIntent module at any time; it will streamline this code. */
		$('.main-nav > .main-nav__item').hover(function() {
		var $this = $(this);
		// flag to indicate that the mouse has not left the area
		$this.attr('mouseIn', true);
		setTimeout(function () {
		  // if the mouse is still in the area after the delay, trigger the hover effects.
		  if ($this.attr('mouseIn')) {
		    $this.addClass('is-hovered');
		    $this.children('h3').children('.menu_parent').attr('aria-expanded', 'true');
		  }
		}, 150); // Note: hoverIntent library uses 100 as the default interval.
		}, function() { //on hover out (mouseleave)
		// remove the flag to indicate that the mouse has left
		$(this).removeAttr('mouseIn');
		// remove hover effects
		$(this).removeClass('is-hovered');
		$(this).children('h3').children('.menu_parent').attr('aria-expanded', 'false');
		});

		/* When submenu is hovered, retain is-hovered class */
		$(".main-nav > .main-nav__item  > ul.main-nav__sub")
		.on("mouseover", function () {
		  $(this).parent('li').addClass('is-hovered');
		  $(this).parent().children('h3').children('.menu_parent').attr('aria-expanded', 'true');
		})
		.on("mouseleave", function () {
		  $(this).parent('li').removeClass('is-hovered');
		  $(this).parent().children('h3').children('.menu_parent').attr('aria-expanded', 'false');
		});
	}); // end document.ready()
})(jQuery);