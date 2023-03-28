import { BloomerEnum } from '../interfaces/bloomerInterface'
import { IUser } from '../interfaces/userInterface'
import { IFinalFormat } from '../interfaces/finalFormatUserInterface';

export const formatUsers = (users : Array<IUser> , key: BloomerEnum) => {
    let finalData : Record<string, Array<IFinalFormat>> = {};
    users.sort((a,b)=> (new Date(a[key])).getTime() - (new Date(b[key])).getTime()).forEach((u:IUser) => {
        if(!finalData[u[key]]){
            finalData[u[key]] = []
        }

        finalData[u[key]].push({
            firstname: u.freelance.firstname,
            lastname: u.freelance.lastname,
            beginMission: u.beginDate,
            endMission: u.endDate,
            id: u.freelance.id,
        })
    })
    return finalData
}