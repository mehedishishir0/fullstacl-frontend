// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// export default function LoginPage() {
//   return (
//     <main className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F0F2F5] overflow-hidden">

//       {/* Left Side: Illustration & Background Shapes */}
//       <div className="hidden lg:flex lg:w-3/5 my-20 xl:w-[65%] relative bg-[#F8FAFC] items-center justify-center p-12 overflow-hidden">
//         {/* Background Decorative Shapes */}
//         <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
//           <Image width={100} height={100} src="/images/shape1.svg" alt="" className="absolute top-0 left-0 opacity-40 w-1/3" />
//           <Image width={100} height={100}  src="/images/shape2.svg" alt="" className="absolute bottom-0 left-10 opacity-40 w-1/4" />
//         </div>

//         {/* Main Illustration */}
//         <div className="relative z-10 w-full max-w-2xl">
//           <Image
//             src="/images/login.png"
//             alt="Illustration"
//             width={800}
//             height={600}
//             className="object-contain"
//             priority
//           />
//         </div>
//       </div>

//       {/* Right Side: Login Form */}
//       <div className="w-full lg:w-2/5 xl:w-[35%] flex items-center justify-center p-6 sm:p-12 md:p-20 lg:p-12 xl:p-24 relative">
//         {/* Mobile/Tablet Background Shape (Optional) */}
//         <Image width={100} height={100} src="/images/shape3.svg" alt="" className="absolute right-0 bottom-0 opacity-10 lg:opacity-20 -z-10 w-40" />

//         <div className="w-full max-w-[400px] flex flex-col items-center text-center">
//           {/* Logo */}
//           <div className="mb-8">
//             <Image
//               src="/images/logo.svg"
//               alt="BuddyScript"
//               width={180}
//               height={45}
//               className="h-10 w-auto"
//             />
//           </div>

//           <div className="mb-10">
//             <p className="text-slate-500 text-sm mb-1">Welcome back</p>
//             <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
//               Login to your account
//             </h1>
//           </div>

//           {/* Google Button */}
//           <Button
//             variant="outline"
//             className="w-full h-14 mb-8 flex items-center justify-center gap-3 border-slate-100 rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
//           >
//             <Image src="/images/google.svg" alt="Google" width={20} height={20} />
//             <span className="text-slate-700 font-medium">Or sign-in with google</span>
//           </Button>

//           {/* Separator */}
//           <div className="relative w-full mb-8">
//             <div className="absolute inset-0 flex items-center">
//               <span className="w-full border-t border-slate-100"></span>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="bg-white px-4 text-slate-400">Or</span>
//             </div>
//           </div>

//           {/* Form */}
//           <form className="w-full space-y-6 text-left">
//             <div className="space-y-2">
//               <Label htmlFor="email" className="text-slate-700 font-medium ml-1">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 className="h-14 bg-[#F8FAFC] border-none rounded-xl focus-visible:ring-blue-500 transition-all"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="password" className="text-slate-700 font-medium ml-1">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 className="h-14 bg-[#F8FAFC] border-none rounded-xl focus-visible:ring-blue-500 transition-all"
//               />
//             </div>

//             <div className="flex items-center justify-between pt-2">
//               <div className="flex items-center space-x-2">
//                  {/* Using Radio as per your design image */}
//                 <div className="flex items-center space-x-2">
//                   <input
//                     type="radio"
//                     id="remember"
//                     className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
//                     checked
//                     readOnly
//                   />
//                   <Label htmlFor="remember" className="text-sm font-medium text-slate-500 cursor-pointer">
//                     Remember me
//                   </Label>
//                 </div>
//               </div>
//               <Link
//                 href="#"
//                 className="text-sm font-medium text-blue-400 hover:text-blue-600 transition-colors"
//               >
//                 Forgot password?
//               </Link>
//             </div>

//             <Button className="w-full h-14 mt-4 bg-[#3B82F6] hover:bg-blue-700 text-white rounded-xl font-semibold text-lg shadow-lg shadow-blue-100">
//               Login now
//             </Button>
//           </form>

//           <p className="mt-10 text-slate-500 text-sm">
//             Dont have an account?{" "}
//             <Link href="#" className="text-blue-500 font-bold hover:underline">
//               Create New Account
//             </Link>
//           </p>
//         </div>
//       </div>
//     </main>
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

export default function LoginPage() {
  const [rememberMe, setRememberMe] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Login", { email, password, rememberMe });
  };

  const handleGoogleLogin = () => {
    console.log("Google login");
  };

  return (
    <section className="relative min-h-screen py-10 w-full overflow-hidden bg-[#F0F2F5] flex items-center">
      {/* Shape One — top left */}
      <div className="pointer-events-none absolute left-0 -top-10 z-0">
        <Image
          src="/images/shape1.svg"
          alt=""
          width={150}
          height={200}
          className="block "
        />
      </div>

    {/* Shape two — right side */}
      <div className="pointer-events-none absolute right-5 -top-0 z-0">
        <Image
          src="/images/shape2.svg"
          alt=""
          width={450}
          height={300}
          className="block "
        />
      </div>

      {/* Shape three — bottom left */}
      <div className="pointer-events-none absolute -bottom-0 right-0 z-0">
        <Image
          src="/images/shape3.svg"
          alt=""
          width={500}
          height={600}
          className="block "
        />
      </div>

  

      {/* Main Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-4 py-10">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-0">
          {/* ── Left column: illustration ── */}
          <div className="flex w-full items-center justify-center lg:w-2/3">
            <div className="relative w-full max-w-[620px] aspect-[620/520]">
              <Image
                src="/images/login.png"
                alt="Login Illustration"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* ── Right column: login form ── */}
          <div className="flex bg-[#FFFFFF] w-full mr-10 justify-center lg:w-1/3">
            <div className="w-full max-w-[420px]  rounded-2xl px-4 py-10">
              <div className="flex flex-col items-center">
                {/* Logo */}
                <div className="mb-7">
                  <Image
                    src="/images/logo.svg"
                    alt="Logo"
                    width={140}
                    height={40}
                    className="h-auto w-[140px]"
                  />
                </div>

                {/* Heading */}
                <p className="mb-2 text-sm font-medium text-muted-foreground">
                  Welcome back
                </p>
                <h4 className="mb-12 text-2xl font-semibold text-foreground">
                  Login to your account
                </h4>
              </div>

              {/* Google Sign-In */}
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleLogin}
                className="mb-10 flex w-full items-center justify-center gap-3 rounded-xl border border-input bg-white py-5 text-sm font-medium text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground"
              >
                <Image
                  src="/images/google.svg"
                  alt="Google"
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
                <span>Or sign-in with google</span>
              </Button>

              {/* Divider */}
              <div className="relative mb-10 flex items-center">
                <Separator className="flex-1" />
                <span className="mx-4 text-sm text-muted-foreground">Or</span>
                <Separator className="flex-1" />
              </div>

              {/* Form */}
              <div className="space-y-4">
                {/* Email */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="you@example.com"
                  />
                </div>

                {/* Password */}
                <div className="mb-2 space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-foreground"
                  >
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="••••••••"
                  />
                </div>

                {/* Remember me + Forgot password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}

                      onCheckedChange={(checked) =>
                        setRememberMe(checked as boolean)
                      }
                      className="rounded border-input text-white  data-[state=checked]:bg-[#1890FF] data-[state=checked]:border-[#1890FF] "
                    />
                    <Label
                      htmlFor="remember"
                      className="cursor-pointer text-sm font-normal text-foreground"
                    >
                      Remember me
                    </Label>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-[#1890FF] font-medium text-primary hover:underline focus:outline-none"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Login Button */}
                <div className="pt-6 pb-8">
                  <Button
                    type="button"
                    onClick={handleLogin}
                    className="w-full rounded-xl bg-[#1890FF] py-6 text-sm font-semibold text-white hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary/50"
                  >
                    Login now
                  </Button>
                </div>
              </div>

              {/* Sign-up link */}
              <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  href="#"
                  className="font-semibold text-primary hover:underline"
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
