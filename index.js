const express = require('express');
const mongoose = require('mongoose');
const bodyParser= require('body-parser');
const fetch= require('node-fetch');
const app= express();

const authRouter= require('./routes/auth')
const Crypto = require('./models/crypto')

//middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

mongoose.connect('mongodb+srv://vikas:vikas123@mycluster.z2jugjl.mongodb.net/?retryWrites=true&w=majority');
mongoose.connection.on('error', error=>{ 
    console.log("connection failed with db");
});

mongoose.connection.on('connected', connected=>{ 
    console.log("connected to db");
});

app.use('/', authRouter)

//handle gete request
app.get('/index', (req, res)=>{
    res.render('index' , {name: null, last:null,  buy: null, sell:null, 
        volume: null, base_unit: null});
});

//feth data
   
    let url= `https://api.wazirx.com/api/v2/tickers`;
    console.log(url)
         fetch(url)
        .then(res => res.json())
        .then(data => {
             
            const myarr= Object.values(data);
            for(let i=1; i<=10; i++){
                console.log(i);
                console.log(myarr[i].name);
                console.log(myarr[i].last);
                console.log(myarr[i].buy);
                console.log(myarr[i].sell);
                console.log(myarr[i].volume);
                console.log(myarr[i].base_unit);

                let name= myarr[i].name;
                let last= myarr[i].last;
                let buy=myarr[i].buy;
                let sell=myarr[i].sell;
                let volume=myarr[i].volume;
                let base_unit=myarr[i].base_unit;


            const cryptoData =new Crypto({
                name: myarr[i].name,
                last: myarr[i].last,
                buy: myarr[i].buy,
                sell: myarr[i].sell,
                volume: myarr[i].volume,
                base_unit: myarr[i].base_unit
            });

            
            
              cryptoData.save();
        }
              })
            
            
           
              
//fetch data from mongodb
Crypto.find({}, function(err, crypto){
    if(err) console.log(err)
    result = crypto;
    console.log(result)
})

const port= process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log('http://127.0.0.1:'+port)
})
