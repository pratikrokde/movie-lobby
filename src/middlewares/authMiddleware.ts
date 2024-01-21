import { Request, Response, NextFunction } from "express";
import httpStatus from 'http-status';

export const checkIfUserHasAdminAccess = (req: Request, res: Response, next: NextFunction) => {

    const isAdminRolePresent = req.headers?.role;
    if (isAdminRolePresent === 'Admin') {
        next();
    } else {
        return res.status(httpStatus.UNAUTHORIZED).json({ error: "Unautorized" })
    }
}