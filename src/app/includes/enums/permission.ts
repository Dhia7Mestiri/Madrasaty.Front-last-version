// Keep in sync with:
// Permission.cs

export enum Permission
{
    // === System Permissions
    None             = 0,
    ViewRoles        = 1,
    ManageRoles      = 2,

    // == Custom Permissions
    AddStudent       = 3,
    EditStudent      = 4,
    DeleteStudent    = 5,
    ViewStudents     = 6,

    AddCourse        = 7,
    EditCourse       = 8,
    DeleteCourse     = 9,
    ViewCourses      = 10,

    AddMoutoun       = 11,
    EditMoutoun      = 12,
    DeleteMoutoun    = 13,
    ViewMoutouns     = 14,

    AddExam          = 15,
    EditExam         = 16,
    DeleteExam       = 17,
    ViewExams        = 18,

    AddTasmii        = 19,
    EditTasmii       = 20,
    DeleteTasmii     = 21,
    ViewTasmiis      = 22,

    AddSchool        = 23,
    EditSchool       = 24,
    DeleteSchool     = 25,
    ViewSchools      = 26,

    AddTerm          = 27,
    EditTerm         = 28,
    DeleteTerm       = 29,
    ViewTerms        = 30,

    AddHoliday       = 31,
    EditHoliday      = 32,
    DeleteHoliday    = 33,
    ViewHolidays     = 34,

    AddPersonnel     = 35,
    EditPersonnel    = 36,
    DeletePersonnel  = 37,
    ViewPersonnel    = 38,

    AddClassroom     = 39,
    EditClassroom    = 40,
    DeleteClassroom  = 41,
    ViewClassrooms   = 42,

    AddDiscipline    = 43,
    EditDiscipline   = 44,
    DeleteDiscipline = 56,
    ViewDisciplines  = 57,

    ViewStatsAdmin   = 58,
    ViewStatsTeacher = 59,
    ViewStatsStudent = 60,

    ViewTajwidError  = 61,
    EditTajwidError  = 62,

    // All           = ~None
}