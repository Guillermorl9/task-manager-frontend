import {Component, inject, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonCard,
  IonIcon,
  IonButton,
  IonSearchbar,
  IonRippleEffect,
  AlertController,
  ActionSheetController, IonChip, IonLabel
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
  trashOutline,
  listOutline,
  trendingUpOutline,
  trendingDownOutline
} from 'ionicons/icons';
import { CustomHeaderComponent } from '../../component/custom-header/custom-header.component';
import { TaskList } from '../../model/TaskList';
import {FormsModule} from "@angular/forms";
import {Category} from "../../model/Category";
import {TaskListDetailsComponent} from "../../component/task-list-details/task-list-details.component";
import {CreateCategoryModalComponent} from "../../component/create-category-modal/create-category-modal.component";
import {TaskManagerService} from "../../service/task-manager.service";

export enum SortOrder {
  NORMAL = 'normal',
  MORE_TASKS = 'more_tasks',
  LESS_TASKS = 'less_tasks'
}

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
    CreateCategoryModalComponent, IonChip, IonLabel
  ]
})
export class TasksListsPage implements OnInit {
  // Decorators
  @ViewChild(CreateCategoryModalComponent) categoryModal!: CreateCategoryModalComponent;
  @ViewChild(TaskListDetailsComponent) taskListDetailsModal!: TaskListDetailsComponent;

  // Services
  private taskManagerService: TaskManagerService = inject(TaskManagerService);
  private alertController: AlertController = inject(AlertController);
  private actionSheetController: ActionSheetController = inject(ActionSheetController);

  // Variables
  searchQuery: string = '';
  showSearch: boolean = false;
  allCategories: Category[] = [];
  filteredCategories: Category[] = [];
  currentSortOrder: SortOrder = SortOrder.NORMAL;

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
      ellipsisHorizontalOutline,
      trashOutline,
      listOutline,
      trendingUpOutline,
      trendingDownOutline
    });
  }

  ngOnInit(): void {
    this.taskManagerService.userCategories$.subscribe((categories) => {
      this.allCategories = categories;
      this.applyFiltersAndSort();
    });
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
      this.searchQuery = '';
      this.applyFiltersAndSort();
    }
  }

  onSearchChange(): void {
    this.applyFiltersAndSort();
  }

  async showFilterOptions(): Promise<void> {
    const actionSheet = await this.actionSheetController.create({
      header: 'Sort Categories',
      buttons: [
        {
          text: 'Normal Order',
          icon: 'list-outline',
          handler: () => {
            this.currentSortOrder = SortOrder.NORMAL;
            this.applyFiltersAndSort();
          }
        },
        {
          text: 'More Tasks First',
          icon: 'trending-up-outline',
          handler: () => {
            this.currentSortOrder = SortOrder.MORE_TASKS;
            this.applyFiltersAndSort();
          }
        },
        {
          text: 'Less Tasks First',
          icon: 'trending-down-outline',
          handler: () => {
            this.currentSortOrder = SortOrder.LESS_TASKS;
            this.applyFiltersAndSort();
          }
        },
      ]
    });
    await actionSheet.present();
  }

  private applyFiltersAndSort(): void {
    let categories = [...this.allCategories];

    if (this.searchQuery.trim()) {
      categories = this.filterCategoriesBySearch(categories, this.searchQuery.trim().toLowerCase());
    }

    categories = this.sortCategories(categories);

    this.filteredCategories = categories;
  }

  private filterCategoriesBySearch(categories: Category[], query: string): Category[] {
    return categories.map(category => {
      const categoryMatches = category.title.toLowerCase().includes(query);

      const filteredLists = category.lists.filter(list => {
        const listMatches = list.title.toLowerCase().includes(query);
        const taskMatches = list.tasks.some(task =>
          task.title.toLowerCase().includes(query) ||
          (task.description && task.description.toLowerCase().includes(query))
        );
        return listMatches || taskMatches;
      });

      if (categoryMatches || filteredLists.length > 0) {
        return {
          ...category,
          lists: categoryMatches ? category.lists : filteredLists
        };
      }

      return null;
    }).filter(category => category !== null) as Category[];
  }

  private sortCategories(categories: Category[]): Category[] {
    switch (this.currentSortOrder) {
      case SortOrder.MORE_TASKS:
        return categories.sort((a, b) => this.getTotalTasksInCategory(b) - this.getTotalTasksInCategory(a));

      case SortOrder.LESS_TASKS:
        return categories.sort((a, b) => this.getTotalTasksInCategory(a) - this.getTotalTasksInCategory(b));

      case SortOrder.NORMAL:
      default:
        return categories;
    }
  }

  getTotalTasksInCategory(category: Category): number {
    return category.lists.reduce((total, list) => total + list.tasks.length, 0);
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
