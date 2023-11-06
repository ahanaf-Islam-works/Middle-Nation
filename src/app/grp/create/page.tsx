"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCustomToasts } from "@/hooks/use-custom-toasts";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { CreateGroupPayload } from "@/lib/validators/groups";
import { toast } from "@/hooks/use-toast";
const page = () => {
  const { loginToast } = useCustomToasts();
  const [input, setInput] = useState<string>("");

  const router = useRouter();

  const {
    mutate: createCommunity,
    isLoading,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: async () => {
      const payload: CreateGroupPayload = {
        name: input,
      };

      const { data } = await axios.post("/api/grp", payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "Community already exists.",
            description: "Please choose a different name.",
            variant: "destructive",
          });
        }

        if (err.response?.status === 422) {
          return toast({
            title: "Community subreddit name.",
            description: "Please choose a name between 3 and 21 letters.",
            variant: "destructive",
          });
        }

        if (err.response?.status === 401) {
          return loginToast();
        }
      }
      toast({
        title: "There was an error.",
        description: "Could not create Community.",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      router.push(`/grp/${data}`);
    },
  });
  return (
    <div className="container flex items-center h-full max-w-3xl mx-auto">
      <div className="relative bg-white w-full h-fit p-4 rounded-lg space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Create a Community</h1>
        </div>

        <hr className="bg-red-500 h-px" />

        <div>
          <p className="text-lg font-medium">Name</p>
          <p className="text-xs pb-2">
            Community names including capitalization cannot be changed.
          </p>
          <div className="relative">
            <p className="absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-400">
              grp /
            </p>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            disabled={isLoading}
            variant="subtle"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            isLoading={isLoading}
            disabled={input.length === 0}
            onClick={() => createCommunity()}
          >
            Create Community
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
