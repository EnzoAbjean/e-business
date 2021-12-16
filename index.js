const express = require('express')
//const axios = require('axios')
const app = express()
const PORT = process.env.PORT || 5000 // this is very important

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.get('/kill',function(req,res){
    res.send("BBOUUUUMMMMM");

})
app.get('/MesRecettes', async function(req, res) {
    res.send("gola");
})

app.listen(PORT, function () {
    console.log('Example app listening on port ' + PORT)
})



