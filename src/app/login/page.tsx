"use client";

import Button from "$/components/Button";
import { pb } from "$/utils/pocketbase";
import { Collections } from "$/utils/pocketbase-types";
import { useMutation } from "@tanstack/react-query";
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

  return (
    <div>
      <form onSubmit={handleSubmit(login)} className="flex flex-col gap-5">
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" {...register("email", { required: true })} />
          {errors.email && <span>This field is required</span>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
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
    </div>
  );
}

export default Page;
