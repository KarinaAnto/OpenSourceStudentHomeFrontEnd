import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Student} from '../models/student';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  // Students endpoints
  basePath = 'https://student-home-open-source.herokuapp.com/api/users';
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };
  // API Error Handling
  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof  ErrorEvent) {
      console.log('An error has ocurred: ', error.error.message);
    }
    else {
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something happened with request, please try again later.');
  }
  // Create Student
  createStudent(student, userId): Observable<Student> {
    return this.http.post<Student>(`${this.basePath}/users/${userId}/students`, JSON.stringify(student), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Student By UserId
  getStudentByUserId(userId): Observable<Student> {
    return this.http.get<Student>(`${this.basePath}/users/${userId}/students`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Student By Id
  getStudentByStudentId(studentId): Observable<Student> {
    return this.http.get<Student>(`${this.basePath}/students/${studentId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Student by UserId And StudentId
  getStudentByUserIdAndStudentId(userId, studentId): Observable<Student> {
    return this.http.get<Student>(`${this.basePath}/users/${userId}/students/${studentId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Update Student
  updateStudent(studentId, userId, student): Observable<Student> {
    return this.http.put<Student>(`${this.basePath}/users/${userId}/students/${studentId}`, JSON.stringify(student), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Delete Student
  deleteStudent(studentId, userId): Observable<any> {
    return this.http.delete(`${this.basePath}/users/${userId}/students/${studentId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

}
