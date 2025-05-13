import Link from "next/link";
import { APP_NAME, ROUTES, shortLiner } from "@/lib/constants";
import { Orbit } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Resources",
      links: [
        { label: "Events", href: ROUTES.DISCOVERY },
        { label: "Competitions", href: ROUTES.DISCOVERY },
        { label: "Programs", href: ROUTES.DISCOVERY },
      ],
    },
    /*{
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Blog", href: "/blog" },
      ],
    },*/
    {
      title: "Support",
      links: [
        {
          label: "Help Center",
          href: "https://www.linkedin.com/company/orbitview",
        },
        {
          label: "Contact Us",
          href: "https://www.linkedin.com/company/orbitview",
        },
        // { label: "Privacy Policy", href: "/" },
        // { label: "Terms of Service", href: "/terms" },
      ],
    },
  ];

  return (
    <footer className="bg-muted py-12 mt-auto px-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <Link
              href={ROUTES.HOME}
              className="flex items-center space-x-2 mb-4"
            >
              <Orbit className="h-6 w-6" />
              <span className="font-bold text-xl">{APP_NAME}</span>
            </Link>
            <p className="text-muted-foreground max-w-xs">
              {shortLiner}
            </p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-lightHighlight dark:hover:text-darkHighlight transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} {APP_NAME}. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="https://twitter.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Twitter
            </Link>
            <Link
              href="https://www.linkedin.com/company/orbitview"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </Link>
            <Link
              href="https://www.instagram.com/orbitview_/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
