const { User,Role} = require('../../../database').models
const { repository: repositoryClass } = require('../../../database')
const userRepository = new repositoryClass(User)
const roleRepository = new repositoryClass(Role)
import { Request, Response, NextFunction } from 'express';
async function changeUserRole(req: Request, res: Response, next: NextFunction) {
    const error = new Error() as any
    if(req.body.role !== "moderator" && req.body.role !== "user"){
        error.name = 'UpdateError'
        error.message = 'the data is incorrect'
        error.status = 400
        return next(error)
    }
    const role = await roleRepository.findOne({role : req.body.role})
    await userRepository.update(req.params.id,{roleId:role.id})
    res.send('Change role complete')
}
module.exports = changeUserRole
export{}
