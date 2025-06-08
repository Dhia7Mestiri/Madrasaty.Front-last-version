import { Injectable   } from '@angular/core';

import * as consts           from '@consts/url.consts';
import * as validationConsts from '@consts/validation.consts';
import * as countryConsts    from '@consts/country.consts';


@Injectable({
    providedIn: 'root'
})
export class ValidationService
{
    isLuhnValid(value: any)
    {
        // Accept only digits, dashes or spaces
        if (/[^0-9-\s]+/.test(value))
            return false;

        let nCheck = 0, bEven = false;
        value = value.toString().replace(/\D/g, "");

        for (let n = value.length - 1; n >= 0; n--)
        {
            let cDigit = value.charAt(n),
                nDigit = parseInt(cDigit, 10);

            if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

            nCheck += nDigit;
            bEven   = !bEven;
        }

        return (nCheck % 10) == 0;
    }

    isPasswordOK(pw: string): boolean | string
    {
        if (!pw)
            return validationConsts.errDescrPassword;

        // ==== Short version:
        // const r = new RegExp(validationConsts.password);
        // return r.test(pw) ? true : validationConsts.errDescrPassword;

        // ==== Long version (better feedback)
        else if (pw.length < 8)
            return validationConsts.errDescrPasswordTooShort;

        else if (pw.length > 50)
            return validationConsts.errDescrPasswordTooLong;

        else if (pw.search(/\d/) == -1)
            return validationConsts.errDescrPasswordNoNbr;

        else if (pw.search(/[a-zA-Z]/) == -1)
            return validationConsts.errDescrPasswordNoLetter;

        else if (pw.search(/[A-Z]/) == -1)
            return validationConsts.errDescrPasswordNoUpper;

        else if (pw.search(/[a-z]/) == -1)
            return validationConsts.errDescrPasswordNoLower;

        else if (pw.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+\~\|\:]/) != -1)
            return validationConsts.errDescrPasswordBadChar;

        return true;
    }

    isConfirmationPasswordOK(pw: string[])
    {
        return pw && pw.length == 2 &&
               // this.isPasswordOK(pw[0]) &&
               (pw[0] === pw[1])    &&
               pw[0].length > 0;
    }

    isCountryOK(country: string): boolean | string
    {
        if (!country)
            return validationConsts.errDescrCountry;

        country = country?.toUpperCase();
        if (country == "FRA" || countryConsts.countryISO.indexOf(country) >= 0)
            return true;
        else
            return validationConsts.errDescrCountry;
    }

    isPostalCodeOK(country: string, codePostal: string): boolean | string
    {
        if (!country)    return validationConsts.errDescrCountry;
        if (!codePostal) return false;

        country = country?.toUpperCase();
        if (country == "FR")
        {
            return codePostal.search(/^[0-9]{5}$/g) >= 0;
        }

        return this.isCountryOK(country);
    }

    areDatesCorrect(dateStart: Date, dateEnd: Date): boolean | string
    {
        if (!dateEnd || !dateStart)
            return validationConsts.errDescrDates;

        if (dateEnd > dateStart)
            return true;

        return validationConsts.errDescrDates;
    }

    arrayHasOnlyUniqueElements(options: string[]): boolean
    {
        return options.filter((v, i, a) => a.indexOf(v) === i)
                      .length == options.length;
    }

    // arrayHasValidElements(options: string[]) : boolean
    // {
    //     return options.filter(v => validOptions.includes(v))
    //                   .length == options.length;
    // }

    private arrayIsEmpty(array: string[])
    {
        return array?.length == 0;
    }

    private arrayHasEmptyElements(array: string[]): boolean
    {
        return array.filter(str => str.trim().length == 0)
                    .length > 0;
    }

    isPhoneNumberOK(phone: string): boolean | string
    {
        if (!phone)
            return validationConsts.errDescrPhone;

        phone   = phone.replace("-", ".");

        return phone.search(validationConsts.phone) >= 0 ? true : validationConsts.errDescrPhone;
    }
}