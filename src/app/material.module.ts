import {NgModule} from '@angular/core';

import { MatButtonModule , MatIconModule, MatFormFieldModule, MatInputModule,
     MatCheckboxModule, MatToolbarModule, MatSelectModule, MatOptionModule,
     MatCardModule, MatRadioModule, MatDialogModule, MatTabsModule, MatMenuModule, MatSidenavModule} from '@angular/material';

@NgModule({
    imports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule,
         MatCheckboxModule, MatToolbarModule, MatSelectModule, MatOptionModule,
         MatCardModule, MatRadioModule, MatDialogModule, MatTabsModule, MatMenuModule, MatSidenavModule],
    exports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule,
         MatCheckboxModule, MatToolbarModule, MatSelectModule, MatOptionModule,
          MatCardModule, MatRadioModule, MatDialogModule, MatTabsModule, MatMenuModule, MatSidenavModule]
})
export class MaterialModule {

}
