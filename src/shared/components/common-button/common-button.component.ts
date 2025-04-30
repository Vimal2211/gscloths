import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-common-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './common-button.component.html',
  styleUrl: './common-button.component.scss'
})
export class CommonButtonComponent {
  @Input() btnName: string | undefined;
  @Input() btnType: string | undefined;
  @Input() showLabel: boolean = true;
  @Input() btnClass: string = 'btn btn-primary';
  @Output() public actionBtn = new EventEmitter<any>()

  constructor() { }
  ngOnInit() {
  }

  // Event Emit
  btnClick() {
    this.actionBtn.emit('cancel')
  }
}
