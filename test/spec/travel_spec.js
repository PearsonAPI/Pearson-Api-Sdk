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
	var travel =  new Pearson("akeyhere");

// note: toThrow only workds by passing an anonymous function to expect.
	it("should throw an error if no api key is passed in", function() {
	  expect( function (){ new Pearson(); }).toThrow();
	});

	it("should throw an error if the api key is not a string", function(){
		expect( function(){ new Pearson(apikey); }).toThrow();
	});

	it("should throw an error if the buildUrl function is called without specifics", function() {
	  expect( function (){
	  	new Pearson('apikey').buildUrl();
	  }).toThrow();
	});
	
	it("should be an object", function(){
		expect(new Pearson('akeyhere')).toEqual(jasmine.any(Pearson));
	});

	it("should have a base URL for the API", function(){
		expect(travel.base).toEqual("http://api.pearson.com/v2/");
	});

});

describe("new Api object", function() {
	var travel =  new Pearson("akeyhere");

	it("should throw an error if the buildUrl function is called before an api or endpoint are specified", function() {
		expect( function(){
			travel.buildUrl();
		}).toThrow();
	  
	});
  
	it("should take an api key in string format and append it to a query string", function(){
		expect(travel.apiKey).toEqual("&apikey=akeyhere");
	});

	it("should take a string as an argument to set the api to call", function(){
		travel.api('travel');
		expect(travel.url).toEqual("http://api.pearson.com/v2/travel/");
	});

	it("should be able to have a set endpoint", function(){
		travel.addEndpoint('topten');
		expect(travel.endpoint).toEqual('topten');
	});

	it("should be able to have limiting parameters added", function(){
		travel.addParams({ offset: 10, limit:20 });
		expect(travel.params).toEqual('offset=10&limit=20');
	});

	it("should not return undefined if no parameter set", function(){
		travel.addParams();
		expect(travel.params).toBeDefined;
	});

	it("should have a default parameter", function(){
		travel.addParams();
		expect(travel.params).toEqual('offset=0');
	});

	it("should take search terms in the query string", function(){
		travel.addSearch("searchterm");
		expect(travel.searchTerm).toEqual('search=searchterm');
	});

	it("should add search terms as a query string when buildUrl is called", function(){
		travel.api('travel').dataset('newyork').addEndpoint('topten').addSearch("searchterm").buildUrl();
		expect(travel.buildUrl()).toContain('&search=searchterm');
	});

	it("should encode the search terms in query format", function(){
		travel.addSearch("your search here");
		expect(travel.searchTerm).not.toEqual('search=your search here');
		expect(travel.searchTerm).toEqual('search=your%20search%20here');
	});

	it("should be able to add latitude, longitude and distance to the query", function(){
		travel.addPosition(10, 20, 30);
		expect(travel.position).toEqual('&lat=10&lon=20&dist=30');
	});

	it("should log an error to console if lat, long or distance aren't defined", function(){
		travel.addPosition(10, 10);
		expect(this.console).toEqual(console.log('Please enter a value for the search radius'));
	});

});

describe("The build url function", function() {

	var travel = new Pearson("JZNt3YM1veh1d6HDiCpA86vFJvuRefjw");
		travel.api('travel');

	it("should throw an error if the url contains an undefined segment", function() {
		  expect( function(){
		  	travel.api().buildUrl();
		  }).toThrow();
	});
	
  
  	it("should take the endpoint passed to the object and construct and URL for the API call with that endpoint", function(){
  		travel.addEndpoint('topten');
  		travel.buildUrl();
  		expect(travel.buildUrl()).toEqual("http://api.pearson.com/v2/travel/topten?&apikey=JZNt3YM1veh1d6HDiCpA86vFJvuRefjw");
  		expect(travel.addEndpoint('streetsmart').buildUrl()).toEqual("http://api.pearson.com/v2/travel/streetsmart?&apikey=JZNt3YM1veh1d6HDiCpA86vFJvuRefjw");
  	});

  	it("should throw an error if there are spaces in the url")
  		expect(travel.api('travel').addEndpoint('topten').buildUrl()).not.toContain(' ');
  });

//////Ok to here.

describe("The $.fetch function", function(){
		var travel = new Pearson("JZNt3YM1veh1d6HDiCpA86vFJvuRefjw");
		travel.api('travel').addEndpoint('topten');

	it("should return a 200 ok from the server", function() {
		var yourData = $.fetch(travel);
		expect(yourData.json.status).toEqual(200);
	});

	it("should return an AjaxContent object", function(){

	});

	it("the AjaxContent object should contain a JSON response", function(){
		var yourData = $.fetch(travel);
		expect(yourData.json).toEqual(jasmine.any(Object));
	})
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























