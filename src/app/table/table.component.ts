import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  data: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient.get<any[]>('https://jsonplaceholder.typicode.com/posts').subscribe((data: any[]) => {
      console.log(data);
      this.data = data;
    });
  }

  get paginatedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.data.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.hasNextPage()) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.hasPrevPage()) {
      this.currentPage--;
    }
  }

  hasNextPage(): boolean {
    return this.currentPage < this.totalPages();
  }

  hasPrevPage(): boolean {
    return this.currentPage > 1;
  }

  totalPages(): number {
    return Math.ceil(this.data.length / this.itemsPerPage);
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}

