jQuery(function ($) {

	$(document).ready(function() {
		
		"use strict";
		HeightTitles();
		PageLoad();
		ScrollEffects();
		Sliders();
		FirstLoad();
		PageLoadActions();
		FitThumbScreenGSAP();
		ShowcaseOverlapping();
		ShowcaseParallax();
		ShowcasePortfolio();
		ShowcaseGallery();
		FitThumbScreenWEBGL();
		Shortcodes();
		Core();
		JustifiedGrid();
		Lightbox();
		PlayVideo();
		Blog();
		InitContactMap();
		CustomFunction();
	});
	
	
/*--------------------------------------------------
Function CustomFunction
---------------------------------------------------*/

	function CustomFunction() {
		
		//Add here your custom js code
		
	}// End CustomFunction
	
	
	
/*--------------------------------------------------
	Function Cleanup Before Ajax
---------------------------------------------------*/	
	
	function CleanupBeforeAjax(){		
		// reset all scroll triggers
		let triggers = ScrollTrigger.getAll();
		triggers.forEach( trigger => {			
		  	trigger.kill();
		});
		
		ClapatSlider.instances.forEach(slider => slider.off());
		ClapatSlider.instances = [];
	}
		
	
/*--------------------------------------------------
Function Height Titles
---------------------------------------------------*/

	function HeightTitles() {
  
		function generateSpans(selector) {
			const elements = document.querySelectorAll(selector);
		
			elements.forEach((element) => {
				const text = element.textContent.trim();
				const words = text.split(' ');
		
				let finalHTML = ''; // Empty span at the beginning
		
				words.forEach((word, index) => {
					finalHTML += '<div>'; // Open a div for each word
					for (let i = 0; i < word.length; i++) {
						finalHTML += `<span>${word[i]}</span>`; // Wrap each letter in a span
					}
					finalHTML += '</div>'; // Close the div for each word
					
					if (index !== words.length - 1) {
						finalHTML += '<div><span></span></div>'; // Empty span and a div between words
					}
				});
		
				finalHTML += ''; // Empty span at the end
		
				element.innerHTML = finalHTML;
			});
		}
		
		generateSpans('.height-title .hero-title');
		generateSpans('.height-title .next-hero-title');
		generateSpans('.height-title .slide-hero-title');
		generateSpans('.fixed-title');
		

		function applyHoverEffect(selector) {
			const spans = document.querySelectorAll(selector);
			
			spans.forEach((span) => {
				span.originalScaleY = 1;
				span.addEventListener('mousemove', handleMouseMove);
			});
		
			function handleMouseMove(e) {
				const hoveredSpan = e.target;
				const rect = hoveredSpan.getBoundingClientRect();
				const mouseX = e.clientX - rect.left;
				const scaleFactor = 0.2;
				
				const center = rect.width / 2;
				let scale;
			
				if (mouseX < center) {
				  scale = (scaleFactor + 1) + (scaleFactor * mouseX) / center;
				} else {
				  scale = (scaleFactor + 1) + (scaleFactor * (rect.width - mouseX)) / center;
				}
			
				gsap.to(hoveredSpan, {
				  scaleY: scale,
				  duration: 0.5,
				  ease: 'power4.out',
				});
			
				const spansArray = Array.from(spans);
				const hoveredIndex = spansArray.indexOf(hoveredSpan);
			
				const prevSpan = spansArray[hoveredIndex - 1];
				const nextSpan = spansArray[hoveredIndex + 1];
			
				if (prevSpan) {
					let distanceFromMouse = Math.abs(rect.left - e.clientX);
					distanceFromMouse = Math.min(distanceFromMouse, center);
					
					const scalePrev = 1 + (scaleFactor * (center - distanceFromMouse)) / center;
					gsap.to(prevSpan, {
						scaleY: scalePrev,
						duration: 0.5,
						ease: 'power4.out',
					});
				}
			
				if (nextSpan) {
					let distanceFromMouse = Math.abs(rect.right - e.clientX);
					distanceFromMouse = Math.min(distanceFromMouse, center);
					
					const scaleNext = 1 + (scaleFactor * (center - distanceFromMouse)) / center;
					gsap.to(nextSpan, {
						scaleY: scaleNext,
						duration: 0.5,
						ease: 'power4.out',
					});
				}
			}
			
			spans.forEach((span) => {
				span.addEventListener('mouseleave', handleMouseLeave);
			});
		
			function handleMouseLeave() {
				spans.forEach((span) => {
					gsap.to(span, {
						scaleY: span.originalScaleY,
						duration: 0.5,
						ease: 'power4.out',
					});
				});
			}
		}
		
		applyHoverEffect('.height-title .hero-title span');
		applyHoverEffect('.height-title .next-hero-title span');
				
		
	}// End Height Titles	
				

/*--------------------------------------------------
Function Page Load
---------------------------------------------------*/

	function PageLoad() {
		
		gsap.set($(".menu-timeline .before-span"), {y: 120, opacity:0});
		
		// Page Navigation Events
		$(".preloader-wrap").on('mouseenter', function() {	
			var $this = $(this);			
			gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.4, borderColor:"rgba(255,255,255,0)", backgroundColor:"rgba(255,255,255,0.1)"});
			gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
			$("#ball").addClass("with-blur");
			$( "#ball" ).append( '<p class="center-first">' + $this.data("centerline") + '</p>' );				
		});
							
		$(".preloader-wrap").on('mouseleave', function() {					
			gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
			gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
			$("#ball").removeClass("with-blur");
			$('#ball p').remove();			
		});
		
		$('body').removeClass('hidden').removeClass('hidden-ball');
		
		gsap.to($("#header-container"), {duration: 0.5, opacity:1, delay:0.2, ease:Power2.easeOut}); 
		
		
		function initOnFirstLoad() {
		
			imagesLoaded('body', function() {
				gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
				$('#ball p').remove();
				gsap.to($(".percentage-wrapper"), {duration: 0.7, x:$(".trackbar").width()*0.5 - $(".percentage-wrapper").width() * 0.5, delay:0.3, ease:Power4.easeOut});
				gsap.to($(".percentage"), {duration: 0.7, opacity:0, y:-100, delay:1, ease:Power4.easeInOut});
				gsap.to($(".percentage-intro"), {duration: 0.5, opacity:0, delay:0, ease:Power4.easeInOut});
				gsap.to($(".preloader-intro span"), {duration: 0.7, opacity:0, xPercent: -101, delay:0.3, ease:Power4.easeOut});
				gsap.to($(".trackbar"), {duration: 0.7, clipPath: 'inset(0% 0%)', delay:0.3, ease:Power3.easeOut});										
				gsap.to($(".preloader-wrap"), {duration: 0.3, opacity:0, delay:1, ease:Power2.easeOut});
				gsap.set($(".preloader-wrap"), {visibility:'hidden', delay:1.3, yPercent: -101});										
				
				setTimeout(function(){
					$("#ball").removeClass("with-blur");
					
					gsap.to($(".header-middle, #footer-container"), {duration: 1, opacity:1, delay:0, ease:Power2.easeOut});
					
					if( $('.hero-video-wrapper').length > 0 ){
						$('#hero-image-wrapper').find('video').each(function() {
							$(this).get(0).play();
						});
						gsap.to($(".hero-video-wrapper"), {duration: 0.2, opacity:1, delay:0, ease:Power2.easeOut}); 
					}
					
					gsap.to($("#main"), {duration: 0, opacity:1, delay:0, ease:Power2.easeOut});
					
					if( $('#hero').hasClass("has-image")) {								
						gsap.set($("#hero-bg-image"), {scale:1.1 , opacity:0});
						gsap.set($("#hero-caption .hero-title span"), {y: 120, opacity:0});					
						gsap.set($("#hero-caption .hero-subtitle span"), {y: 30, opacity:0});
						
						gsap.to($("#hero-bg-image"), {duration: 1, scale:1 , opacity:1, delay:0.2, ease:Power2.easeOut});
						
						if ($("#hero-caption").hasClass("height-title")) {
					
							const spanLetters = document.querySelectorAll('#hero-caption .hero-title.caption-timeline span');
							
							gsap.set(spanLetters, {scaleY:0.3, opacity:0, y: 0});							
							const shuffledSpans = Array.from(spanLetters).sort(() => Math.random() - 0.5);
							const spanLettersPlay = gsap.timeline({ delay: 0.8 }); 
							
							shuffledSpans.forEach((spanLetters, index) => {
								spanLettersPlay.to(spanLetters, {
									duration: 0.7,
									scaleY: 1,
									y: 0, 
									opacity:1,
									ease: Power3.easeOut,
								}, index * 0.05); 
							});
							
							gsap.to('#hero-caption .hero-subtitle.caption-timeline span', {duration: 0.7, y: 0, opacity:1, stagger:0.1, delay:1, ease:Power3.easeOut, onComplete: function() {
								gsap.to($(".hero-footer-left, .hero-footer-right"), {duration: 1, y:0, opacity:1, delay:0, ease:Power2.easeOut});																				
								gsap.to($("#main-page-content, #page-nav"), {duration: 0.4, opacity:1, delay:0, ease:Power2.easeOut});
							}});
							
						} else {
						
							gsap.to($("#hero-caption .caption-timeline span"), {duration: 0.7, y: 0, opacity:1, stagger:0.1, delay:0.7, ease:Power3.easeOut, onComplete: function() {
								gsap.to($(".hero-footer-left, .hero-footer-right"), {duration: 1, y:0, opacity:1, delay:0, ease:Power2.easeOut});																				
								gsap.to($("#main-page-content, #page-nav"), {duration: 0.4, opacity:1, delay:0, ease:Power2.easeOut});
							}});
						
						}
						
					} else {													
						if ($("#hero-caption").hasClass("height-title")) {
					
							const spanLetters = document.querySelectorAll('#hero-caption .hero-title.caption-timeline span');
							
							gsap.set(spanLetters, {scaleY:0.3, opacity:0, y: 0});
							
							const shuffledSpans = Array.from(spanLetters).sort(() => Math.random() - 0.5);
							const spanLettersPlay = gsap.timeline({ delay: 0.8 }); 
							
							shuffledSpans.forEach((spanLetters, index) => {
								spanLettersPlay.to(spanLetters, {
									duration: 0.7,
									scaleY: 1,
									y: 0, 
									opacity:1,
									ease: Power3.easeOut,
								}, index * 0.05); 
							});
							
							gsap.to('#hero-caption .hero-subtitle.caption-timeline span', {duration: 0.7, y: 0, opacity:1, stagger:0.1, delay:1, ease:Power3.easeOut, onComplete: function() {		
								gsap.to($(".post-article-wrap"), {duration: 0.3, y: 0, opacity:1, ease:Power2.easeOut});
								gsap.to($(".error-button"), {duration: 0.3, y: 0, opacity:1, rotation:0, delay:0, ease:Power2.easeOut});
							}});
							
						} else {
							
							gsap.set($("#hero-caption .hero-title span"), {y: 120, opacity:0});
							gsap.set($("#hero-caption .hero-subtitle span"), {y: 30, opacity:0});	
							
							gsap.to($("#hero-caption .caption-timeline span"), {duration: 0.7, y: 0, opacity:1, stagger:0.1, delay:0.8, ease:Power3.easeOut, onComplete: function() {		
								gsap.to($(".post-article-wrap"), {duration: 0.3, y: 0, opacity:1, ease:Power2.easeOut});
								gsap.to($(".error-button"), {duration: 0.3, y: 0, opacity:1, rotation:0, delay:0, ease:Power2.easeOut});
							}});
							
						}
						
						gsap.to($("#main-page-content, #page-nav"), {duration: 0.3, opacity:1, delay:1.4, ease:Power2.easeOut});
						
						gsap.to($(".hero-footer-left, .hero-footer-right"), {duration: 0.3, y:0, opacity:1, delay:1.3, ease:Power2.easeOut, onComplete: function() {
							$("#hero-footer.has-border").addClass("visible");																			
						}});
										
					}
										
										
					// Fading In Showcase Gallery elements on Finised
					gsap.set($(".showcase-gallery .slide-hero-title span, .showcase-gallery .slide-hero-subtitle span"), { y: 120, opacity: 0 });
					if ($(".showcase-gallery .slider-fixed-content #slide-inner-caption").hasClass("height-title")) {
					
						const spanLetters = document.querySelectorAll('#slide-inner-caption .slide-hero-title.caption-timeline span');
						
						gsap.set(spanLetters, {scaleY:0.3, opacity:0, y: 0});							
						const shuffledSpans = Array.from(spanLetters).sort(() => Math.random() - 0.5);
						const spanLettersPlay = gsap.timeline({ delay: 0.6 }); 
						
						shuffledSpans.forEach((spanLetters, index) => {
							spanLettersPlay.to(spanLetters, {
								duration: 0.7,
								scaleY: 1,
								y: 0, 
								opacity:1,
								ease: Power3.easeOut,
							}, index * 0.05); 
						});
						gsap.to($(".showcase-gallery .slider-fixed-content .slide-hero-subtitle.caption-timeline span"), { duration: 0.7, y: 0, opacity:1, stagger:0.1, delay:0.6, ease:Power3.easeOut });
						
					} else {						
						gsap.to($(".showcase-gallery .slider-fixed-content .caption-timeline span"), { duration: 0.7, y: 0, opacity:1, stagger:0.1, delay:0.6, ease:Power3.easeOut });					
					}
					
					
					
					gsap.set($(".showcase-gallery .clapat-slider .slide-inner"), { opacity: 0 });
					gsap.to($(".showcase-gallery .clapat-slider .clapat-slide .slide-inner"), { duration: 2, opacity: 1, delay: 0.3, ease: Power4.easeOut });
					
					var gallerySlideClasses = [".clapat-slide-prev-two", ".clapat-slide-prev", ".clapat-slide-active", ".clapat-slide-next", ".clapat-slide-next-two"];
					
					gallerySlideClasses.forEach(function(gallerySlideClass, index) {
						var gallerySlide = $(".showcase-gallery .clapat-slider " + gallerySlideClass + " .slide-inner");
						var delay = 0 + index * 0.1;						
						gsap.set(gallerySlide, { xPercent: 250 });
						gsap.to(gallerySlide, { duration: 1.5, xPercent: 0, delay: delay, ease: Power4.easeOut });
					});
					
					
					// Fading In Showcase Footer Elements
					gsap.set($("#filters-wrapper, .clapat-pagination, .cp-button-prev, .cp-button-next, .progress-info, footer .link-text"), {opacity:0});
					gsap.to($("#filters-wrapper, .clapat-pagination, .cp-button-prev, .cp-button-next, .progress-info, footer .link-text"), {duration: 0.4, opacity:1, delay:0.8, ease:Power3.easeOut});
					
					
					$('body').addClass("header-visible");
					
				} , 800 );
			});
				
		}
		
		
		if (!$('body').hasClass("disable-ajaxload")) {
			
			
			var width = 100,
				perfData = window.performance.timing, 
				EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
				time = 1000
				
			// Loadbar Animation
			$(".loadbar").animate({
				width: width + "%"
			}, time  );	
			
			// Percentage Increment Animation
			var PercentageID = $("#precent"),
					start = 0,
					end = 100,
					durataion = time + 0;
					animateValue(PercentageID, start, end, durataion);
					
			function animateValue(id, start, end, duration) {
			  
				var range = end - start,
				  current = start,
				  increment = end > start? 1 : -1,
				  stepTime = Math.abs(Math.floor(duration / range)),
				  obj = $(id);
				
				var timer = setInterval(function() {
					current += increment;
					$(obj).text(current);
				  //obj.innerHTML = current;
					if (current == end) {
						clearInterval(timer);
					}
				}, stepTime);
			}
			
			// Fading Out Loadbar on Finised
			setTimeout(function(){				
				initOnFirstLoad();
				BlogPageLoad();
			}, time);
		
		} else {			
			initOnFirstLoad();
			BlogPageLoad();
		}
		
		
	}// End Page Load
	
	
/*--------------------------------------------------
Page Load Actions
---------------------------------------------------*/	
	
	function PageLoadActions() {
		
		
		// Default Page Navigation Load Events
		
		if (!isMobile()) {			
			
			
			$("#page-nav .page-title").on('mouseenter', function() {
				var $this = $(this);			
				gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.4, borderColor:"rgba(255,255,255,0)", backgroundColor:"rgba(128,128,128,0.5)"});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
				$("#ball").addClass("with-blur");
				$( "#ball" ).append( '<p class="center-first">' + $this.data("centerline") + '</p>' );				
			});
								
			$("#page-nav .page-title").on('mouseleave', function() {				
				gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
				$("#ball").removeClass("with-blur");
				$('#ball p').remove();			
			});
					
		}		
		
		if (!$("body").hasClass("disable-ajaxload")) {
			$('#page-nav .page-title').on('click', function() {	
				$("body").addClass("show-loader");
				$('header').removeClass('white-header');
				$("#app").remove();
				$(".big-title-caption").remove();	
					
				gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
				$("#ball").removeClass("with-icon");
				$('#ball p').remove();
				$('#ball i').remove();
				
				gsap.to('.hero-arrow i', {duration: 0.3, y:-40, opacity:0, delay:0, ease:Power2.easeInOut});				
				
				if ($(".page-nav-caption").hasClass("height-title")) {
					
					const spanLetters = document.querySelectorAll('.page-nav-caption .next-hero-title.caption-timeline span');
					const shuffledSpans = Array.from(spanLetters).sort(() => Math.random() - 0.5);
					const spanLettersPlay = gsap.timeline({ delay: 0.1 }); 
					
					shuffledSpans.forEach((spanLetters, index) => {
						spanLettersPlay.to(spanLetters, {
							duration: 0.3,
							scaleY: 0,
							opacity:0,
							ease: Power3.easeInOut,
						}, index * 0.03); 
					});
					
					gsap.to('.page-nav-caption .next-hero-subtitle.caption-timeline span', {duration: 0.3, y:-30, opacity:0, delay:0, stagger:0.05, ease:Power2.easeOut});
					
				} else {
					gsap.to('.page-nav-caption .caption-timeline span', {duration: 0.3, y:-100, opacity:0, delay:0, stagger:0.05, ease:Power2.easeInOut});
				}
				
				gsap.to($("#main-page-content, #hero, footer"), {duration: 0.3, opacity:0});
			});
		} else if ($("body").hasClass("disable-ajaxload")) {
			$('#page-nav .page-title').on('click', function() {					
				$("body").addClass("load-next-page");
				$("body").addClass("show-loader");
				$('header').removeClass('white-header');
				$("#app").remove();
				$(".big-title-caption").remove();	
					
				gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
				$("#ball").removeClass("with-icon");
				$('#ball p').remove();
				$('#ball i').remove();
				
				gsap.to($("#main-page-content, #hero, #page-nav"), {duration: 0.3, opacity:0});
				gsap.to($("footer"), {duration: 0.3, opacity:0, delay:0, ease:Power2.easeInOut});
			});
		}
		
		
		// Project Page Navigation Load Events
		if (!isMobile()) {
			
			$("#project-nav .next-ajax-link-project").on('mouseenter', function() {	
				var $this = $(this);		
				$( "#ball" ).append( '<p class="first">' + $this.data("firstline") + '</p>' + '<p>' + $this.data("secondline") + '</p>' );
				gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.4, borderColor:"rgba(255,255,255,0)", backgroundColor:"rgba(255,255,255,0.1)"});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
				$("#ball").addClass("with-blur");
				$("#project-nav .next-hero-title").addClass('hover-title');				
			});
							
			$("#project-nav .next-ajax-link-project").on('mouseleave', function() {	
				gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
				$("#ball").removeClass("with-blur");
				$('#ball p').remove();
				$("#project-nav .next-hero-title").removeClass('hover-title');
			});
		}
		
		if (!$("body").hasClass("disable-ajaxload")) {
			
			if ($(".next-ajax-link-project").hasClass("auto-trigger")) {
				
				if ( !(typeof window.ReachBottomArr === 'undefined' || window.ReachBottomArr === null) && Array.isArray( window.ReachBottomArr ) ) {
					
					window.ReachBottomArr.forEach( element => {						
						element.kill();
					});
				}
				
				window.ReachBottomArr = new Array();
				
				setTimeout(function() {	
					$('#project-nav').each(function(){
						var $this = $(this);
						const ReachBottom = ScrollTrigger.create({
							id: Math.floor(Math.random() * 100),
							trigger: $("#project-nav"),
							
							start: () => `top+=${window.innerHeight - 10}px`,
							onEnter: function( st ) { 
								$("body").addClass("show-loader");						
								$this.delay(500).queue(function() {
									
									gsap.set($("#project-nav.change-header, .next-hero-progress"), {backgroundColor:"transparent"});
									gsap.to($(".next-hero-progress"), {duration: 0.4, width:"0%", ease:Power4.easeOut,onComplete: function() {
										gsap.set($(".next-hero-progress"), {opacity:0});
									}});
									
									var link = $this.find('.next-ajax-link-project');
									link.trigger('click');
								});												
							},
							onLeaveBack: function() { 
								$("body").removeClass("show-loader");						
								$this.clearQueue();											
							}
						});				
						window.ReachBottomArr.push(ReachBottom);				
						imagesLoaded('body', function() {
							setTimeout( function(){
								ReachBottom.refresh()	
							} , 1200 );
						});						
					});
				}, 100);			
			}
			
			if( $('#hero-image-wrapper').hasClass("change-header-color")) {
				$('#hero-footer').addClass("white-header");	
			}	
			
			$('.next-ajax-link-project').on('click', function() {					
				$("body").addClass("load-project-thumb");
				$('header').removeClass('white-header');
				$("#app").remove();
				$('.next-project-image-wrapper').addClass("temporary").appendTo('body');
				
				if (!$(".next-ajax-link-project").hasClass("auto-trigger")) {
					$("body").addClass("show-loader");
				}				
				
				gsap.to($(".next-hero-counter span"), {duration: 0.3, y:-20, opacity:0, delay:0, ease:Power2.easeInOut});
				
				if ($(".next-project-caption").hasClass("height-title")) {
					
					const spanLetters = document.querySelectorAll('.next-project-caption .next-hero-title span');
					const shuffledSpans = Array.from(spanLetters).sort(() => Math.random() - 0.5);
					const spanLettersPlay = gsap.timeline({ delay: 0.1 }); 
					
					shuffledSpans.forEach((spanLetters, index) => {
						spanLettersPlay.to(spanLetters, {
							duration: 0.3,
							scaleY: 0,
							opacity:0,
							ease: Power3.easeInOut,
						}, index * 0.03); 
					});
					
				} else {
					gsap.to($(".next-hero-title span"), {duration: 0.3, y:-80, opacity:0, stagger:0.05, delay:0, ease:Power2.easeInOut});
				}
				
				
				gsap.to($(".next-hero-subtitle span"), {duration: 0.3, y:-40, opacity:0, stagger:0.05, delay:0.1, ease:Power2.easeInOut});
				
				gsap.set($("#project-nav.change-header, .next-hero-progress"), {backgroundColor:"transparent"});
				gsap.to($(".next-hero-progress span"), {duration: 0.4, width:"100%", ease:Power2.easeInOut,onComplete: function() {
					gsap.to($(".next-hero-progress"), {duration: 0.4, width:"0%", ease:Power2.easeInOut});
				}});
					
				gsap.to('#ball', {duration: 0.3, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
				gsap.to('#ball-loader', {duration: 0.3, borderWidth: '4px', top: 0, left: 0});
				$("#ball").removeClass("with-icon");
				$('#ball p').remove();
				$('#ball i').remove();
				
				gsap.to($("#main-page-content, #hero, #hero-image-wrapper"), {duration: 0.3, opacity:0});			
				gsap.to($(".next-project-image"), {duration: 0.6, scale:1.02, clipPath: 'inset(0 0%)', opacity:1, ease:Power2.easeInOut,onComplete: function() {
				  $('.temporary .next-project-image').addClass("visible")
				}});
				gsap.to($("footer, .all-works"), {duration: 0.3, opacity:0, ease:Power2.easeInOut});
			});
		} else if ($("body").hasClass("disable-ajaxload")) {
			$('.next-ajax-link-project').on('click', function() {					
				$("body").addClass("load-project-thumb-with-title").addClass("show-loader");							
				$('header').removeClass('white-header');
				$("#app").remove();									
				gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
				$("#ball").removeClass("with-icon with-blur");
				$('#ball p').remove();
				$('#ball i').remove();				
				gsap.to($("#main-page-content, #hero, #hero-image-wrapper, #project-nav"), {duration: 0.3, opacity:0});			
				gsap.to($(".next-project-image"), {duration: 0.6, scale:1, opacity: 0, ease:Power2.easeOut});
				gsap.to($("footer, .all-works"), {duration: 0.3, opacity:0, ease:Power2.easeInOut});							
			});
		}
		
		
	}// Page Load Actions
	
	

	
/*--------------------------------------------------
Function Lazy Load
---------------------------------------------------*/

	function LazyLoad() {	
		
		
		imagesLoaded('body', function() {
			$('body').removeClass('loading hidden scale-up scale-none');
			gsap.to($("#header-container, .header-middle"), {duration: 1, opacity:1, ease:Power2.easeOut});
			
			setTimeout(function(){
				
			    if( $('.hero-video-wrapper').length > 0 ){
				   $('#hero-image-wrapper').find('video').each(function() {
				     $(this).get(0).play();
				   });
				   gsap.to($(".hero-video-wrapper"), {duration: 0.2, opacity:1, delay:0, ease:Power2.easeOut}); 
		        }
			}, 200 );
		});
		
		gsap.to($("#main"), {duration: 0.3, opacity:1, delay:0, ease:Power2.easeOut});
		gsap.to($("#footer-container"), {duration: 1, opacity:1, delay:0.2, ease:Power2.easeOut});
				
		
		if( $('#hero').hasClass("has-image")) {	
			if( $('body').hasClass("load-project-thumb")) {
				
				if ($("#hero-caption").hasClass("height-title")) {
					
					const spanLetters = document.querySelectorAll('#hero-caption .hero-title.caption-timeline span');
					
					gsap.set(spanLetters, {scaleY:0.3, opacity:0, y: 0});
					
					const shuffledSpans = Array.from(spanLetters).sort(() => Math.random() - 0.5);
					const spanLettersPlay = gsap.timeline({ delay: 0.5 }); 
					
					shuffledSpans.forEach((spanLetters, index) => {
						spanLettersPlay.to(spanLetters, {
							duration: 0.7,
							scaleY: 1,
							y: 0, 
							opacity:1,
							ease: Power3.easeOut,
						}, index * 0.05); 
					});
					
					gsap.to('#hero-caption .hero-subtitle.caption-timeline span', {duration: 0.7, y: 0, opacity:1, stagger:0.1, delay:0.3, ease:Power3.easeOut, onComplete: function() {										
						gsap.to($(".hero-footer-left, .hero-footer-right"), {duration: 0.3, y:0, opacity:1, delay:0, ease:Power2.easeOut});																				
						gsap.to($("#main-page-content"), {duration: 0.3, opacity:1, delay:0, ease:Power2.easeOut});
					}});
					
				} else {
				
					gsap.set($("#hero-caption .hero-title span"), {y: 120, opacity:0});
					gsap.set($("#hero-caption .hero-subtitle span"), {y: 100, opacity:0});
					gsap.to($("#hero-caption .caption-timeline span"), {duration: 0.7, y: 0, opacity:1, stagger:0.2, delay:0.6, ease:Power3.easeOut, onComplete: function() {										
						gsap.to($(".hero-footer-left, .hero-footer-right"), {duration: 0.3, y:0, opacity:1, delay:0, ease:Power2.easeOut});																				
						gsap.to($("#main-page-content"), {duration: 0.3, opacity:1, delay:0, ease:Power2.easeOut});
					}});
				}
				
				gsap.to($("#hero-bg-image"), {duration: 0, scale:1.02, opacity:1, delay:0, ease:Power2.easeOut});				
				
				
			} else if( $('body').hasClass("load-project-thumb-with-title")) {
				gsap.set($("#hero-caption .hero-title span"), {y: 0, opacity:1});
				gsap.set($("#hero-caption .hero-subtitle span"), {y: 30, opacity:0});
								
				gsap.to($("#hero-bg-image"), {duration: 0, scale:1.02, opacity:1, delay:0, ease:Power2.easeOut});
				gsap.to($("#hero-caption .caption-timeline span"), {duration: 0.7, y: 0, opacity:1, stagger:0.2, delay:0.3, ease:Power3.easeOut, onComplete: function() {									
					gsap.to($(".hero-footer-left, .hero-footer-right"), {duration: 0.3, y:0, opacity:1, delay:0, ease:Power2.easeOut});																				
					gsap.to($("#main-page-content"), {duration: 0.3, opacity:1, delay:0, ease:Power2.easeOut});
				}});
			} else {
				gsap.set($("#hero-bg-image"), {scale:1.1 , opacity:0});
				gsap.set($("#hero-caption .hero-title span"), {y: 120, opacity:0});
				gsap.set($("#hero-caption .hero-subtitle span"), {y: 30, opacity:0});
				
				imagesLoaded('#hero-bg-image', function() {
					gsap.to($("#hero-bg-image"), {duration: 0.7, scale:1 , opacity:1, delay:0, ease:Power2.easeOut});
				});								
				gsap.to($("#hero-caption .caption-timeline span"), {duration: 0.7, y: 0, opacity:1, stagger:0.2, delay:0.3, ease:Power3.easeOut, onComplete: function() {
					gsap.to($(".hero-footer-left, .hero-footer-right"), {duration: 0.3, y:0, opacity:1, delay:0, ease:Power2.easeOut});																				
					gsap.to($("#main-page-content, #page-nav"), {duration: 0.3, opacity:1, delay:0, ease:Power2.easeOut});
				}});
			}

		} else {						
			
			if ($("#hero-caption").hasClass("height-title")) {
					
				const spanLetters = document.querySelectorAll('#hero-caption .hero-title.caption-timeline span');
				
				gsap.set(spanLetters, {scaleY:0.3, opacity:0, y: 0});
				
				const shuffledSpans = Array.from(spanLetters).sort(() => Math.random() - 0.5);
				const spanLettersPlay = gsap.timeline({ delay: 0.1 }); 
				
				shuffledSpans.forEach((spanLetters, index) => {
					spanLettersPlay.to(spanLetters, {
						duration: 0.7,
						scaleY: 1,
						y: 0, 
						opacity:1,
						ease: Power3.easeOut,
					}, index * 0.05); 
				});
				
				gsap.to('#hero-caption .hero-subtitle.caption-timeline span', {duration: 0.7, y: 0, opacity:1, stagger:0.1, delay:0.3, ease:Power3.easeOut, onComplete: function() {				
					gsap.to($(".post-article-wrap"), {duration: 0.3, y: 0, opacity:1, ease:Power2.easeOut});
					gsap.to($(".error-button"), {duration: 0.3, y: 0, opacity:1, rotation:0, delay:0, ease:Power2.easeOut});
				}});
				
			} else {
				
				gsap.set($("#hero-caption .hero-title span"), {y: 120, opacity:0});
				gsap.set($("#hero-caption .hero-subtitle span"), {y: 30, opacity:0});	
				
				gsap.to($("#hero-caption .caption-timeline span"), {duration: 0.7, y: 0, opacity:1, stagger:0.1, delay:0.3, ease:Power3.easeOut, onComplete: function() {				
					gsap.to($(".post-article-wrap"), {duration: 0.3, y: 0, opacity:1, ease:Power2.easeOut});
					gsap.to($(".error-button"), {duration: 0.3, y: 0, opacity:1, rotation:0, delay:0, ease:Power2.easeOut});
				}});
				
			}
			
			gsap.to($(".hero-footer-left, .hero-footer-right"), {duration: 0.3, y:0, opacity:1, delay:0.7, ease:Power2.easeOut, onComplete: function() {
				$("#hero-footer.has-border").addClass("visible");																			
			}});
																							
			gsap.to($("#main-page-content, #page-nav"), {duration: 0.3, opacity:1, delay:0.8, ease:Power2.easeOut});			
		}
		
		
		
		
		if( $('.load-project-thumb').length > 0 ){
			imagesLoaded('#hero-image-wrapper', function() {
				if (isMobile()) {
					$('#hero-image-wrapper').find('video').each(function() {
						$(this).get(0).play();
					});											
				}					
				setTimeout( function(){					
					$("#app.active").remove();
					$(".big-title-caption").remove();
					$('.thumb-wrapper').remove();
					gsap.to($(".next-project-image-wrapper.temporary"), {duration: 0.1, opacity: 0, ease:Power2.easeOut,onComplete: function() {
						$(".next-project-image-wrapper.temporary").remove();
						$(".temporary-hero").remove();
					}});
					if (!isMobile()) {
						$('#hero-image-wrapper').find('video').each(function() {
							$(this).get(0).play();
						});	
						gsap.to($(".hero-video-wrapper"), {duration: 0.2, opacity:1, delay:0.1, ease:Power2.easeOut});										
					} else if (isMobile()) {				
						gsap.to($(".hero-video-wrapper"), {duration: 0.2, opacity:1, delay:0.5, ease:Power2.easeOut});					
					}
				} , 450 );
			});
		} else if( $('.load-project-thumb-with-title').length > 0 ){
			imagesLoaded('#hero-image-wrapper', function() {
				if (isMobile()) {
					$('#hero-image-wrapper').find('video').each(function() {
						$(this).get(0).play();
					});											
				}				
				setTimeout( function(){					
					$("#app.active").remove();
					$('.thumb-wrapper').remove();
					$("#canvas-slider.active").remove();					
					gsap.to($(".next-project-image-wrapper.temporary"), {duration: 0.1, opacity: 0, ease:Power2.easeOut,onComplete: function() {
						$(".next-project-image-wrapper.temporary").remove();
						$(".temporary-hero").remove();
					}});
					if (!isMobile()) {
						$('#hero-image-wrapper').find('video').each(function() {
							$(this).get(0).play();
						});	
						gsap.to($(".hero-video-wrapper"), {duration: 0.2, opacity:1, delay:0.1, ease:Power2.easeOut});										
					} else if (isMobile()) {				
						gsap.to($(".hero-video-wrapper"), {duration: 0.2, opacity:1, delay:0.5, ease:Power2.easeOut});					
					}
					$('body').removeClass("load-project-thumb-with-title").removeClass("show-loader");	
				} , 200 );
			});			
		} else {
			imagesLoaded('#hero-image-wrapper', function() {
				$('#hero-image-wrapper').find('video').each(function() {
					$(this).get(0).play();
				});
				setTimeout( function(){					
					$("#app.active").remove();	
					$("#canvas-slider.active").remove();					
					gsap.to($(".next-project-image-wrapper.temporary"), {duration: 0.1, opacity: 0, ease:Power2.easeOut,onComplete: function() {
						$(".next-project-image-wrapper.temporary").remove();
						$(".temporary-hero").remove();
					}});
				} , 500 );
			});
		}
		
		setTimeout( function(){	
			$('header').removeClass('white-header');
			$('body').removeClass("load-project-thumb load-project-thumb-with-title load-next-page grid-open")
			setTimeout( function(){
				imagesLoaded('body', function() {	
					$('body').removeClass("show-loader disable-scroll");
				});
			} , 300 );			
		} , 800 );
		
	
	}// End Lazy Load
	



/*--------------------------------------------------
Function Showcase Overlapping Gallery
---------------------------------------------------*/
	
	function ShowcaseOverlapping() {
		
		
		if( $('.overlapping-gallery').length > 0 ){
			
			imagesLoaded('body', function() {
			
				
				gsap.utils.toArray('.overlapping-gallery').forEach((pinnedGallery) => {
					
					const pinnedImages = pinnedGallery.querySelectorAll('.overlapping-image');
					
					function setImagesProperties() {								
						gsap.set(pinnedImages, { height: window.innerHeight});						
					}
					
					setImagesProperties();
					
					window.addEventListener('resize', setImagesProperties);	
				
					pinnedImages.forEach((pImage, i, arr) => {
						if (i < arr.length - 1) {
							const durationMultiplier = arr.length - i - 1;
							
							
							
							ScrollTrigger.create({
								trigger: pImage,
								start: function() {
									const centerPin = (window.innerHeight - pImage.querySelector('.overlapping-image-inner').offsetHeight) / 2;
									return "top +=" + centerPin;
								},
								end: function() {
									const durationHeight = pImage.offsetHeight * durationMultiplier + (pImage.offsetHeight - pImage.querySelector('.overlapping-image-inner').offsetHeight)/2;
									return "+=" + durationHeight;
								},
								pin: true,
								pinSpacing: false,
								scrub: true,
							});
							
							const animationProperties = {
								scale: 0.75,
								opacity: 1,
								zIndex: 0,
								duration: 1,
								ease: Linear.easeNone
							};
							
							if (!isMobile()) {
								animationProperties.filter = "blur(10px)";
							}
							
							ScrollTrigger.create({
								trigger: pImage,
								start: function() {
									const centerPin = (window.innerHeight - pImage.querySelector('.overlapping-image-inner').offsetHeight) / 2;
									return "top +=" + centerPin;
								},
								end: function() {
									const durationHeight = pImage.offsetHeight + (pImage.offsetHeight - pImage.querySelector('.overlapping-image-inner').offsetHeight) / 2;
									return "+=" + durationHeight;
								},
								scrub: true,
								animation: gsap.to(pImage.querySelector('.overlapping-image-inner'), animationProperties),
							});

						}
					});
				
				});
				
			});
			
			
			if (!isMobile()) {	
							
				$(".overlapping-gallery .trigger-item").on('mouseenter', function() {
					$('#ball p').remove();
					var $this = $(this);			
					gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.4, borderColor:"rgba(255,255,255,0)", backgroundColor:"rgba(255,255,255,0.1)"});
					gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
					$("#ball").addClass("with-blur");
					$( "#ball" ).append( '<p class="center-first">' + $this.data("centerline") + '</p>' );
					$(this).find('video').each(function() {
						$(this).get(0).play();
					});								
				}).on('mouseleave', function() {	
					gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
					gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
					$("#ball").removeClass("with-blur");
					$('#ball p').remove();		
					$(this).find('video').each(function() {
						$(this).get(0).pause();
					});
				});
			
			}

			
			
			$('.trigger-item').on('click', function() {
				$("body").addClass("load-project-thumb");
				
				$('.overlapping-gallery .trigger-item').each(function(index) {
					var currentItem = $(this);
					var nextItem;
					var prevItem;
			
					if (currentItem.hasClass("above")) {
						
						nextItem = $('.overlapping-gallery .trigger-item').eq(index + 1);
			
						
						gsap.to(nextItem, {
							duration: 0.5,
							yPercent: 100,
							delay: 0.03,
							opacity: 1,
							ease: "power2.in"
						});
						
						gsap.to(currentItem, {
							duration: 0.3,
							filter: "blur(0px)",
							opacity: 1,
							ease: "power2.in"
						});
					} else {
						
						gsap.to(currentItem, {
							duration: 0.3,
							delay: 0,
							opacity: 0,
							ease: "power2.in"
						});
					}
				});
				
				
				setTimeout(function() {
					$("body").addClass("show-loader");
				}, 300);
				gsap.to('footer, .slide-date, .slide-cat', { duration: 0.5, opacity: 0, ease: Power2.easeIn });
				gsap.to('.slide-title span', { duration: 0.4, opacity: 0, yPercent:10, delay:0.1, ease: Power4.easeInOut });			
				gsap.to('#ball', { duration: 0.3, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent' });
				gsap.to('#ball-loader', { duration: 0.3, borderWidth: '4px', top: 0, left: 0 });
				$("#ball").removeClass("with-blur");
				$('#ball p').remove();
			});	
			
		} //End Overlapping Gallery
		
		
	}// End Showcase Overlapping Gallery


/*--------------------------------------------------
Function Showcase Parallax Gallery
---------------------------------------------------*/
	
	function ShowcaseParallax() {	
	
		if( $('.snap-slider-holder').length > 0 ){
			
			const snapSlider = document.querySelector(".snap-slider-container");			
			
			const snapImages = gsap.utils.toArray(".snap-slide");
			var snapImagesHeight = 0
			snapImages.forEach(function( snapImage )  {
				snapImagesHeight += $(snapImage).outerHeight(true);
			});
			console.log(snapImagesHeight)
			
						
			const snapCaptionWrapper = document.querySelector(".snap-slider-captions");
			
			const snapCaptions = gsap.utils.toArray(".snap-slide-caption");	
			const snapCaption = document.querySelector('.snap-slide-caption');			
			var snapCaptionsHeight = 0
			snapCaptions.forEach(function( snapCaption )  {
				snapCaptionsHeight += $(snapCaption).outerHeight(true);
			});
			console.log(snapCaptionsHeight)
			
			$('.snap-slide').each(function(){
				var $this = $(this);
				gsap.to($this, {			  
				  scrollTrigger: {
					trigger: $this,
					start: "top 50%",
					end: "+=" + innerHeight,
					onEnter: function() { 
						$(".snap-slider-captions").children().children().eq($this.index()).addClass("in-view");
						$this.find('video').each(function() {
							$(this).get(0).play();
						});					
					},
					onLeave: function() { 
						$(".snap-slider-captions").children().children().eq($this.index()).removeClass("in-view");
						$this.find('video').each(function() {
							$(this).get(0).pause();
						});						
					},
					onEnterBack: function() { 
						$(".snap-slider-captions").children().children().eq($this.index()).addClass("in-view");
						$this.find('video').each(function() {
							$(this).get(0).play();
						});
					}, 
					onLeaveBack: function() { 
						$(".snap-slider-captions").children().children().eq($this.index()).removeClass("in-view");
						$this.find('video').each(function() {
							$(this).get(0).pause();
						});						
					},
				  }
				});			
			});
				
						
			ScrollTrigger.create({
				trigger: snapCaptionWrapper,
				start: "top top",
				end: function() {
					const durationHeight = innerHeight*(snapImages.length - 1)
					return "+=" + durationHeight;
				},
				pin: true,
				scrub: true,
			});
			
			
			gsap.fromTo(snapCaptions, {
				y: (window.innerHeight - snapCaption.offsetHeight)/2
			},{
				y: - snapCaptionsHeight  + (window.innerHeight + snapCaption.offsetHeight)/2,
				scrollTrigger: {
					trigger: snapSlider,
					scrub: true,					
					start: "top top",
					end: "+=" + innerHeight*(snapImages.length - 1),
				},
				ease: 'none'
			})
			
    		
			gsap.set(snapImages, { height:window.innerHeight});
			
			const snap = gsap.utils.snap(1/(snapImages.length - 1));
		
			ScrollTrigger.create({
				trigger: snapImages,
				start: "top top",
				end: "+=" + innerHeight*(snapImages.length - 1),
				snap: {
					snapTo: snap,
					duration: {min: 0.2, max: 0.7},
					delay: 0,
					ease: "power4.inOut"
				}
			});

			snapImages.forEach((slide, i) => {
				let imageWrappers = slide.querySelectorAll('.img-mask');
				if (i === 0) {
				   gsap.fromTo(imageWrappers, {
						y: 0,
					}, {
						y: window.innerHeight,
						scrollTrigger: {
							trigger: slide,
							scrub: true,
							start: "top top",
						},
						ease: 'none'
					});
				} else if (i === snapImages.length - 1) {
					gsap.fromTo(imageWrappers, {
						y: -window.innerHeight,
					}, {
						y: 0,
						scrollTrigger: {
							trigger: slide,
							scrub: true,
							start: "top bottom",
							end: "top top",
						},
						ease: 'none'
					});
				} else {
					gsap.fromTo(imageWrappers, {
						y: -window.innerHeight,
					}, {
						y: window.innerHeight,
						scrollTrigger: {
							trigger: slide,
							scrub: true,
							start: "top bottom",
							
						},
						ease: 'none'
					});
				}
			});
		
			
			if (!isMobile()) {
				
				$(".slide-title-wrapper").mouseenter(function(e) {
					$('#ball p').remove();
					var $this = $(this);			
					gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.4, borderColor:"rgba(255,255,255,0)", backgroundColor:"rgba(255,255,255,0.1)"});
					gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
					$("#ball").addClass("with-blur");
					$( "#ball" ).append( '<p class="center-first">' + $this.parents(".snap-slide-caption").data("centerline") + '</p>' );
				});
								
				$(".slide-title-wrapper").mouseleave(function(e) {
					gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
					gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
					$("#ball").removeClass("with-blur");
					$('#ball p').remove();	
				});
			}
			
			
			// Snap Slider Project Load Events
			if (!$("body").hasClass("disable-ajaxload")) {
				$('.snap-slider-holder .slide-title').on('click', function() {
					
					var index = $(this).closest('.snap-slide-caption').index();
					
					let parent_slide = $(this).closest( '.snap-slide-caption' );
					parent_slide.addClass('above');					
					$("body").addClass("load-project-thumb").addClass("show-loader");
					if (!$("#clapat-page-content").hasClass("light-content")) {
						setTimeout( function(){
							$("header").removeClass("white-header");
						} , 100 );						
					}
					
					 $('.snap-slider-images .snap-slide').eq(index).find('.trigger-item-link').click();
															
					gsap.to(' #hero, #page-nav, footer, .fadeout-element', {duration: 0.5, opacity:0, delay:0.2, ease:Power4.easeInOut});					
					
					gsap.to('.slide-title span', {duration: 0.5, y:-120, opacity:0, stagger: 0.02, ease:Power2.easeInOut});
					gsap.to('.slide-subtitle span', {duration: 0.5, y:-60, opacity:0, stagger: 0.02, ease:Power2.easeInOut});					
					gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
					gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
					$("#ball").removeClass("with-blur");
					$('#ball p').remove();			
				});
			}  else {				
				gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
					gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
					$("#ball").removeClass("with-blur");
					$('#ball p').remove();
			}
			
			
		}
		
	}// End Showcase Parallax Gallery
	

/*--------------------------------------------------
Function Showcase Portfolio
---------------------------------------------------*/	
		
	function ShowcasePortfolio() {
		
		
		if( $('.showcase-portfolio').length > 0 ){
			
			var numberOfDivs = 13;

			function addCurtainRowsToContainer(container, curtainColor) {
				var heightPercentage = 100 / numberOfDivs;
			
				for (var i = 0; i < numberOfDivs; i++) {
					var newDiv = $('<div class="curtain-row"></div>');
					newDiv.css('top', heightPercentage * i + '%');
					newDiv.css('height', heightPercentage + '%');
					newDiv.css('background-color', curtainColor); // SeteazÄƒ culoarea de fundal
					container.append(newDiv);
				}
			}
			
			$('.curtains').each(function() {
				var curtainColor = $(this).data('curtain-color'); // ObÈ›ine culoarea din data attribute
				addCurtainRowsToContainer($(this), curtainColor);
			});
			
			
			
			if (isMobile()) {
				gsap.set($(".showcase-portfolio .slide-caption"), {y:30, opacity:0});
			}
			
			gsap.utils.toArray('.img-mask').forEach((thumbAnimation, index) => {
    		
				const curtainAnimation = thumbAnimation.querySelectorAll(".curtain-row");
						
				gsap.to(curtainAnimation, {				
					scrollTrigger: {
						trigger: thumbAnimation,
						start: "top 100%",
						onEnter: function() {
							thumbAnimation.classList.add('animated');
							thumbAnimation.closest('.slide-inner').classList.add('show-caption');
							if ($('body').hasClass("show-loader")) {
								setTimeout( function(){	
									gsap.to($(".showcase-portfolio .img-mask.animated .curtain-row"), {duration: 0.7, scaleY:0, opacity:0, stagger:0.1, delay:0.5, ease:Power2.easeOut});	
								} , 200 );
							}
							if (isMobile()) {									
								gsap.to($(".show-caption .slide-caption"), {duration: 0.3, y:0, opacity:1, delay:0.4, ease:Power2.easeOut});
							}
						},
					},
					duration: 0.7,
					stagger: {
						each: 0.01, 
						from: "start",
					},
					scaleY:0,
					delay: 0.15,
					ease:Power4.easeOut, onComplete: function() {												
						  thumbAnimation.querySelectorAll(".curtains").forEach(curtain => {
								curtain.remove(); 
						});
					}
				});
			});
			
			
			
			function filter() {
				var state = Flip.getState('.clapat-item');
				var projects = document.querySelectorAll('.clapat-item');
				var startHeight = gsap.getProperty(".showcase-portfolio", "height");
				
				var filters = document.querySelectorAll('.filter-option.is_active');
				var parallaxItems = document.querySelectorAll('.showcase-portfolio .clapat-item.vertical-parallax .slide-inner');
			
			  	var hasFilteredItems = false; 
			
				if (filters.length) {
					projects.forEach(function(project) {
						  gsap.set(project, { display: 'block' });
						  project.classList.remove('filtered');
					});
					filters.forEach(function(filter) {
				  		var colorClass = filter.dataset.filter;
				
						if (colorClass !== '') {
							projects.forEach(function(project) {
								if (!project.classList.contains(colorClass)) {
									gsap.set(project, { display: 'none' });
									project.classList.remove('filtered');
								} else {
									gsap.set(project, { display: 'block' });
									project.classList.add('filtered');
									hasFilteredItems = true; // Elemente filtrate gÄƒsite
								}
							});
						} else {
							projects.forEach(function(project) {
								gsap.set(project, { display: 'block' });
								project.classList.remove('filtered');
							});
						}
					});
				} else {
					projects.forEach(function(project) {
						gsap.set(project, { display: 'block' });
						project.classList.remove('filtered');
					});
				}
			
			  	var showcasePortfolio = document.querySelector('.showcase-portfolio');
				
				if (hasFilteredItems) {
					showcasePortfolio.classList.add('items-filtered');
				} else {
					showcasePortfolio.classList.remove('items-filtered');
				}
				
				showcasePortfolio.classList.add('ease-transform');				
			
				var endHeight = gsap.getProperty(".showcase-portfolio", "height");
				
				var flip = Flip.from(state, {
					duration: 0.6,
					ease: "power3.inOut",
					stagger: 0,
					absolute: true,
					onEnter: elements => gsap.fromTo(elements, {opacity: 0, scale: 0}, {opacity: 1, scale: 1, duration: .6}),
					onLeave: elements => gsap.fromTo(elements, {opacity: 1, scale: 1}, {opacity: 0, scale: 0, duration: .6}),
					onComplete: function() {												
					  	ScrollTrigger.refresh();						
						showcasePortfolio.classList.remove('ease-transform');
					}
				})
				
				flip.fromTo(".showcase-portfolio", { height: startHeight }, { height: endHeight, clearProps: "height", ease: "power3.inOut", duration: flip.duration() }, 0);
			}
			
			const filtersOptionDiv = document.querySelector('.filters-options-wrapper');
			
			if (filtersOptionDiv) {
				document.querySelectorAll('.filter-option').forEach(function(option) {
					option.addEventListener('click', function(event) {
						event.preventDefault();
						document.querySelector('.filter-option.is_active').classList.remove('is_active');
						event.currentTarget.classList.add('is_active');
						filter();
					});
				});
			}

			
			
			if ($(window).width() > 767) {		
				
					gsap.utils.toArray('.vertical-parallax').forEach((parallaxElement, index) => {
						const parallaxElementChild = parallaxElement.querySelector(".slide-inner");
						const offsetParallax = parallaxElementChild.offsetHeight;					
						gsap.fromTo( parallaxElementChild, { y: 0 },	{ y: offsetParallax, 
							ease: "none",
								scrollTrigger: {
									trigger: parallaxElement,
									scrub: true,
									start: "top 100%",
									end: function() {
										const endPin = window.innerHeight*2;
										return "+=" + endPin;
									},
								}
							}
						);
					});
			}
			
			
			if (!isMobile()) {	
							
				$(".showcase-portfolio .clapat-item .slide-inner").on('mouseenter', function() {
					$('#ball p').remove();
					var $this = $(this);			
					gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.4, borderColor:"rgba(255,255,255,0)", backgroundColor:"rgba(255,255,255,0.1)"});
					gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
					$("#ball").addClass("with-blur");
					$( "#ball" ).append( '<p class="center-first">' + $this.data("centerline") + '</p>' );
					$(this).find('video').each(function() {
						$(this).get(0).play();
					});								
				}).on('mouseleave', function() {	
					gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
					gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
					$("#ball").removeClass("with-blur");
					$('#ball p').remove();		
					$(this).find('video').each(function() {
						$(this).get(0).pause();
					});
				});
				
				$(".showcase-portfolio .clapat-item .slide-inner").on('mouseenter', function() {
					if (!$('.showcase-portfolio').hasClass('list-grid')) {
						gsap.set($(this).find('.slide-title span'), {y:30, opacity:0, });
						gsap.set($(this).find('.slide-cat span'), {y:30, opacity:0, });
						gsap.to($(this).find('.slide-caption'), {duration: 0.2, opacity:1, ease:Power2.easeOut});
						gsap.to($(this).find('.slide-title span'), {duration: 0.3, y:0, opacity:1, ease:Power2.easeOut});										
						gsap.to($(this).find('.slide-cat span'), {duration: 0.3, y:0, opacity:1, ease:Power2.easeOut});
					}
				}).on('mouseleave', function() {
					if (!$('.showcase-portfolio').hasClass('list-grid')) {
						gsap.to($(this).find('.slide-caption'), {duration: 0.3, opacity:0, delay:0.1, ease:Power2.easeOut});					
						gsap.to($(this).find('.slide-title span'), {duration: 0.3, y:-30, opacity:0, ease:Power2.easeOut});					
						gsap.to($(this).find('.slide-cat span'), {duration: 0.5, y:-30, delay:0.05, opacity:0, ease:Power2.easeOut});
					}
				});
			
			}			

			
			$('.trigger-item').on('click', function() {
				if (!$('.showcase-portfolio').hasClass('list-grid')) {
					$("body").addClass("load-project-thumb");
				}
				$('.showcase-portfolio .trigger-item').each(function(){
					if (!$(this).hasClass("above")) {
						gsap.to($(this), {duration: 0.5, delay:0, opacity:0, ease:Power4.easeInOut});
					} else  {
						gsap.to($(this), {duration: 0.5, delay:0.4, opacity:0, ease:Power4.easeInOut});	
					}
				});
				setTimeout(function() {
					$("body").addClass("show-loader");
				}, 300);
				gsap.to('footer, .carousel-nav-wrapper, .showcase-portfolio.list-grid', { duration: 0.5, opacity: 0, ease: Power4.easeInOut });			
				gsap.to('#ball', { duration: 0.3, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent' });
				gsap.to('#ball-loader', { duration: 0.3, borderWidth: '4px', top: 0, left: 0 });
				$("#ball").removeClass("with-blur");
				$('#ball p').remove();
			});
			
		}
	
	}//End Showcase Portfolio
	
	
/*--------------------------------------------------
Function Blog Page Load
---------------------------------------------------*/
	function BlogPageLoad() {
		
		gsap.to($("#hero .entry-date li"), {duration: 0.4,  y: 0, opacity:1, delay:1.6, ease:Power2.easeOut});
		
		var animateHeroMeta = gsap.timeline();		
		$("#hero .entry-categories li").each(function(index, element) {
			animateHeroMeta.to(element, {duration: 0.7, y:0, opacity:1, delay:1.9, ease:Power2.easeOut}, index * 0.02)
		});
		
		gsap.to($("#blog-page-content"), {duration: 0.4, opacity:1, delay:1.8, ease:Power2.easeOut});
		gsap.to($("#blog-post-content"), {duration: 0.4, opacity:1, delay:1.8, ease:Power2.easeOut});
		
		setTimeout( function(){
			$('#blog-effects article').addClass('show-borders')
		} ,300 );
		
	}//End Blog	Page Load
	
	
/*--------------------------------------------------
Function Blog Lazy Load
---------------------------------------------------*/
	function BlogLazyLoad() {
		
		gsap.to($("#hero .entry-date li"), {duration: 0.4,  y: 0, opacity:1, delay:0.1, ease:Power2.easeOut});
		
		var animateHeroMeta = gsap.timeline();		
		$("#hero .entry-categories li").each(function(index, element) {
			animateHeroMeta.to(element, {duration: 0.7, y:0, opacity:1, delay:0.3, ease:Power2.easeOut}, index * 0.02)
		});
		
		gsap.to($("#blog-page-content"), {duration: 0.4, opacity:1, delay:0.6, ease:Power2.easeOut});
		gsap.to($("#blog-post-content"), {duration: 0.4, opacity:1, delay:0.6, ease:Power2.easeOut});
		
		setTimeout( function(){
			$('#blog-effects article').addClass('show-borders')
		} ,300 );
		
	}//End Blog	Lazy Load		
	
		
/*--------------------------------------------------
Function Blog
---------------------------------------------------*/
	
	function Blog() {
		
		if( $('#blog-nav-minimal').length > 0 ){
			$('#blog-page-nav').removeClass("content-max-width");
		}
		
		if ($("#blog-effects").hasClass("clapat-blog-fade-in-on-scroll")) {
		
			gsap.set($(".article-bg"), {opacity:0, top: "100px"});
			
			var thumbAnimation = gsap.utils.toArray('.article-bg');			
			thumbAnimation.forEach(function(tAnimation) {					
				gsap.to(tAnimation, { 					
					scrollTrigger: {
						trigger: tAnimation,
						start: "top 100%",
						stagger:0.5,
						onEnter: function() {
							tAnimation.classList.add('animated');							
							if ($('body').hasClass("show-loader")) {
								setTimeout( function(){	
									gsap.set($(".article-bg.animated"), { opacity:0});
									gsap.to($(".article-bg.animated"), {duration: 0.7, opacity:1, top: "0px", stagger:0.1, delay:0.5, ease:Power2.easeOut});	
								} , 200 );
							}
						},
					},
					duration: 0.7,
					delay:0.3,
					opacity:1,	
					top: "0px",
					ease:Power2.easeOut, onComplete: function() {												
						gsap.set(tAnimation, {opacity:""});
					}
				});
			});
		
		}
		
		// News Shortcode
		if ($("#blog-effects").hasClass("clapat-blog-expand-on-scroll")) {
			
			if ($(window).width() >= 1024) {
		
				gsap.utils.toArray('#blog-effects').forEach((newsShortcode) => {
					const newsPosts = Array.from(newsShortcode.querySelectorAll("article"));
					
					newsPosts.forEach((newsPost, index) => {
						
						newsPosts[0].classList.add("in-view");
						gsap.set(newsPosts[0], { opacity: 1});
						
						const newsContent = newsPost.querySelector(".article-links");				
						const newsExcerpt = newsPost.querySelector(".blog-excerpt");
						
						const newsPostHeight = gsap.getProperty(newsPost, "height");
						const newsContentHeight = gsap.getProperty(newsExcerpt, "height");
						
						
						
						if (index === 0) {
							gsap.set(newsContent, { height: "auto" });
						} else {
							gsap.set(newsContent, { height: 0 });
						}
						
						
						gsap.to(newsPost, {
							scrollTrigger: {
								trigger: newsPost,
								start: () => {
									const startPin = (window.innerHeight / 2);
									return "top +=" + startPin;
								},
								end: () => {
									const endPin = (window.innerHeight / 2)  - (gsap.getProperty(newsPost, "height")/2);
									return "+=" + endPin;
								},
								onEnter: () => {
									newsPost.classList.add("in-view");
									gsap.to(newsPost, { duration: 0.2, opacity: 1, ease: "power2.easeOut" });
									gsap.to(newsContent, { duration: 0.2, height: "auto", ease: "power2.easeOut" });
									console.log(gsap.getProperty(newsPost, "height")); 
								},
								onLeave: () => {
									if (index !== newsPosts.length - 1) {
										newsPost.classList.remove("in-view");
										gsap.to(newsPost, { duration: 0.2, opacity: 0.2, ease: "power2.easeOut" });
										gsap.to(newsContent, { duration: 0.2, height: 0, ease: "power2.easeOut" });
										
									}
								},
								onEnterBack: () => {
									newsPost.classList.add("in-view");
									gsap.to(newsPost, { duration: 0.2, opacity: 1, ease: "power2.easeOut" });
									gsap.to(newsContent, { duration: 0.2, height: "auto", ease: "power2.easeOut" });
								},
								onLeaveBack: () => {
									if (index !== 0 ) {
										newsPost.classList.remove("in-view");
										gsap.to(newsPost, { duration: 0.2, opacity: 0.2, ease: "power2.easeOut" });
										gsap.to(newsContent, { duration: 0.2, height: 0, ease: "power2.easeOut" });
									}
								},
							},
						});
					});
					
					
				});
			
			}
		
		}
		
		if ($("body").hasClass("smooth-scroll")) {
			var elem = document.querySelector("#content-scroll");
			var scrollbar = Scrollbar.init(elem,
			{
				renderByPixels: true,
				damping:0.05
			});
		}
		
		
		if( $('#blog-effects').length > 0 ){
			
			if ($(window).width() >= 1024) {
				
				const getMousePos = (e) => {
					let posx = 0;
					let posy = 0;
					if (!e) e = window.event;
					if (e.pageX || e.pageY) {
						posx = e.pageX;
						posy = e.pageY;
					}
					else if (e.clientX || e.clientY) 	{
						posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
						posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
					}
					return { x : posx, y : posy }
				}
			
				// Effect 1
				class HoverImgFx1 {
					constructor(el) {
						this.DOM = {el: el};
						this.DOM.reveal = this.DOM.el.querySelector('.hover-reveal');				
						this.DOM.revealInner = this.DOM.reveal.querySelector('.hover-reveal__inner');
						this.DOM.revealInner.style.overflow = 'hidden';
						this.DOM.revealImg = this.DOM.revealInner.querySelector('.hover-reveal__img');
						this.initEvents();
					}
					initEvents() {				
						
						this.positionElement = (ev) => {
							const mousePos = getMousePos(ev);
							if ($("body").hasClass("smooth-scroll")) {
								const docScrolls = {
									left : document.body.scrollLeft + document.documentElement.scrollLeft, 
									top : - scrollbar.scrollTop
								};
								gsap.to($('.hover-reveal'), { duration: 1, top: `${mousePos.y-(this.DOM.el.querySelector('.hover-reveal').offsetHeight*0.5)-docScrolls.top}px`, left: `${mousePos.x-(this.DOM.el.querySelector('.hover-reveal').offsetWidth*0.5)-docScrolls.left}px`, ease:Power4.easeOut });
							} else {
								const docScrolls = {
									left : document.body.scrollLeft + document.documentElement.scrollLeft, 
									top : document.body.scrollTop + document.documentElement.scrollTop
								};
								gsap.to($('.hover-reveal'), { duration: 1, top: `${mousePos.y-(this.DOM.el.querySelector('.hover-reveal').offsetHeight*0.5)-docScrolls.top}px`, left: `${mousePos.x-(this.DOM.el.querySelector('.hover-reveal').offsetWidth*0.5)-docScrolls.left}px`, ease:Power4.easeOut });
							}
							
						};
						this.mouseenterFn = (ev) => {
							this.positionElement(ev);
							this.showImage();
						};
						this.mousemoveFn = ev => requestAnimationFrame(() => {
							this.positionElement(ev);
						});
						this.mouseleaveFn = () => {
							this.hideImage();
						};
						
						this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
						this.DOM.el.addEventListener('mousemove', this.mousemoveFn);
						this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
					}
					showImage() {
						gsap.killTweensOf(this.DOM.revealInner);
						gsap.killTweensOf(this.DOM.revealImg);
			
						this.tl = gsap.timeline({
							onStart: () => {
								this.DOM.reveal.style.opacity = 1;
								gsap.set(this.DOM.el, {zIndex: 1000});
							}
						})
						.add('begin')
						.add(gsap.to(this.DOM.revealInner, {
							duration: 0.4,
							ease: Sine.easeOut,
							startAt: {x: '-100%'},
							x: '0%'
						}), 'begin')
						.add(gsap.to(this.DOM.revealImg, {
							duration: 0.4,
							ease: Sine.easeOut,
							startAt: {x: '100%'},
							x: '0%'
						}), 'begin');
					}
					hideImage() {
						gsap.killTweensOf(this.DOM.revealInner);
						gsap.killTweensOf(this.DOM.revealImg);
			
						this.tl = gsap.timeline({
							onStart: () => {
								gsap.set(this.DOM.el, {zIndex: 999});
							},
							onComplete: () => {
								gsap.set(this.DOM.el, {zIndex: ''});
								gsap.set(this.DOM.reveal, {opacity: 0});
							}
						})
						.add('begin')
						.add(gsap.to(this.DOM.revealInner, {
							duration: 0.4,
							ease: Sine.easeOut,
							x: '100%'
						}), 'begin')
						
						.add(gsap.to(this.DOM.revealImg, {
							duration: 0.4,
							ease: Sine.easeOut,
							x: '-100%'
						}), 'begin');
					}
				}
				
				if( $('.has-post-thumbnail').length > 0 ){
					Array.from(document.querySelectorAll('.has-post-thumbnail .article-show-image')).forEach(link => new HoverImgFx1(link));
				}
				
			}
			
		}		
		
		
		if (!isMobile()) {				
			$("article .hover-reveal").on('mouseenter', function() {	
				var $this = $(this);					
				gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.2, borderColor:'#000', backgroundColor:'#000'});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
				$( "#ball" ).addClass("with-icon").append( '<i class="arrow-icon"></i>' );
			});
							
			$("article .hover-reveal").on('mouseleave', function() {	
				var $this = $(this);					
				gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
				$("#ball").removeClass("with-icon");
					$('#ball i').remove();
			});
		}
		
		gsap.to($("#sidebar"), {duration: 0.7, opacity:1, delay:0.3, ease:Power2.easeOut});
		
		$('a.ajax-link').on('click', function() {
			gsap.to($("#sidebar"), {duration: 0.3, opacity:0, delay:0});
		});
		
		$("#black-fade").on('mouseenter', function() {	
			gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#fff',});
			gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
			$( "#ball" ).addClass("close-icon").append( '<i class="fa-solid fa-xmark"></i>' );
		});
					
		$("#black-fade").on('mouseleave', function() {	
			gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999',});
			gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
			$("#ball").removeClass("close-icon");
			$('#ball i').remove();
		});
		
		$("#black-fade").on('click', function() {	
			gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999',});
			gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
			$("#ball").removeClass("close-icon");
			$('#ball i').remove();
		});
		
		$('#open-sidebar, #open-sidebar-nav, #black-fade').on('click', function() {
			$('#open-sidebar').toggleClass('open');
			$('#sidebar').toggleClass('open');
			$('#black-fade').toggleClass('fade-in');
		});
		
		$('#sidebar select').wrap( "<div class='select hide-ball'></div>" );
	
	}//End Blog

	
/*--------------------------------------------------
Function Showcase Gallery
---------------------------------------------------*/	
		
	function ShowcaseGallery() {
		
		if( $('.showcase-gallery').length > 0 ){
			
			$("footer").addClass("showcase-footer");
			
			gsap.set($(".showcase-gallery .slide-hero-title span, .showcase-gallery .slide-hero-subtitle span"), { y: 120, opacity: 0 });
			gsap.set($(".showcase-gallery .clapat-slider .slide-inner"), { opacity: 0 });
			
			
			
			slider = new ClapatSlider('.showcase-gallery', { 
				direction: 'horizontal', 
				snap: false,
				navigation: {
					nextEl: '.cp-button-next',
					prevEl: '.cp-button-prev'
				},
				parallax : [{
					element: '.speed-50',
					margin: -80					
				}],
				on: {	
					init : function(slide) {
						
						if ($('body').hasClass("show-loader")) {
							
							imagesLoaded('body', function() {
						
								if ($(".showcase-gallery .slider-fixed-content #slide-inner-caption").hasClass("height-title")) {
					
									const spanLetters = document.querySelectorAll('#slide-inner-caption .slide-hero-title.caption-timeline span');
									
									gsap.set(spanLetters, {scaleY:0.3, opacity:0, y: 0});							
									const shuffledSpans = Array.from(spanLetters).sort(() => Math.random() - 0.6);
									const spanLettersPlay = gsap.timeline({ delay: 0.3 }); 
									
									shuffledSpans.forEach((spanLetters, index) => {
										spanLettersPlay.to(spanLetters, {
											duration: 0.7,
											scaleY: 1,
											y: 0, 
											opacity:1,
											ease: Power3.easeOut,
										}, index * 0.05); 
									});
									gsap.to($(".showcase-gallery .slider-fixed-content .slide-hero-subtitle.caption-timeline span"), { duration: 0.7, y: 0, opacity: 1, stagger: 0.1, delay: 0.5, ease: Power3.easeOut });									
								} else {						
									gsap.to($(".showcase-gallery .slider-fixed-content .caption-timeline span"), { duration: 0.7, y: 0, opacity: 1, stagger: 0.1, delay: 0.6, ease: Power3.easeOut });					
								}
								
								gsap.to($(".showcase-gallery .clapat-slider .clapat-slide .slide-inner"), { duration: 0.7, opacity: 1, delay: 0.4, ease: Power2.easeOut });
								
								var gallerySlideClasses = [".clapat-slide-prev-two", ".clapat-slide-prev", ".clapat-slide-active", ".clapat-slide-next", ".clapat-slide-next-two"];
								
								gallerySlideClasses.forEach(function(gallerySlideClass, index) {
									var gallerySlide = $(".showcase-gallery .clapat-slider " + gallerySlideClass + " .slide-inner");
									var delay = 0 + index * 0.1;						
									gsap.set(gallerySlide, { xPercent: 150 });
									gsap.to(gallerySlide, { duration: 1.5, xPercent: 0, delay: delay, ease: Power4.easeOut });
								});
								
								gsap.to($("#filters-wrapper, .clapat-pagination, .cp-button-prev, .cp-button-next, .progress-info, footer .link-text"), {duration: 0.5, opacity:1, delay:0.4, ease:Power2.easeOut});
							
							});
						
						}
						
					},
					slideLeaveViewport : function( slide ) {						
						gsap.set($('.clapat-slider div:not(.clapat-slide-visible) .slide-events'), { x: "" });						
					},

				},
			});
			
			 slider.tl					
			 	.fromTo('.progress-info-fill', {backgroundSize:"0% 100%" }, {backgroundSize:"100% 100%" }, 0)
				.fromTo('.progress-info-fill-2', {backgroundSize:"100% 100%" }, {backgroundSize:"0% 100%", duration: 0.3, ease: 'power3' }, 0);
			
			
			
			class Item {
								
				constructor(DOM_el) {
					
					// DOM elements
					this.DOM = {
						// main element (.item)
						el: null,
						// imageWrap (.item__image-wrap)
						imageWrap: null,
						// imageCaption
						imageCaption: null,
						// image (.item__image)
						image: null,
						// imageInner (.item__image > .item__image-inner)
						imageInner: null,
					}; 
					
					this.DOM.el = DOM_el;
					this.DOM.imageWrap = this.DOM.el.querySelector('.slide-moving');
					if( this.DOM.imageWrap != null ){						
						this.DOM.imageCaption = this.DOM.imageWrap.querySelector('.slide-caption');
					}
					this.DOM.image = this.DOM.el.querySelector('.trigger-item');
					if( this.DOM.image != null ){						
						this.DOM.imageInner = this.DOM.image.querySelector('.section-image');
					}
				}
			}
			
			
			// Placeholder for the grid items (.item__image). We'll use the gsap FLIP plugin to move the "".item .item__image" inside the grid element
			const grid = document.querySelector('.gallery-thumbs-wrapper');
			const triggeredImage = document.querySelector('.gallery-zoom-wrapper');
			
			let animateTitle = gsap.timeline();	
					
			let endScaleSmall = gsap.getProperty(".showcase-gallery .has-scale-small .section-image", "scale");
			gsap.set(".showcase-gallery .has-scale-small .section-image", { scale:endScaleSmall});		
			let endScaleMedium = gsap.getProperty(".showcase-gallery .has-scale-medium .section-image", "scale");
			gsap.set(".showcase-gallery .has-scale-medium .section-image", { scale:endScaleMedium});			
			
			
			const showGrid = () => {
				
				document.body.classList.add('grid-open', 'disable-scroll');
				
				slider.enabled = false;
				
				gsap.to($("footer .link-text, .clapat-pagination, .progress-info, #filters-wrapper"), {duration: 0.3, opacity:0, y:30, stagger:-0.05, ease:Power2.easeInOut});
								
				if ($(".showcase-gallery .slider-fixed-content #slide-inner-caption").hasClass("height-title")) {
					
					const spanLetters = document.querySelectorAll('#slide-inner-caption .slide-hero-title.caption-timeline span');
					const shuffledSpans = Array.from(spanLetters).sort(() => Math.random() - 0.5);
					const spanLettersPlay = gsap.timeline({ delay: 0 }); 
					
					shuffledSpans.forEach((spanLetters, index) => {
						spanLettersPlay.to(spanLetters, {
							duration: 0.3,
							scaleY: 0,
							opacity:0,
							ease: Power3.easeInOut,
						}, index * 0.03); 
					});
					gsap.to($(".showcase-gallery .slider-fixed-content .slide-hero-subtitle.caption-timeline span"), { duration: 0.3, y: -100, opacity: 0, stagger: 0.05, delay: 0, ease: Power3.easeIn });
				} else {
					gsap.to($("#slide-inner-caption .caption-timeline span"), {duration: 0.3, y: -100, opacity: 0, stagger: 0.05, delay: 0, ease: Power3.easeIn});
				}
				
				
				
				
				// get the DOM elements that we'll work with
				const DOM = getDOMElements();
				const allImages = DOM.grid.map(element => {
					
					element.item.DOM.image.setAttribute('data-slide-index', element.item_index);
					return element.item.DOM.image;
				});
				const allImagesInner = DOM.grid.map(element => element.item.DOM.imageInner);
				const currentImage = DOM.currentItem.DOM.image;
				const currentImageInner = DOM.currentItem.DOM.imageInner;
				const currentImageCaption = DOM.currentItem.DOM.imageCaption;
							
				// Use gsap flip for the animation
				// save the current state of the images
				const flipstate = Flip.getState([allImages]);				
				const flipstate1 = Flip.getState([currentImage]);
								
				gsap.set(currentImage.closest(".clapat-slide"), {zIndex: 0});
				
				// put them inside the .grid element
				grid.append(...allImages);
				
				currentImage.setAttribute('data-slide-index', DOM.currentIndex);
				triggeredImage.append(currentImage);
				triggeredImage.append(currentImageCaption);
				
				gsap.to(".clapat-slider .clapat-slide .trigger-item", { duration: 1, opacity:0, scale:0.7, ease:Power2.easeOut });
				
				// Flip it
				Flip.from(flipstate, {
					duration: 0.7,
					stagger:0.02,
					ease: 'power3.inOut',
					absolute: true,					 
				})
				.to(currentImageInner, {
					duration: 0.7,
					ease: 'power3.inOut',
					scale:1,
					borderRadius: '3px',
					onComplete: () => {
						document.body.classList.add('enable-trigger');
				  	}
				}, 0)
				.to(allImagesInner, {
					duration: 0.7,
					ease: 'power3.inOut',
					scale:1,
					borderRadius: '3px',
				}, 0)
				.to(".img-mask", {
					duration: 0.7,
					ease: 'power3.inOut',
					opacity:1
				}, 0)
				
				Flip.from(flipstate1, {
					duration: 0.7 ,
					ease: 'power3.inOut',
					absolute: true       
				});
				
				animateTitle.set(".showcase-gallery .slide-caption span", { y: 120, opacity:0});				
				animateTitle.to(".showcase-gallery .gallery-zoom-wrapper .slide-caption span", { duration: 0.5, y: 0, opacity:1, delay:0.2, stagger:0.03,  ease:Power2.easeOut });				
				gsap.to(".showcase-gallery .gallery-zoom-wrapper a.slide-link", { duration: 0.7, opacity:1, scale:1, ease:Power2.easeIn });
				
			};
			
			const hideGrid = () => {
				
				gsap.to(".clapat-slider .clapat-slide .trigger-item", { duration: 0.5, opacity:1, scale:1, delay:0.2, ease: 'power3.inOut' });				
				gsap.to($(".showcase-gallery .gallery-zoom-wrapper .slide-caption"), {duration: 0.25, opacity:0, delay:0, ease:Power2.easeOut});
				animateTitle.to(".showcase-gallery .gallery-zoom-wrapper .slide-caption span", { duration: 0.5, y: -100, opacity:0, ease:Power2.easeInOut});
				gsap.to(".showcase-gallery a.slide-link", { duration: 0.3, opacity:0, scale:0.8, delay:0, ease:Power2.easeOut });
				
				document.body.classList.remove('grid-open');
				
				slider.enabled = true;
				
				// get the DOM elements that we'll work with
				const DOM = getDOMElements();
				const allImages = document.querySelectorAll('.gallery-thumbs-wrapper .trigger-item');
				const currentImage = document.querySelector('.gallery-zoom-wrapper .trigger-item');
				const currentImageCaption = document.querySelector('.gallery-zoom-wrapper .slide-caption');
				const currentImageInner = document.querySelector('.gallery-zoom-wrapper .trigger-item .section-image');
			
				const flipstate = Flip.getState([allImages]);				
				const flipstate1 = Flip.getState([currentImage]);
							
				allImages.forEach((image) => {					
					let index = image.getAttribute('data-slide-index');
					let element = DOM.items[index];
					image.removeAttribute('data-slide-index');
					element.DOM.imageWrap.appendChild( image );
				});
				
				currentImage.removeAttribute('data-slide-index');
				DOM.currentItem.DOM.imageWrap.appendChild(currentImage);
								
				// Remove all the elements from the grid and current triggered image divs
				const liveGrid = document.querySelector('.gallery-thumbs-wrapper');
				const liveTriggeredImage = document.querySelector('.gallery-zoom-wrapper');
				
				while (liveGrid.firstChild) {
					liveGrid.removeChild(liveGrid.firstChild);
				}
				
				Flip.from(flipstate, {
					duration: 0.7,
					stagger:0.02,
					ease: 'power3.inOut'
				});				
				
				Flip.from(flipstate1, {
					duration: 0.7,
					stagger:0.02,
					ease: 'power3.inOut',					
					onComplete: function() {
						
						DOM.currentItem.DOM.imageWrap.appendChild(currentImageCaption);	
						
						const triggeredItem = document.querySelector('.clapat-slide.triggered-item');
						if( triggeredItem != null ){							
							triggeredItem.classList.remove('triggered-item');
						}
						
						const clapatSlides = document.querySelectorAll('.clapat-slide');
						clapatSlides.forEach(slide => {
						  	slide.style.zIndex = '';
							slideInner = slide.querySelector('.slide-inner');
							slideInner.classList.remove('disabled');

						});					
						
						document.body.classList.remove('disable-scroll','enable-trigger');
						gsap.set($(".showcase-gallery .slide-caption"), {clearProps: "opacity"});
						
					}
				}).to($('.showcase-gallery .has-scale-small .section-image'), {
					duration: 0.7,
					ease: 'power3.inOut',
					scale:endScaleSmall
				}, 0).to($('.showcase-gallery .has-scale-medium .section-image'), {
					duration: 0.7,
					ease: 'power3.inOut',
					scale:endScaleMedium
				}, 0).to($('.showcase-gallery .section-image'), {
					duration: 0.7,
					ease: 'power3.inOut',
					borderRadius: '12px',
					onComplete: function() {
						gsap.set($('.showcase-gallery .section-image'), { borderRadius: "" });
					  }
				}, 0)
				
				
								
				if ($(".showcase-gallery .slider-fixed-content #slide-inner-caption").hasClass("height-title")) {
					
					const spanLetters = document.querySelectorAll('#slide-inner-caption .slide-hero-title.caption-timeline span');
					const shuffledSpans = Array.from(spanLetters).sort(() => Math.random() - 0.5);
					const spanLettersPlay = gsap.timeline({ delay: 0 }); 
					
					shuffledSpans.forEach((spanLetters, index) => {
						spanLettersPlay.to(spanLetters, {
							scaleY: 1,
							y: 0, 
							opacity:1,
							ease: Power3.easeInOut,
						}, index * 0.03); 
					});
					gsap.set($(".showcase-gallery .slider-fixed-content .slide-hero-subtitle.caption-timeline span"), { y: 100 });
					gsap.to($(".showcase-gallery .slider-fixed-content .slide-hero-subtitle.caption-timeline span"), { duration: 0.7, y: 0, opacity: 1, stagger: 0.05, delay: 0.2, ease: Power3.easeOut });
				} else {
					gsap.set($('.showcase-gallery .slider-fixed-content .caption-timeline span'), { y: 100});
					gsap.to($(".showcase-gallery .slider-fixed-content .caption-timeline span"), { duration: 0.7, y: 0, opacity: 1, stagger: 0.05, delay: 0.2, ease: Power3.easeOut });
				}
				
				gsap.to($("footer .link-text, .clapat-pagination, .progress-info, #filters-wrapper"), {duration: 0.3, opacity:1, y:0, stagger:0.05, delay:0.4, ease:Power2.easeInOut});
				gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
				$("#ball").removeClass("with-blur");
				$('#ball p').remove();
				
			
			}
			
			// Returns some DOM elements that are needed for showing/hiding the grid
			const getDOMElements = () => {
			
				// Item instances (slides)
				const items = [];
				[...document.querySelectorAll('.clapat-slide')].forEach(item => {
					items.push(new Item(item));
				});
						
				// Cloned items
				const itemsCloned = [];
				[...document.querySelectorAll('.clapat-slide-clone')].forEach(item => {
					itemsCloned.push(new Item(item));
				});
			
				let firstVisibleIndex = -1;
				let direction = slider.opts.direction;
								
				for( let i = 0; i < items.length; i++ ){
					
					let item = items[i];
					let bounding = item.DOM.el.getBoundingClientRect();
					if( direction == "vertical" ){
					
						start = bounding.top;
						end = bounding.bottom;
					}
					else {
						
						start = bounding.left;
						end = bounding.right;
					}
					if( (start <= 0) && (end > 0) ){
							
						firstVisibleIndex = i;						
						break;
					}
										
				}
				
				const gridItems = [];
				let currentIndex = -1;
				if( direction == "vertical" ){
					
					let selectedItems = 0;
					// in case of the vertical direction cloned items are reverted, last one becomes first
					if( firstVisibleIndex >= itemsCloned.length ){
							
						// the first visible index is a clone, therefore iterate back to the first clone
						for( index = firstVisibleIndex; (index >= itemsCloned.length); index-- ){
								
							let item = items[index];
							if( !item.DOM.el.classList.contains('triggered-item') ){
									
								gridItems.push( {item_index: index, item: item} );
							}
							else{
									
								currentIndex = index;
							}
							
							selectedItems++;
						}
						// and then from the beginning the rest of the clones
						for( index = 0; (selectedItems < itemsCloned.length); index++ ){
								
							let item = items[index];
							if( !item.DOM.el.classList.contains('triggered-item') ){
									
								gridItems.push( {item_index: index, item: item} );
							}
							else{
									
								currentIndex = index;
							}
							
							selectedItems++;
						}
							
					}
					else{
						
						// the first visible index is not a clone, therefore iterate from the beginning of the items
						for( index = firstVisibleIndex; (index < itemsCloned.length); index++ ){
								
							let item = items[index];
							if( !item.DOM.el.classList.contains('triggered-item') ){
									
								gridItems.push( {item_index: index, item: item} );
							}
							else{
									
								currentIndex = index;
							}
							
							selectedItems++;
						}
						// and then from the end of the clones
						for( index = items.length-1; (selectedItems < itemsCloned.length); index-- ){
								
							let item = items[index];
							if( !item.DOM.el.classList.contains('triggered-item') ){
									
								gridItems.push( {item_index: index, item: item} );
							}
							else{
									
								currentIndex = index;
							}
							
							selectedItems++;
						}
					}
					
				}
				else {
					
					let iterator = 0;
					while ( iterator < itemsCloned.length ){
						
						let index = gsap.utils.wrap( 0, items.length, firstVisibleIndex + iterator);
						let item = items[index];
						if( !item.DOM.el.classList.contains('triggered-item') ){
							
							gridItems.push( {item_index: index, item: item  } );
						}
						else{
							
							currentIndex = index;
						}
						iterator++;
					}
				}
				
				return {					
					items: items,					
					grid: gridItems,					
					currentItem: new Item( document.querySelector('.clapat-slide.triggered-item') ),
					currentIndex: currentIndex
				};
				
			}
			
			let bGridSwiped = false;
			// Initialize the events
			const initEvents = () => {
				
				const items = document.querySelectorAll('.slide-inner');
				items.forEach((triggerItem) => {
					
					triggerItem.addEventListener('click', (event) => {
						
						if( $('.showcase-gallery').length > 0 ){
							
							event.currentTarget.closest('.clapat-slide').classList.add('triggered-item');
							showGrid();
						}
					});
					
				});
				
				window.addEventListener("wheel", event => {
					
					if(document.body.classList.contains("grid-open") && ( $('.showcase-gallery').length > 0 ) ) {
						hideGrid();
					}
				});
				
				window.addEventListener("touchmove", event => {
					
					if(document.body.classList.contains("grid-open") && ( $('.showcase-gallery').length > 0 ) ) {
						bGridSwiped = true;
					}
				});
				window.addEventListener("touchcancel", event => {
					
					if(document.body.classList.contains("grid-open") && ( $('.showcase-gallery').length > 0 ) ) {
						bGridSwiped = false;
					}
				});
				window.addEventListener("touchend", event => {
					
					if(document.body.classList.contains("grid-open") && bGridSwiped && ( $('.showcase-gallery').length > 0 ) ) {
						bGridSwiped = false;
						hideGrid();
					}
				});
				
				const closeGrid = document.querySelector('.gallery-close-thumbs');
				
				if( closeGrid != null ){
					
					closeGrid.addEventListener("click", event => {
						
						if(document.body.classList.contains("grid-open") && ( $('.showcase-gallery').length > 0 ) ) {
							hideGrid();
						}
					});
				}
				
				function moveThumbGrid( direction = "next" ){
					
					if(document.body.classList.contains("grid-open")) {
							
						const allImages = document.querySelectorAll('.gallery-thumbs-wrapper .trigger-item');
						if( allImages.length <= 0 ){
							
							return;
						}
						const currentImage = document.querySelector('.gallery-zoom-wrapper .trigger-item');
						const currentImageCaption = document.querySelector('.gallery-zoom-wrapper .slide-caption');
						const currentImageInner = document.querySelector('.gallery-zoom-wrapper .trigger-item .section-image');
						const liveGrid = document.querySelector('.gallery-thumbs-wrapper');
						const liveTriggeredImage = document.querySelector('.gallery-zoom-wrapper');
							
						let currentIndex = Number( currentImage.getAttribute('data-slide-index') );
						let nextImage = null;
						
						if( direction == "next" ){
						
							for( let i=0; i<allImages.length; i++ )
							{
								let image = allImages[i];
								let index = Number( image.getAttribute('data-slide-index') );
								if( nextImage == null ){
									
									if( index > currentIndex ){
											
										nextImage = image;
										break
									}
								}
							}
						}
						else {
						
							for( let i=allImages.length-1; i>=0; i-- )
							{
								let image = allImages[i];
								let index = Number( image.getAttribute('data-slide-index') );
								if( nextImage == null ){
									
									if( index < currentIndex ){
											
										nextImage = image;
										break
									}
								}
							}
						}
						
						const flipstate = Flip.getState([allImages, /*allImagesInner*/, currentImage, /*currentImageInner*/]);
							
						if( nextImage != null ){
							
							liveGrid.replaceChild( currentImage, nextImage );
						}
						else{
							
							if( direction == "next" ){
								
								nextImage = allImages[0];
								liveGrid.appendChild( currentImage );
							}
							else{
								
								nextImage = allImages[allImages.length-1];
								liveGrid.insertBefore( currentImage, liveGrid.firstChild );
							}
							
						}
						
						liveTriggeredImage.appendChild( nextImage );
						
						// Get all the slides
						let slides = document.querySelectorAll('.clapat-slide');
						
						// Remove the caption in the image preview in order to replace it with the next
						let currentSlide = slides[currentIndex];
						let elWrap = currentSlide.querySelector('.slide-moving');
						if( elWrap != null ){
							
							animateTitle.to(".showcase-gallery .gallery-zoom-wrapper .slide-caption span", { duration: 0.2, y:-15, opacity:0, delay:0, stagger:0, ease:Power2.easeInOut, onComplete: function() { 
								elWrap.appendChild(currentImageCaption);
							}});
														
							
						}
						
						// Update the triggered item flag in slider as it marks the current image
						$('.clapat-slide').removeClass('triggered-item');
						let indexSlide = Number( nextImage.getAttribute('data-slide-index') );
						let nextSlide = slides[indexSlide];
						if( nextSlide ){
							
							nextSlide.classList.add('triggered-item');
							let elNextWrap = nextSlide.querySelector('.slide-moving');
							if( elNextWrap != null ){
								
								let nextCaption = elNextWrap.querySelector('.slide-caption');
								liveTriggeredImage.appendChild( nextCaption );
							}
						}
						
						// Move the slider to the next or prev slide
						slider.goTo(indexSlide);
						
						animateTitle.set(".showcase-gallery .slide-caption span", { y: 15, opacity:0});				
						gsap.to(".showcase-gallery a.slide-link", { duration: 0.2, opacity:0, scale:0.8, ease:Power2.easeInOut });
															
						Flip.from(flipstate, {
							duration: 0.5,
							stagger:0,
							ease: 'power3.inOut',
							absolute: true,
							onComplete: function() {
								animateTitle.to(".showcase-gallery .gallery-zoom-wrapper .slide-caption span", { duration: 0.3, y: 0, opacity:1, delay:0, stagger:0.03, ease:Power2.easeOut });
								gsap.to(".showcase-gallery .gallery-zoom-wrapper a.slide-link", { duration: 0.3, opacity:1, scale:1, delay:0, ease:Power2.easeOut });
							}					 
						})
						
						
						
					}
				}
				
				function throttle(calback, delay = 250) {

					let shouldWait = false;

					return (...args) => {
						
						if (shouldWait) return;

						calback(...args);
						shouldWait = true;
						setTimeout(() => {
							
							shouldWait = false;
						}, delay)
					}
				}
				
				const nextBtn = document.querySelector('.cp-button-next');
				
				if( nextBtn != null ){
					
					nextBtn.addEventListener("click", throttle( (event) => {
						console.log("Click event " + performance.now());
						moveThumbGrid("next");
					}, 500));
				}
				
				const prevBtn = document.querySelector('.cp-button-prev');
				
				if( prevBtn != null ){
					
					prevBtn.addEventListener("click", throttle( (event) => {
						
						moveThumbGrid("prev");
					}, 500));
				}
			
			};
			
			
			const previewModeEnabled = document.querySelector('.preview-mode-enabled');
			
			if (previewModeEnabled) {			
				initEvents();		
			}
			
			
			if (!isMobile()) {
				
				if ($('.showcase-gallery').hasClass("tilt-gallery")) {
					var timeout;
				
					$('.showcase-gallery').mousemove(function (e) {
						if (timeout) clearTimeout(timeout);
						timeout = setTimeout(callTiltSlider.bind(null, e));
					});
				
					function callTiltSlider(e) {
						moveItSlider(e, '.clapat-slider-viewport', 30);
					}
				
					function moveItSlider(e, target, movement) {
						var $this = $('.showcase-gallery');
						var relX = e.pageX - $this.offset().left;
						var relY = e.pageY - $this.offset().top;
						gsap.to(target, 1, {
							x: (relX - $this.width() / 2) / $this.width() * movement,
							y: (relY - $this.height() / 2) / $this.height() * movement,
							ease: "power4.out",
						});
					}
				}

				
				
				var dragWrapper = $('.clapat-slider');
				dragWrapper.on('mousedown', function (evt) {
					dragWrapper.on('mouseup mousemove', function handler(evt) {
						if (evt.type === 'mouseup') {					  
							// click
							gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
							$("body").removeClass("scale-drag-x");
							$("#ball").removeClass("with-icon");
							$('#ball i').remove();
							$("#ball").removeClass("with-blur");
							$('#ball p').remove();
							
						} else {
							// drag
							if ($('#magic-cursor').hasClass("light-content")) {
								gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#fff', backgroundColor:'transparent'});
							} else {
								gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#000', backgroundColor:'transparent'});
							}
							$("body" ).addClass("scale-drag-x");
							$("#ball").removeClass("with-icon");
							$('#ball i').remove();
							$("#ball").removeClass("with-blur");
							$('#ball p').remove();
						  
						}
						dragWrapper.off('mouseup mousemove', handler);
					});
				});
				
					
				$('.clapat-slider').on('mouseup touchend', function() {
					gsap.to('#ball', {duration: 1, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent', ease:Elastic.easeOut});
					$("body").removeClass("scale-drag-x");
				});
				
				$("body").on('mouseleave', function() {					
					gsap.to('#ball', {duration: 1, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent', ease:Elastic.easeOut});
					$("body").removeClass("scale-drag-x");					
				});
					
				
				$(".showcase-gallery.preview-mode-enabled .clapat-slide .slide-inner").on('mouseenter', function() {	
					if (!$('body').hasClass('scale-drag-x')) {
						$('#ball p').remove();
						var $this = $(this);			
						gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.4, borderColor:"rgba(255,255,255,0)", backgroundColor:"rgba(255,255,255,0.1)"});
						gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
						$("#ball").addClass("with-blur");
						$( "#ball" ).append( '<p class="center-first">' + $this.data("centerline") + '</p>' );
						$(this).find('video').each(function() {
							$(this).get(0).play();
						});
						gsap.to($(".slider-fixed-content"), { duration: 0.3, opacity: 0.4 });
					}			
				}).on('mouseleave', function() {					
					if (!$('body').hasClass('scale-drag-x')) {
						gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
						gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
						$("#ball").removeClass("with-blur");
						$('#ball p').remove();		
						$(this).find('video').each(function() {
							$(this).get(0).pause();
						});
						gsap.to($(".slider-fixed-content"), { duration: 0.3, opacity: 1});
					}
				});
				
				$(".trigger-item").on('mouseenter', function() {	
					if (!$('body').hasClass('scale-drag-x')) {
						var $this = $(this);			
						gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.4, borderColor:"rgba(255,255,255,0)", backgroundColor:"rgba(255,255,255,0.1)"});
						gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
						$("#ball").addClass("with-blur");
						$( "#ball" ).append( '<p class="center-first">' + $this.data("centerline") + '</p>' );
						$(this).find('video').each(function() {
							$(this).get(0).play();
						});
					}			
				}).on('mouseleave', function() {					
					if (!$('body').hasClass('scale-drag-x')) {
						gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
						gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
						$("#ball").removeClass("with-blur");
						$('#ball p').remove();		
						$(this).find('video').each(function() {
							$(this).get(0).pause();
						});
					}
				});
			
			}
			
			$('.slide-hero-title span, .slide-hero-subtitle span').wrap('<div></div>');
			
			
			if( $('#filters-wrapper').length > 0 ){
				
				$('li.filters-timeline a').on('click', function(e){			
					e.preventDefault();				
					$('.slide-inner').removeClass('disabled');
					gsap.to( $('.slide-inner .img-mask'), {duration: 0.2, opacity: 1, ease: "power1.in" });
									
					let filterClass = $(this).attr('data-filter');
					if( filterClass == '*' ){
						return;
					}
					
					$( '.slide-inner' ).not(filterClass).addClass('disabled');				
					gsap.to( $('.slide-inner').not(filterClass).find(".img-mask"), {duration: 0.2, opacity: 0.2, ease: "power1.out" });				
				});
				
				$('#footer-container').on('click', '.toggle-filters, #close-filters', function() {
					var closeFiltersDiv = document.getElementById("close-filters");
					
					if (!closeFiltersDiv) {
						closeFiltersDiv = document.createElement("div");
						closeFiltersDiv.id = "close-filters";
						document.getElementById("footer-container").appendChild(closeFiltersDiv);
					} else {
						closeFiltersDiv.parentNode.removeChild(closeFiltersDiv);
					}
					
					var filtersWrapper = $("#filters-wrapper");
					filtersWrapper.toggleClass("on open active");
					$(".toggle-filters").text(filtersWrapper.hasClass("on") ? "Close" : "Filters");
					
					var filters = $('#filters');
					var filtersLi = filters.find('li');
					var filtersHeight = 4 + filtersLi.toArray().reduce((acc, li) => acc + $(li).outerHeight(true), 0);
					
					gsap.to(filters, { duration: 0.3, opacity: filtersWrapper.hasClass("on") ? 1 : 0, height: filtersWrapper.hasClass("on") ? filtersHeight : 0, delay: 0 });
					gsap.to('.active-filter-bg', { duration: 0.3, opacity: filtersWrapper.hasClass("on") ? 1 : 0, delay: 0.1 });
				});
			
			
				$("#filters-wrapper").on('click', function () {
					if ($(window).width() > 1024) {
						var filtersWrapper = $(this);
						filtersWrapper.addClass("open");
						setTimeout(() => filtersWrapper.addClass("active"), 200);
					}
				});
				
				$("#filters").on('mouseleave', function() {
					if ($(window).width() > 1024) {
						var filtersWrapper = $("#filters-wrapper");
						filtersWrapper.removeClass("open active on");
						gsap.to('#filters', { duration: 0.3, opacity: 0, height: 0, delay: 0.1 });
					}
				});
				
				
				var filtersTimeline = $(".filters-timeline");
				var firstChild = filtersTimeline.find(":first-child");
				var firstOffsetLeft = firstChild.position().left;
				var firstOffsetTop = firstChild.position().top;
				
				filtersTimeline.on('mouseenter', function() {
					var $this = $(this);
					var offsetLeft = $this.position().left;
					var offsetTop = $this.position().top;								
					gsap.to('.active-filter-bg', { duration: 0.3, width: $this.outerWidth(), x: offsetLeft, y: offsetTop });
					
				}).on('mouseleave', function() {
					gsap.to('.active-filter-bg', { duration: 0.3, width: firstChild.outerWidth(), x: firstOffsetLeft, y: firstOffsetTop });
					
				});
				
			}
			
			$('.trigger-item').on('click', function() {
				
				$("body").addClass("load-project-thumb");
				
				gsap.to(".showcase-gallery .gallery-zoom-wrapper .slide-caption span", { duration: 0.3, y:15, opacity:0, delay:0, stagger:0, ease:Power2.easeIn});
				gsap.to(".showcase-gallery a.slide-link", { duration: 0.3, opacity:0, scale:0.8, delay:0, ease:Power2.easeIn });
				gsap.to($(".gallery-thumbs-wrapper .trigger-item"), {duration: 0.3, y: 160, x:0,  opacity:1, stagger:0.05,  delay:0, ease:Power2.easeIn});
			
				setTimeout(function() {
					$("body").addClass("show-loader");
				}, 300);
			
				gsap.to('footer, .carousel-nav-wrapper', { duration: 0.5, opacity: 0, ease: Power4.easeInOut });
			
				gsap.to('#ball', { duration: 0.3, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent' });
				gsap.to('#ball-loader', { duration: 0.3, borderWidth: '4px', top: 0, left: 0 });
				$("#ball").removeClass("with-blur");
				$('#ball p').remove();
			});
			
			
		}
	
	}//End Showcase Gallery


	window.LoadViaAjax = function() {	
		HeightTitles()
		CleanupBeforeAjax();	
		FirstLoad();
		ScrollEffects();
		Sliders();
		PageLoadActions();
		FitThumbScreenGSAP();
		ShowcaseOverlapping();
		ShowcaseParallax();
		ShowcasePortfolio();		
		ShowcaseGallery();
		FitThumbScreenWEBGL();		
		LazyLoad();	
		Shortcodes();
		JustifiedGrid();
		Lightbox();
		PlayVideo();
		BlogLazyLoad();
		Blog();
		InitContactMap();
		CustomFunction();
		
	}//End Load Via Ajax
	
});	


var LoadViaAjax = window.LoadViaAjax;