import jwt from 'jsonwebtoken';

const secret = 'secret';

const auth = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const isAuth = token.length < 500;

        let decode;

         if(token && isAuth){
            decode = jwt.verify(token, secret);

            req.userId = decode?.id;
         } else {
            decode = jwt.decode(token);

            req.userId = decode?.sub;
         }
         
         next();
    }catch (err) {
        console.log(err);
    }
};

export default auth;
