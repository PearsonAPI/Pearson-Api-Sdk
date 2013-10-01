A Javascript Client Library for the Pearson API. (requires jQuery)
===================================================================

### Setting up API and client details.

As standard the base url that the client adds to is:

```
http://api.pearson.com/v2/
```

Create your own object to work with and add your API key as a string:
```javascript
var yourVar = new Pearson("yourAPIkeyHere");
```
Register at the [Pearson Developer Portal](http://developer.pearson.com) for a key.

### Adding parameters to your request.

First select the API you want to use. 
For these examples this will be the Top 10 Guides, which is accessed via the key 'travel'.
```javascript
yourVar.api('travel');
```
This will connect you to your desired API.

You can specify a dataset to work in. A dataset is a representation of set of subject matter (i.e a book or place).

A list can be found by calling:
```javascript
yourVar.api('travel').listDatasets();
```
NB: This effectively sets the endpoint to 'datasets'.


You can add an endpoint (usually a subset of information)
```javascript
yourVar.addEndpoint('endpoint');
```
And if you have the ID of the article you want, add an endpoint and fetch by id:
```javascript
yourVar.addEndpoint('endpoint').getArticleById('ID');
```
Endpoints for the Travel API are : topten, streetsmart, around_town and places.
More information can be found at the [Developer portal API](http://developer.pearson.com/apis/topten-travel-guides/).

You can add limit and offset parameters to the request to move through the collection:
```javascript
yourVar.addParams({ limit: integer, offset: integer });
```

You can also add search terms to the query string:
```javascript
yourVar.addSearch("string here");
```

If you have the geolocation you want to search from:
```javascript
yourVar.addPosition(latitude, longitude, distanceInMeters);
```


#### Build your url and call the API:  
Pass your api object to the fetch method
```javascript
var yourData = $.fetch(yourVar);  
```

This will return results wrapped in an 'AjaxContent' object.   

### Methods to manipulate results.

Is you want the complete JSON response, you can call the raw method on the returned object:  
```javascript
yourData.raw(); = // original server response
```

There are some methods to help extracting specifics and iterating through collections:
```javascript
yourData.getUrl(); = // Returns the api url if all results  
yourData.introText(); = // Returns article introductory text if available
```

And for getting individual entries:  
```javascript
yourData.getResultUrl(num); //where num is the index in the returned array.
yourData.getArticleObject(num); //for a specified result fetch the entire article object from the API.
```

If you have a lot of results, the nextSet method will advance through the collection:
```javascript
secondSetofResults = yourData.nextSet(); // will advance by whatever the parameter 'limit' is.
thirdSetofResults = secondSetOfResults.nextSet();
```




```javascript
var example = new Pearson('yourApiKey');
example.api('travel'); //selects the travek api
example.addEndpoint('topten');
example.addParams({offset:0, limit: 20});
example.addSearch('ancient churches');
var results = $.fetch(example);
```

```javascript
//Methods can also be chained:
var travel = new Pearson('yourApiKey');
travel.api('travel').addEndpoint('topten').addParams({limit: 20}).addSearch('restaurant');
var moreResults = $.fetch(travel);
```




