// https://stackoverflow.com/questions/70306004/running-cypress-tests-with-tailwindcss-3/70687407#70687407
before(() => {
  cy.exec("npx tailwindcss -i ../../src/index.jss -m").then(({ stdout }) => {
    if (!document.head.querySelector("#tailwind-style")) {
      const link = document.createElement("style");
      link.id = "tailwind-style";
      link.innerHTML = stdout;

      document.head.appendChild(link);
    }
  });
});
