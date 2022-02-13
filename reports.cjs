var axios = require("axios")
var express = require('express')
var router = express.Router()
require('dotenv').config();
const APIKEY = process.env.APIKEY


router.get('/reports' , async function (req, res){
    
    var config = {
        method: 'get',
        url: 'https://finelight-tcg.myshopify.com/admin/api/2021-07/orders.json?status=closed',
        headers: { 
            'Authorization': APIKEY 
        }
      };
      let table = ''
      let orders = await axios(config)
      .then(function (response) {
        return(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
      
      
      table = table.concat(`
      <table class="report">
      <tr>
      <th>Sales amount</th>
      <th>date of Sales</th>
      </tr>
      `);
      const map = new Map();
      let month
      let date
      let months = '';
      let sales = '';
      let total = 0.00
      orders.orders.forEach(element => {
        total = total + parseFloat(element.current_subtotal_price);
        console.log(total);
        date = new Date(element.created_at);
        month = date.toLocaleString('default', { month: 'long' });
        console.log('testing');
        let dateFormatted = month + ' ' + date.getFullYear();
      
        if(map.get(dateFormatted) == null){
          map.set(dateFormatted,element.current_subtotal_price);
          
        } else{
           price =  parseFloat(map.get(dateFormatted)) + parseFloat(element.current_subtotal_price);
          map.set(dateFormatted,price);
          
        }
        
        
        
      });
      map.forEach((value, key) => { 
        table2 = `<tr> <td> ${key} </td> <td> £${parseFloat(value).toFixed(2)}  </td>`;
        table = table.concat(table2);
        console.log(table2);
        months = months.concat(key + ',');
        sales = sales.concat(value + ',');        
      } )
      table = table.concat(`<tr> <td> TOTAL </td> <td> £${parseFloat(total).toFixed(2)} </td>`);
      
      months = months.slice(0,-1);
      sales = sales.slice(0,-1);

      res.render('reports.spy',{table:table, months:months, sales:sales});
        
      
    })

        

        


module.exports = router