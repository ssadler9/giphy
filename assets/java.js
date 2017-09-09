// Display Buttons for user on the DOM
var topics = ["football", "golf", "baseball", "basketball"];

// Submit button needs to append to the page, and request info from ajax when clicked
$('#addSport').on('click', function (event){
	event.preventDefault();
	var addSport = $('#searchTerm').val().trim();
	topics.push(addSport);
	displayButtons();
});


// display buttons dynamically on page
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
function displayGif (){
$(".gif").on("click", function() {
    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gif + "&api_key=4a7bc80817954ed0a0a298eb2da9c2b0&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .done(function(response) {
        console.log(response);
        var results = response.data;
    // creating a div for each gif returned
        for (var i = 0; i < results.length; i++) {
    // Need to have the images load as still images, then activate on click
        // var still = "https://media2.giphy.com/media/akiHW8qDydkm4/200w_s.gif"
        // var animate = "https://media2.giphy.com/media/akiHW8qDydkm4/200w.gif"
        var gifDiv = $("<div class='item'>");
    // displaying the rating to each returned gif
        var rating = results[i].rating.toUpperCase();
        var p = $("<p>").text("Rating: " + rating);
        // add an img to the gifDiv
        var returnGif = $("<img>");
        // Need to create Data-types for still and animated return gifs
        returnGif.attr("src", results[i].images.fixed_height_still.url);
        returnGif.attr('data-still', results[i].images.fixed_height_still.url);
        returnGif.attr('data-animate', results[i].images.fixed_height.url);
        returnGif.attr('data-state', 'still');
        returnGif.addClass('gifImage');
        var still = $("<img src'" + results[i].images.original_still.url + "' width='300px' height='300px' name='" + results[i].images.original.url + "' data-url='" + results[i].images.original_still.url + "'>");
        still.addClass('img-rounded');


        // gif animates on event
        var toggle = 0;
        still.on('click', function(event){
            if (toggle === 0) {
                $(this).attr('src', ($(this).attr('name')));
                toggle = 1;
            } else if (toggle = 1){
                $(this).attr('src', ($(this).attr('data-url')));
                toggle = 0;
            }

        })

    // now to display the gif and rating to the page
        gifDiv.prepend(p);
        // gifDiv.prepend(returnGif);
         // adding the still gif to the DOM on the buttonclick
        gifDiv.append(still);
        $("#gif-display").prepend(gifDiv);
        }
    });
});
};
displayGif();
$(document).on("click", ".gif", displayGif);


