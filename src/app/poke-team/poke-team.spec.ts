import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeTeam } from './poke-team';

describe('PokeTeam', () => {
  let component: PokeTeam;
  let fixture: ComponentFixture<PokeTeam>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokeTeam],
    }).compileComponents();

    fixture = TestBed.createComponent(PokeTeam);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
