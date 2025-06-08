import { Router, ActivatedRoute } from "@angular/router";
import { loginExpired           } from "./login-expired";
// import { ApplicationPaths,
//          QueryParameterNames    } from "@consts/api-authorization.consts";

export function redirectIfLoginExpired(router: Router, activatedRoute: ActivatedRoute, error: any) : boolean
{
    if (loginExpired(error))
    {
        // Redirect to login page
        const action = activatedRoute.snapshot.url.length == 0 ? '/' :
                       activatedRoute.snapshot.url[1].path;
        // router.navigate(ApplicationPaths.LoginPathComponents, {
        //     queryParams: {
        //         [QueryParameterNames.ReturnUrl]: action  // state.url
        //     }
        // });

        return true;
    }

    return false;
}