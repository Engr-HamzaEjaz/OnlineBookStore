import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddBookService {

  private apiUrl = 'https://localhost:7295/api/Book';

  constructor(private http: HttpClient) {}

  addBook(bookData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, bookData, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error adding book:', error);
    console.error('Error details:', error.error); // Log detailed error
    return throwError(() => new Error('Error adding book.'));
  }
  
}
