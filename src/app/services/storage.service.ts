import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

// Можно удалить файл, если он больше не используется

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly STORAGE_KEY = 'tasks';

  saveTasks(tasks: Task[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error('Error saving tasks to localStorage:', e);
    }
  }

  getTasks(): Task[] {
    try {
      const tasks = localStorage.getItem(this.STORAGE_KEY);
      return tasks ? JSON.parse(tasks) : [];
    } catch (e) {
      console.error('Error reading tasks from localStorage:', e);
      return [];
    }
  }
}
