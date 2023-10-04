import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureNewComponent } from './feature-new.component';

describe('FeatureNewComponent', () => {
  let component: FeatureNewComponent;
  let fixture: ComponentFixture<FeatureNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
