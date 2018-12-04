"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// classList chaining
function classListChain(el) {
  var list = el.classList;

  return {
    toggle: function toggle(c) {
      list.toggle(c);return this;
    },
    add: function add(c) {
      list.add(c);return this;
    },
    remove: function remove(c) {
      list.remove(c);return this;
    }
  };
}

function svgWhitespace() {
  // get all SVG objects in the DOM
  var svgs = document.getElementsByTagName("svg");

  // go through each one and add a viewbox that ensures all children are visible
  for (var i = 0, l = svgs.length; i < l; i++) {
    var svg = svgs[i],
        box = svg.getBBox(),
        // <- get the visual boundary required to view all children
    viewBox = [box.x, box.y, box.width, box.height].join(" ");

    // set viewable area based on value above
    svg.setAttribute("viewBox", viewBox);
  }
}

(function ($) {
  var questionnaire = document.getElementById('questionnaire');
  var questionsContainer = document.getElementById('questionnaire-questions__container');
  var questions = document.querySelectorAll('.questionnaire-questions__answer');
  var progress = document.querySelectorAll('.progress-tick');
  var questionIntro = document.getElementById('questionnaire-intro');
  var results = document.getElementById('quiz-4');
  var resetQ = document.getElementById('reset-questions');

  var tabList = $('.ibm-tabs-li');
  var tabLi = document.querySelectorAll('.ibm-tabs-li');
  var counter = 0;

  svgWhitespace();

  // start quiz
  initQ();

  // reset quiz manually
  var resetQBtn = document.querySelectorAll('.reset-quiz');
  [].concat(_toConsumableArray(resetQBtn)).forEach(function (btn, i) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      resetQuiz();
    });
  });

  // reset ibm dyntabs
  if ($('#result-tabs').hasClass('ibm-widget-processed')) {
    $('#result-tabs').data('widget').destroy();
  }

  function resetQuiz() {
    // reset question index
    counter = 0;

    // reset answer tab order
    [].concat(_toConsumableArray(tabLi)).forEach(function (t) {
      t.setAttribute('data-answer', '0');
    });
    // reset answers
    tabList.sort(function (a, b) {
      return $(a).data('modifier') - $(b).data('modifier');
    });
    $('#ibm-tabs').html(tabList);

    // reset views
    questionnaire.classList.remove('complete');
    resetQ.classList.remove('active');
    results.classList.remove('complete');

    // reset progress bar
    [].concat(_toConsumableArray(progress)).forEach(function (p, i) {
      if (i != 0) {
        p.classList.remove('active');
      }
    });

    initQ();
  }

  function initQ() {
    [].concat(_toConsumableArray(questions)).forEach(function (q, i) {
      if (i == 0) {
        q.classList.add('active');
        classListChain(q).remove('inactive').add('active');
      } else {
        classListChain(q).remove('inactive').remove('active');
      }
    });

    // loop through each set of questions
    [].concat(_toConsumableArray(questions)).forEach(function (q, index) {
      var buttons = q.querySelectorAll('.questionnaire-button');

      // progress through quiz
      [].concat(_toConsumableArray(buttons)).forEach(function (button, i) {
        button.addEventListener('click', function (e) {
          var a = index + "-" + i;
          var q = document.getElementById(button.dataset.question);

          // show reset button on first click
          resetQ.classList.add('active');

          // assign answers to tab li
          document.getElementById("dyntab-" + index).setAttribute('data-answer', i);

          // slide questions, activate progress bar
          if (index < 2) {
            progress[index + 1].classList.add('active');
            classListChain(q).remove('active').add('inactive');
            q.nextElementSibling.classList.add('active');
          } else {
            // hide last question
            questionnaire.classList.add('complete');

            // sort answers and change tab order accordingly
            tabList.sort(function (a, b) {
              return $(a).data('answer') - $(b).data('answer');
            });

            // append newly sorted tabs
            $('#ibm-tabs').html(tabList);

            // create ibm dyntabs
            $('#result-tabs').dyntabs();

            // show results
            results.classList.add('complete');
          }
        });
      });
    });
  }

  // CAROUSEL
  var $icons = $('.hr-icon');
  var btn = document.getElementById('btn');
  var iconFont = document.querySelectorAll('.icon-typing');

  $('#carousel-quotes').on('init', function () {
    setTimeout(function () {
      $('#anim-1').toggleClass('active');
      document.getElementById('arrow-anim').beginElement();
    }, 2000);
  });

  $('#carousel-quotes').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    // reset slide animations
    var icon = $icons[nextSlide];
    // hide current
    $('.relevant').removeClass('relevant');
    $(icon).addClass('relevant');
    // slide 1
    $('#anim-1').removeClass('active');
    // slide 2
    [].concat(_toConsumableArray(iconFont)).forEach(function (icon) {
      icon.classList.remove('active');
    });
    // slide 3
    $('#anim-3').empty();
  });

  $('#carousel-quotes').on('afterChange', function (event, slick, currentSlide, nextSlide) {
    var icon = $icons[currentSlide];

    if (currentSlide == 0) {
      setTimeout(function () {
        $(icon).addClass('relevant');
        $('#anim-1').addClass('active');
        document.getElementById('arrow-anim').beginElement();
      }, 500);
    }

    if (currentSlide == 1) {
      [].concat(_toConsumableArray(iconFont)).forEach(function (icon, index) {
        setTimeout(function () {
          icon.classList.add('active');
        }, 1000 * index);
      });
    }

    if (currentSlide == 2) {
      var addPerson = function addPerson(i) {
        setTimeout(function () {
          var newImg = document.createElement('img');
          var isFourth = i % 4 === 0 ? 'blue' : 'gray';
          newImg.src = "assets/img/icon-person-" + isFourth + ".svg";
          container.append(newImg);
        }, 150 * i);
      };

      var container = document.getElementById('anim-3');

      for (var i = 0; i < 20; i++) {
        addPerson(i);
      }
    }
  });

  $('#carousel-quotes').slick({
    slidesToShow: 1,
    dots: false,
    arrows: false,
    autoplay: true,
    fade: true,
    autoplaySpeed: 8000,
    speed: 1000
  });
})(jQuery);