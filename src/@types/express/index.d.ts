import * as express from 'express';

declare global {
    namespace Express{
        export interface Request {
             user_id: string;
             file?: {
                filename?: string;
                [key: string]: any;
            };
     }
    }
} 


    