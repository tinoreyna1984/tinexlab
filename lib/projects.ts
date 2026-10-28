import type { Locale } from "./i18n";

export type Project = {
  slug: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  tags: string[];
  year: string;
  repo?: string;
  site?: string;
  image: string;
};

export type ProjectTag = {
  slug: string;
  label: Record<Locale, string>;
};

export const projectTags: ProjectTag[] = [
  ["angular", "Angular"], ["java", "Java"], ["spring-boot", "Spring Boot"],
  ["wordpress", "WordPress"], ["auth0", "auth0"], ["nextjs", "Next.js"],
  ["react-native", "React Native"], ["mern", "MERN"], ["mongodb", "MongoDB"],
  ["express", "Express"], ["nodejs", "Node.js"], ["redux-toolkit", "Redux Toolkit"],
  ["react", "React"], ["bootstrap", "Bootstrap"], ["sass", "SASS"],
  ["javascript", "JavaScript"], ["css", "CSS"], ["html", "HTML"], ["tailwind", "Tailwind"],
].map(([slug, label]) => ({
  slug,
  label: { es: label, en: label, pt: label },
}));

const project = (
  slug: string,
  titles: [string, string, string],
  descriptions: [string, string, string],
  tags: string[],
  year: string,
  image: string,
  repo?: string,
  site?: string,
): Project => ({
  slug,
  title: { es: titles[0], en: titles[1], pt: titles[2] },
  description: { es: descriptions[0], en: descriptions[1], pt: descriptions[2] },
  tags,
  year,
  image: `/portfolio/${image}`,
  ...(repo && repo !== "#" ? { repo } : {}),
  ...(site && site !== "#" ? { site } : {}),
});

export const projects: Project[] = [
  project("tinocrm", ["TinoCRM", "TinoCRM", "TinoCRM"], [
    "Proyecto personal de un CRM para aprender Spring Boot + Angular.",
    "Personal CRM project for learning Spring Boot + Angular.",
    "Projeto pessoal de um CRM para aprender Spring Boot + Angular.",
  ], ["angular", "java", "spring-boot", "bootstrap"], "2023", "tinocrm-desktop.png", "https://github.com/tinoreyna1984/tinocrm-frontend"),
  project("academia-springboot-angular", ["Academia Spring Boot + Angular", "Spring Boot + Angular Academy", "Academia Spring Boot + Angular"], [
    "Simulación de una academia.", "Academy simulation.", "Simulação de uma academia.",
  ], ["angular", "java", "spring-boot", "bootstrap"], "2023", "academia-desktop.png", "https://github.com/tinoreyna1984/academia-front"),
  project("iglesia-gracia-eterna", ["Iglesia Gracia Eterna", "Iglesia Gracia Eterna (Eternal Grace Presbyterian Church)", "Igreja Gracia Eterna"], [
    "Sitio web institucional de la Iglesia Gracia Eterna.", "Eternal Grace Presbyterian Church website.", "Site institucional da Igreja Gracia Eterna.",
  ], ["nextjs", "javascript", "tailwind"], "2023", "iglesia-gracia-eterna-desktop.png", "https://github.com/tinoreyna1984/demo-gracia-eterna", "https://iglesiagraciaeterna.org/"),
  project("tino-dark-mode", ["Demo de sitio con modo oscuro", "Dark mode website demo", "Demo de site com modo escuro"], [
    "Sitio de prueba para la funcionalidad de modo oscuro.", "Dummy website for the dark mode feature.", "Site de teste para a funcionalidade de modo escuro.",
  ], ["nextjs", "javascript", "tailwind"], "2023", "tino-dark-mode-desktopXL.png", "https://github.com/tinoreyna1984/tino-dark-mode", "https://tino-dark-mode.vercel.app/"),
  project("random-quote-generator", ["Generador aleatorio de frases", "Random quote generator", "Gerador aleatório de frases"], [
    "Generador aleatorio de frases.", "Random quote generator.", "Gerador aleatório de frases.",
  ], ["nextjs", "redux-toolkit", "javascript", "tailwind"], "2023", "random-quote-generator-tablet.png", "https://github.com/tinoreyna1984/quote-generator", "https://quote-generator-tinoreyna1984.vercel.app/"),
  project("tino-tasker", ["Tino Tasker", "Tino Tasker", "Tino Tasker"], [
    "Aplicación de gestión de tareas en forma de PWA.", "PWA app for task management.", "Aplicativo PWA para gerenciamento de tarefas.",
  ], ["react", "redux-toolkit", "javascript", "sass"], "2023", "tino-tasker-desktopXL.png", "https://github.com/tinoreyna1984/tino-tasker", "https://tino-tasker.vercel.app/"),
  project("landing-page", ["Landing page", "Landing page", "Landing page"], [
    "Landing page hecha con HTML, SASS y una pizca de JavaScript para el menú responsivo.", "Landing page made with HTML, SASS, and a little JavaScript for the responsive menu.", "Landing page feita com HTML, SASS e um pouco de JavaScript para o menu responsivo.",
  ], ["html", "css", "javascript", "sass"], "2023", "devchallenges-07-mobile.png", "https://github.com/tinoreyna1984/devchallenges-07", "https://tino-devchallenges-07.netlify.app/"),
  project("pagina-de-estado-de-compra", ["Página de estado de compra", "Checkout page", "Página de checkout"], [
    "Página diseñada con HTML y CSS.", "Page designed with HTML and CSS.", "Página desenvolvida com HTML e CSS.",
  ], ["html", "css"], "2023", "devchallenges-06-tablet.png", "https://github.com/tinoreyna1984/devchallenges-06", "https://tino-devchallenges-06.netlify.app/"),
  project("pagina-de-galeria", ["Página de galería", "Gallery page", "Página de galeria"], [
    "Diseño hecho con HTML y CSS.", "Design made with HTML and CSS.", "Design feito com HTML e CSS.",
  ], ["html", "css"], "2023", "devchallenges-05-mobile.png", "https://github.com/tinoreyna1984/devchallenges-05", "https://tino-devchallenges-05.netlify.app/"),
  project("pagina-de-la-receta-del-cheescake-clasico", ["Página de la receta del cheesecake clásico", "Classic cheesecake recipe page", "Página da receita de cheesecake clássico"], [
    "Página desarrollada en HTML y CSS.", "Page developed in HTML and CSS.", "Página desenvolvida em HTML e CSS.",
  ], ["html", "css"], "2023", "devchallenges-04-mobile.png", "https://github.com/tinoreyna1984/devchallenges-04", "https://tino-devchallenges-04.netlify.app/"),
  project("pagina-de-la-consultora-de-interiores", ["Página de la consultora de interiores", "Interior consultant page", "Página da consultora de interiores"], [
    "Diseño de una página de consultora de interiores hecho con HTML y CSS.", "Interior consultant page design made with HTML and CSS.", "Design de uma página de consultora de interiores feito com HTML e CSS.",
  ], ["html", "css"], "2023", "devchallenges-03-desktopXL.png", "https://github.com/tinoreyna1984/devchallenges-03", "https://tino-devchallenges-03.netlify.app/"),
  project("pagina-del-equipo-creativo", ["Página del equipo creativo", "The creative crew page", "Página da equipe criativa"], [
    "Diseño hecho con HTML y CSS, usando Flexbox y CSS Grid.", "Design made with HTML and CSS, using Flexbox and CSS Grid.", "Design feito com HTML e CSS, usando Flexbox e CSS Grid.",
  ], ["html", "css"], "2023", "devchallenges-02-desktopXL.png", "https://github.com/tinoreyna1984/devchallenges-02", "https://tino-devchallenges-02.netlify.app/"),
  project("diseno-de-pagina-404", ["Diseño de página 404", "404 Page Layout", "Design de página 404"], [
    "Diseño hecho con HTML y SASS para una página 404.", "Design made with HTML and SASS for a 404 page.", "Design feito com HTML e SASS para uma página 404.",
  ], ["html", "css", "sass"], "2023", "devchallenges-01-desktopXL.png", "https://github.com/tinoreyna1984/devchallenges-01", "https://tino-devchallenges-01.netlify.app/"),
  project("calculadora-pwa", ["Calculadora (PWA)", "Calculator (PWA)", "Calculadora (PWA)"], [
    "Calculadora simple hecha con React JS y Bootstrap 5.", "Simple calculator made with React JS and Bootstrap 5.", "Calculadora simples feita com React JS e Bootstrap 5.",
  ], ["react", "javascript", "bootstrap"], "2022", "calcu-tr-mobile.png", "https://github.com/tinoreyna1984/calcu", "https://calcu-tr.vercel.app/"),
  project("nodejs-webserver-con-paginas-estaticas", ["Node.js webserver con páginas estáticas", "Node.js webserver with static pages", "Webserver Node.js com páginas estáticas"], [
    "Sitio descriptivo con renderización desde el backend.", "Descriptive site rendered from the backend.", "Site descritivo com renderização pelo backend.",
  ], ["html", "css", "javascript", "nodejs", "express"], "2022", "webserver-desktopXL.png", "https://github.com/tinoreyna1984/06-webserver", "https://zero6-webserver-tr.onrender.com/"),
  project("kiuti-cases-ios", ["Kiuti Cases (iOS)", "Kiuti Cases Mobile", "Kiuti Cases Mobile"], [
    "Versión para iOS de Kiuti Cases. Solo visible en Snack.", "Kiuti Cases iOS version. Only visible in Snack.", "Versão para iOS do Kiuti Cases. Visível somente no Snack.",
  ], ["react-native", "redux-toolkit", "react", "javascript"], "2022", "kiuti-cases-ios.png", "https://github.com/tinoreyna1984/kiuti-ios", "https://snack.expo.dev/@tinoreyna1984/67e236?platform=ios"),
  project("capone-academy-demo", ["Academia Capone Demo", "Capone Academy Demo", "Demo da Academia Capone"], [
    "Sitio de una academia de deportes de contacto hecho con WordPress.", "Website for a combat sports academy made with WordPress.", "Site de uma academia de esportes de combate feito com WordPress.",
  ], ["wordpress"], "2019", "capone-demo-desktop.png", undefined, "http://capone-demo.infinityfreeapp.com/"),
  project("constrictor-academy-demo", ["Academia Constrictor Demo", "Constrictor Academy Demo", "Demo da Academia Constrictor"], [
    "Sitio de una academia de deportes de contacto hecho con WordPress.", "Website for a combat sports academy made with WordPress.", "Site de uma academia de esportes de combate feito com WordPress.",
  ], ["wordpress"], "2019", "constrictor-demo-mobile.png", undefined, "http://constrictor-demo.infinityfreeapp.com/"),
  project("l-c-academy-demo", ["L&C Demo", "L&C Demo", "L&C Demo"], [
    "Sitio de una empresa agroindustrial hecho con WordPress.", "Website for an agroindustrial company made with WordPress.", "Site de uma empresa agroindustrial feito com WordPress.",
  ], ["wordpress"], "2020", "lycdemo-desktopXL.png", undefined, "http://lycdemo.infinityfreeapp.com/"),
];
