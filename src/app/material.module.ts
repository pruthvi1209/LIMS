import {NgModule} from '@angular/core';

import { MatButtonModule , MatIconModule, MatFormFieldModule, MatInputModule,
     MatCheckboxModule, MatToolbarModule, MatSelectModule, MatOptionModule,
     MatCardModule, MatRadioModule, MatDialogModule, MatTabsModule, MatMenuModule, MatSidenavModule,
     MatProgressSpinnerModule} from '@angular/material';

@NgModule({
    imports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule,
         MatCheckboxModule, MatToolbarModule, MatSelectModule, MatOptionModule,
         MatCardModule, MatRadioModule, MatDialogModule, MatTabsModule, MatMenuModule, MatSidenavModule,
         MatProgressSpinnerModule],
    exports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule,
         MatCheckboxModule, MatToolbarModule, MatSelectModule, MatOptionModule,
          MatCardModule, MatRadioModule, MatDialogModule, MatTabsModule, MatMenuModule, MatSidenavModule,
          MatProgressSpinnerModule]
})
export class MaterialModule {

}
