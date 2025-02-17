export const TriviaQuestions = () => {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-y-4 pt-4 text-[14px]">
      <p>
        Which programming language was used to control the Apollo 11 mission?
      </p>

      <div className="grid w-full max-w-4xl grid-cols-2 gap-2">
        <div className="cursor-pointer rounded-xl border px-4 py-1.5 transition hover:border-neutral-200">
          Assembly Language
        </div>
        <div className="cursor-pointer rounded-xl border px-4 py-1.5 transition hover:border-neutral-200">
          Fortran
        </div>
        <div className="cursor-pointer rounded-xl border px-4 py-1.5 transition hover:border-neutral-200">
          COBOL
        </div>
        <div className="cursor-pointer rounded-xl border px-4 py-1.5 transition hover:border-neutral-200">
          C
        </div>
      </div>
    </div>
  );
};
