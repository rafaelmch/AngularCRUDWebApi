import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoasComponentComponent } from './pessoas-component.component';

describe('PessoasComponentComponent', () => {
  let component: PessoasComponentComponent;
  let fixture: ComponentFixture<PessoasComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PessoasComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PessoasComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
