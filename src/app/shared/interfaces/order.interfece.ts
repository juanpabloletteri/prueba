export interface Details {
    productId: number;
    productName: string;
    quantity: number;
}

export interface Order {
    name: string;
    date: string;
    shippingAddress: string;
    city: string;
    pickup: boolean;
    id: number;
}

export interface DetailsOrder {
    details: Details[];
    orderId: number;
    //id?: number;
    //? es un opcional
}
