'use strict';

const taskModel = require('../models/tasks');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

const getAllTask = asyncWrapper (async (req, res, next) => {
    const tasks = await taskModel.find({});
    res.status(200).json({ tasks });
})

const createTask = asyncWrapper (async (req, res, next) => {
    const task = await taskModel.create(req.body);
    res.status(200).send({ task });
})

const getTask = asyncWrapper (async (req, res, next) => {
    const {id: _id} = req.params;
    const task = await taskModel.findOne({_id});
    
    if(!task){
        return next(createCustomError(`No task with id: ${_id}`, 404))
    }

    res.status(200).json({task});
})

const updateTask = asyncWrapper (async (req, res, next) => {
    const {id: _id} = req.params;
    const task = await taskModel.findOneAndUpdate({_id}, req.body, {
        new: true,
        runValidators: true,
    });

    if(!task){
        return next(createCustomError(`No task with id: ${_id}`, 403))
    }

    res.status(200).json({task});
})

const deleteTask = asyncWrapper (async (req, res, next) => {
    const {id: _id} = req.params;
    const task = await taskModel.findOneAndDelete({_id});

    if(!task){
        return next(createCustomError(`No task with id: ${_id}`, 403))
    }

    res.status(200).json({task});
})

module.exports = {
    getAllTask,
    createTask,
    getTask,
    updateTask,
    deleteTask
}