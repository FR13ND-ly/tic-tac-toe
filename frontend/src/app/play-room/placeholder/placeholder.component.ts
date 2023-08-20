import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.scss']
})
export class PlaceholderComponent {

  @Input() value: 'X' | 'O' | '' = '';
  @Input() boardSize : number = 3;
  @Output() move: EventEmitter<null> = new EventEmitter;

  @Input() isPlayerTurn: boolean = false;
  onMove() {
    this.move.emit();
  }
}
