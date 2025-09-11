'use client'

import { LoginForm, Logo } from "@/components"

export default function LoginPage() {

    return (
        <div className="bg-[url('/images/Background-image.png')] bg-contain bg-repeat h-screen w-full mx-auto flex flex-col justify-between
                        lg:flex-row lg:items-center">
            <div className="mx-auto my-auto">
                <Logo />
            </div>
            <LoginForm />
        </div>
    )
}