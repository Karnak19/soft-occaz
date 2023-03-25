"use client";

import CreateAdForm from "$/components/CreateAdForm";
import { usePocket } from "$/components/PocketContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Page() {
  const router = useRouter();
  const { user } = usePocket();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, []);

  return (
    <div>
      <CreateAdForm />
    </div>
  );
}

export default Page;
