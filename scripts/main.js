$(function(){
  crossroads.addRoute('home', function(){
    $('#content').html($('#homepage-template').html());
    $('.button-collapse').sideNav();
    $('.parallax').parallax();
  });

  crossroads.addRoute('signin', function(){
    $('#content').html($('#signin-template').html());
  });

  crossroads.addRoute('signup', function(){
    $('#content').html($('#signup-template').html());
  });


  //setup hasher
  function parseHash(newHash, oldHash){
    crossroads.parse(newHash);
  }
  hasher.initialized.add(parseHash); //parse initial hash
  hasher.changed.add(parseHash); //parse hash changes
  hasher.init(); //start listening for history change

  //update URL fragment generating new history record
  hasher.setHash('home');

});
