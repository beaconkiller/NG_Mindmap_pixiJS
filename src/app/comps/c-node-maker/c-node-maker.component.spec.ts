import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CNodeMakerComponent } from './c-node-maker.component';

describe('CNodeMakerComponent', () => {
  let component: CNodeMakerComponent;
  let fixture: ComponentFixture<CNodeMakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CNodeMakerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CNodeMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
