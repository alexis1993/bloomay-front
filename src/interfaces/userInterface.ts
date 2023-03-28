import { IFreelance } from "./freelanceInterface";

export interface IUser {
    id: string,
    label: string,
    beginDate: string,
    endDate: string,
    missionType: string,
    freelance: IFreelance
}