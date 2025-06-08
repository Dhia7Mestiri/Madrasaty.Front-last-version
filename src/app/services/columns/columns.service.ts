import { ChangeDetectorRef, Inject, Injectable, OnDestroy, inject } from '@angular/core';
import { Permission } from '@enums/permission';
import { IClaim } from '@interfaces/claim';
import { IColumn } from '@interfaces/column';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ColumnsService implements OnDestroy {
    subscribtion = new Subscription();
    private translate = inject(TranslateService);

    getCoursesColumns(): IColumn[] {
        // <th style="width: 15%;" pSortableColumn="Description">Photo de l'enseignante</th>
        let translatedHeaders: any[]
        this.subscribtion.add(this.translate.get([
            'courses-list.discipline', 'courses-list.Lecturer', 'courses-list.Course',
            'courses-list.level', 'courses-list.Course', 'courses-list.Coefficient', 'courses-list.Actif'
        ]).subscribe({ next: values => translatedHeaders = values, error: errors => console.log(`Error Occured ${errors}`) }));
        return [
            { type: "number", field: 'Id', header: 'ID', css: 'text-center', sortable: true, filter: true, filterMatchMode: 'contains', width: '50px', customizable: true },
            { type: "text", field: 'DisciplineName', header: translatedHeaders['courses-list.discipline'], css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "text", field: 'SupervisorFullName', header: translatedHeaders['courses-list.Lecturer'], css: '', sortable: true, filter: true, filterMatchMode: 'contains', customizable: true },
            { type: "url", field: 'Name', header: translatedHeaders['courses-list.Course'], css: '', sortable: true, filter: true, filterMatchMode: 'contains', customizable: true },
            { type: "number", field: 'Level', header: translatedHeaders['courses-list.level'], css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "text", field: 'Coefficient', header: translatedHeaders['courses-list.Coefficient'], css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "boolean", field: 'Active', header: translatedHeaders['courses-list.Actif'], css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "button", field: 'edit', header: '', icon: 'far fa-pen-to-square text-success fs-3', css: 'fixed text-center', sortable: false, filter: false, customizable: false, width: '50px' },
            { type: "button", field: 'delete', header: '', icon: 'far fa-trash-alt text-danger fs-3', css: 'fixed text-center', sortable: false, filter: false, customizable: false, width: '50px' },
        ];
    }

    getMoutounsColumns(): IColumn[] {
        // <th style="width: 15%;" pSortableColumn="Description">Photo de l'enseignante</th>

        return [
            { type: "text", field: 'StudentFirstName', header: 'Étudiant', css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "text", field: 'SeanceTitle', header: 'Séance', css: '', sortable: true, filter: true, filterMatchMode: 'contains', customizable: true },
            { type: "text", field: 'PoemeTitle', header: 'Poéme', css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "number", field: 'VerseStart', header: 'Début', css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "number", field: 'VerseEnd', header: 'Fin', css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "number", field: 'Rating', header: 'Rating', css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "text", field: 'Remarques', header: 'Remarques', css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "date", field: 'Date', header: 'Date', css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "button", field: 'edit', header: '', icon: 'far fa-pen-to-square text-success fs-3', css: 'fixed text-center', sortable: false, filter: false, customizable: false, width: '50px' },
            { type: "button", field: 'delete', header: '', icon: 'far fa-trash-alt text-danger fs-3', css: 'fixed text-center', sortable: false, filter: false, customizable: false, width: '50px' },
        ];
    }

    getExamsColumns(): IColumn[] {
        // <th style="width: 15%;" pSortableColumn="Description">Photo de l'enseignante</th>
        let translatedHeaders: any[]
        this.subscribtion.add(this.translate.get([
            'Exams-list.RelatedTerm', 'Exams-list.ExamName', 'Exams-list.RelatedSupervisor',
            'Exams-list.Level', 'Exams-list.RelatedCourse', 'Exams-list.end-date', 'Exams-list.start-date','Exams-list.Coefficient','Exams-list.ExamStatus'
        ]).subscribe({ next: values => translatedHeaders = values, error: errors => console.log(`Error Occured ${errors}`) }));
        return [
            { type: "text", field: 'TermName', header: translatedHeaders['Exams-list.RelatedTerm'], css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "text", field: 'CourseName', header: translatedHeaders['Exams-list.RelatedCourse'], css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "text", field: 'SupervisorFullName', header: translatedHeaders['Exams-list.RelatedSupervisor'], css: '', sortable: true, filter: true, filterMatchMode: 'contains', customizable: true },
            { type: "text", field: 'Name', header: translatedHeaders['Exams-list.ExamName'], css: '', sortable: true, filter: true, filterMatchMode: 'contains', customizable: true },
            { type: "date", field: 'StartDate', header: translatedHeaders['Exams-list.start-date'], css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "time", field: 'EndDate', header: translatedHeaders['Exams-list.end-date'], css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "number", field: 'Coefficient', header: translatedHeaders['Exams-list.Coefficient'], css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "boolean", field: 'active', header: translatedHeaders['Exams-list.ExamStatus'], css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "button", field: 'edit', header: '', icon: 'far fa-pen-to-square text-success fs-3', css: 'fixed text-center', sortable: false, filter: false, customizable: false, width: '50px' },
            { type: "button", field: 'delete', header: '', icon: 'far fa-trash-alt text-danger fs-3', css: 'fixed text-center', sortable: false, filter: false, customizable: false, width: '50px' },
        ];
    }

    getTasmiisColumns(): IColumn[] {
        // <th style="width: 15%;" pSortableColumn="Description">Photo de l'enseignante</th>

        return [
            { type: "text", field: 'StudentFirstName', header: 'Étudiant', css: '', sortable: true, filter: true, filterMatchMode: 'contains', customizable: true },
            { type: "text", field: 'SeanceTitle', header: 'Séance', css: '', sortable: true, filter: true, filterMatchMode: 'contains', customizable: true },
            { type: "text", field: 'Surah', header: 'Surah', css: '', sortable: true, filter: true, filterMatchMode: 'contains', customizable: true },
            { type: "number", field: 'VerseStart', header: 'Début', css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "number", field: 'VerseEnd', header: 'Fin', css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "rating", field: 'Rating', header: 'Rating', css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "text", field: 'Remarques', header: 'Remarques', css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "date", field: 'Date', header: 'Date', css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "button", field: 'edit', header: '', icon: 'far fa-pen-to-square text-success fs-3', css: 'fixed text-center', sortable: false, filter: false, customizable: false, width: '50px' },
            { type: "button", field: 'delete', header: '', icon: 'far fa-trash-alt text-danger fs-3', css: 'fixed text-center', sortable: false, filter: false, customizable: false, width: '50px' },
        ];
    }

    getSchoolsColumns(): IColumn[] {
        // <th style="width: 15%;" pSortableColumn="Description">Photo de l'enseignante</th>
        let translatedHeaders: any[]
        console.log(this.translate.currentLang)
        this.subscribtion.add(this.translate.get([
            'schools-list.city', 'schools-list.country', 'schools-list.Name',
            'schools-list.Adress', 'schools-list.TVA', 'schools-list.PostCode', 'schools-list.Siret'
        ]).subscribe({ next: values => translatedHeaders = values, error: errors => console.log(`Error Occured ${errors}`) }));
        console.log("column service  is called ")

        // console.log(translatedHeaders['schools-list.Name'])

        return [
            { type: "image", field: 'Photo', header: 'Logo', css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: false },
            { type: "number", field: 'Id', header: 'ID', css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "url", field: 'Name', header: translatedHeaders['schools-list.Name'], css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "addr", field: 'Street', header: translatedHeaders['schools-list.Adress'], css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "date", field: 'ZipCode', header: translatedHeaders['schools-list.PostCode'], css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "text", field: 'City', header: translatedHeaders['schools-list.city'], css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "text", field: 'Country', header: translatedHeaders['schools-list.country'], css: '', sortable: true, filter: true, filterMatchMode: 'contains', customizable: true },
            { type: "text", field: 'CodeTVA', header: translatedHeaders['schools-list.TVA'], css: '', sortable: true, filter: true, filterMatchMode: 'contains', customizable: true },
            { type: "number", field: 'Siret', header: translatedHeaders['schools-list.Siret'], css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "button", field: 'edit', header: '', icon: 'far fa-pen-to-square text-success fs-3', css: 'fixed text-center', sortable: false, filter: false, customizable: false, width: '50px' },
            { type: "button", field: 'delete', header: '', icon: 'far fa-trash-alt text-danger fs-3', css: 'fixed text-center', sortable: false, filter: false, customizable: false, width: '50px' },

        ];

    }

    getTermsColumns(): IColumn[] {
        // <th style="width: 15%;" pSortableColumn="Description">Photo de l'enseignante</th>
        let translatedHeaders: any[]
        this.subscribtion.add(this.translate.get([
            'terms-list.start-date', 'terms-list.end-date', 'terms-list.Recurrence',
            'terms-list.RelatedSchool', 'terms-list.Name'
        ]).subscribe({ next: values => translatedHeaders = values, error: errors => console.log(`Error Occured ${errors}`) }));
        return [
            { type: "number", field: 'Id', header: 'ID', css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "url", field: 'Name', header: translatedHeaders['terms-list.Name'], css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "number", field: 'Recurrence', header: translatedHeaders['terms-list.Recurrence'], css: '', sortable: true, filter: true, filterMatchMode: 'contains', customizable: true },
            { type: "text", field: 'SchoolId', header: translatedHeaders['terms-list.RelatedSchool'], css: '', sortable: true, filter: true, filterMatchMode: 'contains', customizable: true },
            { type: "date", field: 'StartDate', header: translatedHeaders['terms-list.start-date'], css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "date", field: 'EndDate', header: translatedHeaders['terms-list.end-date'], css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "button", field: 'edit', header: '', icon: 'far fa-pen-to-square text-success fs-3', css: 'fixed text-center', sortable: false, filter: false, customizable: false, width: '50px' },
            { type: "button", field: 'delete', header: '', icon: 'far fa-trash-alt text-danger fs-3', css: 'fixed text-center', sortable: false, filter: false, customizable: false, width: '50px' },
            // { type: "date", field: 'EndDate',   header: 'Fin',        css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
        ];
    }

    getHolidaysColumns(): IColumn[] {
        // <th style="width: 15%;" pSortableColumn="Description">Photo de l'enseignante</th>
        //let translatedHeaders: any[]
        //this.subscribtion.add(this.translate.get([
         //   'holidays-list.start-date', 'holidays-list.end-date', 'holidays-list.school',
         //   'holidays-list.Holiday-name'
       // ]).subscribe({ next: values => translatedHeaders = values, error: errors => console.log(`Error Occured ${errors}`) }));
        return [
            { type: "text", field: 'Name', header: "Name", css: '', sortable: true, filter: true, filterMatchMode: 'contains', customizable: true },
            { type: "date", field: 'StartDate', header: "Start", css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "date", field: 'EndDate', header: "End", css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "button", field: 'edit', header: '', icon: 'far fa-pen-to-square text-success fs-3', css: 'fixed text-center', sortable: false, filter: false, customizable: false, width: '50px' },
            { type: "button", field: 'delete', header: '', icon: 'far fa-trash-alt text-danger fs-3', css: 'fixed text-center', sortable: false, filter: false, customizable: false, width: '50px' },
        ];
    }

    getPersonnelColumns(): IColumn[] {
        // <th style="width: 15%;" pSortableColumn="Description">Photo de l'enseignante</th>

        return [
            { type: "text", field: 'LastName', header: 'Nom', css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "text", field: 'FirstName', header: 'Prénom', css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "text", field: 'Email', header: 'Email', css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "text", field: 'BirthDate', header: 'Date de naissance', css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "text", field: 'PhoneNumber', header: 'Téléphone', css: '', sortable: true, filter: true, filterMatchMode: 'contains', customizable: true },
            { type: "number", field: 'State', header: 'Etat', css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "button", field: 'edit', header: '', icon: 'far fa-pen-to-square text-success fs-3', css: 'fixed text-center', sortable: false, filter: false, customizable: false, width: '50px' },
            { type: "button", field: 'delete', header: '', icon: 'far fa-trash-alt text-danger fs-3', css: 'fixed text-center', sortable: false, filter: false, customizable: false, width: '50px' },
        ];
    }

    getClassroomsColumns(): IColumn[] {
        // <th style="width: 15%;" pSortableColumn="Description">Photo de l'enseignante</th>
        let translatedHeaders: any[]
        this.subscribtion.add(this.translate.get([
            'classrooms-list.nbr-desks', 'classrooms-list.nbr-chairs', 'classrooms-list.nbr-projectors',
            'classrooms-list.RelatedSchool', 'classrooms-list.ClassroomCode'
        ]).subscribe({ next: values => translatedHeaders = values, error: errors => console.log(`Error Occured ${errors}`) }));
        return [
            { type: "number", field: 'Id', header: 'ID', css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "url", field: 'Name', header: translatedHeaders['classrooms-list.ClassroomCode'], css: '', sortable: true, filter: true, filterMatchMode: 'contains', customizable: true },
            { type: "text", field: 'SchoolId', header: translatedHeaders['classrooms-list.RelatedSchool'], css: '', sortable: true, filter: true, filterMatchMode: 'contains', customizable: true },
            { type: "number", field: 'NumberChair', header: translatedHeaders['classrooms-list.nbr-chairs'], css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "number", field: 'NumberDesk', header: translatedHeaders['classrooms-list.nbr-desks'], css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "number", field: 'NumberProjector', header: translatedHeaders['classrooms-list.nbr-projectors'], css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "button", field: 'edit', header: '', icon: 'far fa-pen-to-square text-success fs-3', css: 'fixed text-center', sortable: false, filter: false, customizable: false, width: '50px' },
            { type: "button", field: 'delete', header: '', icon: 'far fa-trash-alt text-danger fs-3', css: 'fixed text-center', sortable: false, filter: false, customizable: false, width: '50px' },
        ];
    }

    getDisciplinesColumns(): IColumn[] {
        // <th style="width: 15%;" pSortableColumn="Description">Photo de l'enseignante</th>
        let translatedHeaders: any[]
        this.subscribtion.add(this.translate.get([
            'disciplines-list.school'
        ]).subscribe({ next: values => translatedHeaders = values, error: errors => console.log(`Error Occured ${errors}`) }));
        return [
            { type: "text", field: 'Id', header: 'ID', css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "text", field: 'SchoolId', header: translatedHeaders['disciplines-list.school'], css: '', sortable: false, filter: false, filterMatchMode: 'contains', customizable: true },
            { type: "url", field: 'Name', header: 'Discipline', css: '', sortable: true, filter: true, filterMatchMode: 'contains', customizable: true },
            { type: "text", field: 'Description', header: 'Description', css: '', sortable: true, filter: true, filterMatchMode: 'contains', customizable: true },
            { type: "button", field: 'edit', header: '', icon: 'far fa-pen-to-square text-success fs-3', css: 'fixed text-center', sortable: false, filter: false, customizable: false, width: '50px' },
            { type: "button", field: 'delete', header: '', icon: 'far fa-trash-alt text-danger fs-3', css: 'fixed text-center', sortable: false, filter: false, customizable: false, width: '50px' },
        ];
    }

    getRbacColumns(): IColumn[] {
        // this.allRoles = [
        //     // { name: "Aucune", description: "Aucun Accès", image: "" },
        //     { id: 1, name: "Utilisateur",    description: "Privilèges Standards", image: "" },
        //     { id: 2, name: "Administrateur", description: "Aucune restriction",   image: "" },
        // ];

        return [
            {
                type: "button", field: 'edit', header: '', css: 'fixed text-center', sortable: false, filter: false, width: '50px', icon: 'bi bi-pencil-square',
                title: "Éditer les permissions pour ce rôle"  // ,   onlyOnMobile: false
            },
            { type: "text", field: 'Id',   header: 'ID',   css: 'text-center', sortable: true,   filter: true,  filterMatchMode: 'contains', width: '50px' },
            { type: "text", field: 'Name', header: 'Rôle', css: '', sortable: false, filter: false, filterMatchMode: 'contains' },

            // { type: "button", field: 'clone', header: '',  css: 'text-center', sortable: false, filter: false, width: '50px', icon: 'fas fa-copy',
            //   title: "Cloner ce rôle"
            // },

            {
                type: "button", field: 'ren', header: '', css: 'fixed text-center', sortable: false, filter: false, width: '50px', icon: 'fas fa-i-cursor',
                title: "Renommer ce rôle"
            },
            {
                type: "button", field: 'del', header: '', css: 'fixed text-center', sortable: false, filter: false, width: '50px', icon: 'bi bi-trash-fill',
                title: "Supprimer ce rôle"
            },
        ];
    }

    getUsersInRoleColumns(): IColumn[] {
        return [
            {
                type: "check", field: 'check', header: '', css: 'fixed text-center', sortable: false, filter: false, width: '50px', icon: '',
                title: "Sélectionner les utilisateurs"
            },

            // { type: "text", field: 'id',       header: 'ID',              sortable: false,  filter: false, filterMatchMode: 'contains', css: 'text-center', width: '50px' },
            { type: "text", field: 'UserName', header: 'Nom Utilisateur', sortable: true, filter: true, filterMatchMode: 'contains', css: '', },
            { type: "text", field: 'FullName', header: 'Nom', sortable: false, filter: false, filterMatchMode: 'contains', css: '', },
            { type: "text", field: 'SkypeId', header: 'Contact', sortable: false, filter: false, filterMatchMode: 'contains', css: '', },
            { type: "text", field: 'Email', header: 'Email', sortable: true, filter: true, filterMatchMode: 'contains', css: '', },

            {
                type: "button", field: 'roles', header: '', css: 'fixed text-center', sortable: false, filter: false, width: '50px', icon: 'fas fa-user-lock',
                title: "Voir les rôles pour cet utilisateur"
            },
            {
                type: "button", field: 'perm', header: '', css: 'fixed text-center', sortable: false, filter: false, width: '50px', icon: 'fas fa-list',
                title: "Voir les permissions pour cet utilisateur"
            },
        ];
    }

    getUsersListColumns(): IColumn[] {
        return [
            {
                type: "check", field: 'check', header: '', css: 'fixed text-center', sortable: false, filter: false, width: '50px', icon: '',
                title: "Sélectionner les utilisateurs"
            },
            // { type: "text", field: 'id',       header: 'ID',              sortable: true,  filter: true,  filterMatchMode: 'contains', css: 'd-none', width: '50px' },
            { type: "text", field: 'userName', header: 'Nom Utilisateur', sortable: true, filter: true, filterMatchMode: 'contains', css: '' },
            { type: "text", field: 'firstName', header: 'Prénom', sortable: false, filter: false, filterMatchMode: 'contains', css: '' },
            { type: "text", field: 'lastName', header: 'Nom', sortable: false, filter: false, filterMatchMode: 'contains', css: '' },
            { type: "email", field: 'email', header: 'Email', sortable: false, filter: false, filterMatchMode: 'contains', css: '' },
        ];
    }

    getPermissions(): IClaim[] {
        // Important: Keep this array in sync with enum defined in [ Permissions.cs ]
        return [
            // { name: "Tout",   description: "Aucune restriction" },
            // { name: "Aucune", description: "Aucun Accès"        },
            { value: Permission.ViewRoles, type: "Consultation des Rôles" },
            { value: Permission.ManageRoles, type: "Gestion des Rôles" },
            // { value: Permission.ViewUsers,   type: "Consultation des utilisateurs" },
            // { value: Permission.ManageUsers, type: "Gestion des utilisateurs"      },

            // { value: Permission.ViewAccessControl, type: "Consultation de la liste de contrôle d'accès" },
            // { value: Permission.ConfigureAccess,   type: "Gestion de la liste de contrôle d'accès"      },

            { value: Permission.AddStudent, type: "Ajout de étudiants" },
            { value: Permission.EditStudent, type: "Edition des étudiants" },
            { value: Permission.DeleteStudent, type: "Suppression des étudiants" },
            { value: Permission.ViewStudents, type: "Consultation des étudiants" },

            { value: Permission.AddCourse, type: "Ajout de cours" },
            { value: Permission.EditCourse, type: "Edition des cours" },
            { value: Permission.DeleteCourse, type: "Suppression des cours" },
            { value: Permission.ViewCourses, type: "Consultation des cours" },

            { value: Permission.AddClassroom, type: "Ajout de salle de cours" },
            { value: Permission.EditClassroom, type: "Edition des salles de cours" },
            { value: Permission.DeleteClassroom, type: "Suppression des salles de cours" },
            { value: Permission.ViewClassrooms, type: "Consultation des salles de cours" },



            { value: Permission.AddExam, type: "Ajout de examens" },
            { value: Permission.EditExam, type: "Edition des examens" },
            { value: Permission.DeleteExam, type: "Suppression des examens" },
            { value: Permission.ViewExams, type: "Consultation des examens" },

            { value: Permission.AddTasmii, type: "Ajout de tasmiis" },
            { value: Permission.EditTasmii, type: "Edition des tasmiis" },
            { value: Permission.DeleteTasmii, type: "Suppression des tasmiis" },
            { value: Permission.ViewTasmiis, type: "Consultation des tasmiis" },

            { value: Permission.AddSchool, type: "Ajout d'écoles" },
            { value: Permission.EditSchool, type: "Edition des écoles" },
            { value: Permission.DeleteSchool, type: "Suppression des écoles" },
            { value: Permission.ViewSchools, type: "Consultation des écoles" },

            { value: Permission.AddTerm, type: "Ajout de périodes" },
            { value: Permission.EditTerm, type: "Edition des périodes" },
            { value: Permission.DeleteTerm, type: "Suppression des périodes" },
            { value: Permission.ViewTerms, type: "Consultation des périodes" },

            { value: Permission.AddHoliday, type: "Ajout de vacances" },
            { value: Permission.EditHoliday, type: "Edition des vacances" },
            { value: Permission.DeleteHoliday, type: "Suppression des vacances" },
            { value: Permission.ViewHolidays, type: "Consultation des vacances" },

            { value: Permission.AddPersonnel, type: "Ajout d'employés" },
            { value: Permission.EditPersonnel, type: "Edition des employés" },
            { value: Permission.DeletePersonnel, type: "Suppression des employés" },
            { value: Permission.ViewPersonnel, type: "Consultation des employés" },

            { value: Permission.AddDiscipline, type: "Ajout de disciplines" },
            { value: Permission.EditDiscipline, type: "Edition des disciplines" },
            { value: Permission.DeleteDiscipline, type: "Suppression des disciplines" },
            { value: Permission.ViewDisciplines, type: "Consultation des disciplines" },

            { value: Permission.ViewStatsAdmin, type: "Consultation des statistiques pour administrateurs d'école" },
            { value: Permission.ViewStatsStudent, type: "Consultation des statistiques des étudiants" },
            { value: Permission.ViewStatsTeacher, type: "Consultation des statistiques du corps enseignant" },

            // { value: Permission.ViewLogs,          type: "Consultation des logs" },
            // { value: Permission.PurgeLogs,         type: "Suprimer les logs"     },

            // { value: Permission.ViewErrors,        type: "Consultation des erreurs" },
            // { value: Permission.DeleteError,       type: "Supprimer les erreurs"    },

            // { value: Permission.ViewBotStatus,     type: "Consultation des statuts bots"          },
            // { value: Permission.DeleteState,       type: "Supprimer une historique de statut bot" },
        ];
    }

    // getCustomRequestClientsColumns() : IColumn[]
    // {
    //     return [
    //         { type: "text",   field: 'refClient',     header: 'Ref. Client',         css: '', sortable: true,   filter: true,  filterMatchMode: 'contains' },
    //         { type: "text",   field: 'siret',         header: 'SIRET',               css: '', sortable: true,   filter: true,  filterMatchMode: 'contains' },
    //         { type: "text",   field: 'raisonSociale', header: 'Raison Sociale',      css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: "phone",  field: 'contactTel',    header: 'Contact Telelephone', css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: "email",  field: 'contactMail',   header: 'Contact Email',       css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },

    //         { type: 'email',   field: 'admMail',            header: 'AdmMail',            css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',    field: 'admNom',             header: 'AdmNom',             css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'phone',   field: 'admTel',             header: 'AdmTel',             css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'addr',    field: 'adresse1',           header: 'Adresse1',           css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',    field: 'adresse2',           header: 'Adresse2',           css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',    field: 'adresseBp',          header: 'AdresseBp',          css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',    field: 'adresseCp',          header: 'AdresseCp',          css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',    field: 'adressePays',        header: 'AdressePays',        css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'addr',    field: 'adresseVille',       header: 'AdresseVille',       css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'boolean', field: 'compteActif',        header: 'Compte Actif',       css: 'text-center', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'badge',   field: 'compteStatut',       header: 'Compte Statut',      css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'boolean', field: 'compteTest',         header: 'Compte Test',        css: 'text-center', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',    field: 'contactCivilite',    header: 'Contact Civilité',   css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'email',   field: 'contactMail',        header: 'Contact Email',      css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',    field: 'contactNom',         header: 'Contact Nom',        css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',    field: 'contactPrenom',      header: 'Contact Prénom',     css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'phone',   field: 'contactTel',         header: 'Contact Tél.',       css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'date',    field: 'dateDebutContrat',   header: 'DateDebutContrat',   css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'date',    field: 'dateFinContrat',     header: 'DateFinContrat',     css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',    field: 'libelle',            header: 'Libelle',            css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'tag',     field: 'options',            header: 'Options',            css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',    field: 'partenaire',         header: 'Partenaire',         css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',    field: 'refCompteDbmanager', header: 'RefCompteDbmanager', css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',    field: 'refComptePrincipal', header: 'RefComptePrincipal', css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',    field: 'refExterne',         header: 'N° Dossier ASPOne',  css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'date',    field: 'synchro1',           header: 'Dernière Modif.',    css: '', sortable: true,   filter: true,  filterMatchMode: 'contains' },
    //         { type: 'date',    field: 'synchro2',           header: 'Synchro2',           css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'email',   field: 'techMail',           header: 'TechMail',           css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',    field: 'techNom',            header: 'TechNom',            css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'phone',   field: 'techTel',            header: 'TechTel',            css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',    field: 'tva',                header: 'Tva',                css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',    field: 'wpnIdentifiant',     header: 'WpnIdentifiant',     css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',    field: 'wpnIdentparc',       header: 'WpnIdentparc',       css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //     ];
    // }

    // getContactsColumns() : IColumn[]
    // {
    //     return [
    //         { type: "text",  field: 'refClient',     header: 'Ref. Client',        css: '', sortable: true,   filter: true,  filterMatchMode: 'contains' },
    //         { type: "text",  field: 'raisonSociale', header: 'Raison Sociale',     css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: "email", field: 'contactMail',   header: 'Contact Email',      css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },

    //         { type: 'text',  field: 'contactPrenom', header: 'Contact Prénom',     css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',  field: 'contactNom',    header: 'Contact Nom',        css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: "phone", field: 'contactTel',    header: 'Contact Téléphone',  css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //     ];
    // }

    // getSansASPOneColumns() : IColumn[]
    // {
    //     return [
    //         { type: "text", field: 'refClient', header: 'Ref. Client', css: '', sortable: true, filter: true, filterMatchMode: 'contains' }
    //     ];
    // }

    // getSiretEnDoubleColumns() : IColumn[]
    // {
    //     return [
    //         { type: "text",  field: 'refClient',          header: 'Ref. Client',        css: '', sortable: true,   filter: true,  filterMatchMode: 'contains' },
    //         { type: "text",  field: 'raisonSociale',      header: 'Raison Sociale',     css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: "email", field: 'contactMail',        header: 'Contact Email',      css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',  field: 'refComptePrincipal', header: 'RefComptePrincipal', css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: "text",  field: 'siret',              header: 'SIRET',              css: '', sortable: true,   filter: true,  filterMatchMode: 'contains' },
    //         { type: 'text',  field: 'libelle',            header: 'Libelle',            css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },

    //         { type: 'addr',  field: 'adresse1',           header: 'Adresse1',           css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',  field: 'adresse2',           header: 'Adresse2',           css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',  field: 'adresseBp',          header: 'AdresseBp',          css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',  field: 'adresseCp',          header: 'AdresseCp',          css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'addr',  field: 'adresseVille',       header: 'AdresseVille',       css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',  field: 'adressePays',        header: 'AdressePays',        css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',  field: 'contactCivilite',    header: 'Civilité',           css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',  field: 'contactPrenom',      header: 'Contact Prénom',     css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',  field: 'contactNom',         header: 'Contact Nom',        css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: "phone", field: 'contactTel',         header: 'Contact Téléphone',  css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },

    //         { type: 'date',  field: 'dateDebutContrat',   header: 'DateDebutContrat',   css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'date',  field: 'dateFinContrat',     header: 'DateFinContrat',     css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'email', field: 'admMail',            header: 'AdmMail',            css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',  field: 'admNom',             header: 'AdmNom',             css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'phone', field: 'admTel',             header: 'AdmTel',             css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',  field: 'techNom',            header: 'TechNom',            css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'phone', field: 'techTel',            header: 'TechTel',            css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'email', field: 'techMail',           header: 'TechMail',           css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },

    //         { type: 'tag',     field: 'options',            header: 'Options',            css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'boolean', field: 'compteTest',         header: 'Compte Test',        css: 'text-center', sortable: false,  filter: false, filterMatchMode: 'contains' },

    //         { type: 'date',    field: 'synchro1',           header: 'Dernière Modif.',    css: '', sortable: true,  filter: true, filterMatchMode: 'contains' },
    //         { type: 'date',    field: 'synchro2',           header: 'Synchro2',           css: '', sortable: false, filter: false, filterMatchMode: 'contains' },

    //         { type: 'text',    field: 'refExterne',         header: 'N° Dossier ASPOne',  css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',    field: 'partenaire',         header: 'Partenaire',         css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',    field: 'wpnIdentifiant',     header: 'WpnIdentifiant',     css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',    field: 'wpnIdentparc',       header: 'WpnIdentparc',       css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',    field: 'refCompteDbmanager', header: 'RefCompteDbmanager', css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'badge',   field: 'compteStatut',       header: 'Compte Statut',      css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'boolean', field: 'compteActif',        header: 'Compte Actif',       css: 'text-center', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',    field: 'tva',                header: 'Tva',                css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //     ];
    // }

    // getNoTeleDeclareClientsColumns() : IColumn[]
    // {
    //     return [
    //         { type: "text",   field: 'refClient',           header: 'Ref. Client',           sortable: true,   filter: true,  filterMatchMode: 'contains' },
    //         { type: "text",   field: 'refComptePrincipal',  header: 'Ref. Compte Principal', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: "text",   field: 'siret',               header: 'SIRET',                 sortable: true,   filter: true,  filterMatchMode: 'contains' },
    //         { type: "text",   field: 'raisonSociale',       header: 'Raison Sociale',        sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: "phone",  field: 'contactTel',          header: 'Contact Telelephone',   sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: "email",  field: 'contactMail',         header: 'Contact Email',         sortable: false,  filter: false, filterMatchMode: 'contains' },

    //         { type: 'email',   field: 'admMail',            header: 'AdmMail',            css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',    field: 'admNom',             header: 'AdmNom',             css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'phone',   field: 'admTel',             header: 'AdmTel',             css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'addr',    field: 'adresse1',           header: 'Adresse1',           css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',    field: 'adresse2',           header: 'Adresse2',           css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',    field: 'adresseBp',          header: 'AdresseBp',          css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',    field: 'adresseCp',          header: 'AdresseCp',          css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',    field: 'adressePays',        header: 'AdressePays',        css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'addr',    field: 'adresseVille',       header: 'AdresseVille',       css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'boolean', field: 'compteActif',        header: 'Compte Actif',       css: 'text-center', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'badge',   field: 'compteStatut',       header: 'Compte Statut',      css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'boolean', field: 'compteTest',         header: 'Compte Test',        css: 'text-center', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',    field: 'contactCivilite',    header: 'Contact Civilité',   css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'email',   field: 'contactMail',        header: 'Contact Email',      css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',    field: 'contactNom',         header: 'Contact Nom',        css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',    field: 'contactPrenom',      header: 'Contact Prénom',     css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'phone',   field: 'contactTel',         header: 'Contact Tél.',       css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'date',    field: 'dateDebutContrat',   header: 'DateDebutContrat',   css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'date',    field: 'dateFinContrat',     header: 'DateFinContrat',     css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',    field: 'libelle',            header: 'Libelle',            css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'tag',     field: 'options',            header: 'Options',            css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',    field: 'partenaire',         header: 'Partenaire',         css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',    field: 'refCompteDbmanager', header: 'RefCompteDbmanager', css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',    field: 'refComptePrincipal', header: 'RefComptePrincipal', css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',    field: 'refExterne',         header: 'N° Dossier ASPOne',  css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'date',    field: 'synchro1',           header: 'Dernière Modif.',    css: '', sortable: true,   filter: true,  filterMatchMode: 'contains' },
    //         { type: 'date',    field: 'synchro2',           header: 'Synchro2',           css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'email',   field: 'techMail',           header: 'TechMail',           css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',    field: 'techNom',            header: 'TechNom',            css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'phone',   field: 'techTel',            header: 'TechTel',            css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',    field: 'tva',                header: 'Tva',                css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',    field: 'wpnIdentifiant',     header: 'WpnIdentifiant',     css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //         { type: 'text',    field: 'wpnIdentparc',       header: 'WpnIdentparc',       css: '', sortable: false,  filter: false, filterMatchMode: 'contains' },
    //     ];
    // }

    // getDictionnairesColumns() : IColumn[]
    // {
    //     return [
    //         { type: "text",  field: 'codificationEdi',        header: 'Codification',     sortable: true,  filter: true,  filterMatchMode: 'contains' },
    //         { type: "text",  field: 'repetabiliteFormulaire', header: 'Donnée répétable', sortable: false, filter: false, filterMatchMode: 'contains' },
    //         { type: "text",  field: 'codeEdi',                header: 'Code EDI',         sortable: false, filter: false, filterMatchMode: 'contains' },
    //         { type: "text",  field: 'segment',                header: 'Segment',          sortable: false, filter: false, filterMatchMode: 'contains' },
    //         { type: "text",  field: 'typeNad',                header: 'Type NAD',         sortable: false, filter: false, filterMatchMode: 'contains' },

    //         // ???
    //         // { type: "text",  field: 'sousType',            header: 'Sous-Type(EDIFICAS)',            sortable: false, filter: false, filterMatchMode: 'contains' },            

    //         // ???
    //         // { type: "text",  field: 'Autorise-négatif',    header: 'Autorise négatif (EDIFICAS)',    sortable: false, filter: false, filterMatchMode: 'contains' },            

    //         // ???
    //         // { type: "text",  field: 'Type-CCI',            header: 'Type CCI',                       sortable: false, filter: false, filterMatchMode: 'contains' },

    //         { type: "text",  field: 'libelle',                header: 'Libellé',                        sortable: false, filter: false, filterMatchMode: 'contains' },

    //         // ???
    //         // { type: "text",  field: 'comp',                header: 'Comparaison exercice précédent', sortable: false, filter: false, filterMatchMode: 'contains' },
    //     ];
    // }

    // getDeclFluxColumns() : IColumn[]
    // {
    //     // Déclarations: flux facturables
    //     return [
    //         { type: "text", field: 'declarantRefClient', header: 'Déclarant Ref. Client', sortable: false, filter: false, filterMatchMode: 'contains' },
    //         { type: "text", field: 'nomDossier',         header: 'Nom Dossier',           sortable: true,  filter: true,  filterMatchMode: 'contains' },

    //         { type: "text", field: 'declarationTypeLibelle', header: 'Type de déclaration', sortable: false, filter: false, filterMatchMode: 'contains' },
    //         { type: "text", field: 'recipientName',          header: 'Destinataire',        sortable: false, filter: false, filterMatchMode: 'contains' },

    //         { type: "date", field: 'periodStart', header: 'Date Premier Dépôt', sortable: false, filter: false, filterMatchMode: 'contains' },
    //         { type: "date", field: 'periodEnd',   header: 'Date Dernier Dépôt', sortable: false, filter: false, filterMatchMode: 'contains' },

    //         { type: "badge", field: 'firstStateHistoryName', header: 'Dernièr Résultat', sortable: false, filter: false, filterMatchMode: 'contains' },
    //     ];
    // }

    // getDeclarationsColumns() : IColumn[]
    // {
    //     // Déclarations
    //     return [
    //         { type: "date", field: 'dateDepot',          header: 'Date Dépôt',      sortable: true,  filter: true,  filterMatchMode: 'contains' },
    //         { type: "text", field: 'numDossier',         header: 'N° Dossier',      sortable: false, filter: false, filterMatchMode: 'contains' },
    //         { type: "text", field: 'nomDossier',         header: 'Nom Dossier',     sortable: true,  filter: true,  filterMatchMode: 'contains' },
    //         { type: "text", field: 'DeclarantSiren',     header: 'Déclarant SIREN', sortable: false, filter: false, filterMatchMode: 'contains' },
    //         { type: "text", field: 'declarantRefClient', header: 'Compte Client',   sortable: false, filter: false, filterMatchMode: 'contains' },

    //         { type: "date", field: 'periodStart',        header: 'Début Période',   sortable: false, filter: false, filterMatchMode: 'contains' },
    //         { type: "date", field: 'periodEnd',          header: 'Fin Période',     sortable: false, filter: false, filterMatchMode: 'contains' },

    //         { type: "badge", field: 'firstStateHistoryName',  header: 'Dernière Réponse (Code)', sortable: false, filter: false, filterMatchMode: 'contains' },
    //         { type: "text",  field: 'declarationTypeLibelle', header: 'Type de déclaration',     sortable: false, filter: false, filterMatchMode: 'contains' },
    //         { type: "text",  field: 'recipientName',          header: 'Destinataire',            sortable: false, filter: false, filterMatchMode: 'contains' },

    //         { type: "boolean", field: 'interchangeIsTest',        header: 'Test/Réel',          css: 'text-center', sortable: false, filter: false, filterMatchMode: 'contains' },
    //         { type: "boolean", field: 'firstStateHistoryIsFinal', header: 'Statut Final?',      css: 'text-center', sortable: false, filter: false, filterMatchMode: 'contains' },

    //         { type: "number",  field: 'interchangeId',            header: 'Interchange',        sortable: false, filter: false, filterMatchMode: 'contains' },
    //     ];
    // }

    // getLastDepositsColumns() : IColumn[]
    // {
    //     // Déclarations: Derniers dépots (par client)
    //     return [
    //         { type: "text",  field: 'refClient',              header: 'Ref. Client',         css: '', sortable: true, filter: true, filterMatchMode: 'contains' },
    //         { type: "text",  field: 'nomDossier',             header: 'Nom Dossier',         sortable: false, filter: false },
    //         { type: "date",  field: 'dateDepot',              header: 'Date Dépôt',          sortable: false, filter: false },
    //         { type: "text",  field: 'declarationTypeLibelle', header: 'Type de déclaration', sortable: false, filter: false },
    //         { type: "text",  field: 'recipientName',          header: 'Destinataire',        sortable: false, filter: false },
    //         { type: "badge", field: 'firstStateHistoryName',  header: 'Dernière État',       sortable: false, filter: false },
    //     ];
    // }

    // getRecentEventsColumns() : IColumn[]
    // {
    //     // Déclarations
    //     return this.getDeclarationsColumns();
    // }

    // getLastEventsColumns() : IColumn[]
    // {
    //     // Déclarations
    //     return this.getDeclarationsColumns();
    // }

    // getWebServiceLogsColumns() : IColumn[]
    // {
    //     return [
    //         // { type: "number", field: 'id',        header: 'ID',               sortable: false, filter: false, filterMatchMode: 'contains' },
    //         { type: "date", field: 'dateTime',       header: 'Date creation',    sortable: true,  filter: true,  filterMatchMode: 'contains' },
    //         { type: "text", field: 'adresseIp',      header: 'Adresse IP',       sortable: false, filter: false, filterMatchMode: 'contains' },            
    //         { type: "text", field: 'function',       header: 'Fonction',         sortable: false, filter: false, filterMatchMode: 'contains' },            
    //         { type: "text", field: 'questionAnswer', header: 'Question/Réponse', sortable: false, filter: false, filterMatchMode: 'contains' },            
    //         { type: "text", field: 'param',          header: 'Paramètre',        sortable: false, filter: false, filterMatchMode: 'contains' },            
    //     ];
    // }

    // getParametersColumns() : IColumn[]
    // {
    //     return [
    //         { type: "text", field: 'name',  header: 'Paramètre', sortable: true,  filter: true,  filterMatchMode: 'contains' },
    //         { type: "text", field: 'value', header: 'Valeur',    sortable: false, filter: false, filterMatchMode: 'contains' },
    //     ];
    // }
    ngOnDestroy(): void {
        this.subscribtion?.unsubscribe();
    }

}