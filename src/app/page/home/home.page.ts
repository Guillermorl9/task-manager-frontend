import { Component } from '@angular/core';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle, IonCheckbox,
  IonContent, IonIcon, IonLabel, IonText
} from '@ionic/angular/standalone';
import {CustomHeaderComponent} from "../../component/custom-header/custom-header.component";
import {TaskList} from "../../model/TaskList";
import {addCircleOutline, ellipsisVerticalOutline} from "ionicons/icons";
import {addIcons} from "ionicons";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, CustomHeaderComponent, CommonModule, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonText, IonIcon, IonLabel, IonCheckbox],
})
export class HomePage {
  // Variables
  housecholdChores: TaskList = {title: 'Household Chores', tasks: []};
  workTaskOrganization: TaskList = {title: 'Work Task Organization', tasks: []};
  todayTaskList: TaskList[] = [this.housecholdChores, this.workTaskOrganization];


    constructor() {
    addIcons({ addCircleOutline, ellipsisVerticalOutline });
  }
}
