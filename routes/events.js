const {Router} = require('express');
const {validateJWT}= require('../middlewares/validate-jwt')
const router = Router();
const {check}= require('express-validator');
const {getEvents, createEvent, editEvent, deleteEvent}= require('../controllers/events');
const {fieldValidator}= require('../middlewares/field-validator');
const {isDate} = require('../helpers/date-helpers')

//Validate token
router.use(validateJWT);

router.get('/',getEvents);

router.post('/',[
    check('title', 'title is required').not().isEmpty(),
    check('start', 'Start date is required').custom(isDate),
    check('end', 'End date is required').custom(isDate),
    fieldValidator
]
, createEvent);

router.put('/:id',editEvent);

router.delete('/:id',deleteEvent);

module.exports = router;