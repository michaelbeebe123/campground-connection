$(document).ready(function () {
  // Getting references to our form and input
  // var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var fnameInput = $("input#fname-input");
  var lnameInput = $("input#lname-input");

  // When the signup button is clicked, we validate the email and password are not blank
  $("#signup").on("click", function (event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      fname: fnameInput.val().trim(),
      lname: lnameInput.val().trim()
    };

    // if (!userData.email || !userData.password) {
    if (!userData.email || !userData.password || !userData.fname || !userData.lname) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    // signUpUser(userData.email, userData.password);
    signUpUser(userData.email, userData.password, userData.fname, userData.lname);
    emailInput.val("");
    passwordInput.val("");
    fnameInput.val("");
    lnameInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  // function signUpUser(email, password) {
  function signUpUser(email, password, fname, lname) {
    $.post("/api/signup", {
      email: email,
      password: password,
      fname: fname,
      lname: lname
    })
      .then(function (data) {
        window.location.replace("/search");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
