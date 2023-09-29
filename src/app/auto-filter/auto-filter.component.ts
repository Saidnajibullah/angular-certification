import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-auto-filter',
  templateUrl: './auto-filter.component.html',
  styleUrls: ['./auto-filter.component.css'],
  inputs: [{
    name: 'data',
    required: true,
    alias: 'filterData'
  }],
  outputs: ['optionSelectedEvent: optionSelected', ]
})
export class AutoFilterComponent{
  data: string[] = [];
  optionSelected: string = "";
  filteredData: string[] = [];
  optionSelectedEvent: EventEmitter<string> = new EventEmitter();
  filterData(event: KeyboardEvent){
    const userInput = (event.target as HTMLInputElement).value;
    if(userInput){
      this.filteredData = this.data
      .filter(_data => _data.toLowerCase().includes(userInput))
      .map(_data => {
        const matchs = _data.match(new RegExp(userInput, 'gi'));
        matchs?.forEach(match => {
          _data = _data.replaceAll(match, `<b>${match}</b>`)
        });
        return _data;
      });
    }
    else this.filteredData = [];
  }
  eraseFilterData(event: FocusEvent){
    const data = (event.target as HTMLInputElement).value;
    if(!data) this.filteredData = [];
  }
  selectOption(data: string){
    const optionSelected = data.replaceAll(/<b>/gi, '').replaceAll(/<\/b>/gi, '');
    this.optionSelected = this.removeSubCategories(optionSelected);
    this.optionSelectedEvent.emit(optionSelected);
    this.filteredData = [];
  }
  clearOut(){
    this.optionSelected = "";
  }
  removeSubCategories(data: string){
    return data.split(":")[0]
  }
}
