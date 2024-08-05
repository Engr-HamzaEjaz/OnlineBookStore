import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GetBooksService {
  constructor(private http: HttpClient) {}

  private url = 'https://localhost:7295/api/Book';

  getBooks() {
    return this.http.get(this.url);
  }
}
