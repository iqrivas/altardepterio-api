const express = require('express');
const router = express.Router();
const PetitionsService = require('../../services/petitions');

const petitionsService = new PetitionsService();

router.get('/', async (req, res, next) => {
    const {tags} = req.query;

    try {
    const petitions = await petitionsService.getProducts({tags});
    res.status(200).json({
        data: petitions,
        message: 'Peticiones listadas'
    });
    } catch (err) {
        next(err);
    }
    
})

router.get('/:petitionId', async (req, res, next) => {
    const {petitionId} = req.params;

    try {
        const petition = await petitionsService.getProduct({petitionId});
        res.status(200).json({
            data: petition,
            message: 'Petición listada'
        });    
    } catch (err) {
        next(err);
    }

    
})

router.post('/', async (req, res, next) => {
    const {body: petitionBody} = req;

    try{
        const petition = await petitionsService.createProduct({petitionBody});
        res.status(201).json({
            data: petition,
            message: 'Petición creada'
        });
    } catch(err) {
        next(err);
    }
    
})

router.put('/:petitionId', async (req, res, next) => {
    const {petitionId} = req.params;
    const {body: petitionBody} = req;
    try{
        const petition = await petitionsService.updateProduct({petitionId, petitionBody});
        res.status(200).json({
            data: petition,
            message: 'Petición actualizada'
        });
    } catch(err) {
        next(err);
    }
})

router.delete('/:petitionId', async (req, res, next) => {
    const {petitionId} = req.params;
    try {
        const petition = await petitionsService.deleteProduct({petitionId});
        res.status(200).json({
            data: petition,
            message: 'Petición eliminada'
        });
    } catch(err) {
        next(err);
    }
})

module.exports = router;