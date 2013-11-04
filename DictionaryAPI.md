Searching with the Dictionary API
=================================

### Accessing the Dictionaries API
Start be connecting to the Dictionaries API object provided by the Pearson SDK (see example below). You can connect as many times as you like, and specifiy different api keys each time you call ....
```Javascript
var dict = Apis.dictionary(apikey);
```

where the _apikey_ is you key to access the Pearson Dictionaries API. 

If no key is specified, or the key is a 'sandbox' key, then you will be limitied to searching and retrieving from only a subset of the data available in the dictionaries API (generally, this is
words begining 'a' to 'c').

### Using the SDK to access Dictionary entries

In order to search or retrieve entries from the Dictionaries API, you need to use the 'entries' object
that the API provides. 

```Javascript
var dict = Apis.dicitonary(my_apikey);
var entries = dict.entries;
```

The entires object coresponds to the ```http://api.pearson.com/v2/dictionaries/entries``` endpoint on the HTTP API, and from here you can search for, or retrieve, dictionary _entries_.

```Javascript
var dict = Apis.dictionary(apikey);
var entries = dict.entries;
var query = { headword: "cat" }

results = entries.search(query)
```

### Retriving a full entry
Once you have a suitable _Id_ for an entry from the Dicitionaries API, you can load the complete content of the _entry_ by calling the ```entries.getById(id)``` method provided by the API.

```Javascript
var id = "an_entry_id";
var dict = Apis.dictionary(apikey);
var entries = dict.entries;
results = entries.getById(id);
```

### General Search Syntax

Search is based on full-text searching, and is fairly flexible on how you may search 
for entries in the dictionaries API. 

#### Simple searching

The simplest type of search is to 
#### Searching for multiple terms
#### Wildcard searching
#### Fuzzy searching

### Search Properties

The Dictionaries API is searched by passing a suitable JSON object to a search 
endpoint. This allows for one or more search terms to be added to a query, and
get the results returned by passing to  

```Javascipt
var query = { 
               headword: "",
               related_words: "",
               synonyms: "",
               phrasal_verbs: "",
               part_of_speech: "",
               images: "",
               audio: "",
               search: ""
               }
```


#### headword
Search dictionary entries based on the +headword+ for the entry. 
#### related_words
#### synonyms
#### phrasal_verbs
#### part_of_speech
#### images
#### audio
#### search


