'use client';

import { useActionState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthResponseType } from '@/app/actions/auth';
import { Alert, AlertDescription } from './ui/alert';
import { AlertCircle } from 'lucide-react';

export function LoginForm({
  handler,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  handler: (state: unknown, formData: FormData) => Promise<AuthResponseType>;
}) {
  const [state, action, isPending] = useActionState(handler, undefined);

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="text" placeholder="m@example.com" />
                {!!state?.errors?.email && state?.errors?.email.length > 0 && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    {Array.isArray(state.errors.email) &&
                      state.errors.email.map((error, index) => (
                        <AlertDescription key={index} className="mb-1">
                          {error}
                        </AlertDescription>
                      ))}
                  </Alert>
                )}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" name="password" type="password" />
                {!!state?.errors?.password && state?.errors?.password?.length > 0 && state?.errors?.password && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    {Array.isArray(state.errors.password) &&
                      state.errors.password.map((error, index) => (
                        <AlertDescription key={index} className="mb-1">
                          {error}
                        </AlertDescription>
                      ))}
                  </Alert>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  {isPending ? 'processing...' : 'Login'}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
