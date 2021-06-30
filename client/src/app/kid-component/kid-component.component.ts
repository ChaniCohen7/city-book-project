import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Kid } from '../Kid';

@Component({
  selector: 'app-kid-component',
  templateUrl: './kid-component.component.html',
  styleUrls: ['./kid-component.component.css'],
})
export class KidComponentComponent {
  @Input() kid!: Kid;
  @Input() index!: number;

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
      fullName: [
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
      id: [
        '',
        [
          Validators.required,
          Validators.maxLength(9),
          Validators.minLength(9),
          Validators.pattern('^[0-9 ]*$'),
        ],
      ],
      Date: [null, Validators.required],
    },
    {
      // Used custom validator
      validator: this.isValidIsraeliID('TZ'),
    }
  );

  newKid: Kid = {
    FullName: '',
    BornDate: new Date(),
    TZ: '',
    id: '',
  };

  id: any; //for store the tz from the localStorage
  constructor(private fb: FormBuilder) {}

  getPrevValueLocalStorage(index: number, key: any) {
    var allKids: [] = JSON.parse(localStorage.getItem('kids') || '[]');
    return allKids[index]?.[key] || '';
  }

  savePrevValueLocalStorage(index: number, key: any, value: any) {
    var allKids: any[] = JSON.parse(localStorage.getItem('kids') || '[]');
    if (!allKids[index]) {
      allKids[index] = {};
    }
    allKids[index][key] = value;
    localStorage.setItem('kids', JSON.stringify(allKids));
  }

  ngOnInit() {
    this.id = localStorage.getItem('TZ');
    this.newKid.id = this.id;
    this.newKid.FullName = this.getPrevValueLocalStorage(
      this.index,
      'FullName'
    );
    this.newKid.TZ = this.getPrevValueLocalStorage(this.index, 'TZ');
    this.newKid.BornDate = new Date(
      this.getPrevValueLocalStorage(this.index, 'BornDate')
    );
  }

  updateOnChange() {
    this.savePrevValueLocalStorage(
      this.index,
      'FullName',
      this.newKid.FullName
    );
    this.savePrevValueLocalStorage(this.index, 'TZ', this.newKid.TZ);
    this.savePrevValueLocalStorage(
      this.index,
      'BornDate',
      this.newKid.BornDate.toString()
    );
    this.savePrevValueLocalStorage(
      this.index,
      'id',
      this.newKid.id
    );
  }
}
