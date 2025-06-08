import { FormGroup } from '@angular/forms';
import { School } from '@models/school';

export function formToSchool(form: FormGroup, schoolId?: number): School {
    
    return {
        Id: schoolId ?? undefined,
        Name: form.value.Name,
        Street: form.value.Street,
        ZipCode:form.value.ZipCode,
        City: form.value.City,
        Country: form.value.Country,
        Siret: form.value.Siret,
        CodeTVA: form.value.CodeTVA,
        Photo: form.value.Photo,
    };
}
