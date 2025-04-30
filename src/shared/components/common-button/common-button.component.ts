import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-common-button',
  standalone: true,
  imports: [],
  templateUrl: './common-button.component.html',
  styleUrl: './common-button.component.scss'
})
export class CommonButtonComponent {
  @Input() btnName: string | undefined;
  @Input() btnType: string | undefined;

  @Output() public actionBtn = new EventEmitter<any>()
  @Input() btnClass: string = 'btn btn-primary';
  constructor() { }
  ngOnInit() {
  }

  btnClick() {
    this.actionBtn.emit('cancel')
  }
}
