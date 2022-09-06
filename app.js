const Koa = require('koa');
const KoaRouter = require("koa-router");
const json = require('koa-json');
const path = require('path');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new KoaRouter();

//Replace with Db
const things = ['My Family', 'Programming', 'Music'];

//Json prettier middleware
app.use(json());

//Body parser middleware
app.use(bodyParser());

//Add additional properties to context
app.context.user = 'Kou'

//Simple Middleware
//app.use(async ctx => ctx.body = {msg: "Hello world"});

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'html',
    cache: false,
    debug: false
})

//Routes
router.get('/', index);
router.get('/add', showAdd);
router.post('/add', add);

//List of things
async function index(ctx) {
    await ctx.render('index', { title: 'Things I love', things});
}

async function showAdd(ctx) {
    await ctx.render('add');
}

async function add(ctx) {
    const body = ctx.request.body;
    things.push(body.thing);
    ctx.redirect('/');
}

router.get('/test', (ctx => ctx.body = `Hello ${ctx.user}`));
router.get('/test2/:name', (ctx => ctx.body = `Hello ${ctx.params.name}`));

//Router middleware
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => { console.log("Server started...")})