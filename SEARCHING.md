### Searching

### The ```search``` object

All endpoints that provide search do so by taking a ```search``` object containing the query _terms_ to use for the search. This is a simple Javascript object, that should contain properties that match the search options available for the individual APIs.
```
var search = { name: '(+andrew -gavin)',
               sex: 'male' 
             };
```
You should read the documentation for each individual API to see what valid properties are available for a _search_ object.

### Search Results
Search results are returned as a Javascript object containing the following properties to determine, and naviagte, through the results:

* offset - offset into the results collection (specified during search)
* limit - limit of results in collection (specified during search)
* count - number of results returned 
* total - total number of results available
* results - an array of the results returned (maximum of _count_ results)

If there are more results available, then a search can be called multiple times, adjusting the _offset_ and _limit_ parameters, to page through the available results.

### General Search Syntax

Search is based on full-text searching, and the results of a search are returned based on the _relevance_ of any document to the search _term_ (or _terms_) used. Searching is very flexible, but here are a few pointers to try and get the most out of the API.

#### Simple searching

The simplest type of search is to simply enter a single _term_ to search for. For example, the _term_ ```fish``` would find all documents that match the _term_ _fish_. 

#### Search for full match
Enclosing a search _term_ is double quotes (```""```) can be used to force a search on a full term (including spaces). For example, to search for 'cheshire cat', you would use: ```"cheshire cat"```

#### Wildcard searching
Search _terms_ may include simple wildcard charaters (```?``` and ```*```). For example, ```cat*```, ```f?sh``` or ```*dog```

#### Searching for multiple terms
It is possible to search for multiple _terms_ by enclosing the _terms_ in parentheses. A search _term_ of ```
(hello world)``` would find all documents with _hello_ and _world_. However, sometimes, you may want to limit or enforce specific _terms_ in the search. You can use special prefixes on a _term_ to determine whether it must be included (prefix with '+'), must be excluded (prefix with '-') or whether the presence of the _term_ is optional (but will increase the search relevance if it exists). 
```
(+fox -dog cat)
```
(must include ```fox```, must not include ```dog``` and may include ```cat```)


