import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BgsNotifPage } from './bgs-notif.page';

describe('BgsNotifPage', () => {
  let component: BgsNotifPage;
  let fixture: ComponentFixture<BgsNotifPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BgsNotifPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BgsNotifPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
