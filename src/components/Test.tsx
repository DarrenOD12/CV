export default function Test() {
  const fonts = [
    {
      name: "Default (System)",
      family: "system-ui, -apple-system, sans-serif",
      category: "System",
    },
    { name: "Agron", family: "Agron, serif", category: "Display" },
    {
      name: "Agron Doodle",
      family: "Agron Doodle, serif",
      category: "Decorative",
    },
    {
      name: "Amladen Bohiga",
      family: "Amladen Bohiga, serif",
      category: "Script",
    },
    {
      name: "Amladen Bohiga Italic",
      family: "Amladen Bohiga Italic, serif",
      category: "Script",
    },
    {
      name: "Brenda Harmony",
      family: "Brenda Harmony, serif",
      category: "Script",
    },
    {
      name: "Brotherdam Signature",
      family: "Brotherdam Signature, serif",
      category: "Signature",
    },
    {
      name: "Bustercall Signature Script",
      family: "Bustercall Signature Script, serif",
      category: "Signature",
    },
    {
      name: "Callestany",
      family: "Callestany, serif",
      category: "Script",
    },
    {
      name: "Callestany Italic",
      family: "Callestany Italic, serif",
      category: "Script",
    },
    {
      name: "Calligrathink",
      family: "Calligrathink, serif",
      category: "Script",
    },
    { name: "Costa Rica", family: "Costa Rica, serif", category: "Display" },
    {
      name: "Costa Rica Swash",
      family: "Costa Rica Swash, serif",
      category: "Decorative",
    },
    {
      name: "Exclusive Script",
      family: "Exclusive Script, serif",
      category: "Script",
    },
    { name: "Fightever", family: "Fightever, serif", category: "Display" },
    { name: "Francy", family: "Francy, serif", category: "Script" },
    { name: "Ginger", family: "Ginger, serif", category: "Script" },
    {
      name: "Gothical Statues",
      family: "Gothical Statues, serif",
      category: "Display",
    },
    {
      name: "Gothical Statues Italic",
      family: "Gothical Statues Italic, serif",
      category: "Display",
    },
    { name: "Hassey", family: "Hassey, serif", category: "Script" },
    {
      name: "Helixa Light",
      family: "Helixa Light, sans-serif",
      category: "Sans-serif",
    },
    {
      name: "Helixa Regular",
      family: "Helixa Regular, sans-serif",
      category: "Sans-serif",
    },
    {
      name: "Helixa Thin",
      family: "Helixa Thin, sans-serif",
      category: "Sans-serif",
    },
    {
      name: "Helvetica Neue Medium",
      family: "Helvetica Neue Medium, sans-serif",
      category: "Sans-serif",
    },
    { name: "Jaguar", family: "Jaguar, serif", category: "Display" },
    { name: "Jasmine", family: "Jasmine, serif", category: "Script" },
    { name: "Kassoogih", family: "Kassoogih, serif", category: "Script" },
    { name: "Mairo", family: "Mairo, serif", category: "Script" },
    { name: "Millano", family: "Millano, serif", category: "Script" },
    {
      name: "Mongtar Regular",
      family: "Mongtar Regular, serif",
      category: "Script",
    },
    {
      name: "Mongtar SVG",
      family: "Mongtar SVG, serif",
      category: "Script",
    },
    {
      name: "Palmeras Sherffy",
      family: "Palmeras Sherffy, serif",
      category: "Script",
    },
    {
      name: "Palmeras Sherffy Italic",
      family: "Palmeras Sherffy Italic, serif",
      category: "Script",
    },
    { name: "Parslay", family: "Parslay, serif", category: "Script" },
    {
      name: "Radella Script",
      family: "Radella Script, serif",
      category: "Script",
    },
    {
      name: "Rosterdam Signature",
      family: "Rosterdam Signature, serif",
      category: "Signature",
    },
    { name: "Rothary", family: "Rothary, serif", category: "Script" },
    { name: "Rulligedro", family: "Rulligedro, serif", category: "Script" },
    {
      name: "Rulligedro Italic",
      family: "Rulligedro Italic, serif",
      category: "Script",
    },
    {
      name: "Slinces Heart",
      family: "Slinces Heart, serif",
      category: "Decorative",
    },
    {
      name: "Wonderful Sunset",
      family: "Wonderful Sunset, serif",
      category: "Script",
    },
  ];

  const categories = [...new Set(fonts.map((font) => font.category))];

  const sampleTexts = [
    "DARREN O'DONNELL",
    "Software Engineer",
    "The quick brown fox jumps over the lazy dog",
    "1234567890",
    "!@#$%^&*()",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">
            Font Preview Gallery
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Explore the complete collection of custom fonts
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <span
                key={category}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-8">
          {fonts.map((font, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    {font.name}
                  </h2>
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm font-medium">
                    {font.category}
                  </span>
                </div>
                <code className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded">
                  {font.family}
                </code>
              </div>

              <div className="space-y-6">
                {/* Large Display - DARREN O'DONNELL with mixed fonts */}
                <div className="border-l-4 border-blue-500 pl-6">
                  <div className="text-5xl text-gray-900 font-medium leading-tight">
                    <span
                      style={{ fontFamily: font.family, fontSize: "0.85em" }}
                    >
                      D
                    </span>
                    <span style={{ fontFamily: "Helixa Light, sans-serif" }}>
                      ARREN{" "}
                    </span>
                    <span
                      style={{ fontFamily: font.family, fontSize: "0.85em" }}
                    >
                      O
                    </span>
                    <span style={{ fontFamily: "Helixa Light, sans-serif" }}>
                      '
                    </span>
                    <span
                      style={{ fontFamily: font.family, fontSize: "0.85em" }}
                    >
                      D
                    </span>
                    <span style={{ fontFamily: "Helixa Light, sans-serif" }}>
                      ONNELL
                    </span>
                  </div>
                </div>

                {/* Medium Display */}
                <div className="border-l-4 border-green-500 pl-6">
                  <div
                    className="text-3xl text-gray-800 leading-relaxed"
                    style={{ fontFamily: font.family }}
                  >
                    Software Engineer & Product Leader
                  </div>
                </div>

                {/* Sample Text Variations */}
                <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Text Samples
                    </h4>
                    {sampleTexts.map((text, textIndex) => (
                      <div
                        key={textIndex}
                        className="text-lg text-gray-700"
                        style={{ fontFamily: font.family }}
                      >
                        {text}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Company Logos
                    </h4>
                    <div className="space-y-2">
                      <div
                        className="text-2xl text-[#5167FC] font-medium"
                        style={{ fontFamily: font.family }}
                      >
                        Stripe
                      </div>
                      <div
                        className="text-2xl text-[#1a73e8] font-medium"
                        style={{ fontFamily: font.family }}
                      >
                        Google
                      </div>
                      <div
                        className="text-2xl text-[#0077b5] font-medium"
                        style={{ fontFamily: font.family }}
                      >
                        LinkedIn
                      </div>
                      <div
                        className="text-2xl text-[#ff6900] font-medium"
                        style={{ fontFamily: font.family }}
                      >
                        Boston Scientific
                      </div>
                    </div>
                  </div>
                </div>

                {/* Size Variations */}
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">
                    Size Variations
                  </h4>
                  <div className="flex flex-wrap items-baseline gap-6">
                    <span
                      className="text-sm text-gray-700"
                      style={{ fontFamily: font.family }}
                    >
                      Small (14px)
                    </span>
                    <span
                      className="text-base text-gray-800"
                      style={{ fontFamily: font.family }}
                    >
                      Regular (16px)
                    </span>
                    <span
                      className="text-lg text-gray-900"
                      style={{ fontFamily: font.family }}
                    >
                      Large (18px)
                    </span>
                    <span
                      className="text-xl text-gray-900"
                      style={{ fontFamily: font.family }}
                    >
                      XL (20px)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 inline-block border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to go back?
            </h3>
            <a
              href="/"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              ← Back to Portfolio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
