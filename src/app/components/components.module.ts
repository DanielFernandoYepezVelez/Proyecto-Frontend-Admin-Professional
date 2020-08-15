import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/* Libreria De Graficas */
import { ChartsModule } from 'ng2-charts';

/* Components */
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { ModalImageComponent } from './modal-image/modal-image.component';
import { DonaComponent } from './dona/dona.component';

@NgModule({
  declarations: [IncrementadorComponent, DonaComponent, ModalImageComponent],
  imports: [CommonModule, FormsModule, ChartsModule],
  exports: [IncrementadorComponent, DonaComponent, ModalImageComponent],
})
export class ComponentsModule {}
