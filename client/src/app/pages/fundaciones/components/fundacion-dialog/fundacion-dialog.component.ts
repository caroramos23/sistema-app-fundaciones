import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseForm } from '@app/shared/utils/base-form';
import { Subject, takeUntil } from 'rxjs';
import { FundacionesService } from '../../services/fundaciones.service';
import { FundacionResponse } from '@shared/models/fundacion.interface';
import { TipoResponse } from '@app/shared/models/tipo.interface';

enum Action {
  EDIT = 'edit',
  NEW = 'new'
}

@Component({
  selector: 'app-user-dialog',
  templateUrl: './fundacion-dialog.component.html',
  styleUrls: ['./fundacion-dialog.component.scss']
})
export class FundacionDialogComponent implements OnInit, OnDestroy {

  actionTODO = Action.NEW;
  titleButton = "Guardar";
  private destroy$ = new Subject<any>();
  tipos: TipoResponse[] = [];
  fundacionForm = this.fb.group({
    cveFundacion: [],
    nombreFundacion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
    descripcion: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(500)]],
    tipoFundacion: ['', [Validators.required, Validators.minLength(1)]],
    fechaFundacion:  ['', [Validators.required, Validators.minLength(10),Validators.maxLength(10)]],
    cveRegistro: []
  });
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<FundacionDialogComponent>, 
              private fb: FormBuilder,
              public baseForm: BaseForm,
              private fundacionesSvc: FundacionesService) { }

              

  ngOnInit(): void {
    this.fundacionesSvc.getTipos()
    .pipe(takeUntil(this.destroy$))
    .subscribe( (tipos: TipoResponse[]) => {
      this.tipos = tipos;
      this.patchData();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  onClean() {
    this.fundacionForm.reset();
  }

  onSave() {
    if (this.fundacionForm.invalid) return;

    const formvalue = this.fundacionForm.getRawValue();

    // Se realizara la inserción
    if (this.actionTODO == Action.NEW)  {
      
      var newFundacion: FundacionResponse = {
        nombreFundacion: formvalue.nombreFundacion!,
        descripcion: formvalue.descripcion!,
        tipoFundacion: formvalue.tipoFundacion!,
        fechaFundacion: formvalue.fechaFundacion!
        //cveRol: formvalue.rol
      }

      this.fundacionesSvc.new(newFundacion)
      .pipe(takeUntil(this.destroy$))
      .subscribe( (res) => {
        this.dialogRef.close(res);
      });
    }  else { // se actualizan los datos

      var updatedFundacion: FundacionResponse = {
        cveFundacion: formvalue.cveFundacion!,
        nombreFundacion: formvalue.nombreFundacion!,
        descripcion: formvalue.descripcion!,
        tipoFundacion: formvalue.tipoFundacion!,
        fechaFundacion: formvalue.fechaFundacion!
        //cveRol: formvalue.rol
      }

      this.fundacionesSvc.update(updatedFundacion)
      .pipe(takeUntil(this.destroy$))
      .subscribe( (res) => {
        this.dialogRef.close(res);
      });
    }
  }

  patchData() {
    if (this.data.fundacion.cveFundacion) {
      this.actionTODO = Action.EDIT;
      this.titleButton = "Actualizar";
      this.fundacionForm.patchValue({
        cveFundacion: this.data?.fundacion.cveFundacion,
        nombreFundacion: this.data?.fundacion.nombreFundacion,
        descripcion: this.data?.fundacion.descripcion,
        tipoFundacion: this.data?.fundacion.tipoFundacion,
        fechaFundacion: this.data?.fundacion.fechaFundacion,
        cveRegistro: this.data?.fundacion.cveRegistro
      });
      //this.fundacionForm.get("registro")?.disable();
    
      this.fundacionForm.updateValueAndValidity();
    } else {
      this.titleButton = "Guardar";
      this.actionTODO = Action.NEW;
    }
  }


}
