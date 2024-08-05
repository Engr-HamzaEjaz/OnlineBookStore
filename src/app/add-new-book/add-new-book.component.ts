import { Component } from '@angular/core';
import { AddBookService } from '../service/add-book.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-new-book.component.html',
  styleUrls: ['./add-new-book.component.css']
})
export class AddBookComponent {
  // Hard-coded book data
  bookData = {
    Bid: '123',
    Bname: 'Sample Book Title',
    Bauthor: 'Author Name',
    Bdescription: 'This is a sample description of the book.',
    Bimg: 'http://example.com/image.jpg'
  };


  constructor(private bookService: AddBookService) {}

  onSubmit(event: Event): void {
    event.preventDefault();
  
    console.log('Sending data to API:', this.bookData);
  
    this.bookService.addBook(this.bookData).subscribe({
      next: response => {
        alert('Book added successfully!');
        this.resetForm();
      },
      error: error => {
        console.error('Error adding book:', error);
        alert('Failed to add book. Please check the console for more details.');
      }
    });
  }
  

  resetForm(): void {
    // Reset the hard-coded data if needed
    this.bookData = {
      Bid: '123',
      Bname: 'Sample Book Title',
      Bauthor: 'Author Name',
      Bdescription: 'This is a sample description of the book.',
      Bimg: 'http://example.com/image.jpg'
    };
  }
}
