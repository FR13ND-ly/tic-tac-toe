import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayRoomComponent } from './play-room.component';

describe('PlayRoomComponent', () => {
  let component: PlayRoomComponent;
  let fixture: ComponentFixture<PlayRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayRoomComponent]
    });
    fixture = TestBed.createComponent(PlayRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
