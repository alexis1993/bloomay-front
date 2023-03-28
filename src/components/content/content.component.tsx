import React,{ memo, useEffect, useMemo } from "react";
import { getUsers } from "../../services/api.service";
import { useQuery } from "react-query";
import { BloomerEnum } from "../../interfaces/bloomerInterface";
import { formatUsers } from "../../helper/format";
import { IFinalFormat } from "../../interfaces/finalFormatUserInterface";
import { filterBloomer } from "../../helper/filterBloomer";
import { IUserFilter } from "../../interfaces/userFilterInterface";

const initialState : IUserFilter = {
    nbUser : 0 , 
    userFiltered : {}
}

const ContentComponent = () => {
    const { data } = useQuery('users', getUsers)

    const finalDataUsersArrive = useMemo(()=>{
       let userArriveFilter : IUserFilter = initialState
       if(data){
            const userArrive = formatUsers(data.users, BloomerEnum.ARRIVE)
            userArriveFilter =  filterBloomer(userArrive)
       }
       return userArriveFilter
    }, [data])

    const finalDataUsersLeave = useMemo(()=>{
        let userLeaveFilter : IUserFilter = initialState
        if(data){
            const userLeave = formatUsers(data.users, BloomerEnum.LEAVE)
            userLeaveFilter = filterBloomer(userLeave)
        }
        return userLeaveFilter
    }, [data])

    return(
        <>
            <div>{finalDataUsersArrive.nbUser} Bloomer rentrant</div>
            {Object.entries(finalDataUsersArrive.userFiltered).map((k, i) =>
                <>
                    <div key={k[0]}>{k[0]}</div>
                    {k[1].map((user:IFinalFormat)=>
                        <div key={user.id}>{user.firstname} {user.lastname}</div>    
                    )}

                </>
            )}
            <div>{finalDataUsersLeave.nbUser} Bloomer sortant</div>
            {Object.entries(finalDataUsersLeave.userFiltered).map((k, i) =>
                <>
                    <div key={k[0]}>{k[0]}</div>
                    {k[1].map((user: IFinalFormat)=>
                        <div key={user.id}>{user.firstname} {user.lastname}</div>    
                    )}

                </>
        )}
        </>
    )
  }
  
export const MemoizedContentComponent = memo(ContentComponent)