export default function PublicLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // Single-page layout - no header/footer needed
    return <>{children}</>
}
