import Image from "next/image";

export function Logo() {
  return (
    <div className="relative h-8 max-w-[10.847rem]">
      <Image
        src={"/images/logo/black.png"}
        width={200}
        height={100}
        className="dark:hidden"
        alt="Orgalyze logo"
        role="presentation"
        quality={100}
      />

      <Image
        src={"/images/logo/white.png"}
        width={200}
        height={100}
        className="hidden dark:block"
        alt="Orgalyze logo"
        role="presentation"
        quality={100}
      />
    </div>
  );
}
