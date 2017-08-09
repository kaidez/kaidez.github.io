---
layout: post
comments: true
title:  "Babel Setup For Beginners"
date:   2016-05-12 22:07:59 -0400
categories: coding-tips
permalink: /babel-setup/
excerpt: How I set up Babel, Browserify, Babelify & Babel ES2015 presets for web development. Great for Babel beginners. Contains lots of resource links.
og-image: babel-logo.jpg
---
<p><a href="https://babeljs.io/">Babel.js</a> is the most popular tool for converting ECMAScript 2015 to the more cross-browser friendly ECMAScript5. I had only played with it a bit so I recently spent a weekend giving it some intense focus.</p><p>Babel was at v5.x when I started looking at it, but it&#8217;s gone through some serious changes since it went to v6.0. I spent quite a bit of time trying to grasp the changes along with some other things, so I&#8217;m documenting what I learned for future reference, as well maybe help other Babel newbies.</p><h2>Table of Contents</h2><ol><li><a href="#assumptions-notes">Assumptions &amp; Notes</a></li><li><a href="#babel-then-now">Babel: Then &amp; Now</a></li><li><a href="#file-setup">File Setup</a></li><li><a href="#task-automation">Task Automation with <code>npm scripts</code></a></li><li><a href="#build-js-task">The <code>build-js</code> Task</a></li><li><a href="#imports">Understanding <code>imports</code></a></li><li><a href="#conclusion">Conclusion</a></li></ol><p><a name="assumptions"></a></p><h2>Assumptions &amp; Notes</h2><p>A few assumptions:</p><ul><li class="post-list-item">I&#8217;m assuming that you have Node/npm installed and know how to use npm to install packages.  If not, <a href="http://nodejs.org/">download Node and npm</a> and <a href="http://npmjs.org/">familiarize yourself with npm packages</a>.</li><li class="post-list-item"><p>I&#8217;m not assuming that you know Babel but am assuming that you have a <em>basic</em> understanding of ES2015.  Not expert level, just basic&#8230;maybe you&#8217;ve read a blog post or two about it. <a href="http://exploringjs.com/es6/">&#8220;Exploring ES6&#8221;</a> is nice starting point for learning.</p><p><em>(Note: &#8220;Exploring ES6&#8221; is free thanks to the graciousness of its author: super-duper nice guy <a href="https://twitter.com/rauschma">Dr. Axel Rauschmayer</a>. But feel free to support him and <a href="https://leanpub.com/exploring-es6/">buy the book</a>.)</em></p></li></ul><p>A few notes:</p><ul><li class="post-list-item"><a href="https://github.com/kaidez/babel-es2015-post">Grab the code on GitHub.</a></li><li class="post-list-item">ECMAScript 2015 (ES2015) is sometimes referred to ECMAScript6 (ES6, like Axel&#8217;s book does) or ES.next. ECMAScript 2015 is the official name so I&#8217;m going to refer to it using its common ES2015 abbreviation.</li><li class="post-list-item">I&#8217;m still learning about the whole ES2015/Babel/Browserify thing so there may be a better way to do all this.  Feel free to leave me a comment if you think this is the case.</li></ul><p><a name="babel-then-now"></a></p><h2>Babel: Then &amp; Now</h2><p>Babel is a tool for compiling ECMAScript 2015 (ES2015) down to ECMAScript5 (ES5), which has wider browser support. This is good because by compiling ES2015 to a JavaScript version with wider browser support, <strong><em>Babel lets us use future JavaScript functionality RIGHT NOW and not wait for browser adoption.</em></strong></p><p>Up to v5.x, Babel had built-in &#8220;transforms&#8221; that compiled the code down to ES5. But v6.0 removed the transforms and, instead, converted them to external plugins that end-users can install as needed.</p><p>This made Babel more modular, which is great, but it took me time to figure out what plugins I needed to do the ES2015 conversions. Plus, I had to get everything to work with <a href="http://browserify.org/">Browserify</a>.</p><p><a name="file-setup"></a></p><h2>File Setup</h2><p>We&#8217;ll focus on the key files related to the post and ignore the others, but here&#8217;s the file structure:</p><pre class=" language-markup"><code class=" language-markup">
es2015-stuff
├── build
|   ├── bundle.js
|   └── index.html
|   └── style.css
├── js-build
|   ├── functions.js
|   └── scripts.js
├── node_modules
├── .babelrc
├── .gitignore
└── package.json
</code></pre><p>If you downloaded these code from the Git repo, the <code>package.json</code> file is already configured with packages needed for this project. Running <code>npm install</code> will install all of them, but I want to point out what the packages are doing:</p><ul><li class="post-list-item">to work with ES2015 code while properly compiling it down to ES5, you need to install Browserify, Babelify and Babel ES2015 presets as <code>devDependencies</code>.</li><li class="post-list-item">after this installation we need to add this field to our <code>package.json</code> so Browserify can work properly with Babel:<pre class=" language-markup"><code class=" language-javascript">
"browserify": {
  "transform": [
    "babelify"
  ]
},
</code></pre></li><li class="post-list-item">we&#8217;ll also need to add code to our <code>.babelrc</code> configuration file so Babel works well with the presets:<pre class=" language-markup"><code class=" language-javascript">
{
  "presets": ["es2015"]
}
</code></pre></li><li class="post-list-item">we&#8217;ll install two more <code>devDependencies</code>: Nodemon to watch for changes to our <code>.js</code> files and httpster to create a mock server for reviewing our updates in a browser. These packages have no effect on how our code works, they just make it easier to review the work as we move along.</li><li class="post-list-item">finally, we&#8217;ll install jQuery and list in <code>dependencies</code> since it should ship with our production app.</li></ul><p>When we add everything else to it, the final <code>package.json</code> file should look similar to this:</p><pre class=" language-markup"><code class=" language-javascript">
{
  "name": "babel-es6-post",
  "scripts": {
    "build-js": "browserify js-build/*.js --o build/bundle.js -t [ babelify --presets [ es2015 ] ]",
    "watch-js": "nodemon -e js -w js-build -x 'npm run build-js'",
    "server": "./node_modules/httpster/bin/httpster -p 3000 -d ./build/",
    "watch": "npm run server &amp; npm run watch-js"
  },
  "browserify": {
    "transform": [
      "babelify"
    ]
  },
  "devDependencies": {
    "babel-preset-es2015": "^6.3.13",
    "babelify": "^7.2.0",
    "browserify": "^13.0.0",
    "httpster": "^1.0.1",
    "nodemon": "1.8.1"
  },
  "dependencies": {
    "jquery": "^2.2.0"
  }
}
</code></pre><p><a name="task-automation"></a></p><h2>Task Automation with <code>npm scripts</code></h2><p>The <code>scripts</code> field lists all the automated tasks needed for the project: it&#8217;s doing the work that <a href="http://gruntjs.com/">Grunt</a> or <a href="http://gulpjs.com/">Gulp</a> would usually do. So typing <code>npm run build-js</code> into the terminal would run the <code>build-js</code> task.</p><p>The <code>watch-js</code> task uses nodemon to watch for file changes inside <code>js-build</code>. So if any of those files change, the <code>build-js</code> task runs automatically.</p><p><em>(Note: nodemon may be TOO much for this project as it appears to be made with full-on Node apps in mind and not websites. Something like <a href="https://github.com/substack/watchify">watchify</a> may be a better fit here, but I really like nodemon right now.)</em></p><p>The <code>server</code> task uses httpster to let the files in <code>build/</code> to be accessed via a web browser at <code>localhost:3000</code>. The <code>watch</code> tasks runs both the server and watch commands.</p><p>This is the task I fire up at when I start working so that the both the <code>httpster</code> server runs and the <code>build-js</code> task immediately runs, <em>then</em> starts watching for changes in <code>js-build/</code>.</p><p><a name="build-js-task"></a></p><h2>The <code>build-js</code> Task</h2><p>But <em>the</em> most important task here is the <code>build-js</code> task.  It&#8217;s the task that uses Babel to compile ES2015 to ES5:</p><pre class=" language-markup"><code class=" language-javascript">
"build-js": "browserify js-build/*.js --o build/bundle.js -t [ babelify --presets [ es2015 ] ]",
</code></pre><p><code>build-js</code> uses Browserify, which treats JavaScript files as separate modules&#8230;we&#8217;ll discuss this in-depth shortly. It concatenates the modules/files/whatever in <code>js-build/</code> to a single <code>bundle.js</code> file in <code>build/</code>.</p><p>All those files use ES2015, which must be converted to ES5. Here&#8217;s <code>functions.js</code>:</p><pre class=" language-markup"><code class=" language-javascript">
// functions.js
export let getName = ( getEl, firstName="Kai", lastName="Gittens" ) =&gt; {
  let fullName =  `Hello ${firstName} ${lastName}`;
  getEl.html( fullName );
}
</code></pre><p>Lots of ES2015 code: the <code>let</code> keyword, arrow functions with default parameters and template strings. <code>scripts.js</code> uses ES2015 as well:</p><pre class=" language-markup"><code class=" language-javascript">
// scripts.js
import { getName } from './functions';
import $ from 'jquery';

const TARGET_EL = $( "#targetEl" );

getName( TARGET_EL );
</code></pre><p>We&#8217;re using the <code>import</code> keyword from ES2015 modules as well as <code>const</code>. The <code>build-js</code> task uses <a href="https://github.com/babel/babelify">Babelify</a>, which helps Browserify convert all this code down to ES5.</p><p>As mentioned, Babel used to do this with internal transforms but they were removed when v6.0 was released. Plugins help here and in this task, Babelify is using a plugin in the form of <code>--presets</code>, the <code>[ es2015 ]</code> preset specifically.</p><p><a name="imports"></a></p><h2>Understanding <code>imports</code></h2><p>Back to Browserify working with separate modules. They actually should be thought of as dependencies, code that other code needs to get a certain job done.</p><p>JavaScript doesn&#8217;t have an internal dependency system like other languages. Node gave the language this with the help of the <code>require()</code> statement:</p><pre class=" language-markup"><code class=" language-javascript">
var getName = require( './functions' ),
    $ = require( 'jquery' );
</code></pre><p>But ES2015 modules give JavaScript such a system with the <code>import</code> statement:</p><pre class=" language-markup"><code class=" language-javascript">
import { getName } from 'functions';
import $ from 'jquery';
</code></pre><p>Getting ES2015 modules to properly compile down to ES5 caused some problems I needed to figure out. How the compiling works seem so obvious now that I solved the problem.</p><p>You see, the <code>import { getName } from 'functions';</code> line implies that there are two files in the same directory: <code>getName.js</code> and <code>functions.js</code>, which there are in my code. A setup like this would be fine if ES2015 modules had wide browser support, but they don&#8217;t and need to be converted down to ES5.</p><p>Browserify helps in the conversion, but how it finds modules differs from ES2015. It uses Node <code>require()</code> to bring in modules, and <code>require()</code> has its own pattern for finding module.</p><p>When told to look for a module like <code>functions.js</code>, the <code>require() </code>statement will look for it as follows:</p><ul><li class="post-list-item">it first looks at Node internally to see if it&#8217;s an internal module, like <code>fs</code> or <code>http</code> or <code>os</code>.</li><li class="post-list-item">if it can&#8217;t find it there, it looks inside <code>node_modules/</code> next which contains modules you install on your own&#8230; <code>browserify</code>, <code>gulp</code>, etc.</li><li class="post-list-item">if it can&#8217;t find it there, it assumes that it&#8217;s your own custom module and you&#8217;ll create the proper path for <code>require()</code> to find it.</li></ul><p>This is fine for bringing in jQuery with <code>import $ from 'jquery';</code>. A Browserify build will make the code ES5-friendly by changing <code>import</code> to <code>require()</code>.</p><p>Since it&#8217;s mapped to the <code>dependencies</code> field in <code>package.json</code>, it&#8217;s inside of <code>node_modules/</code>.  The <code>require()</code> statement will find it eventually.</p><p>It&#8217;s different for the <code>functions.js</code> module: it needs to work with Browserify to properly compile down to ES2015. So in this case, the ES2015 syntax won&#8217;t work&#8230;</p><pre class=" language-markup"><code class=" language-javascript">
import { getName } from 'functions';
</code></pre><p>&#8230;but the Node syntax will&#8230;</p><pre class=" language-markup"><code class=" language-javascript">
// Note the "./" before "functions"
import { getName } from './functions';
</code></pre><p>&#8230;convert to the ES5-friendly <code>require()</code> statement.</p><pre class=" language-markup"><code class=" language-javascript">
var getName = require('./functions');
</code></pre><p>Keep this in mind when going through any online ES2015 module tutorials. Few of them are clear that both Browserify and Babel are need to make them work cross-browser and need a setup like this.<br/> <a name="conclusion"></a></p><h2>Conclusion</h2><p>After ES2015 was released, the team responsible for finalizing the versions (<a href="http://www.ecma-international.org/memento/TC39.htm">TC39</a>) decided that there will be a new ECMAScript release every year: ECMAScript 2016 (ES7) should be released a few months after this post is published.  The browsers won&#8217;t be able to implement all the new features right away so if this release schedule stays, transpilers like Babel will always (<em>ALWAYS</em>) be needed.</p><p>If you want to keep up with JavaScript, taking time to learn all the various requirements, configurations and quirks with these transpilers is time well spent.</p>