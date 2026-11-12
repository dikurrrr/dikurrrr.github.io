const printButton = document.getElementById("print-cv");

if (printButton) {
  printButton.addEventListener("click", () => window.print());
}

const sectionHeadings = [...document.querySelectorAll("main h2[id]")];

if (sectionHeadings.length) {
  const setActive = (active) => {
    for (const heading of sectionHeadings) {
      heading.classList.toggle("is-active", heading === active);
    }
  };

  const update = () => {
    let current = sectionHeadings[0];
    for (const heading of sectionHeadings) {
      if (heading.getBoundingClientRect().top <= 140) current = heading;
    }

    const atBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 2;

    if (atBottom) current = sectionHeadings[sectionHeadings.length - 1];

    setActive(current);
  };

  let locked = false;

  for (const link of document.querySelectorAll('.jump a[href^="#"]')) {
    link.addEventListener("click", () => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;

      locked = true;
      setActive(target);
      window.setTimeout(() => {
        locked = false;
      }, 800);
    });
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!locked) update();
    },
    { passive: true }
  );

  update();
}
