// Handlebars Helpers
Handlebars.registerHelper('split', function(url) {
  var array = url.split(",");
  return array;
});

Handlebars.registerHelper('youtubeID', function(url) {
  return url.split("=")[1].split("&");
});

var colors = [
  '#1abc9c',
  '#3498db',
  '#f39c12',
  '#9b59b6',
  '#c0392b',
  '#95a5a6',
  '#ecf0f1',
  '#2ecc71'
];

$(document).ready(function() {
  /* ----- work ----- */
  $.getJSON( "cache/cms-work.json", function(workData) {
    console.log("Work data returned!");

    var workSource = $("#portfolio").html();
    var workTemplate = Handlebars.compile(workSource);

    $("#work").append(workTemplate(workData)); //append all raw data to work section

    $(".work-item").each(function(i, element) {
      $(element).lightGallery({
        loadYoutubeThumbnail: true,
        youtubeThumbSize: 'default',
        selector: '.work-image-gallery',
        galleryId: i
      });
    });

  }).error(function(err, response) {
    console.log("blog error: " + response, err);
  });

  /* ----- blog ----- */
  $.getJSON( "cache/cms-blogs.json", function(blogData) {
    console.log("Blog data returned!");
    var blogSource = $("#post").html();
    var blogTemplate = Handlebars.compile(blogSource);

    $("#blog").append(blogTemplate(blogData)); //append all raw data to blog section

    $(".blog-content").each(function() {
      $(this).contents(':gt(0)').wrapAll('<span class="more-text"></span>'); // add span to all paragraphs except the 1st
      $(this).children(":first-child").after('<a href="javascript:void(0);" class="read-more">read more...</a>');
    });

    $(".blog-text").each(function() {
      $(this).minRead();
      var html = $(this).html();
    });

    $(".blog-time").each(function() {
      var time = $(this).html();
      time = moment(time).format("Do MMM YYYY");
      $(this).html(time);
    });

    $(".read-more").click(function() {
      var switchText = $(this).siblings(".more-text").is(":visible") ? 'read more...' : 'read less...';
      $(this).text(switchText);
      $(this).siblings(".more-text").slideToggle();
    });

    // $("ul li ul").each(function () {
    //   var parentHeight = $(this).parent("li").height();
    //   var childHeight = $(this).height();
    //   var newHeight = (parseInt(childHeight) / parseInt(parentHeight)) * 100;
    //
    //   $(this).parent("li:before").css('height', newHeight + '%');
    //   $(this).parent.addClass("WORKING");
    // });
  });

  animateGradient();
});

/* ----- smooth scroll on anchor click ----- */
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 40
        }, 350);
        return false;
      }
    }
  });
});

/* ----- animate background gradient ----- */
function animateGradient() {
  $("#hero").css({
    'background-color': colors[Math.floor(Math.random()*colors.length)]
  });
}
setInterval(animateGradient, 2000);
