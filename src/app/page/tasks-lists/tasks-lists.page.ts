import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import {CustomHeaderComponent} from "../../component/custom-header/custom-header.component";

@Component({
  selector: 'app-tasks-lists',
  templateUrl: './tasks-lists.page.html',
  styleUrls: ['./tasks-lists.page.scss'],
  standalone: true,
    imports: [IonContent, CustomHeaderComponent]
})
export class TasksListsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
