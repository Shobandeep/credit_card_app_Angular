export interface VendorItem {
    itemId: number;
    vendorId: number;
    itemName: string;
    itemDescription: string;
    price: number;
    imgLink: string
}

export interface CartItem {
    item: VendorItem;
    quantity: number;
}


