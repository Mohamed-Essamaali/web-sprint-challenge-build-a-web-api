// Write your "actions" router here!




const express = require('express')
const server = require('../server')
const actions = require('./actions-model')
const router = express.Router()

////////////////////////////////////////////////////////
// middleware

const validateActions = ()=>{
    return(req,res,next)=>{
        let action = req.body
        
        if(!action.description || !action.notes){
           return res.status(400).json({message:"Missing description or notes"})
            next()
        }
    }
}

////////////////////////////////////////////////////////

// get single action based on id
router.get('/api/projects/:id/actions/:id', (req,res,next)=>{

    actions.get(req.params.id)
    .then(action=>{
        if(action){
            res.status(200).json(action)
        } else
        {
            res.status(404).json({message: `Action not found with id ${req.params.id}`})
        }
        
    })
       
    .catch(err=>{
        next(err)
    })
})

// insert an action to a specific project

    router.post('/api/projects/:id/actions',validateActions(),(req,res,next)=>{
    let action = req.body
    action.project_id = req.params.id
        actions.insert(action)
        .then((action)=>{res.status(201).json(action)})
        .catch(err=>{res.status(204).json({message:"action had not been saved"})})
   

    })

// updating 
    router.put('/api/projects/:projectId/actions/:actionId',validateActions(),(req,res,next)=>{
            let action = req.body
            action.project_id = req.params.projectId
            console.log('action in put',action)
            actions.update(req.params.actionId,action)
            .then((updated)=>{
                res.status(202).json(updated)
                next()
            })
            .catch(err=>next(err))
    })

    // deleting an action

    router.delete('/api/projects/:projectId/actions/:actionId',async (req,res,next)=>{

        try{
            actions.remove(req.params.actionId)
            res.status(204).json({message:`action with id ${req.params.actionId} is deleted successfully`})
            
        }
        catch(err){next(err)}


    })



module.exports = router


