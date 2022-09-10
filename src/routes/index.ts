import authRouter from "./auth";
import complainsRouter from "./complaints";
import rootRouter from "./root";
import userRouter from "./user";

const routers = {
    root: rootRouter,
    auth: authRouter,
    complains: complainsRouter,
    users: userRouter
}

export default routers;