## Pearson Travel API

This document describes how to use the Pearson SDK to access the Travel API. For further details of this API and it's usage, please see [Pearson Travel API](http://developer.pearson.com/apis/topten-travel-guides/).

### Accessing the Travel API
Start by connecting to the Travel API object provided by the Pearson SDK (see example below). 
```Javascript
var dict = PearsonApis.travel("apikey");
```

where the _apikey_ is your key to access the Pearson Travel API. 

If no key is specified, or the key is a 'sandbox' key, then you will be limitied to searching and retrieving from only a subset of the data available in the Travel API.

### Travel API Endpoints

#### Topten, Streetsmart, Around Town and Places

In order to search or retrieve 'topten' style documents from the Travel API, you need to use one of the following endpoint objects that the API provides:

```Javascript
var travel = PearsonApis.travel(my_apikey);
var topten = travel.topten;
var streetsmart = travel.streetsmart;
var around_town = travel.around_town;
var places = travel.places;
```
These endpoints provide access to search for, and retrieve, documents from the Travel API.

### Searching 
```
topten.search(searchobj,offset,limit)
```
Searches the Travel API (use appropriate endpoint to search for documents other than 'topten'). The ```searchobj``` should be a JSON object containing one or more of the following proprerties used to direct the search results:

* search - (string) Generic search across all fields on documtent in Travel API. 
* category - (string) Search for specific categories of document (only available for _places_ endpoint).
* lat - (float) GeoSearch based on latitude.
* lon - (float) GeoSearch based on longitude.
* dist - (int) GeoSearch within the given radius (in meters)

_offset_ and _limit_ are optional zero-based indexes into the results returned, and can be used for paging through results. _limit_ defaults to 10, and has a maximum value of 25. An _offset_ greater than total number of results available will cause the return of zero results.

An example of a search *might* be as follows:
```
var searchobj = { search: "(+castle -hotel)",
                  lat: 40.75783,
                  lon: -73.98453
                  dist: 500
                };

var results = places.search(searchobj,0,25);
```

### Retrieving an Entry
Use the _getById_ method on the endpoints to retrieve the full detail of a specific entry.
```
var result = topten.getById(id)
```
where _id_ is the Id of the document you wish to retrieve.

### Limiting Search to Specific Travel Datasets
You can limit the search of the Travel API to spefic _datasets_ prior to searching.
```
places.setDsets("tt_dublin,tt_newyor");
places.search(searchobj);
```
This will ensure that only the specified travel datasets are searched. 

### Listing Datasets Available
There are almost 90 different datasets in the Travel API. A list of of available dataset names and a description of the area they cover, can be obtained by using the ```datasets``` endpoint.
```
var results = travel.dataset().search()
```



