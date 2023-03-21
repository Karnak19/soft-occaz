"use client";

import Button from "$/components/Button";
import { usePocket } from "$/components/PocketContext";
import { useForm } from "react-hook-form";

interface IFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

function Page({}: {}) {
  const { register: registerUser } = usePocket();

  const { register, formState, reset, watch } = useForm<IFormInputs>();

  const inputClassName = "form-input rounded bg-zinc-900";

  return (
    <div>
      <h1>Register</h1>

      <div>
        <form className="flex flex-col w-96 mx-auto bg-zinc-800 p-8 rounded gap-5 text-sm">
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
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              className={inputClassName}
              type="password"
              {...register("confirmPassword", {
                required: true,
                validate: (val: string) => {
                  if (watch("password") !== val) {
                    return "Your passwords do no match";
                  }
                },
              })}
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
