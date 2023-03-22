import { ref } from "@mikro-orm/core";
import * as User from "./src/entities/User.js";
import * as VerificationCode from "./src/entities/VerificationCode.js";
import express from 'express';
const Router = (context) => {
    const userDb = context.em.getRepository(User.Schema);
    const verificationCodeDb = context.em.getRepository(VerificationCode.Schema);
    const router = express.Router();
    const getVerificationCode = () => {
        const min = 100000;
        const max = 999999;
        return Math.floor(Math.random() * (max - min + 1) + min).toString();
    };
    router.get('/create_user', async (req, res) => {
        const userData = {
            firstName: "User",
            lastName: "One"
        };
        const userEntity = userDb.create(userData);
        userDb.persist(userEntity);
        await userDb.flush();
        const verificationCode = {
            code: getVerificationCode(),
            user: ref(userEntity),
            expirationDate: new Date(Date.now() * 15 * 60000),
        };
        await verificationCodeDb.persistAndFlush(verificationCode);
    });
    router.get('/users', async (req, res) => {
        let users = await userDb.findAll({ populate: ['verificationCodes'] });
        return users;
    });
    return router;
};
export default Router;
//# sourceMappingURL=router.js.map