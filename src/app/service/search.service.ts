import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchSubject = new BehaviorSubject<string>('');
  searchQuery$: Observable<string> = this.searchSubject.asObservable();

  updateSearchQuery(query: string): void {
    this.searchSubject.next(query);
  }
}
