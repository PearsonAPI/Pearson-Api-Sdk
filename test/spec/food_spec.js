describe("The Food Api", function(){
	var food = PearsonApis.foodanddrink("JZNt3YM1veh1d6HDiCpA86vFJvuRefjw");
	var recipes = food.recipes

	it("should have the same base url", function(){
		expect(food.base).toEqual("http://api.pearson.com/v2/")
	});

	it("should have the Endpoint of recipes available to it", function(){
		expect(food.recipes).toBeDefined();
	});

	it("should be able to return recipes", function(){
		var search = {search: "chicken"};
		var chicken = recipes.search(search);
		expect(chicken.status).toEqual(200);
	});

	it("should be able to return a recipe by id", function(){
		var matzo = recipes.getById("721");
		expect(matzo.status).toEqual(200);
		expect(matzo.result).toBeDefined();
	});


});