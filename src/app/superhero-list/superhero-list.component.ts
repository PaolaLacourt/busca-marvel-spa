import { Component, OnInit } from '@angular/core';
import { MarvelService } from '../marvel.service';
import { Hero } from '../model/hero.model';
import { SuperheroDetailsComponent } from '../superhero-details/superhero-details.component';

@Component({
  selector: 'app-hero-list',
  templateUrl: './superhero-list.component.html',
  styleUrls: ['./superhero-list.component.css']
})
export class SuperheroListComponent implements OnInit {
  heroes: Hero[] = [];
  filteredHeroes: Hero[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 10;
  selectedHero: Hero | null = null;

  constructor(private marvelService: MarvelService) { }

  ngOnInit(): void {
    this.loadHeroes();
  }

  loadHeroes(): void {
    const offset = (this.currentPage - 1) * this.itemsPerPage;
    
    this.marvelService.getSuperheroes(offset, this.itemsPerPage).subscribe((data) => {
      this.heroes = data.data.results;
      this.totalPages = Math.ceil(data.data.total / this.itemsPerPage);
      this.filterHeroes();
    });
  }

  filterHeroes(): void {
    this.filteredHeroes = this.heroes.filter((hero) =>
      hero.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  pages: number[] = [];

  calculateVisiblePages(): number[] {
    const visiblePages: number[] = [];
    const maxVisiblePages = 6; // Máximo de páginas visíveis
  
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);
  
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = endPage - maxVisiblePages + 1;
    }
  
    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }
  
    return visiblePages;
  }
  
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadHeroes(); // Carregue os heróis da página selecionada
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadHeroes();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadHeroes();
    }
  }
}
