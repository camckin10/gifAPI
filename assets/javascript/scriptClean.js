//Successes
//can pull from GIPHY API
//gifs are paused and animated when clicked
//buttons can be added based on input
//

//Issues
//once button created through input, buttons get smaller, and can no longer show test of buttons. 
//button issue could be a style issue
//ratings are cut off on browser

var topics = ["Books", "Sleep", "Pasta", "Candy"];


//event listener for button elements
$("#buttonsToClick").on("click", "button", function() {

	var searchStuff = $(this).attr('data-search');
	// Constructing a URL to search Giphy for type of topics listed in HTML 
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
	searchStuff + "&api_key=RBewSGhRETQiOqgyvlc8VecQPVRMNqKg&limit=10";

	$.ajax({
		url:queryURL,
		method:"GET"
	})
	.done(function(response) {
		console.log(response);
		var results = response.data;
		for(var i=0; i < results.length; i++) {
			if(results[i].rating !== "r") {
				var gifDiv = $("<div class='item'>");
				var rating = results[i].rating;
				var p = $("<p>").text("Rating:" + rating);
				var topicImage = $("<img>");

				//animateGif is equal to the source of the image tag
				var animateGif=results[i].images.fixed_height.url;

				//
				var stillGif=results[i].images.fixed_height_still.url;

				topicImage.addClass("picture");

				//src is equal to stillGif string
				topicImage.attr("src", stillGif);

				//data-animate is equal to animategif string
				topicImage.attr("data-animate", animateGif);

				//
				topicImage.attr("data-still", stillGif);

				//appending all images to the page
				gifDiv.append(p);
				gifDiv.append(topicImage);

				$("#showGifs").prepend(gifDiv);

				//append things get added one after the other down the page
				//prepend something gets added but pushes things down the page

			}
		}
	})


})

//on-click function for animate/still gifs
//anywhere in browser window is clicked
$(document).on("click", ".picture", function () {
	//var state = 
	console.log($(this).attr("src"));
	console.log($(this).attr("data-animate"));
	console.log($(this).attr("data-still"));

	var source = $(this).attr("src");
	var animate = $(this).attr("data-animate");
	var still = $(this).attr("data-still");


	if (source === still) {
		$(this).attr("src", animate)
	} else {
		$(this).attr("src", still)
	}
})



function displayButtons() {
	$("#buttonsToClick").empty();
	for(var i = 0; i <topics.length; i++) {
		var test= $('<button>');
		test.attr("id", "show");
		test.attr("data-search", topics[i]);
		test.addClass("btn btn-primary");
		test.text(topics[i]);
		$("#buttonsToClick").append(test);
	}
}

//submit button click event
$("#addFavoriteThings").on("click",function(event){
	event.preventDefault();
	var newThing= $("#favoriteThingsInput").val().trim();
	if (topics.indexOf(newThing)> -1) {
		alert("wrong");
	} else {
		topics.push(newThing);
		console.log(topics);
		$("#favoriteThingsInput").val('');
		displayButtons();
	}
})

