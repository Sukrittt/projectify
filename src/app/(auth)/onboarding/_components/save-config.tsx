import { Check } from "lucide-react";
import { type AvatarFullConfig } from "react-nice-avatar";

import { cn } from "~/lib/utils";
import { Dock, DockIcon } from "~/components/ui/dock";
import { LoaderDot } from "~/app/_components/gsap/loader-dot";
import { CustomToolTip } from "~/components/ui/custom-tool-tip";
import { useUpdateUser } from "~/app/(auth)/onboarding/_hooks/useUpdateUser";

interface SaveConfigProps {
  config: AvatarFullConfig;
}

export const SaveConfig: React.FC<SaveConfigProps> = ({ config }) => {
  const { mutate: updateUser, isPending } = useUpdateUser();

  const handleUpdateUser = () => {
    updateUser({ avatarConfig: JSON.stringify(config) });
  };

  return (
    <Dock magnification={60} distance={100} className="h-full">
      <DockIcon>
        <CustomToolTip text="Save">
          <div
            onClick={handleUpdateUser}
            className={cn(
              "h-8 w-8 cursor-pointer rounded-full bg-neutral-700 p-2",
              {
                "cursor-default opacity-60": isPending,
              },
            )}
          >
            {isPending ? <LoaderDot /> : <Check className="h-4 w-4" />}
          </div>
        </CustomToolTip>
      </DockIcon>
    </Dock>
  );
};
