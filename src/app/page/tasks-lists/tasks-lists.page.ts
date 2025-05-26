import {Component, inject, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonCard,
  IonIcon,
  IonButton,
  IonSearchbar,
  IonRippleEffect, AlertController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addCircleOutline,
  ellipsisVerticalOutline,
  searchOutline,
  filterOutline,
  addOutline,
  chevronForwardOutline,
  flagOutline,
  briefcaseOutline,
  homeOutline,
  fitnessOutline,
  schoolOutline,
  peopleOutline,
  timeOutline,
  ellipsisHorizontalOutline,
} from 'ionicons/icons';
import { CustomHeaderComponent } from '../../component/custom-header/custom-header.component';
import { TaskList } from '../../model/TaskList';
import {FormsModule} from "@angular/forms";
import {Category} from "../../model/Category";
import {TaskListDetailsComponent} from "../../component/task-list-details/task-list-details.component";
import {CreateCategoryModalComponent} from "../../component/create-category-modal/create-category-modal.component";
import {TaskManagerService} from "../../service/task-manager.service";

@Component({
  selector: 'app-tasks-lists',
  templateUrl: './tasks-lists.page.html',
  styleUrls: ['./tasks-lists.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonCard,
    IonIcon,
    IonButton,
    IonSearchbar,
    IonRippleEffect,
    CustomHeaderComponent,
    FormsModule,
    TaskListDetailsComponent,
    CreateCategoryModalComponent
  ]
})
export class TasksListsPage implements OnInit {
  // Decorators
  @ViewChild(CreateCategoryModalComponent) categoryModal!: CreateCategoryModalComponent;
  @ViewChild(TaskListDetailsComponent) taskListDetailsModal!: TaskListDetailsComponent;

  // Services
  private taskManagerService: TaskManagerService = inject(TaskManagerService);
  private alertController: AlertController = inject(AlertController);

  // Variables
  searchQuery: string = '';
  showSearch: boolean = false;
  allCategories: Category[] = [];

  constructor() {
    addIcons({
      addCircleOutline,
      ellipsisVerticalOutline,
      searchOutline,
      filterOutline,
      addOutline,
      chevronForwardOutline,
      flagOutline,
      briefcaseOutline,
      homeOutline,
      fitnessOutline,
      schoolOutline,
      peopleOutline,
      timeOutline,
      ellipsisHorizontalOutline
    });
  }

  ngOnInit(): void {
    this.taskManagerService.userCategories$.subscribe((categories) => {
      this.allCategories = categories;
    });
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
  }

  getCompletedTasksCount(taskList: TaskList): number {
    return taskList.tasks.filter(task => task.completed).length;
  }

  getTasksPercentage(taskList: TaskList): number {
    if (taskList.tasks.length === 0) return 0;
    return (this.getCompletedTasksCount(taskList) / taskList.tasks.length) * 100;
  }

  openCreateCategoryModal(): void {
    this.categoryModal.openCategoryModal().then((result) => {
      if (result && result.role === 'confirm' && result.data) {
        console.log('Categoría creada: ', result.data);
        this.createCategory(result.data);
      }
    })
  }

  private createCategory(categoryData: {title: string, icon: string}): void {
    const newCategory: Category = {
      ...categoryData,
      lists: []
    };

    this.taskManagerService.addCategory(newCategory);
  }

  async deleteCategory(categoryId: number | undefined): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirm deletion',
      message: 'Are you sure you want to eliminate this category?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Delete',
          handler: () => {
            if (categoryId)
            this.taskManagerService.deleteCategory(categoryId);
          }
        }
      ]
    });

    await alert.present();
  }

  openListDetails(taskList: TaskList): void {
    this.taskListDetailsModal.openTaskListPopover(taskList);
  }
}
