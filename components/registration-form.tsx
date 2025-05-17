'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useActionState } from 'react';
import { AuthResponseType } from '@/app/actions/auth';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { AlertCircle } from 'lucide-react';

export function RegistrationForm({
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
          <CardTitle>Register your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={action}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="text" name="email" placeholder="m@example.com" defaultValue={state?.email} />
                {state?.errors?.email && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{state.errors.email}</AlertDescription>
                  </Alert>
                )}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" name="password" type="password" />
                {state?.errors?.password && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Password must:</AlertTitle>
                    {Array.isArray(state.errors.password) &&
                      state.errors.password.map((error, index) => (
                        <AlertDescription key={index}>{error}</AlertDescription>
                      ))}
                  </Alert>
                )}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                </div>
                <Input id="confirmPassword" name="confirmPassword" type="password" />
                {state?.errors?.confirmPassword && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{state.errors.confirmPassword}</AlertDescription>
                  </Alert>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  {isPending ? 'processing...' : 'Create'}
                </Button>
                {state?.message && (
                  <Alert variant="default" className="text-green-600">
                    <AlertCircle className="h-4 w-4" />
                    <div>{state?.message}</div>
                  </Alert>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
