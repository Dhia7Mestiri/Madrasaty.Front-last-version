import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Discipline } from 'src/app/models/discipline';
import { DisciplineLevel } from 'src/app/models/DisciplineLevel';
import { MemberFilter } from 'src/app/models/member-filter';
import { DisciplineService } from '@services/discipline/discipline.service';
import { LevelService } from '@services/level/level.service';
import { MembersListService } from '@services/members/members-list.service';
import { BtnUpdateDeleteComponent } from '@shared/btn-update-delete/btn-update-delete.component';
import { NotificationService } from '@services/notification/notification.service';
import { ExcelUploadService } from '@services/execlUpload/excel-upload.service';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss']
})
export class LevelComponent implements OnInit {
  switchbtn: boolean = false;
  disciplineList: Discipline[];
  errorMessage = '';
  disciplineFormGroup: FormGroup;
  LevelForm:FormGroup;
  studentFormGroup: FormGroup;
  domLayout: string;
  FiltredList: any;
  columnDefs
  disciplineLevels: DisciplineLevel[] = [];
  level: DisciplineLevel;
  SelectedStudent: any[];
  AvailableStudent: any[];
  rowData
 localeText
  paginationPageSize: number;
  gridOptions: any ;
  rowSelection;
  editType: string;
  DialogTitle: string;
 message
  selectedId:number;
  students
  etudiantList: MemberFilter[];
  gridColumnApi;
  gridApi; 
  search=""
  editingRowIndex: any;
  LevelId:any;
  currentLevelId: number;
  test=[]
  pagenumber=1

  Level

  constructor(private levelService: LevelService,private disciplineService: DisciplineService, private notification: NotificationService ,
    private memberService: MembersListService,private uploadExcelservice:ExcelUploadService ) {  }

     
  ngOnInit() {

    this.LevelForm = this.levelService.createLevelForm();
 
    this.getDisciplinesWithLevels(this.pagenumber,this.search)
  this.dataGridInit();   
  }


getDisciplinesWithLevels(pagenumber,search){
 /*  this.disciplineService.getDisciplines(pagenumber,search).subscribe({
    next: disciplines => { 
      this.disciplineList = disciplines      
   
        var a = this.disciplineList?.filter(x => x?.Id == this.selectedId)
        this.rowData=a[0]['DisciplineLevels']      
      
      


  
    
    },
    error: err => this.errorMessage = err
  }); */

}
  selectedLevel(arg){
    this.Level=arg.Id  
    console.log( this.Level)
  }
  
  changeDiscipline(arg){
    this.currentLevelId=null
    if (arg.Id != null && arg.Id!= "") {
      var a = this.disciplineList.filter(x => x.Id == arg.Id)
      this.rowData=a[0]['DisciplineLevels']
    }   
    this.selectedId=arg.Id ;  
    this.switchbtn=true
  }

  searchResult(data){
    this.search=data
  }
switchtoGrid(){
  this.switchbtn = !this.switchbtn
  const disciplinesLevelsList = [];
  var a = this.disciplineList.map((item)=>{
    disciplinesLevelsList.push(...item['DisciplineLevels']);
  })
  this.rowData=disciplinesLevelsList;  

}

  OpenDiag(id: number) {   
        this.DialogTitle = id == -1 ? "Ajouter un niveau" : "Modifier niveau"
        this.levelService.DisciplineLevelById(id).subscribe({
        next: (disciplineLevel: DisciplineLevel) => this.displayDisciplineLevel(disciplineLevel),
        error: err => console.log(err)    
      });       
    
    } 

    displayDisciplineLevel(level: DisciplineLevel){
      if (this.LevelForm){
        this.LevelForm.reset();
      }
      this.level = level;    
      this.LevelForm.patchValue({
        Id:this.level.Id,
        Wording: this.level.Wording,
        Description:this.level.Description
      });  
    }


  
async deleteItem(id: number) {

  if (await this.notification.deleteElementAlert()){
    this.levelService.deleteDisciplineLevel(id)
    .subscribe({
      next: () => { this.notification.showInfo("votre Niveau a été bien  supprimée "), this.getDisciplinesWithLevels(this.pagenumber,this.search)},          
      error: err => this.errorMessage = err
    });
  }
else {
  
    }
}



  get disciplineDropDown() {
    return this.disciplineFormGroup.get('disciplineDropDown');
  }
/*   GetLevelsList() {
    this.levelService.getDisciplineLevels().subscribe({
      next: disciplineLevels => { 
        this.disciplineLevels=disciplineLevels
        this.rowData = disciplineLevels;  
        if( this.selectedId==null) {
          this.rowData = disciplineLevels
        }     
        else {
          this.rowData = disciplineLevels.filter(L=>L.DisciplineId==this.selectedId)        
          }  },
      error: () =>  this.notification.showInfo('le chargement des données a échoué.')
    });
  } */

  addLevel(): void {
    if (this.LevelForm.valid) {
      if (this.LevelForm.dirty) {
        const dispLevel = { ...this.level, ...this.LevelForm.value };
       
        dispLevel.DisciplineId = this.selectedId;
        if(this.level.Id===null || this.level.Id===0 ){
        this.levelService.createDisciplineLevel(dispLevel)
          .subscribe({
            next:() => {this.notification.showSuccess("votre Niveau de Discipline a été bien ajouté ") ,    this.getDisciplinesWithLevels(this.pagenumber,this.search), this.dataGridInit();  },
            error: () => this.notification.showError('Veuillez saisir correctement les champs demandés.')
          });
        }else{
          this.levelService.updateLevel(dispLevel).subscribe({
            next:()=>{this.notification.showSuccess("votre Niveau de Discipline De a bien été modifiée ") ,    this.getDisciplinesWithLevels(this.pagenumber,this.search), this.dataGridInit();  },
          error:()=>  this.notification.showError('Veuillez saisir correctement les champs demandés.')
        });
        }
      }
    } else{
      this.notification.showError('Veuillez saisir correctement les champs demandés.')
    } 
  }
  
  onCellValueChanged($event) {   

    if ($event.data.Id == 0) {
     $event.data.DisciplineId=this.selectedId
      this.levelService.createDisciplineLevel($event.data)
        .subscribe({
          next: (data) => { 
            var rowNode = this.gridApi.getRowNode(0)
            rowNode.setDataValue('Id', data.Id);
            this.notification.showSuccess("votre Niveau de Discipline a été bien ajouté "),     this.getDisciplinesWithLevels(this.pagenumber,this.search) },
          error: () =>  this.notification.showError('Veuillez saisir correctement les champs demandés.')
        });
    }
    else {
      this.levelService.updateLevel($event.data)
      .subscribe({
        next: () => {this.notification.showSuccess("votre Niveau de Discipline a été bien modifié "),    this.getDisciplinesWithLevels(this.pagenumber,this.search)},
        error: () =>  this.notification.showError('Veuillez saisir correctement les champs demandés.')
      });
    }

}

onGridReady(params) {
  this.gridApi = params.api;
  this.gridColumnApi = params.columnApi;
  params.api.sizeColumnsToFit(); 
this.onSelectionChanged2(this.Level)
this.currentLevelId=null

this.gridApi.getRenderedNodes().forEach( (node)=> {
  if (node.data.Id === this.Level) {
    node.setSelected(true);
}
})}

onSelectionChanged2(selectedRows) {
  this.currentLevelId = selectedRows
  if( this.currentLevelId ){
    this.getStudents(selectedRows);
  }
} 

dataGridInit() {
  this.gridOptions = {
    context: {
      componentParent: this
    },
  };
  this.localeText = {
    next: 'Suivant',
    to: 'à',
    of: 'sur',
    contains: 'Contient',
    notContains: 'Ne contient pas',
    startsWith: 'Commence par',
    endsWith: 'Finis par',
    equals: 'Egale à',
    notEqual: 'Différent de',
    inRange: 'Entre',
    andCondition: 'ET',
    orCondition: 'OU',
    lessThan: 'Inférieur à',
    greaterThan: 'Supérieur à',
    lessThanOrEqual: 'Inférieur ou égal',
    greaterThanOrEqual: 'Supérieur ou égal',
    noRowsToShow: "Il n'y a pas de données",

  }
  this.paginationPageSize = 10;
  this.editType = "fullRow";
  this.domLayout = 'autoHeight';
  
  this.rowSelection = 'single';
  this.columnDefs =
    [
      {
        headerName: 'Nom', field: 'Wording',
        showRowGroup: true,
        cellRenderer: 'agGroupCellRenderer'
        , sortable: true, filter: true, resizable: true, editable: true, 
      },
      { headerName: 'Description', field: 'Description', sortable: true, filter: true, resizable: true, editable: true },
      {
        headerName: "action", field: "Id", cellRendererFramework: BtnUpdateDeleteComponent,suppressSizeToFit: true, resizable: true, width:150
      }    
    ];
  }  
get studentDropDown() {
  return this.studentFormGroup.get('studentDropDown');
}
 onSelectionChanged() {
  var selectedRows = this.gridApi.getSelectedRows();
  this.currentLevelId = selectedRows[0].Id
  this.getStudents(selectedRows[0].Id)
} 

 getStudents(levelId): void {
  this.memberService.GetStudents(levelId)
    .subscribe({
      next: levels =>{
        this.students = levels;
        this.etudiantList = levels;
        this.SelectedStudent=this.students.filter(x=>x.IsSelected===true)
        this.AvailableStudent=this.students.filter(x=>x.IsSelected===false)   
      },
      error: err => console.log(err)
    });
} 

AssignLevelStudent(currentLevelId,students) {
  this.levelService.AssignLevelStudent(currentLevelId, students)
    .subscribe({
      next: () => this.notification.showSuccess("étudiant assigné avec succès"),
      error: () => this.notification.showSuccess("problème d'affectation d'élève")
    })

}


paginate(event) { 
  this.pagenumber=event.page+1
  this.getDisciplinesWithLevels(this.pagenumber,this.search)
}


attachStudentsToDisciplineLevel(arg){
  var attachedStudent = arg.items[0]
  attachedStudent.IsSelected=true
  this.AssignLevelStudent(this.currentLevelId,  this.SelectedStudent)
}

detachStudentsFromDisciplineLevel(arg){
  var detachedStudent = arg.items[0]
  detachedStudent.IsSelected=false
  this.AssignLevelStudent(this.currentLevelId,  this.AvailableStudent)
}

getPhotopath(PhotoPath){
  return this.memberService.GetMemberPhotoPath(PhotoPath)
}

uploadFile(arg) {
  let formData = new FormData();
  formData.append('upload',arg)
  this.uploadExcelservice.UploadExcel(formData,'DisciplinesLevels/UploadExcel').subscribe(result => {
    this.message = result.toString();
    this.notification.showSuccess(this.message);
    this.getDisciplinesWithLevels(this.pagenumber,this.search);
  });
}
}
