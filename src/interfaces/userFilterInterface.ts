import { IFinalFormat } from "./finalFormatUserInterface";

export interface IUserFilter {
   nbUser : number
   userFiltered : Record<string, Array<IFinalFormat>>
}