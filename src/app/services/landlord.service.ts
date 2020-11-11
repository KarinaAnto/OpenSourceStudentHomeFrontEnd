import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Landlord} from '../models/landlord';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LandlordService {
  // Landlords endpoints
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
  // Create Landlord
  createLandlord(userId, landlord): Observable<Landlord> {
    return this.http.post<Landlord>(`${this.basePath}/users/${userId}/landlords`, JSON.stringify(landlord), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Landlord By UserId
  getLandlordByUserId(userId): Observable<Landlord> {
    return this.http.get<Landlord>(`${this.basePath}/users/${userId}/landlords`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Landlord By Id
  getLandlordByLandlordId(landlordId): Observable<Landlord> {
    return this.http.get<Landlord>(`${this.basePath}/landlords/${landlordId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Landlord by UserId And LandlordId
  getLandlordByUserIdAndLandlordId(userId, landlordId): Observable<Landlord> {
    return this.http.get<Landlord>(`${this.basePath}/users/${userId}/landlords/${landlordId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Update Landlord
  updateLandlord(landlordId, userId, landlord): Observable<Landlord> {
    return this.http.put<Landlord>(`${this.basePath}/users/${userId}/landlords/${landlordId}`, JSON.stringify(landlord), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Delete Landlord
  deleteLandlord(userId, landlordId): Observable<any> {
    return this.http.delete(`${this.basePath}/users/${userId}/landlords/${landlordId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

}
