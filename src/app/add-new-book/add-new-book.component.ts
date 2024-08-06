import { Component } from '@angular/core';
import { AddBookService } from '../service/add-book.service'; // Adjust the import path if necessary
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-new-book',
  templateUrl: './add-new-book.component.html',
  styleUrls: ['./add-new-book.component.css'],
  standalone: true,
  imports: [FormsModule] 
})
export class AddNewBookComponent {
  book = {
    id: '',
    title: '',
    author: '',
    description: '',
    img: ''
  };

  constructor(private addBookService: AddBookService) {}

  onSubmit(): void {
      console.log('Adding book:', this.book);

      this.addBookService.addBook(this.book).subscribe({
        next: (data) => {
          console.log('Book added successfully:', data);
          this.resetForm();
        },
        error: (error) => {
          console.error('Failed to add book.', error);    
        }
      });
  }

  resetForm(): void {
    this.book = {
    id: '',
    title: '',
    author: '',
    description: '',
    img: ''
    };
  }
}
