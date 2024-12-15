import { create } from "zustand"

export type POSCartStore = {
    productId: string
    qty: number
    total: number
}

interface InitialState {
    cart: Map<string, POSCartStore>
    loading: boolean
    error: null|string
    lastEditedItem: [(null|POSCartStore['productId']), number]

    addToCart: (productId: string) => void 
    updateQtyFromCart: (productId: string, mode?: 'increment'|'decrement', step?: number) => boolean 
    removeFromCart: (productId: string) => void
}


const usePOSCartStore = create<InitialState>((set, get) => {

    const updateQtyFromCart = (productId: string, mode: 'increment'|'decrement' = 'increment', step: number = 1) => {
        const cart = get().cart
        if (cart.has(productId)) {
            const product = cart.get(productId)!
            let qty = product.qty
            if (mode === 'increment') {
                qty += step
            } else {
                qty -= step
            }

            if (qty > 0) {
                product.qty = qty
            }

            cart.set(productId, product)
            set((state) => ({ 
                ...state,
                cart,
                lastEditedItem: [productId, qty],
            }))
            return true
        }
        return false
    }

    const addToCart = (productId: string) => {
        const cart = get().cart
        if (cart.hasOwnProperty(productId)) {
            updateQtyFromCart(productId, 'increment')
            return
        }
        cart.set(productId, {
            productId,
            qty: 1,
            total: 1
        })
        set((state) => ({ ...state, cart }))
    }
    
    const removeFromCart = (productId: string) => {
        const cart = get().cart
        cart.delete(productId)
        set((state) => ({ ...state, cart }))
    }

    return {
        // initial state
        cart: new Map(),
        loading: false,
        error: null,
        lastEditedItem: [null,0],
        
        // method
        addToCart,
        updateQtyFromCart,
        removeFromCart,
    }
})

export default usePOSCartStore