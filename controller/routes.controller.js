
const router = require("express").Router();
// access our DB
const db = require("../helpers/blog.json");
// FS (file system)
const fs = require("fs");




// Practice Get Route
router.get("/hello-world", (req, res) => {
    res.send("Hello world");
  });

router.get("/post_id", (req, res) => {
   
    try {
      // Use object destructuring so id is equal to our /#, /:id, id = 1, id = 2
      let { id } = req.params;
      let results = db.filter((i) => i.id == id);
      //console.log("Results:", results);
  
      res.status(200).json({
        status: `Found item at id: ${id}`,
        results,
      });
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  });
  
  // To do- build a route to GET all items in the "db"
  router.get("/", (req, res) => {
    try {
      res.status(200).json({
        results: db,
      });
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  });
  
  // To do- build a route POST a new to do list item
  router.post("/", (req, res) => {
    try {
      // We want to grab data from the req body (via Postman), console log
      const blogItem = req.body;
      //console.log(blogItem);
  
      // 1. The path needs to be be relative to where fs is located (node_modules), NOT from the controllers location.
      //                  1
      fs.readFile("./helpers/blog.json", (err, data) => {
        // quick conditional to deal with any error it comes across
        if (err) throw err;
  
        const db = JSON.parse(data);
  
        // push the object to our array.
        db.push(blogItem);
  
        // Write to our JSON file
        fs.writeFile("./helpers/blog.json", JSON.stringify(db), (err) =>
          console.log(err)
        );
       
        res.status(200).json({
          status: "New item added to DB!",
          blogItem,
        });
      });
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  });
  
  //* PUT
  
  router.put("/post_id", (req, res) => {
    try {
  
  
      const id = Number(req.params.id);
     
  
      // The new values coming in with/via the request
      const todo = req.body;
  
      fs.readFile("./helpers/blog.json", (err, data) => {
        // All the logic I want to build after fs reads the json
        if (err) throw err;
  
        const db = JSON.parse(data);
  
        // declare a result var to assign to later
        let result;
  
        // Using forEach method to find and then replace the item that matches the param id
        db.forEach((e, i) => {
          console.log(e, i);
  
          // If the object/item's id match the param, we do something
          if (e.id === id) {
            // assign the object to todo(req.body)
            db[i] = todo;
            // Reassign/assign result var the todo var as well (so the response has what the new object content is)
            result = todo;
  
            fs.writeFile("./helpers/blog.json", JSON.stringify(db), (err) =>
              console.log(err)
            );
          }
        });
  
        result
          ? res.status(200).json({
              status: `ID: ${id} was successfully updated.`,
              object: result,
            })
          : res.status(404).json({ status: `ID: ${id} was not found.` });
      });
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  });
//* DELETE 

  router.delete("/post_id", (req, res) => {
    try {
      const id = Number(req.params.id);
  
      fs.readFile("./helpers/blog.json", (err, data) => {
        if (err) throw err;
  
        const db = JSON.parse(data);
  
        // declare a var that does all the sorting/filtering logic.
        const filteredDB = db.filter((e) => {
          // we want to check for the id... and return only what doesn't match
          if (e.id !== id) {
            return e;
          }
        });
  
        fs.writeFile("./helpers/blog.json", JSON.stringify(filteredDB), (err) =>
          console.log(err)
        );
  
        res.status(200).json({
          status: `ID: ${id} was successfully deleted.`,
        });
      });
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  });

  


// Exporting the router, gives the file/functionality to other files, makes the contents accessible in other places.
module.exports = router;