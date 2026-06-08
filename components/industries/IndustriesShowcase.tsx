import IndustriesDesktopStory from "@/components/industries/IndustriesDesktopStory";
import IndustriesMobileStory from "@/components/industries/IndustriesMobileStory";

export default function IndustriesShowcase() {
  return (
    <>
      <div className="lg:hidden">
        <IndustriesMobileStory />
      </div>
      <div className="relative hidden w-full overflow-x-clip lg:block">
        <IndustriesDesktopStory />
      </div>
    </>
  );
}
