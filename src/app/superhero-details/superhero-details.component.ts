import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarvelService } from '../marvel.service';

@Component({
  selector: 'app-superhero-details',
  templateUrl: './superhero-details.component.html',
  styleUrls: ['./superhero-details.component.css'],
})
export class SuperheroDetailsComponent implements OnInit {
  superheroId!: number; 
  superheroDetails: any;

  constructor(
    private route: ActivatedRoute,
    private marvelService: MarvelService
  ) {}

  ngOnInit(): void {
    this.superheroId = +this.route.snapshot.paramMap.get('id')!;
    this.marvelService.getSuperheroDetails(this.superheroId).subscribe((data) => {
      this.superheroDetails = data;
      console.log(this.superheroDetails);
    });
  }
}
