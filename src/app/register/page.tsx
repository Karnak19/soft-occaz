'use client';

import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import Button from '$/components/Button';
import FormField from '$/components/FormField';
import { usePocket } from '$/components/PocketContext';
import { Collections } from '$/utils/pocketbase-types';

interface IFormInputs {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  username: string;
}

function Page() {
  const { register: registerUser, pb } = usePocket();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();

  const mutation = useMutation({
    mutationFn: async (data: IFormInputs) => {
      await registerUser(data);
    },
    onSuccess: async (_, data) => {
      await pb.collection(Collections.Users).requestVerification(data.email);
    },
  });

  return (
    <div>
      <div className="flex flex-col gap-5 p-8 mx-auto  rounded w-96 bg-rg-darkest">
        <h1 className="text-xl font-bold">S&apos;inscrire</h1>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit((d) => mutation.mutate(d))}>
          <FormField field="email" register={register('email', { required: true })} errors={errors.email} label="Email" />

          <FormField
            field="password"
            register={register('password', { required: true, minLength: 8 })}
            errors={errors.password}
            type="password"
            label="Mot de passe (8 caractères minimum)"
          />

          <FormField
            field="passwordConfirm"
            register={register('passwordConfirm', {
              required: true,
              validate: (val: string) => {
                if (watch('password') !== val) {
                  return 'Your passwords do no match';
                }
              },
            })}
            errors={errors.passwordConfirm}
            type="password"
            label="Confirmer le mot de passe"
          />

          <FormField
            field="username"
            register={register('username', { required: true })}
            errors={errors.username}
            label="Username"
          />

          <FormField
            field="name"
            register={register('name', { required: true })}
            errors={errors.name}
            label="Nom (ne sera pas visible par les utilisateurs)"
          />

          <div>
            <Button type="submit">Valider</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
