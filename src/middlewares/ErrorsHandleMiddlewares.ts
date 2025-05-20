import { NextFunction, Request, Response } from 'express';

export function ErrosHandleMiddlewares(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) { 
    console.error('Error: ', err);
    res.status(500).json({
        message: 'Erro de servidor',
        error: err.message || 'Um erro inesperado ocorreu',
    });

    res.status(400).json({
        message: 'Bad Request',
        error: err.message || 'Os dados enviados estão incorretos',
    })

}