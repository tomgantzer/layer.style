var colors = [
  'rgb(241, 196, 15)',
  'rgb(39, 174, 96)',
  'rgb(52, 152, 219)',
  'rgb(155, 89, 182)',
  'rgb(236, 240, 241)',
  'rgb(231, 76, 60)',
  'rgb(243, 156, 18)',
  'rgb(127, 140, 141)'
];

$(document).ready(function() {
  /* ----- stuff that makes me look smart ----- */
  var experienceYears = moment().diff('2013-06-23', 'years');
  $("#me-experience h3 span").html(experienceYears + " years");

  /* ----- work ----- */
  $.getJSON( "cache/work.json", function(workData) {
    console.log("Work data returned!");
    var workSource = $("#portfolio").html();
    var workTemplate = Handlebars.compile(workSource);

    $("#work").append(workTemplate(workData)); //append all raw data to work section
    // hide all images, until the user scrolls to them
    $("img").unveil(120, function() {
      $(this).load(function() {
      this.style.opacity = 1;
      });
    });

    plyr.setup();

  }).error(function(err, response) {
    console.log("blog error: " + response, err);
  });

  /* ----- blog ----- */
  $.getJSON( "cache/blogs.json", function(blogData) {
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
      time = moment(time).format("Do MMM YYYY, HH:mm");
      $(this).html(time);
    });

    $(".read-more").click(function() {
      var switchText = $(this).siblings(".more-text").is(":visible") ? 'read more...' : 'read less...';
      $(this).text(switchText);
      $(this).siblings(".more-text").slideToggle();
    });

    // hide all images, until the user scrolls to them
    $("img").unveil(50, function() {
      $(this).load(function() {
        this.style.opacity = 1;
      });
    });
  });

  animateGradient(); // when everything else is golden, start the gradient animation loop.
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
