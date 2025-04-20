import {Component, Input, OnInit} from '@angular/core';
import {IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar} from "@ionic/angular/standalone";

@Component({
    selector: 'app-custom-header',
    templateUrl: './custom-header.component.html',
    styleUrls: ['./custom-header.component.scss'],
    imports: [
        IonButtons,
        IonHeader,
        IonMenuButton,
        IonTitle,
        IonToolbar
    ]
})
export class CustomHeaderComponent {
  @Input() title: string = '';
  constructor() { }
}
