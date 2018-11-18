import {NgModule} from '@angular/core';

import { MatButtonModule , MatIconModule, MatFormFieldModule, MatInputModule,
     MatCheckboxModule, MatToolbarModule, MatSelectModule, MatOptionModule,
     MatCardModule, MatRadioModule, MatDialogModule, MatTabsModule, MatMenuModule, MatSidenavModule,
     MatProgressSpinnerModule, MatSnackBarModule} from '@angular/material';

@NgModule({
    imports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule,
         MatCheckboxModule, MatToolbarModule, MatSelectModule, MatOptionModule,
         MatCardModule, MatRadioModule, MatDialogModule, MatTabsModule, MatMenuModule, MatSidenavModule,
         MatProgressSpinnerModule, MatSnackBarModule],
    exports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule,
         MatCheckboxModule, MatToolbarModule, MatSelectModule, MatOptionModule,
          MatCardModule, MatRadioModule, MatDialogModule, MatTabsModule, MatMenuModule, MatSidenavModule,
          MatProgressSpinnerModule, MatSnackBarModule]
})
export class MaterialModule {

}
