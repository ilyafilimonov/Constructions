/* -- JS general

/* -- Шапка сайта -- */
jQuery(document).ready(function($){
	
	var mainHeader = $('header'),
		mainMenu = $('.header-menu'),
		secondaryNavigation = $('.cd-secondary-nav'),
		//this applies only if secondary nav is below intro section
		belowNavHeroContent = $('.sub-nav-hero'),
		headerHeight = mainHeader.height(),
		siteWidth = $(window).width(),
		mobileWidth = 767;
	
	//set scrolling variables
	var scrolling = false,
		previousTop = 0,
		currentTop = 0,
		scrollDelta = 10,
		scrollOffset = 150;

/*	mainHeader.on('click', '.nav-trigger, .menu_fon', function(event){
		// open primary navigation on mobile
		event.preventDefault();
		mainHeader.toggleClass('nav-open');
		$('.menu_fon').toggleClass('nav-open');
	});*/
	$(document).on('click', '.nav-trigger, .menu_fon', function(event){
		// open primary navigation on mobile
		event.preventDefault();
		mainHeader.toggleClass('nav-open');
		$('.menu_fon').toggleClass('nav-open');
	});

	$(window).on('scroll', function(){
		if( !scrolling ) {
			scrolling = true;
			(!window.requestAnimationFrame)
				? setTimeout(autoHideHeader, 250)
				: requestAnimationFrame(autoHideHeader);
		}
	});

	$(window).on('resize', function(){
		headerHeight = mainHeader.height();
		siteWidth = $(window).width();
	});

	function autoHideHeader() {
		var currentTop = $(window).scrollTop();

		( belowNavHeroContent.length > 0 ) 
			? checkStickyNavigation(currentTop) // secondary navigation below intro
			: checkSimpleNavigation(currentTop);

	   	previousTop = currentTop;
		scrolling = false;
	}

	function checkSimpleNavigation(currentTop) {
		//there's no secondary nav or secondary nav is below primary nav
	    if (previousTop - currentTop > scrollDelta) {
	    	//if scrolling up...
	    	mainHeader.removeClass('scrolledhide');
	    	mainMenu.css( "transform", "translateY(0)");
	    } else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
	    	//if scrolling down...
	    	mainHeader.addClass('scrolledhide');
	    	
			if(siteWidth<mobileWidth){
				mainMenu.css( "transform", "translateY("+headerHeight+"px)");
			}
			
	    }
	}

	function checkStickyNavigation(currentTop) {
		//secondary nav below intro section - sticky secondary nav
		var secondaryNavOffsetTop = belowNavHeroContent.offset().top - secondaryNavigation.height() - mainHeader.height();
		
		if (previousTop >= currentTop ) {
	    	//if scrolling up... 
	    	
	    	if( currentTop < secondaryNavOffsetTop ) {
	    		//secondary nav is not fixed
	    		mainMenu.css( "transform", "translateY(0)");
	    		mainHeader.removeClass('scrolledhide');
	    		secondaryNavigation.removeClass('fixed slide-up');
	    		belowNavHeroContent.removeClass('secondary-nav-fixed');
	    	} else if( previousTop - currentTop > scrollDelta ) {
	    		//secondary nav is fixed
	    		mainMenu.css( "transform", "translateY(0)");
	    		mainHeader.removeClass('scrolledhide');
	    		secondaryNavigation.removeClass('slide-up').addClass('fixed'); 
	    		belowNavHeroContent.addClass('secondary-nav-fixed');
	    	}
	    	
	    } else {
	    	//if scrolling down...	
	 	  	if( currentTop > secondaryNavOffsetTop + scrollOffset ) {
	 	  		//hide primary nav
	 	  		if(siteWidth<mobileWidth){
					mainMenu.css( "transform", "translateY("+headerHeight+"px)");
				}
	 	  		
				mainHeader.addClass('scrolledhide');
	    		secondaryNavigation.addClass('fixed slide-up');
	    		belowNavHeroContent.addClass('secondary-nav-fixed');
	    	} else if( currentTop > secondaryNavOffsetTop ) {
	    		//once the secondary nav is fixed, do not hide primary nav if you haven't scrolled more than scrollOffset
	    		mainMenu.css( "transform", "translateY(0)");
	    		mainHeader.removeClass('scrolledhide');
	    		secondaryNavigation.addClass('fixed').removeClass('slide-up');
	    		belowNavHeroContent.addClass('secondary-nav-fixed');
	    	}

	    }
	}
});



var cbpAnimatedHeader = (function() {

    var docElem = document.documentElement,
        header = document.querySelector( 'header' ),
        didScroll = false,
        changeHeaderOn = 30;

    function init() {
        window.addEventListener( 'scroll', function( event ) {
            if( !didScroll ) {
                didScroll = true;
                setTimeout( scrollPage, 10 );
            }
        }, false );
    }

    function scrollPage() {
        var sy = scrollY();
        if ( sy >= changeHeaderOn ) {
            classie.add( header, 'scrolled' );
        }
        else {
            classie.remove( header, 'scrolled' );
        }
        didScroll = false;
    }

    function scrollY() {
        return window.pageYOffset || docElem.scrollTop;
    }

    init();
})();
/* END -- Шапка сайта -- */



/* -- Мобильное меню -- */
$(document).ready(function() {
  $("#touch-menu").click(function() {
    $(this).addClass("show");
  });
});

$(document).ready(function(){
	var touch=$('#touch-menu');
	var menu=$('.header-menu');
	var body=$('body');
	$(touch).on('click',function(e){
		e.preventDefault();
	});
	$(window).resize(function(){
		var w=$(window).width();
		if(w>767&&menu.is(':hidden')){
			menu.removeAttr('style');
		}
	});
});
/* END -- Мобильное меню -- */





/* -- Мобильная корзина -- */

/* END -- Мобильная корзина -- */
	




$(function() {
  $('a.disabled').on('click', function(event) {
    event.preventDefault();
  });
});





/* -- Главное меню, выделение пунктов -- */
jQuery('.uMenuRoot').find('a').each(function(){
	if($(this).attr('href')==window.location.pathname) {
		$(this).addClass('uMenuItemA'); // добавляем текущему пункту 
		$(this).parents('.uMenuRoot').siblings('a').addClass('uMenuItemA'); // добавляем родителю
	} 
});
/* END -- Главное меню, выделение пунктов -- */





/* -- Всплывающие модальные окна -- 

 arcticModal — jQuery plugin
 Version: 0.3
 Author: Sergey Predvoditelev (sergey.predvoditelev@gmail.com)
 Company: Arctic Laboratory (http://arcticlab.ru/)

 Docs & Examples: http://arcticlab.ru/arcticmodal/

 */
(function(d){var g={type:"html",content:"",url:"",ajax:{},ajax_request:null,closeOnEsc:!0,closeOnOverlayClick:!0,clone:!1,overlay:{block:void 0,tpl:'<div class="arcticmodal-overlay"></div>',css:{backgroundColor:"#000",opacity:0.5}},container:{block:void 0,tpl:'<div class="arcticmodal-container"><table class="arcticmodal-container_i"><tr><td class="arcticmodal-container_i2"></td></tr></table></div>'},wrap:void 0,body:void 0,errors:{tpl:'<div class="arcticmodal-error arcticmodal-close"></div>',autoclose_delay:2E3,
ajax_unsuccessful_load:"Error"},openEffect:{type:"fade",speed:400},closeEffect:{type:"fade",speed:400},beforeOpen:d.noop,afterOpen:d.noop,beforeClose:d.noop,afterClose:d.noop,afterLoading:d.noop,afterLoadingOnShow:d.noop,errorLoading:d.noop},j=0,e=d([]),m={isEventOut:function(a,b){var c=!0;d(a).each(function(){d(b.target).get(0)==d(this).get(0)&&(c=!1);0==d(b.target).closest("HTML",d(this).get(0)).length&&(c=!1)});return c}},f={getParentEl:function(a){var b=d(a);return b.data("arcticmodal")?b:(b=
d(a).closest(".arcticmodal-container").data("arcticmodalParentEl"))?b:!1},transition:function(a,b,c,e){e=void 0==e?d.noop:e;switch(c.type){case "fade":"show"==b?a.fadeIn(c.speed,e):a.fadeOut(c.speed,e);break;case "none":"show"==b?a.show():a.hide(),e()}},prepare_body:function(a,b){d(".arcticmodal-close",a.body).unbind("click.arcticmodal").bind("click.arcticmodal",function(){b.arcticmodal("close");return!1})},init_el:function(a,b){var c=a.data("arcticmodal");if(!c){c=b;j++;c.modalID=j;c.overlay.block=
d(c.overlay.tpl);c.overlay.block.css(c.overlay.css);c.container.block=d(c.container.tpl);c.body=d(".arcticmodal-container_i2",c.container.block);b.clone?c.body.html(a.clone(!0)):(a.before('<div id="arcticmodalReserve'+c.modalID+'" style="display: none" />'),c.body.html(a));f.prepare_body(c,a);c.closeOnOverlayClick&&c.overlay.block.add(c.container.block).click(function(b){m.isEventOut(d(">*",c.body),b)&&a.arcticmodal("close")});c.container.block.data("arcticmodalParentEl",a);a.data("arcticmodal",c);
e=d.merge(e,a);d.proxy(h.show,a)();if("html"==c.type)return a;if(void 0!=c.ajax.beforeSend){var k=c.ajax.beforeSend;delete c.ajax.beforeSend}if(void 0!=c.ajax.success){var g=c.ajax.success;delete c.ajax.success}if(void 0!=c.ajax.error){var l=c.ajax.error;delete c.ajax.error}var n=d.extend(!0,{url:c.url,beforeSend:function(){void 0==k?c.body.html('<div class="arcticmodal-loading" />'):k(c,a)},success:function(b){a.trigger("afterLoading");c.afterLoading(c,a,b);void 0==g?c.body.html(b):g(c,a,b);f.prepare_body(c,
a);a.trigger("afterLoadingOnShow");c.afterLoadingOnShow(c,a,b)},error:function(){a.trigger("errorLoading");c.errorLoading(c,a);void 0==l?(c.body.html(c.errors.tpl),d(".arcticmodal-error",c.body).html(c.errors.ajax_unsuccessful_load),d(".arcticmodal-close",c.body).click(function(){a.arcticmodal("close");return!1}),c.errors.autoclose_delay&&setTimeout(function(){a.arcticmodal("close")},c.errors.autoclose_delay)):l(c,a)}},c.ajax);c.ajax_request=d.ajax(n);a.data("arcticmodal",c)}},init:function(a){a=
d.extend(!0,{},g,a);if(d.isFunction(this))if(void 0==a)d.error("jquery.arcticmodal: Uncorrect parameters");else if(""==a.type)d.error('jquery.arcticmodal: Don\'t set parameter "type"');else switch(a.type){case "html":if(""==a.content){d.error('jquery.arcticmodal: Don\'t set parameter "content"');break}var b=a.content;a.content="";return f.init_el(d(b),a);case "ajax":if(""==a.url){d.error('jquery.arcticmodal: Don\'t set parameter "url"');break}return f.init_el(d("<div />"),a)}else return this.each(function(){f.init_el(d(this),
d.extend(!0,{},a))})}},h={show:function(){var a=f.getParentEl(this);if(!1===a)d.error("jquery.arcticmodal: Uncorrect call");else{var b=a.data("arcticmodal");b.overlay.block.hide();b.container.block.hide();d("BODY").append(b.overlay.block);d("BODY").append(b.container.block);b.beforeOpen(b,a);a.trigger("beforeOpen");if("hidden"!=b.wrap.css("overflow")){b.wrap.data("arcticmodalOverflow",b.wrap.css("overflow"));var c=b.wrap.outerWidth(!0);var g=b.wrap.outerWidth(!0);g!=
c&&b.wrap.css("marginRight",g-c+"px")}e.not(a).each(function(){d(this).data("arcticmodal").overlay.block.hide()});f.transition(b.overlay.block,"show",1<e.length?{type:"none"}:b.openEffect);f.transition(b.container.block,"show",1<e.length?{type:"none"}:b.openEffect,function(){b.afterOpen(b,a);a.trigger("afterOpen")});return a}},close:function(){if(d.isFunction(this))e.each(function(){d(this).arcticmodal("close")});else return this.each(function(){var a=f.getParentEl(this);if(!1===a)d.error("jquery.arcticmodal: Uncorrect call");
else{var b=a.data("arcticmodal");!1!==b.beforeClose(b,a)&&(a.trigger("beforeClose"),e.not(a).last().each(function(){d(this).data("arcticmodal").overlay.block.show()}),f.transition(b.overlay.block,"hide",1<e.length?{type:"none"}:b.closeEffect),f.transition(b.container.block,"hide",1<e.length?{type:"none"}:b.closeEffect,function(){b.afterClose(b,a);a.trigger("afterClose");b.clone||d("#arcticmodalReserve"+b.modalID).replaceWith(b.body.find(">*"));b.overlay.block.remove();b.container.block.remove();a.data("arcticmodal",
null);d(".arcticmodal-container").length||(b.wrap.data("arcticmodalOverflow")&&b.wrap.css("overflow",b.wrap.data("arcticmodalOverflow")),b.wrap.css("marginRight",0))}),"ajax"==b.type&&b.ajax_request.abort(),e=e.not(a))}})},setDefault:function(a){d.extend(!0,g,a)}};d(function(){g.wrap=d(document.all&&!document.querySelector?"html":"body")});d(document).bind("keyup.arcticmodal",function(a){var b=e.last();b.length&&b.data("arcticmodal").closeOnEsc&&27===a.keyCode&&b.arcticmodal("close")});d.arcticmodal=
d.fn.arcticmodal=function(a){if(h[a])return h[a].apply(this,Array.prototype.slice.call(arguments,1));if("object"===typeof a||!a)return f.init.apply(this,arguments);d.error("jquery.arcticmodal: Method "+a+" does not exist")}})(jQuery);


/* -- Перечисление всплывающих окон -- */
$(function() {
	$('.toogle a').click(function() {
		$('#boxUserFirstInfo').arcticmodal();
	});

	$('.toogle2 a').click(function() {
		$('#boxUserFirstInfo2').arcticmodal();
	});
	$('.toogle3 a').click(function() {
		$('#boxUserFirstInfo3').arcticmodal();
	});
	$('.toogle4 a').click(function() {
		$('#boxUserFirstInfo4').arcticmodal();
	});
	$('.toogle5 a').click(function() {
		$('#boxUserFirstInfo5').arcticmodal();
	});
});
/* END -- Всплывающие модальные окна -- */











jQuery(document).ready(function($){
	$(document).on('click', '.question', function(event){
		event.preventDefault();
		$(this).toggleClass('show');
	});
});