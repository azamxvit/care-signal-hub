import { redirect } from "next/navigation";

export default async function Home() {
  // заглушка
  
  // кидаю на логин
  redirect("/login");
}