import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../User';
import { DataFormService } from '../data-form.service';
import { Kid } from '../Kid';

@Component({
  selector: 'app-usercomponent',
  templateUrl: './usercomponent.component.html',
  styleUrls: ['./usercomponent.component.css'],
})
export class UsercomponentComponent {
  newUser: User = {
    FirstName: '',
    LastName: '',
    TZ: '',
    BornDate: new Date(),
    Genus: '',
    HMO: '',
  };

  newKid: Kid = {
    FullName: '',
    BornDate: new Date(),
    TZ: '',
    id: '',
  };

  kids: any[] = [];

  isValidIsraeliID(id: any) {
    id = String(id).trim();
    if (id.length > 9 || id.length < 5 || isNaN(id)) return false;

    // Pad string with zeros up to 9 digits
    id = id.length < 9 ? ('00000000' + id).slice(-9) : id;

    return (
      Array.from(id, Number).reduce((counter, digit, i) => {
        const step = digit * ((i % 2) + 1);
        return counter + (step > 9 ? step - 9 : step);
      }) %
        10 ===
      0
    );
  }

  addressForm = this.fb.group(
    {
      company: null,
      firstName: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      TZ: [
        '',
        [Validators.required, Validators.maxLength(9), Validators.minLength(9)],
      ],
      HMO: [null, Validators.required],
      Date: [null, Validators.required],
      genus: [null, Validators.required],
      postalCode: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(5),
        ]),
      ],
      segenusx: ['mail', Validators.required],
    },
    {
      // Used custom validator
      validator: this.isValidIsraeliID('TZ'),
    }
  );

  HMO = [
    { name: 'Macaby', abbreviation: 'Macaby' },
    { name: 'Klalit', abbreviation: 'Klalit' },
    { name: 'Meuchedet', abbreviation: 'Meuchedet' },
    { name: 'Leumit', abbreviation: 'Leumit' },
  ];

  constructor(
    private fb: FormBuilder,
    private dataFormService: DataFormService
  ) {}

  getPrevValueLocalStorage(key: any) {
    return localStorage.getItem(key) || '';
  }

  savePrevValueLocalStorage(key: any, value: any) {
    localStorage.setItem(key, value);
  }

  ngOnInit() {
    this.newUser.FirstName = this.getPrevValueLocalStorage('firstName');
    this.newUser.LastName = this.getPrevValueLocalStorage('lastName');
    this.newUser.TZ = this.getPrevValueLocalStorage('TZ');
    this.newUser.HMO = this.getPrevValueLocalStorage('HMO');
    this.newUser.Genus = this.getPrevValueLocalStorage('Genus');
    this.newUser.BornDate = new Date(this.getPrevValueLocalStorage('BornDate'));
    this.kids.push(
      ...JSON.parse(this.getPrevValueLocalStorage('kids') || '[]')
    );
  }

  updateOnChange() {
    this.savePrevValueLocalStorage('firstName', this.newUser.FirstName);
    this.savePrevValueLocalStorage('lastName', this.newUser.LastName);
    this.savePrevValueLocalStorage('TZ', this.newUser.TZ);
    this.savePrevValueLocalStorage('HMO', this.newUser.HMO);
    this.savePrevValueLocalStorage('Genus', this.newUser.Genus);
    this.savePrevValueLocalStorage(
      'BornDate',
      this.newUser.BornDate.toString()
    );
  }

  onSubmit(): void {
    this.dataFormService.addUser(this.newUser).subscribe();
    this.kids = JSON.parse(localStorage.getItem('kids') || '[]');
    this.kids.map((k) => {
      this.dataFormService.addKid(k).subscribe();
    });
  }

  saveTZ() {
    this.savePrevValueLocalStorage('TZ', this.newUser.TZ);
  }

  addKids() {
    if (localStorage.getItem('TZ') == '')
      alert('You Must Enter Your ID Number For Adding  Children');
    this.kids.push(this.newKid);
  }
}
