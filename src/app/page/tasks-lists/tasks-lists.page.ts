import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {CustomHeaderComponent} from "../../component/custom-header/custom-header.component";

@Component({
  selector: 'app-tasks-lists',
  templateUrl: './tasks-lists.page.html',
  styleUrls: ['./tasks-lists.page.scss'],
  standalone: true,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, CustomHeaderComponent]
})
export class TasksListsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
