A Javascript Client Library for the Pearson API. (requires jQuery)
===================================================================

### Setting up API and client details.
Make sure you have included jQuery and sdk.js ...

As standard the base url that the client adds to is:

```
http://api.pearson.com/v2/
```

Create your own object to work with and add your API key as a string:
```javascript
var yourVar = new Pearson("yourAPIkeyHere");
//For some of the Apis, not supplying a key will grant you limited sandbox access
```
Register at the [Pearson Developer Portal](http://developer.pearson.com) for a key.

### Adding parameters to your request.

First select the API you want to use by calling the api name as a method.
For these examples this will be the Top 10 Guides, which is accessed via the key/method 'travel'.
```javascript
yourVar.travel();
// i.e For dictionaries it would be .dictionaries();
```
This will connect you to your desired API and make available the appropriate endpoint methods.

You can specify a dataset to work in. A dataset is a representation of set of subject matter (i.e a book or place).

A list can be found by calling:
```javascript
yourVar.travel().listDatasets();
//if you know a dataset (or more than one) you can add them to your object  
yourVar.addDatasets("first", "second", "third");
// NB you can have as many as you like, but they must be passed in as strings separated with a comma as above.
```

You can add an endpoint (usually a subset of information) by calling the endpoint name as a method.
```javascript
// In this example we are using the 'Top Ten' endpoint
yourVar.topten();
Also available for travel and endpoints streetsmart, aroundTown and places.
```
And if you have the ID of the article you want, add an endpoint and fetch by id:
```javascript
yourVar.getById('ID');
// This will bring back the full single article.
```
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
var yourData = yourVar.fetch();  
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





