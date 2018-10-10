var topics = ["The West Wing", "Doctor Who", "The Good Place", "The Newsroom", "Whose Line Is It Anyway"];

    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var newButton = $("<button>");
        // Adding a class of movie-btn to our button
        newButton.addClass("show-btn");
        // Adding a data-attribute
        newButton.attr("data-title", topics[i]);
        // Providing the initial button text
        newButton.text(topics[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(newButton);
      }

      console.log("initialized");


function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var newButton = $("<button>");
        // Adding a class of movie-btn to our button
        newButton.addClass("show-btn");
        // Adding a data-attribute
        newButton.attr("data-title", topics[i]);
        // Providing the initial button text
        newButton.text(topics[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(newButton);
      }

      console.log("initialized");
}


$("button").on("click", function() {
    // Keyword refers to the button that was clicked
    var showTitle = $(this).attr("data-title");

    // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      showTitle + "&api_key=uLPs16YghTFt2ZrWQ23jHMQ09OWklIhJ&limit=10";


    var testURL = "https://api.giphy.com/v1/gifs/search?q=Avatar The Last Airbender&api_key=uLPs16YghTFt2ZrWQ23jHMQ09OWklIhJ&limit=10";
    // AJAX GET request
  
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response) {

        // store the results data

        var results = response.data;

        console.log(results);
       

        // loop over every result item

        for (var i = 0; i < results.length; i++) {

            // creating a div for the gif

            var gifDiv = $("<div>");

            // Storing the result item's rating

            var rating = results[i].rating;

            // Creating a paragraph tag with the result item's rating

            var p = $("<p>").text("rating: " + rating);


            // creating an image tag

            var showImage = $("<img>");

            // assign attributes

            showImage.attr("src", results[i].images.fixed_height_still.url);
            showImage.attr("data-state", "still");
            showImage.attr("data-still", results[i].images.fixed_height_still.url);
            showImage.attr("data-animate", results[i].images.fixed_height.url);
            showImage.addClass("gif");

            // append the paragraph and showimage we created to the gifDiv

            gifDiv.append(p);
            gifDiv.append(showImage);


            // prepend the gifDiv to the div in the html

            $("#gifs-appear-here").prepend(gifDiv);


        }


    })

});

$("#add-show").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var show = $("#show-input").val().trim();

    // Adding movie from the textbox to our array
    topics.push(show);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

  $(document).on('click', '.gif', function()
  {
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
      console.log("working");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
      console.log("working");
    }

  });