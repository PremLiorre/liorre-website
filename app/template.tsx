import BackButton from "@/components/BackButton";
import ScrollToTop from "@/components/ScrollToTop";

// Wraps every page. Keeping the Back button here (not in the layout) makes it
// part of the area Next.js scrolls to after navigation, so it is never hidden
// under the sticky navbar.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollToTop />
      <BackButton />
      {children}
    </>
  );
}
