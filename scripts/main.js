$(function(){

  crossroads.bypassed.add(function(name){


    // var dom = $('#'+name+'-template');
    //
    // if(dom.length > 0){
    //   $('#content').html(dom.html());
    // } else {
      console.warn("Could not match route!", arguments);
      hasher.setHash('404');
    // }
  });

  function addRoute(name, cb){
    crossroads.addRoute(name, function(){
      console.log('setting ocntent', name, $('#'+name+'-template').html());
      $('#content').html($('#'+name+'-template').html());
      if(cb){
        cb();
      }
    });
  }

  addRoute('home', function(){
    $('.button-collapse').sideNav();
    $('.parallax').parallax();
  });

  addRoute('signin');
  addRoute('signup');
  addRoute('profile');

  addRoute('404');


  //setup hasher
  function parseHash(newHash, oldHash){
    crossroads.parse(newHash);
  }
  hasher.initialized.add(parseHash); //parse initial hash
  hasher.changed.add(parseHash); //parse hash changes
  hasher.init(); //start listening for history change

  //update URL fragment generating new history record
  // hasher.setHash('home');

});
