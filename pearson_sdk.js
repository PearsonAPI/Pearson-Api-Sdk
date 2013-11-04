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
    console.log("HAL 9000 says don't work weekends Lawrie")
    return this;
};

Pearson.prototype.dictionaries = function() {
    'use strict';
    this.api = "dictionaries";
    this.url = this.base + this.api + "/";
    this.entries = new Endpoint(this,"entries");
    return this;
};

Pearson.prototype.travel = function() {
    'use strict';
    this.api = "travel";
    this.url = this.base + this.api + "/";

};

// Endpoint(s)
function Endpoint(pearson,path) {
    this.pearson = pearson;
    this.path = path; //Set by the dot method??
};

Endpoint.prototype.getById = function(Id) {
    this.pearson.getById(this.path,Id)
    return this;
};

Endpoint.prototype.search = function(json, offset, limit){
    var query;

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

     var fullUrl = this.pearson.url + this.path + "?" + query;

    return grab(fullUrl);
};

Endpoint.prototype.getById = function(Id) {
    'use strict';

    var fullUrl = this.pearson.url + this.path + "/"+Id;

    if (typeof this.pearson.apikey === "undefined") {
        fullUrl = fullUrl + "?apikey="+this.pearson.apikey
    }
    return grab(fullUrl);
};

// Generic get me stuff from a url method
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














