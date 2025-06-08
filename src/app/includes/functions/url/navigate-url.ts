import { Router } from "@angular/router";

export async function navigateToReturnUrl(router: Router, returnUrl: string)
{
    // It's important that we do a replace here so that we remove the callback uri with the
    // fragment containing the tokens from the browser history.
    await router.navigateByUrl(returnUrl, {
        replaceUrl: true
    });
}