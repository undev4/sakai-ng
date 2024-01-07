import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalNotFoundComponent } from './internal-not-found.component';

describe('InternalNotFoundComponent', () => {
  let component: InternalNotFoundComponent;
  let fixture: ComponentFixture<InternalNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternalNotFoundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InternalNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
