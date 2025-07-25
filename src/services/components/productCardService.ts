export interface Product {
    id: number;
    name: string;
    description: string;
    images: string[];
    price: string;
    sizes: string[];
}

export interface ProductCardState {
    currentImageIndex: number;
}

export function createInitialState(): ProductCardState {
    return { currentImageIndex: 0 };
}

export function handleProductInquiry(productName: string): void {
    window.location.href = `/contact?product=${encodeURIComponent(productName)}`;
}

export function getNextImageIndex(current: number, length: number): number {
    return current === length - 1 ? 0 : current + 1;
}

export function getPrevImageIndex(current: number, length: number): number {
    return current === 0 ? length - 1 : current - 1;
}
