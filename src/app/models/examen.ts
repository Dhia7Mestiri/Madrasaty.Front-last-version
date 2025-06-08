export class Examen
{
    Id: number;
    Name: string;
    SupervisorId: number;
    StartDate: Date;
    EndDate: Date;
    TermId: number;
    CourseId: number;
    Coefficient:number;
    IsDeleted : boolean;
}