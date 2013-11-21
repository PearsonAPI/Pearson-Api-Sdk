var PearsonApis = (function() {
// Base Url for API call http://api.pearson.com/v2/

var Apis = {
    dictionaries: function(apikey) { 
        return new Pearson(apikey).dictionaries(); 
    },
    travel: function(apikey) { 
        return new Pearson(apikey).travel(); 
    },
    foodanddrink: function(apikey) {
        return new Pearson(apikey).foodanddrink();
    },
    ftarticles: function(apikey) {
        return new Pearson(apikey).ftarticles();
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
    this.api = "ft";
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
    this.dataset = new Endpoint(this, "datasets");
    this.categories = new Endpoint(this, "categories");
    return this;

};

Pearson.prototype.setDatasets = function() {
    // Arguments can be more than one comma delimited string. Whitespace is stripped.
    var args;
    var split;
    var stripped;

    var args = Array.prototype.slice.call(arguments);
    split = args.join(",");
    stripped = split.replace(/\s+/g,"");
    this.dsets = stripped;
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
        itemUrl = prepend + url + "?apikey=" + this.apikey;
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
    this.pearson.dsets = stripped;
    return this;
};


Endpoint.prototype.search = function(json, offset, limit){
    'use strict';
    var query;
    var fullUrl;

    if (typeof json === 'undefined') {
        json = {}
    }

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

    if (typeof this.pearson.dsets === "undefined" || this.pearson.dsets == ""){
     fullUrl = this.pearson.url + this.path + "?" + query;
    } else {
    fullUrl = this.pearson.url + this.pearson.dsets + "/" + this.path + "?" + query;
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
        itemUrl = prepend + url + "?apikey=" + this.pearson.apikey;
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
        dataType: "json",
        async: false,
        crossDomain: true,
        success: function (data) {
            result = data;
        },
        error: function (x, t, m) {
            if (t === 'timeout') {
                result = { status: 500, message:"Timeout error"};
            } else {
                result = x.responseText;
            }
        }
    });
    return result;

};
return Apis;
}());