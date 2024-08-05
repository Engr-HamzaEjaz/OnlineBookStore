import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddBookService {
  private apiUrl = 'https://localhost:7295/api/Book';

  constructor(private http: HttpClient) {}

  addBook(bookData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, bookData)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    const errorMessage = error.error?.message || error.message || 'An unknown error occurred';
    console.error('Error adding book:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
