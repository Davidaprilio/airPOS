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
    {
        id: uuidv7(),
        name: 'Doner Kebab',
        img: 'https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/2063b6a2-ebf8-44ba-b410-3a47b086713b_restaurant-image_1718336215301.jpg?auto=format',
        category: catFood,
        price: 40_000,
        qty: 1,
    },
    {
        id: uuidv7(),
        name: 'Shihlin Taiwan Street Snacks',
        img: 'https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/67d460e0-d7e5-4f36-9971-3254487b7477_brand-image_1721800406449.jpg?auto=format',
        category: catFood,
        price: 35_000,
        qty: 1,
    },
    {
        id: uuidv7(),
        name: 'Paper Lunch',
        img: 'https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/75071717-c646-4dc0-a7f5-5b7ec2f89a65_brand-image_1684559341441.jpg?auto=format',
        category: catFood,
        price: 60_000,
        qty: 1,
    },
    {
        id: uuidv7(),
        name: 'Bowls Two Go',
        img: 'https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/e0455ec1-9f41-4346-aca3-e10255354f6f_Go-Biz_20220419_164754.jpeg?auto=format',
        category: catFood,
        price: 43_000,
        qty: 1,
    },
    {
        id: uuidv7(),
        name: 'Sambal Korek Attack Crispy Chicken Bowl',
        img: 'https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/d381a0c3-c60e-4738-81fc-9e9fac9830a2_Go-Biz_20231130_211723.jpeg?auto=format',
        category: catFood,
        price: 43_000,
        qty: 1,
    },
    {
        id: uuidv7(),
        name: 'Double Happiness 69K',
        img: 'https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/63eb739a-4d49-43e0-81e3-2b4026310a0e_Go-Biz_20230404_134139.jpeg?auto=format',
        category: catFood,
        price: 69_000,
        qty: 1,
    },
    {
        id: uuidv7(),
        name: 'Mentaiko Cheese Takoyaki + Beef Rasher',
        img: 'https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/e49d6136-5c53-4f89-a531-0fa344b6e8f7_menu-item-image_1725607228058.jpg?auto=format',
        category: catFood,
        price: 43_000,
        qty: 1,
    },
]

export const productMap = new Map<string, Product>()
products.forEach(item => {
    productMap.set(item.id, item)
})