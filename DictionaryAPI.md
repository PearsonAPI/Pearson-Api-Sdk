## Pearson Dictionaries API

This document describes how to use the Pearson SDK to access the Dictionaries API. For further details of this API and it's usage, please see [Pearson Dictionaries API](http://developer.pearson.com/apis/dictionaries).

### Accessing the Dictionaries API
Start be connecting to the Dictionaries API object provided by the Pearson SDK (see example below). 
```Javascript
var dict = PearsonApis.dictionaries(apikey);
```

where the _apikey_ is you key to access the Pearson Dictionaries API. 

If no key is specified, or the key is a 'sandbox' key, then you will be limitied to searching and retrieving from only a subset of the data available in the dictionaries API (generally, this is
words begining 'a' to 'c').

### Dictionary API Endpoints

#### Entries

In order to search or retrieve entries from the Dictionaries API, you need to use the 'entries' object
that the API provides. 

```Javascript
var dict = PearsonApis.dicitonary(my_apikey);
var entries = dict.entries;
```

The ```entries``` endpoint provides methods to _search_ for and _retrieve_ entries from the Dictionaries API.

### Searching for Entries
```
entries.search(searchobj,offset,limit)
```
Searches the dictionaries API. The ```searchobj``` should be a JSON object containing one or more of the following proprerties used to direct the search results:

* headword - (string) search for entries with matching _headword_.
* related_words - (string) search for entries woth with matching _related_words_.
* synonyms - (string) search for entries with matching _synonyms_.
* phrasal_verbs - (string) search for entries with matching _phrasal_verbs_.
* part_of_speech - (string) search for entries with containing matching _part_of_speech_.
* images - (string) search for entries with matching _images_ (note that only _picture_ is currently supported).
* audio - (string) search for entries with matching _audio_ (note that only _example_, _pronunciation_ and _effect_ are currently supported).
* search - (string) Generic search across all fields on an entry in the dictionary. 

_offset_ and _limit_ are optional zero-based indexes into the results returned, and can be used for paging through results. _limit_ defaults to 10, and has a maximum value of 25. An _offset_ greater than total number of results available will cause the return of zero results.

An example of a search *might* be as follows:
```
var searchobj = { headword: "(+cat -fish)",
                  images: "picture",
                  audio: "pronunciation"};

var results = entries.search(searchobj,0,25);
```

### Retrieving an Entry
Use the _getById_ method on the _entries_ endpoint to retrieve the full detail of a specific entry.
```
var result = entries.getById(id)
```
where _id_ is the Id of the entry you wish to retrieve.

### Limiting Search to Specific Dictionaries
You can limit the search of the Dictionaries API to spefic _datasets_ prior to searching.
```
entries.setDsets("ldoce5,lasde");
entries.search(searchobj);
```
This will ensure that only the specified dictionaries are searched. The _datasets_ should be specified as a comma-delimited string of one or more of the following allowable _datasets_:

* ldoce5 - Longman Dictionary of Contemporary English
* lasde - Longman Active Study Guide
* ldec - Longman English Chinese dictionary
* wordwise - Longman WordWise dictionary



