import { Role } from "types/role";
import { getTokenData } from "./token";



export const isAuthenticated = () : boolean => {
    const tokenData = getTokenData();
    return (tokenData && tokenData.exp * 1000 > Date.now()) ? true : false;
}

export const hasAnyRoles = (roles: Role[]) : boolean => {
    if(roles.length === 0){
        return true;
    }

    const tokenData = getTokenData();

    // Jeito Antigo
    /*
    if(tokenData !== undefined){
        for(var i = 0; i < roles.length; i++){
            if(tokenData.authorities.includes(roles[i])){
                return true;
            }
        }
    }
    */

    // Jeito Certo
    if(tokenData !== undefined){
        return roles.some(roles => tokenData.authorities.includes(roles));
    }

    return false;
}


