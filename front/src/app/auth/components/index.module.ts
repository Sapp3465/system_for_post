import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

import { PinInputComponent } from './pin-input/pin-input.component';


@NgModule({
  declarations: [PinInputComponent],
  imports: [CommonModule, MatIconModule, FormsModule],
  exports: [PinInputComponent]
})
export class AuthComponentsModule {}

