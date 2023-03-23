"use client";

import Button from "$/components/Button";
import { usePocket } from "$/components/PocketContext";
import { Collections } from "$/utils/pocketbase-types";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

interface IFormInputs {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
}

function Page({}: {}) {
  const { register: registerUser, pb } = usePocket();

  const { register, formState, reset, watch, handleSubmit } =
    useForm<IFormInputs>();

  const mutation = useMutation({
    mutationFn: async (data: IFormInputs) => {
      await registerUser(data);
    },
    onSuccess: async (_, data) => {
      await pb.collection(Collections.Users).requestVerification(data.email);
    },
  });

  const inputClassName = "form-input rounded bg-zinc-900";

  return (
    <div>
      <h1>Register</h1>

      <div>
        <form
          onSubmit={handleSubmit((d) => mutation.mutate(d))}
          className="flex flex-col w-96 mx-auto bg-zinc-800 p-8 rounded gap-5 text-sm"
        >
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              className={inputClassName}
              type="email"
              {...register("email", { required: true })}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              className={inputClassName}
              type="password"
              {...register("password", { required: true, minLength: 8 })}
              autoComplete="new-password"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              className={inputClassName}
              type="password"
              {...register("passwordConfirm", {
                required: true,
                validate: (val: string) => {
                  if (watch("password") !== val) {
                    return "Your passwords do no match";
                  }
                },
              })}
              autoComplete="new-password"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              className={inputClassName}
              type="text"
              {...register("name", { required: true })}
            />
          </div>

          <div>
            <Button type="submit">Register</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
