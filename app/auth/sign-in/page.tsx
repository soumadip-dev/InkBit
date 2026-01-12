'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { signInSchema } from '@/app/schemas/auth';
import { authClient } from '@/lib/auth-client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import z from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Loader2 } from 'lucide-react';

export default function SignInPage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: z.infer<typeof signInSchema>) => {
    startTransition(async () => {
      await authClient.signIn.email({
        email: data.email,
        password: data.password,
        fetchOptions: {
          onSuccess: () => {
            toast.success('Signed in successfully');
            router.push('/');
          },
          onError: error => {
            toast.error(error.error?.message);
          },
        },
      });
    });
  };

  return (
    <div className="py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-3">Welcome Back</h1>
        <p className="text-lg text-muted-foreground">Sign in to access your account</p>
      </div>
      <Card className="w-full max-w-md mx-auto shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Sign In</CardTitle>
          <CardDescription>Enter your credentials to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="space-y-4">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className="font-medium">Email Address</FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your email"
                      className="border-2 focus:border-primary"
                      {...field}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className="font-medium">Password</FieldLabel>
                    <Input
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your password"
                      className="border-2 focus:border-primary"
                      {...field}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Button type="submit" className="w-full cursor-pointer mt-2" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin mr-2" /> Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
