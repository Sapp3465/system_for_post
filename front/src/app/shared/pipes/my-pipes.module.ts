import { NgModule } from '@angular/core';

import { ValidationErrorPipe } from './validation-error.pipe';
import { BytePipe } from '@shared/pipes/byte.pipe';
import { DaysPipe } from '@shared/pipes/days.pipe';
import { CutPipe } from '@shared/pipes/cut.pipe';

export type MyPipesType = (
  typeof ValidationErrorPipe
  | typeof BytePipe
  | typeof DaysPipe
  | typeof CutPipe )[];

const myPipes: MyPipesType = [ ValidationErrorPipe, BytePipe, DaysPipe, CutPipe ];

@NgModule({
  declarations: [myPipes],
  exports: [myPipes]
})
export class MyPipesModule {
}
