//- it should accept a base url "http://api.pearson.com/v2"
//- it should be able to have an endpoint "/topten/etc"


describe("Pearson API object", function() {
	var travel =  PearsonApis.travel("akeyhere");

	it("should throw an error if the api key is not a string", function(){
		expect( function(){ PearsonApis.travel(apikey); }).toThrow();
	});

	it("should have a base URL for the API", function(){
		expect(travel.base).toEqual("http://api.pearson.com/v2/");
	});

});

describe("The Travel API object", function() {
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

describe("Searching within specific datasets using the setDsets function", function(){
	var travel = PearsonApis.travel("JZNt3YM1veh1d6HDiCpA86vFJvuRefjw");
	var test = travel.topten;

	it("should take either a string of sets, comma separated", function(){
		var sets1 = test.setDatasets("one, two, three");
		expect(sets1.pearson.dsets).toEqual("one,two,three");
	});

	it("or a collection of strings comma separated", function(){
		var sets2 = test.setDatasets("one", "two", "three");
		expect(sets2.pearson.dsets).toEqual("one,two,three");
	});

});

describe("The getById function", function(){
	var travel = PearsonApis.travel("JZNt3YM1veh1d6HDiCpA86vFJvuRefjw");
	var test = travel.topten;
	var rArt = test.getById("4av3a5NScQdhZ1");

	it("should return a 200 ok from the server", function() {
		expect(rArt.status).toEqual(200);
	});

	it("should contain a url in the returned object", function(){
		expect(rArt.url).toBeDefined();
	});

});

// Searching

describe("Searching", function(){
	var travel = PearsonApis.travel("JZNt3YM1veh1d6HDiCpA86vFJvuRefjw");
	var travel2 = PearsonApis.travel("JZNt3YM1veh1d6HDiCpA86vFJvuRefjw");
	var test = travel.topten;
	var dtest = travel2.topten.setDatasets("tt_newyor");
	var srTrm = { search: "bar", offset: "5" };
	var res = test.search(srTrm);
	var dres = dtest.search(srTrm);

	it("should take a JSON object as an argument", function(){
		expect(test.search(srTrm)).toBeDefined();
	});

	it("should have defaults that are not undefined", function(){
		expect(res.url).not.toContain("undefined");
	});

	it("should return a 200 ok from the server", function(){
		expect(res.status).toEqual(200);
	});

	it("should return less results when refined by dataset", function(){
		expect(res.count).toBeGreaterThan(dres.count);
	});

	it("should return articles that exist", function(){
		expect(res.results[0]).toBeDefined();
		expect(dres.results[0]).toBeDefined();

	});


});

describe("In the sandbox:", function(){
	var trav = PearsonApis.travel()
	var res = trav.topten.search();

	it("should return a response without an apikey", function(){
		expect(res.status).toEqual(200);
	});
})






















