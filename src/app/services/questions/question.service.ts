import { SchoolYear } from 'src/app/models/schoolyear';
import { Classroom } from '@models/classroom';
import { School } from './../../models/school';
import { Moutoun } from './../../models/Moutoun';
import { Injectable        } from '@angular/core';

import { QuestionBase      } from './question-base';
import { InputQuestion     } from './question-input';
import { TextAreaQuestion  } from './question-textarea';
import { CheckboxQuestion  } from './question-checkbox';
import { DropdownQuestion  } from './question-dropdown';
import { HeaderQuestion    } from './question-header';
import { ListQuestion      } from './question-list';
import { TagQuestion       } from './question-tag';
import { DateTimeQuestion  } from './question-datetime';
import { NumberQuestion    } from './question-number';

// import { IClient           } from '@interfaces/client';
// import { IClientY2         } from '@interfaces/y2-client';
// import { IContactY2        } from '@interfaces/y2-contact';
// import { IEmailAlert       } from '@interfaces/email-alert';
import { Course            } from '@models/course';

import { FormChangeService } from '@services/form-change/form-change.service';
import { ValidationService } from '@services/validation-service/validation.service';

import * as validationConsts from '@consts/validation.consts';
import { Discipline } from '@models/discipline';
import { Holiday } from '@models/holiday';
import { Examen } from '@models/examen';
import { Member } from '@models/member';


@Injectable({
    providedIn: 'root'  // Provides service in AppModule
})
export class QuestionService
{
    constructor(private validation: ValidationService, private formChange: FormChangeService)
    {}

    registerAccountQuestions()
    {
        let order = 0;

        const questions: QuestionBase<any>[] =
        [
            new InputQuestion({
                key      : 'email',
                label    : 'Adresse Email',
                type     : 'email',
                value    : '',
                required : true,
                order    : ++order,
                minLength: 6,
                maxLength: 100,
            }),

            new InputQuestion({
                key      : 'password',
                label    : 'Mot de passe',
                type     : 'password',
                value    : '',
                required : true,
                order    : ++order,
                minLength: 8,
                maxLength: 250,
            }),

            new InputQuestion({
                key      : 'confirmPassword',
                label    : 'Confirmer votre mot de passe',
                type     : 'password',
                value    : '',
                required : true,
                order    : ++order,
                minLength: 8,
                maxLength: 250,
            })
        ];

        return questions;  // .sort((a, b) => a.order - b.order);
    }

    newClientAccountQuestions(isMultiStep: boolean, step?: number)
    {
        let order = 0;

        // const dateDebutContrat = client?.dateDebutContrat ? new Date(client?.dateDebutContrat) : new Date();
        // const dateFinContrat   = client?.dateFinContrat   ? new Date(client?.dateFinContrat)   : undefined;
        // const siret            = +(client?.siret?.toString().trim() || '');

        let questions: QuestionBase<any>[] = [];
        if (!step || step == 1)
        {
            questions =
            [
                new InputQuestion({
                    key         : 'refClient',
                    label       : 'Ref. Client',
                    value       : '',  // client?.refClient?.trim() ?? '',
                    required    : true,
                    readOnly    : false,  // client?.refClient?.trim() ? true : false,
                    order       : ++order,
                    ///validationFn: this.validation.isRefClientValid,
                    minLength   : 3,
                    maxLength   : 100,
                    step        : 1,
                    newRow      : true,
                    rowColumns  : 2,
                }),
                new InputQuestion({
                    key         : 'password',
                    label       : 'Mot de passe',
                    type        : 'text',
                    value       : '',  // client?.pwd ?? '',
                    required    : true,
                    order       : ++order,
                    separator   : false,  // client ? true: false,
                    validationFn: this.validation.isPasswordOK,
                    step        : 1,  // client ? 1 : 2,
                }),
                // new InputQuestion({
                //     key         : 'confirmPassword',
                //     label       : 'Mot de passe (Confirmation)',
                //     type        : 'password',
                //     value       : '',
                //     required    : true,
                //     order       : ++order,
                //     minLength   : 8,
                //     maxLength   : 250,
                //     dependOn    : 'password',
                //     validationFn: this.validation.isConfirmationPasswordOK,
                //     step        : client ? 1: 2,
                // }),
                new NumberQuestion({
                    key         : 'siret',
                    label       : 'SIRET',
                    value       : null,   // siret ?? null,  // client?.siret?.trim() ?? '',
                    required    : true,
                    separator   : false,  // client ? true: false,
                    order       : ++order,
                    minLength   : 14,
                    maxLength   : 14,
                    validationFn: this.validation.isLuhnValid,
                    step        : 1,  // client ? 1 : 2,
                    newRow      : true,
                    rowColumns  : 3,
                }),
                new InputQuestion({
                    key      : 'raisonSociale',
                    label    : 'Raison sociale',
                    value    : '',  // client?.raisonSociale?.trim() ?? '',
                    required : true,
                    order    : ++order,
                    minLength: 2,
                    maxLength: 250,
                    step     : 1,  // client ? 1 : 2,
                }),
                new InputQuestion({
                    key      : 'libelle',
                    label    : 'Libelle',
                    value    : '',  // client?.libelle?.trim() ?? '',
                    required : false,
                    separator: false,
                    order    : ++order,
                    step     : 1,  // client ? 1 : 2,
                }),
                // new InputQuestion({
                //     key      : 'notes',
                //     label    : 'Notes ',
                //     type     : 'textarea',
                //     rows     : 2,
                //     value    : '',
                //     required : false,
                //     order    : ++order,
                //     minLength: 8,
                //     maxLength: 250,
                //     step     : client ? 1 : 2,
                // }),
                new DropdownQuestion({
                    key       : 'compteStatut',
                    label     : 'Statut du Compte',
                    type      : 'dropdown',
                    options   : [
                        { key : "Enregistré",              value: "REGISTERED"           },
                        { key : "Fermé",                   value: "CLOSED"               },
                        { key : "Création en cours",       value: "CREATION_IN_PROGRESS" },
                        { key : "BO Rejeté",               value: "BO_REJECTED"          },
                        { key : "BO Validé",               value: "BO_VALIDATED"         },
                        { key : "En attente des fichiers", value: "WAIT_FOR_FILES"       },
                        { key : "Création suspendu",       value: "CREATION_SUSPENDED"   },
                        // { key: , value:  },
                        // { key : "Rafraichit l'information", value: "REFRESH"    },
                        // { key : "Désactive le compte",      value: "DISABLE"    }
                    ],
                    value     : '',  // client?.compteStatut?.trim() ?? '',
                    required  : false,
                    order     : ++order,
                    separator : true,
                    minLength : 3,
                    onChangeFn: this.formChange.updateAccountStatus,
                    step      : 1,  // client ? 1: 2,
                    newRow    : true,
                }),
                new CheckboxQuestion({
                    id       : 'compteTest',
                    key      : 'compteTest',
                    label    : 'Compte de test?',
                    value    : false,  // client?.compteTest ?? false,
                    required : false,
                    readOnly : false,  // client != undefined,
                    order    : ++order,
                    step     : 1,  // client ? 1 : 2,
                    newRow   : true,
                }),
                new InputQuestion({
                    key       : 'refExterne',
                    label     : 'N° Dossier ASPOne',
                    value     : '',  // client?.refExterne?.trim() ?? '',
                    required  : false,
                    separator : true,
                    order     : ++order,
                    step      : 1,  // client ? 1 : 2,
                    newRow    : true,
                    rowColumns: 2,
                }),
                new InputQuestion({
                    key     : 'anciencompteclientcfy2',
                    label   : 'Ancien Compte Client (cf Y2)',
                    value   : '',
                    required: false,
                    order   : ++order,
                    step    : 1,  // client ? 1 : 2,
                }),
            ];
        }

        // Adresse
        if (!step || step == 2)
        {
            questions.push(
                new InputQuestion({
                    key       : 'adresse1',
                    label     : 'N° + nom de rue',
                    value     : '',  // client?.adresse1?.trim() ?? '',
                    required  : false,
                    order     : ++order,
                    minLength : 3,
                    separator : !isMultiStep,
                    step      : 2,  // client ? 2 : 3,
                    newRow    : true,
                    rowColumns: 2,
                }),
                new InputQuestion({
                    key      : "adresse2",
                    label    : "Complement d'adresse",
                    value    : '',  // client?.adresse2?.trim() ?? '',
                    required : false,
                    order    : ++order,
                    step     : 2,  // client ? 2 : 3,
                }),
                new InputQuestion({
                    key       : 'adresseBp',
                    label     : 'Boite postale',
                    value     : '',  // client?.adresseBp?.trim() ?? '',
                    required  : false,
                    order     : ++order,
                    step      : 2,  // client ? 2 : 3,
                    newRow    : true,
                    rowColumns: 2,
                }),
                new InputQuestion({
                    key      : 'adresseCp',
                    label    : 'Code postale',
                    value    : '',  // client?.adresseCp?.trim() ?? '',
                    required : false,
                    order    : ++order,
                    // validationFn: this.validation.isPostalCodeOK,
                    minLength: 2,
                    step     : 2,  // client ? 2:  3,
                }),
                new InputQuestion({
                    key       : 'adresseVille',
                    label     : 'Ville',
                    value     : '',  // client?.adresseVille?.trim() ?? '',
                    required  : false,
                    order     : ++order,
                    minLength : 2,
                    step      : 2,  // client ? 2: 3,
                    newRow    : true,
                    rowColumns: 2,
                }),
                new InputQuestion({
                    key         : 'adressePays',
                    label       : 'Pays',
                    value       : '',  // client?.adressePays?.trim() ?? '',
                    required    : false,
                    order       : ++order,
                    validationFn: this.validation.isCountryOK,
                    minLength   : 2,
                    step        : 2,  // client ? 2: 3,
                }),
            );
        }

        /* Contrat
        if (!step || step == 3)
        {
            questions.push(
                new DateTimeQuestion({
                    key       : 'dateDebutContrat',
                    label     : 'Début Contrat',
                    type      : 'datetime',          // datetime-local',
                    value     : new Date(dateDebutContrat.toLocaleString()),
                    required  : true,
                    order     : ++order,
                    minLength : 8,
                    maxLength : 250,
                    separator : !isMultiStep,
                    step      : client ? 3 : 4,
                    newRow    : true,
                    rowColumns: 2,
                }),
                new DateTimeQuestion({
                    key      : 'dateFinContrat',
                    label    : 'Fin Contrat',
                    type     : 'datetime',          // datetime-local',
                    value    : dateFinContrat ? new Date(dateFinContrat.toLocaleString()) : undefined,   // datePipe.transform(client?.dateFinContrat, 'yyyy-MM-dd'),
                    required : false,
                    order    : ++order,
                    minLength: 8,
                    maxLength: 250,
                    step     : client ? 3 : 4,
                }),
                new InputQuestion({
                    key         : 'tva',
                    label       : 'Tva Intracom',
                    value       : client?.tva?.trim() ?? '',
                    required    : false,
                    order       : ++order,
                    minLength   : 4,
                    maxLength   : 14,
                    validationFn: this.validation.isTvaOK,
                    step        : client ? 3 : 4,
                    newRow      : true,
                }),
                    // Abonnements : Tags
                // new TagQuestion({
                //     key      : 'tagsAbonnements',
                //     label    : 'Abonnements',
                //     type     : 'tag',
                //     value    : ['DSN', 'DRP'],
                //     options  : [
                //         { key: 'DADS-U',  value: 'DADS-U'  },
                //         { key: 'DSN',     value: 'DSN'     },
                //         { key: 'WEB_TVA', value: 'Web TVA' },
                    //         { key: 'TDFC',         value: 'TDFC'         },
                //         { key: 'REQUETTE',     value: 'REQUETTE'     },
                //         { key: 'WEB_PAIEMENT', value: 'Web Paiement' },
                    //         { key: 'TVA',         value: 'TVA'         },
                //         { key: 'IR',          value: 'IR'          },
                //         { key: 'WEB_REQUETE', value: 'Web Requête' },
                    //         { key: 'DUCS', value: 'DUCS' },
                //         { key: 'DRP',  value: 'DRP'  },
                //         { key: 'DUE',  value: 'DUE'  },
                //         { key: 'DPAE', value: 'DPAE' },
                    //         { key: 'Paiement', value: 'Paiement' },
                //         { key: 'OGA',      value: 'OGA'      },
                //         { key: 'AED',      value: 'AED'      },
                //         { key: 'PART',     value: 'PART'     },
                //         { key: 'DSI',      value: 'DSI'      },
                //         { key: 'WEB_TDFC', value: 'Web TDFC' }
                //     ],
                //     separator: false,
                //     required : false,
                //     order    : ++order,
                // }),
                    // new HeaderQuestion({
                //     key      : 'HeaderAbonnements',
                //     label    : 'Abonnements',
                //     type     : 'header',
                //     value    : 3,
                //     separator: false,
                //     required : false,
                //     order    : ++order,
                // }),
                // Abonnements : à modifier 
                new ListQuestion({
                    key      : 'options',  // listAbonnements
                    label    : 'Abonnements',
                    separator: true,
                    value    : client?.options?.split(',') ?? [],  // Syntax =     value: ['DADS-U', 'TVA', 'TDFC'],
                    options  : [
                        { key: 'DADS-U',  value: 'DADS-U'  },
                        { key: 'DSN',     value: 'DSN'     },
                        { key: 'WEB_TVA', value: 'Web TVA' },
                            { key: 'TDFC',         value: 'TDFC'         },
                        { key: 'REQUETTE',     value: 'REQUETTE'     },
                        { key: 'WEB_PAIEMENT', value: 'Web Paiement' },
                            { key: 'TVA',         value: 'TVA'         },
                        { key: 'IR',          value: 'IR'          },
                        { key: 'WEB_REQUETE', value: 'Web Requête' },
                            { key: 'DUCS', value: 'DUCS' },
                        { key: 'DRP',  value: 'DRP'  },
                        { key: 'DUE',  value: 'DUE'  },
                        { key: 'DPAE', value: 'DPAE' },
                            { key: 'Paiement', value: 'Paiement' },
                        { key: 'OGA',      value: 'OGA'      },
                        { key: 'AED',      value: 'AED'      },
                        { key: 'PART',     value: 'PART'     },
                        { key: 'DSI',      value: 'DSI'      },
                        { key: 'WEB_TDFC', value: 'Web TDFC' }
                    ],
                    required    : false,
                    validationFn: this.validation.areOptionsOK,
                    order       : ++order,
                    step        : client ? 3 : 4,
                    newRow      : true,
                }),
            );
        }

        // Contacts / Responsables
        if (!step || step == 4)
        {
            questions.push(
                // Contact Responsable
                new HeaderQuestion({
                    key      : 'headerResponsable',
                    label    : 'Responsable',
                    type     : 'header',
                    value    : 3,
                    separator: false,
                    required : false,
                    order    : ++order,
                    step     : client ? 4 : 5,
                    newRow   : true,
                }),
                new DropdownQuestion({
                    key      : 'contactCivilite',
                    label    : 'Salutation',
                    type     : 'dropdown',
                    options  : [
                        { key: 'Mr',   value: 'MR'   },
                        { key: 'Mme',  value: 'MS'   },
                        { key: 'Mlle', value: 'MISS' }
                    ],
                    value     : client?.contactCivilite?.trim() ?? undefined,
                    required  : false,
                    order     : ++order,
                    minLength : 2,
                    maxLength : 4,
                    step      : client ? 4 : 5,
                    newRow    : true,
                    rowColumns: 3,
                }),
                new InputQuestion({
                    key      : 'contactNom',
                    label    : 'Nom',
                    value    : client?.contactNom?.trim() ?? '',
                    required : false,
                    order    : ++order,
                    minLength: 8,
                    maxLength: 250,
                    step     : client ? 4 : 5,
                }),
                new InputQuestion({
                    key      : 'contactPrenom',
                    label    : 'Prénom',
                    value    : client?.contactPrenom?.trim() ?? '',
                    required : false,
                    order    : ++order,
                    minLength: 8,
                    maxLength: 250,
                    step     : client ? 4 : 5,
                }),
                new InputQuestion({
                    key         : 'contactTel',
                    label       : 'Téléphone',
                    type        : 'tel',
                    value       : client?.contactTel?.trim() ?? '',
                    required    : false,
                    order       : ++order,
                    pattern     : validationConsts.phone,
                    validationFn: this.validation.isPhoneNumberOK,
                    minLength   : 1,
                    maxLength   : 15,
                    step        : client ? 4: 5,
                    newRow      : true,
                    rowColumns  : 2,
                }),
                new InputQuestion({
                    key      : 'contactMail',
                    label    : 'Email',
                    type     : 'email',
                    value    : client?.contactMail?.trim() ?? '',
                    required : false,
                    order    : ++order,
                    minLength: 6,
                    maxLength: 250,
                    step     : client ? 4 : 5,
                }),
             
                // Contact technique ou d'exploitation
                new HeaderQuestion({
                    key      : 'headerResponsableTech',
                    label    : 'Responsable Contact Technique',
                    type     : 'header',
                    value    : 4,
                    separator: false,
                    required : false,
                    order    : ++order,
                    step     : client ? 4 : 5,
                    newRow   : true,
                }),
                new CheckboxQuestion({
                    key      : 'contactTechniqueIdemResponsable',
                    label    : 'Même Responsable?',
                    type     : 'checkbox',
                    value    : false,
                    required : false,
                    order    : ++order,
                    step     : client ? 4 : 5,
                    newRow   : true,
                }),
                new InputQuestion({
                    key       : 'techNom',
                    label     : 'Nom',
                    value     : client?.techNom?.trim() ?? '',
                    required  : false,
                    dependOn  : 'contactTechniqueIdemResponsable',
                    order     : ++order,
                    minLength : 8,
                    maxLength : 250,
                    step      : client ? 4 : 5,
                    newRow    : true,
                    rowColumns: 3,
                }),
                new InputQuestion({
                    key         : 'techTel',
                    label       : 'Téléphone',
                    type        : 'tel',
                    value       : client?.techTel?.trim() ?? '',
                    required    : false,
                    dependOn    : 'contactTechniqueIdemResponsable',
                    order       : ++order,
                    pattern     : validationConsts.phone,
                    validationFn: this.validation.isPhoneNumberOK,
                    minLength   : 1,
                    maxLength   : 15,
                    step        : client ? 4: 5,
                }),
                new InputQuestion({
                    key      : 'techMail',
                    label    : 'Email',
                    type     : 'email',
                    value    : client?.techMail ?? '',
                    required : false,
                    dependOn : 'contactTechniqueIdemResponsable',
                    order    : ++order,
                    minLength: 6,
                    maxLength: 250,
                    step     : client ? 4 : 5,
                }),
                // FIN Contact d'exploitation
                    // Contact administratif ou comptable
                new HeaderQuestion({
                    key      : 'headerResponsableAdministratif',
                    label    : 'Contact administratif ou comptable',
                    type     : 'header',
                    value    : 3,   // 3 = <H3> tag
                    separator: false,
                    required : false,
                    order    : ++order,
                    step     : client ? 4 : 5,
                    newRow   : true,
                }),
                new CheckboxQuestion({
                    key      : 'contactAdministratifIdemResponsable',
                    label    : 'Même Responsable?',
                    type     : 'checkbox',
                    value    : false,
                    required : false,
                    order    : ++order,
                    minLength: 8,
                    maxLength: 250,
                    step     : client ? 4 : 5,
                    newRow   : true,
                }),
                new InputQuestion({
                    key       : 'admNom',
                    label     : 'Nom',
                    value     : client?.admNom?.trim() ?? '',
                    required  : false,
                    dependOn  : 'contactAdministratifIdemResponsable',
                    order     : ++order,
                    minLength : 8,
                    maxLength : 250,
                    step      : client ? 4 : 5,
                    newRow    : true,
                    rowColumns: 3,
                }),
                new InputQuestion({
                    key         : 'admTel',
                    label       : 'Téléphone',
                    type        : 'tel',
                    value       : client?.admTel?.trim() ?? '',
                    required    : false,
                    dependOn    : 'contactAdministratifIdemResponsable',
                    order       : ++order,
                    pattern     : validationConsts.phone,
                    validationFn: this.validation.isPhoneNumberOK,
                    minLength   : 1,
                    maxLength   : 15,
                    step        : client ? 4 : 5,
                }),
                new InputQuestion({
                    key      : 'admMail',
                    label    : 'Email',
                    type     : 'email',
                    value    : client?.admMail?.trim() ?? '',
                    required : false,
                    dependOn : 'contactAdministratifIdemResponsable',
                    order    : ++order,
                    minLength: 6,
                    maxLength: 250,
                    step     : client ? 4 : 5,
                }),
                // TODO: Finish Associated Accounts
                new ListQuestion({
                    key      : 'listRelatedAccount',
                    label    : 'Comptes Associés',
                    value    : client?.refComptePrincipal?.split(',') ?? [],  // Syntax =     value: ['DADS-U', 'TVA', 'TDFC'],
                    separator: false,
                    required : false,
                    order    : ++order,
                    step     : client ? 4 : 5,
                    newRow   : true,
                }),
            );
        }
        // */

        return questions;  // .sort((a, b) => a.order - b.order);
    }

    // y2Questions(client?: IClientY2)
    // {
    //     let order = 0;
    //     const dateDebutContrat = client?.dateDebutContrat ? new Date(client?.dateDebutContrat) : new Date();
    //     const dateFinContrat   = client?.dateFinContrat   ? new Date(client?.dateFinContrat)   : undefined;

    //     const dateMiseEnService   = client?.dateMiseEnService   ? new Date(client?.dateMiseEnService)   : new Date();
    //     const dateMiseHorsService = client?.dateMiseHorsService ? new Date(client?.dateMiseHorsService) : undefined;

    //     const questions: QuestionBase<any>[] =
    //     [
    //         new InputQuestion({
    //             key       : 'login',
    //             label     : 'Identifiant ASPOne',
    //             value     : client?.login,
    //             readOnly  : true,
    //             order     : ++order,
    //             newRow    : true,
    //             rowColumns: 3,
    //         }),
    //         new InputQuestion({
    //             key      : 'pwd',
    //             label    : 'Mot de passe ASPOne',
    //             type     : 'password',
    //             value    : client?.pwd ?? '',
    //             readOnly : true,
    //             order    : ++order,
    //         }),
    //         new NumberQuestion({
    //             key      : 'siret',
    //             label    : 'SIRET',
    //             type     : 'number',
    //             value    : client?.siret ?? undefined,
    //             readOnly : true,
    //             order    : ++order,
    //             step     : 1,
    //         }),
    //         new InputQuestion({
    //             key       : 'oldId',
    //             label     : 'Identifiant DB Manager',
    //             value     : client?.oldId ?? '',
    //             readOnly  : true,
    //             order     : ++order,
    //             step      : 1,
    //             newRow    : true,
    //             rowColumns: 2,
    //         }),
    //         new InputQuestion({
    //             key      : 'codeTiersGroupe',
    //             label    : 'Identifiant Société Mère',
    //             value    : client?.codeTiersGroupe ?? '',
    //             readOnly : true,
    //             order    : ++order,
    //             step     : 1,
    //         }),
    //         new DateTimeQuestion({
    //             key       : 'dateDebutContrat',
    //             label     : 'Début Contrat',
    //             type      : 'datetime',
    //             value     : new Date(dateDebutContrat.toLocaleString()),
    //             readOnly  : true,
    //             separator : true,
    //             order     : ++order,
    //             step      : 1,
    //             newRow    : true,
    //             rowColumns: 2,
    //         }),
    //         new DateTimeQuestion({
    //             key      : 'dateFinContrat',
    //             label    : 'Fin Contrat',
    //             type     : 'datetime',
    //             value    : dateFinContrat ? new Date(dateFinContrat.toLocaleString()) : undefined,
    //             readOnly : true,
    //             separator: false,
    //             order    : ++order,
    //             step     : 1,
    //         }),
    //         new HeaderQuestion({
    //             key      : 'HeaderEtatsRéglementaires',
    //             label    : 'États Réglementaires',
    //             type     : 'header',
    //             value    : 3,
    //             readOnly : true,
    //             separator: false,
    //             order    : ++order,
    //             newRow   : true,
    //         }),
    //         new InputQuestion({
    //             key       : 'versionSER',
    //             label     : 'Version',
    //             value     : client?.versionSER ?? '',
    //             readOnly  : true,
    //             separator : false,
    //             order     : ++order,
    //             step      : 1,
    //             newRow    : true,
    //             rowColumns: 2,
    //         }),
    //         new InputQuestion({
    //             key      : 'cleSER',
    //             label    : 'Clé',
    //             value    : client?.cleSER ?? '',
    //             readOnly : true,
    //             separator: false,
    //             order    : ++order,
    //             step     : 1,
    //         }),
    //         new HeaderQuestion({
    //             key      : 'HeaderEtatsRéglementairesInfoDécodé',
    //             label    : 'Informations décodées à partir de la clé',
    //             type     : 'header',
    //             value    : 3,
    //             readOnly : true,
    //             separator: false,
    //             order    : ++order,
    //             newRow   : true,
    //         }),
    //         new InputQuestion({
    //             key       : 'refClient',
    //             label     : 'Ref. Client',
    //             value     : '',      // decodeCleSER()
    //             readOnly  : true,
    //             separator : false,
    //             order     : ++order,
    //             step      : 1,
    //             newRow    : true,
    //             rowColumns: 3,
    //         }),
    //         new InputQuestion({
    //             key      : 'nbPostes',
    //             label    : 'Nombre de Postes',
    //             type     : 'number',
    //             value    : '1',      // TODO: decodeCleSER()
    //             readOnly : true,
    //             separator: false,
    //             order    : ++order,
    //             step     : 1,
    //         }),
    //         new InputQuestion({
    //             key      : 'version',
    //             label    : 'Version',
    //             value    : '',      // TODO: decodeCleSER()
    //             readOnly : true,
    //             separator: false,
    //             order    : ++order,
    //             step     : 1,
    //         }),
    //         new ListQuestion({
    //             key      : 'options',
    //             label    : 'Options',
    //             separator: true,

    //             // TODO: decodeCleSER()
    //             value    : client?.options?.split(',') ?? [],  // Syntax =     value: ['DADS-U', 'TVA', 'TDFC'],
    //             options  : [
    //                 { key: 'option-1', value: 'option-1' },
    //                 { key: 'option-2', value: 'option-2' },
    //                 { key: 'option-3', value: 'option-3' }
    //             ],
    //             readOnly : true,
    //             order    : ++order,
    //             step     : 1,
    //             newRow   : true,
    //         }),
    //         // new HeaderQuestion({
    //         //     key      : 'HeaderDateMiseEnService',
    //         //     label    : 'Date de mise en service',
    //         //     type     : 'header',
    //         //     value    : 3,
    //         //     separator: false,
    //         //     order    : ++order,
    //         // }),
    //         new DateTimeQuestion({
    //             key       : 'dateMiseEnService',
    //             label     : 'Date de mise en service',
    //             type      : 'datetime',
    //             value     : dateMiseEnService,
    //             readOnly  : true,
    //             separator : true,
    //             order     : ++order,
    //             step      : 1,
    //             newRow    : true,
    //             rowColumns: 2,
    //         }),
    //         new DateTimeQuestion({
    //             key      : 'dateMiseHorsService',
    //             label    : 'Date de mise hors service',
    //             type     : 'datetime',
    //             value    : dateMiseHorsService,
    //             readOnly : true,
    //             separator: false,
    //             order    : ++order,
    //             step     : 1,
    //         }),
    //         new InputQuestion({
    //             key       : 'formeJuridique',
    //             label     : 'Forme Juridique',
    //             value     : client?.formeJuridique ?? '',
    //             readOnly  : true,
    //             separator : true,
    //             order     : ++order,
    //             step      : 1,
    //             newRow    : true,
    //             rowColumns: 2,
    //         }),
    //         new InputQuestion({
    //             key      : 'raisonSociale',
    //             label    : 'Raison Sociale',
    //             value    : client?.raisonSociale ?? '',
    //             readOnly : true,
    //             separator: false,
    //             order    : ++order,
    //             step     : 1,
    //         }),
    //         new InputQuestion({
    //             key       : 'adresse1',
    //             label     : 'Adresse',
    //             value     : client?.adresse1 ?? '',
    //             readOnly  : true,
    //             separator : true,
    //             order     : ++order,
    //             step      : 1,
    //             newRow    : true,
    //             rowColumns: 3,
    //         }),
    //         new InputQuestion({
    //             key      : 'adresse2',
    //             label    : 'Adresse (Suite)',
    //             value    : client?.adresse2 ?? '',
    //             readOnly : true,
    //             separator: false,
    //             order    : ++order,
    //             step     : 1,
    //         }),
    //         new InputQuestion({
    //             key      : 'adresse3',
    //             label    : 'Adresse (Suite 2)',
    //             value    : client?.adresse3 ?? '',
    //             readOnly : true,
    //             separator: false,
    //             order    : ++order,
    //             step     : 1,
    //         }),
    //         new InputQuestion({
    //             key       : 'codePostal',
    //             label     : 'Code Postal',
    //             value     : client?.codePostal ?? '',
    //             readOnly  : true,
    //             separator : false,
    //             order     : ++order,
    //             step      : 1,
    //             newRow    : true,
    //             rowColumns: 3,
    //         }),
    //         new InputQuestion({
    //             key      : 'ville',
    //             label    : 'Ville',
    //             value    : client?.ville ?? '',
    //             readOnly : true,
    //             separator: false,
    //             order    : ++order,
    //             step     : 1,
    //         }),
    //         new InputQuestion({
    //             key      : 'pays',
    //             label    : 'Pays',
    //             value    : client?.pays ?? '',
    //             readOnly : true,
    //             separator: false,
    //             order    : ++order,
    //             step     : 1,
    //         }),
    //     ];

    //     questions.push(
    //         ...this.addY2Contact(order, "Principal", client?.contactPrincipal)
    //     );
    //     order = questions.length;

    //     questions.push(
    //         ...this.addY2Contact(order, "Administratif", client?.contactAdministratif)
    //     );
    //     order = questions.length;

    //     questions.push(
    //         ...this.addY2Contact(order, "Technique", client?.contactTechnique)
    //     );

    //     return questions;  // .sort((a, b) => a.order - b.order);
    // }

    editCourseQuestions(course?: Course): QuestionBase<any>[]
    {
        let order = 0;

        const questions: QuestionBase<any>[] =
        [
            // new HeaderQuestion({
            //     key      : 'HeaderCourse',
            //     label    : 'Cours ' + course?.Name,
            //     type     : 'header',
            //     value    : 3,
            //     separator: false,
            //     readOnly : true,
            //     order    : ++order,
            //     newRow   : true,
            // }),
            new InputQuestion({
                key     : 'name',
                label   : 'Nom',
                value   : course?.Name?.trim() ?? '',
                readOnly: false,
                order   : ++order,
                newRow  : true,
                step    : 1,
            }),
            new NumberQuestion({
                key     : 'level',
                label   : 'Niveau',
                value   : course?.Level ?? 1,
                readOnly: false,
                order   : ++order,
                newRow  : true,
                step    : 1,
            }),
            new NumberQuestion({
                key     : 'coefficent',
                label   : 'Coefficient',
                value   : course?.Coefficient ?? 1,
                readOnly: false,
                order   : ++order,
                newRow  : true,
                step    : 1,
            }),
            new CheckboxQuestion({
                key      : 'active',
                label    : 'Actif?',
                value    : course?.Active ?? false,
                readOnly : false,
                order    : ++order,
                newRow   : true,
                step     : 1,
            }),
        ];

        return questions;
    }


    
    editSchoolQuestions(school?: School,countries?:any): QuestionBase<any>[]
    {
        let order = 0;   

        const questions: QuestionBase<any>[] =
        [     
               
            new InputQuestion({
                key     : 'Name',
                label   : 'Nom Société',
                value   : school?.Name?.trim() ?? '',
                readOnly: false,
                order   : ++order,
                newRow  : true,
                step    : 1,
            }),
            new InputQuestion({
                key     : 'Street',
                label   : 'Adresse',
                value   : school?.Street ?? "",
                readOnly: false,
                order   : ++order,
                newRow  : true, 
                step    : 1,
            }),
            new InputQuestion({
                key     : 'ZipCode',
                label   : 'Code postale',
                value   : school?.ZipCode ?? "",
                readOnly: false,
                order   : ++order,
                newRow  : true,
                step    : 1,
            }),
            new InputQuestion({
                key     : 'City',
                label   : 'Ville',
                value   : school?.City ?? "",
                readOnly: false,
                order   : ++order,
                newRow  : true,
                step    : 1,
            }),
            new InputQuestion({
                key     : 'Country',
                label   : 'Pays',
                value   : school?.Country ?? "",
                readOnly: false,
                order   : ++order,
                newRow  : true,
                step    : 1,
            }),
            new DropdownQuestion({
                key     : 'Country',
                label   : 'Pays',
                type      : 'dropdown',
                options   : countries,
                    // { key: , value:  },
                    // { key : "Rafraichit l'information", value: "REFRESH"    },
                    // { key : "Désactive le compte",      value: "DISABLE"    }
               
                value   : school?.Country ?? "",
                readOnly: false,
                order   : ++order,
                newRow  : true,
                step    : 1,
            }), 
            new InputQuestion({
                key     : 'Siret',
                label   : 'Code Siret',
                value   : school?.Siret ?? "",
                readOnly: false,
                order   : ++order,
                newRow  : true,
                step    : 1,
            }),
            new InputQuestion({
                key     : 'CodeTVA',
                label   : 'Num TVA',
                value   : school?.CodeTVA ?? "",
                readOnly: false,
                order   : ++order,
                newRow  : true,
                step    : 1,
            })
           
        ];

        return questions;
    }

    // addEmailAlertParametersForm(params: IEmailAlert)
    // {
    //     let order = 0;

    //     let questions: QuestionBase<any>[] =
    //     [
    //         new CheckboxQuestion({
    //             id       : 'alerteActive',
    //             key      : 'alerteActive',
    //             label    : 'Alerte Active?',
    //             value    : params?.alerteActive ?? false,
    //             required : true,
    //             order    : ++order,
    //             step     : 1,
    //             newRow   : true,
    //         }),
    //         new CheckboxQuestion({
    //             id       : 'alertAdmin',
    //             key      : 'alertAdmin',
    //             label    : "Réceptionner les alertes sur l'adresse mail du responsable",
    //             value    : params?.alertAdmin ?? false,
    //             required : true,
    //             separator: true,
    //             order    : ++order,
    //             step     : 1,
    //             newRow   : true,
    //         }),
    //         new InputQuestion({
    //             key      : 'responsableEmail',
    //             label    : "L'adresse mail du responsable",
    //             type     : 'email',
    //             value    : params?.responsableEmail?.trim() ?? '',
    //             required : false,
    //             readOnly : true,
    //             order    : ++order,
    //             step     : 1,
    //             newRow   : true,
    //         }),
    //         new CheckboxQuestion({
    //             id       : 'alertSecondary',
    //             key      : 'alertSecondary',
    //             label    : "Réceptionner les alertes relatives aux comptes secondaires",
    //             value    : params?.alertSecondary ?? false,
    //             required : true,
    //             order    : ++order,
    //             step     : 1,
    //             newRow   : true,
    //         }),
    //         new HeaderQuestion({
    //             key      : 'HeaderOtherEmailAddresses',
    //             label    : 'Autres adresses mail de réception des alertes',
    //             type     : 'header',
    //             value    : 3,
    //             separator: false,
    //             required : true,
    //             order    : ++order,
    //             newRow   : true,
    //         }),
    //         new InputQuestion({
    //             key       : 'adresse1',
    //             label     : "Adresse Email N° 1",
    //             type      : 'email',
    //             value     : params?.adresse1Email?.trim() ?? '',
    //             required  : true,
    //             order     : ++order,
    //             minLength : 8,
    //             maxLength : 250,
    //             step      : 1,
    //             newRow    : true,
    //             rowColumns: 3,
    //         }),
    //         new InputQuestion({
    //             key      : "adresse2",
    //             label    : "Adresse Email N° 2",
    //             type     : 'email',
    //             value    : params?.adresse2Email?.trim() ?? '',
    //             required : true,
    //             order    : ++order,
    //             minLength: 8,
    //             maxLength: 250,
    //             step     : 1,
    //         }),
    //         new InputQuestion({
    //             key      : "adresse3",
    //             label    : "Adresse Email N° 3",
    //             type     : 'email',
    //             value    : params?.adresse3Email?.trim() ?? '',
    //             required : true,
    //             order    : ++order,
    //             minLength: 8,
    //             maxLength: 250,
    //             step     : 1,
    //         }),
    //         new HeaderQuestion({
    //             key      : 'HeaderAlertesMultiplePaiementFiscaux',
    //             label    : 'Alertes multiple paiement fiscaux',
    //             type     : 'header',
    //             value    : 3,
    //             separator: false,
    //             required : true,
    //             order    : ++order,
    //             newRow   : true,
    //         }),
    //         new InputQuestion({
    //             key      : 'note',
    //             label    : "Une alerte peut être émise en cas de détection d'un paiement fiscal multiple si la date limite de substitution est dépassée.",
    //             type     : 'label',
    //             value    : '',
    //             required : false,
    //             order    : ++order,
    //             step     : 1,
    //             newRow   : true,
    //         }),
    //         new CheckboxQuestion({
    //             id       : 'sendAlertMultiplesPayements',
    //             key      : 'sendAlertMultiplesPayements',
    //             label    : "Envoi d'une alerte multiples paiements TVA/CVAE/IS/TS/RCM",
    //             value    : params?.sendAlertMultiplePayements ?? false,
    //             required : true,
    //             order    : ++order,
    //             step     : 1,
    //             newRow   : true,
    //         }),
    //         new HeaderQuestion({
    //             key      : 'HeaderAlertesMessagesService',
    //             label    : 'Alertes sur messages de service',
    //             type     : 'header',
    //             value    : 3,
    //             separator: false,
    //             required : true,
    //             order    : ++order,
    //             newRow   : true,
    //         }),
    //         new CheckboxQuestion({
    //             id       : 'getAlertForTestFiles',
    //             key      : 'getAlertForTestFiles',
    //             label    : "Réceptionner les alertes pour les fichiers de test",
    //             value    : params?.getAlertForTestFiles ?? false,
    //             required : true,
    //             order    : ++order,
    //             step     : 1,
    //             newRow   : true,
    //         }),
    //         new TextAreaQuestion({
    //             key        : 'alertes',
    //             label      : 'Alertes',
    //             showLabel  : false,
    //             placeholder: 'Alertes',
    //             value      : params?.alerts ?? '',
    //             required   : true,
    //             order      : ++order,
    //             rows       : 8,
    //             newRow     : true,
    //         }),
    //     ];

    //     return questions;  // .sort((a, b) => a.order - b.order);
    // }

    forgotPasswordQuestions()
    {
        const questions: QuestionBase<any>[] =
        [
            new InputQuestion({
                key      : 'email',
                label    : 'Adresse Email',
                type     : 'email',
                value    : '',
                required : true,
                order    : 1,
                minLength: 6,
                maxLength: 100,
            }),
        ];

        return questions;  // .sort((a, b) => a.order - b.order);
    }

    resetPasswordQuestions()
    {
        let order = 0;

        const questions: QuestionBase<any>[] =
        [
            new InputQuestion({
                key      : 'password',
                label    : 'Nouveau mot de passe',
                type     : 'password',
                value    : '',
                required : true,
                order    : ++order,
                minLength: 8,
                maxLength: 250,
            }),

            new InputQuestion({
                key      : 'confirmPassword',
                label    : 'Confirmer votre mot de passe',
                type     : 'password',
                value    : '',
                required : true,
                order    : ++order,
                minLength: 8,
                maxLength: 250,
            })
        ];

        return questions;  // .sort((a, b) => a.order - b.order);
    }

    NewContactForm()
    {
        let order = 0;

        const questions: QuestionBase<any>[] =
        [
            new InputQuestion({
                key        : 'name',
                label      : 'Name',
                showLabel  : false,
                placeholder: 'Votre nom',
                type       : 'text',
                value      : '',
                required   : true,
                order      : ++order,
                newRow   : true,
                minLength  : 3,
                maxLength  : 100,
            }),

            new InputQuestion({
                key        : 'email',
                label      : 'Email',
                showLabel  : false,
                placeholder: 'Votre adresse email',
                type       : 'email',
                value      : '',
                required   : true,
                order      : ++order,
                newRow   : true,
                minLength  : 6,
                maxLength  : 100,
            }),

            new InputQuestion({
                key        : 'subject',
                label      : 'Subject',
                showLabel  : false,
                placeholder: 'Titre',
                type       : 'text',
                value      : '',
                required   : true,
                order      : ++order,
                newRow   : true,
                minLength  : 3,
                maxLength  : 100,
            }),

            new TextAreaQuestion({
                key        : 'message',
                label      : 'Message',
                showLabel  : false,
                placeholder: 'Tapez votre message ici...',
                value      : '',
                required   : true,
                order      : ++order,
                newRow   : true,
                rows       : 8,
            }),
        ];

        return questions;  // .sort((a, b) => a.order - b.order);
    }



    
    editMoutounQuestions(moutoun?: Moutoun): QuestionBase<any>[]
    {
        let order = 0;

        const questions: QuestionBase<any>[] =
        [  
            new DropdownQuestion({
                key       : 'compteStatut',
                label     : 'Statut du Compte',
                type      : 'dropdown',
                options   : [
                    { key : "Enregistré",              value: "REGISTERED"           },
                    { key : "Fermé",                   value: "CLOSED"               },
                    { key : "Création en cours",       value: "CREATION_IN_PROGRESS" },
                    { key : "BO Rejeté",               value: "BO_REJECTED"          },
                    { key : "BO Validé",               value: "BO_VALIDATED"         },
                    { key : "En attente des fichiers", value: "WAIT_FOR_FILES"       },
                    { key : "Création suspendu",       value: "CREATION_SUSPENDED"   },
                    // { key: , value:  },
                    // { key : "Rafraichit l'information", value: "REFRESH"    },
                    // { key : "Désactive le compte",      value: "DISABLE"    }
                ],
                value     : '',  // client?.compteStatut?.trim() ?? '',
                required  : false,
                order     : ++order,
                minLength : 3,
                newRow    : true,
            }),
            new TextAreaQuestion({
                key        : 'message',
                label      : 'Message',
                showLabel  : false,
                placeholder: 'Tapez votre message ici...',
                value      : '',
                required   : true,
                order      : ++order,
                newRow   : true,
                rows       : 1,
            }),  
        ];

        return questions;
    }

    ClassroomForm(classroom?: Classroom)
    {
        let order = 0;

        const questions: QuestionBase<any>[] =
        [
            new InputQuestion({
                key        : 'Name',
                label      : 'Name',
                showLabel  : true,
                placeholder: 'Name de salle',
                type       : 'text',
                value      : classroom?.Name ?? '',
                required   : false,
                order      : ++order,
                newRow   : true,
                minLength  : 3,
                maxLength  : 100,
            }),

            new NumberQuestion({
                key        : 'NumberProjector',
                label      : 'Number de Projector',
                showLabel  : true,
                placeholder: '',
                type       : 'text',
                value      : classroom?.NumberProjector ?? 0,
                required   : false,
                order      : ++order,
                newRow   : true,
                minLength  : 6,
                maxLength  : 100,
            }),

            new NumberQuestion({
                key        : 'NumberDesk',
                label      : 'Number Desk',
                showLabel  : true,
                placeholder: 'Number de Desk',
                type       : 'text',
                value      : classroom?.NumberDesk ?? 0,
                required   : false,
                order      : ++order,
                newRow   : true,
                minLength  : 3,
                maxLength  : 100,
            }),
            new NumberQuestion({
                key        : 'NumberChair',
                label      : 'Number Chair',
                showLabel  : true,
                placeholder: 'Number Chair',
                type       : 'text',
                value      : classroom?.NumberChair ?? 0,
                required   : false,
                order      : ++order,
                newRow   : true,
                minLength  : 3,
                maxLength  : 100,
            }),
            
        ];

        return questions;  // .sort((a, b) => a.order - b.order);
    }


    DisciplineForm(discipline?: Discipline)
    {
        let order = 0;

        const questions: QuestionBase<any>[] =
        [
            new InputQuestion({
                key        : 'Name',
                label      : 'Nom',
                showLabel  : true,
                placeholder: 'Nom de discipline',
                type       : 'text',
                value      : discipline?.Name ?? '',
                required   : false,
                order      : ++order,
                newRow   : true,
                minLength  : 3,
                maxLength  : 100,
            }),

            new InputQuestion({
                key        : 'Description',
                label      : 'Description de discipline',
                showLabel  : true,
                placeholder: '',
                type       : 'text',
                value      : discipline?.Description ?? '',
                required   : false,
                order      : ++order,
                newRow   : true,
                minLength  : 6,
                maxLength  : 100,
            }),                      
        ];

        return questions;
    }

    ExamenForm(examen?: Examen)
    {
        let order = 0;

        const questions: QuestionBase<any>[] =
        [
            new NumberQuestion({
                key        : 'Id',
                label      : 'Nom',
                showLabel  : true,
                placeholder: 'Nom de discipline',
                type       : 'text',
                value      : examen?.Id ?? 0,               
                order      : ++order,
                newRow   : false,
                rowColumns: 2,
                minLength  : 3,
                maxLength  : 100,
            }),

            new InputQuestion({
                key        : 'Name',
                label      : 'Nom',
                showLabel  : true,
                placeholder: 'Nom de discipline',
                type       : 'text',
                value      : examen?.Name ?? '',
                required   : false,
                order      : ++order,
                newRow   : true,
                rowColumns: 2,
                minLength  : 3,
                maxLength  : 100,
            }),

            new NumberQuestion({
                key        : 'Coefficient',
                label      : 'Coefficient',
                showLabel  : true,
                placeholder: '',
                type       : 'text',
                value      : examen?.Coefficient ?? 0,
                required   : false,
                order      : ++order,
               
                minLength  : 6,
                maxLength  : 100,
            }),      
            
            new DateTimeQuestion({
                key        : 'StartDate',
                label      : 'Date de début',
                showLabel  : true,
                showSeconds: true,
                showTime:    true,
                placeholder: '',
                type     : 'datetime',   
                value      :  new Date(examen?.StartDate) ?? new Date(),
                required   : false,
            
                order      : ++order,
                newRow   : true,
                rowColumns: 2,
                minLength  : 6,
                maxLength  : 100,
            }),   
            new DateTimeQuestion({
                key        : 'EndDate',
                label      : 'Date de fin',
                showLabel  : true,
                placeholder: '',
                type     : 'datetime',   
                value      : new Date(examen?.EndDate) ?? new Date(),
                required   : false,
                showSeconds:true,
                showTime:true,
                order      : ++order,
                minLength  : 6,
                maxLength  : 100,
            }),     
            
            new NumberQuestion({
                key        : 'CourseId',
                label      : 'Course',
                showLabel  : true,
                placeholder: 'Nom de Cour',
                type       : 'text',
                value      : examen?.CourseId ?? 0,
                required   : false,
                order      : ++order,
                newRow   : true,
                rowColumns: 2,
                minLength  : 3,
                maxLength  : 100,
            }),
            new NumberQuestion({
                key        : 'TermId',
                label      : 'Term',
                showLabel  : true,
                placeholder: 'Nom de Term',
                type       : 'text',
                value      : examen?.TermId ?? 0,
                required   : false,
                order      : ++order,
             
                rowColumns: 2,
                minLength  : 3,
                maxLength  : 100,
            }),
            new NumberQuestion({
                key        : 'SupervisorId',
                label      : 'Supervisor',
                showLabel  : true,
                placeholder: 'Nom de Supervisor',
                type       : 'text',
                value      : examen?.SupervisorId ?? 0,
                required   : false,
                order      : ++order,
                newRow   : true,
               
                minLength  : 3,
                maxLength  : 100,
            }),
            new CheckboxQuestion({
                key        : 'IsDeleted',
                label      : 'IsDeleted? ',
                type       : 'checkbox',
                showLabel  : true,
                value      : examen?.IsDeleted ??  false,
                required   : false,
                order      : ++order,
                newRow     : true,             
                readOnly : false,            
                step     : 1,
                     
            }),

        ];

        return questions;
    }


    
    TermForm(term?: SchoolYear)
    {
        let order = 0;

        const questions: QuestionBase<any>[] =
        [
            new InputQuestion({
                key        : 'Name',
                label      : 'Nom',
                showLabel  : true,
                placeholder: 'Nom de Term',
                type       : 'text',
                value      : term?.Name ?? '',
                required   : false,
                order      : ++order,
                newRow   : true,
                minLength  : 3,
                maxLength  : 100,
            }),

            new DateTimeQuestion({
                key        : 'StartDate',
                label      : 'Date de début',
                showLabel  : true,
                placeholder: '',
                type     : 'datetime',   
                value      :  new Date(term?.StartDate+'z') ?? new Date(),
                required   : false,
                order      : ++order,
                newRow   : true,
                minLength  : 6,
                maxLength  : 100,
            }),   
            new DateTimeQuestion({
                key        : 'EndDate',
                label      : 'Date de fin',
                showLabel  : true,
                placeholder: '',
                type     : 'datetime',   
                value      : new Date(term?.EndDate+'z') ?? new Date(),
                required   : false,
                order      : ++order,
                newRow   : true,
                minLength  : 6,
                maxLength  : 100,
            }),                    
        ];

        return questions;
    }
    HolidayForm(holiday?: Holiday)
    {
        let order = 0;

        const questions: QuestionBase<any>[] =
        [
            new InputQuestion({
                key        : 'Name',
                label      : 'Nom',
                showLabel  : true,
                placeholder: 'Nom de vacances',
                type       : 'text',
                value      : holiday?.Name ?? '',
                required   : false,
                order      : ++order,
                newRow   : true,
                minLength  : 3,
                maxLength  : 100,
            }),

            new DateTimeQuestion({
                key        : 'StartDate',
                label      : 'Date de début',
                showLabel  : true,
                placeholder: '',
                type     : 'datetime',   
                value      : holiday?.StartDate? new Date(holiday?.StartDate+'z'): new Date(),
                required   : false,
                order      : ++order,
                newRow   : true,
                minLength  : 6,
                maxLength  : 100,
            }),   
            new DateTimeQuestion({
                key        : 'EndDate',
                label      : 'Date de fin',
                showLabel  : true,
                placeholder: '',
                type     : 'datetime',   
                value      : holiday?.EndDate? new Date(holiday?.EndDate+'z') : new Date(),
                required   : false,
                order      : ++order,
                newRow   : true,
                minLength  : 6,
                maxLength  : 100,
            }),                    
        ];

        return questions;
    }
    MemberForm(member? : Member){
        let order = 0;
        const questions: QuestionBase<any>[] =
        [
        new InputQuestion({
            key: 'FirstName',
            label : 'FirstName',
            showLabel:true,
            placeholder:'',
            type       : 'text',
            value      : member?.FirstName ?? '',
            required   : true,
            order      : ++order,
            newRow   : true,
            minLength  : 3,
            maxLength  : 20,
        }),
        new InputQuestion({
            key: 'LastName',
            label : 'LastName',
            showLabel:true,
            placeholder:'',
            type       : 'text',
            value      : member?.LastName ?? '',
            required   : true,
            order      : ++order,
            newRow   : true,
            minLength  : 3,
            maxLength  : 20,
        }),
        new InputQuestion({
            key: 'Email',
            label : 'Email',
            showLabel:true,
            placeholder:'',
            type       : 'text',
            value      : member?.Email ?? '',
            required   : true,
            order      : ++order,
            newRow   : true,
            minLength  : 10,
            maxLength  : 40,
        }),

        new DateTimeQuestion({
            key        : 'BirthDate',
            label      : 'BirthDate',
            showLabel  : true,
            placeholder: '',
            type     : 'datetime',   
            value      : member?.BirthDate? new Date(member?.BirthDate+'z') : new Date(),
            required   : true,
            order      : ++order,
            newRow   : true,
            minLength  : 6,
            maxLength  : 100,
        }),     
        ]
        return questions;       
    }
}