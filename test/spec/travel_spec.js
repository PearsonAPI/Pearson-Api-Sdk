//- it should accept a base url "http://api.pearson.com/v2"
//- it should be able to have an endpoint "/topten/etc"
//- it shoud be able to parse positional arguments "topten/positional"
//- it shout be able to parse a query string "/topten/postiional/?limit=20"
//- it should be able to fetch and return data as JSON
//- it should be able to add an Api Key to the query string
//- it should be able to list datasets
//- it should be able to get an atricle by endpoint or id
//- it should be able to modify the returned object for further methods.

describe("Pearson API object", function() {
	var travel =  PearsonApis.travel("akeyhere");

	it("should throw an error if the api key is not a string", function(){
		expect( function(){ PearsonApis.travel(apikey); }).toThrow();
	});

	it("should have a base URL for the API", function(){
		expect(travel.base).toEqual("http://api.pearson.com/v2/");
	});

});

describe("new Api object", function() {
	var travel =  PearsonApis.travel("akeyhere");

	it("should be a travel api object", function(){
		expect(travel.api).toEqual("travel");
	});
  
	it("should take an api key in string format and append it to a query string", function(){
		expect(travel.apikey).toEqual("akeyhere");
	});
// Endpoints
	it("should have an aroundtown object available to it", function(){
		expect(travel.aroundtown).toBeDefined();
	});

	it("should have a topten object available to it", function(){
		expect(travel.topten).toBeDefined();
	});

	it("should have a categories object available to it", function(){
		expect(travel.categories).toBeDefined();
	});

	it("should have a dataset object available to it", function(){
		expect(travel.dataset).toBeDefined();
	});

	it("should have a places object available to it", function(){
		expect(travel.places).toBeDefined();
	});

	it("should have an streetsmart object available to it", function(){
		expect(travel.streetsmart).toBeDefined();
	});

	it("should take the endpoint name as a method and set the path", function(){
		expect(travel.topten.path).toEqual("topten");
		expect(travel.aroundtown.path).toEqual("around_town");
	});
	
//
	
	// it("should encode the search terms in query format", function(){
	// 	travel.addSearch("your search here");
	// 	expect(travel.searchTerm).not.toEqual('search=your search here');
	// 	expect(travel.searchTerm).toEqual('search=your%20search%20here');
	// });

	
});

describe("The Endpoint object", function(){
	var travel = PearsonApis.travel("JZNt3YM1veh1d6HDiCpA86vFJvuRefjw");
	var test = travel.topten;

	it("should be be created when the endpoint method is called on the PearsonApis object", function(){
		expect(test.constructor.name).toEqual("Endpoint");
	});

	it("should have a path for the endpoint", function(){
		expect(test.path).toEqual("topten");
	});

	it("should contain a pearson object", function(){
		expect(test.pearson).toBeDefined();
	});

});

describe("The expandUrl function", function() {
	var travel = PearsonApis.travel("JZNt3YM1veh1d6HDiCpA86vFJvuRefjw");
	var test = travel.topten;

	  
  	it("should remove whitespace from the url", function(){
  		expect(test.expandUrl("stuff")).not.toContain(' ');
  	});

  	it("should add a base url to the provided input", function(){
  		expect(test.expandUrl("stuff")).toContain("http:");
  	});

  });

describe("Searching within datasets", function(){

});

//////Ok to here.

describe("The $.fetch function", function(){
		var travel = new Pearson("JZNt3YM1veh1d6HDiCpA86vFJvuRefjw");
		travel.api('travel').addEndpoint('topten');

	it("should return a 200 ok from the server", function() {
		var yourData = $.fetch(travel);
		expect(yourData.json.status).toEqual(200);
	});

});

describe("The Ajax content object", function() {
	travel = new Pearson("MdanoFGnnqcsI8fXArfKxW63mTTG2tG4");
	travel.api('travel');
	travel.dataset('tt_newyor');
	travel.addEndpoint('topten');
	ajaxlump = $.fetch(travel)

	it("should be an AjaxContent object", function() {
		expect(ajaxlump).toEqual(jasmine.any(AjaxContent))
	  
	});

	describe("The functions available to the object", function(){

		it("the raw function should return just the json from the AjaxContent object", function() {
		  raw = ajaxlump.raw();
		  expect(raw).toEqual(ajaxlump.json);
		});
		
		it("should contain the components from the original Pearson object", function() {
			raw = ajaxlump.raw();
			expect(raw.components).toBeDefined();   
		 });

		it("the getUrl method should return an array of urls", function() {
			urls = ajaxlump.getUrl();
			expect(urls[1].url).toContain("http://");		    
		});  

		it("the introText method should return an array containing introtext strings", function() {
			textfield = ajaxlump.introText();
		  	expect(textfield[0].text).toBeDefined();
		});

		it("the getResultUrl function should return one result as a string", function() {
			oneResult = ajaxlump.getResultUrl(1);
			expect(typeof oneResult).toEqual("string");
		 });

	});

	describe("The nextSet function", function(){
		it("should advance the result offset by the number of results returned to advance to the next set", function(){
			nextTest = ajaxlump.nextSet();
			expect(ajaxlump.raw().offset + ajaxlump.raw().count).toEqual(nextTest.raw().offset);
		});

	});
});



describe("The list functions", function() {
		var travel = new Pearson("JZNt3YM1veh1d6HDiCpA86vFJvuRefjw");
		travel.api('travel');

	it("listDatsets should return an array of objects from the datasets endpoint", function(){
		var dats = travel.listDatasets();
		expect(JSON.stringify(dats)).toContain('id');
		expect(JSON.stringify(dats)).toContain('description');
	});

  
});

describe("Retrieving an item by article id", function() {
		var travel = new Pearson("JZNt3YM1veh1d6HDiCpA86vFJvuRefjw");
		travel.api('travel');
		var idtest = travel.getArticleById('articleId');

	it("should create a query string with the article Id in", function(){
		expect(idtest).toContain('?articleId');
		expect(idtest).toContain('travel');
	});

	it("the query should have enough attributes to call the url", function(){
		expect(idtest).toContain('http://api.pearson.com/v2/travel/')
		expect(idtest).toContain('?')		
		expect(travel.url).toBeDefined();
		expect(travel.endpoint).toBeDefined();
		expect(travel.apiKey).toBeDefined();
	});

	
  
});

///Slice Checks

describe("Complete function checks", function() {
	var chainTest = new Pearson("JZNt3YM1veh1d6HDiCpA86vFJvuRefjw");
        chainTest.api('travel').dataset("someplace").addEndpoint('topten').addPosition(20, 30, 40).addSearch('restaurants');
    var outPutTest = chainTest.buildUrl();
    	returnTest = $.fetch(chainTest);
    	

	it("should have a url with no undefined parts", function() {
		expect(outPutTest).not.toContain('undefined');
	});
  
  	it("should return a 200 OK from the server", function(){
  		expect($.fetch(chainTest).json.status).toEqual(200);
  	});

  	var minimumTest = new Pearson("JZNt3YM1veh1d6HDiCpA86vFJvuRefjw");
  		minimumTest.api('travel').addEndpoint('places');
  	var placeTest = $.fetch(minimumTest);

  	it("endpoint search should not be empty if the call is returned as a 200", function(){
  		expect(placeTest.json.status).toEqual(200) && expect(placeTest.json.total).toBeGreaterThan(0);
  	});

});


/// Food and Drink Checks

describe("Food and drink specific methods", function() {
	var foodTest = new Pearson("JZNt3YM1veh1d6HDiCpA86vFJvuRefjw").api('foodanddrink').addEndpoint('recipes').addSearch('chicken');
  	var recipes = $.fetch(foodTest);

  	it("should return a 200 ok from the server", function() {
  	  expect(recipes.json.status).toEqual(200);
  	});

  	it("should contain a results array", function () {
  		expect(recipes.json.results).toBeDefined();
  	});

  	describe("the results methods", function() {
  		var resArray = recipes.getRecipeNames();
  		var fromame = recipes.getRecipeFromName(2);
  		var testID = fromame.id
  		var fromId = recipes.getRecipeById(testID)

  		it("should return the names and ids  of the results array", function(){
  			expect(resArray[0].id).toBeDefined();
  			expect(resArray[0].recipeName).toBeDefined();;
  		});

  		it("should be able to get a result from that array by index number", function() {
  		  expect(fromame.result).toBeDefined();
  		});
  	  		
  	  	it("should be able to get the same result from the array by ID", function() {
  	  	  expect(testID).toEqual(fromId.id);
  	  	});
  	});
});























