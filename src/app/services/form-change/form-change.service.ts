import { KeyValue           } from '@angular/common';
import { Injectable         } from '@angular/core';

// import { AccountStateAction } from '@consts/account-state.consts';
// import { log                } from '@functions/log';


@Injectable({
    providedIn: 'root'
})
export class FormChangeService
{
    updateAccountStatus(value: string): KeyValue<string, number>[]
    {
        // log("updateAccountStatus(value = ", value, ")");

        let newOptions: KeyValue<string, number>[] = [];

        /*
        switch (value)
        {
            case "CREATION_IN_PROGRESS":
                newOptions.push({ key: "Retour à l'état d'attente", value: AccountStateAction.BACK_TO_STATE_WAITING });
                newOptions.push({ key: "Rejeté",                    value: AccountStateAction.REJECT                });
                newOptions.push({ key: "Valide",                    value: AccountStateAction.VALIDATE              });
                break;

            case "CREATION_SUSPENDED":
                newOptions.push({ key: "Retour au début de création", value: AccountStateAction.BACK_TO_STATE_IN_PROGRESS });
                newOptions.push({ key: "Retour à l'état d'attente",   value: AccountStateAction.BACK_TO_STATE_WAITING     });
                newOptions.push({ key: "Rejeté",                      value: AccountStateAction.REJECT                    });
                newOptions.push({ key: "Valide",                      value: AccountStateAction.VALIDATE                  });
                break;

            case "WAIT_FOR_FILES":
                newOptions.push({ key: "Retour au début de création", value: AccountStateAction.BACK_TO_STATE_IN_PROGRESS });
                newOptions.push({ key: "Suspend la création",         value: AccountStateAction.BACK_TO_STATE_SUSPENDED   });
                newOptions.push({ key: "Rejeté",                      value: AccountStateAction.REJECT                    });
                newOptions.push({ key: "Valide",                      value: AccountStateAction.VALIDATE                  });
                break;

            case "BO_VALIDATED":
                newOptions.push({ key: "Retour au début de création", value: AccountStateAction.BACK_TO_STATE_IN_PROGRESS });
                newOptions.push({ key: "Suspend la création",         value: AccountStateAction.BACK_TO_STATE_SUSPENDED   });
                newOptions.push({ key: "Retour à l'état d'attente",   value: AccountStateAction.BACK_TO_STATE_WAITING     });
                newOptions.push({ key: "Rejeté",                      value: AccountStateAction.REJECT                    });
                newOptions.push({ key: "Enregistre",                  value: AccountStateAction.ENROLL                    });
                break;

            case "BO_REJECTED":
                newOptions.push({ key: "Retour au début de création", value: AccountStateAction.BACK_TO_STATE_IN_PROGRESS });
                newOptions.push({ key: "Suspend la création",         value: AccountStateAction.BACK_TO_STATE_SUSPENDED   });
                newOptions.push({ key: "Retour à l'état d'attente",   value: AccountStateAction.BACK_TO_STATE_WAITING     });
                newOptions.push({ key: "Valide",                      value: AccountStateAction.VALIDATE                  });
                break;

            case "REGISTERED":
                newOptions.push({ key: "Désactive le compte", value: AccountStateAction.DISABLE });
                break;

            case "CLOSED":
                newOptions.push({ key: "Active le compte",    value: AccountStateAction.ENABLE  });
                break;
        }
        // */

        return newOptions;
    }
}