import { FormGroup } from '@angular/forms';
import { Examen } from '@models/examen';

export function formToExamen(form: FormGroup, examenId?: number): Examen {
    
    return {
        Id: examenId ?? undefined,
        Name: form.value.Name,
        SupervisorId: form.value.SupervisorId,
        StartDate:form.value.StartDate,
        EndDate: form.value.EndDate,
        TermId: form.value.TermId,
        CourseId: form.value.CourseId,
        Coefficient: form.value.Coefficient,
        IsDeleted: form.value.IsDeleted  ?? false,
    };
}
