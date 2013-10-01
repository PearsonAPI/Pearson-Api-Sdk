A short set of notes for the Pearson Travel API.
================================================

#### Pearson TopTen Travel Api Endpoints:

From a base URL of: http://api.pearson.com/v2/travel  
The following enpoints are available:  
* categories  
* datasets  
* topten  
* streetsmart  
* aroundtown  
* places  

Giving http://api.pearson.com/v2/travel/topten etc

The following can then fetch an article by id : topten, streetsmart, aroundtown and places. 
 /travel/topten/articleid?apikey=

If you have a specific dataset to work in (for instance 'tt_newyor' for New York) the following endpoints can be prepended with the dataset to work in:  

topten, streetsmart, aroundtown and places
/travel/dataset/topten  

#### Parameters for the query string  

Endpoints - categories and datasets can take 'offset' and 'limit' as integers to offset into the available data or limit the number of results.  

If not taking an id -  topten, streetsmart, aroundtown and places can take the following query parameters:  
* offset  
* limit  
* search - search terms as a string.  
* lat - latitude as a float.  
* lon - longitude as a float.  
* dist - Geosearch distance radius in meters as an integer.

The query string is order agnostic and must contain an api key.






