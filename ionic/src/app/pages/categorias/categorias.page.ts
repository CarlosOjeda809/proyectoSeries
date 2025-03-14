import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SerieService } from "../../service/serie.service";
import { Serie } from "../../common/serie";
import { InfiniteScrollCustomEvent, IonicModule } from "@ionic/angular";
import { HeaderComponent } from "../../components/header/header.component";
import { RouterLink } from "@angular/router";
import { Location, NgClass } from "@angular/common";
import { addIcons } from "ionicons";
import { searchOutline } from "ionicons/icons";

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
  standalone: true,
  imports: [IonicModule, HeaderComponent, RouterLink, NgClass],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CategoriasPage implements OnInit {

  private readonly serieService: SerieService = inject(SerieService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  series: Serie[] = [];
  allSeries: Serie[] = [];
  categorias: string[] = [];
  imagenGenerica: string = 'https://www.hemomadrid.com/wp-content/uploads/2015/11/foto-generica.jpg';
  categoriaSeleccionada: string | null = null;
  infiniteScrollDisabled = false;
  private originalSeries: Serie[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 5;
  itemsPerScroll: number = 3;

  constructor(private location: Location) {
    addIcons({ searchOutline });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.categoriaSeleccionada = params.get('categoria');
    });

    this.loadSeries();
  }

  private loadSeries() {
    this.serieService.getSeries().subscribe({
      next: data => {
        this.allSeries = data.data;
        this.originalSeries = [...this.allSeries];

        const categoriasSet = new Set<string>();
        this.allSeries.forEach(serie => {
          serie.categorias.forEach(cat => categoriasSet.add(cat));
        });
        this.categorias = Array.from(categoriasSet);

        this.allSeries.sort((a, b) => {
          return new Date(b.fecha_emision).getTime() - new Date(a.fecha_emision).getTime();
        });

        if (this.categoriaSeleccionada) {
          this.filtrarPorCategoria(this.categoriaSeleccionada);
        } else {
          this.resetPagination();
        }
      },
      complete: () => console.log('Series y categorías cargadas'),
      error: err => console.error(err)
    });
  }


  filtrarPorCategoria(nombreCategoria: string) {
    this.categoriaSeleccionada = nombreCategoria;
    this.originalSeries = this.allSeries.filter(serie =>
      serie.categorias.includes(nombreCategoria)
    );
    this.resetPagination();
  }

  restablecerFiltro() {
    this.categoriaSeleccionada = null;
    this.originalSeries = [...this.allSeries];
    this.resetPagination();
  }

  private resetPagination() {
    this.currentPage = 0;
    this.series = this.originalSeries.slice(0, this.itemsPerPage);
    this.infiniteScrollDisabled = false;
  }

  infinityScrollEvent(event: InfiniteScrollCustomEvent) {
    setTimeout(() => {
      const startIndex = this.series.length;
      const newSeries = this.originalSeries.slice(startIndex, startIndex + this.itemsPerScroll);
      this.series = [...this.series, ...newSeries];

      event.target.complete();

      if (this.series.length >= this.originalSeries.length) {
        event.target.disabled = true;
      }
    }, 500);
  }
}
