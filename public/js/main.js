$(function () {

  var signIn = $("#signin");

  signIn.on('click', function (e) {
    e.preventDefault();

    var username = $("#email").val();
    var password = $("#password").val();

    console.log(username, password);
  });

 });
