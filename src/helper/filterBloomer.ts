import { lastday } from "./lastDay";
import { IFinalFormat } from "../interfaces/finalFormatUserInterface";

export const filterBloomer = (user :  Record<string, Array<IFinalFormat>>) => {
    let userFiltered : Record<string, Array<IFinalFormat>> = {}
    let nbUser = 0
    const now = Date.now()
    const endMonth = lastday((new Date()).getFullYear(), (new Date()).getMonth())
    Object.entries(user).forEach(k =>{
        const timeBloomer = (new Date(k[0])).getTime()
        if( timeBloomer >= now && timeBloomer <= endMonth){
            if(!userFiltered[k[0]]){
                userFiltered[k[0]] = []
            }
            userFiltered[k[0]] = userFiltered[k[0]].concat(k[1])
            nbUser += k[1].length
        }
    })
    return {nbUser , userFiltered}
}