export default function Lookbook() {
  return (
    <main className="bg-[#f5f1ed] text-black min-h-screen">

      {/* Back Button */}
      <div className="p-6">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition"
        >
          ← Return to Home
        </a>
      </div>

      {/* Cover Page */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">

        <p className="uppercase tracking-[0.4em] text-amber-700 mb-4">
          Oraeon Group
        </p>

        <img
          src="/logo.jpg"
          alt="Liorre Logo"
          className="h-90 md:h-32 w-auto object-contain"
        />

        <h1 className="text-6xl md:text-8xl font-bold tracking-wide mt-6">
          LIORRE
        </h1>

        <p className="mt-6 text-2xl text-gray-600">
          THE FIRST CHAPTER
        </p>

        <p className="mt-4 text-lg text-gray-500">
          Premium Identity. Minimal Luxury.
        </p>

      </section>

      {/* The Beginning */}
      <section className="max-w-5xl mx-auto py-24 px-6">

        <div className="text-center">

          <p className="uppercase tracking-[0.3em] text-amber-600 mb-4">
            The Beginning
          </p>

          <h2 className="text-5xl font-bold mb-10">
            Three Friends.
            <br />
            One Vision.
          </h2>

          <p className="text-gray-700 leading-9 text-lg">
            Liorre began with three friends from different states of India,
            united by a shared passion for fashion, creativity, and the dream
            of building something meaningful together.
          </p>

          <p className="mt-6 text-gray-700 leading-9 text-lg">
            Despite coming from different backgrounds and cultures, they shared
            one belief: clothing should be more than just fabric—it should
            inspire confidence, comfort, and individuality.
          </p>

        </div>

      </section>

      <div className="max-w-24 mx-auto border-t border-gray-300"></div>

      {/* Vision */}
      <section className="bg-white py-24">

        <div className="max-w-5xl mx-auto text-center px-6">

          <p className="uppercase tracking-[0.3em] text-amber-600 mb-4">
            The Vision
          </p>

          <h2 className="text-5xl font-bold mb-10">
            From An Idea To A Brand
          </h2>

          <p className="text-lg text-gray-600 leading-9">
            What started as countless conversations, ideas, and sketches
            gradually evolved into a vision for a brand that would combine
            premium comfort with thoughtful design.
          </p>

          <p className="mt-8 text-lg text-gray-600 leading-9">
            Under Oraeon Group, that vision became Liorre.
          </p>

        </div>

      </section>

      <div className="max-w-24 mx-auto border-t border-gray-300"></div>

      {/* Our Belief */}
      <section className="max-w-6xl mx-auto py-24 px-6 text-center">

        <p className="uppercase tracking-[0.3em] text-amber-600 mb-4">
          Our Belief
        </p>

        <h2 className="text-5xl font-bold mb-10">
          Every Design Tells A Story
        </h2>

        <p className="text-lg text-gray-600 leading-9 max-w-4xl mx-auto">
          At Liorre, we believe every design should tell a story.
          Rather than chasing trends, we focus on creating pieces that
          reflect character, purpose, and self-expression.
        </p>

        <p className="mt-8 text-lg text-gray-600 leading-9 max-w-4xl mx-auto">
          Every collection is crafted with attention to quality,
          modern aesthetics, and everyday comfort, allowing people
          to wear not just a design, but an identity.
        </p>

      </section>

      <div className="max-w-24 mx-auto border-t border-gray-300"></div>

      {/* Design Philosophy */}
      <section className="bg-white py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-20">

            <p className="uppercase tracking-[0.3em] text-amber-600 mb-4">
              Design Philosophy
            </p>

            <h2 className="text-5xl font-bold">
              Inspired By Every Journey
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-12">

            <div className="bg-[#f5f1ed] p-10 rounded-3xl">
              <h3 className="text-3xl font-bold mb-4">
                Courage
              </h3>

              <p className="text-gray-600 leading-8">
                Our designs celebrate the courage to stand apart and
                confidently embrace individuality.
              </p>
            </div>

            <div className="bg-[#f5f1ed] p-10 rounded-3xl">
              <h3 className="text-3xl font-bold mb-4">
                Creativity
              </h3>

              <p className="text-gray-600 leading-8">
                Our designs reflect creativity and timeless expression,
                inspired by ideas that go beyond trends.
              </p>
            </div>

            <div className="bg-[#f5f1ed] p-10 rounded-3xl">
              <h3 className="text-3xl font-bold mb-4">
                Personality
              </h3>

              <p className="text-gray-600 leading-8">
                Our designs embrace simplicity with personality,
                proving that subtle details can leave a lasting impression.
              </p>
            </div>

            <div className="bg-[#f5f1ed] p-10 rounded-3xl">
              <h3 className="text-3xl font-bold mb-4">
                Exploration
              </h3>

              <p className="text-gray-600 leading-8">
                Our designs represent the spirit of exploration and growth,
                inspiring people to keep moving forward.
              </p>
            </div>

          </div>

          <p className="text-center text-lg text-gray-600 mt-16 max-w-4xl mx-auto leading-9">
            Each collection carries its own meaning, allowing every individual
            to connect with a story that resonates with them.
          </p>

        </div>

      </section>

      {/* Quote */}
      <section className="py-32 px-6">

        <div className="max-w-4xl mx-auto text-center">

          <p className="text-4xl md:text-5xl italic font-light leading-relaxed">
            "No matter where you come from,
            your dreams are valid."
          </p>

        </div>

      </section>

      {/* Final Message */}
      <section className="bg-black text-white py-32">

        <div className="max-w-4xl mx-auto text-center px-6">

          <h2 className="text-5xl font-bold mb-12">
            A Message From Liorre
          </h2>

          <p className="text-xl leading-10 text-gray-300">
            Great journeys often begin with small ideas,
            shared by people who dare to believe in them.
          </p>

          <p className="mt-8 text-xl leading-10 text-gray-300">
            What unites us is not our differences,
            but our willingness to create, grow,
            and move forward together.
          </p>

          <div className="mt-16">
            <h3 className="text-4xl font-bold">
              Three Friends.
            </h3>

            <h3 className="text-4xl font-bold mt-3">
              One Vision.
            </h3>

            <h3 className="text-4xl font-bold mt-3">
              Endless Possibilities.
            </h3>
          </div>

          <div className="mt-20">

            <p className="text-2xl text-gray-300">
              This is more than clothing.
            </p>

            <h1 className="text-7xl font-bold mt-8 tracking-wider">
              LIORRE
            </h1>

          </div>

        </div>

      </section>

    </main>
  );
}