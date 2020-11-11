import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Request} from '../models/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  // User endpoints
  basePath = 'https://student-home-open-source.herokuapp.com/api';
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
  // Create Request
  createRequest(studentId, propertyId, request): Observable<Request> {
    return this.http.post<Request>(`${this.basePath}/students/${studentId}/properties/${propertyId}/requests`
      , JSON.stringify(request), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Request By StudentId
  getRequestByStudentId(studentId): Observable<Request> {
    return this.http.get<Request>(`${this.basePath}/students/${studentId}/requests`
      , this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Request By PropertyId
  getRequestByPropertyId(propertyId): Observable<Request> {
    return this.http.get<Request>(`${this.basePath}/properties/${propertyId}/requests`
      , this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Update Request
  updateRequest(requestId, request): Observable<Request> {
    return this.http.put<Request>(`${this.basePath}/requests/${requestId}`
      , JSON.stringify(request), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Delete Request
  deleteRequest(requestId): Observable<any> {
    return this.http.delete(`${this.basePath}/requests/${requestId}`
      , this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
