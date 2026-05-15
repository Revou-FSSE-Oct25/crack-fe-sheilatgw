import UserSidebar from "@/components/user/userSidebar"

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-25">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-[250px_1fr]">
        <UserSidebar />

        <section className="rounded-xl bg-white p-5 shadow">
          {children}
        </section>
      </div>
    </main>
  )
}