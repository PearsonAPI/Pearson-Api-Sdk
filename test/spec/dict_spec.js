describe("The Dictionaries Api", function(){
	var dict = PearsonApis.dictionaries("JZNt3YM1veh1d6HDiCpA86vFJvuRefjw");
	var ent = dict.entries;

	it("should have the same base url", function(){
		expect(dict.base).toEqual("http://api.pearson.com/v2/")
	});

	it("should have the Endpoint of entries available to it", function(){
		expect(dict.entries).toBeDefined();
	});

	it("should be able to return entries", function(){
		var search = {headword: "building"};
		var bu = ent.search(search);
		expect(bu.status).toEqual(200);
	});

	it("should be able to return an entry by id", function(){
		var bui = ent.getById("cqAFffW1vs");
		expect(bui.status).toEqual(200);
		expect(bui.result).toBeDefined();
	});

	it("should be able to be refined by dataset / dictionary", function(){
		var search = { headword: "dog" }
		var test1 = PearsonApis.dictionaries("JZNt3YM1veh1d6HDiCpA86vFJvuRefjw");
		var d = test1.entries.setDsets("ldoce5");
		var ldoce5 = d.search(search);
		var test2 = PearsonApis.dictionaries("JZNt3YM1veh1d6HDiCpA86vFJvuRefjw");
		var alldict = test2.entries.search(search);

		expect(alldict.count).toBeGreaterThan(ldoce5.count);

	});


});