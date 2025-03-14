import { Component, inject, Input, OnInit } from '@angular/core';
import { Serie } from '../../common/serie';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SerieService } from '../../services/serie.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-serie-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FaIconComponent
  ],
  templateUrl: './serie-modal.component.html',
  styleUrl: './serie-modal.component.css'
})
export class SerieModalComponent implements OnInit {
  @Input() serie!: Serie;
  @Input({ required: true }) editar!: boolean;
  @Input({ required: true }) categorias!: string[];

  activeModal = inject(NgbActiveModal);
  private readonly serieService: SerieService = inject(SerieService)
  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  formSerie: FormGroup = this.formBuilder.group({
    _id: [''],
    titulo: [''],
    poster: ['images/fotogenerica.jpg'],
    categorias: [[]],
    numero_capitulos: [''],
    fecha_emision: [''],
    sinopsis: [''],
  });


  formMyNewCategoria = this.formBuilder.group({
    newCategoria: ['']
  });


  get titulo(): any {
    return this.formSerie.get('titulo')
  }

  get poster(): any {
    return this.formSerie.get('poster')
  }

  get categoriasF(): any {
    return this.formSerie.get('categorias')
  }

  get fechaEmision(): any {
    return this.formSerie.get('fechaEmision')
  }

  get sinopsis(): any {
    return this.formSerie.get('sinopsis')
  }

  get newCategoria(): any {
    return this.formMyNewCategoria.get('newCategoria')
  }

  ngOnInit() {
    if (this.editar) {
      this.formSerie.setValue(this.serie);
    } else {
      this.formSerie.reset();
      this.formSerie.setControl('poster',new FormControl("images/fotogenerica.jpg"))
    }
  }

  addNewCategoria(newCategoria: any) {
    let newCategorias;
    newCategorias = this.categoriasF.value;
    if (!newCategorias) newCategorias = [];
    newCategorias.push(newCategoria);
    this.formSerie.setControl('categorias', new FormControl(newCategorias))

    this.categorias.push(newCategoria);

    this.formMyNewCategoria.reset();
  }

  removeCategoria() {
    const selectedCategorias = this.categoriasF.value;
      const lastCategoria = selectedCategorias[selectedCategorias.length - 1];
      selectedCategorias.pop();
      this.formSerie.setControl('categorias', new FormControl(selectedCategorias));

      const index = this.categorias.indexOf(lastCategoria);
      if (index > -1) {
        this.categorias.splice(index, 1);
    }
  }

  onSubmit() {
    const serieData = this.formSerie.getRawValue();
    console.log(this.formSerie.getRawValue())
    if (!this.editar) {
      console.log("Datos enviados al backend:", serieData);

      this.serieService.addSerie(serieData).subscribe({
        next: value => {
          console.log(value)
          alert(value.message);
          this.activeModal.close();
        },
        error: err => {
          console.error("Error en la petición HTTP:", err);
          alert(err.message);
        }
      });
    } else {
      console.log("Datos enviados al backend:", serieData);

      this.serieService.updateSerie(serieData).subscribe({
        next: value => {
          console.log(value)
          alert(value.message);
          this.activeModal.close();
        },
        error: err => {
          console.error("Error en la petición HTTP:", err);
          alert(err.message);
        }
      });
    }

    this.activeModal.close();
  }

  protected readonly faPlusCircle = faPlusCircle;
  protected readonly faMinusCircle = faMinusCircle;
}
