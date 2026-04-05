"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import GoogleLogin from "../../_components/GoogleLogin";
import { useRegistration } from "@/hooks/Apicalling";

const formSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First name should be at least 2 characters." }),
    lastName: z
      .string()
      .min(2, { message: "Last name should be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password should be at least 6 characters." }),
    repeatPassword: z
      .string()
      .min(6, { message: "Repeat password is required" }),
    rememberMe: z.boolean().optional(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    path: ["repeatPassword"],
    message: "Passwords do not match",
  });

type FormType = z.infer<typeof formSchema>;

export default function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const router = useRouter();
  const registrationMutation = useRegistration();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      repeatPassword: "",
      rememberMe: true,
    },
  });

  const onSubmit = (data: FormType) => {
    registrationMutation.mutate(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          router.push("/login");
        },
      },
    );
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#F0F2F5] flex items-center justify-center py-6 md:py-20">
      <div className="pointer-events-none absolute left-0 -top-10 z-0 hidden lg:block">
        <Image src="/images/shape1.svg" alt="" width={200} height={200} />
      </div>
      <div className="pointer-events-none absolute right-20 -top-0 z-0 hidden lg:block">
        <Image src="/images/shape2.svg" alt="" width={550} height={300} />
      </div>
      <div className="pointer-events-none absolute bottom-0 right-[420px] z-0 hidden lg:block">
        <Image src="/images/shape3.svg" alt="" width={500} height={600} />
      </div>

      <div className="relative z-10 w-full max-w-[1320px] px-4">
        <div className="flex flex-col items-center justify-center gap-10 lg:flex-row lg:gap-40">
          <div className=" w-full items-center justify-center lg:flex lg:w-1/2">
            <div className="relative w-full max-w-[680px] aspect-[620/520]">
              <Image
                src="/images/registration.png"
                alt="Registration Illustration"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="flex w-full items-center justify-center lg:w-1/2 xl:w-1/3">
            <div className="w-full max-w-[440px] rounded-2xl bg-white p-6 shadow-sm sm:p-10">
              <div className="flex flex-col items-center gap-5 text-center">
                <Image
                  src="/images/logo.svg"
                  alt="Logo"
                  width={140}
                  height={40}
                  className="h-auto w-[160px]"
                />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Get Started Now
                  </p>
                  <h4 className="text-2xl font-bold text-foreground">
                    Registration
                  </h4>
                </div>
              </div>

              <GoogleLogin title={"Register with google"} />

              <div className="relative mb-8 flex items-center">
                <Separator className="flex-1" />
                <span className="mx-4 text-sm text-muted-foreground">Or</span>
                <Separator className="flex-1" />
              </div>

              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium">
                    First Name
                  </Label>
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="firstName"
                        type="firstName"
                        placeholder="John"
                        className="h-14 w-full rounded-xl border-input focus-visible:ring-[#1890FF]"
                      />
                    )}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium">
                    Last Name
                  </Label>
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="lastName"
                        type="lastName"
                        placeholder="Doe"
                        className="h-14 w-full rounded-xl border-input focus-visible:ring-[#1890FF]"
                      />
                    )}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>

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
                        type="email"
                        placeholder="you@example.com"
                        className="h-14 w-full rounded-xl border-input focus-visible:ring-[#1890FF]"
                      />
                    )}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs">
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
                          className="h-14 w-full rounded-xl border-input pr-12 focus-visible:ring-[#1890FF]"
                        />
                        <button
                          type="button"
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                    )}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="repeatPassword"
                    className="text-sm font-medium"
                  >
                    Repeat Password
                  </Label>
                  <Controller
                    name="repeatPassword"
                    control={control}
                    render={({ field }) => (
                      <div className="relative">
                        <Input
                          {...field}
                          id="repeatPassword"
                          type={showRepeatPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="h-14 w-full rounded-xl border-input pr-12 focus-visible:ring-[#1890FF]"
                        />
                        <button
                          type="button"
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400"
                          onClick={() =>
                            setShowRepeatPassword(!showRepeatPassword)
                          }
                        >
                          {showRepeatPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                    )}
                  />
                  {errors.repeatPassword && (
                    <p className="text-red-500 text-xs">
                      {errors.repeatPassword.message}
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
                          className="data-[state=checked]:bg-[#1890FF] data-[state=checked]:border-[#1890FF]"
                        />
                        <Label
                          htmlFor="remember"
                          className="cursor-pointer text-sm font-normal select-none"
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
                    className="w-full rounded-xl bg-[#1890FF] py-7 text-base font-semibold text-white hover:bg-[#40a9ff] transition-all"
                  >
                    Register now{" "}
                    {registrationMutation.isPending && (
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    )}
                  </Button>
                </div>
              </form>

              <p className="mt-8 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-[#1890FF] hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
