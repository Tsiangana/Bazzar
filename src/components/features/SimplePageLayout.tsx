interface Section {
  heading: string;
  body: string[];
}

export function SimplePageLayout({
  title,
  intro,
  sections,
}: {
  title: string;
  intro?: string;
  sections: Section[];
}) {
  return (
    <main className="flex-1 bg-page">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-16">
        <div className="flex flex-col gap-4">
          <h1 className="font-display text-4xl font-medium tracking-tight text-zinc-950 sm:text-5xl">
            {title}
          </h1>
          {intro ? <p className="text-lg text-zinc-700">{intro}</p> : null}
        </div>
        <div className="flex flex-col gap-8">
          {sections.map((section) => (
            <section key={section.heading} className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-zinc-950">
                {section.heading}
              </h2>
              {section.body.map((paragraph, i) => (
                <p key={i} className="text-[15px] leading-7 text-zinc-700">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
