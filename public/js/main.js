$(function () {

  // Get Add Button
  var addContact = $("#addContact");

  // Get Database References
  var db = new Firebase("https://coderise.firebaseio.com");
  var contacts = db.child("contacts");

  // Load and Compile template
  var template = $("#contact-template").html();
  Mustache.parse(template);

  // Add a new contact to Database
  addContact.on('click', function (e) {
    e.preventDefault();

    // Get input information
    var name = $("#name").val();
    var email = $("#email").val();

    // Save contact to Database
    contacts.push({
      name: name,
      email: email
    });


    // Clean form
    $("#name").val("");
    $("#email").val("");
  });

  // Add a new contact to HTML
  contacts.on('child_added', function (snapshot) {
    // Load Contact from Database
    var contact = snapshot.val();

    // Apply data to template
    var html = Mustache.render(template, contact);

    // Append rendered contact to contact list
    $("#contacts").append(html);
  });

 });
