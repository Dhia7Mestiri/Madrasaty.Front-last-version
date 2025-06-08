// Import global constants
import * as consts from '@consts/global.consts';

export function log(...messages: any)
{
    if (!consts.isProduction)
    {
        console.groupCollapsed('%c[' + messages + ']', 'color: #00a8ff; font-weight: bold;');
        console.log(...messages);
        console.trace();
        console.groupEnd();
    }
}