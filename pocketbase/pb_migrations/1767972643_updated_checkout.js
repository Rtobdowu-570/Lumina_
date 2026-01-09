/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4017517911")

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "bool3021881060",
    "name": "successful",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4017517911")

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "bool3021881060",
    "name": "sucessful",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
})
