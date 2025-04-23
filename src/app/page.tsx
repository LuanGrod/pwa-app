import NotificationHandler from "@/components/NotificationHandler";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col gap-4 items-center justify-center">
      <h1>Hello World!</h1>
      <NotificationHandler/>
    </div>
  );
}
