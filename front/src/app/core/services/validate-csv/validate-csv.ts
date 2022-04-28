import { Injectable } from '@angular/core';
import {ErrorMessageType} from "../../../user/catalog/components/file-loader/file-loader.component";
import {BehaviorSubject} from "rxjs";
import {DataTableProducts} from "../../../user/catalog/catalog.components";

export interface RowsCsvType {
  unique?: boolean,
  rowName: string,
  canBeNull?: boolean
  combineRows?: string[]
}

export interface ParseCsvResult {
  result: DataTableProducts[],
  errors: string[]
}

@Injectable({
  providedIn: 'root'
})
export class ValidateCsv {
  public errorsCsv$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  private checkHeadersName(names: string[]): string[] {
    const errors: string[] = [];
    const allNames: string[] = ['product code', 'name', 'availability', 'replacement', 'exclusive', 'units'];
    names.forEach((name: string, i: number): void => {
      if(!name) return
      const allIndex: number = allNames.indexOf(name);
      if(allIndex < 0) {
        errors.push(`Unknown title name '${name}'`);
        return;
      }
      allNames.splice(allIndex, 1);
    })
    if(allNames.length) errors.push(`Unknown title names '${allNames}'`);
    return errors;
  }

  private headerArray(rowData: string | ArrayBuffer | null): string[] {
    const stringData: string = `${rowData}`;
    const [header] = stringData.split('\r\n').filter((str: string) => str)
    return header.split(';');
  }

  private headersPosition(arrHeader: string[]): string[] {
    let lastHead: string = '';
    return arrHeader.map((el: string) => {
      if(!el) return lastHead;
      lastHead = el;
      return lastHead;
    })
  }

  private dataArray(rowData: string | ArrayBuffer | null): string[][] {
    const stringData: string = `${rowData}`;
    const [_, ...middleData] = stringData.split('\r\n').filter((str: string) => str)
    return middleData.map((str: string) => str.split(';'));
  }

  private formData(data: string[][], headPositions: string[], customersCode: string[] )
    : ParseCsvResult {
    const errors: string[] = [];
    const usedNames: string[] = [];
    const availabilities: string[] = ['in stock', 'out of stock', 'discontinued'];
    const result: DataTableProducts[] = [];
    for (let i = 0; i < data.length; i++){
      let product: DataTableProducts = {
        exclusive: [], replacement: [], availability: {}, name: '', code: '', units: []
      };
      const allUnits: string[] = [];
      for (let j = 0; j < data[i].length; j++){
        if(headPositions[j] === 'product code'){
          const userIndex: number = usedNames.indexOf(data[i][j]);
          if(userIndex >= 0){
            errors.push(`Product code '${data[i][j]}' in the row #${i + 2} is already used in the row #${userIndex + 2}`)
            break;
          }
          usedNames.push(data[i][j]);
          product.code = data[i][j];
        }else if(headPositions[j] === 'name'){
          product.name = data[i][j];
        }else if(headPositions[j] === 'availability'){
          if(availabilities.indexOf(data[i][j]) < 0){
            errors.push(
              `Availability ${data[i][j]} in the row #${i + 2} is unknown (you can use only one of this availability '${availabilities}')`)
            break;
          }
          product.availability = { [data[i][j]]: true };
        }else if(headPositions[j] === 'replacement'){
          if(!product.replacement) product.replacement = [];
          if(usedNames.indexOf(data[i][j]) < 0 && data[i][j]){
            errors.push(
              `Replacement in the row #${i + 2}, column #${j + 1} is not possible because it product name is unknown (you can use only one of this name '${usedNames}')`)
            break;
          }
          if(data[i][j]) product.replacement.push(data[i][j]);
        }else if(headPositions[j] === 'exclusive'){
          if(customersCode.indexOf(data[i][j]) < 0 && data[i][j]){
            errors.push(
              `Unknown customer code in the row #${i + 2}, column #${j + 1}`)
            break;
          }
          if(!product.exclusive) product.exclusive = [];
          if(data[i][j]) product.exclusive.push(data[i][j]);
        }else if (headPositions[j] === 'units') {
          if(!product.units) product.units = [];
          let [unit, price] = data[i][j].split('|');
          if(unit && !price || !unit && price){
            errors.push(
              `Incorrect filling of the unit field on row #${i + 2}, column #${j + 1} (example: kg|12)`)
            break;
          }
          const unitIndex: number = allUnits.indexOf(unit);
          if(unitIndex >= 0 && data[i][j]){
            errors.push(
              `Unit '${unit}' in the row #${i + 2}, column #${j + 1} is already used in the column #${unitIndex + 1}`)
            break;
          }
          allUnits.push(unit)
          if(data[i][j]) product.units.push({ unit, price })
        }else {
          errors.push(
            `Unknown field in the row #${i + 2}, column #${j + 1}`)
        }
      }
      result.push(product);
    }
    return { result, errors };
  }

  public validate(rowData: string | ArrayBuffer | null, customersCode: string[]): ParseCsvResult {
    const errors: string[] = []
    const arrHeader: string[] = this.headerArray(rowData);
    errors.push(...this.checkHeadersName(arrHeader));
    const headPositions: string[] = this.headersPosition(arrHeader);
    const data: string[][] = this.dataArray(rowData);
    const parseResult: ParseCsvResult = this.formData(data, headPositions, customersCode);
    errors.push(...parseResult.errors);
    return { result: parseResult.result, errors };
  }
}
