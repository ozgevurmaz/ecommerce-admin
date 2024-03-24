import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-screen flexCenter">
      <SignUp />
    </div>
  );
}
