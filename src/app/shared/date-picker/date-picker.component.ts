import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePickerDialogComponent } from '../date-picker-dialog/date-picker-dialog.component';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatNativeDateModule,
  ],
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent {
  @Input() label: string = 'Дата';
  @Input() value: Date | null = null;
  @Output() valueChange = new EventEmitter<Date | null>();

  constructor(private dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(DatePickerDialogComponent, {
      data: { value: this.value },
      autoFocus: false,
      restoreFocus: false,
      panelClass: 'date-picker-dialog-panel',
    });
    dialogRef.afterClosed().subscribe((result: Date | undefined) => {
      if (result) {
        this.valueChange.emit(result);
      }
    });
  }

  clearDate() {
    this.valueChange.emit(null);
  }
}
