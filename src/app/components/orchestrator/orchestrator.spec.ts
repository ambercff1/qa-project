import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Orchestrator } from './orchestrator';

describe('Orchestrator', () => {
  let component: Orchestrator;
  let fixture: ComponentFixture<Orchestrator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Orchestrator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Orchestrator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
