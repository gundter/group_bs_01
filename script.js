var apikey = '10d0a85137d94904c75e456dcdf91468227c09ca'; // Put your API key here
var j;
var k;
var i;

// HELPER FUNCTION
// Executes a search using 'query' and runs searchCallback on the results of a success.
function search(query){

	$.ajax ({
	    type: 'GET',
	    dataType: 'jsonp',
	    crossDomain: true,
	    jsonp: 'json_callback',
	    url: 'http://www.giantbomb.com/api/search/?format=jsonp&resources=game&api_key=' + apikey +'&query=' + encodeURI(query),
	    complete: function() {
	        console.log('ajax complete');
	    },
	    success: function(data) {
	        searchCallback(data.results);
	    }
	});

}

// Use this function to do stuff with your results. 
// It is called after 'search' is executed.
function searchCallback(results) {
    console.log(results);
    displayContent(results);
}

function displayContent(results) {
	$(".content").empty();
	for (j = 0; j < results.length; j++){
		if (results[j].deck != null) {
					var description = results[j].deck;
				} else {
					var description = "No Info Available";
				}
		$(".content").hide().append("<div class='col-md-4 bg-primary results group" + results[j].id + "'><img class='hidden-sm hidden-xs' src='" + results[j].image.medium_url +"'/><br><button class='btn-default btn-sm minify'>Remove Item</button><button class='btn-success btn-sm showInfo'>Show Info</button></div>");
		$(".group"+results[j].id).append("<div class='appendPlatform'><p class='lead'>" + results[j].name + "</p><p>" + description +"</p><p>Platform: " + results[j].platforms[0].name + "</p><button class='btn-sm btn-warning removeInfo'>Remove Info</button></div>");
		$(".content").fadeIn("slow");
		$(".results").css({height: '600px'});
	}
}


$(document).ready(function() {

	$(".header").on("click", ".searchBtn", function() {
		$(".content").append("<h2>Please wait....</h2><br><img class='mindblow' src='mindblow.png'/>");
		var searchVal = $(".searchField").val();
		console.log(searchVal);
		search(searchVal);
	});

	$(".content").on("click", ".minify", function (){
		$(this).parent().fadeOut("slow");
		//$(this).parent().toggleClass("hidden");
	});

	$(".header").append("<button class='btn-warning btn-lg returnContent'>Return Content to screen</button>");

	$(".header").on("click", ".returnContent", function(){
		$(".results").css({height: '600px'});
		$(".results").fadeIn("slow");
		$(".results").children().children().fadeIn("fast");
		});

	$(".content").on("click", ".showInfo", function(){
		console.log("Show Info");
		$(this).siblings().fadeIn();
		//$(this).siblings(".appendPlatform").css({height: '600px'});
	});

	$(".content").on("click", ".removeInfo", function(){
		console.log("Remove Info");
		$(this).parent().fadeOut();
		//$(this).parent().css({height: 'auto'});
	});

	
});


