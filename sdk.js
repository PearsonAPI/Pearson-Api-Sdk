// Pearson Top Ten Travel API wrapper. V0.9
// Base Url for API call http://api.pearson.com/v2/
/// BASE OBJECT
function Pearson(apiKey) {
    'use strict';
    if (typeof apiKey === 'undefined') {
        this.base = 'http://api.pearson.com/v2/'
        this.apiKey = ""

    } else {
        this.base = 'http://api.pearson.com/v2/';
        this.apiKey = "&apikey=" + apiKey;
        return this;
    }
};
/////// BASE OBJECT END

///// Dictionaries and methods
Pearson.prototype.dictionaries = function() {
    'use strict';
    this.api = "dictionaries";
    this.url = this.base + this.api + "/"
    this.addSearch = function (searchTerm ) {
        var searchString = '';
        var terms = "&search=" + encodeURIComponent(searchTerm);
        searchString = searchString + terms;
        this.searchTerm = searchString.substr(1);
        return this;
    };
    this.headword = function (searchTerm) {
        var searchString = '';
        var terms = "&headword=" + encodeURIComponent(searchTerm);
        searchString = searchString + terms;
        this.headword = searchString.substr(1);
        return this;
    };

    this.audio = function (audio) {
        'use strict'
        this.audio = audio;
        return this;
    };

    this.images = function (images) {
        'use strict'
        this.images = images;
        return this;
    };

    return this;
};
// dictionary allow empty attribute WITHOUT = method. ////WIP
function toQueryString(bits) {
    var obj = {audio: bits.audio, images: bits.images }
    var parts = [];
    for (var i in obj) {
        if (obj.hasOwnProperty(i) && (typeof obj[i] !== "undefined" )) {
            console.log(encodeURIComponent(i));
            console.log(encodeURIComponent(obj[i]));
            parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
        }
        else 
            parts.push(encodeURIComponent(i))
    }
    return parts.join("&");
};


///// Travel ////// listDatasets id attr needs fixing and full url test needed. 
Pearson.prototype.travel = function() {
    'use strict';
    this.api = "travel";
    this.url = this.base + this.api + "/"

    this.addDatasets = function() {
        // If whitespace is a problem - add .replace(/\s+/g,"") to args to remove. Hopefully.
        // This resets the url to nil before repopulating.
        this.url = this.base + this.api + "/";
        this.datasets = "";
        var datasets;
        var args = Array.prototype.slice.call(arguments);
        this.datasets = args.join(",");
        console.log(this.datasets);
        this.url = this.url + this.datasets + '/';
        return this;
    };

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

    this.addSearch = function (searchTerm ) {
        var searchString = '';
        var terms = "&search=" + encodeURIComponent(searchTerm);
        searchString = searchString + terms;
        this.searchTerm = searchString.substr(1);
        return this;
    };

    // Add lat and long to query string
    this.addPosition = function (lat, lon, dist) {
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
    return this;
};


//// Food and Drink
Pearson.prototype.foodanddrink = function() {
    'use strict';
    this.api = "foodanddrink";
    this.endpoint = "recipes";
    this.url = this.base + this.api + "/"
    return this;
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
    this.endpoint = 'datasets';
    
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

    this.endpoint = 'datasets';

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

    this.endpoint = 'datasets';

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
    return out;
};


// Get a document by UID, if you know it! ///RETURN Article - object independant? //Test with food.
Pearson.prototype.getById = function (id) {
    'use strict';
    var results;
    if (typeof this.endpoint == 'undefined') {
        this.endpoint = 'topten';
        var z = this.url + this.endpoint + '/' + id + "?" + this.apiKey.substr(1);
         results = grab(z);
         return results;

    } else {
        var z = this.url + this.endpoint + '/' + id + "?" + this.apiKey.substr(1);
         results = grab(z);
         return results;
    }
};


// Add url params that limit results. /// To be homologised.
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
    //dictionary mods // not finished
    if (typeof this.headword !== 'undefined') {
        url = url + this.headword
    } else {
        url
    };//
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

    //Redacted from version where apikey was mandatory
    // if (url.indexOf("undefined") != -1 || url.indexOf("NaN") != -1) {
    //     throw {
    //         name: 'Api or endpoint undefined',
    //         message: 'Please select an API and an endpoint to work with'
    //     }
    // } else {

        return url;
    //}
};


// Debug: async callback - log data and result - look for timing errors.

    Pearson.prototype.fetch = function() {
      'use strict';
        var ApiObject = this;
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
