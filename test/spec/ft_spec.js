describe("The FT Articles Api", function(){
	var ft = PearsonApis.ftarticles("JZNt3YM1veh1d6HDiCpA86vFJvuRefjw");
	var art = ft.articles;

	it("should have the same base url", function(){
		expect(ft.base).toEqual("http://api.pearson.com/v2/")
	});

	it("should have the Endpoint of articles available to it", function(){
		expect(ft.articles).toBeDefined();
	});

	it("should be able to return articles", function(){
		var search = {search: "mclaren"};
		var mclaren = art.search(search);
		expect(mclaren.status).toEqual(200);
	});

	it("should be able to return a recipe by id", function(){
		var mcx = art.getById("cqDYjsGQbj");
		expect(mcx.status).toEqual(200);
		expect(mcx.result).toBeDefined();
	});


});

describe("In the sandbox:", function(){
	var ft = PearsonApis.ftarticles()
	var res = ft.articles.search();

	it("should return a response without an apikey", function(){
		expect(res.status).toEqual(200);
	});
})

