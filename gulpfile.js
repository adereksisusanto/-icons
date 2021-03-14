const gulp = require("gulp"),
  autoprefixer = require("autoprefixer"),
  rename = require("gulp-rename"),
  cleanCSS = require("gulp-clean-css"),
  header = require("gulp-header"),
  sass = require("gulp-sass"),
  postcss = require("gulp-postcss"),
  del = require("del");

const pkg = require("./package.json");
const pkgName = "icons";
const pkgNameJSCore = pkgName + ".core";
const pkgNameJSMain = pkgName + ".app";

const banner = [
  "/*!",
  ` * ${pkg.name} - v${pkg.version}`,
  ` * @author ${pkg.author} - https://adereksisusanto.github.io`,
  ` * Copyright (c) ${new Date().getFullYear()}`,
  " */",
  "",
].join("\n");

const dir = {
  src: "src/",
  build: "dist/",
};

const path = {
  dir: {
    src: dir.src,
    build: dir.build,
  },
  src: {
    scss: dir.src + "scss/",
    fonts: dir.src + "fonts/",
    css: dir.src + "css/",
  },
};

const files = {
  src: {
    css: {
      allicons: path.src.css + "all." + pkgName + ".css",
      fontawesomeicons: path.src.css + "fontawesome." + pkgName + ".css",
      bootstrapicons: path.src.css + "bootstrap." + pkgName + ".css",
      themifyicons: path.src.css + "themify." + pkgName + ".css",
    },
    scss: {
      allicons: path.src.scss + "all-icons.scss",
      fontawesomeicons: path.src.scss + "fontawesome-icons.scss",
      bootstrapicons: path.src.scss + "bootstrap-icons.scss",
      themifyicons: path.src.scss + "themify-icons.scss",
    },
  },
  build: {
    copy: [path.src.css + "**/*.min.css", path.src.fonts + "**/*.*"],
  },
};

const dependencies = {
  scss: {
    fontawesomefree: {
      base: path.src.scss + "vendor/fontawesome/",
      src: "node_modules/@fortawesome/fontawesome-free/scss/**/*",
      dest: path.src.scss + "vendor/fontawesome/",
    },
  },
  fonts: {
    fontawesomefree: {
      base: path.src.fonts + "fontawesome/",
      src: "node_modules/@fortawesome/fontawesome-free/webfonts/**/*",
      dest: path.src.fonts + "fontawesome/",
    },
    bootstrapicons: {
      base: path.src.fonts + "bootstrap-icons/",
      src: "node_modules/bootstrap-icons/font/fonts/**/*",
      dest: path.src.fonts + "bootstrap-icons/",
    },
    themifyicons: {
      base: path.src.fonts + "themify-icons/",
      src: "node_modules/@icon/themify-icons/*.{ttf,woff,eot,svg}",
      dest: path.src.fonts + "themify-icons/",
    },
  },
};

function depUpdate(depName, depData) {
  del(depData.base).then(() => {
    return gulp.src(depData.src).pipe(gulp.dest(depData.dest));
  });
}

gulp.task("dep-scss", (done) => {
  for (const [key, value] of Object.entries(dependencies.scss)) {
    depUpdate(key, value);
  }
  done();
});

gulp.task("dep-fonts", (done) => {
  for (const [key, value] of Object.entries(dependencies.fonts)) {
    depUpdate(key, value);
  }
  done();
});

gulp.task("dep-update", gulp.series("dep-scss", "dep-fonts"));

gulp.task("css-scss-all-icons", () => {
  return gulp
    .src(files.src.scss.allicons)
    .pipe(
      sass({ outputStyle: "expanded", precision: 6 }).on("error", sass.logError)
    )
    .pipe(postcss([autoprefixer()]))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ basename: "all." + pkgName }))
    .pipe(gulp.dest(path.src.css));
});
gulp.task("css-scss-fontawesome-icons", () => {
  return gulp
    .src(files.src.scss.fontawesomeicons)
    .pipe(
      sass({ outputStyle: "expanded", precision: 6 }).on("error", sass.logError)
    )
    .pipe(postcss([autoprefixer()]))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ basename: "fontawesome." + pkgName }))
    .pipe(gulp.dest(path.src.css));
});
gulp.task("css-scss-bootstrap-icons", () => {
  return gulp
    .src(files.src.scss.bootstrapicons)
    .pipe(
      sass({ outputStyle: "expanded", precision: 6 }).on("error", sass.logError)
    )
    .pipe(postcss([autoprefixer()]))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ basename: "bootstrap." + pkgName }))
    .pipe(gulp.dest(path.src.css));
});
gulp.task("css-scss-themify-icons", () => {
  return gulp
    .src(files.src.scss.themifyicons)
    .pipe(
      sass({ outputStyle: "expanded", precision: 6 }).on("error", sass.logError)
    )
    .pipe(postcss([autoprefixer()]))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ basename: "themify." + pkgName }))
    .pipe(gulp.dest(path.src.css));
});

gulp.task("css-min-all-icons", () => {
  return gulp
    .src(files.src.css.allicons)
    .pipe(cleanCSS({ level: { 1: { specialComments: 0 } } }))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(path.src.css));
});
gulp.task("css-min-fontawesome-icons", () => {
  return gulp
    .src(files.src.css.fontawesomeicons)
    .pipe(cleanCSS({ level: { 1: { specialComments: 0 } } }))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(path.src.css));
});
gulp.task("css-min-bootstrap-icons", () => {
  return gulp
    .src(files.src.css.bootstrapicons)
    .pipe(cleanCSS({ level: { 1: { specialComments: 0 } } }))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(path.src.css));
});
gulp.task("css-min-themify-icons", () => {
  return gulp
    .src(files.src.css.themifyicons)
    .pipe(cleanCSS({ level: { 1: { specialComments: 0 } } }))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(path.src.css));
});

gulp.task(
  "css-dev",
  gulp.series(
    gulp.parallel(
      "css-scss-all-icons",
      "css-scss-fontawesome-icons",
      "css-scss-bootstrap-icons",
      "css-scss-themify-icons"
    )
  )
);
gulp.task(
  "css-min",
  gulp.series(
    gulp.parallel(
      "css-min-all-icons",
      "css-min-fontawesome-icons",
      "css-min-bootstrap-icons",
      "css-min-themify-icons"
    )
  )
);
gulp.task("css", gulp.series(gulp.parallel("css-dev", "css-min")));

gulp.task("build-clean", () => {
  return del(path.dir.build);
});
gulp.task("clean", gulp.series("build-clean"));

gulp.task("build-copy", () => {
  return gulp
    .src(files.build.copy, { base: path.dir.src })
    .pipe(gulp.dest(path.dir.build));
});
