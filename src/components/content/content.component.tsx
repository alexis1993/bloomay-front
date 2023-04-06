import React,{ memo, useCallback, useEffect } from "react";
import { getUsers } from "../../services/api.service";
import { useQuery } from "react-query";
import { BloomerEnum } from "../../interfaces/bloomerInterface";
import { formatUsers } from "../../helper/format";
import { IFinalFormat } from "../../interfaces/finalFormatUserInterface";
import { filterBloomer } from "../../helper/filterBloomer";
import { IUserFilter } from "../../interfaces/userFilterInterface";
import './content.component.css';

const initialState : IUserFilter = {
    nbUser : 0 , 
    userFiltered : {}
}

const ContentComponent = () => {
    const { data, isLoading } = useQuery('users', getUsers, { staleTime: Infinity })

    const finalDataUsers = useCallback((type : BloomerEnum)=>{
       let userFilter : IUserFilter = initialState
       if(data){
            const users = formatUsers(data, type)
            userFilter = filterBloomer(users)
       }
       return userFilter
    }, [data])

    const isnotLastIndex = useCallback((i : number, type : BloomerEnum) => {
        const finalDataUser = finalDataUsers(type)
        const nbFinalDataUser = Object.keys(finalDataUser.userFiltered).length
        return i < nbFinalDataUser - 1
    },[finalDataUsers])

    const isArrive = useCallback((type : BloomerEnum)=> type === BloomerEnum.ARRIVE , [])

    const renderBloomer = (type: BloomerEnum) => {
        const finalDataUser = finalDataUsers(type)
        return(
            <>
                <div className="largeSize paddingLarge">
                    <span className={`decoration padding-right ${isArrive(type) ? "arriveColor" : "leaveColor"}`}>
                    {finalDataUser.nbUser}
                    </span> 
                    {isArrive(type) ? 'Bloomer entrants' : 'Bloomer sortants'}
                </div>
                {Object.entries(finalDataUser.userFiltered).map((k, i) =>
                    <div key={k[0]}>
                        <div className="center paddingSmall">
                            <span className="dot margin-right greyColor"></span>
                            <span className={`dateSize ${isArrive(type) ? "arriveColor" : "leaveColor"}`}>{k[0]}</span>
                        </div>
                        <div className="full-width greyColor">
                            {k[1].map((user:IFinalFormat)=>
                            <div className="flex">
                                <div className={`width-line ${isnotLastIndex(i,type) ? "line" : ""}`}></div>
                                <div key={user.id} className=" smallSize paddingSmall">{user.firstname} {user.lastname}</div>  
                            </div>  
                            )}
                        </div>
                    </div>
                )}
            </>
        )
    }

    return(
        <div className="center">
            {isLoading ?
                <div>Loading...</div>
            :
                <>
                    {renderBloomer(BloomerEnum.ARRIVE)}
                    {renderBloomer(BloomerEnum.LEAVE)}
                </>
            }
        </div>
    )
  }
  
export const MemoizedContentComponent = memo(ContentComponent)