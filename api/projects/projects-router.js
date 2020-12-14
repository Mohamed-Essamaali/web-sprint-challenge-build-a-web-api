// Write your "projects" router here!

const express = require('express')
const projects = require('./projects-model')
const router = express.Router()

/////////////////////////////////
 // middleware

 const validateProjectContent=()=>{
     return (req,res,next)=>{
         let project = req.body
         if(!project.name || !project.description){
             return res.status(400).json({message:`missing name or description`})
           
         }
        next()
     }
 }

 const validateProjectID = ()=>{
     return (req,res,next)=>{
        projects.get(req.params.id)
        .then(project=>{
            if(project){
                req.body = project
                res.status(200).json(project)
            } else {
                res.send({message:`No Project with id ${req.params.id}`})
            }
        })
        .catch(err=>next(err))
     }
 }

//////////////////////////////////////
// get,
// insert,
// update,
// remove,
// getProjectActions,

//get project based on id
router.get('/:id',validateProjectID(),(req,res,next)=>{
            res.status(200).json(req.body)
    
})

// insert 
router.post('/', validateProjectContent(), (req,res,next)=>{
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

router.put('/:id', validateProjectID(), validateProjectContent(), (req,res,next)=>{
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

router.delete('/:id', validateProjectID(), (req,res,next)=>{
   
        projects.remove(req.params.id)
        .then(()=>res.send({message:`Project id ${req.params.id} is deleted successfully`}))
        .catch(err=>next(err))
    
})


// get all actions for a single project

router.get('/:id/actions', validateProjectID(),(req,res,next)=>{

    projects.getProjectActions(req.params.id)
    .then(actions=>{
        if(actions.length){
            res.status(200).json(actions)
        } else{
            res.status(404).json({message:`No actions found for project id ${req.prams.id}`})
        }
       
    })
    .catch(err=>next(err))
})

module.exports = router
