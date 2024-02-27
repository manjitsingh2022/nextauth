// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { i18n } from "./i18n-config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

function getLocale(request) {
  const negotiatorHeaders = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  console.log(negotiatorHeaders,'negotiatorHeaders')

  const locales = i18n.locales;
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );

  const locale = matchLocale(languages, locales, i18n.defaultLocale);
console.log(locale,'checklocale')
  return locale;
}

export default withAuth(
    function middleware(request) {
      const pathname = request.nextUrl.pathname

      const pathnameIsMissingLocale = i18n?.locales?.every((locale) =>!pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`);
      
      if (pathnameIsMissingLocale) {
        const locale = getLocale(request);
        console.log(locale,'locddddddale')
        // if(locale === i18n?.defaultLocale){
        //   return NextResponse.newrite(
        //     new URL(
        //       `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        //       request.url
        //     )
        //   );
        // }
        return NextResponse.redirect(
          new URL(
            `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
            request.url
          )
        );
      }
  // console.log(pathnameIsMissingLocale,'pathnameIsMissingLocale')

    console.log("request1", request, "manjit");
    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      request.nextauth.token?.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }

    if (
      request.nextUrl.pathname.startsWith("/dashboard") &&
      request.nextauth.token?.role !== "admin" &&
      request.nextauth.token?.role !== "user"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  //  matcher: ["/home", "/admin", "/dashboard"]
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
