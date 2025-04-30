import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonButtonComponent } from '../common-button/common-button.component';
import { SharedCommonModule } from '../../../app/apimodule/api.module';

@Component({
  selector: 'app-common-table',
  standalone: true,
  imports: [CommonModule,CommonButtonComponent,SharedCommonModule],
  templateUrl: './common-table.component.html',
  styleUrl: './common-table.component.scss'
})
export class CommonTableComponent {

  @Input()
  tableColumns: { field: string; header: string }[] = [];

  @Input()
  tableData: Array<any> = [];
  @Input() flag:string | undefined;

  // Parameter for option (Edit, vieew, Delete)
  @Output() public editData = new EventEmitter<{ row: any, type: string }>();
  @Input() showLabel: boolean = false;
  constructor() { }
  ngOnInit(): void { }

  editTableData(row: any, mode: string) {
    console.log('mode: ', mode);
    console.log('row: ', row);
    this.editData.emit({ row, type: mode })
  }

}
