import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { inject } from '@angular/core';
import { Task, TaskForm, TaskPriority, TaskStatus } from '../models/task.model';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from '../shared/date-picker/date-picker.component';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    DatePickerComponent, // добавляем новый компонент
  ],
  standalone: true,
})
export class TaskFormComponent implements OnInit {
  // Получаем перечисления для выпадающих списков
  statuses = Object.values(TaskStatus);
  priorities = Object.values(TaskPriority);

  taskForm: FormGroup; // Форма для задачи

  private dialogRef = inject(MatDialogRef<TaskFormComponent>, {
    optional: true,
  });

  // Инжектируем данные диалога, если они есть (для редактирования)
  private data = inject(MAT_DIALOG_DATA, { optional: true }) as Task | null;

  isEditMode = false;

  constructor() {
    // Инициализация формы с валидаторами
    this.taskForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl('', [Validators.required]),
      status: new FormControl(TaskStatus.TODO, [Validators.required]),
      priority: new FormControl(TaskPriority.MEDIUM, [Validators.required]),
      assignee: new FormControl('', [Validators.required]),
      deadline: new FormControl(null, [Validators.required]),
    });

    this.isEditMode = !!this.data;
  }

  ngOnInit(): void {
    // Если есть данные для редактирования, заполняем форму
    if (this.data) {
      this.taskForm.patchValue({
        title: this.data.title,
        description: this.data.description,
        status: this.data.status,
        priority: this.data.priority,
        assignee: this.data.assignee,
        deadline: this.data.deadline ? new Date(this.data.deadline) : null, // корректно приводим к Date
      });
    }
  }

  saveTask(): void {
    if (this.taskForm.valid) {
      // Значение дедлайна автоматически привязано к задаче через formControl
      if (this.dialogRef) {
        this.dialogRef.close(this.taskForm.value as TaskForm);
      } else {
        console.warn(
          'DialogRef is not available. TaskFormComponent is being used outside of a dialog.'
        );
      }
    }
  }

  cancel(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  onDatepickerClosed(): void {
    // Можно добавить логику при закрытии datepicker, если нужно
  }
}
