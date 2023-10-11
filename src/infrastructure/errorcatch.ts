import { Request, Response } from 'express';

class ErrorTryCatch {
    static async catchErrors(
        routeFn: (req: Request, res: Response) => Promise<void>,
        req: Request,
        res: Response
    ) {
        try {
            await routeFn(req, res);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Something Went Error' });
        }
    }
}

export default ErrorTryCatch;
