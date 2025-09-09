import { LoginForm, Logo } from "@/components"

export default function LoginPage() {
    return (
        <div className="h-screen w-full flex flex-col justify-between">
            <Logo />
            <LoginForm />
        </div>
    )
}