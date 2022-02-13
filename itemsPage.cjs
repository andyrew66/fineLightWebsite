
var axios = require("axios")
var express = require('express')
var router = express.Router()
require('dotenv').config();
var fs = require('fs')
const APIKEY = process.env.APIKEY



router.get('/stock', async function(req,res){
    var config = {
        method: 'get',
        url: 'https://finelight-tcg.myshopify.com/admin/api/2021-07/products.json',
        headers: { 
          'Authorization': APIKEY 
        }
      };
      let individualItems = ''
      let items = await axios(config)
      .then(function (response) {
       return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

     

      items.products.forEach(element => {
        
        let image = '';
        if(element.image === null){
            image = './Images/NoImage.jpg'
        } else {image = element.image.src};
        individualItems = individualItems.concat(`<div id = "Product">
        <div id = "image"><img src="${image}" width="200" height ="200" alt="image for ${element.title}"></img></div><p>
        <div id = text><div id = "title"><h3> ${element.title} </h3> </div>
        
        <div id = "quantity"> Quantity in stock: ${element.variants[0].inventory_quantity}<p>
        <b>${element.status.toUpperCase()}</b><p>
        <form method="post" action ="./stock/item">
        <input type ="hidden" name = "image" value = "${image}">
        <input type="hidden" name="id" value = "${element.id}">
        <input type="submit" value = "Edit Item">
        </form>
        </div>
        </div>
        
        </div>`);
        
      });
      res.render('index.spy',{items : individualItems});
});

router.post('/stock/item', async function(req, res){
let itemCode = req.body.id
console.log(req.body.image);
let url = 'https://finelight-tcg.myshopify.com/admin/api/2021-07/products/' + itemCode + '.json'
var config = {
    method: 'get',
    url: url,
    headers: { 
      'Authorization': APIKEY
    }
  };
  
  let product = await axios(config)
  .then(function (response) {
    return response.data.product
  })
  .catch(function (error) {
    console.log(error);
  });

console.log(product.variants[1]);
let title = product.title;
let vendor = product.vendor;
let description = product.body_html;
let productType = product.product_type;
let status = product.status;
let tags = product.tags;

let image = ''
let select1 = ''
let select2 = ''
let variants = '<H1> Product Variants </H1> <p>'
product.variants.forEach(element => {
    variants = variants.concat(
      `<div><h2> Varient title: ${element.title}</h2>
      <label for="${element.id}price">Price £</label>
      <input type="number" id = "${element.id}price"  step="0.01" value = ${element.price}>
      <h3> inventory: ${element.inventory_quantity}</h3>
      <label for "StockIncrease">Increase Stock by: </label>
      <input type = "number" id = "StockIncrease" name = "StockIncrease"></div>
      `
      
      )
});

if(status == 'draft') {
    select1 = 'Selected'
} else {select2 = 'Selected'}
if(product.image == null){
    image = '../images/NoImage.jpg';
} else { image = `"${product.image.src}"` }


image = `<img id = "productimage" src=${image} </img>`

console.log(image);
res.render('./productpage.spy',{producttitle : title,itemCode:itemCode, status : status, tags : tags, vendor:vendor, description: description,productType: productType, select1:select1, select2:select2, image: image, variants: variants})

});


module.exports = router