const express = require('express');
const favoriteCtrl = require("../apps/controllers/apis/favorite")
const appointmentCtrl = require("../apps/controllers/apis/appointment")
const propertyCtrl = require("../apps/controllers/apis/property")
const propertyTypeCtrl = require("../apps/controllers/apis/propertyType")
const userCtrl = require("../apps/controllers/apis/user");
const imageController = require("../apps/controllers/image")
const upload = require('../middleware/upload');


const router = express.Router();


router.get('/image/:filename', imageController.getImage);


router.get('/appointments', appointmentCtrl.getAppointment);
router.put('/appointments/:id/status', appointmentCtrl.updateAppointmentStatus);


router.get('/favorites/:id', favoriteCtrl.getByUser);


router.get('/properties', propertyCtrl.getAll);
router.post('/properties',upload.array('images') ,propertyCtrl.addProperty);
router.delete('/properties/:id', propertyCtrl.deleteProperty)


router.get('/properties/:id', propertyCtrl.findById);
router.get('/properties/:id/comments', propertyCtrl.comment);
router.post('/properties/:id/comments', propertyCtrl.storeComment);


router.get('/property-types', propertyTypeCtrl.getAll);
router.post('/property-types', propertyTypeCtrl.addPropertyType);
router.put('/property-types/:id', propertyTypeCtrl.updatePropertyType)
router.get('/property-types/:id', propertyTypeCtrl.getPropertyByType);

router.get('/users', userCtrl.index);


module.exports = router;