const SneaksAPI = require('../controllers/sneaks.controllers.js');
const sneaks = new SneaksAPI();
// const cors = require('cors');

// Enable CORS for all origins
// app.use(cors());
const filterKeywords = ['fleece', 'jacket', 'backpack', 'hood', 'head','sunglasses', 'glasses', 'bag', 'Louis Vuitton', 'Jersey']; 
module.exports = (app) => {
    // app.use(function (req, res, next) {
    //     res.header("Access-Control-Allow-Origin", "*");
    //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //     next();
    // });
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "https://main.d31klvnycdhqs9.amplifyapp.com");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    //Grabs sneaker info from the database given the styleID
    app.get('/id/:id', function(req, res){
        sneaks.findOne(req.params.id, function(error, shoe){
            if (error) {
                res.send("Product Not Found");
              } else {
                res.json(shoe);
              }
        })
    });

    //Grabs price maps from each site of a particular shoe
    app.get('/id/:id/prices', function(req, res){
        sneaks.getProductPrices(req.params.id.toUpperCase(), function(error, products){
            if (error) {
                console.log(error)
                res.send("Product Not Found");
              } else {
                res.json(products);
              }
        })
    });

    //grabs the most popular sneakers 
    app.get('/home', function(req, res){
        const count = req.query.count || 40 // if the user doesn't provide the query param, it defaults to 40
        sneaks.getMostPopular(count, function(error, products){
            if (error) {
                console.log(error)
                res.send("Product Not Found");
              } else {
                res.json(products);
              }
        })
        // sneaks.getMostPopular(12, (err, products) => {
        //   if (err) {
        //       return res.status(500).json({ error: err.message });
        //   }
  
        //   // Filter products to exclude those with names containing the keywords
        //   const filteredProducts = products.filter(product => {
        //       return !filterKeywords.some(keyword => 
        //           product.shoeName.toLowerCase().includes(keyword.toLowerCase())
        //       );
        //   });
  
        //   res.json(filteredProducts);
        // });
    });

    //Grabs all sneakers given a keyword/parameter
    app.get('/search/:shoe', function(req, res){
        const count = req.query.count || 40 // if the user doesn't provide the query param, it defaults to 40
        sneaks.getProducts(req.params.shoe, count, function(error, products){
            if (error) {
                console.log(error)
                res.send("Product Not Found");
              } else {
                res.json(products);
              }
        })
    });
//Grabs all sneakers in the database
    app.get('/shoes', function(req, res){
        sneaks.findAll( function(error, products){
            if (error) {
                console.log(error)
                res.send("No Products In Database");
              } else {
                res.json(products);
              }
        })
    });

    //redirects root route to home page
    app.get('/', function (req, res) {
        res.redirect('/home')
    });

}