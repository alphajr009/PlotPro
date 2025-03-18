import express from 'express';
import * as turf from '@turf/turf'; // calculation part geospatial calculation
import templates from '../models/measureModel.js';  // Correct model import
import multer from 'multer'; // For file uploads
import fs from 'fs'; // File system module for .kml
import { parseStringPromise } from 'xml2js'; // For parsing .kml files

const route = express.Router();

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

//saving template 
route.post('/saveTemplate', async (req, resp) => {
    console.log('mapping => saveTemplate service invoked...');

    try {
        const {
            measureId,
            templateName,
            landType,
            location,
            description,
            coordinates, 
            status, 
            method
        } = req.body; 

        console.log('mapping => saveTemplate()=> Checking Measure Record Existence');
        let template = await templates.findOne({ measureId });

        if (!template) {
            console.log('mapping => saveTemplate()=> [New] No Measure record Exists..');
            template = new templates();
            
            // Get the location points
            const locationPoints = parseCoordinates(coordinates);

            // Calculate area and perimeter
            const { perimeterInKm, areaInPerches } = calculatePerimeterAndArea(locationPoints);

            console.log('mapping => saveTemplate()=>Saving the measure');
            template.measureId = measureId;
            template.area = areaInPerches;
            template.perimeter = perimeterInKm;
            template.templateName = templateName;
            template.landType = landType;
            template.location = location;
            template.description = description;
            template.status = status;
            template.method = method;
            template.coordinates = coordinates;

            await template.save();
            

            console.log('mapping => saveTemplate() => process finished');
            return resp.status(200).json({
                
                    responseCode:'SUCCESS',
                    responseDescription: 'Coordinates Marked Successfully', 
                    templateName: template.templateName,
                    templateLocation: template.location,
                    templateDescription: template.description,
                    coordinates: coordinates,
                    status: status,
                    measureMethod: method
            });
        } else {
            console.log('mapping => saveTemplate()=> [Exists] Template record Exists..');
            return resp.status(400).json(
                { 
                    responseCode:'FAILED',
                    responseDescription: 'Template Already Exists'
                }
            );
        }

    } catch (err) {
        console.error('mapping => saveTemplate() => An error occurred:', err.message);
        return resp.status(500).json(
            { 
                responseCode:'FAILED',
                responseDescription: 'Execution Failed',
                error: err.message 
            });
    }
});


//update template 
route.put('/updateTemplate', async (req, resp) => {
    console.log('mapping => updateTemplate service invoked...');
    
    try {
        
        const {
            measureId,
            templateName,
            landType,
            location,
            description,
            coordinates, 
            status, 
            method
        } = req.body; 


        console.log('mapping => updateTemplate()=> Checking Template Record Existence');
        let template = await templates.findOne({ measureId });

        if (!template) {
            console.log('mapping => updateTemplate()=> [New] No Template record Exists..');
            return resp.status(400).json(
                { 
                    responseCode:'FAILED',
                    responseDescription: 'No Template record Exists For The Given Measure'
                });
        } else {
            console.log('mapping => updateTemplate()=> [Exists] Template record Exists..');
            if (template.status === "COMPLETED") {
                console.log('mapping => updateTemplate()=> [Exists] Template record status is COMPLETED');
                return resp.status(400).json(
                    { 
                        responseCode:'FAILED',
                        responseDescription: 'This Template is already completed'
                    }
                );
            }
            
            // Get the location points
            const locationPoints = parseCoordinates(coordinates);

            // Calculate area and perimeter
            const { perimeterInKm, areaInPerches } = calculatePerimeterAndArea(locationPoints);

            console.log('mapping => updateTemplate()=>Updating the template');
            template.measureId = measureId;
            template.area = areaInPerches;
            template.perimeter = perimeterInKm;
            template.templateName = templateName;
            template.landType = landType;
            template.location = location;
            template.description = description;
            template.status = status;
            template.method = method;
            template.coordinates = coordinates;
            await template.save();
        }


        console.log('mapping => updateTemplate() => process finished');
        return resp.status(200).json({
            
                responseCode:'SUCCESS',
                responseDescription: 'Template Updated Successfully', 
                templateName: template.templateName,
                templateLocation: template.location,
                templateDescription: template.description,
                coordinates: coordinates,
                status: status,
                measureMethod: method
        });
    } catch (err) {
        console.error('mapping => updateTemplate() => An error occurred:', err.message);
        return resp.status(500).json(
            { 
                responseCode:'FAILED',
                responseDescription: 'Execution Failed',
                error: err.message 
            });
    }
    });

//delete template 
route.delete('/deleteTemplate', async (req, resp) => {
    console.log('mapping => deleteTemplate service invoked...');
    
    try {
        const { measureId } = req.body;

        console.log('mapping => deleteTemplate() => Retrieving the template from measureId');
        const result = await templates.deleteOne({ measureId });
        
        if(!result){
            console.log('mapping => deleteTemplate()=> No Template Exists');
            return resp.status(400).json(
                { 
                    responseCode:'FAILED',
                    responseDescription: 'No Such Template Exists'
                }
            );
        }


        if (result.deletedCount === 0) {
            console.log('mapping => deleteTemplate() => No Template Record Exists');
            return resp.status(400).json(
                { 
                    responseCode:'FAILED',
                    responseDescription: 'No Template Record Found To Delete'
                }
            );
        }
        return resp.status(200).json(
            { 
                responseCode:'SUCCESS',
                responseDescription: 'Template Record Deleted Successfully', 
            }
        );
    } catch (err) {
        console.error('mapping => deleteTemplate() => An error occurred:', err.message);
        return resp.status(500).json(
            { 
                responseCode:'FAILED',
                responseDescription: 'Execution Failed',
                error: err.message 
            });
    }
    });



//get all template 
route.get('/getAllTemplates', async (req, resp) => {
    console.log('mapping => getAllTemplates service invoked...');
    
    try {
        const allMeasures = await templates.find();

        if (allMeasures.length === 0) {
            return resp.status(400).json(
                { 
                    responseCode:'FAILED',
                    responseDescription: 'No Templates Exists',
                }
            );
        }

        return resp.status(200).json({
            responseCode:'SUCCESS',
            responseDescription: 'All Templates Retrieved Successfully', 
            data: allMeasures,
        });
    } catch (err) {
        console.error('mapping => getAllTemplates() => An error occurred:', err.message);
        return resp.status(500).json(
            { 
                responseCode:'FAILED',
                responseDescription: 'Execution Failed',
                error: err.message 
            });
    }
    });



//get single template 
route.get('/getTemplate', async (req, resp) => {
    console.log('mapping => getTemplate service invoked...');
    
    try {
        
        const {measureId} = req.body; 

        console.log('mapping => getTemplate()=> Checking Template Record Existence');
        const template = await templates.findOne({ measureId });
        
        console.log('mapping => updateTemplate() => process finished');
        return resp.status(200).json({
            
                responseCode:'SUCCESS',
                responseDescription: 'Template Retrieved Successfully', 
                data : template
                
        });

    } catch (err) {
        console.error('mapping => getTemplate() => An error occurred:', err.message);
        return resp.status(500).json(
            { 
                responseCode:'FAILED',
                responseDescription: 'Execution Failed',
                error: err.message 
            });
    }
    });

//parse .kml files and extract geographical coordinates
const parseKMLFile = async (filePath) => {
    
    const kmlContent = fs.readFileSync(filePath, 'utf-8');

    // Parse KML content
    const parsedKML = await parseStringPromise(kmlContent);

    // Extract Placemark elements
    const placemarks = parsedKML?.kml?.Document?.[0]?.Placemark || [];
    const coordinates = [];

    placemarks.forEach((placemark) => {
        const coordsText = placemark?.Polygon?.[0]?.outerBoundaryIs?.[0]?.LinearRing?.[0]?.coordinates?.[0];

        if (coordsText) {
            // Split coordinates block into individual points
            const points = coordsText.trim().split(/\s+/); // Split by whitespace
            points.forEach((point) => {
                const [lon, lat] = point.split(',').map(Number); // Separate longitude and latitude
                if (!isNaN(lat) && !isNaN(lon)) {
                    coordinates.push(`${lat},${lon}`);
                } else {
                    console.error(`Invalid coordinate pair: ${point}`);
                }
            });
        }
    });

    return coordinates.join('|'); // Join with pipe "|"
};



//upload template 
route.post('/uploadTemplate', upload.single('file'), async (req, resp) => {
    console.log('mapping => uploadTemplate service invoked...');
    const file = req.file;

    try {
        if (!file) {
            return resp.status(400).json({
                responseCode: 'FAILED',
                responseDescription: 'No file provided',
            });
        }


        let coordinates;
        if (file.mimetype === 'application/x-shapefile') {
            console.log('mapping => uploadTemplate() => Processing .shp file');
            coordinates = await parseShapefile(file.path);
        } else if (file.mimetype === 'application/vnd.google-earth.kml+xml') {
            console.log('mapping => uploadTemplate() => Processing .kml file');
            coordinates = await parseKMLFile(file.path);
        } else {
            return resp.status(400).json({
                responseCode: 'FAILED',
                responseDescription: 'Unsupported file type',
            });
        }




        const {
            measureId,
            templateName,
            landType,
            location,
            description,
            status, 
            method
        } = req.body; 

        console.log('mapping => uploadTemplate()=> Checking Measure Record Existence');
        let template = await templates.findOne({ measureId });

        if (!template) {
            console.log('mapping => uploadTemplate()=> [New] No Measure record Exists..');
            template = new templates();
            
            // Get the location points
            const locationPoints = parseCoordinates(coordinates);

            // Calculate area and perimeter
            const { perimeterInKm, areaInPerches } = calculatePerimeterAndArea(locationPoints);

            console.log('mapping => uploadTemplate()=>Saving the measure');
            template.measureId = measureId;
            template.area = areaInPerches;
            template.perimeter = perimeterInKm;
            template.templateName = templateName;
            template.landType = landType;
            template.location = location;
            template.description = description;
            template.status = status;
            template.method = method;
            template.coordinates = coordinates;

            await template.save();
            

            console.log('mapping => uploadTemplate() => process finished');
            return resp.status(200).json({
                
                    responseCode:'SUCCESS',
                    responseDescription: 'Uploaded Template Marked Successfully', 
                    templateName: template.templateName,
                    templateLocation: template.location,
                    templateDescription: template.description,
                    coordinates: coordinates,
                    status: status,
                    measureMethod: method
            });
        } else {
            console.log('mapping => uploadTemplate()=> [Exists] Template record Exists..');
            return resp.status(400).json(
                { 
                    responseCode:'FAILED',
                    responseDescription: 'Template Already Exists'
                }
            );
        }



    } catch (err) {
        console.error('mapping => uploadTemplate() => An error occurred:', err.message);
        return resp.status(500).json(
            { 
                responseCode:'FAILED',
                responseDescription: 'Execution Failed',
                error: err.message 
            });
    }
});


// Helper function to parse coordinates string
const parseCoordinates = (coordinates) => {
    console.error('mapping => parseCoordinates method invoked...');
    return coordinates.split('|').map(coord => {
        const [latitude, longitude] = coord.split(',').map(Number);
        return { latitude, longitude };
    });
};

// Function to calculate perimeter (in km) and area (in perches)
const calculatePerimeterAndArea = (locationPoints) => {
    console.error('mapping => calculatePerimeterAndArea method invoked...');
    const coordinates = locationPoints.map(point => [point.longitude, point.latitude]);

    const line = turf.lineString(coordinates);
    const perimeterInMeters = turf.length(line, { units: 'meters' });
    const perimeterInKm = (perimeterInMeters / 1000).toFixed(2); 

    const polygon = turf.polygon([coordinates]);
    const areaInSquareMeters = turf.area(polygon);
    const areaInPerches = parseFloat((areaInSquareMeters * 0.0395369).toFixed(4));

    console.error('mapping => calculatePerimeterAndArea() => method finished');
    return { perimeterInKm, areaInPerches };
};




export default route;
