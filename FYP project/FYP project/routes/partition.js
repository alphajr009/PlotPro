import express from 'express';
import * as turf from '@turf/turf';  // Correct import syntax for Turf
import pointInPolygon from 'point-in-polygon-hao'; 
import partitions from '../models/partitionModel.js';  // Correct model import
import templates from '../models/measureModel.js';  // Correct model import

const route = express.Router();

//saving partition 
route.post('/savePartition', async (req, resp) => {
    console.log('mapping => savePartition service invoked...');

    try {
        const {
            templateId,
            partitionId,
            name,
            shape,
            status,
            coordinates
        } = req.body; 

        console.log('mapping => savePartition()=> Checking partition Record Existence');
        let partition = await partitions.findOne({ partitionId });

        if (!partition) {
            console.log('mapping => savePartition()=> [New] No Parition record Exists..');
            partition = new partitions();

            console.log('mapping => savePartition()=>Saving the Parition');
            partition.templateId = templateId;
            partition.partitionId = partitionId;
            partition.name = name;
            partition.shape = shape;
            partition.status = status;
            partition.coordinates = coordinates;

            await partition.save();




            let template = await templates.findOne({ measureId : templateId });

            if (!template) {
                console.log('mapping => savePartition()=>No Template record Exists..');
                return resp.status(400).json(
                    { 
                        responseCode:'FAILED',
                        responseDescription: 'No Template record Exists For The Given ID'
                    });
            } else {
                template.partitions = ++template.partitions;
                await template.save();
            }
            console.log('mapping => savePartition() => process finished');
            return resp.status(200).json({
            
                responseCode:'SUCCESS',
                responseDescription: 'Partition Saved Successfully', 
                data: partition
            });
        } else {
            console.log('mapping => savePartition()=> [Exists] Parition record Exists..');
            return resp.status(400).json(
                { 
                    responseCode:'FAILED',
                    responseDescription: 'Partition Already Exists'
                }
            );
        }


    } catch (err) {
        console.error('mapping => savePartition() => An error occurred:', err.message);
        return resp.status(500).json(
            { 
                responseCode:'FAILED',
                responseDescription: 'Execution Failed',
                error: err.message 
            });
    }
});







export default route;