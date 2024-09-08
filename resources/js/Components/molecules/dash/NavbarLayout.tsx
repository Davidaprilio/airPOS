import { PropsWithChildren } from 'react'

export default function NavbarLayout({children}: PropsWithChildren) {
    return (
        <div className='h-12 border-b flex items-center justify-between px-4 sticky top-0 bg-white z-50'>
            {children}
        </div>
    )
}
