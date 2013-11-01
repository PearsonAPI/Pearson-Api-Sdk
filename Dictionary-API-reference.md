Searching with the Dictionary API
=================================

### Accessing the Dictionaries API
```Javascript
var dict = Apis.dictionary(apikey);
```
where the apikey is you key to access the dictionaries API. If no key is specified,
or the key is a 'sandbox' key, then you will be limitied to searching and retrieving 
from only a subset of the data available in the dictionaries API (generally, this is
words begining 'a' to 'c').

### Searching for entries

```Javascript
var query = { headword: "cat" }
var dict = Apis.dictionary(apikey);
var entries = dict.entries;
results = entries.search(query)
```
### Retriving a full entry

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


