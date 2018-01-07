//As of 1-6-18
//Successes
//can pull from Giphy API
//shows gifs when click on button

//Issues
//new button is no longer being added to html
//not pulling  gifs based on new button


  //svar topics = ["Books", "Hugs", "Pasta", "Candy"];

	// Event listener for all button elements
    $("#buttonsToClick").on("click","button", function() {

      //create rule so a new button is added when clicking?
      //user can enter a topic, and add a button to favoriteThings topic
      //$("#newFavoriteThing").append("<button>");
      var searchStuff = $(this).attr('data-search');

      // Constructing a URL to search Giphy for type of topics listed in HTML 
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        searchStuff + "&api_key=RBewSGhRETQiOqgyvlc8VecQPVRMNqKg&limit=10";

      // Performing our AJAX GET request
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After the data comes back from the API
        .done(function(response) {

          console.log(response);
          // Storing an array of results in the results variable
          var results = response.data;

          // Looping over every result item
          for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r") {
              // Creating a div with the class "item"
              var gifDiv = $("<div class='item'>");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
              var topicImage = $("<img>");

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              topicImage.attr("src", results[i].images.fixed_height.url);

              // Appending the paragraph and topicImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(topicImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#showGifs").prepend(gifDiv);
            }
          }


          //code for animating and not animating gifs 
          
        });
    }); 

        //input HTML code--for reference
        //<input id="addFavoriteThings" type="submit" value="submit">

        //next steps in psuedocode
        // read out value from #favoriteThingsInput
        // create new button html with value from #favoriteThingsInput as data-search attribute value

       function displayButtons() { 
          //loop to run through results, and create button from results title
          $("#buttonsToClick").empty();
        for (var i = 0; i < searchStuff.length; i++) {
        var test = $('<button class="btn btn-primary">');
        test.attr("id", "show");
        test.attr("data-search", searchStuff[i]);
        test.text(searchStuff[i]);
        $("#buttonsToClick").append(test);
    }
  }


         //Submit button click event takes search term from form input, trims and pushes to topics array, displays button
        $("#addFavoriteThings").on("click", function(event) {
        event.preventDefault();
        var newThing = $("#favoriteThingsInput").val().trim();
        if (searchStuff.indexOf(newThing) > -1) {
          alert("wrong!!!!");
        } else {
          searchStuff.push(newThing);
          console.log(searchStuff);
          $("#favoriteThingsInput").val('');
          displayButtons();
        }
      })

      

        // append newButtonHtml to buttonsToClick block
      //$("#addFavoriteThings").on("click", function() {

  
      //empty search box; empty search results
      //$("#buttonsToClick").empty();

       
       


