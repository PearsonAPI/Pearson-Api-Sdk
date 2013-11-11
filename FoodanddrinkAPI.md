## Pearson Food and Drink API

This document describes how to use the Pearson SDK to access the Food and Drink API. For further details of this API and it's usage, please see [Pearson Food And Drink API](http://developer.pearson.com/apis/food-drink/).

### Accessing the Food and Drink API  
Start by connecting to the Food and Drink API object provided by the SDK: 
```Javascript
var food = PearsonApis.foodanddrink("apikey");
//where apikey is the key to access the Pearson Food and Drink API
```

If no key is specified, or is a 'sandbox' key, searches will return a limited subset of information.  

#### Endpoint: recipes  
The only endpoint for the Food and Drink API is 'recipes':

```Javascript
var food = PearsonApis.foodanddrink("apikey");
var recipes = food.recipes
```

### Searching
```Javascript
recipes.search(searchobj, offset, limit);
```

This searches the API for the search terms present in the 'searchobj'. This should be a JSON object containing properties to direct the search results:  

* search - (string) Searches across all fields for the specified string.  
* offset / limit - (integer with defaults of 0 and 10)   

_offset_ and _limit_ are optional zero-based indexes into the results returned, and can be used for paging through results. _limit_ defaults to 10, and has a maximum value of 25. An _offset_ greater than total number of results available will cause the return of zero results.  

One search example could be:  
```Javascript
var searchobj = { search: "chicken" }

var results = recipes.search(searchobj, 0, 20);
```

You can also retrieve a recipe by ID by using the getById method:  
```Javascript
var result = recipes.getById(id);
// where id is the id of the recipe you wish to retrieve
```

