'use strict';

const taskModel = require('../models/tasks');

const getAllTask = async (req, res) => {
    try {
        const task = await taskModel.find({});
        res.status(200).json({task});
    } catch (error) {
        res.status(500).json({msg: error});
    }
}

const createTask = async (req, res) => {
    try {
        const task = await taskModel.create(req.body);
        res.status(200).send({ task });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const getTask = async (req, res) => {
    try {
        const {id: _id} = req.params;
        const task = await taskModel.findOne({_id});
        
        if(!task){
            return res.status(403).json({msg:`No task with id: ${_id}`})
        }

        res.status(200).json({task});
    } catch (error) {
        res.status(500).json({msg: error});
    }
}

const updateTask = async (req, res) => {
    try {
        const {id: _id} = req.params;
        const task = await taskModel.updateOne({_id});
        res.status(200).json({task});
    } catch (error) {
        res.status(500).json({msg: error});
    }
}

const deleteTask = (req, res) => {
    res.send('delete task...')
}

module.exports = {
    getAllTask,
    createTask,
    getTask,
    updateTask,
    deleteTask
}