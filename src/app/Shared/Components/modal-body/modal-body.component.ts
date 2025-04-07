import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-modal-body',
  standalone: true,
  imports: [CommonModule, DialogModule],
  templateUrl: './modal-body.component.html',
  styleUrls: ['./modal-body.component.scss']
})
export class ModalBodyComponent {
  @Input() visible: boolean = false;
  @Input() customStyle: any = {};
  @Input() showHeader: boolean = true;
  @Input() showFooter: boolean = true;
  @Input() dismissableMask: boolean = false;
  @Input() maximizable: boolean = false;
  @Input() closable: boolean = true;
  @Input() modal: boolean = true;
  @Input() closeIcon: any = 'pi-times';
  @Input() customStyleClass: any = 'modal-body';
  @Input() bodyClass: string = '';
  @Input() custumCloseIcon: boolean = true;
  @Output() visibleChange = new EventEmitter<boolean>();


}
