import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {

    this.http.get('https://angular-html-37b8d-default-rtdb.firebaseio.com/productos_idx.json')
      .subscribe((resp: Object) => {

        const productos: Producto[] = resp as Producto[];

        console.log(productos);
        this.productos = productos;


        setTimeout(() => {
          this.cargando = false;
        }, 1000);

      });

  }


}
