var axios = require("axios")
var express = require('express')
var router = express.Router()
require('dotenv').config();
const APIKEY = process.env.APIKEY


router.post('/editItem', async function (req, res) {
    console.log(req.body)
    let data;
    let title;
    let status = req.body.status;
    status = status.toLowerCase();
    let tagsSplit = req.body.tags
    tagsSplit = tagsSplit.split(',');
    let id = req.body.itemCode;
    title = req.body.producttitle

    data =
        JSON.stringify(
    {
        "product": {
          "id": id,
           "title": title, 
          "body_html": req.body.description,
          "vendor": req.body.vendor,
          "tags": tagsSplit,
        "status": status
        }
        });
      
    

    console.log(data);
    var config = {
        method: 'put',
        url: `https://finelight-tcg.myshopify.com/admin/api/2021-07/products/${id}.json`,
        headers: {
            'Authorization': 'Basic NjNmYjUzZDdmYmMyZDJjZmRiZDM0YzAxYzYxYmJiOGY6c2hwcGFfMWQ3NmRmMjc4ZGFlNjgyMDBhOTFlNTcwYmI1MzQxZTY=',
            'Content-Type': 'application/json'
        },
        data: data
    };

   
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
    

    res.redirect('/');


})

module.exports = router