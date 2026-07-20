"use client";

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from "@headlessui/react";

import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

import { useLocale } from "next-intl";

import {
  usePathname,
  useRouter
} from "@/i18n/navigation";

const languages = [
  {
    code: "fr",
    short: "🇫🇷",
    label: "Français"
  },
  {
    code: "en",
    short: "🇬🇧",
    label: "English"
  },
  {
    code: "nl",
    short: "🇳🇱",
    label: "Nederlands"
  }
];

export default function LanguageSwitcher() {

  const locale = useLocale();

  const pathname = usePathname();

  const router = useRouter();

  const current =
    languages.find((l) => l.code === locale)!;

  return (

    <Menu
      as="div"
      className="relative"
    >

      <MenuButton
  className="
    flex
    h-10
    items-center
    gap-2
    rounded-xl
    border
    border-[#d9c6a7]
    bg-white
    px-4
    text-sm
    font-medium
    text-[#2f241d]
    shadow-sm
    transition-all
    duration-200
    hover:border-[#c89b5f]
    hover:shadow-md
  "
>

        <Image
  src={`/flags/${current.code}.png`}
  alt={current.label}
  width={20}
  height={15}
  className="rounded-sm"
/>

        <span>{current.label}</span>

        <ChevronDownIcon
  className="h-5 w-5 text-[#8a6330]"
/>

      </MenuButton>

      <MenuItems
  anchor="bottom end"
  className="
    z-50
    mt-2
    w-48
    overflow-hidden
    rounded-xl
    border
    border-[#e6d8c5]
    bg-white
    shadow-2xl
    focus:outline-none
  "
>

        {languages.map((language) => (

          <MenuItem
            key={language.code}
          >

            {({ focus }) => (

              <button

                onClick={() =>
                  router.replace(pathname, {
                    locale: language.code
                  })
                }

                className={`
  flex
  w-full
  items-center
  justify-between
  px-4
  py-3
  text-sm
  font-medium
  text-[#2f241d]
  transition-colors
  ${focus ? "bg-[#f5f1ea]" : ""}
`}
              >

                <span className="flex items-center gap-3">

                  <Image
  src={`/flags/${language.code}.png`}
  alt={language.label}
  width={20}
  height={15}
  className="rounded-sm"
/>

                  {language.label}

                </span>

                {locale === language.code && (

                  <span className="text-[#c89b5f]">

                    ✓

                  </span>

                )}

              </button>

            )}

          </MenuItem>

        ))}

      </MenuItems>

    </Menu>

  );
}