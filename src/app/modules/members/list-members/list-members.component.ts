import { Component, OnInit,
         OnDestroy,           
         ViewChild} from '@angular/core';
import { Router              } from '@angular/router';
import { Subscription        } from 'rxjs';
import { TranslateService    } from '@ngx-translate/core';

import { PermissionsService  } from '@services/permissions-service/permissions.service';
import { NotificationService } from '@services/notification.service';
import { ColumnsService      } from '@services/columns/columns.service';

import { Page                } from '@enums/page';
import { Permission          } from '@enums/permission';
import { CardViewConfig      } from '@interfaces/card-view-config';
import { CardViewCSS         } from '@interfaces/card-view-css';
import { NotificationService as NT } from '@services/notification/notification.service';
import * as consts from '@consts/global.consts';
import { SaveButtonAction } from '@enums/save-button-action';
import { Member } from '@models/member';
import * as urlconsts from '@consts/url.consts';
import { EditMemberComponent } from '../edit-member/edit-member.component';
import { HttpClient } from '@angular/common/http';

@Component({
    selector   : 'app-list-members',
    templateUrl: './list-members.component.html',
    styleUrls  : ['./list-members.component.scss']
})
export class ListMembersComponent implements OnInit, OnDestroy
{
    tableView   = localStorage.getItem('tableView') == '1' || false;
    columns     = this.columnsSrv.getPersonnelColumns();
    pageTitle   = 'Personnel';
    page        = Page.Personnel;
    permissions = [Permission.ViewPersonnel];
    urlParams   = 'schoolId=1';
    config     !: CardViewConfig;
    css        !: CardViewCSS;
    private subscriptions: Subscription[] = [];
    captions   !: any[];
    member : Member ; 
    modalTitle
    modalIsVisible:boolean

    saveAction : SaveButtonAction;

    @ViewChild('EditMember') editMemberCmp !: EditMemberComponent ;
 

    // switchbtn: boolean = false;
    // DialogTitle: string;
    // memberForm: FormGroup;
    // countries;

    // sortOrder: number;
    // sortField: string;
    // sortOptions: SelectItem[];
    // sortKey: string;

    // rowData: any;
    // message: string;
    // member: Member;
    // errorMessage = '';
    // mylist: any;
    // memberstatut: any;
    // //memberFormGroup: FormGroup;
    // MemberStatusId;
    // search = "";
    // MemberStatesId;
    // data;
    // PhotoPath;
    // pagenumber = 1;
    // selectedRole = 0;
    // states = [{ id: 1, name: 'In progress' }, { id: 2, name: 'Approved' }, { id: 3, name: 'Rejected' }];
    // private userId: number;  // JSON.parse(this.User).Id;
    // membersCount = 0;
    // UpPhoto;

    constructor(private columnsSrv: ColumnsService, private notif: NotificationService,
        private perm: PermissionsService, private translate: TranslateService,
        private router: Router,private UINotification : NT,private http : HttpClient)
        // private notification: NotificationService, private members: MembersListService,
        // private uploadExcelservice: ExcelUploadService, private userService: UserService)
    { }

    ngOnInit()
    {
        if (!this.grantedAccess())
            return;

        this.getCaptions();
        this.listenToChanges();

        // this.userId     = this.userService.getMemberId();

        // this.memberForm = this.members.createMembersForm();
        // this.members.getMembersCount().subscribe(data => this.membersCount = data);

        // this.members.getCountries().subscribe(
        //     (countriesData) => (this.countries = countriesData),
        //     (error) => console.log(error)
        // );

        // this.members.getMemberStatus().subscribe((memberStatusData) => { this.MemberStatusId = memberStatusData });
        // this.members.getMemberStates().subscribe((memberStatesData) => this.MemberStatesId = memberStatesData);
        // this.sortOptions = [
        //     { label: 'Price High to Low', value: '!price' },
        //     { label: 'Price Low to High', value: 'price' }
        // ];
        // this.refreshMemberList(this.pagenumber, this.search, this.selectedRole);
    }

    getCaptions()
    {
        this.translate.get([
            "list-members.title", "list-members.new-button",
            "list-members.zip-code", "list-members.city", "list-members.school",
            "general.edit", "general.delete"
        ]).subscribe((values: any[]) =>
        {
            this.captions  = values;
            this.pageTitle = values["list-members.title"];

            this.setPageTitle();
            this.defineCardViewConfig();
            this.defineCSSConfig();
        });
    }

    setPageTitle()
    {
        this.notif.updatePageTitle({
            title     : this.pageTitle,
            toggleView: true,
            orderBy   : true,
            breadcrumb: [
                { text: this.pageTitle, url: '/personnel' },
            ],
            actionsBtn: [
                {
                    text: this.captions["list-members.new-button"],
                    onClick: () =>this.AddMember(),
                    url: '/personnel/new',
                    modalTarget: 'newPersonnel',
                    cssClass: 'fw-bold btn-primary'  // Small button = btn-sm
                },
            ]
        });
    }

    private defineCardViewConfig()
    {
        this.config = {
            toolbarCaption: this.captions["list-members.school"],
            toolbarKey  : "SchoolId",  // "School",
            name          : "FullName",
            url           : "/members",
            bodyAvatar    : "Photo",
            defBodyAvatar : consts.defaultMemberImg,
            info          : [
                // { key: "PhoneNumber", value: "Tél."  },
                { key: "ZipCode", value: this.captions["list-members.zip-code"] },
                { key: "City",    value: this.captions["list-members.city"]     },
            ],
            // content    : "Street",    // "Bio",
            buttons       : [
                { id: SaveButtonAction.Delete, css: "btn-light-youtube me-3",  iconCSS: "fas fa-trash fs-4",  title: this.captions["general.delete"], target: "#kt_docs_sweetalert_state_question" },
                { id: SaveButtonAction.New, css: "btn-light-linkedin me-5", iconCSS: "fas fa-pencil fs-4", title: this.captions["general.edit"],   target: "#kt_modal_Examen"                   },
            ],
        };
    }

    private defineCSSConfig()
    {
        this.css = {
            bodyAvatar: "symbol-125px",
            // card   : "hover-rotate-start",   //  [ngClass] = "item.Id % 2 == 0 ? 'hover-rotate-start': 'hover-rotate-end'"
            // column : "hover-elevate-up",     //  [ngClass] = "item.Id % 2 == 0 ? 'hover-elevate-up'  : 'hover-elevate-down'"
        };
    }

    listenToChanges()
    {
        this.listenToViewChanges();
        this.listenToLanguageChanges();
    }

    listenToLanguageChanges()
    {
        this.subscriptions.push(this.notif.languageChanged$.subscribe((newLanguage: string) =>
        {
            this.translate.use(newLanguage);
            this.getCaptions();
        }));
    }

    listenToViewChanges()
    {
        this.subscriptions.push(this.notif.viewChanged$.subscribe((tableView: boolean) => {
            this.tableView = tableView;
        }));
    }

     grantedAccess() : boolean
    {
        const canAccess = this.perm.allowedTo(this.permissions);

        if (!canAccess)
            this.router.navigate(["/"]);

        return canAccess;
    }
    AddMember() {
        this.modalTitle     =  this.captions["list-members.new-button"];
        this.modalIsVisible = true;
        this.editMemberCmp.openModal(SaveButtonAction.New);
    }
    buttonClicked(obj: any)
    {
        if(obj.button ==SaveButtonAction.Delete)
            {
                this.deleteMember(obj.item.Id)
            }
            else {
                this.member      = obj.item;
                this.modalTitle     =  this.member?.FullName;
                this.modalIsVisible = true;
                this.editMemberCmp.openModal(SaveButtonAction.Edit,this.member)
            }
        console.log("list-members.component: Member ID = ", obj.item, " -> Button clicked = ", obj.button);
    }
    deleteMember(id : number )
    {
        this.UINotification.deleteElementAlert().then((result)=>{
            if(result.isConfirmed && id!=0 )
                {
                    this.http.delete(urlconsts.MEMBER_URL + id)
                    .subscribe({
                        next: () => { this.UINotification.showSuccess("Votre classe a été bien supprimée") },
                        error: err => this.UINotification.showError("Problème au cour de la suppression")
                    });
                }
        })
    }

    // findRole(id: number)
    // {
    //     return this.MemberStatusId.find(x => x.Id == id).Wording;
    // }

    // refreshMemberList(pagenumber, search, role)
    // {
    //     this.members.getMembers(1,pagenumber, search, role).subscribe(
    //     {
    //         next: membersData => {
    //             this.rowData = membersData;

    //             if (membersData.length == 0) {
    //                 this.notification.showInfo("il n'y a pas de données disponibles avec ces paramètres !");
    //             }
    //         },
    //         error: err => this.errorMessage = err
    //     });
    //     console.log(this.selectedRole);
    // }

    // onSelectChange(arg: any)
    // {
    //     this.selectedRole = arg.value;
    //     this.refreshMemberList(this.pagenumber, this.search, this.selectedRole);
    // }

    // searchResult(data)
    // {
    //     this.search = data;
    //     this.refreshMemberList(this.pagenumber, this.search, this.selectedRole);
    // }

    // OpenDiag(id: number)
    // {
    //     this.DialogTitle = id == -1 ? "Ajouter Member" : "Modifier Member";
    //     console.log(id);
    //     this.members.getMember(id)
    //         .subscribe({
    //             next: (member: Member) => this.displayMember(member),
    //             error: err => console.log(err)
    //         });
    // }

    // displayMember(member: Member)
    // {
    //     if (this.memberForm) {
    //         this.memberForm.reset();
    //     }

    //     this.member = member;
    //     this.memberForm.patchValue({
    //         Id: member.Id,
    //         FirstName: member.FirstName,
    //         LastName: member.LastName,
    //         Female: member.Female,
    //         SkypeId: member.SkypeId,
    //         PhoneNumber: member.PhoneNumber,
    //         CreatedOn: new Date(this.member.CreatedOn),
    //         BirthDate: new Date(this.member.BirthDate),
        
    //         Street: member.Street,
    //         ZipCode: member.ZipCode,
    //         City: member.City,
    //         Country: member.Country,
    //         Photo: member.Photo,
    //         Email: member.Email,
    //         Password: member.Password,
    //         SchoolId: member.SchoolId,
    //         Status: member.Status,
    //         State: member.State,
    //         Login: member.Login,
    //     });
    //     this.PhotoPath = this.members.GetMemberPhotoPath(member.Photo)
    //     console.log(member)
    // }

    // BeforeSave()
    // {
    //     this.members.getCurrentMember(this.userId).subscribe((memberdata) => this.saveMember(memberdata.SchoolId));
    // }

    // saveMember(Id: number)
    // {
    //     this.memberForm.get("Password").setValue("passer");
    //     const m = { ...this.member, ...this.memberForm.value };
    //     m.SchoolId = Id;
    //     console.log(m);

    //     if (m.Id === "00000000-0000-0000-0000-000000000000" || m.Id === "" || m.Id === null)
    //     {
    //         this.members.createMember(m).subscribe({
    //             next: (data: any) => {
    //                 this.notification.showSuccess("votre Membre a bien été ajoutée")
    //                 this.refreshMemberList(this.pagenumber, this.search, this.selectedRole)
    //             },
    //             error: (err) => (this.errorMessage = err),
    //         });
    //     }
    //     else
    //     {
    //         delete m.Password;

    //         if (this.UpPhoto != null && this.UpPhoto != undefined)
    //         {
    //             m.Photo = this.UpPhoto;
    //             var array = m.Photo.split(",", 3);
    //             m.Photo = array[1];
    //         }

    //         let profileModel = {
    //             Member  : m,
    //             Password: "",
    //             Photo   : m.Photo
    //         };

    //         this.members.updateMember(profileModel).subscribe({
    //             next: (data) => {
    //                 this.notification.showSuccess("votre Membre a bien été modifié");
    //                 this.refreshMemberList(this.pagenumber, this.search, this.selectedRole);
    //             },
    //             error: (err) => (this.errorMessage = err),
    //         });
    //     }
    // }

    // async deleteItem(id: number)
    // {
    //     if (await this.notification.deleteElementAlert())
    //     {
    //         this.members.deleteMember(id)
    //             .subscribe({
    //                 next: () => { this.notification.showInfo(" votre Membre a  été bien  supprimée"), this.refreshMemberList(this.pagenumber, this.search, this.selectedRole) },
    //                 error: err => this.notification.showError(err.error.Message)
    //             });
    //     }
    // }

    // paginate(event)
    // {
    //     this.pagenumber = event.page + 1
    //     this.refreshMemberList(this.pagenumber, this.search, this.selectedRole)
    // }

    // uploadFile(arg)
    // {
    //     let formData = new FormData();
    //     formData.append('upload', arg)
    //     this.uploadExcelservice.UploadExcel(formData, 'Members/UploadExcel').subscribe(result => {
    //         this.message = result.toString();
    //         this.notification.showSuccess(this.message);
    //         this.refreshMemberList(this.pagenumber, this.search, this.selectedRole);
    //     });
    // }

    // onChange(file: File)
    // {
    //     if (file)
    //     {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);

    //         reader.onload = event => {
    //             this.UpPhoto = reader.result;
    //             this.PhotoPath = this.UpPhoto;
    //         };
    //     }
    // }

    // getvalue(id: number)
    // {
    //     return this.states.find(x => x.id == id).name;
    // }

    ngOnDestroy()
    {
        this.subscriptions?.forEach(sub => sub.unsubscribe());
    }
}