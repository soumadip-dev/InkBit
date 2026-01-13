'use client';

import { signUpSchema } from '@/app/schemas/auth';
import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup } from '@/components/ui/field';
import { authClient } from '@/lib/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useTransition, useState } from 'react';
import { Eye, EyeOff, Loader2, User, Mail, Lock } from 'lucide-react';
import AnimatedInput from '@/components/ui/animated-input';

export default function SignUpForm() {
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: z.infer<typeof signUpSchema>) => {
    startTransition(async () => {
      await authClient.signUp.email({
        email: data.email,
        name: data.name,
        password: data.password,
        fetchOptions: {
          onSuccess: () => {
            toast.success('Signed up successfully');
            router.push('/');
          },
          onError: error => {
            toast.error(error.error?.message);
          },
        },
      });
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-3">Join Our Community</h1>
        <p className="text-lg text-muted-foreground">Create your account to get started</p>
      </div>

      <div className="relative mx-auto w-full max-w-md rounded-lg border border-dashed border-zinc-300 px-4 sm:px-6 md:px-8 dark:border-zinc-800 shadow-md">
        <div className="absolute top-4 left-0 -z-0 h-px w-full bg-zinc-400 sm:top-6 md:top-8 dark:bg-zinc-700" />
        <div className="absolute bottom-4 left-0 z-0 h-px w-full bg-zinc-400 sm:bottom-6 md:bottom-8 dark:bg-zinc-700" />

        <div className="relative w-full border-x border-zinc-400 dark:border-zinc-700">
          <div className="absolute z-0 grid h-full w-full items-center">
            <section className="absolute z-0 grid h-full w-full grid-cols-2 place-content-between">
              <div className="bg-primary my-4 size-1 -translate-x-[2.5px] rounded-full outline outline-8 outline-gray-50 sm:my-6 md:my-8 dark:outline-gray-950" />

              <div className="bg-primary my-4 size-1 translate-x-[2.5px] place-self-end rounded-full outline outline-8 outline-gray-50 sm:my-6 md:my-8 dark:outline-gray-950" />

              <div className="bg-primary my-4 size-1 -translate-x-[2.5px] rounded-full outline outline-8 outline-gray-50 sm:my-6 md:my-8 dark:outline-gray-950" />

              <div className="bg-primary my-4 size-1 translate-x-[2.5px] place-self-end rounded-full outline outline-8 outline-gray-50 sm:my-6 md:my-8 dark:outline-gray-950" />
            </section>
          </div>

          <div className="relative z-20 mx-auto py-8">
            <div className="p-6">
              <CardHeader className="pb-3 px-0">
                <CardTitle className="text-xl">Create Account</CardTitle>
                <CardDescription>Fill in your details below</CardDescription>
              </CardHeader>
              <CardContent className="px-0">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FieldGroup className="space-y-4">
                    <Controller
                      name="name"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field>
                          <AnimatedInput
                            label="Full Name"
                            placeholder="Enter your full name"
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            disabled={isPending}
                            icon={<User className="h-4 w-4 text-gray-500" />}
                            className="mt-1"
                            inputClassName={`border-2 ${fieldState.invalid ? 'border-destructive focus:border-destructive' : 'border-input focus:border-primary focus:ring-primary'}`}
                            labelClassName={`${fieldState.invalid ? 'text-destructive' : ''}`}
                          />
                          {fieldState.invalid && (
                            <p className="text-sm text-destructive mt-1">
                              {fieldState.error?.message}
                            </p>
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name="email"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field>
                          <AnimatedInput
                            label="Email Address"
                            placeholder="Enter your email"
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            disabled={isPending}
                            icon={<Mail className="h-4 w-4 text-gray-500" />}
                            className="mt-1"
                            inputClassName={`border-2 ${fieldState.invalid ? 'border-destructive focus:border-destructive' : 'border-input focus:border-primary focus:ring-primary'}`}
                            labelClassName={`${fieldState.invalid ? 'text-destructive' : ''}`}
                          />
                          {fieldState.invalid && (
                            <p className="text-sm text-destructive mt-1">
                              {fieldState.error?.message}
                            </p>
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name="password"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field>
                          <div className="relative">
                            <AnimatedInput
                              label="Password"
                              placeholder="Create a password"
                              type={showPassword ? 'text' : 'password'}
                              value={field.value}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              disabled={isPending}
                              icon={<Lock className="h-4 w-4 text-gray-500" />}
                              className="mt-1"
                              inputClassName={`border-2 pr-10 ${fieldState.invalid ? 'border-destructive focus:border-destructive' : 'border-input focus:border-primary focus:ring-primary'}`}
                              labelClassName={`${fieldState.invalid ? 'text-destructive' : ''}`}
                            />
                            <button
                              type="button"
                              onClick={togglePasswordVisibility}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none"
                              aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                          {fieldState.invalid && (
                            <p className="text-sm text-destructive mt-1">
                              {fieldState.error?.message}
                            </p>
                          )}
                        </Field>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full cursor-pointer mt-2"
                      disabled={isPending}
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="size-4 animate-spin mr-2" /> Creating Account...
                        </>
                      ) : (
                        'Create Account'
                      )}
                    </Button>
                  </FieldGroup>
                </form>
                <div className="text-center mt-4">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <a href="/auth/sign-in" className="text-primary hover:underline font-medium">
                      Sign in
                    </a>
                  </p>
                </div>
              </CardContent>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
