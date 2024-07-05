"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { app } from "@/config/firebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

function CreateBusiness() {
  const [businessName, setBusinessName] = useState<any>();
  const db = getFirestore(app);
  const { user }: any = useKindeBrowserClient();
  const router = useRouter();

  const onCreateBusiness = async () => {
    console.log("btn Click", businessName);
    await setDoc(doc(db, "Business", user.email), {
      businessName: businessName.replace(" ", "_"),
      email: user.email,
      userName: user.given_name + " " + user.family_name,
    }).then((resp) => {
      console.log("Document Saved");
      toast("New Business Created!");
      router.replace("/dashboard");
    });
  };
  return (
    <div className="p-14 items-center flex flex-col gap-20 my-10">
      <Image src="/logo.svg" width={200} height={200} alt="img" />
      <div className="flex flex-col items-center gap-4 max-w-3xl">
        <h2 className="text-4xl font-bold">
          What should we call your business?
        </h2>
        <p className="text-slate-500">
          You can always change this later from settings
        </p>
        <div className="w-full">
          <label className="text-slate-400">Team Name</label>
          <Input
            placeholder="Ex. Google"
            className="mt-2"
            onChange={(event: any) => setBusinessName(event.target.value)}
          />
        </div>
        <Button
          className="w-full"
          disabled={!businessName}
          onClick={onCreateBusiness}
        >
          Create Business
        </Button>
      </div>
    </div>
  );
}

export default CreateBusiness;
