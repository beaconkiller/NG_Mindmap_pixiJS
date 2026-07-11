import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PLayoutViewComponent } from './p-layout-view.component';

describe('PLayoutViewComponent', () => {
  let component: PLayoutViewComponent;
  let fixture: ComponentFixture<PLayoutViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PLayoutViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PLayoutViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
