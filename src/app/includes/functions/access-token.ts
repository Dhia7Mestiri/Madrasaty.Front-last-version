import { HttpHeaders    } from "@angular/common/http";
import { getCurrentUser } from "./current-user";

export function getAccessToken()
{
    var user  = getCurrentUser();  
    var token = user ;
    return {
        headers: new HttpHeaders({
            'Content-Type' : 'application/json',
           // 'Authorization': 'Bearer ' + (token && token["access_token"]) ?? ""
        })
    };
}