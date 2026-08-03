import { ComponentFixture, TestBed } from '@angular/core/testing';

import { COverlayParentComponent } from './c-overlay-parent.component';

describe('COverlayParentComponent', () => {
  let component: COverlayParentComponent;
  let fixture: ComponentFixture<COverlayParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [COverlayParentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(COverlayParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
