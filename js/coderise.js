(function() {

  StackMob.init({
    appName: "APPNAME",
    clientSubdomain: "",
    publicKey: "",
    apiVersion: 0
  });
  
  var Coderiser = StackMob.Model.extend({ schemaName: 'coderisers' });

  $('#create-coderiser').click(function(e) {
    e.preventDefault();
    
    var name = $('#name').val();
    var passions = [];
    $('.passion:checked').each(function(ix, passion) {
        passions.push($(passion).val());
    });
    
    var entry = new Coderiser({ name: name, passions: passions });
    entry.create({
        success: function(model) {
            var files = $('#avatar')[0].files;
    
            for (var i = 0, f; f = files[i]; i++) {
         
              var reader = new FileReader();
         
              // Closure to capture the file information
              reader.onload = (function(theFile) {
                return function(e) {
         
                  var base64Content = e.target.result.substring(e.target.result.indexOf(',') + 1, e.target.result.length);
                  var fileName = theFile.name;
                  var fileType = theFile.type;
                   
                  model.setBinaryFile('avatar', fileName, fileType, base64Content);
                  model.save();
                };
              })(f);
         
              // Read in the file as a data URL
              fileContent = reader.readAsDataURL(f);
         
            }
        },
        error: function(model, response) {
            console.log(response);
        }
    });

    alert("Created a coderiser in StackMob server");
  });

  $('#get-coderisers').click(function(e) {
      e.preventDefault();
      
    var coderisers = new Coderiser();

    coderisers.fetch({
        success: function(model) {
          var coderisers = model.toJSON();
          var container = $('#coderisers');
          container.empty();
          $.each(coderisers, function(ix, coderiser) {
              console.log(coderiser);
              container.append('<p><img src="'+ coderiser.avatar +'" width="60" /> ' + coderiser.name + '</p>');
          });
        },
        error: function(mode, response) {
            console.log(response);
        }
    });

  });

})();