'use client';

import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import Button from '$/components/Button';
import { usePocket } from '$/components/PocketContext';

type IFormInputs = {
  email: string;
  password: string;
};

function Page() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>();

  const router = useRouter();

  const { login } = usePocket();

  const mutation = useMutation({
    mutationFn: (data: IFormInputs) => login(data.email, data.password),
    onSuccess: () => router.push('/annonces'),
  });

  const handleLogin = (data: IFormInputs) => {
    mutation.mutate(data);
    reset();
  };

  const inputClassName = 'form-input rounded bg-slate-900';

  return (
    <div>
      <form className="flex flex-col gap-5 p-8 mx-auto text-sm rounded w-96 bg-slate-800" onSubmit={handleSubmit(handleLogin)}>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input className={inputClassName} type="email" {...register('email', { required: true })} />
          {errors.email && <span>This field is required</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input className={inputClassName} type="password" {...register('password', { required: true, minLength: 8 })} />
          {errors.password && (
            <span>
              {errors.password.type === 'required' && 'This field is required'}
              {errors.password.type === 'minLength' && 'Password must have at least 8 characters'}
            </span>
          )}
        </div>
        <div>
          <Button type="submit">Login</Button>
        </div>

        {mutation.isError && <span>Invalid credentials</span>}
      </form>

      <div>
        <Link href="/register">Don&apos;t have an account?</Link>
      </div>
    </div>
  );
}

export default Page;
