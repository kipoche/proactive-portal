$(function(){

  var profile = {
    id: '1234',
    firstName: 'Julien',
    lastName: 'Dreux',
    email: 'jjd0@gmail.com',
    phone: '9895628066',
    emergencyContacts: [
      {
        name: 'Colin Kfury',
        email: 'ck@gmail.com',
        phone: '1239129319'
      }
    ],
    place: 'Bangalore',
    area: 'Kormangala',
    pinCode: '560040',
    gender: 'Male',
    country: 'India',
    state: 'Karnataka',
    dob: '1988/12/07',
    bloodGroup: 'A +Ve',
    ngo: true
  };

  var users = new PouchDB('http://jdreux.iriscouch.com:5984/kaipache');

  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  crossroads.bypassed.add(function(name){
    console.warn("Could not match route!", arguments);
    hasher.setHash('home');
  });

  function addRoute(name, cb){
    crossroads.addRoute(name, function(){
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

  addRoute('signin', function(){

    $('#signin-submit').click(function(){
      users.get($('input[id=email]').val()).then(function(user){
        hasher.setHash('users/'+user._id);
      });
      return false;
    });

  });

  addRoute('signup', function(){
    $('#signup-submit').click(function(){
      var profile = {
        _id: $('input[id=email]').val(),
        firstName: $('input[id=first_name]').val(),
        lastName: $('input[id=last_name]').val(),
        email: $('input[id=email]').val(),
        phone: $('input[id=phone]').val(),
        password: $('input[id=password]').val()
      };

      users.put(profile).then(function(){
        hasher.setHash('users/'+profile._id);
      });

      return false;
    });
  });

  crossroads.addRoute('users/{id}', function(id){
    users.get(id).then(function(user){

      user = _.extend({
        place: '',
        area: '',
        pinCode: '',
        gender: '',
        country: '',
        state: '',
        dob: '',
        bloodGroup: '',
        ngo: false,
        emergencyContacts: []
        }, user);

      var compiled = _.template($('#profile-template').html());
      $('#content').html(compiled(user));
    });
  });

  crossroads.addRoute('profile', function(){

    var compiled = _.template($('#profile-template').html());

    $('#content').html(compiled(profile));
  });


  addRoute('404');


  //setup hasher
  function parseHash(newHash, oldHash){
    crossroads.parse(newHash);
  }
  hasher.initialized.add(parseHash); //parse initial hash
  hasher.changed.add(parseHash); //parse hash changes
  hasher.init(); //start listening for history change


});
