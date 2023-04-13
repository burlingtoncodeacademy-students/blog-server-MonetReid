const router = require("express").Router();

router.post("/blog", (req, res) => {


  try {
    // Dive into the req body and assign values to variables, object destructuring
    const { firstName, lastName, date, content } = req.body;

    res.status(200).send({
      fullName: `${firstName} ${lastName}`,
      date: date,
      content: content,
    });
  } catch (err) {
    res
      .status(500)
      .send(`<img src="https://http.cat/500" alt="Status code 500"/> `);
  }
});


  //Use the URL of the page to query something and get a response
 // This has particular syntax(symbols)
router.get("/query/", (req, res) => {

  try {
    const { firstName, lastName, date, content }  = req.query;

    res.status(200).json({
      status: "New blog created!",
      results: {
        first: firstName,
        last: lastName,
        date: date,
        content: content,
      },
    });
  } catch (err) {
    res.status(500).json({
      results: "Rejected",
      error: err,
    });
  }
});

module.exports = router;