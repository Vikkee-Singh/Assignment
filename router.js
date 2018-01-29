import express from 'express';

import AssignmentController from './controllers/assignment';

export default (app) =>{
    const apiRoutes = express.Router();
    apiRoutes.get('/addDealer', AssignmentController.DealersEntry);

    // apiRoutes.get('/getDealers', AssignmentController.getDealers);

    apiRoutes.get('/addPumps', AssignmentController.PumpsEntry);

    apiRoutes.get('/addPurchases', AssignmentController.PurchageEntry);

    apiRoutes.get('/updateDealers', AssignmentController.updateDealers);


    // Set url for API group routes
    app.use('/api', apiRoutes);
};