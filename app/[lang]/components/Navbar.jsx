 
// import { usePathname } from 'next/navigation'
import { getDictionary } from '@/lib/getDictionary'
import Link from 'next/link'
import LocaleSwitcher from './locale-switcher'

export default async function Navbar({lang}) {
    // const pathname = usePathname()
const {navigation}=await getDictionary(lang)
console.log(navigation,'navigationnavigationnavigation')
    return (
        <nav className="bg-blue-800 p-4">
            <ul className="flex justify-evenly text-2xl font-bold">
                    {/* // className={`link ${pathname === '/' ? 'active' : ''}`} */}
                <li><Link href={`/${lang}`}>{navigation.home}</Link></li>
                <li><Link href={`/${lang}/admin`}>{navigation.admin}</Link></li>
                <li><Link href={`/api/auth/signin`}>{navigation.signIn}</Link></li>
                <li><Link href={`/api/auth/signout`}>{navigation.signOut}</Link></li>
                <li><Link href={`/${lang}/extra`}>{navigation.extra}</Link></li>
                <li><Link href={`/${lang}/dashboard`}>{navigation.dashboard}</Link></li>
            </ul>
            <LocaleSwitcher />

        </nav>
    )
}

