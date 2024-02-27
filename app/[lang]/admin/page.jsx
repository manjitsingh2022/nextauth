'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
// import UserCard from '../components/UserCard'

export default function ClientPage() {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin?callbackUrl=/admin')
        }
    })
console.log(session,'sessionsessionsession')
    // if (session?.user.role !== "admin"
    //     && session?.user.role !== "manager") {
    //     return <h1 className="text-5xl">Access Denied</h1>
    // }

    if (!session?.user) return

    return (
        <section className="flex flex-col gap-6">
            {/* <UserCard user={session?.user} pagetype={"Client"} /> */}
            {/* {session?.user} */}
        </section>
    )
}