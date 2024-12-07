"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useSignUp } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "~/components/ui/input-otp";
import { OAuth } from "./oauth";
import { useRouter } from "next/navigation";
import { useToast } from "~/hooks/use-toast";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useClerkError } from "~/hooks/use-clerk-error";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
      message:
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
    })
    .refine((val) => {
      return val.trim().length > 0;
    })
    .refine(
      (val) => {
        return val.trim().length > 0;
      },
      { message: "Password cannot be empty" },
    ),
  code: z.string().optional(),
});

type Inputs = z.infer<typeof formSchema>;
type Step = "sign-up" | "verify-email";

export const AuthForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const { catchClerkError } = useClerkError();

  const { isLoaded: isSignUpLoaded, signUp, setActive } = useSignUp();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<Step>("sign-up");

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerUser = async (data: Inputs) => {
    if (!isSignUpLoaded) return;

    try {
      setIsLoading(true);
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      // Send email verification code
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setStep("verify-email");
      toast({
        title: "Check your email",
        description: "We sent you a 6-digit verification code.",
      });
    } catch (err) {
      catchClerkError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (data: Inputs) => {
    if (!isSignUpLoaded) return;

    if (!data.code || data.code.length !== 6) {
      toast({
        title: "Oops! Something went wrong",
        description: "Looks like you entered an invalid code.",
      });
      return;
    }

    try {
      setIsLoading(true);
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: data.code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });

        router.push("/");
      }
    } catch (err) {
      catchClerkError(err);
    } finally {
      setIsLoading(false);
    }
  };

  function onSubmit(values: Inputs) {
    if (step !== "sign-up") return;

    void registerUser(values);
  }

  useEffect(() => {
    if (form.watch("code")?.length === 6) {
      void verifyEmail(form.getValues());
    }
  }, [form.watch("code")]);

  return (
    <div className="space-y-4">
      <OAuth />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-3"
        >
          {step === "sign-up" ? (
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="funcoder@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          disabled={isLoading}
                          type={showPassword ? "text" : "password"}
                          placeholder="**********"
                          {...field}
                        />

                        <div
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute right-4 top-1/2 -translate-y-1/2"
                        >
                          {showPassword ? (
                            <Eye className="h-4 w-4 cursor-pointer" />
                          ) : (
                            <EyeOff className="h-4 w-4 cursor-pointer" />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ) : (
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col items-center">
                  <div className="space-y-4">
                    <div>
                      <FormLabel>Verification Code</FormLabel>
                      <FormDescription>
                        Enter your 6 digit code to get started.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <InputOTP
                        disabled={isLoading}
                        pattern={REGEXP_ONLY_DIGITS}
                        maxLength={6}
                        {...field}
                      >
                        <InputOTPGroup>
                          {Array.from({ length: 6 }).map((_, index) => (
                            <InputOTPSlot key={index} index={index} />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          )}

          {step === "sign-up" && (
            <Button type="submit" className="mt-4 w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                "Get Started"
              )}
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};
