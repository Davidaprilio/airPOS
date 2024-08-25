import { v7 as uuidv7 } from 'uuid';

export interface Product {
    id: string
    name: string
    img: string
    price: number
    discount?: number
    qty: number
    category: {
        id: number
        name: string
    }
    variant?: {
        default: string
        options: {
            id: number
            name: string 
        }[]
    }
    unit?: {
        default: string
        options: {
            id: number
            name: number
        }[]
    }
}

export const catFood: Product['category'] = {
    id: 1,
    name: 'Makanan'
}
export const products: Product[] = [
    {
        id: uuidv7(),
        name: 'Burger Beef',
        img: 'https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/b0be58a9-0000-4423-9e30-0d7ca175bcbf_Go-Biz_20211219_141248.jpeg?auto=format',
        category: catFood,
        price: 23_000,
        discount: 20_000,
        qty: 1,
    },
    {
        id: uuidv7(),
        name: 'Burger Double Beef Kins Tes bulgogie ask asl',
        img: 'https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/54f28cf1-2502-4b2e-8177-2ffcd0928878_Go-Biz_20230619_155753.jpeg?auto=format',
        category: catFood,
        price: 10_000,
        qty: 1,
    },
    {
        id: uuidv7(),
        name: 'Burger Cheese',
        img: 'https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/0e25cd42-5415-4468-8288-569d4bd951c2_restaurant-image_1659698731557.jpg?auto=format',
        category: catFood,
        price: 10_000,
        qty: 1,
    },
    {
        id: uuidv7(),
        name: 'Burger Beef King',
        img: 'https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/d26af689-153b-4f84-af6e-13355d76d306_restaurant-image_1694600301276.jpg?auto=format',
        category: catFood,
        price: 65_000,
        qty: 1,
    },
]

export const productMap = new Map<string, Product>()
products.forEach(item => {
    productMap.set(item.id, item)
})