// Pearson Top Ten Travel API wrapper. V0.9
// Base Url for API call http://api.pearson.com/v2/

/// BASE OBJECT
function Pearson(apikey) {
    'use strict';
    this.apikey = apikey;
    this.base = "http://api.pearson.com/v2/"
    console.log("HAL 9000 says don't work weekends Lawrie")
    return this;
};

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

function Endpoint(pearson,path) {
    this.pearson = pearson;
    this.path = path; //Set by the dot method??
};

Endpoint.prototype.getById = function(Id) {
    this.pearson.getById(this.path,Id)
    return this;
};

Endpoint.prototype.search = function(json, offset, limit) {
    this.pearson.search(json, offset, limit);
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

Pearson.prototype.getById = function(path,id) {
    console.log("Calling on ",path,id)
};


Endpoint.prototype.search = function(json, offset, limit){
    var query;

     limit = limit || 10;
     offset = offset || 0;

     json.limit = limit;
     json.offset = offset;

     if (typeof this.pearson.apikey === "undefined") {
        query = $.param(json);
        this.query = query;
     } else {
        json.apikey = this.pearson.apikey;
        query = $.param(json);
        this.query = query;
     };

     console.log(this);
     console.log(query);
     this.query = query;
     var ex = constructUrl(this);
     return ex;
};

// Bring me a specific result by Id from the list 
function getById(id) {////////// WIP 
    'use strict';
    var results;
    var z;
    if (typeof this.pearson.apikey === "undefined"){
        z = this.url;
        results = grab(z);
        } else { 
        z = this.url + "?" + this.pearson.apikey.substr(1);
         results = grab(z); 
    }
         return results;
};

// Build url inc search term - apikey addition is taken care of by search.
function constructUrl(obj) {
    var fullUrl;
    console.log("URL= ", obj);
    fullUrl = obj.pearson.url + obj.path + "?" + obj.query;

    // insert fetch method here
     grab(fullUrl);

     return result;

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














