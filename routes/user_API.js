const controller = require('../controllers/user_C');
const validation = require('../middlewares/validation_user'); 
const verifyJWT = require('../middlewares/verifyJWT');
const followUnfollow = require('../controllers/followUnfollow');

module.exports = (ap)=>{

    ap.post('/dosto/v1/users/signup',[validation.valid],controller.signUp);

    ap.post('/dosto/v1/users/signin',controller.signIn);

    ap.post('/dosto/v1/users/follow/:id',[verifyJWT.token],followUnfollow.follow);

    ap.post('/dosto/v1/users/unfollow/:id',[verifyJWT.token],followUnfollow.unfollow);

}