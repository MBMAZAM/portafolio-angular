import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {

    return new Promise((resolve, reject) => {


      this.http.get('https://angular-html-37b8d-default-rtdb.firebaseio.com/productos_idx.json')
        .subscribe((resp: any) => {

          const productos: Producto[] = resp as Producto[];

          this.productos = productos;
          this.cargando = false;
          resolve("La operación se completó con éxito");

          // setTimeout(() => {
          //   this.cargando = false;
          // }, 1000);


        });
    });

  }

  getProducto(id: string) {

    return this.http.get(`https://angular-html-37b8d-default-rtdb.firebaseio.com/productos/${id}.json`);

  }

  buscarProducto(termino: string) {

    if (this.productos.length === 0) {
      // Cargar los productos
      this.cargarProductos().then(() => {
        // Ejecutar después de tener los productos
        // Aplicar el filtro
        this.filtrarProductos(termino);
      });
    } else {
      // Aplicar el filtro
      this.filtrarProductos(termino);
    }

  }

  private filtrarProductos(termino: string) {

    // console.log(this.productos);
    this.productosFiltrado = [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach(prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();

      if (prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0 )  {
        this.productosFiltrado.push(prod);
      }




    });


  }


}
