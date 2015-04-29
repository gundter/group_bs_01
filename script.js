var apikey = '10d0a85137d94904c75e456dcdf91468227c09ca'; // Put your API key here
var j;
var k;
var i;
var count;
var gameArray = [];


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
    gameArray = results.slice(0);
    displayContent(gameArray, 0);
    buttonCreater();
}

function buttonCreater(){
	$(".buttonContainer").append("<div class='btn left-button'>Left</div>");
	for(j = 0; j < 8; j++){
		$(".buttonContainer").append("<div class='circle" + j +" circles'>" + j + "</div>");
	}
	$(".buttonContainer").append("<div class='btn right-button'>Right</div>");
}

function displayContent(results, count) {
	$(".content").empty();

		for(var k = 0; k < results[count].platforms.length; k++){
			var platforms = '';
			platforms += results[count].platforms[k].name + "<br>";
		}

		var image = results[count].image.medium_url;
		var name = results[count].name;
		var gameLink = results[count].site_detail_url;
		var gameId = results[count].id;
		
		if (results[count].deck != null) {
					var description = results[count].deck;
				} else {
					var description = "No Info Available";
				}
		$(".content").hide().append("<div class='col-md-8 well bg-info results group" + gameId + "'><img class='hidden-sm hidden-xs' src='" + image +"'/><br><button class='btn-default btn-sm minify'>Remove Item</button><button class='btn-success btn-sm showInfo'>Show Info</button></div>");
		$(".group"+gameId).append("<div class='appendPlatform'><p class='lead'>" + name + "</p><p>" + description +"</p><p>Platform: " + platforms + "</p><a href='" + gameLink + "'>More info...</a><div class='buttonContainer row'></div></div><button class='btn-sm btn-warning removeInfo'>Remove Info</button>");
		$(".content").fadeIn("slow");
		$(".results").css({height: '700px'});
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
		$(this).fadeOut();
		$(this).siblings(".appendPlatform").fadeOut();
		//$(this).parent().css({height: 'auto'});
	});

	
});


