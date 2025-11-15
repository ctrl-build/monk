"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface TransitionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  [key: string]: any;
}

export default function TransitionLink({
  href,
  children,
  className,
  onClick,
  ...props
}: TransitionLinkProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    if (onClick) {
      onClick();
    }

    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <Link href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}

