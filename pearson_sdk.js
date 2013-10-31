// Pearson Top Ten Travel API wrapper. V0.9
// Base Url for API call http://api.pearson.com/v2/

/// BASE OBJECT
function Pearson(apiKey) {
    'use strict';
    if (typeof apiKey === 'undefined') {
        this.base = 'http://api.pearson.com/v2/';
    } else {
        this.base = 'http://api.pearson.com/v2/';
        //this.apiKey = "&apikey=" + apiKey;
        this.apiKey = apiKey;
        return this;
    }
};

// Dictionaries API
Pearson.prototype.dictionaries = function() {
	'use strict';
	this.api =  "dictionaries";
	this.url = this.base + this.api + "/"
	this.endpoint = "entries";

	return this;
};

// Travel API
Pearson.prototype.travel = function() {
	'use strict';
	this.api = "travel";
	this.url = this.base + this.api + "/"
// Endpoints available
	this.topten = function() {
        'use strict';
        this.endpoint = "topten";
        return this;
    };

    this.streetsmart = function() {
        'use strict';
        this.endpoint = "streetsmart";
        return this;
    };

    this.aroundTown = function() {
        'use strict';
        this.endpoint = "around_town";
        return this;
    };

    this.places = function() {
        'use strict';
        this.endpoint = "places";
    };

    this.datasets = function() {
    	'use strict';
    	this.endpoint = "datasets";
    	// NB this is purely for listing datasets NOT for specifying them.
    };
// Specify datasets to work in.
	this.setDatasets = function() {
		// This adds a comma separated list of datasets between api and endpoint.
        this.url = this.base + this.api + "/";
        this.datasets = "";
        var datasets;
        var args = Array.prototype.slice.call(arguments);
        this.datasets = args.join(",");
        console.log(this.datasets);
        this.url = this.url + this.datasets + '/';
        return this;
    };


    return this;
};


//Food and Drink API

Pearson.prototype.foodanddrink = function() {
    'use strict';
    this.api = "foodanddrink";
    this.endpoint = "recipes";
    this.url = this.base + this.api + "/"
    return this;
};

// Generic AJAX get function

function grab(url) {
    $.ajax({
        url: url,
        type: 'GET',
        timeout: 1000, // feel free to mod this 
        contentType: 'text/plain',
        xhrFields: {
            withCredentials: false
        },
        async: false,
        success: function (data) {
            result = data;
        },
        error: function (x, t, m) {
            if (t === 'timeout') {
                console.warn("Hmm, request timed out");
            } else {
                console.warn(t);
            }
        }

    });
    return result;

};

// Get any article by ID
Pearson.prototype.getById = function (id) {
    'use strict';
    var results;
    if (typeof this.apiKey == 'undefined') {
        var z = this.url + this.endpoint + '/' + id;
         results = grab(z);
         return results;

    } else {
        var z = this.url + this.endpoint + '/' + id + "?" + this.apiKey.substr(1);
         results = grab(z);
         return results;
    }
};

// Adding limit and offset.
Pearson.prototype.search = function(json, offset, limit ) {
	var query;
     limit = limit || 10;
     offset = offset || 0;

     json.limit = limit;
     json.offset = offset;

     if (this.apiKey !== "undefined" || "") {
        json.apikey = this.apiKey;
        query = $.param(json);
     } else {
     	query = $.param(json);
	};

     console.log(query);

     this.querystring = query;

     return this;
};





// Building URL

function constructUrl(obj) {
    var url = "start";
    console.log(url);
    obj.querystring = obj.querystring || obj.apiKey;
    console.log(obj.querystring);
    console.log(obj.apiKey);
    console.log(obj.url);
    console.log(obj.endpoint);

	var url = obj.url + obj.endpoint + "/?" + obj.querystring;
    console.log(url)


	//console.log(url);

	return url;
};



// Fetch and return

Pearson.prototype.fetch = function() {
      'use strict';
        var ApiObject = this;
        var result = null;
        var url = constructUrl(ApiObject);


        $.ajax({
            url: url,
            type: 'GET',
            timeout: 1000, // feel free to mod this 
            contentType: 'text/plain',
            xhrFields: {
                withCredentials: false
            },
            async: false,
            success: function (data) {
                console.log(data);
                result = data;
            },
            error: function (x, t, m) {
                if (t === 'timeout') {
                    console.warn("Hmm, request timed out");
                } else {
                    console.warn(t);
                }
            }

        });
          
        var origin = [url];
        result.origin = origin[0];

        var origObj = [ApiObject];
        result.components = origObj[0];

        result = new AjaxContent(result);

        return result;

     };










     ///////// Original results methods


     /////////////////////////////////////////////////////
////        RESULTS time                    ////////
///////////////////////////////////////////////////

function AjaxContent(jsondata) {
    'use strict';
    // $.extend(this, new Pearson(jsondata.components.apiKey));
    this.json = jsondata
    return this;
}

AjaxContent.prototype.raw = function () {
    'use strict';
    return this.json;
};

AjaxContent.prototype.getUrl = function () {
    'use strict';
    var results = this.json.results;
    var apiKey = this.json.components.apiKey
    var len = results.length;
    var out = [];

    for (var i = 0; i < len; i++) {
        out.push({
            url: "http://api.pearson.com" + results[i].url + "?" + apiKey

        });
    }
    return out;
};

AjaxContent.prototype.introText = function () {
    'use strict';
    var results = this.json.results;
    var len = results.length;
    var out = [];

    for (var i = 0; i < len; i++) {
        if (typeof results[i].intro !== 'undefined') {
            out.push({
                title: results[i].title,
                text: results[i].intro.text
            });
        } else {
            out.push({
                title: results[i].title,
                text: 'No introductory text'

            });
        }
    }
    return out;


};


// The Next Method - Default returns then 

AjaxContent.prototype.nextSet = function () {
    'use strict';
    var count = this.json.count;
    var offset = this.json.offset;
    var limit = this.json.limit;

    var nextOffset = offset + count;
    var nextGroup = this.json.components.addParams({
        offset: nextOffset
    });
    var nextSet = $.fetch(nextGroup);

    // var returnedSet = new AjaxContent(nextSet);

    // return returnedSet;

    return nextSet;

};



// Get a specified url from a selection of results returend  

AjaxContent.prototype.getResultUrl = function (num) {

    var results = this.json.results;
    var i = num;

    url = "http://api.pearson.com" + results[i].url + "?" + this.json.components.apiKey;

    return url;
}

AjaxContent.prototype.getArticleObject = function (num) {
    var results = this.json.results;
    var i = num;

    url = "http://api.pearson.com" + results[i].url + "?" + this.json.components.apiKey;

    $.ajax({
        url: url,
        type: 'GET',
        timeout: 1000, // feel free to mod this 
        contentType: 'text/plain',
        xhrFields: {
            withCredentials: false
        },
        async: false,
        success: function (data) {
            console.log(data);
            result = data;

        },
        error: function (x, t, m) {
            if (t === 'timeout') {
                console.warn("Hmm, request timed out");
            } else {
                console.warn(t);
            }
        }

    });
}

/// FoodandDrink Methods

AjaxContent.prototype.getRecipeNames = function(){
    var results = this.json.results;

    var len = results.length;
    var out = [];

    for (var i = 0; i < len; i++) {
        if (typeof results[i].summary.title !== 'undefined') {
            out.push({
                recipeName: results[i].summary.title,
                id: results[i].id
            });
        } else {
            out.push({
                recipeName: "No recipeName found",
                id: 'No ID'

            });
        }
    }
    return out;


}

AjaxContent.prototype.getRecipeFromName = function(num){ // Where num is the recipe index in the results array
    var rId = this.json.results[num].id;

    var indRecipe = this.getRecipeById(rId);

    return indRecipe;
}


AjaxContent.prototype.getRecipeById = function(id) {
    var apiKey = this.json.components.apiKey;
    var url = this.json.components.url + this.json.components.endpoint + '/' + id + '?' + apiKey.substr(1);

    console.log(url);

    $.ajax({
        url: url,
        type: 'GET',
        timeout: 1000, // feel free to mod this 
        contentType: 'text/plain',
        xhrFields: {
            withCredentials: false
        },
        async: false,
        success: function (data) {
            console.log(data);
            result = data;

        },
        error: function (x, t, m) {
            if (t === 'timeout') {
                console.warn("Hmm, request timed out");
            } else {
                console.warn(t);
            }
        }

    });

    return result;
}
