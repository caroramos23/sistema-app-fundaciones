import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { FundacionResponse } from '@app/shared/models/fundacion.interface';
import { BaseForm } from '@app/shared/utils/base-form';
import { Subject, takeUntil } from 'rxjs';
import { FundacionDialogComponent } from './components/fundacion-dialog/fundacion-dialog.component';
import { FundacionesService } from './services/fundaciones.service';
import Swal from 'sweetalert2';

import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-fundaciones',
  templateUrl: './fundaciones.component.html',
  styleUrls: ['./fundaciones.component.scss']
})
export class FundacionesComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private destroy$ = new Subject<any>();
  displayedColumns: string[] = ['nombreFundacion', 'descripcion', 'tipoFundacion', 'fechaFundacion', 'actions'];
  dataSource = new MatTableDataSource();
  constructor(private fundacionSvc: FundacionesService, private authSvc: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.listar();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  listar() {
    this.fundacionSvc.getFundaciones()
    .pipe(takeUntil(this.destroy$))
    .subscribe( (fundaciones: FundacionResponse[]) => {
      this.dataSource.data = fundaciones;
    });
  }

  onOpenModal(fundacion = {}) {
    const dialogRef = this.dialog.open(FundacionDialogComponent, {
      minWidth: '60%',
      data: {
        title: 'Registro de Fundación',
        fundacion
      }
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.snackBar.open(result.message, '', {
            duration: 5 * 1000,
            panelClass: [ result.code == 0 ? 'success-snackbar' : 'error-snackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
          })

          this.listar();
        }
      });
  }

  onDelete(cveFundacion: number) {
    Swal.fire({
      title: '',
      text: `¿Realmente desea eliminar el registro?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'darkBlue',
      cancelButtonColor: 'darkRed',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then( (result) => {
      if (result.isConfirmed) {
        this.fundacionSvc.delete(cveFundacion)
          .pipe(takeUntil(this.destroy$))
          .subscribe( (result: any) => {
            if (result) {
              this.snackBar.open(result.message, '', {
                duration: 5 * 1000,
                panelClass: [ result.code == 0 ? 'success-snackbar' : 'error-snackbar'],
                horizontalPosition: 'right',
                verticalPosition: 'top'
              })

              this.listar();
            }
          });
      }
    })
  }

}
