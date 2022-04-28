import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';

export type SortFuncType = (a: any, b: any) => number;

export type SortDataType = (sort: Sort) => SortFuncType;

@Injectable({
  providedIn: 'root'
})
export class SortService {

  public isDirectionEmpty(sort: Sort): boolean {
    return !sort.active || sort.direction === ''
  }

  public sortData: SortDataType = (sort: Sort): SortFuncType => (a, b) => {
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'name': return this.compare(a.name, b.name, isAsc);
      default: return 0;
    }
  }

  private compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
