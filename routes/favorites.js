const {Router} = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const {createFavorite, getFavorites}= require('../controllers/favorite');

const router = Router();

router.use(validateJWT);

router.get('/', getFavorites);
router.post('/', createFavorite);

module.exports= router;