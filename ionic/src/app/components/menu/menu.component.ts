import { Component, inject, OnInit } from '@angular/core';
import { SerieService } from "../../service/serie.service";
import { Serie } from "../../common/serie";
import {
  IonAvatar,
  IonContent, IonGrid, IonImg, IonItem, IonLabel, IonList,
  IonMenu, IonMenuToggle, IonTitle, IonToolbar
} from "@ionic/angular/standalone";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
    IonMenu,
    IonToolbar,
    IonTitle,
    IonContent,
    IonMenuToggle,
    IonList,
    IonAvatar,
    IonImg,
    IonLabel,
    IonItem,
    RouterLink
  ]
})
export class MenuComponent implements OnInit {

  private serieService: SerieService = inject(SerieService);
  series: Serie[] = [];
  categorias: { nombre: string, imagen: string }[] = [];
  imagenGenerica: string = 'https://www.hemomadrid.com/wp-content/uploads/2015/11/foto-generica.jpg';

  constructor() { }

  ngOnInit() {
    this.loadCategorias();
  }

  private loadCategorias() {
    this.serieService.getSeries().subscribe({
      next: (data) => {
        const categoriasSet = new Set<string>();
        data.data.forEach((serie: Serie) => {
          serie.categorias.forEach(cat => categoriasSet.add(cat));
        });

        this.categorias = Array.from(categoriasSet).map(categoria => ({
          nombre: categoria,
          imagen: this.imagenGenerica
        }));
      },
      error: (err) => console.error(err),
      complete: () => console.log('Categorías cargadas')
    });
  }
}
