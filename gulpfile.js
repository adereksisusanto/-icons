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
      bootstrapicons: path.src.css + "bootstrap." + pkgName + ".css",
      cryptoicons: path.src.css + "crypto." + pkgName + ".css",
      feathericons: path.src.css + "feather." + pkgName + ".css",
      flagicons: path.src.css + "flag." + pkgName + ".css",
      fontawesomeicons: path.src.css + "fontawesome." + pkgName + ".css",
      ionicons: path.src.css + "ion." + pkgName + ".css",
      materialdesignicons: path.src.css + "material-design." + pkgName + ".css",
      materialicons: path.src.css + "material." + pkgName + ".css",
      simplelineicons: path.src.css + "simple-line." + pkgName + ".css",
      themifyicons: path.src.css + "themify." + pkgName + ".css",
      weathericons: path.src.css + "weather." + pkgName + ".css",
    },
    scss: {
      allicons: path.src.scss + "all-icons.scss",
      bootstrapicons: path.src.scss + "bootstrap-icons.scss",
      cryptoicons: path.src.scss + "crypto-icons.scss",
      feathericons: path.src.scss + "feather-icons.scss",
      flagicons: path.src.scss + "flag-icons.scss",
      fontawesomeicons: path.src.scss + "fontawesome-icons.scss",
      ionicons: path.src.scss + "ion-icons.scss",
      materialdesignicons: path.src.scss + "material-design-icons.scss",
      materialicons: path.src.scss + "material-icons.scss",
      simplelineicons: path.src.scss + "simple-line-icons.scss",
      themifyicons: path.src.scss + "themify-icons.scss",
      weathericons: path.src.scss + "weather-icons.scss",
    },
  },
  build: {
    copy: [path.src.css + "**/*.css", path.src.fonts + "**/*.*"],
  },
};

const dependencies = {
  scss: {
    flagicons: {
      base: path.src.scss + "vendor/flag-icon/",
      src: "node_modules/flag-icon-css/sass/**/*",
      dest: path.src.scss + "vendor/flag-icon/",
    },
    fontawesomefree: {
      base: path.src.scss + "vendor/fontawesome/",
      src: "node_modules/@fortawesome/fontawesome-free/scss/**/*",
      dest: path.src.scss + "vendor/fontawesome/",
    },
    materialdesignicons: {
      base: path.src.scss + "vendor/material-design-icons/",
      src: "node_modules/@mdi/font/scss/**/*",
      dest: path.src.scss + "vendor/material-design-icons/",
    },
    materialicons: {
      base: path.src.scss + "vendor/material-icons/",
      src: "node_modules/material-icons/iconfont/*.scss",
      dest: path.src.scss + "vendor/material-icons/",
    },
    simplelineicons: {
      base: path.src.scss + "vendor/simple-line-icons/",
      src: "node_modules/simple-line-icons/scss/**/*",
      dest: path.src.scss + "vendor/simple-line-icons/",
    },
  },
  fonts: {
    bootstrapicons: {
      base: path.src.fonts + "bootstrap-icons/",
      src: "node_modules/bootstrap-icons/font/fonts/**/*",
      dest: path.src.fonts + "bootstrap-icons/",
    },
    cryptoicons: {
      base: path.src.fonts + "crypto-icons/",
      src: "node_modules/crypto-icons/fonts/**/*",
      dest: path.src.fonts + "crypto-icons/",
    },
    feathericons: {
      base: path.src.fonts + "feather-icons/",
      src: "node_modules/feather-icons/dist/icons/**/*",
      dest: path.src.fonts + "feather-icons/",
    },
    flagicons: {
      base: path.src.fonts + "flag-icon/",
      src: "node_modules/flag-icon-css/flags/**/*",
      dest: path.src.fonts + "flag-icon/",
    },
    fontawesomefree: {
      base: path.src.fonts + "fontawesome/",
      src: "node_modules/@fortawesome/fontawesome-free/webfonts/**/*",
      dest: path.src.fonts + "fontawesome/",
    },
    ionicons: {
      base: path.src.fonts + "ionicons/",
      src: "node_modules/ionicons/dist/svg/**/*.svg",
      dest: path.src.fonts + "ionicons/",
    },
    materialdesignicons: {
      base: path.src.fonts + "material-design-icons/",
      src: "node_modules/@mdi/font/fonts/**/*",
      dest: path.src.fonts + "material-design-icons/",
    },
    materialicons: {
      base: path.src.fonts + "material-icons/",
      src:
        "node_modules/material-icons/iconfont/*.{ttf,otf,woff,woff2,eot,svg}",
      dest: path.src.fonts + "material-icons/",
    },
    simplelineicons: {
      base: path.src.fonts + "simple-line-icons/",
      src: "node_modules/simple-line-icons/fonts/**/*",
      dest: path.src.fonts + "simple-line-icons/",
    },
    themifyicons: {
      base: path.src.fonts + "themify-icons/",
      src: "node_modules/@icon/themify-icons/*.{ttf,woff,eot,svg}",
      dest: path.src.fonts + "themify-icons/",
    },
    weathericons: {
      base: path.src.fonts + "weather-icons/",
      src: "node_modules/weather-icons/font/**/*",
      dest: path.src.fonts + "weather-icons/",
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
gulp.task("css-scss-crypto-icons", () => {
  return gulp
    .src(files.src.scss.cryptoicons)
    .pipe(
      sass({ outputStyle: "expanded", precision: 6 }).on("error", sass.logError)
    )
    .pipe(postcss([autoprefixer()]))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ basename: "crypto." + pkgName }))
    .pipe(gulp.dest(path.src.css));
});
gulp.task("css-scss-feather-icons", () => {
  return gulp
    .src(files.src.scss.feathericons)
    .pipe(
      sass({ outputStyle: "expanded", precision: 6 }).on("error", sass.logError)
    )
    .pipe(postcss([autoprefixer()]))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ basename: "feather." + pkgName }))
    .pipe(gulp.dest(path.src.css));
});
gulp.task("css-scss-flag-icons", () => {
  return gulp
    .src(files.src.scss.flagicons)
    .pipe(
      sass({ outputStyle: "expanded", precision: 6 }).on("error", sass.logError)
    )
    .pipe(postcss([autoprefixer()]))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ basename: "flag." + pkgName }))
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
gulp.task("css-scss-ion-icons", () => {
  return gulp
    .src(files.src.scss.ionicons)
    .pipe(
      sass({ outputStyle: "expanded", precision: 6 }).on("error", sass.logError)
    )
    .pipe(postcss([autoprefixer()]))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ basename: "ion." + pkgName }))
    .pipe(gulp.dest(path.src.css));
});
gulp.task("css-scss-material-design-icons", () => {
  return gulp
    .src(files.src.scss.materialdesignicons)
    .pipe(
      sass({ outputStyle: "expanded", precision: 6 }).on("error", sass.logError)
    )
    .pipe(postcss([autoprefixer()]))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ basename: "material-design." + pkgName }))
    .pipe(gulp.dest(path.src.css));
});
gulp.task("css-scss-material-icons", () => {
  return gulp
    .src(files.src.scss.materialicons)
    .pipe(
      sass({ outputStyle: "expanded", precision: 6 }).on("error", sass.logError)
    )
    .pipe(postcss([autoprefixer()]))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ basename: "material." + pkgName }))
    .pipe(gulp.dest(path.src.css));
});
gulp.task("css-scss-simple-line-icons", () => {
  return gulp
    .src(files.src.scss.simplelineicons)
    .pipe(
      sass({ outputStyle: "expanded", precision: 6 }).on("error", sass.logError)
    )
    .pipe(postcss([autoprefixer()]))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ basename: "simple-line." + pkgName }))
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
gulp.task("css-scss-weather-icons", () => {
  return gulp
    .src(files.src.scss.weathericons)
    .pipe(
      sass({ outputStyle: "expanded", precision: 6 }).on("error", sass.logError)
    )
    .pipe(postcss([autoprefixer()]))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ basename: "weather." + pkgName }))
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
gulp.task("css-min-bootstrap-icons", () => {
  return gulp
    .src(files.src.css.bootstrapicons)
    .pipe(cleanCSS({ level: { 1: { specialComments: 0 } } }))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(path.src.css));
});
gulp.task("css-min-crypto-icons", () => {
  return gulp
    .src(files.src.css.cryptoicons)
    .pipe(cleanCSS({ level: { 1: { specialComments: 0 } } }))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(path.src.css));
});
gulp.task("css-min-feather-icons", () => {
  return gulp
    .src(files.src.css.feathericons)
    .pipe(cleanCSS({ level: { 1: { specialComments: 0 } } }))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(path.src.css));
});
gulp.task("css-min-flag-icons", () => {
  return gulp
    .src(files.src.css.flagicons)
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
gulp.task("css-min-ion-icons", () => {
  return gulp
    .src(files.src.css.ionicons)
    .pipe(cleanCSS({ level: { 1: { specialComments: 0 } } }))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(path.src.css));
});
gulp.task("css-min-material-design-icons", () => {
  return gulp
    .src(files.src.css.materialdesignicons)
    .pipe(cleanCSS({ level: { 1: { specialComments: 0 } } }))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(path.src.css));
});
gulp.task("css-min-material-icons", () => {
  return gulp
    .src(files.src.css.materialicons)
    .pipe(cleanCSS({ level: { 1: { specialComments: 0 } } }))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(path.src.css));
});
gulp.task("css-min-simple-line-icons", () => {
  return gulp
    .src(files.src.css.simplelineicons)
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
gulp.task("css-min-weather-icons", () => {
  return gulp
    .src(files.src.css.weathericons)
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
      "css-scss-bootstrap-icons",
      "css-scss-crypto-icons",
      "css-scss-feather-icons",
      "css-scss-flag-icons",
      "css-scss-fontawesome-icons",
      "css-scss-ion-icons",
      "css-scss-material-design-icons",
      "css-scss-material-icons",
      "css-scss-simple-line-icons",
      "css-scss-themify-icons",
      "css-scss-weather-icons"
    )
  )
);
gulp.task(
  "css-min",
  gulp.series(
    gulp.parallel(
      "css-min-all-icons",
      "css-min-bootstrap-icons",
      "css-min-crypto-icons",
      "css-min-feather-icons",
      "css-min-flag-icons",
      "css-min-fontawesome-icons",
      "css-min-ion-icons",
      "css-min-material-design-icons",
      "css-min-material-icons",
      "css-min-simple-line-icons",
      "css-min-themify-icons",
      "css-min-weather-icons"
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
