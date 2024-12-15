import { Avatar } from "./_components/avatar";

export default function Onboarding() {
  // const avatar = createAvatar(botttsNeutral, {
  // seed: "Aneka", // and Felix
  // flip: true,
  // scale: 70,
  // radius: 20, //fixed
  // // backgroundColor: ["000", "fff"],
  // // backgroundType: ["gradientLinear"],
  // backgroundRotation: [0, 180],
  // // translateX: -10,
  // // translateY: -10,
  // eyes: ["frame2"],
  // mouth: ["diagram"],
  // });

  // const uri = avatar.toDataUri();

  return (
    <div className="App flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col items-center justify-center">
        <Avatar />
      </main>
    </div>
  );
}
