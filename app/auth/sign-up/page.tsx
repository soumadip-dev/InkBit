'use client';

import { signUpSchema } from '@/app/schemas/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Loader2 } from 'lucide-react';

export default function SignUpPage() {
  const [isPending, startTransition] = useTransition();
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

  return (
    <div className="py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-3">Join Our Community</h1>
        <p className="text-lg text-muted-foreground">Create your account to get started</p>
      </div>
      <Card className="w-full max-w-md mx-auto shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Create Account</CardTitle>
          <CardDescription>Fill in your details below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="space-y-4">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className="font-medium">Full Name</FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your full name"
                      className="border-2 focus:border-primary"
                      {...field}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
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
                      aria-invalid={fieldState.invalid}
                      placeholder="Create a password"
                      className="border-2 focus:border-primary"
                      {...field}
                      type="password"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Button type="submit" className="w-full cursor-pointer mt-2" disabled={isPending}>
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
        </CardContent>
      </Card>
    </div>
  );
}
