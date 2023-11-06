import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store } from 'src/app/shared/interfaces/stores.interface';
import { DetailsOrder, Order } from 'src/app/shared/interfaces/order.interfece';


@Injectable({
    providedIn: 'root'
})

export class DataService {
    private apiURL = "http://localhost:3000";
    constructor(private http: HttpClient) { }

    getStores(): Observable<Store[]> {
        return this.http.get<Store[]>(`${this.apiURL}/stores`);
    }

    saveOrder(order: Order): Observable<any> {
        return this.http.post<any>(`${this.apiURL}/orders`, order);
    }

    saveDetailsOrder(details: DetailsOrder): Observable<any> {
        return this.http.post<DetailsOrder>(`${this.apiURL}/detailsOrders`, details);
    }

}