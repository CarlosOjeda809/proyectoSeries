import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle,
  IonCardTitle, IonChip, IonContent, IonFab, IonFabButton, IonFabList,
  IonHeader, IonIcon, IonImg, IonLabel, IonModal, IonRange, IonToast,
  IonText, IonicModule
} from '@ionic/angular';
import { SerieService } from "../../service/serie.service";
import { ApiResponseSerie, Serie } from "../../common/serie";
import { ActivatedRoute } from "@angular/router";
import { addIcons } from "ionicons";
import { ellipsisHorizontalOutline, logoInstagram, logoTwitter, logoYoutube } from "ionicons/icons";
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    HeaderComponent
  ]
})
export class DetallesPage implements OnInit {
  private readonly serieService: SerieService = inject(SerieService);
  serie: Serie = {
    _id: '',
    titulo: '',
    sinopsis: '',
    poster: '',
    categorias: [],
    fecha_emision: '',
    numero_capitulos: 0
  };
  id = '';
  isModalOpen = false;
  email: string = '';
  rating: number = 5;
  toastMessage: string = '';
  toastColor: string = 'success';

  constructor(private activatedRoute: ActivatedRoute) {
    const id = activatedRoute.snapshot.params['id'];
    this.id = id;
    addIcons({ logoYoutube, ellipsisHorizontalOutline, logoTwitter, logoInstagram });
  }

  ngOnInit() {
    this.getDetalle();
  }

  private getDetalle() {
    this.serieService.getSerie(this.id).subscribe({
      next: value => {
        this.serie = value.data;


      },
      complete: () => {
        console.log('Series loaded');
      },
      error: err => {
        console.error(err);
      }
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  submitRating() {

    if (this.email && this.rating) {

      this.toastMessage = 'Puntuación enviada correctamente';
      this.toastColor = 'success';

    } else {
      this.toastMessage = 'Hubo un error al enviar la puntuación';
      this.toastColor = 'danger';
    }

    this.showToast();
    this.closeModal();
  }

  showToast() {
    const toast = document.createElement('ion-toast');
    toast.message = this.toastMessage;
    toast.color = this.toastColor;
    toast.duration = 1000;
    document.body.appendChild(toast);
    toast.present();
  }

  onModalDismiss() {
    this.email = '';
    this.rating = 5;
  }
}
