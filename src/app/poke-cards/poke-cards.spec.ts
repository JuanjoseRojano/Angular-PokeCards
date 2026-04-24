import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeCards } from './poke-cards';

describe('PokeCards', () => {
  let component: PokeCards;
  let fixture: ComponentFixture<PokeCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokeCards],
    }).compileComponents();

    fixture = TestBed.createComponent(PokeCards);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
