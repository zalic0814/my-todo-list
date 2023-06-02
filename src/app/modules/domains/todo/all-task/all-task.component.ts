import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-all-task',
  templateUrl: './all-task.component.html',
  styleUrls: ['./all-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllTaskComponent {}
