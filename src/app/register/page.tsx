'use client';

import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import Button from '$/components/Button';
import { usePocket } from '$/components/PocketContext';
import { Collections } from '$/utils/pocketbase-types';

interface IFormInputs {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
}

function Page() {
  const { register: registerUser, pb } = usePocket();

  const { register, watch, handleSubmit } = useForm<IFormInputs>();

  const mutation = useMutation({
    mutationFn: async (data: IFormInputs) => {
      await registerUser(data);
    },
    onSuccess: async (_, data) => {
      await pb.collection(Collections.Users).requestVerification(data.email);
    },
  });

  const inputClassName = 'form-input rounded bg-slate-900';

  return (
    <div>
      <div className="flex flex-col gap-5 p-8 mx-auto text-sm rounded w-96 bg-slate-800">
        <h1 className="text-xl font-bold">S&apos;inscrire</h1>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit((d) => mutation.mutate(d))}>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input className={inputClassName} type="email" {...register('email', { required: true })} />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password">Mot de passe</label>
            <input
              className={inputClassName}
              type="password"
              {...register('password', { required: true, minLength: 8 })}
              autoComplete="new-password"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="passwordConfirm">Confirmer</label>
            <input
              className={inputClassName}
              type="password"
              {...register('passwordConfirm', {
                required: true,
                validate: (val: string) => {
                  if (watch('password') !== val) {
                    return 'Your passwords do no match';
                  }
                },
              })}
              autoComplete="new-password"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="name">Nom</label>
            <input className={inputClassName} type="text" {...register('name', { required: true })} />
          </div>

          <div>
            <Button type="submit">Valider</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
