import { Response } from 'express'

type TResponse = {
    statusCode: number
    success: boolean
    message?: string
    data: T
}

const sendResponse = <T>(res: Response, data: TResponse) => {
    res.status(data?.statusCode).json({
        success: data.success,
        message: data.message,
        data: data.data,
    })
}
export default sendResponse
