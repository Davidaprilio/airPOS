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

    addToCart: (productId: string) => void 
    updateQtyFromCart: (productId: string, mode?: 'increment'|'decrement', step?: number) => boolean 
    removeFromCart: (productId: string) => void
}


const usePOSCartStore = create<InitialState>((set, get) => {

    const updateQtyFromCart = (productId: string, mode: 'increment'|'decrement' = 'increment', step: number = 1) => {
        const cart = get().cart
        if (cart.has(productId)) {
            const product = cart.get(productId)!
            if (mode === 'increment') {
                product.qty += step
            } else {
                product.qty -= step
            }
            cart.set(productId, product)
            set((state) => ({ ...state, cart }))
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
        
        // method
        addToCart,
        updateQtyFromCart,
        removeFromCart,
    }
})

export default usePOSCartStore