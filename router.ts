import { ref } from "@mikro-orm/core";
import { Context } from "./app.js";
import * as User from "./src/entities/User.js";
import * as VerificationCode from "./src/entities/VerificationCode.js";
import express, {Request, Response} from 'express';

const Router = (context: Context) => {
    const userDb = context.em.getRepository(User.Schema);
    const verificationCodeDb = context.em.getRepository(VerificationCode.Schema);

    const router = express.Router();

    const getVerificationCode = (): string => {
        const min = 100000;
        const max = 999999;
        
        return Math.floor(Math.random() * (max - min + 1) + min).toString();
    }

    router.get('/create_user', async (req: Request, res: Response) => {

        const userData: User.Model = {
            firstName: "User",
            lastName: "One"
        }

        const userEntity = userDb.create(userData);

        userDb.persist(userEntity);


        await userDb.flush();

        const verificationCode: VerificationCode.Model = {
            code: getVerificationCode(),
            user: ref(userEntity),
            expirationDate: new Date(Date.now() * 15 * 60000),
        }

        const vcEntity = verificationCodeDb.create(verificationCode);

        await verificationCodeDb.persistAndFlush(vcEntity);


        console.log(userDb);

        res.send(userEntity);

    });

    router.get('/users', async (req: Request, res: Response) => {
    
        let users = await userDb.findAll({populate: ['verificationCodes']});

        res.send(users);
        
    });

    return router;
}

export default Router;
