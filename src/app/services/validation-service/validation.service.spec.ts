import { TestBed           } from '@angular/core/testing';
import { ValidationService } from './validation.service';

import * as validationConsts from '@consts/validation.consts';

describe('ValidationService', () =>
{
    let service: ValidationService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ValidationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should validate SIRET/Luhn accurately', () =>
    {
        // Values Ref. https://github.com/tolbon/luhn-ts

        expect(
            service.isLuhnValid("41111-111-1111111 1")
        ).toBe(true);

        expect(
            service.isLuhnValid("497401423384552-3")
        ).toBe(true);

        expect(
            service.isLuhnValid("497401423384551")
        ).toBe(true);

        expect(
            service.isLuhnValid("35600000000048")
        ).toBe(true);

        expect(
            service.isLuhnValid("3560000000004-3")
        ).toBe(false);

        expect(
            service.isLuhnValid("97035480906916")
        ).toBe(true);

        expect(
            service.isLuhnValid("3560000000004-30")
        ).toBe(true);

        expect(
            service.isLuhnValid("3560000000004-8")
        ).toBe(true);

        expect(
            service.isLuhnValid("5146713835430")
        ).toBe(false);

        expect(
            service.isLuhnValid("51467138354336")
        ).toBe(true);
    });

    it('should check password strength', () =>
    {
        expect(service.isPasswordOK('123456789')).toBe(validationConsts.errDescrPasswordNoLetter);
        expect(service.isPasswordOK('abcdefghi')).toBe(validationConsts.errDescrPasswordNoNbr);
        expect(service.isPasswordOK('pass123')  ).toBe(validationConsts.errDescrPasswordTooShort);
        expect(service.isPasswordOK('pass1234') ).toBe(validationConsts.errDescrPasswordNoUpper);
        expect(service.isPasswordOK('PASS1234') ).toBe(validationConsts.errDescrPasswordNoLower);
        expect(service.isPasswordOK('pDfls127é')).toBe(validationConsts.errDescrPasswordBadChar);
        expect(service.isPasswordOK('yx4+#SUui:~I4(I0DHkX|7uPr' + '1'.repeat(50)))
            .toBe(validationConsts.errDescrPasswordTooLong);

        expect(service.isPasswordOK('yx4+#SUui:~I4(I0DHkX|7uPr')).toBe(true);
    });

    it('should check confirmation password', () =>
    {
        expect(service.isConfirmationPasswordOK(['',       ''])).toBe(false);
        expect(service.isConfirmationPasswordOK(['123',    ''])).toBe(false);
        expect(service.isConfirmationPasswordOK(['123', '123'])).toBe(true);
        expect(service.isConfirmationPasswordOK(['',    '123'])).toBe(false);
    });

   

    it('should check the validity of the country', () =>
    {
        expect(service.isCountryOK('Tunisia')).toBe(validationConsts.errDescrCountry);
        expect(service.isCountryOK('Tunisie')).toBe(validationConsts.errDescrCountry);
        expect(service.isCountryOK('TUN'    )).toBe(validationConsts.errDescrCountry);
        expect(service.isCountryOK('TN'     )).toBe(true);
        expect(service.isCountryOK('fr'     )).toBe(true);
        expect(service.isCountryOK('frA'    )).toBe(true);
        expect(service.isCountryOK('France' )).toBe(validationConsts.errDescrCountry);
        expect(service.isCountryOK('FRANCE' )).toBe(validationConsts.errDescrCountry);
        expect(service.isCountryOK('TND'    )).toBe(validationConsts.errDescrCountry);
        expect(service.isCountryOK('europe' )).toBe(validationConsts.errDescrCountry);

        expect(service.isCountryOK('usa'    )).toBe(validationConsts.errDescrCountry);
    });

    it('should check the validity of the postal code (fr only)', () =>
    {
        expect(service.isPostalCodeOK('fr',  ''     )).toBeFalsy();
        expect(service.isPostalCodeOK('fr',  '  '   )).toBeFalsy();
        expect(service.isPostalCodeOK('fr',  '7509' )).toBeFalsy();
        expect(service.isPostalCodeOK('tun', '75009')).toBe(validationConsts.errDescrCountry);
        expect(service.isPostalCodeOK('fr',  'cx123')).toBeFalsy();
        expect(service.isPostalCodeOK('fr',  'TN'   )).toBeFalsy();
        expect(service.isPostalCodeOK('fr',  'fr'   )).toBeFalsy();
        expect(service.isPostalCodeOK('fr',  'frA'  )).toBeFalsy();
        expect(service.isPostalCodeOK('fra', '75009')).toBeTrue();
        expect(service.isPostalCodeOK('fr',  '75009')).toBe(true);
        expect(service.isPostalCodeOK('fr',  '85001')).toBe(true);
    });

    it('should check the validity of the dates', () =>
    {
        // End date comes before start date
        expect(service.areDatesCorrect(new Date(2022, 1, 1), new Date(2021, 1, 1))).toBe(validationConsts.errDescrDates);

        // Start date = end date
        expect(service.areDatesCorrect(new Date(2022, 1, 1), new Date(2022, 1, 1))).toBe(validationConsts.errDescrDates);

        // same year
        expect(service.areDatesCorrect(new Date(2022, 1, 1), new Date(2023, 1, 1))).toBeTrue();

        // Test Previous Dates
        expect(service.areDatesCorrect(new Date(2020, 1, 1), new Date(2021, 1, 1))).toBeTrue();
    });

   

    it('should check the validity of phone numbers', () =>
    {
        expect(service.isPhoneNumberOK(""   )).toBe(validationConsts.errDescrPhone);
        expect(service.isPhoneNumberOK("  " )).toBe(validationConsts.errDescrPhone);

        expect(service.isPhoneNumberOK("33 1 84 20 72 58")).toBe(validationConsts.errDescrPhone);

        expect(service.isPhoneNumberOK("1 84 20 72 58"   )).toBe(validationConsts.errDescrPhone);
        expect(service.isPhoneNumberOK("184207258"       )).toBe(validationConsts.errDescrPhone);

        expect(service.isPhoneNumberOK("33 1.84.20.72.58")).toBe(validationConsts.errDescrPhone);
        expect(service.isPhoneNumberOK("1.84.20.72.58")   ).toBe(validationConsts.errDescrPhone);
        expect(service.isPhoneNumberOK("01.84.20.72.58")  ).toBeTrue();
        expect(service.isPhoneNumberOK("01-84-20-72-58")  ).toBeTrue();
    });


});