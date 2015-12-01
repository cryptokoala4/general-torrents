var API_WRAPPER = function () {
  this.URL_BASE = window.location.origin;

  this.getSecret = function () {
    return $.ajax({
      url: this.URL_BASE + '/secret',
      method: "GET"
    });
  };

  this.getTorrents = function () {
    return $.ajax({
      url: this.URL_BASE + '/api/torrents',
      method: "GET"
    });
  };
};

var API = new API_WRAPPER();

// $.ajax({
//   url: 'http://localhost:3000/api/torrents',
//   method: "GET"
// }).done(function(torrents){
//   console.log(torrents);

// })