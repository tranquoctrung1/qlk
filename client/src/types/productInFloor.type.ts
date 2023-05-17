interface ProductInFloorModalInterface {
    name: string;
    id: string | undefined;
    cabinetId: string;
    cabinetName: string | undefined;
    idProduct: string;
    productId: string | undefined;
    productName: string | undefined;
    unit: string;
    amount: number;
    baseAlarm: number | undefined;
    importDate: number | undefined;
    productInFloorId: string;
}

export default ProductInFloorModalInterface;
