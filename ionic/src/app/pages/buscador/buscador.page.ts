import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar,
  IonCard, IonCardContent,
  IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol,
  IonContent,
  IonHeader, IonImg, IonItem, IonLabel, IonList, IonRow,
  IonSearchbar, IonThumbnail,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { HeaderComponent } from "../../components/header/header.component";
import { RouterLink } from "@angular/router";
import { SerieService } from "../../service/serie.service";
import { Serie } from "../../common/serie";

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.page.html',
  styleUrls: ['./buscador.page.scss'],
  standalone: true,
  imports: [IonContent, IonToolbar, CommonModule, FormsModule, HeaderComponent, IonSearchbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonImg, RouterLink, IonList, IonItem, IonLabel,IonThumbnail, IonCardContent]
})
export class BuscadorPage implements OnInit {

  private readonly serieService: SerieService = inject(SerieService);
  series: Serie[] = [];
  searchQuery: string = '';

  constructor() { }

  ngOnInit() {
    this.loadSeries();
  }

  private loadSeries() {
    this.serieService.getSeries().subscribe({
      next: value => {
        this.series = value.data;
        this.sortSeriesByDate();
      },
      complete: () => {
        console.log('Series loaded');
      },
      error: err => {
        console.error(err);
      }
    });
  }

  private sortSeriesByDate() {
    this.series.sort((a, b) => {
      const fechaA = new Date(a.fecha_emision);
      const fechaB = new Date(b.fecha_emision);
      return fechaB.getTime() - fechaA.getTime();
    });
  }

  buscar(event: any) {
    this.searchQuery = event.target.value;
    if (this.searchQuery.length > 2) {
      this.serieService.buscarSeries(this.searchQuery).subscribe({
        next: value => {
          this.series = value.data;
          this.sortSeriesByDate();
        },
        error: err => {
          console.error(err);
        }
      });
    } else {
      this.loadSeries();
    }
  }
}
