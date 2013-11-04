// Pearson Top Ten Travel API wrapper. V0.9
// Base Url for API call http://api.pearson.com/v2/

var Api = {
    dictionaries: function(apikey) { 
        return new Pearson(apikey).dictionaries(); 
    },
    travel: function(apikey) { 
        return new Pearson(apikey).travel(); 
    },
    foodanddrink: function(apikey) {
        return new Pearson(apikey).foodanddrink();
    }
 };

/// BASE OBJECT
function Pearson(apikey) {
    'use strict';
    this.apikey = apikey;
    this.base = "http://api.pearson.com/v2/"
    return this;
};

Pearson.prototype.dictionaries = function() {
    'use strict';
    this.api = "dictionaries";
    this.url = this.base + this.api + "/";
    this.entries = new Endpoint(this,"entries");
    return this;
};

Pearson.prototype.foodanddrink = function() {
    'use strict';
    this.api = "foodanddrink";
    this.url = this.base + this.api + "/";
    this.recipes = new Endpoint(this, "recipes");
    return this;
};

Pearson.prototype.ftarticles = function() {
    'use strict';
    this.api = "ftarticles";
    this.url = this.base + this.api + "/";
    this.articles = new Endpoint(this, "articles");
    return this;
};

Pearson.prototype.travel = function() {
    'use strict';
    this.api = "travel";
    this.url = this.base + this.api + "/";
    this.topten = new Endpoint(this, "topten");
    this.streetsmart = new Endpoint(this, "streetsmart");
    this.aroundtown = new Endpoint(this, "around_town");
    this.places = new Endpoint(this, "places");
    return this;

};


/// Work in progress, eject if you like.


// Pearson.prototype.listDatasets = function() {
//     'use strict';
//     var out = [];
//     this.path = "datasets";
//     var call = this.base + this.api + "/" + this.path;
//     var offset = 0;
//     var results = grab(this.url + this.path + "?" +offset);
//     // var len = results.length;
//     var tot = results.total;
//     var count = 0;

//     for (var i = 0; i < tot; i += count) {
//         var dUrl = this.url + this.path + "?offset=" + i;
//         var res = grab(dUrl);
//         var len = res.length;
//         var resArr = [];
//         for (var k = 0; k < len; k++){
//             resArr.push({
//                 description: res.results[k].description,
//                 datasetName: res.results[k].name
//             });
//         }
//         console.log(i);
//         count = results.count;       
//         out.push(resArr);
//     };
//     console.log("outer", out);
//     return out;
// };

Pearson.prototype.setDatasets = function() {
    // Arguments can be more than one comma delimited string. Whitespace is stripped.
    var args;
    var split;
    var stripped;

    var args = Array.prototype.slice.call(arguments);
        split = args.join(",");
        stripped = split.replace(/\s+/g,"");
        this.datasets = stripped;
    return this;
};


// fetches an item / article by the url provided on the results object.
Pearson.prototype.expandUrl = function(url) {
    'use strict';
    var itemUrl;
    var prepend = "http://api.pearson.com"
    if (typeof this.apikey === "undefined") {
        itemUrl = prepend + url 
    } else {
        itemUrl = prepend + url + "?" + this.apikey;
    };
    return itemUrl;
};


// Endpoint(s)
function Endpoint(pearson,path) {
    this.pearson = pearson;
    this.path = path;
};


Endpoint.prototype.setDatasets = function() {
    var args;
    var split;
    var stripped;

    var args = Array.prototype.slice.call(arguments);
        split = args.join(",");
        stripped = split.replace(/\s+/g,"");
        this.pearson.datasets = stripped;
    return this;
};


Endpoint.prototype.search = function(json, offset, limit){
    'use strict';
    var query;
    var fullUrl;

    json.limit = limit || 10;
    json.offset = offset || 0;

     if (typeof this.pearson.apikey === "undefined") {
        query = $.param(json);
        this.query = query;
     } else {
        json.apikey = this.pearson.apikey;
        query = $.param(json);
        this.query = query;
     };

     if (typeof this.pearson.datasets === "undefined"){
         fullUrl = this.pearson.url + this.path + "?" + query;
     } else {
        fullUrl = this.pearson.url + this.pearson.datasets + "/" + this.path + "?" + query;
     };
    return grab(fullUrl);
};

Endpoint.prototype.getById = function(Id) {
    'use strict';

    var fullUrl = this.pearson.url + this.path + "/"+Id;

    if (typeof this.pearson.apikey !== "undefined" && this.pearson.apikey != "") {
        fullUrl = fullUrl + "?apikey="+this.pearson.apikey
    }
    return grab(fullUrl);
};

// fetches an item / article by the url provided on the results object.
Endpoint.prototype.expandUrl = function(url) {
    'use strict';
    var itemUrl;
    var prepend = "http://api.pearson.com"
    if (typeof this.pearson.apikey === "undefined") {
        itemUrl = prepend + url 
    } else {
        itemUrl = prepend + url + "?" + this.pearson.apikey;
    };
    return itemUrl;
};

// Generic get me stuff from a url method
function grab(url) {
    var result;

    $.ajax({
        url: url,
        type: 'GET',
        timeout: 1000, // feel free to mod this 
        contentType: 'text/plain',
        xhrFields: {
            withCredentials: false
        },
        async: false,
        crossDomain: true,
        success: function (data) {
            result = data;
        },
        error: function (x, t, m) {
            if (t === 'timeout') {
                result = { status: 500, message:"Timeout error"};
            } else {
                console.warn(t);
            }
            result = jQuery.parseJSON(x.responseText);
        }

    });
    return result;

};
