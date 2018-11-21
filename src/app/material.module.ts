import {NgModule} from '@angular/core';

import { MatButtonModule , MatIconModule, MatFormFieldModule, MatInputModule,
     MatCheckboxModule, MatToolbarModule, MatSelectModule, MatOptionModule,
     MatCardModule, MatRadioModule, MatDialogModule, MatTabsModule, MatMenuModule, MatSidenavModule,
     MatProgressSpinnerModule, MatSnackBarModule, MatSlideToggleModule} from '@angular/material';

@NgModule({
    imports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule,
         MatCheckboxModule, MatToolbarModule, MatSelectModule, MatOptionModule,
         MatCardModule, MatRadioModule, MatDialogModule, MatTabsModule, MatMenuModule, MatSidenavModule,
         MatProgressSpinnerModule, MatSnackBarModule, MatSlideToggleModule],
    exports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule,
         MatCheckboxModule, MatToolbarModule, MatSelectModule, MatOptionModule,
          MatCardModule, MatRadioModule, MatDialogModule, MatTabsModule, MatMenuModule, MatSidenavModule,
          MatProgressSpinnerModule, MatSnackBarModule, MatSlideToggleModule]
})
export class MaterialModule {

}
