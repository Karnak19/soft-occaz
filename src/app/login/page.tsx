"use client";

import Button from "$/components/Button";
import { pb } from "$/utils/pocketbase";
import { Collections } from "$/utils/pocketbase-types";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

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

  const mutation = useMutation({
    mutationFn: async (data: IFormInputs) => {
      await pb
        .collection(Collections.Users)
        .authWithPassword(data.email, data.password);
    },
    onSuccess: () => router.push("/ads"),
  });

  const login = (data: IFormInputs) => {
    mutation.mutate(data);
    reset();
  };

  const inputClassName = "form-input rounded bg-zinc-900";

  return (
    <div>
      <form
        className="flex flex-col w-96 mx-auto bg-zinc-800 p-8 rounded gap-5 text-sm"
        onSubmit={handleSubmit(login)}
      >
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            className={inputClassName}
            type="email"
            {...register("email", { required: true })}
          />
          {errors.email && <span>This field is required</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            className={inputClassName}
            type="password"
            {...register("password", { required: true, minLength: 8 })}
          />
          {errors.password && (
            <span>
              {errors.password.type === "required" && "This field is required"}
              {errors.password.type === "minLength" &&
                "Password must have at least 8 characters"}
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
