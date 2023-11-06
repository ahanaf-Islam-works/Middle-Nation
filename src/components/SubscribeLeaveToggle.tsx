"use client";
import { FC } from "react";
import { Button } from "@/components/ui/Button";
import { SubscribeToGroupPayload } from "@/lib/validators/groups";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { useToast } from "../hooks/use-toast";
import { useCustomToasts } from "@/hooks/use-custom-toasts";

interface SubscribeLeaveToggleProps {
  groupId: string;
  groupName: string;
  isSubscribed: boolean;
}

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({
  groupId,
  groupName,
  isSubscribed,
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const { loginToast } = useCustomToasts();

  const { mutate: subscribe, isLoading: isSubloading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToGroupPayload = {
        groupId,
      };
      const { data } = await axios.post("/api/grp/subscribe", payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      return toast({
        title: "There was a problem.",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      startTransition(() => {
        // Refresh the current route and fetch new data from the server without
        // losing client-side browser or React state.
        router.refresh();
      });
      toast({
        title: "Subscribed!",
        description: `You are now subscribed to grp/${groupName}`,
      });
    },
  });

  const { mutate: unsubscribe, isLoading: isunSubloading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToGroupPayload = {
        groupId,
      };
      const { data } = await axios.post("/api/grp/unsubscribe", payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      return toast({
        title: "There was a problem.",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      startTransition(() => {
        // Refresh the current route and fetch new data from the server without
        // losing client-side browser or React state.
        router.refresh();
      });
      toast({
        title: "Subscribed!",
        description: `You are now unsubscribed to grp/${groupName}`,
      });
    },
  });
  return isSubscribed ? (
    <Button
      className="w-full mt-1 mb-4"
      isLoading={isSubloading}
      onClick={() => unsubscribe()}
    >
      Leave community
    </Button>
  ) : (
    <Button
      className="w-full mt-1 mb-4"
      onClick={() => subscribe()}
      isLoading={isunSubloading}
    >
      Join to post
    </Button>
  );
};

export default SubscribeLeaveToggle;
