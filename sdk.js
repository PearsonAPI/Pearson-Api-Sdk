// Pearson Top Ten Travel API wrapper.
// Base Url for API call

function Pearson(apiKey) {
    'use strict';
    if (typeof apiKey === 'undefined') {
        throw {
            name: 'Key Undefined Error',
            message: 'An API key must be defined as a string'
        };

    } else {
        this.base = 'http://api.pearson.com/v2/';
        this.apiKey = "&apikey=" + apiKey;
        return this;
    }
}

//Add api section - Can hard code above, but this allows for use in similar apis.

Pearson.prototype.api = function (api) {
    'use strict';
    if (typeof api === 'undefined') {
        throw {
            name: 'Api undefined',
            message: 'Please select an API to work with'
        };
    } else {
        this.url = this.base + api + '/';
        return this;
    }
};


//List all datasets for an api

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

}

Pearson.prototype.listDatasets = function () {
    'use strict';
    this.addEndpoint('datasets');
    
    this.addParams({
      limit: 25,
      offset:0
    });

    var call = this.buildUrl();
    var datasetsList = grab(call);
    var results = datasetsList.results;
    var len = results.length;
    var out = [];

    for (var i = 0; i < len; i++) {
        out.push({
            description: results[i].description,
            id: results[i].id
        });
    }

    this.addParams({
      limit: 25,
      offset:25
    });

    grab(call);
    var results = datasetsList.results;
    
    for (var i = 0; i < len; i++) {
        out.push({
            description: results[i].description,
            id: results[i].id
        });
    }

    this.addParams({
      limit: 25,
      offset:50
    });

    this.addEndpoint('datasets');

    var call = this.buildUrl();
    var datasetsList = grab(call);
    var results = datasetsList.results;
    var len = results.length;

    for (var i = 0; i < len; i++) {
        out.push({
            description: results[i].description,
            id: results[i].id
        });
    }

    this.addParams({
      limit: 25,
      offset:75
    });

    this.addEndpoint('datasets');

    var call = this.buildUrl();
    var datasetsList = grab(call);
    var results = datasetsList.results;
    var len = results.length;
    for (var i = 0; i < len; i++) {
        out.push({
            description: results[i].description,
            id: results[i].id
        });
    }

    // If you uncomment this, it will log out all the dataset ids and titles to the console...
    // console.log(out.length);
    // var top = out.length;
    // for (var i = 0; i < top; i++) {
    //     console.log(out[i].id + out[i].description);
    // }
    return out;
}


// Get a document by UID, if you know it!
Pearson.prototype.getArticleById = function (id) {
    'use strict';
    if (typeof this.endpoint == 'undefined') {
        this.endpoint = 'topten';
        var z = this.url + this.endpoint + '?' + id + this.apiKey;
        return z;
    } else {
        var z = this.url + this.endpoint + '?' + id + this.apiKey;
        return z;
    }
};


//Add a dataset by id
Pearson.prototype.dataset = function (dataset) {
    'use strict';
    if (typeof dataset === 'undefined') {
        throw {
            message: 'Please define a dataset to work in'
        };
    } else {
        this.url = this.url + dataset + '/';
        return this;
    }
};

// Add endepoint for Api call
Pearson.prototype.addEndpoint = function (endpoint) {
    'use strict';
    this.endpoint = endpoint;
    return this;
};

// Add url params that limit results.
Pearson.prototype.addParams = function (params) {
    'use strict';
    var url = '';
    var params = params || {
        offset: 0
    };
    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            var value = params[key];
            url += '&' + key + '=' + value;
        }
        this.params = url.substr(1);
    }
    return this;
};

// Add search term to the query string
Pearson.prototype.addSearch = function (searchTerm) {
    'use strict';
    var searchString = '';
    var terms = "&search=" + encodeURIComponent(searchTerm);
    searchString = searchString + terms;
    this.searchTerm = searchString.substr(1);
    return this;
};

// Add lat and long to query string
Pearson.prototype.addPosition = function (lat, lon, dist) {
    'use strict';
    var pos;

    if (typeof lat === 'undefined') {
        console.log('latitude is not defined');
    }
    if (typeof lon === 'undefined') {
        console.log('longitude is not defined');
    }
    if (typeof dist === 'undefined') {
        console.log('Please enter a value for the search radius');
    }
    var pos = "&lat=" + lat + "&lon=" + lon + "&dist=" + dist;
    this.position = pos;
    return this;
};

// Construct Url for the API call
Pearson.prototype.buildUrl = function () {
    'use strict';
    var url = this.url + this.endpoint + '?';
    if (typeof this.params !== 'undefined') {
        url = url + this.params;
    } else {
        url
    };
    if (typeof this.searchTerm !== 'undefined' && typeof this.params !== 'undefined') {
        url = url + "&" + this.searchTerm;
    } else {
        url
    };
    if (typeof this.searchTerm !== 'undefined' && typeof this.params == 'undefined') {
        url = url + this.searchTerm;
    } else {
        url
    };
    if (typeof this.position !== 'undefined') {
        url = url + this.position;
    } else {
        url
    };

    url = url + this.apiKey;

    if (url.indexOf("undefined") != -1 || url.indexOf("NaN") != -1) {
        throw {
            name: 'Api or endpoint undefined',
            message: 'Please select an API and an endpoint to work with'
        };
    } else {

        return url;
    }
};

function buildIt(objec) {
    'use strict';
    var url = objec.url + objec.endpoint + '?';
    if (typeof objec.params !== 'undefined') {
        url = url + objec.params;
    } else {
        url
    };
    if (typeof objec.searchTerm !== 'undefined' && typeof objec.params !== 'undefined') {
        url = url + "&" + objec.searchTerm;
    } else {
        url
    };
    if (typeof objec.searchTerm !== 'undefined' && typeof objec.params == 'undefined') {
        url = url + objec.searchTerm;
    } else {
        url
    };
    if (typeof objec.position !== 'undefined') {
        url = url + objec.position;
    } else {
        url
    };

    url = url + objec.apiKey;

    if (url.indexOf("undefined") != -1 || url.indexOf("NaN") != -1) {
        throw {
            name: 'Api or endpoint undefined',
            message: 'Please select an API and an endpoint to work with'
        }
    } else {

        return url;
    }
};



// $.fetch synchronous call stored in results

// Debug: async callback - log data and result - look for timing errors.

jQuery.extend({
    fetch: function (object) {
      'use strict';
        var ApiObject = object;
        var result = null;
        var url = buildIt(ApiObject);


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

     }

    
});



// Old ajax call function for non object pass through
// // Or is you just want a function to call that returns JSON in one hit:
// function callApi(url){
//     var call = url.buildUrl();
//     var yourData = $.fetch(call);
//     return yourData;
// };

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
