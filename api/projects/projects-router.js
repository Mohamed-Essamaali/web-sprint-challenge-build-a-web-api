// Write your "projects" router here!

const express = require('express')
const projects = require('./projects-model')
const router = express.Router()

/////////////////////////////////
 // middleware

 const validateProject=()=>{
     return (req,res,next)=>{
         let project = req.body
         if(!project.name || !project.description){
             return res.status(400).json({message:`missing name or description`})
           
         }
        next()
     }
 }

//////////////////////////////////////
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

// insert 
router.post('/', validateProject(), (req,res,next)=>{
    let project = req.body
    console.log('project will be inserted ',project)
     projects.insert(project)
     .then(newProject=>{
         res.status(201).json(newProject)
        next()
    })
      
    .catch(err=>next(err))
    
})


//update

router.put('/:id', validateProject(), (req,res,next)=>{
    let project = req.body
    console.log('project is updated ',project)
     projects.update(req.params.id,project)
     .then(newProject=>{
         res.status(204).json(newProject)
        next()
    })
      
    .catch(err=>next(err))
    
})

//delete

router.delete('/:id', (req,res,next)=>{
   
        projects.remove(req.params.id)
        .then(()=>res.send({message:`Project id ${req.params.id} is deleted successfully`}))
        .catch(err=>next(err))
    
})


// get project actions

module.exports = router
