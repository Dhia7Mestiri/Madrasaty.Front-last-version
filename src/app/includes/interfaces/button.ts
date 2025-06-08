export interface IButton
{
    text        : string;
    url         : string;
    modalTarget?: string;
    cssClass?   : string;
    onClick?    : () => void;
}