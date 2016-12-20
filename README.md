# nearby-news
Keyword Cloud for your current location.

A prototype system. NCNU BigData lecture project.

## Data collecting:

1. Parse article from news site. Extract data.
2. Lookup it's location (x, y)
3. Import to DB (RethinkDB)
4. Build geospatial index (RethinkDB or Redis)

## User Stream:

1. Locate user (GPS, map center)
2. Get radius (map size)
3. Send location to server, get unsorted array of Entries { [Keywords], timestamp, source, etc}
4. Build and show Keyword Cloud on map.
5. Repeat.


## Docs:
- Diags https://cacoo.com/diagrams/zFHADLJOpHNowcYL#65F5B
- Wireframe https://invis.io/VT9M4KO7R
- Slide https://docs.google.com/presentation/d/1Il1CRVJDEXHyQfRYY71MkgUOekWvhwQLN_WfsOYOKOk/edit?usp=sharing
- Sample data https://docs.google.com/spreadsheets/d/1xcu-0PaMgywk60JRi_6ES6v6BCxXzDrWxwyNP05OKIw/edit?usp=sharing
