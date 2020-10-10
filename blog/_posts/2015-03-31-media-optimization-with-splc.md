---
title: Media Optimization for Selma, Bridge to the Ballot
layout: blog
body-class: blog-post
topic: archive
header-image:
header-image-alt:

author: eric
published: true
featured: false
short: Being mindful of bandwidth and network latency on media-heavy sites.
tags:
- SPLC
- Media
- Optimization
- Jekyll
- CSS
date: 2015-03-31
---

Imagine for a moment: you’ve just finished making the most gorgeous website you’ve ever made. It’s got the works — the newest, wiz-bang plugins. Heck, you don’t even have to support IE 6-8. You’ve achieved what I like to call "made in the shade." These creations work well until you release them from their controlled environment. Out in the wild, websites, mobile applications, and other connected devices have to contend with lots of requests, network latency, bandwidth and other things. They get slow in the wild. This fabulous creation has no control over network congestion and user device capabilities. You do have control over how many requests your page makes to the serve and the size of those requests. Remember these two things:

* Speed is a feature

* Make the first request count

ThinkShout worked with the Southern Poverty Law Center to launch [Selma — Bridge to the Ballot](http://selma.splcenter.org/). It’s a single-page site that includes a background video, a video trailer, photo gallery and a nice, clickable timeline. I had the opportunity to make front end optimizations on this site.

To make your site load fast, you should spend time reducing the size of your assets where possible. Also we should do what we can to get the HTML and CSS down to the user as soon as possible. This is called optimizing for the[ critical rendering path](https://docs.google.com/presentation/d/1IRHyU7_crIiCjl0Gvue0WY3eY_eYvFQvSfwQouW9368/present?slide=id.gc57996a9_046). This is the approach we took on the Selma website.

Most of the work happened on 4 types of assets — video, images, CSS/JS and Fonts.

## Benchmarking

Chrome developer tools for measuring the load times, file sizes and network requests. There is also a featured called[ device mode](https://developer.chrome.com/devtools/docs/device-mode). You can emulate a variety of mobile devices and simulate network speeds with device mode.

![selma-media-image_1.png]({{ site.baseurl }}/assets/images/blog/selma-media-image_1.png)

After we initially built this site, with no optimization, it weighed in at about 20MB. On Selma, we simulated a normal 3G connection. We measured 76 web requests. On this connection, it took close to 10 seconds before there was any paint on the page. Yes, that’s a huge number, but keep in mind this is just a starting point.

## Video

The intro to the site begins with an HTML video as the background. Videos are large, even small ones. We used [WebM](http://www.webmproject.org/) format, supported across most modern browsers and an MP4 as a fallback. WebM files are much smaller. Along with the size consideration, we did not want the background video to load on mobile phones. Additionally, on larger screens, the background video needed to pause when a user clicked the "play trailer" button, then play again when the user finished viewing the trailer.

If you put the video tag in the document body, it will load even if you set it to display: you don’t need to put it in your css. A trick we used was to avoid this when writing out the video to only write out the video to the page only when loading on a large screen. We use a loadVideo() function to write out our video. And we only load it when the screen is larger than a phone or resized to larger than mobile.

Here is what we do to load the video when we want. Our examples will assume the use of jQuery because that’s what we used.

~~~javascript
// Function to write the video to the video container
function loadVideo() {
	$('.video-container').append(
		'<video>' +
			'<source src="path/to/video.webm">' +
			'<source src="path/to/video.webm">' +
		'</video>'
	);
}

// Initially check the screen size and load the video if we need it
if ($(window).width() >= 480) {
	loadVideo();
}

// If the window size change and the video isn’t already loaded,
// load the video
$(window).resize(function() {
	if ($(window).width() >= 481 && $('.header-video video').length < 1) {
 		loadVideo();
	}
});
~~~

Next, we wanted to pause the video when the pause/play background video ‘play trailer’ button is clicked. The HTML video tag contains javascript methods to manipulate it. We take advantage of two aptly-named methods: play() and pause(). We used the Magnific Popup plugin for our image gallery and video trailer. With this plugin, we are able to supply our play and pause methods as callback methods in to fire in the plugin configuration options.

~~~javascript
$('.play-button').magnificPopup({ 
	callbacks: { 
		// When the our popup opens pause         
		open: function() { 
			$('video')[0].pause();   
		},  
		// When our popup closes play                                                                                        
		close: function() {
			$('video')[0].play();
		}
	}                                                                                                              
});
~~~

Now when a user plays the trailer, we get what we want with hardly any additional code. The plugin and the HTML5 Javascript API do it for us.

## Images

Unoptimized images are assets most responsible for slow load times on the internet. You should compress your images so they render faster. Also, sprite smaller images so they come in as a single request. Wherever possible, use background images. Inline images slow down page rendering. These optimizations are key to doing the most with the first request you make to the server. Remember, we want to get our html and CSS down to our user expeditiously.

A great tool for reducing the size of your images is[ TinyPNG](https://tinypng.com/). You can get[ lossy](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization#lossless-vs-lossy-image-compression) compression and still keep the alpha transparency of your images. There are other tools available as well such as Yahoo’s[ Smush.it](http://www.imgopt.com).

If you have large background images, create mobile versions of those images. When your site loads on mobile, those images will be applied without any additional web requests.

Finally, choose the right image format. If you don’t need transparency, use a jpg. If you need better detail in your images use a PNG. If you need animation, use a GIF. Using a PNG for a large background image will unnecessarily cause your user to download a huge file.

## CSS and JS

The faster you get the HTML and CSS down, happier the site user will be. It’s been shown that a user likes to have content rendering within at least three seconds of requesting the page. A user would rather see progressive rendering of the page than a blank page and then have everything load all at once.

Where we declare our CSS/JS matters. Put stylesheets and scripts used for your above-the-fold content in the head of your document. The CSS/JS we needed for our video and splash image are included in the head of our document.

Do just the opposite for scripts you need last. On the Selma, site we use a plugin called [TimelineJS](http://timeline.knightlab.com). TimelineJS has several requests associated with the plugin, including images from Flickr. We declared that script right before the close of our body tag. Why? We don’t need it until way the user gets to the bottom of our page. If we included it in the head we would be blocking HTML CSS and JS needed to get above the fold content to the user. This is another form of progressive enhancement.

Lastly, aggregate your CSS and JS so you don’t make unnecessary server requests. In our case, we use[ Jekyll Assets](https://github.com/ixti/jekyll-assets) for our asset pipeline. This plugin will let us compress our CSS with [Sass](http://sass-lang.com/) and JS with[ Uglifier](https://github.com/lautis/uglifier). Fewer CSS and JS requests get painted on to the browser quickly.

## Fonts

Fonts that are already on your user’s computer don’t cost you any extra. On Selma, we realized we had a font that looked almost identical to Georgia. Using @font-face will make a request for the font files you need. So we got rid of the custom font we were using. There are about four files for each font. So if you have one font, but that font has a regular, bold, and italic typeface, you’ve just made 12 server requests for that font.

In addition, if you are going to use @font-face, use an appropriate fallback font. I say appropriate because when your font finally loads, you don’t want it to be a jarring experience for the user.

## Summary

In the end, were able to get our site down to 1.4MB, and painting to the page in less than 1 second on a normal 3G network. We now have 43 requests and our entire DOM is loaded in 2.45 seconds on this connection. There is a lot more fine tuning we can do here. But this shows how snappy you can make your site just by doing basic optimizations around the aforementioned 4 types of assets.

Be mindful of bandwidth and network latency. Reduce image size. Aggregate CSS/JS. Delay blocking JS. These are easy things any front end developer can do to optimize websites and make users happy. I am a fan of [Ilya Grigorik](https://www.igvita.com/), web performance engineer at Google. He is a great resource on the subject. He also has a book you can read called *High-Performance Browser Networking*. It’s a great resource on web optimization.

The Selma site launched just in time for the 50th anniversary of the Selma-to-Montgomery marches. As users from around the world accessed the site to commemorate the events of Bloody Sunday, even those with low bandwidth connections could learn about this pivotal moment in the Civil Rights Movement for themselves on the web.
