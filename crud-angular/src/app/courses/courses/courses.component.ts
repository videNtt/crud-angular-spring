import { ErrorDialogComponent } from './../../shared/components/error-dialog/error-dialog.component';
import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]>;
  displayedColumns = ['name', 'category'];

  constructor(
    private coursesServices: CoursesService,
    public dialog: MatDialog
    ) {
    this.courses$ = this.coursesServices.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar cursos.');
        return of([])
      })
    );

  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {
  }

}