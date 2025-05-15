$(document).ready(function() {
  $('i').hide();
})

$(window).load(function() {
  $('i').show();

  var githubPos = $('#github').position();
  var linkedinPos = $('#linkedin').position();
  var itchPos = $('#itch').position();
  var imgPos = $('.me').position();

  $('i').css({
    position: 'absolute',
    zIndex: '1',
    top: imgPos.top + 100,
    left: '47%'
  });

  setTimeout(function() {
    $('#linkedin').animate({
      top: linkedinPos.top + 10,
      left: linkedinPos.left - 10
    }, 500);
  }, 250);

  setTimeout(function() {
    $('#linkedin').animate({
      top: linkedinPos.top,
      left: linkedinPos.left
    }, 250);

    $('#github').animate({
      top: githubPos.top + 10,
      left: githubPos.left - 6
    }, 500);
  }, 500);

  setTimeout(function() {
    $('#github').animate({
      top: githubPos.top,
      left: githubPos.left
    }, 250);

    $('#itch').animate({
      top: itchPos.top + 10,
      left: itchPos.left - 3
    }, 500);
  }, 750);

  setTimeout(function() {
    $('#itch').animate({
      top: itchPos.top,
      left: itchPos.left
    }, 250);
})
