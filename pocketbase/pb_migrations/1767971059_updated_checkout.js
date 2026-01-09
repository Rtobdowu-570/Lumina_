/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4017517911")

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "bool1663731225",
    "name": "delivered",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "bool1576173484",
    "name": "shipped",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4017517911")

  // remove field
  collection.fields.removeById("bool1663731225")

  // remove field
  collection.fields.removeById("bool1576173484")

  return app.save(collection)
})
