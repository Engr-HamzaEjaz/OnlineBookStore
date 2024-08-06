
import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { GetBooksService } from '../service/get-books.service';
import { SearchService } from '../service/search.service'; // Import SearchService
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit, OnDestroy {
  books: any[] = [];
  displayedBooks: any[] = [];
  filteredBooks: any[] = [];
  searchQuery: string = ''; // Added property for search query
  errorMessage: string | undefined;
  searchSubscription: Subscription | null = null; // Initialize as null

  constructor(
    private bookService: GetBooksService,
    private searchService: SearchService, // Inject SearchService
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getBooks();
    this.searchSubscription = this.searchService.searchQuery$.subscribe(query => {
      const result = this.filterBooks(query);
      if (Array.isArray(result)) {
        this.errorMessage = undefined; // Clear error message if books are found
        this.filteredBooks = result;
        this.displayedBooks = this.filteredBooks.slice(0, 6); // Update displayed books based on filtered results
      } else {
        this.errorMessage = result; // Set error message if no books are found
        this.displayedBooks = []; // Clear displayed books
      }
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe(); // Unsubscribe on component destroy
    }
  }

  getBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (res: any) => {
        this.books = res;
        console.log('Books fetched:', this.books);
        this.displayedBooks = this.books.slice(0, 6);
        this.filteredBooks = this.books; // Initialize filteredBooks with all books
        console.log('First 3 books displayed:', this.displayedBooks);
      },
      error: (err) => {
        console.error('Failed to fetch books:', err);
        this.errorMessage = 'Failed to load books. Please try again later.';
      }
    });
  }

  loadMoreBooks(): void {
    console.log('Loading more books...');
    const currentLength = this.displayedBooks.length;
    const newLength = currentLength + 3;
    console.log(`Current length: ${currentLength}, New length: ${newLength}`);

    if (newLength >= this.books.length) {
      this.displayedBooks = this.books.slice(0); // Show all books
    } else {
      this.displayedBooks = this.books.slice(0, newLength);
    }

    console.log('Displayed books updated:', this.displayedBooks);
    this.cdr.detectChanges();
  }

  filterBooks(query: string): any[] | string {
    if (!query) {
      return this.books;
    }
    
    const results = this.books.filter(book =>
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase()) ||
      book.id.toString().includes(query.toLowerCase())
    );
    
    if (results.length === 0) {
      return "Couldn't find this book, try another"; // Return error message string
    }
    
    return results;
  }
}
