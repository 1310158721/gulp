const gulp = require('gulp')
const minimist = require('minimist')

// 获取命令行所带的参数
var argv = require('minimist')(process.argv.slice(2))

// 定义要处理的根目录中的src的某个项目名称
const p = argv.p

// 定义要处理的项目的文件夹的路径
const projiectSrc = __dirname + '/src/' + p + '/'

// 定义存放生成文件的目录
const dist = 'dist'

// 压缩 css 文件
const cleanCss = require('gulp-clean-css')
gulp.task('minCss', () => {
	gulp.src(projiectSrc + 'css/*.css')
	    .pipe(cleanCss())
	    .pipe(gulp.dest(dist + '/' + p + '/css'))
})

// 压缩 js 文件
const uglify = require('gulp-uglify')
gulp.task('uglify', () => {
	gulp.src(projiectSrc + 'js/*.js')
	    .pipe(uglify())
	    .pipe(gulp.dest(dist + '/' + p + '/js'))
})

// 压缩 html 文件
const minHtml = require('gulp-htmlmin')
gulp.task('minHtml', () => {
	gulp.src(projiectSrc + '*.html')
	    .pipe(minHtml({
	    	collapseWhitespace: true
	    }))
	    .pipe(gulp.dest(dist + '/' + p))
})

// 复制图片文件
gulp.task('copyImg', () => {
	gulp.src(projiectSrc + '/img/*.{png, jpg, jpeg}')
	    .pipe(gulp.dest(dist + '/' + p + '/img'))
})

// 复制 json 文件
gulp.task('copyJson', () => {
	gulp.src(projiectSrc + '/json/*.json')
	    .pipe(gulp.dest(dist + '/' + p + '/json'))
})

// 一键快速打包
gulp.task('default', ['minCss', 'uglify', 'minHtml', 'copyImg', 'copyJson'])
