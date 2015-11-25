$(function(){
  API.getSecret().then(function (data) {
    console.log(data);
  }, errorHandling);
});