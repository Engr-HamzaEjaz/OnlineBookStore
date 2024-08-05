// import { HttpClient } from '@angular/common/http';
// import { Component, inject } from '@angular/core';
// import { GetBooksService } from '../service/get-books.service';
// import { ChangeDetectorRef } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-books',
//   standalone: true,
//   imports: [CommonModule,FormsModule],
//   templateUrl: './books.component.html',
//   styleUrl: './books.component.css',
// })
// export class BooksComponent {
//   books: any[] = [];
//   displayedBooks: any[] = [];
//   allBooksLoaded: boolean = false;

//   // constructor(private http: HttpClient) {
//   //   this.getBooks();
//   // }

//   //http = inject(HttpClient);

//   //bookService = inject(GetBooksService);

//   // constructor(private bookService: GetBooksService) {
//   //   this.getBooks();
//   // }
//   constructor(
//     private bookService: GetBooksService,
//     private cdr: ChangeDetectorRef
//   ) {
//     this.getBooks();
//   }

//   // getBooks() {
//   //   this.http
//   //     .get('https://jsonplaceholder.typicode.com/users')
//   //     .subscribe((res: any) => {
//   //       this.books = res;
//   //     });
//   // }

//   ngOnInit(): void {
//     this.getBooks();
//   }

//   getBooks() {
//     this.bookService.getBooks().subscribe((res: any) => {
//       this.books = res;
//       console.log('Books fetched:', this.books);
//       this.displayedBooks = this.books.slice(0, 3);
//       console.log('first 3 books printed', this.displayedBooks);
//     });
//   }

//   loadMoreBooks() {
//     console.log('Loading more books...');
//     const currentLength = this.displayedBooks.length;
//     const newLength = currentLength + 3;
//     console.log(`Current length: ${currentLength}, New length: ${newLength}`);

//     if (newLength > this.books.length) {
//       this.displayedBooks = this.books.slice(0);
//       this.allBooksLoaded = true;
//     } else {
//       this.displayedBooks = this.books.slice(0, newLength);
//     }

//     console.log('Displayed books updated:', this.displayedBooks);
//     this.cdr.detectChanges();
//   }
// }

//----------------------------------------------------------------------------------------------
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { GetBooksService } from '../service/get-books.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  books: any[] = [];
  displayedBooks: any[] = [];
  errorMessage: string | undefined;

  constructor(
    private bookService: GetBooksService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (res: any) => {
        this.books = res;
        console.log('Books fetched:', this.books);
        this.displayedBooks = this.books.slice(0, 3);
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
}


