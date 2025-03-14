import { Component, OnInit } from '@angular/core';
import {addIcons} from "ionicons";
import {arrowBackOutline, ellipsisVerticalOutline} from "ionicons/icons";
import {IonicModule} from "@ionic/angular";
import {RouterLink} from "@angular/router";
import {Location} from "@angular/common";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    IonicModule,
    RouterLink
  ],
  standalone: true
})
export class HeaderComponent  implements OnInit {

  constructor(private location: Location) {
    addIcons({arrowBackOutline, ellipsisVerticalOutline})
  }

  goBack() {
    this.location.back()
  }

  ngOnInit() {}

}
