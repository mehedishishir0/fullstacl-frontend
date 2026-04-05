"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password should be at least 6 characters." }),
  rememberMe: z.boolean().optional(),
});

type FormType = z.infer<typeof formSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("rememberedUser");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setValue("email", parsed.email);
      setValue("password", parsed.password);
      setValue("rememberMe", true);
    }
  }, [setValue]);

  const onSubmit = async (data: FormType) => {
    setIsLoading(true);
    try {
      if (data.rememberMe) {
        localStorage.setItem(
          "rememberedUser",
          JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        );
      } else {
        localStorage.removeItem("rememberedUser");
      }

      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.error) {
        throw new Error(res.error);
      }
      toast.success("Login successful!");
      router.push("/");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("Login error:", error);
      toast.error("Incorrect Password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-x-hidden bg-[#F0F2F5] flex items-center justify-center py-10 lg:py-20">
      <div className="pointer-events-none absolute left-0 -top-10 z-0 opacity-50 lg:opacity-100">
        <Image src="/images/shape1.svg" alt="" width={200} height={200} />
      </div>
      <div className="pointer-events-none absolute -right-10 -top-10 z-0 hidden sm:block">
        <Image
          src="/images/shape2.svg"
          alt=""
          width={550}
          height={300}
          className="w-[300px] lg:w-[550px]"
        />
      </div>
      <div className="pointer-events-none absolute bottom-0 right-0 lg:right-[400px] z-0 hidden md:block">
        <Image
          src="/images/shape3.svg"
          alt=""
          width={500}
          height={600}
          className="w-[300px] lg:w-[500px]"
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1320px] px-4 md:px-8">
        <div className="flex flex-col items-center justify-center gap-10 lg:flex-row lg:gap-16 xl:gap-20">
          <div className=" w-full items-center justify-center lg:flex lg:w-1/2 xl:w-2/3">
            <div className="relative w-full max-w-[700px] aspect-[620/520]">
              <Image
                src="/images/login.png"
                alt="Login Illustration"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="flex w-full justify-center lg:w-1/2 xl:w-1/3">
            <div className="w-full max-w-[450px] rounded-2xl bg-white p-6 shadow-sm sm:p-10 lg:mr-0">
              <div className="flex flex-col items-center gap-4 text-center">
                <Image
                  src="/images/logo.svg"
                  alt="Logo"
                  width={140}
                  height={80}
                  className="h-auto w-[140px] md:w-[160px]"
                />
                <div className="mt-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    Welcome back
                  </p>
                  <h4 className="text-xl md:text-2xl font-semibold text-foreground">
                    Login to your account
                  </h4>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleLogin}
                className="mt-8 mb-8 flex w-full items-center justify-center gap-3 rounded-xl border border-input bg-white py-6 text-sm font-medium text-foreground shadow-sm hover:bg-accent"
              >
                <Image
                  src="/images/google.svg"
                  alt="Google"
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
                <span>Login with Google</span>
              </Button>

              <div className="relative mb-6 flex items-center">
                <Separator className="flex-1" />
                <span className="mx-4 text-xs uppercase tracking-wider text-muted-foreground">
                  Or
                </span>
                <Separator className="flex-1" />
              </div>

              <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="email"
                        placeholder="you@example.com"
                        className="h-12 w-full rounded-xl border-input px-4 focus-visible:ring-[#1890FF]"
                      />
                    )}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <div className="relative">
                        <Input
                          {...field}
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="h-12 w-full rounded-xl border-input px-4 pr-12 focus-visible:ring-[#1890FF]"
                        />
                        <button
                          type="button"
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500 hover:text-[#1890FF]"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? "HIDE" : "SHOW"}
                        </button>
                      </div>
                    )}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2">
                  <Controller
                    name="rememberMe"
                    control={control}
                    render={({ field }) => (
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="remember"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-4 w-4 rounded border-input data-[state=checked]:bg-[#1890FF] data-[state=checked]:border-[#1890FF]"
                        />
                        <Label
                          htmlFor="remember"
                          className="cursor-pointer text-sm font-normal text-muted-foreground select-none"
                        >
                          Remember me
                        </Label>
                      </div>
                    )}
                  />
                  <button
                    type="button"
                    className="text-sm text-[#1890FF] font-medium hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full rounded-xl bg-[#1890FF] py-6 text-base font-bold text-white hover:bg-[#40a9ff] transition-colors"
                  >
                    Login now{" "}
                    {isLoading && (
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    )}
                  </Button>
                </div>
              </form>

              <p className="mt-8 text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  href="/registration"
                  className="font-semibold text-[#1890FF] hover:underline"
                >
                  Create New Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
