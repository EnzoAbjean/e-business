const express = require('express')
const axios = require('axios')
const app = express()
const PORT = process.env.PORT || 5000 // this is very important


/* middleware json*/
app.use(function(req, res, next){

    res.header('Access-Control-Allow-Origin', 'https://6ji1h.csb.app')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    express.json();
    next();

})


const axiosCli=axios.create({
    baseURL: 'https://tpnote-017c.restdb.io/rest/',
    headers:
    { 'cache-control': 'no-cache',
        'x-apikey': '071bbf24ada5ce19c7ba1bf445b7e0dcef75f' }});


app.get('/Connexion', function (req, res) {

    res.send('Page de connexion')
})

app.get('/CreateLogin', function (req, res) {

    res.send('Page pour créer un compte')
})

/* Récupère toutes les recettes */
app.get('/AllRecipes', async function(req, res) {

    const fetchR1 = await axiosCli.get('recette').then(result=>{return result.data});
    res.json(fetchR1);
})

/* Récupère une recette en fonction de l'id passé en paramètre */
app.get('/OneRecipe/:id', async function(req, res) {

    const fetchR1 = await axiosCli.get('recette/'+req.params.id).then(result=>{return result.data})
    res.json(fetchR1);
})

/* Insère une recette */
app.post('/AddRecipe', async function(req, res) {

    /* New recipe */
    const recipe = req.body

    try{
        const fetchR1 = await axiosCli.post('recette', recipe)
        res.json({result:'ok'});

    }
    catch (e){
        res.json({error: e.message})
    }
})

/* Supprime une recette en fonction de l'id passé en paramètre */
app.delete('/DeleteRecipe/:id', async function(req, res) {

    try{
        const fetchR2 = await axiosCli.delete('recette/'+req.params.id).then(result=>{return result.data})
        res.json({result:'ok'});

    }
    catch (e){
        res.json({error: e.message})
    }
})

/* Modifie une recette en fonction de l'id passé en paramètre */
app.put('/UpdateRecipe/:id', async function(req, res) {

    /* New recipe */
    const recipe = req.body

    try{
        const fetchR2 = await axiosCli.put('recette/' + req.params.id, recipe).then(result=>{return result.data})
        res.json({result:'ok'});

    }
    catch (e){
        res.json({error: e.message})
    }
})

/* Le port */
app.listen(PORT, function () {
    console.log('Example app listening on port ' + PORT)
})



