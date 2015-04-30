var apikey = '10d0a85137d94904c75e456dcdf91468227c09ca'; // Put your API key here
var j;
var k;
var i;
var count = 0;
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

function searchCallback(results) {
    console.log(results);
    gameArray = results.slice(0);
    console.log(gameArray);
    displayContent(gameArray, 0);
    
}

function buttonCreater(gameArray){
	$(".buttonContainer").append("<div class='left-button col-md-2'><span class='glyphicon glyphicon-chevron-left' aria-hidden='true'></span></div>");
	for(j = 0; j < 8; j++){
		$(".buttonContainer").append("<div class='circles col-md-1'><img class='img-circle thumb thumbs"+j+" text-center deselected' src='" + gameArray[j].image.thumb_url + "'/></div>");
	}
	$(".buttonContainer").append("<div class='right-button col-md-2'><span class='glyphicon glyphicon-chevron-right' aria-hidden='true'></span></div>");
}

function displayContent(results, count) {
	$(".content").empty();
	$(".footer").empty();

		var consoles = '';
		for(var k = 0; k < results[count].platforms.length; k++){
			
			consoles += results[count].platforms[k].name + "<br>";
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
		$(".content").hide().append("<div class='col-md-12 well bg-info results group" + gameId + "'><img class='hidden-sm hidden-xs' src='" + image +"'/><br><button class='btn-success btn-sm showInfo'>Show Info</button></div>");

		$(".group"+gameId).append("<div class='appendPlatform'><p class='lead'>" + name + "</p><p>" + description +"</p><p>Platform: " + consoles + "</p><a href='" + gameLink + "'>More info...</a><br><button class='btn-sm btn-warning removeInfo'>Remove Info</button></div>");
		$(".footer").append("<div class='buttonContainer text-center container'></div>");

		buttonCreater(gameArray);

		$(".thumbs"+count).removeClass("deselected");
		$(".thumbs"+count).addClass("selected");

		$(".appendPlatform").hide();
		$(".content").fadeIn("slow");
		$(".results").css({height: '550px'});
		
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
	});

	$(".content").on("click", ".showInfo", function(){
		console.log("Show Info");
		$(this).siblings().slideDown();
	});

	$(".content").on("click", ".removeInfo", function(){
		console.log("Remove Info");
		$(this).parent(".appendPlatform").slideUp();
	});

	$(".footer").on("click", ".left-button", function(e) {
		e.preventDefault();
		count--;
		console.log(count);
		if (count < 0){
			count = 7;}
		displayContent(gameArray, count);
	});

	$(".footer").on("click", ".right-button", function() {		
		count++;
		if (count > 7){
			count = 0;
		}
		displayContent(gameArray, count);
	});

	
});


