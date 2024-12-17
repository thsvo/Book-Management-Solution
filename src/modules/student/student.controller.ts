import { RequestHandler } from 'express'
import { StudentServices } from './student.service'
import catchAsync from '../../utils/catchAsync'

const getAllStudents: RequestHandler = catchAsync(async (req, res) => {
    const result = await StudentServices.getAllStudentsFromDB()

    res.status(200).json({
        success: true,
        message: 'Students are retrieved succesfully',
        data: result,
    })
})

const getSingleStudent: RequestHandler = catchAsync(async (req, res) => {
    const { studentId } = req.params

    const result = await StudentServices.getSingleStudentFromDB(studentId)

    res.status(200).json({
        success: true,
        message: 'Student is retrieved succesfully',
        data: result,
    })
})

const deleteStudent: RequestHandler = catchAsync(async (req, res) => {
    const { studentId } = req.params

    const result = await StudentServices.deleteStudentFromDB(studentId)

    res.status(200).json({
        success: true,
        message: 'Student is deleted succesfully',
        data: result,
    })
})

export const StudentControllers = {
    getAllStudents,
    getSingleStudent,
    deleteStudent,
}
