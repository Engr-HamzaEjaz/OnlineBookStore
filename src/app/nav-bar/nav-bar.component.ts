import { Component } from '@angular/core';
import { SearchService } from '../service/search.service'; // Adjust the import path if necessary
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  searchQuery: string = '';

  constructor(private searchService: SearchService) {}

  onSearchChange(query: string): void {
    this.searchQuery = query;
    this.searchService.updateSearchQuery(query.toLowerCase());
  }
}

