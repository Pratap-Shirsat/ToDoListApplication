const express = require('express');

const unKnownRoutes =()=>{
    const unKnownRouter = express.Router();

    unKnownRouter.get('*',(req,res)=>res.status(404).send('Route not found!'));
    unKnownRouter.post('*',(req,res)=>res.status(404).send('Route not found!'));
    unKnownRouter.put('*',(req,res)=>res.status(404).send('Route not found!'));
    unKnownRouter.delete('*',(req,res)=>res.status(404).send('Route not found!'));

    return unKnownRouter;
}

module.exports = unKnownRoutes;