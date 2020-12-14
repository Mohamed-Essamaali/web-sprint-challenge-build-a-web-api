// Write your "actions" router here!

const express = require('express')
const actions = require('./actions-model')
const projects = require('../projects/projects-model')
const router = express.Router()

////////////////////////////////////////////////////////
// middleware

const validateActionContent = ()=>{
    return(req,res,next)=>{
        let action = req.body
        
        if(!action.description || !action.notes){
           return res.status(400).json({message:"Missing description or notes"})
           
        }
    }
}

const valiadteActionId = ()=>{
    return(req,res,next)=>{
        actions.get(req.params.id)
        .then(action=>{
            if(action){
                req.body = action
                // res.status(200).json(action)
                next()
            } else
            {
             return  res.status(404).json({message: `no ation found with id ${req.params.id}`})
            }
           
        })
        .catch(err=>{next(err)})
    }
}


const validateProjectId = ()=>{
    return(req,res,next)=>{
        projects.get(req.params.id)
        .then(project=>{
            if(!project){
            return  res.send({messsage:`There is no project with id ${req.params.id} exist`})
            }
            next()
        })
        .catch(err=>next(err))
        }
}
////////////////////////////////////////////////////////

// get single action based on id
router.get('/api/projects/:pID/actions/:id', valiadteActionId(),(req,res,next)=>{

    res.status(200).json(req.body)
    next()
       
})

// insert an action to a specific project

    router.post('/api/projects/:id/actions', validateProjectId(),(req,res,next)=>{
        let action = req.body // save body content into an action variable

        if(!action.description || !action.notes){
            return res.status(400).json({message:"Missing description or notes"})
         }

        action.project_id = req.params.id   // add project id into the action variable
        console.log('action in post method ' , action)
            actions.insert(action)
            .then((addedAction)=>{
                res.status(201).json(addedAction)
                next()
            })
            .catch(err=>{res.send({message:"action had not been saved"})})
        
          
      
    })

// updating 
    router.put('/api/projects/:projectId/actions/:actionId',(req,res,next)=>{

            let action = req.body // get content from body

            if(!action.description || !action.notes){
                return res.status(400).json({message:"Missing description or notes"})
             }
            action.project_id = req.params.projectId  // add project id into body from url
            console.log('action in put',action)
            actions.update(req.params.actionId,action)
            .then((updated)=>{
                res.status(202).json(updated)
                next()
            })
            .catch(err=>next(err))
    })

    // deleting an action

    router.delete('/api/projects/:projectId/actions/:id', valiadteActionId(),(req,res,next)=>{

    
            actions.remove(req.params.id)
            .then(()=>res.send({message:`action with id ${req.params.id} is deleted successfully`}))
            .catch(err=>next(err))


    })



module.exports = router


