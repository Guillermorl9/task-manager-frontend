import { Component, OnInit } from '@angular/core';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle, IonCheckbox,
  IonContent, IonIcon, IonText
} from '@ionic/angular/standalone';
import {CustomHeaderComponent} from "../../component/custom-header/custom-header.component";
import {TaskList} from "../../model/TaskList";
import {addCircleOutline, ellipsisVerticalOutline} from "ionicons/icons";
import {addIcons} from "ionicons";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-tasks-lists',
  templateUrl: './tasks-lists.page.html',
  styleUrls: ['./tasks-lists.page.scss'],
  standalone: true,
  imports: [IonContent, CustomHeaderComponent, CommonModule, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonText, IonText, IonIcon, IonCheckbox]
})
export class TasksListsPage {
  // Variables
  housecholdChores: TaskList = {title: 'Household Chores', tasks: []};
  workTaskOrganization: TaskList = {title: 'Work Task Organization', tasks: []};
  housecholdChores2: TaskList = {title: 'Household Chores', tasks: []};
  workTaskOrganization3: TaskList = {title: 'Work Task Organization', tasks: []};
  housecholdChores4: TaskList = {title: 'Household Chores', tasks: []};
  workTaskOrganization5: TaskList = {title: 'Work Task Organization', tasks: []};
  allTaskList: TaskList[] = [this.housecholdChores, this.workTaskOrganization, this.housecholdChores2, this.workTaskOrganization3, this.housecholdChores4, this.workTaskOrganization5];
  constructor() {
    addIcons({ addCircleOutline, ellipsisVerticalOutline });
  }

}
