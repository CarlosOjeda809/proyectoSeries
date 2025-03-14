import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { SerieService } from "../../service/serie.service";
import { Serie } from "../../common/serie";
import { RouterLink } from "@angular/router";
import { InfiniteScrollCustomEvent, IonicModule } from "@ionic/angular";
import { addIcons } from "ionicons";
import { searchOutline } from "ionicons/icons";

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, HeaderComponent]
})
export class PrincipalPage implements OnInit {
  private readonly serieService: SerieService = inject(SerieService);

  series: Serie[] = [];
  allSeries: Serie[] = [];
  itemsPerPage: number = 5;
  itemsPerScroll: number = 3;
  currentIndex: number = 0;

  constructor() {
    addIcons({ searchOutline });
  }

  ngOnInit() {
    this.loadSeries();
  }

  private loadSeries() {
    this.serieService.getSeries().subscribe({
      next: value => {
        this.allSeries = value.data.sort((a, b) => {
          return new Date(b.fecha_emision).getTime() - new Date(a.fecha_emision).getTime();
        });

        this.currentIndex = 0;
        this.series = this.allSeries.slice(this.currentIndex, this.itemsPerPage);
        this.currentIndex = this.itemsPerPage;
      },
      complete: () => console.log('Series loaded'),
      error: err => console.error(err)
    });
  }

  infinityScrollEvent(event: InfiniteScrollCustomEvent) {
    setTimeout(() => {
      const newSeries = this.allSeries.slice(this.currentIndex, this.currentIndex + this.itemsPerScroll);
      this.series = [...this.series, ...newSeries];
      this.currentIndex += this.itemsPerScroll;

      event.target.complete();

      if (this.currentIndex >= this.allSeries.length) {
        event.target.disabled = true;
      }
    }, 700);
  }
}
