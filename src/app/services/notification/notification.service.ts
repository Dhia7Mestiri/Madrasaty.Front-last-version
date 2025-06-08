import { Injectable } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class NotificationService
{
    constructor(private messageService: MessageService, private confirmationService: ConfirmationService)
    { }

    /* 
      onSaveComplete(type,title: string,msg: string,refreshCallback): void {
        if (msg != "") {
          Swal({
            position: 'top',
            title: "Votre "+ title  +" a bien été " + msg,
            type:  type,
            showConfirmButton: false,
            timer: 5000,
            toast: true,
          });
          refreshCallback;
    
        }
      } */

    /*   AlertcreateNewCourseSession() {
        return Swal({
          title: 'Vous êtes sur le point de créer une séance de cours. Voulez-vous continuer?',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmer',
          type: 'info',
          cancelButtonText: 'Annuler',
        })
      } */

    /*   deleteElementAlert() {
        return Swal({
          title: 'Etes-vous sûr de vouloir supprimer cet élément?',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmer',
          type: 'warning',
          cancelButtonText: 'Annuler',
    
        })
      }
     */
    /* deleteElementAlert() {
     return  this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
        
        },
        reject: () => {
           
        }
    });
    } */

    AlertcreateNewCourseSession({
        message = "Are you sure that you want to proceed?",
        header = "Confirmation",
        icon = "pi pi-exclamation-triangle"
    } = {}): Promise<boolean>
    {
        return new Promise(resolve => {
            console.log(
                this.confirmationService.confirm({
                    message,
                    header,
                    icon,
                    accept: () => {
                        resolve(true);
                    },
                    reject: () => {
                        resolve(false);
                    }
                })
            );
        });
    }

/* 
    deleteElementAlert({
        message = "Etes-vous sûr de vouloir supprimer cet élément?",
        header = "Suppression",
        icon = "pi pi-info-circle"
    } = {}): Promise<boolean> {
        return new Promise(resolve => {
            console.log(
                this.confirmationService.confirm({
                    message,
                    header,
                    icon,
                    accept: () => {
                        resolve(true);
                    },
                    reject: () => {
                        resolve(false);
                    }
                })
            );
        });
    }

 */

    deleteElementAlert() {
   return Swal.fire({
      html: `Etes-vous sûr de vouloir supprimer cet élément?`,
      icon: "question",
      buttonsStyling: false,
      showCancelButton: true,
      confirmButtonText: "Confirmer",
      cancelButtonText: 'Annuler',
      customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: 'btn btn-danger'
      }
  });
  }


  showInfo(detail) {
    this.messageService.add({severity:'info', summary: 'Info', detail: detail});
}

showError(detail) {

  Swal.fire({
    text: detail,
    icon: "error",
    buttonsStyling: false,
    confirmButtonText: "Ok !",
    customClass: {
        confirmButton: "btn btn-primary"
    }
});

//  this.messageService.add({severity:'error', summary: 'Error', detail: detail});
}

showSuccess(detail) {
  Swal.fire({
    text: detail,
    icon: "success",
    buttonsStyling: false,
    confirmButtonText: "Ok !",
    customClass: {
        confirmButton: "btn btn-primary"
    }
}); 
}
showAlertWithDelay(text,icon,timer){
    Swal.fire({
        text: text,
        icon: icon,
        timer: timer,
        showCancelButton:false,  
        showConfirmButton:false,    
    });    
}

}
