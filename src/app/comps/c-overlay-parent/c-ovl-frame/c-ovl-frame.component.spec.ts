import { ComponentFixture, TestBed } from '@angular/core/testing';

import { COvlFrameComponent } from './c-ovl-frame.component';

describe('COvlFrameComponent', () => {
  let component: COvlFrameComponent;
  let fixture: ComponentFixture<COvlFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [COvlFrameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(COvlFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
