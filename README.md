# JoinTheMesh.Net

This website aims to help people learn about and join mesh networking organizations near them.

# Contributing

Add additional meshes in `data/meshes.json`.

Each entry should contain:
1. Name of the mesh organization
2. A homepage url
3. 1 or more locations

Each location should contain:
1. Location name (generally city/state)
2. A US Zip code or coordinates

Each location should represent an area that the organization has a presence in. The location closest to the user will be displayed to the user in location based searches. Large areas may be either split up into multiple locations with distinct names (by including neighborhood for example), or represented by a set of locations with the same name. Doing so will ensure the user sees an accurate distance between them and the nearest presence of the mesh organization.

## Examples

For example, a mesh with multiple points of presence defined by zip codes may look like this:

```
"Our Mesh": {
  "url": "https://example.com/",
  "locations": [{
    "name": "Austin, TX",
    "zip": "78701"
  }, {
    "name": "Houston, TX",
    "zip": "77002"
  }]
}
```

Alternatively, exact coordinates may be used instead. This is useful if the location is outside the US or not well represented by the coordinates associated with the zip code:

```
"Our Mesh": {
  "url": "https://example.com/",
  "locations": [{
    "name": "Oakland, CA",
    "lat": "37.804387",
    "lon": "-122.271064"
  }, {
    "name": "Sacramento, CA",
    "lat": "38.581589",
    "lon": "-121.494399"
  }]
}
```

Finally, for large areas, you may define multiple locations with the same name in order to keep the displayed distance down for users that may be located anywhere within these regions:

```
"Our Mesh": {
  "url": "https://example.com/",
  "locations": [{
    "name": "Philadelphia, PA",
    "zip": "19114"
  }, {
    "name": "Philadelphia, PA",
    "zip": "19114"
  }, {
    "name": "Philadelphia, PA",
    "zip": "19107"
  }]
}
```

Please order meshes alphabetically by name.
