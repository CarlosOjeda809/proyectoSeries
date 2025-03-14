import {Component, inject} from '@angular/core';
import {SerieService} from '../../services/serie.service';
import {ApiResponseSeries, Serie} from '../../common/serie';
import {formatDate, NgClass} from '@angular/common';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faTrashCan} from '@fortawesome/free-regular-svg-icons/faTrashCan';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SerieModalComponent} from '../serie-modal/serie-modal.component';
import {window} from 'rxjs';


@Component({
  selector: 'app-series-list',
  standalone: true,
  imports: [
    NgClass,
    FaIconComponent
  ],
  templateUrl: './series-list.component.html',
  styleUrl: './series-list.component.css'
})
export class SeriesListComponent {
  private readonly serieService: SerieService = inject(SerieService)
  private readonly modalService: NgbModal = inject(NgbModal);

  apiData!: ApiResponseSeries;
  series: Serie[] = [];
  categorias: string[] = [];


  constructor() {
    this.loadSeries();
  }

  private loadSeries() {
    this.serieService.getSeries().subscribe({
        next: value => {this.series = value.data},
        complete: () => {
          console.log('Series loaded')},
        error: err => {
          console.error(err)}
      }
    )

    this.serieService.getCategorias().subscribe({
        next: value => {this.categorias = value.data},
        complete: () => {
          console.log('Categories loaded')},
        error: err => {
          console.error(err)
        }
      }
    )
  }

  newSerie() {
    this.loadModal()
  }

  loadSerie(serie: Serie) {
    this.loadModal(serie)
  }

  loadModal(serie?: Serie) {
    const modalRef = this.modalService.open(SerieModalComponent);
    if (serie) {
      modalRef.componentInstance.editar = true;
      modalRef.componentInstance.serie = serie;
    } else {
      modalRef.componentInstance.editar = false;
    }
    modalRef.componentInstance.categorias = this.categorias;

    modalRef.result.then(() => {
      this.loadSeries();
      if (serie) {
        alert('Serie updated');
        this.loadSeries();
      } else {
        alert('Serie created');
        this.loadSeries();
      }
    }).catch((err) => console.error(err));


  }

  protected readonly faTrashCan = faTrashCan;

  removeSerie(serie: Serie) {
    if (confirm('Quieres borrar ' + serie.titulo + '?')) {
      this.serieService.deleteSerie(serie._id).subscribe({
        next: value => {
          console.log(value);
          alert(value.message);
          this.loadSeries();
        },
        error: err => {
          console.error(err);
        }
      });
    }
  }


    protected readonly formatDate = formatDate;
}
