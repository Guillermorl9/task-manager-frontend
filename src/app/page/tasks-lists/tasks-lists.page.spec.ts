import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksListsPage } from './tasks-lists.page';

describe('TasksListsPage', () => {
  let component: TasksListsPage;
  let fixture: ComponentFixture<TasksListsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksListsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
