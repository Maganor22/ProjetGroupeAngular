import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagerieUserComponent } from './messagerie-user.component';

describe('MessagerieUserComponent', () => {
  let component: MessagerieUserComponent;
  let fixture: ComponentFixture<MessagerieUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagerieUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagerieUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
