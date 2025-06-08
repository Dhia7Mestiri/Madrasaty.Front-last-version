import { Component, OnInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Observable, fromEvent, merge } from 'rxjs';

import { NotificationService } from '@services/notification/notification.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormControlName } from '@angular/forms';
import { GenericValidator } from '@shared/generic-validator';
import { RegisterService } from '@services/register.service';


@Component({
    selector   : 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls  : ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy
{
    hasError: boolean = false  ;
    registerform: FormGroup;
    minDate: Date;
    maxDate: Date;
    public genericValidator: GenericValidator;
    validationMessages: { [key: string]: { [key: string]: string } };
    displayMessage: { [key: string]: string } = {};
    schools: any[];
    MemberStatusId
    defaultCountry: any = 'FR';
    countries;
    Country;
    listAdmins: string[];

    private unsubscribe: Subscription[] = [];

    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
    passmsg: string;
    errorMessage: any;

    constructor(private register: RegisterService, private notification: NotificationService,
        private router: Router, private fb: FormBuilder)
    {
        
     }

    ngOnInit()
    {
      this.initForm()
    }
    initForm()
    {
        this.validationMessages = {
            // Email: { required: 'Veuillez saisir une adresse email valide.' },
            Email: {
                pattern: 'Entrez une adresse email valide.',
                required: 'Adresse email est obligatoire.'
            },
            Password: {
                required: 'Le mot de passe est obligatoire.',
                minlength: 'Les mots de passe doivent contenir au moins 6 caractères.'
            },
            LastName: { required: 'Prénom est  obligatoire.' },
            FirstName: { required: 'Nom est  obligatoire.' },
            Profession: { required: 'Profession est  obligatoire.' },
            Street: { required: 'Adresse est  obligatoire.' },
            ZipCode: { required: 'Code postal est  obligatoire.' },
            BirthDate: { required: 'La date de naissance est obligatoire.' },
            SchoolId: { required: 'Il faut choisir une école' },
            Gender: { required: 'Genre est obligatoire.' },
            Country: { required: 'Il faut choisir un pays.' },
            MembreStatusId: { required: 'il faut choisir un role' },
            ConfirmPassword: {
                required: 'La confirmation doit correspondre au mot de passe.',
                minlength: 'La confirmation de mot passe doivent contenir au moins 6 caractères.',
                bind: 'La confirmation doit correspondre au mot de passe.'
            }
        };
        this.genericValidator = new GenericValidator(this.validationMessages);
        this.minDate = new Date();
        this.maxDate = new Date();

        this.minDate.setDate(this.minDate.getDate() - 30000);
        this.maxDate.setDate(this.maxDate.getDate());

        this.registerform = this.fb.group({
            Email: ["", Validators.compose([
                Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
            Password: new FormControl("", [Validators.required, Validators.minLength(6),]),
            ConfirmPassword: new FormControl("", [Validators.required, Validators.minLength(6),]),
           // BeginningDate: new FormControl(),
            SchoolId: new FormControl("", [Validators.required]),
            BirthDate: new FormControl(new Date(), [Validators.required]),
            //PhotoPath: new FormControl(), //schoolImage logo !! 
           //  MembreStatusId: new FormControl("", [Validators.required]),
        });
        this.register.getCountries().subscribe({
            next : (countriesData) => this.countries = countriesData,
            error : (error) => console.log(error)
            });
        this.register.getSchools().subscribe((schoolsData) => {  this.schools = schoolsData.Items ;});
        this.register.getMemberStatus().subscribe((MembersData) => this.MemberStatusId = MembersData);
    }
    ngAfterViewInit()
    {
        const controlBlurs: Observable<any>[] = this.formInputElements
        .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
         merge(this.registerform.valueChanges, ...controlBlurs)
        .pipe()
        .subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.registerform);
        });
    }

    checkPassSame()
    {   const passworControl = this.registerform.get('Password')
        const confirmPasswordControl = this.registerform.get('ConfirmPassword')
        if (confirmPasswordControl.dirty || confirmPasswordControl.touched) {
        let Password = this.registerform.value.Password
        let ConfirmPassword = this.registerform.value.ConfirmPassword;
        if (Password == ConfirmPassword) {
            this.passmsg = '';
            return false;
        } else {
            this.passmsg = "Password did not match.";
            return true;
        }
    }
}
    checkFormErrors() : boolean
    {
        return this.hasError = this.registerform.invalid
    }
    validateAllFormFields(formGroup: FormGroup) {         
        Object.keys(formGroup.controls).forEach(field => {  
          const control = formGroup.get(field);             
          if (control instanceof FormControl) {             
            control.markAsTouched({ onlySelf: true });
          } else if (control instanceof FormGroup) {        
            this.validateAllFormFields(control);            
          }
        });
      }
    GetAdmins(data : FormGroup)
    {
        this.validateAllFormFields(data)
        if(!this.checkFormErrors())
        { 
        const formValue = data.value
        this.register.getAdmins(formValue.SchoolId).
        subscribe(admins => 
            {
                 this.listAdmins = admins,
                this.RegisterUser(formValue); 
            })
        }
    }

    RegisterUser(data)
    {
        if (!this.hasError) {

            data = { ...data, ListEmail: this.listAdmins };
            let dt = this.registerform.get('MembreStatusId').value;
            data = { ...data, MemberStatusId: dt };
            console.log(data)
            let date = this.registerform.get('BirthDate').value;
            date = new Date();
            data = { ...data, BirthDate: date };
            console.log(data)

            this.register.RegisterUser(data).subscribe({
                next: () => { this.notification.showSuccess("compte créer avec succès,please check your email and confirm it"), this.router.navigate(['auth/login']) },
                error: err => this.errorMessage = err
            });
        }
    }

    ngOnDestroy()
    {
        this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }
}