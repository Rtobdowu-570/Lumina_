/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4017517911")

  // update collection data
  unmarshal({
    "viewRule": "user = @request.auth.id"
  }, collection)

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "bool3021881060",
    "name": "sucessful",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "bool2659951479",
    "name": "failed",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4017517911")

  // update collection data
  unmarshal({
    "viewRule": ""
  }, collection)

  // remove field
  collection.fields.removeById("bool3021881060")

  // remove field
  collection.fields.removeById("bool2659951479")

  return app.save(collection)
})
