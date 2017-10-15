var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
 
  user: "root",

  password: "",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  customerPrompt();
});

function customerPrompt() {

  console.log("\n=========== CURRENT INVENTORY ===========\n");
  console.log("ID" + "\t" + "PRODUCT" + "\t\t" + "PRICE");

  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;

    for (var i = 0; i < results.length; i++) {
      console.log(results[i].id + "\t" + results[i].product_name + "\t\t" + "$" + results[i].price + ".00");
    }
    console.log("\n\n============ ADD TO CART ============\n");
    inquirer
      .prompt([{
        name: "item",
        type: "input",
        message: "Enter the ID for the item you would like to purchase:"
      },
      {
        name: "quantity",
        type: "input",
        message: "Enter quanity of product to purchase:"
      }])
      .then(function(answer) {
      
        connection.query("SELECT * FROM products WHERE id=?", [answer.item], function(err, res) {

          if (answer.quantity > res[0].stock_quantity) {
            console.log("Sorry! We don't have that much of your selected product!");
            customerPrompt();
          } else {
            var cost = (results[0].price*answer.quantity);
            console.log("\n\n============ CART ============\n");
            console.log("PRODUCT" + "\t\tPRICE" + "\t\tQUANTITY");
            console.log(res[0].product_name + "\t\t$" + results[0].price + ".00" + "\t\tx " + answer.quantity);
            console.log("\n==TOTAL:\t" + "$" + cost + ".00");

            inquirer
              .prompt([{
                name: "purchase",
                type: "confirm",
                message: "\tSUBMIT ORDER?"
              }])
              .then(function(answer) {
                  
                  if (answer.purchase === true) {
                    console.log("\n\n============ ORDER PROCESSED ============\n");
                    console.log("Your card on file has been charged $" + cost + ".00");
                    console.log("Your item(s) will arrive in 3 to 4 days. Thank you for shopping with Bamazon!");
                    customerPrompt();
                  } else {
                    customerPrompt();
                  }

              });
            }

        });
    });
  });
}
