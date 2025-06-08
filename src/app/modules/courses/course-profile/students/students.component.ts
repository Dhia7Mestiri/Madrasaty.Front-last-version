import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '@services/http-service/http.service';
import * as consts from '@consts/url.consts';
import { NotificationService } from '@services/notification/notification.service';
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  StudentsByCourse
  pagenumber=1
  @Input() CourseId ;
  DialogTitle=""
  constructor(private http: HttpService,private notification: NotificationService) { }

  ngOnInit(): void {
    this.getStudentsByCourseId(this.pagenumber,this.CourseId)

  }
  getStudentsByCourseId(pagenumber,CourseId){
    this.http.read(consts.COURSE_URL + "StudentsByCourseId"+"?_pageNumber="+pagenumber+"&CourseId="+CourseId,false).subscribe(data=>{
      this.StudentsByCourse=data
      });
}
OpenDiag(item) {   
 
  this.DialogTitle = item === -1 ? 'Ajouter Note Examen ' : 'Modifier Note Examen';    
 
 
}

DeleteStudentFromCourse(Student_Id: number) {
  this.notification.deleteElementAlert().then((result) => {
      if (result && Student_Id != 0 && this.CourseId != 0) {
         this.http.delete(consts.COURSE_URL+"DeleteStudent" +"?StudentId="+Student_Id+"&CourseId="+this.CourseId)
              .subscribe({
                  next: () => { this.notification.showSuccess("Ce étudiant  a été bien supprimée"),this.getStudentsByCourseId(this.pagenumber,this.CourseId) },
                  error: err => this.notification.showError("Problème au cour de la suppression")
              });
      }
  })
}
}
