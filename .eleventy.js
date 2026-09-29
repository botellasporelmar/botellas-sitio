module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy({ "src/_redirects": "_redirects" });

  eleventyConfig.addCollection("botellas", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/botellas/*.md")
      .filter((item) => item.data.publicado !== false)
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addFilter("slugify", function (str) {
    return String(str)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  });

  eleventyConfig.addFilter("fechaLarga", function (dateObj) {
    return new Date(dateObj).toLocaleDateString("es-AR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
