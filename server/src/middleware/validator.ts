import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";


const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    console.log(errors)
    if (!errors.isEmpty()) {
        res.status(400).send({status: 400, errors: errors.array() })
        return
    }
    next()
}


export { validate }