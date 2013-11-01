A short set of notes for the Pearson Food and Drink API.
================================================

#### Pearson Food and Drink API Endpoint:

To set the API call to Food And Drink, just pass in 'foodanddrink':  

From a base URL of: http://api.pearson.com/v2/foodanddrink

The following endpoints are available:  
* recipes

So setting:  
```Javascript
var yourVar = new Pearson('apikey').api('foodanddrink').addEndpoint('recipes');  
```
Will let you access all of the API. (and is required!)


#### Parameters for the query string  

Params 'offset' and 'limit' as integers to offset into the available data or limit the number of results.  

There are a few convenience methods available for this API.  
After the $.fetch, when you have some results:

```javascript
yourResults.getRecipeNames(); // Will return the recipe title and corresponding ID from the results array.  

yourResults.getRecipeFromName(num); // Where num is the index of the recipe in the above array, this will return that complete recipe object.  

yourResults.getRecipeById(id); // Where id is the numerical id of the recipe from the results array, this will return the complete recipe object.  
```







