/**
 *  Users / Auth routes
 *  
 *  host + /api/auth/...
 */

const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();

const {createUser, renewToken, userLogin} = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/field-validator');
const {validateJWT} = require('../middlewares/validate-jwt');

router.post('/new',
    [
       check('name','The name is required').not().isEmpty(), 
       check('email','The email is required').isEmail(),
       check('password','The password must contains al least 6 characteres').isLength({min:6}),
       fieldValidator
    ],
 createUser);

router.post('/',
    [
        check('email','The email is required').isEmail(),
        check('password','The password must contains al least 6 characteres').isLength({min:6}),
        fieldValidator
    ], 
userLogin);

router.get('/renew', validateJWT, renewToken);


module.exports = router;