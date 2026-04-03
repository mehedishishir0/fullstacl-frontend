// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Separator } from "@/components/ui/separator";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import z from "zod";

// // Zod schema with repeat password validation
// const formSchema = z
//   .object({
//     email: z.string().email({ message: "Invalid email address" }),
//     password: z.string().min(6, { message: "Password should be at least 6 characters." }),
//     repeatPassword: z.string().min(6, { message: "Repeat password is required" }),
//     rememberMe: z.boolean().optional(),
//   })
//   .refine((data) => data.password === data.repeatPassword, {
//     path: ["repeatPassword"],
//     message: "Passwords do not match",
//   });

// type FormType = z.infer<typeof formSchema>;

// export default function Registration() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showRepeatPassword, setShowRepeatPassword] = useState(false);

//   const { handleSubmit, control, formState: { errors } } = useForm<FormType>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//       repeatPassword: "",
//       rememberMe: true,
//     },
//   });

//   const onSubmit = (data: FormType) => {
//     console.log("Registration Data:", data);
//   };

//   const handleGoogleLogin = () => {
//     console.log("Google registration");
//   };

//   return (
//     <section className="relative min-h-screen py-10 w-full overflow-hidden bg-[#F0F2F5] flex items-center">
//       {/* Shapes */}
//       <div className="pointer-events-none absolute left-0 -top-10 z-0">
//         <Image src="/images/shape1.svg" alt="" width={200} height={200} />
//       </div>
//       <div className="pointer-events-none absolute right-5 -top-0 z-0">
//         <Image src="/images/shape2.svg" alt="" width={550} height={300} />
//       </div>
//       <div className="pointer-events-none absolute bottom-5 right-[400px] z-0">
//         <Image src="/images/shape3.svg" alt="" width={500} height={600} />
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10 mx-auto w-full max-w-[1320px] px-4 py-10">
//         <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-20">
//           {/* Left Illustration */}
//           <div className="flex w-full items-center justify-center lg:w-2/3">
//             <div className="relative w-full max-w-[820px] aspect-[620/520]">
//               <Image src="/images/registration.png" alt="Registration Illustration" fill className="object-contain" priority />
//             </div>
//           </div>

//           {/* Right Form */}
//           <div className="flex bg-[#FFFFFF] w-full mr-10 justify-center lg:w-1/3">
//             <div className="w-full max-w-[420px] rounded-2xl px-4 py-10">
//               <div className="flex flex-col items-center gap-5">
//                 <Image src="/images/logo.svg" alt="Logo" width={140} height={40} className="h-auto w-[160px]" />
//                 <p className="mb-2 text-sm font-medium text-muted-foreground">Get Started Now</p>
//                 <h4 className="mb-12 text-2xl font-bold text-foreground">Registration</h4>
//               </div>

//               {/* Google Login */}
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={handleGoogleLogin}
//                 className="mb-10 flex w-full items-center justify-center gap-3 rounded-xl border border-input bg-white py-5 text-sm font-medium text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground"
//               >
//                 <Image src="/images/google.svg" alt="Google" width={20} height={20} className="h-5 w-5" />
//                 <span>Register with google</span>
//               </Button>

//               {/* Divider */}
//               <div className="relative mb-8 flex items-center">
//                 <Separator className="flex-1" />
//                 <span className="mx-4 text-sm text-muted-foreground">Or</span>
//                 <Separator className="flex-1" />
//               </div>

//               {/* Form */}
//               <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
//                 {/* Email */}
//                 <div className="space-y-2">
//                   <Label htmlFor="email" className="text-sm font-medium text-foreground">Email</Label>
//                   <Controller
//                     name="email"
//                     control={control}
//                     render={({ field }) => (
//                       <Input
//                         {...field}
//                         id="email"
//                         type="email"
//                         placeholder="you@example.com"
//                         className="h-14 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
//                       />
//                     )}
//                   />
//                   {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
//                 </div>

//                 {/* Password */}
//                 <div className="mb-2 space-y-2">
//                   <Label htmlFor="password" className="text-sm font-medium text-foreground">Password</Label>
//                   <Controller
//                     name="password"
//                     control={control}
//                     render={({ field }) => (
//                       <div className="relative">
//                         <Input
//                           {...field}
//                           id="password"
//                           type={showPassword ? "text" : "password"}
//                           placeholder="••••••••"
//                           className="h-14 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring pr-10"
//                         />
//                         <button
//                           type="button"
//                           className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
//                           onClick={() => setShowPassword(!showPassword)}
//                         >
//                           {showPassword ? "Hide" : "Show"}
//                         </button>
//                       </div>
//                     )}
//                   />
//                   {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
//                 </div>

//                 {/* Repeat Password */}
//                 <div className="mb-2 space-y-2">
//                   <Label htmlFor="repeatPassword" className="text-sm font-medium text-foreground">Repeat Password</Label>
//                   <Controller
//                     name="repeatPassword"
//                     control={control}
//                     render={({ field }) => (
//                       <div className="relative">
//                         <Input
//                           {...field}
//                           id="repeatPassword"
//                           type={showRepeatPassword ? "text" : "password"}
//                           placeholder="••••••••"
//                           className="h-14 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring pr-10"
//                         />
//                         <button
//                           type="button"
//                           className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
//                           onClick={() => setShowRepeatPassword(!showRepeatPassword)}
//                         >
//                           {showRepeatPassword ? "Hide" : "Show"}
//                         </button>
//                       </div>
//                     )}
//                   />
//                   {errors.repeatPassword && <p className="text-red-500 text-xs">{errors.repeatPassword.message}</p>}
//                 </div>

//                 {/* Remember Me */}
//                 <Controller
//                   name="rememberMe"
//                   control={control}
//                   render={({ field }) => (
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <Checkbox
//                           id="remember"
//                           checked={field.value}
//                           onCheckedChange={field.onChange}
//                           className="rounded border-input text-white data-[state=checked]:bg-[#1890FF] data-[state=checked]:border-[#1890FF]"
//                         />
//                         <Label htmlFor="remember" className="cursor-pointer text-sm font-normal text-foreground">Remember me</Label>
//                       </div>
//                       <button type="button" className="text-sm text-[#1890FF] font-medium hover:underline">Forgot password?</button>
//                     </div>
//                   )}
//                 />

//                 {/* Register Button */}
//                 <div className="pt-6 pb-8">
//                   <Button type="submit" className="w-full rounded-xl bg-[#1890FF] py-6 text-sm font-semibold text-white hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary/50">
//                     Register now
//                   </Button>
//                 </div>
//               </form>

//               {/* Sign-in Link */}
//               <p className="text-center text-sm text-muted-foreground">
//                 Already have an account?{" "}
//                 <Link href="/login" className="font-semibold text-primary hover:underline">Sign In</Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }



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

// Zod schema with repeat password validation
const formSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password should be at least 6 characters." }),
    repeatPassword: z.string().min(6, { message: "Repeat password is required" }),
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

  const { handleSubmit, control, formState: { errors } } = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
      rememberMe: true,
    },
  });

  const onSubmit = (data: FormType) => {
    console.log("Registration Data:", data);
  };

  const handleGoogleLogin = () => {
    console.log("Google registration");
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#F0F2F5] flex items-center justify-center py-6 md:py-20">
      
      {/* Background Shapes - Only visible on large screens */}
      <div className="pointer-events-none absolute left-0 -top-10 z-0 hidden lg:block">
        <Image src="/images/shape1.svg" alt="" width={200} height={200} />
      </div>
      <div className="pointer-events-none absolute right-20 -top-0 z-0 hidden lg:block">
        <Image src="/images/shape2.svg" alt="" width={550} height={300} />
      </div>
      <div className="pointer-events-none absolute bottom-0 right-[420px] z-0 hidden lg:block">
        <Image src="/images/shape3.svg" alt="" width={500} height={600} />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1320px] px-4">
        <div className="flex flex-col items-center justify-center gap-10 lg:flex-row lg:gap-40">
          
          {/* Left Illustration - Hidden on mobile/tablet */}
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

          {/* Right Form - Perfectly centered on mobile/tablet */}
          <div className="flex w-full items-center justify-center lg:w-1/2 xl:w-1/3">
            <div className="w-full max-w-[440px] rounded-2xl bg-white p-6 shadow-sm sm:p-10">
              <div className="flex flex-col items-center gap-5 text-center">
                <Image src="/images/logo.svg" alt="Logo" width={140} height={40} className="h-auto w-[160px]" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Get Started Now</p>
                  <h4 className="text-2xl font-bold text-foreground">Registration</h4>
                </div>
              </div>

              {/* Google Registration */}
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleLogin}
                className="mt-8 mb-8 flex w-full items-center justify-center gap-3 rounded-xl border border-input bg-white py-6 text-sm font-medium shadow-sm hover:bg-accent"
              >
                <Image src="/images/google.svg" alt="Google" width={20} height={20} className="h-5 w-5" />
                <span>Register with google</span>
              </Button>

              {/* Divider */}
              <div className="relative mb-8 flex items-center">
                <Separator className="flex-1" />
                <span className="mx-4 text-sm text-muted-foreground">Or</span>
                <Separator className="flex-1" />
              </div>

              {/* Form */}
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
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
                  {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
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
                  {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                </div>

                {/* Repeat Password */}
                <div className="space-y-2">
                  <Label htmlFor="repeatPassword" className="text-sm font-medium">Repeat Password</Label>
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
                          onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                        >
                          {showRepeatPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                    )}
                  />
                  {errors.repeatPassword && <p className="text-red-500 text-xs">{errors.repeatPassword.message}</p>}
                </div>

                {/* Remember Me & Forgot Password */}
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
                        <Label htmlFor="remember" className="cursor-pointer text-sm font-normal select-none">
                          Remember me
                        </Label>
                      </div>
                    )}
                  />
                  <button type="button" className="text-sm text-[#1890FF] font-medium hover:underline">
                    Forgot password?
                  </button>
                </div>

                {/* Register Button */}
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full rounded-xl bg-[#1890FF] py-7 text-base font-semibold text-white hover:bg-[#40a9ff] transition-all"
                  >
                    Register now
                  </Button>
                </div>
              </form>

              {/* Sign-in Link */}
              <p className="mt-8 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-[#1890FF] hover:underline">
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