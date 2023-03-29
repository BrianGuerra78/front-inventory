import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProductService } from '../../shared/services/product.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { NewProductComponent } from '../new-product/new-product.component';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';
import { UtilService } from '../../shared/services/util.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

  isAdmin: any;

  constructor(private productService: ProductService, public dialog: MatDialog, private snackBar: MatSnackBar,
    private util: UtilService){}

  ngOnInit(): void {
      this.getProducts();
      this.isAdmin = this.util.isAdmin();
  }

  displayedColumns: string[] = ['id','name','price','account','category','picture','actions'];
  dataSource = new MatTableDataSource<ProductElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getProducts(){
    this.productService.getProducts().subscribe((data:any)=>{
      console.log("respuesta de productos: ", data);
      this.processProductResponse(data);
    }, (error:any)=>{
      console.log("error en productos: ", error);
    });
  }

  processProductResponse(resp:any){
    const dateProduct: ProductElement[] = [];
    if(resp.metadata[0].code == "00"){
      let listCProduct = resp.product.products;

      listCProduct.forEach((element: ProductElement) => {
        //element.category = element.name;
        element.picture = 'data:image/jpeg;base64,' + element.picture;
        dateProduct.push(element);
      }); 

      //set the datasource
      this.dataSource = new MatTableDataSource<ProductElement>(dateProduct);
      this.dataSource.paginator = this.paginator;
    }
  }

  openProductDialog(){
    const dialogRef = this.dialog.open(NewProductComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result:any) => {
     if(result == 1){
      this.openSnackBar("Producto Agregado", "Exitosa");
      this.getProducts();
     }else if(result == 2){
      this.openSnackBar("Se produjo un error al guardar el producto", "Error");
     }
    });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  edit(id:number, name:string, price: number, account: number, category: any){
    const dialogRef = this.dialog.open(NewProductComponent, {
      width: '450px',
      data: {id: id, name: name, price: price, account: account, category: category}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
     if(result == 1){
      this.openSnackBar("Producto Actualizado", "Exitosa");
      this.getProducts();
     }else if(result == 2){
      this.openSnackBar("Se produjo un error al alcualizar el producto", "Error");
     }
    });
  }

  delete(id:any){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '450px',
      data: {id: id, module: "product"}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
     if(result == 1){
      this.openSnackBar("Producto eliminado", "Exitosa");
      this.getProducts();
     }else if(result == 2){
      this.openSnackBar("Se produjo un error al eliminar el producto", "Error");
     }
    });
  }

  buscar(name:any){
    if(name.length === 0){
      return this.getProducts();
    }
    this.productService.getProductByName(name).subscribe((resp:any) =>{
      this.processProductResponse(resp);
    });
  }

  
  exportExcell(){
    this.productService.exportProducts().subscribe((data:any)=>{
      let file = new Blob([data],{
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      let fileUrl = URL.createObjectURL(file);
      var anchor = document.createElement("a");
      anchor.download = "products.xlsx";
      anchor.href = fileUrl;
      anchor.click();
      this.openSnackBar("Archivo exportado", "Exitosa");
    },(error: any)=>{
      this.openSnackBar("No se pudo exportar el archivo", "Error");
    });
  }
}

export interface ProductElement{
  id:number;
  name:string;
  price:number;
  account:number;
  category:any;
  picture:any;
}