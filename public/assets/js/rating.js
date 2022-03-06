$(document).ready(function() {
    $("form#ratingForm").submit(function(e) {
    e.preventDefault(); 
    if ($("#ratingForm :radio:checked").length == 0) {
        document.getElementById("status").innerHTML = "nothing checked";
        return false;
    } else {
        document.getElementById("status").innerHTML = 'You picked ' + $('input:radio[name=rating]:checked'.value);
    }
    });
});