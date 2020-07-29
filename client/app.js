const express = require('express');
const app = express();
const router = require('express').Router();
app.use(express.static('./public'));
router.use('*',function(req,res){
    res.redirect('/talk.html')
})
app.use('/',router);

app.listen(3000);