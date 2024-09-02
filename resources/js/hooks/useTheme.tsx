import { useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'

export type ThemeOption = 'dark'|'light'|'system'
export const themeState = atom<ThemeOption>({
    key: 'themeState',
    default: getStoredTheme()
})

export function getStoredTheme() {
    const themeStored = localStorage.getItem('theme') ?? 'system'
    if (themeStored === 'light') return themeStored
    if (themeStored === 'dark') return themeStored
    else return 'system'
}

export default function useTheme() {
    const [theme, setTheme] = useRecoilState(themeState)

    useEffect(() => {
        setTheme(theme)
        localStorage.setItem('theme', theme)
    }, [theme])

    return { theme }
}
