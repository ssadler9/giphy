// Display Buttons for user on the DOM
var topics = ["football", "golf", "baseball", "basketball"];
function displayButtons() {
    $('#button-display').empty();
    // loops through topics and creates buttons
    for (var i = 0; i < topics.length; i++) {
        var buttons = $('<button>');
        // adds the class gif to each button
        buttons.addClass('gif');
        // creates a unique value for each button
        buttons.attr('data-name', topics[i]);
        // adds text to the buttons
        buttons.text(topics[i]);
        // displays buttons in the button-display div
        $('#button-display').append(buttons);
    };
};
displayButtons();

// create a click event to send to ajax
$("button").on("click", function() {
    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gif + "&api_key=4a7bc80817954ed0a0a298eb2da9c2b0&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .done(function(response) {
        var results = response.data;
    // creating a div for each gif returned
        for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='item'>");
    // displaying the rating to each returned gif
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        // add an img to the gifDiv
        var returnGif = $("<img>");
        returnGif.attr("src", results[i].images.fixed_height.url);
    // now to display the gif and rating to the page
        gifDiv.prepend(p);
        gifDiv.prepend(returnGif);
        $("#gif-display").prepend(gifDiv);
        }
    });
});

