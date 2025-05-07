import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const publicRoutes = ["/login", "/recuperar-senha", "/geracao-nova-senha"];

  const { pathname } = request.nextUrl;

  const isLogged = request.cookies.has("token");
  const isPublicRoute = publicRoutes.includes(pathname);

  /*
  // se não estiver logado e não for uma rota pública, redireciona para a página de login
  if (!isLogged && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // se estiver logado e for uma rota pública, redireciona para a página inicial
  if (isLogged && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }
    */
 
  // dar o refresh no token (definir uma hora de expiração)
  // TODO

  // jogar para a página solicitada
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Exclui rotas de API, arquivos estáticos, imagens otimizadas e arquivos comuns
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|assets|[\\w-]+\\.\\w+).*)",
  ],
};
