import { LoginForm, Logo } from "@/components"

export default function LoginPage() {
    return (
        <div className="h-screen w-full mx-auto flex flex-col justify-between
                        lg:flex-row lg:items-center">
            <div className="mx-auto my-auto lg:bg-url('images/Background-image.png') lg:bg-no-repeat lg:bg-cover lg:bg-center]">
                <Logo />
            </div>
            <LoginForm />
        </div>
    )
}