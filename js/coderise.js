(function() {

  StackMob.init({
    appName: "coderise",
    clientSubdomain: "<YOUR SUBDOMAIN>",
    publicKey: "<YOUR PUBLIC KEY>",
    apiVersion: 0
  });

  $('#create-coderiser').click(function(e) {
    e.preventDefault();

    var Coderiser = StackMob.Model.extend({ schemaName: 'coderisers' });
    var entry = new Coderiser({ name: 'Coderiser :D', passions: [ 'code', 'fun', 'javascript', 'html', 'css' ] });
    entry.create();

    console.log("Created a coderiser in StackMob server");

    coderisers = new Coderiser();

    coderisers.fetch({
      success: function(model) {
        console.log(model.toJSON());
      },
      error: function(mode, response) {
        console.log(response);
      }
    });

  });


})();