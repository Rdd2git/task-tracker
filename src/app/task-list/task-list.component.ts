import { Component, ViewChild, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import { Store } from '@ngrx/store';
import { TaskActions } from '../store/task.actions';
import { adapter } from '../store/task.reducer';
import { Task } from '../models/task.model';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSort } from '@angular/material/sort';

const { selectAll } = adapter.getSelectors();

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class TaskListComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;

  private store = inject(Store);
  private dialog = inject(MatDialog);

  dataSource = new MatTableDataSource<Task>([]);
  columns = ['title', 'status', 'priority', 'assignee', 'deadline', 'actions'];

  ngOnInit(): void {
    this.store
      .select((state: any) => selectAll(state.tasks))
      .subscribe((tasks) => {
        this.dataSource.data = tasks;
        this.dataSource.sort = this.sort;
      });
  }

  openTaskForm(): void {
    const dialogRef = this.dialog.open(TaskFormComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newTask: Task = {
          ...result,
          id: Date.now(),
        };
        this.store.dispatch(TaskActions.addTask({ task: newTask }));
      }
    });
  }

  deleteTask(id: number): void {
    this.store.dispatch(TaskActions.deleteTask({ id }));
  }

  editTask(task: Task): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      data: task,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(
          TaskActions.updateTask({
            id: task.id,
            task: result,
          })
        );
      }
    });
  }
}
