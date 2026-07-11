import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PMainComponent } from './p-main.component';

describe('PMainComponent', () => {
  let component: PMainComponent;
  let fixture: ComponentFixture<PMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
