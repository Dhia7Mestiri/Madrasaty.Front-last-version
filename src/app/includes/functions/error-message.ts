import { throwError } from 'rxjs';

// Import global constants
import * as consts from '@consts/global.consts';

export function handleError(error: Response | any)
{
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: any;
    if (error.status) {
        errMsg = (error.url.toLowerCase().indexOf('/login?', 1) <= 0) ? '' :
                 "Oups, vous n'êtes pas connecté ou votre identifiant a expiré, veuillez vous reconnecter afin de terminer cette opération";
    }

    if (!errMsg) {
        errMsg = error.text || error.message || error.toString() || '';
    }

    // if (error instanceof Response) {
    //     errMsg = error.text() || '';
    // }
    // else {
    //     errMsg = error.message ? error.message : error.toString();
    // }

    if (!consts.isProduction && errMsg) {
        console.error(errMsg);
    }

    return throwError(() => new Error(errMsg));
}