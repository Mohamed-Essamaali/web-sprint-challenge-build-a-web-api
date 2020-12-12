// Write your "projects" router here!

const express = require('express')
const projects = require('./projects-model')
const router = express.Router()


// get,
// insert,
// update,
// remove,
// getProjectActions,
router.get('/:id',(req,res,next)=>{
    projects.get(req.params.id)
    .then(project=>{
        if(project){
            res.status(200).json(project)
        } else{
            res.status(404).json({message:`No Project found with id ${req.params.id}`})
        }
    })
    .catch(err=>next(err))
})

module.exports = router
