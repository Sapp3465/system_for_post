import { NgModule } from '@angular/core';

import { UserComponents } from './user.components';
import { UserRoutingModule } from './user-routing.module';
import { UserComponentsModule } from './components/index.module';

@NgModule({
  declarations: [
    UserComponents
  ],
  imports: [UserRoutingModule, UserComponentsModule],
  providers: []
})
export class UserModule { }
