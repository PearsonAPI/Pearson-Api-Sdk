// Pearson Top Ten Travel API wrapper. V0.9
// Base Url for API call http://api.pearson.com/v2/

/// BASE OBJECT
function Pearson(apikey) {
    'use strict';
    this.apikey = apikey;
    this.base = "http://api.pearson.com/v2/"
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

Pearson.prototype.search = function(json, offset, limit ) {
    var query;

     limit = limit || 10;
     offset = offset || 0;

     json.limit = limit;
     json.offset = offset;

     if (typeof this.apikey === "undefined") {
        query = $.param(json);
        return query;
     } else {
        json.apikey = this.apikey;
        query = $.param(json);
        return query;
     };

     console.log(this);
     console.log(query);
     this.query = query;
     return this;
};

function constructUrl(obj) {

};