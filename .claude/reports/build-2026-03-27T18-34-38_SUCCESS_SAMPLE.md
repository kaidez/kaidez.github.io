# Build Report: 2026-03-27T18-34-38

**Status:** PASSED
**Command:** `npm run build:prod`
**Triggered by:** `npm install`

## Output

```

> kaidez.com@4.0.0 build:prod
> npm run compile-main && NODE_ENV=production eleventy && npm run purge-css && npm run minify-js


> kaidez.com@4.0.0 compile-main
> esbuild ts_src/main.ts --bundle --platform=browser --outfile=src/assets/js/main.js


  src/assets/js/main.js  1.2kb

⚡ Done in 6ms
[11ty] Writing ./_site/affiliate-disclaimer/index.html from ./src/affiliate-disclaimer.njk
[11ty] Writing ./_site/blog/index.html from ./src/blog.njk
[11ty] Writing ./_site/feed.xml from ./src/feed.njk
[11ty] Writing ./_site/sitemap.xml from ./src/pages/sitemap/index.njk
[11ty] Writing ./_site/assets/samples/on-delegate/index.html from ./src/assets/samples/on-delegate/index.html (njk)
[11ty] Writing ./_site/assets/samples/on-delegate/more/index.html from ./src/assets/samples/on-delegate/more.html (njk)
[11ty] Writing ./_site/assets/samples/functional-programming-click-tutorial/index.html from ./src/assets/samples/functional-programming-click-tutorial/index.html (njk)
[11ty] Writing ./_site/assets/samples/template-shadowdom-practice/index.html from ./src/assets/samples/template-shadowdom-practice/index.html (njk)
[11ty] Writing ./_site/assets/samples/ajax-tutorial-samples/sample01/index.html from ./src/assets/samples/ajax-tutorial-samples/sample01/index.html (njk)
[11ty] Writing ./_site/assets/samples/ajax-tutorial-samples/sample02/articleName/index.html from ./src/assets/samples/ajax-tutorial-samples/sample02/articleName.html (njk)
[11ty] Writing ./_site/assets/samples/ajax-tutorial-samples/sample02/index.html from ./src/assets/samples/ajax-tutorial-samples/sample02/index.html (njk)
[11ty] Writing ./_site/assets/samples/ajax-tutorial-samples/sample03/articleName/index.html from ./src/assets/samples/ajax-tutorial-samples/sample03/articleName.html (njk)
[11ty] Writing ./_site/assets/samples/ajax-tutorial-samples/sample03/index.html from ./src/assets/samples/ajax-tutorial-samples/sample03/index.html (njk)
[11ty] Writing ./_site/assets/samples/ajax-tutorial-samples/sample04/articleName/index.html from ./src/assets/samples/ajax-tutorial-samples/sample04/articleName.html (njk)
[11ty] Writing ./_site/assets/samples/ajax-tutorial-samples/sample04/index.html from ./src/assets/samples/ajax-tutorial-samples/sample04/index.html (njk)
[11ty] Writing ./_site/assets/samples/ajax-tutorial-samples/sample05/articleName/index.html from ./src/assets/samples/ajax-tutorial-samples/sample05/articleName.html (njk)
[11ty] Writing ./_site/assets/samples/ajax-tutorial-samples/sample05/index.html from ./src/assets/samples/ajax-tutorial-samples/sample05/index.html (njk)
[11ty] Writing ./_site/assets/samples/ajax-tutorial-samples/sample06/articleName/index.html from ./src/assets/samples/ajax-tutorial-samples/sample06/articleName.html (njk)
[11ty] Writing ./_site/assets/samples/ajax-tutorial-samples/sample06/index.html from ./src/assets/samples/ajax-tutorial-samples/sample06/index.html (njk)
[11ty] Writing ./_site/assets/samples/ajax-tutorial-samples/sample07/articleName/index.html from ./src/assets/samples/ajax-tutorial-samples/sample07/articleName.html (njk)
[11ty] Writing ./_site/assets/samples/ajax-tutorial-samples/sample07/index.html from ./src/assets/samples/ajax-tutorial-samples/sample07/index.html (njk)
[11ty] Writing ./_site/assets/samples/ajax-tutorial-samples/sample08/index.html from ./src/assets/samples/ajax-tutorial-samples/sample08/index.html (njk)
[11ty] Writing ./_site/assets/samples/ajax-tutorial-samples/sample09/articleName/index.html from ./src/assets/samples/ajax-tutorial-samples/sample09/articleName.html (njk)
[11ty] Writing ./_site/assets/samples/ajax-tutorial-samples/sample09/index.html from ./src/assets/samples/ajax-tutorial-samples/sample09/index.html (njk)
[11ty] Writing ./_site/assets/samples/ajax-tutorial-samples/sample10/articleName/index.html from ./src/assets/samples/ajax-tutorial-samples/sample10/articleName.html (njk)
[11ty] Writing ./_site/assets/samples/ajax-tutorial-samples/sample10/index.html from ./src/assets/samples/ajax-tutorial-samples/sample10/index.html (njk)
[11ty] Writing ./_site/assets/samples/ajax-tutorial-samples/sample11/articleName/index.html from ./src/assets/samples/ajax-tutorial-samples/sample11/articleName.html (njk)
[11ty] Writing ./_site/assets/samples/ajax-tutorial-samples/sample11/index.html from ./src/assets/samples/ajax-tutorial-samples/sample11/index.html (njk)
[11ty] Writing ./_site/assets/samples/ajax-tutorial-samples/sample12/articleName/index.html from ./src/assets/samples/ajax-tutorial-samples/sample12/articleName.html (njk)
[11ty] Writing ./_site/assets/samples/ajax-tutorial-samples/sample12/index.html from ./src/assets/samples/ajax-tutorial-samples/sample12/index.html (njk)
[11ty] Writing ./_site/assets/samples/ajax-tutorial-samples/sample13/article/index.html from ./src/assets/samples/ajax-tutorial-samples/sample13/article.html (njk)
[11ty] Writing ./_site/assets/samples/ajax-tutorial-samples/sample13/index.html from ./src/assets/samples/ajax-tutorial-samples/sample13/index.html (njk)
[11ty] Writing ./_site/assets/samples/ajax-tutorial-samples/sample14/articleName/index.html from ./src/assets/samples/ajax-tutorial-samples/sample14/articleName.html (njk)
[11ty] Writing ./_site/assets/samples/ajax-tutorial-samples/sample14/index.html from ./src/assets/samples/ajax-tutorial-samples/sample14/index.html (njk)
[11ty] Writing ./_site/assets/samples/ajax-tutorial-samples/sample15/index.html from ./src/assets/samples/ajax-tutorial-samples/sample15/index.html (njk)
[11ty] Writing ./_site/assets/samples/ajax-tutorial-samples/sample16/articleName/index.html from ./src/assets/samples/ajax-tutorial-samples/sample16/articleName.html (njk)
[11ty] Writing ./_site/assets/samples/ajax-tutorial-samples/sample16/index.html from ./src/assets/samples/ajax-tutorial-samples/sample16/index.html (njk)
[11ty] Writing ./_site/assets/samples/ajax-tutorial-samples/sample17/articleName/index.html from ./src/assets/samples/ajax-tutorial-samples/sample17/articleName.html (njk)
[11ty] Writing ./_site/assets/samples/ajax-tutorial-samples/sample17/index.html from ./src/assets/samples/ajax-tutorial-samples/sample17/index.html (njk)
[11ty] Writing ./_site/assets/samples/ajax-tutorial-samples/sample18/article/index.html from ./src/assets/samples/ajax-tutorial-samples/sample18/article.html (njk)
[11ty] Writing ./_site/assets/samples/ajax-tutorial-samples/sample18/index.html from ./src/assets/samples/ajax-tutorial-samples/sample18/index.html (njk)
[11ty] Writing ./_site/assets/samples/ajax-tutorial-samples/sample19/article/index.html from ./src/assets/samples/ajax-tutorial-samples/sample19/article.html (njk)
[11ty] Writing ./_site/assets/samples/ajax-tutorial-samples/sample19/index.html from ./src/assets/samples/ajax-tutorial-samples/sample19/index.html (njk)
[11ty] Writing ./_site/assets/samples/ajax-tutorial-samples/sample20/index.html from ./src/assets/samples/ajax-tutorial-samples/sample20/index.html (njk)
[11ty] Writing ./_site/assets/samples/ajax-tutorial-samples/sample21/article/index.html from ./src/assets/samples/ajax-tutorial-samples/sample21/article.html (njk)
[11ty] Writing ./_site/assets/samples/ajax-tutorial-samples/sample21/index.html from ./src/assets/samples/ajax-tutorial-samples/sample21/index.html (njk)
[11ty] Writing ./_site/assets/samples/ajax-tutorial-samples/sample22/index.html from ./src/assets/samples/ajax-tutorial-samples/sample22/index.html (njk)
[11ty] Writing ./_site/assets/samples/ajax-tutorial-samples/sample23/index.html from ./src/assets/samples/ajax-tutorial-samples/sample23/index.html (njk)
[11ty] Writing ./_site/assets/samples/click-to-tweet/01/index.html from ./src/assets/samples/click-to-tweet/01/index.html (njk)
[11ty] Writing ./_site/assets/samples/click-to-tweet/02/index.html from ./src/assets/samples/click-to-tweet/02/index.html (njk)
[11ty] Writing ./_site/assets/samples/click-to-tweet/03/index.html from ./src/assets/samples/click-to-tweet/03/index.html (njk)
[11ty] Writing ./_site/assets/samples/click-to-tweet/04/index.html from ./src/assets/samples/click-to-tweet/04/index.html (njk)
[11ty] Writing ./_site/assets/samples/functional-programming-click-tutorial/01-post/index.html from ./src/assets/samples/functional-programming-click-tutorial/01-post/index.html (njk)
[11ty] Writing ./_site/assets/samples/functional-programming-click-tutorial/02-post/index.html from ./src/assets/samples/functional-programming-click-tutorial/02-post/index.html (njk)
[11ty] Writing ./_site/assets/samples/functional-programming-click-tutorial/03-post/index.html from ./src/assets/samples/functional-programming-click-tutorial/03-post/index.html (njk)
[11ty] Writing ./_site/assets/samples/functional-programming-click-tutorial/04-post/index.html from ./src/assets/samples/functional-programming-click-tutorial/04-post/index.html (njk)
[11ty] Writing ./_site/assets/samples/template-shadowdom-practice/README/index.html from ./src/assets/samples/template-shadowdom-practice/README.md (njk)
HTML minification failed for ./_site/javascript-for-loop-creates-jquery-fade/index.html Parse Error: < allElems; i = 1) {
    fadingElem = "#elem" + i;
    if (i === 0) {
    	$(fadingElem).fadeIn(fadeTime).delay(delayTime).fadeOut(fadeTime);
    } else if (i === elemNoFade) {
    	$(fadingElem).delay(totalTime * i).fadeIn(fadeTime);
    } else {
    	$(fadingElem).delay(totalTime * i).fadeIn(fadeTime).delay(delayTime).fadeOut(fadeTime);
    }
  }
});
</code></pre>
<p>What's happening here:</p>
<ul>
<li>The elements that you want to fade in and out <em>must</em> be placed on your page with a unique ID that starts with &quot;elem&quot; and ends with a number. The numbers <em>must</em> start counting at 0 (ie. <code>'elem0'</code> first, <code>'elem1'</code> next, <code>'elem2'</code> after that, etc...)</li>
<li>Each fading page element <em>must</em> have a classname of <code>'toBeFaded'</code>.</li>
<li>The JavaScript uses those IDs and classnames to detect the page elements and, based on this detection, create jQuery code that fades the elements in and out.</li>
<li>There will be a delay between each element's fade in and fade out. The JavaScript dynamically detects the length of the delay.</li>
<li>If you want to adjust the seconds of fade in and fade out time, change the number value of the <code>'yourFade'</code> variable in the JavaScript.</li>
<li>If you want to adjust the seconds of the delay, change the number value of the <code>'yourDelay'</code> variable in the JavaScript.</li>
</ul>
<p>The code is fully dynamic: all you have to do is layout the HTML and tweak the JavaScript variables as described above; the code does the rest. You can style things however you want as the CSS but you probably want to keep the <code>display:none</code> and <code>position:absolute</code> settings.</p>
<p>As far as teaching people <em>how</em> to do this, I always assume that those reading my code are web design/dev beginners and try to walk them through it. But the JavaScript for() loop is what's running things here...walking through that isn't a simple process.</p>
<p>I remember struggling with the JavaScript for() loop and believe that others do so as well. So I've created this three-part screencast tutorial that explains the JavaScript for() loop in excruciating detail.</p>
<p>No doubt about it, this screencast tutorial is for the JavaScript beginner. The JavaScript pro may be bored by it; however, if you are a JavaScript pro but have never read either Douglas Crockford's <a href="http://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742">JavaScript: The Good Parts</a> or Stoyan Stevanov's <a href="http://www.amazon.com/JavaScript-Patterns-Stoyan-Stefanov/dp/0596806752/ref=sr_1_1?s=books&amp;ie=UTF8&amp;qid=1330662444&amp;sr=1-1">JavaScript Patterns</a>, you may want to check out the third video.</p>
<p>Enjoy!!!</p>
<h2>Part One</h2>
<iframe width="560" height="315" src="//www.youtube.com/embed/Wc_kLZTyTjQ" frameborder="0" allowfullscreen></iframe>
<h2>Part Two</h2>
<iframe width="560" height="315" src="//www.youtube.com/embed/q0EYJfOz9Mg" frameborder="0" allowfullscreen></iframe>
<h2>Part Three</h2>
<iframe width="560" height="315" src="//www.youtube.com/embed/tFRC1tKeMJ0" frameborder="0" allowfullscreen></iframe>

    <aside class="related-posts" role="complementary" aria-labelledby="related-posts-heading">
      <h2 id="related-posts-heading" class="related-posts-header">Related Posts</h2>
      <ul role="list">
        <li><a href="/javascript-closures-tutorial/">TUTORIAL: What NYC Subways Can Teach Us About JavaScript Closures</a></li><li><a href="/create-html5-page/">TUTORIAL: Create The Building Blocks For An HTML5 Page</a></li><li><a href="/filter-content-jquery/">TUTORIAL: Filter Content With jQuery.filter() & jQuery Selectors</a></li>
      </ul>
    </aside>

  </main>

  <footer class="site-footer">
  <h1 class="content--hidden-text">About Kaidez/Contact Kaidez</h1>
  <div class="container">
    <div class="footer-content">
      <div class="footer-main">
        <div class="footer-colophon">
          <img src="/assets/img/footer-profile-pic.jpeg" class="footer-profile-pic"
            alt="Footer image of Kai 'kaidez' Gittens">
          <div class="footer-colophon-item">
            Kai "kaidez" Gittens is an automation and front end web developer who has contributed
            to web experiences for Blue Cross Blue Shield, JPMorgan Chase, Revlon, jetBlue, Everyday Health and the
            United Nations.
            He lives in the Raleigh-Durham area of North Carolina, USA and is an avid supporter of both
            Chelsea F.C. and Real Madrid C.F.
            <div class="social-links">
              <a href="https://linkedin.com/in/kaigittens" aria-label="LinkedIn" target="_blank"
                rel="noopener">LinkedIn</a>
              <a href="https://www.instagram.com/kaidez/" aria-label="Instagram" target="_blank"
                rel="noopener">Instagram</a>
              <a href="https://github.com/kaidez" aria-label="GitHub" target="_blank" rel="noopener">GitHub</a>
              <a href="https://bsky.app/profile/kaidezg.bsky.social" aria-label="Bluesky" target="_blank"
                rel="noopener">Bluesky</a>
              <a href="https://x.com/kaidez" aria-label="X" target="_blank" rel="noopener">X</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom"></div>
      </div>
    </div>
  </div>
</footer>

<style>
  /* Footer Styles */
  .site-footer {
    border-top: 1px solid var(--color-border);
    margin-top: var(--space-12);
  }

  .footer-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-12);
    padding: var(--space-12) 0 var(--space-8);
  }

  .footer-main h3 {
    font-size: var(--text-xl);
    margin-bottom: var(--space-3);
    color: var(--color-text);
  }

  .social-links {
    justify-content: center;
    font-weight: 900;
  }

  .social-links a {
    color: red;
  }

  .social-links a:hover {

    color: red;

    text-decoration: none;
  }

  .footer-links {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-8);
  }

  .footer-section h4 {
    font-size: var(--text-base);
    font-weight: 600;
    margin-bottom: var(--space-4);
    color: var(--color-text);
  }

  .footer-section ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .footer-section li {
    margin-bottom: var(--space-2);
  }

  .footer-section a {
    color: var(--color-text-muted);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .footer-section a:hover {
    color: var(--color-primary);
  }

  .footer-bottom {
    padding: var(--space-6) 0;
    text-align: center;
    color: var(--color-white);
    font-weight: 600;
    font-size: var(--text-sm);
    text-align: left;
  }

  .footer-bottom p {
    margin-bottom: var(--space-2);
  }

  .footer-bottom p:last-child {
    margin-bottom: 0;
  }

  .footer-bottom a {
    color: var(--color-primary);
  }

  /* Responsive Footer */
  @media (max-width: 768px) {
    .footer-content {
      grid-template-columns: 1fr;
      gap: var(--space-8);
    }

    .footer-links {
      grid-template-columns: 1fr;
      gap: var(--space-6);
    }

  }
</style>
  <script src="/assets/js/main.js" defer></script>

  <!-- Prism.js for syntax highlighting -->
  <script src="/assets/js/prism.js" defer></script>
</body>

</html>
HTML minification failed for ./_site/learn-javascript-unit-testing/index.html Parse Error: <= 0)) {
    throw new Error('expecting a string with at least one character');
  } else {
    console.log(someVariable);
    return someVariable;
  }
};
</code></pre>
<p>And we go back and check our tests...
<img src="/assets/img/unit-testing-image-04.jpg" alt="Second passing test image for the learn JavaScript unit testing post" class="post__image" style="float: none; margin-top: 10px;"></p>
<p>The test suite confirms that <code>log()</code> throws errors when its parameter is not a string with at least one character. So if we update the <code>log()</code> call in <code>scripts.js</code> to look like this...</p>
<pre><code class="language-javascript">
// scripts.js
...
log(""); // logs 'Uncaught Error: expecting a string with at least one character'
</code></pre>
<p>...an error message will appear in the console when go to <code>index.html</code>.</p>
<p>Make sure to reset <code>log(&quot;&quot;);</code> to <code>log(&quot;I’m kind of a big deal&quot;);</code> in <code>scripts.js</code> before proceeding.
<a name="code-coverage"></a></p>
<h2>About code coverage</h2>
<p><em>Code coverage</em> is the analysis of how much of your code is getting tested. It’s almost always measured as a percentage.</p>
<p>Should you <em>always</em> go for 100% code coverage when unit testing? Maybe: search the web and you’ll find a million different answers to the question.</p>
<p>I say do your research and make you’re own decision, but we’re going for 100% coverage in this small example. And in JS unit testing, the most popular code coverage tool is Blanket.js.</p>
<p>We’ll add Blanket.js between <code>jquery.js</code> and <code>app.js</code> in <code>test/tests.html</code>:</p>
<pre><code class="language-markup">
&lt;!-- test/tests.html --&gt;
...
&lt;script src="../jquery.js"&gt;&lt;/script&gt;

&lt;script src="blanket.min.js"&gt;&lt;/script&gt;

&lt;script src="../app.js" data-cover&gt;&lt;/script&gt;
...
</code></pre>
<p><a name="coverage-in-test-suite"></a></p>
<h3>What code coverage looks like in the test suite</h3>
<p>Like we did with <code>log()</code>, we want <code>doSomething()</code> to do type-checking. So we’ll refactor James’ original FP code and add it to the bottom of <code>app.js</code>:</p>
<pre><code class="language-javascript">
// app.js
...
var doSomething = function(someFunction) {
  if(!$.isFunction(someFunction)) {
    throw new Error("doSomething's parameter must be a function");
  } else {
    return someFunction();
  }
};
</code></pre>
<p>We’re using jQuery <code>$.isFunction()</code> to check if the passed parameter is a function. Next, we’ll refresh our test suite and check the “Enable coverage” checkbox that now appears at the top.</p>
<p>The Blanket.js interface will appear: click on the link to <code>app.js</code> to see how much code is getting coverage:</p>
<img src="/assets/img/unit-testing-image-05.jpg" alt="Code coverage image for the learn JavaScript unit testing post" class="post__image" style="float: none; margin-top: 10px;">
<p>Whatever’s highlighted in green is being tested whatever’s highlighted in red is not. And as we see, <code>doSomething()</code> isn’t being test at all.</p>
<p>We can add the following to the bottom of the <code>script</code> tag in our test suite page...</p>
<pre><code class="language-markup">
&lt;!-- test/tests.html --&gt;
&lt;script&gt;
  ...
  QUnit.test('"doSomething()" should return a function', function(assert) {

    var myFunc = function(returnFunc){};
    assert.equal(doSomething(myFunc), myFunc(), 'the function was returned successfully!');

  });
&lt;/script&gt;
</code></pre>
<p>And if we look at the test suite coverage info, we see we’re testing more code that passes unit tests.</p>
<img src="/assets/img/unit-testing-image-06.jpg" alt="Second code coverage image for the learn JavaScript unit testing post" class="post__image" style="float: none; margin-top: 10px;">
<p>We’re not testing if our type-checking works like we did for the <code>log()</code> function. We can fix this by adding type checks again at the bottom of the test suite’s <code>script</code> tag:</p>
<pre><code class="language-markup">
&lt;!-- test/tests.html --&gt;
&lt;script&gt;
  ...
  QUnit.test("'doSomething()' should throw an error if no parameter is passed or if the parameter is not a function", function(assert) {

  assert.throws(function () {
    doSomething();
  }, 'an error was thrown because no parameters are passed to "doSomething()"');

  assert.throws(function () {
    doSomething("");
  }, 'an error was thrown because an empty string is the parameter');

  assert.throws(function () {
    doSomething('function');
  }, 'an error was thrown because a string is the parameter"');

  assert.throws(function () {
    doSomething(null);
  }, 'an error was thrown because "null" is the parameter');

  assert.throws(function () {
    doSomething(undefined);
  }, 'an error was thrown because "undefined" is the parameter');

  assert.throws(function () {
    doSomething(new Symbol("a symbol"));
  }, 'an error was thrown because an ES2015 symbol is the parameter"');

  assert.throws(function () {
    doSomething(345345);
  }, 'an error was thrown because an number is the parameter');
  ...
  // shortened so it's more readable
&lt;/script&gt;
</code></pre>
<p><em>(Side note: Running <code>assert.throws()</code> in two different tests isn’t <a href="https://en.wikipedia.org/wiki/Don't_repeat_yourself">DRY</a>. I couldn’t find a way to DRY everything like I wanted, so this is something I’ll research in the future. Feel free to let me know if you have a cool way to do it.)</em></p>
<p>The tests pass with 100% code coverage:</p>
<img src="/assets/img/unit-testing-image-07.jpg" alt="Third code coverage image for the learn JavaScript unit testing post" class="post__image" style="float: none; margin-top: 10px;">
<p>We can now implement James’ final code for this at the bottom of <code>scripts.js</code>:</p>
<pre><code class="language-javascript">
// scripts.js
...
var sayBigDeal = function() {
  var message = "I'm kind of a big deal";
  log(message);
}

doSomething(sayBigDeal); // logs the second "I'm kind of a big deal"
</code></pre>
<p><a name="testing-more-functional-programming-composition"></a></p>
<h2>Testing more functional programming composition</h2>
<p>James Sinclair’s FP post demonstrated composition with another function that built a carousel:</p>
<pre><code class="language-javascript">
function initialiseCarousel(id, frequency) {
  var el = document.getElementById(id);
  var slider = new Carousel(el, frequency);
  slider.init();
  return slider;
}

initialiseCarousel('main-carousel', 3000);
</code></pre>
<p>A lot going on here:</p>
<ul>
  <li class="post__list-item"><code>initialiseCarousel()</code> takes an <code>id</code> and <code>frequency</code> parameter.</li>
  <li class="post__list-item"><code>id</code> is in the <code>el</code> variable, which finds an element on the page.</li>
  <li class="post__list-item">the <code>el</code> variable and <code>frequency</code> parameter get passed to a <code>slider</code> variable, which is an instance of a constructor function called <code>Carousel()</code>.</li>
  <li class="post__list-item"><code>slider</code>‘s two parameters, <code>el</code> and <code>frequency</code>, respectively define which element is a carousel and how many times it spins.</li>
  <li class="post__list-item">instances of <code>Carousel()</code>, like <code>slider</code>, have access to an <code>init()</code> method.</li>
  <li class="post__list-item"><code>slider</code> is explicitly returned.</li>
  <li class="post__list-item">when <code>initialiseCarousel()</code> runs, it places a new carousel in a main-carousel page element and gives it a duration of 3000, which I assume represents milliseconds.</li>
</ul>
<p>In our quest to learn JavaScript unit testing, we’ll test <code>Carousel()</code> and <code>initialiseCarousel()</code> separately. And since James’ tutorial didn’t create <code>Carousel()</code>, it’s an excellent chance to create it with TDD!
<a name="test-constructor-function"></a></p>
<h3>Unit test a constructor function</h3>
<p>Since <code>Carousel()</code> is a constructor function, we can attach its parameters to <code>this</code>, then return <code>this</code> itself. So we’ll place a failing unit test for this at the bottom of the <code>script</code> tag in our test suite:</p>
<pre><code class="language-markup">
&lt;!-- test/tests.html --&gt;
&lt;script&gt;
  ...
  QUnit.test('"Carousel()" should return a string and a number', function(assert) {

    var someString = 'some-element';
    var someNumber =  4545935234


    assert.ok(new Carousel(someString, someNumber), 'a string and a number were returned!');
  });
&lt;/script&gt;
</code></pre>
<p><code>Carousel</code>‘s two parameters should be a string and a number. So we’ll create two variables called <code>someString</code> and <code>someNumber</code> and pass them to <code>new Carousel()</code> in our test.</p>
<p>We’re using QUnit’s <code>assert.ok()</code> method, which really just checks if our actual value, <code>new Carousel(str, num)</code>, exists. I don’t know if this is the strongest unit test in the world: I just want you to be aware that <code>assert.ok()</code> is an option.</p>
<p>Also, take note that we’re using the <code>new</code> keyword in our assertion. This goes back to our using <code>'use strict'</code> and how function’s define their scope in that scenario.</p>
<p>Doing strict mode and <em>not</em> using <code>new</code> like this in your tests leads to bugs, so be sure to always use new in these cases. Read <a href="https://stackoverflow.com/questions/42459449/qunit-returns-error-in-strict-mode/42460436">the answer to the Stack Overflow question I asked about this</a> to learn more.</p>
<p>We’ll confirm that the test fails...
<img src="/assets/img/unit-testing-image-08.jpg" alt="Carousel failing image for the learn JavaScript unit testing post" class="post__image" style="float: none; margin-top: 10px;"></p>
<p>And add the following code to <code>app.js</code>:</p>
<pre><code class="language-javascript">
function Carousel(getElement, spinDuration) {
  this.getElement = getElement;
  this.spinDuration = spinDuration || 3000;
  if(this.getElement === undefined) {
    throw new Error('Carousel needs to know what element to load into');
  } else {
    return this;
  }
}
</code></pre>
<p><code>Carousel()</code> receives a getElement and spinDuration parameter. Their values will eventually get passed around to <code>initialiseCarousel()</code> when new <code>Carousel()</code> runs inside it.</p>
<p>We’re letting <code>spinDuration</code> be an optional parameter by giving it a default value. If it’s left blank in a <code>Carousel()</code> instance, it will automatically be set to 3000.</p>
<p>But we’re still expecting the <code>getElement</code> parameter: otherwise, our code won’t know where to place the carousel. So we’ll throw a console error if that’s left blank.</p>
<p><em>(Side note: We’re not going to throw errors if the wrong types get passed. We’ve already done it twice and understand how it works but as a challenge, try adding them to this test on your own.)</em></p>
<p>The test passes now. But our code coverage indicates that we didn’t test our thrown error functionality:</p>
<img src="/assets/img/unit-testing-image-09.jpg" alt="First carousel code coverage image for the learn JavaScript unit testing post" class="post__image" style="float: none; margin-top: 10px;">
<p>So we add this test:</p>
<pre><code class="language-markup">
&lt;!-- test/tests.html --&gt;
&lt;script&gt;
  ...
  QUnit.test('"Carousel" should throw an error if an element was not passed as a parameter', function(assert) {

    assert.throws(function () {
      new Carousel();
    }, 'an error was because an element was not passed as a parameter');

  });
&lt;/script&gt;
</code></pre>
<p>And we get 100% coverage on our tests:
<img src="/assets/img/unit-testing-image-10.jpg" alt="Second carousel code coverage image for the learn JavaScript unit testing post" class="post__image" style="float: none; margin-top: 10px;">
Adding a carousel without parameters to the bottom of <code>scripts.js</code> consequently produces a console error when <code>index.html</code> runs in the browser:</p>
<pre><code class="language-javascript">
// scripts.js
...
var someCarousel = new Carousel(); // logs "Carousel needs to know what element to load into"
</code></pre>
<p>But no errors appear when we pass both parameters...</p>
<pre><code class="language-javascript">
// scripts.js
var someCarousel = new Carousel('carousel-one', 5435);
someCarousel.init(); // show “The carousel-one carousel has started” on index.html

var someOtherCarousel = new Carousel('carousel-two');
someOtherCarousel.init(); // show “The carousel-two carousel has started” on index.html

// scripts.js
...
var someCarousel = new Carousel('carousel-one', 5345); // no console errors
</code></pre>
<p>Or even just one element parameter since we have a default value for <code>spinDuration</code>:</p>
<pre><code class="language-javascript">
// scripts.js
...
var someOtherCarousel = new Carousel('carousel-two'); // no console errors
</code></pre>
<p><a name="init-method"></a></p>
<h3>The <code>init()</code> method</h3>
<p>We’ll just make the carousel’s <code>init()</code> method load text into the carousel page element. We’ll add the following test for this at the bottom of the <code>script</code> tag in the test suite:</p>
<pre><code class="language-markup">
&lt;!-- test/tests.html --&gt;
&lt;script&gt;
  ...
  QUnit.test('"Carousel()" should run its init() method and load the proper text', function(assert) {

    var testCarousel = new Carousel('qunit-fixture');
    testCarousel.init();

    assert.equal($('#qunit-fixture').html(), 'The qunit-fixture carousel has started.', 'init() ran and loaded the proper text!');
  });
&lt;/script&gt;
</code></pre>
<p>We create a new instance of <strong>Carousel()</strong> called testCarousel and pass <code>qunit-fixture</code> as its single parameter. <code>qunit-fixture</code> points to the standard page element where QUnit loads other elements that need testing.</p>
<p>(<em>Side note: elements that load into <code>qunit-fixture</code> for testing are removed when the tests are done.)</em></p>
<p>We don’t need to pass a number for the <code>spinDuration</code> parameter. We already gave it a default value in the <strong>Carousel()</strong> function in <code>app.js</code>, so this test should pass without it.</p>
<p><code>init()</code> should place a custom message in <code>div#qunit-fixture</code> that says <code>&quot;The qunit-fixture carousel has started.&quot;</code>. Then we’ll use jQuery’s <code>html()</code> function to look in the qunit-fixture and see if its copy matches our message.</p>
<p>If the copy matches, our QUnit test will say <code>&quot;a slider was returned!&quot;</code> But for now, we have a failing test:
<img src="/assets/img/unit-testing-image-11.jpg" alt="Init failing test image for the learn JavaScript unit testing post" class="post__image" style="float: none; margin-top: 10px;"></p>
<p>Adding this code to the bottom of app.js will get things to work:</p>
<pre><code class="language-javascript">
// app.js
...
Carousel.prototype.init = function() {
  var getCarousel = document.getElementById(this.getElement);
  getCarousel.innerHTML = 'The ' + this.getElement + ' carousel has started.';
};
</code></pre>
<p>We’ve followed JavaScript best practices and placed init() on Carousel‘s prototype instead of in the Carousel constructor function. It finds the element defined in Carousel using <code>document.getElementById()</code>, which is this.element, and stores it in a getCarousel variable.</p>
<p>Next, init() takes the value of this.element and uses it to build a custom message. The message gets loaded into whatever element getCarousel points to.</p>
<p>As a result, our unit test passes with 100% code coverage:
<img src="/assets/img/unit-testing-image-12.jpg" alt="Init passing test image for the learn JavaScript unit testing post" class="post__image" style="float: none; margin-top: 10px;">
And if we run <code>init()</code> two times at the bottom of <code>scripts.js</code>...</p>
<pre><code class="language-javascript">
// scripts.js
var someCarousel = new Carousel('carousel-one', 5435);
someCarousel.init(); // show “The carousel-one carousel has started” on index.html

var someOtherCarousel = new Carousel('carousel-two');
someOtherCarousel.init(); // show “The carousel-two carousel has started” on index.html
</code></pre>
<p>And two text blocks will show up in the <code>carousel-one</code> and <code>carousel-two</code> page elements when <code>index.html</code> runs in the browser.
<a name="test-returned-function"></a></p>
<h3>Unit test the returned function</h3>
<p>In James’ example, the returning function, <code>initialiseCarousel()</code> was expected to return a new instance of <code>Carousel()</code>. A failing test for that looks like this:</p>
<pre><code class="language-markup">
&lt;!-- test/tests.html --&gt;
&lt;script&gt;
  ...
  QUnit.test('"initialiseCarousel()" should return a new instance of Carousel()', function(assert) {

    var testCarouselInstance = initialiseCarousel('qunit-fixture', 3000);
    var isCarouselInstance = testCarouselInstance instanceof Carousel;
    assert.ok(isCarouselInstance, 'a new instance of Carousel() was returned!');

  });
&lt;/script&gt;
</code></pre>
<p>We’re testing with <code>assert.ok()</code> again. The test has a description and a callback as usual and the callback has two variables:</p>
<ul>
  <li class="post__list-item"><code>testCarouselInstance</code> stores an invocation of <code>initialiseCarousel()</code> that creates a carousel in <code>&lt;div id="qunit-fixture" /&gt;</code> with a 3000 millisecond duration.</li>
  <li class="post__list-item"><code>isCarouselInstance</code> stores a test for if <code>testCarouselInstance</code> is actually an instance of <code>Carousel</code> using <code>instanceof</code>.</li>
</ul>
<p>So we have a failing test right now...
<img src="/assets/img/unit-testing-image-13.jpg" alt="initialiseCarousel failing test image for the learn JavaScript unit testing post" class="post__image" style="float: none; margin-top: 10px;"></p>
<p>Then we get to pass by adding James’ original to <code>app.js</code>...</p>
<pre><code class="language-javascript">
//app.js
...
function initialiseCarousel(id, frequency) {
  var el = document.getElementById(id);
  var slider = new Carousel(el, frequency);
  slider.init();
  return slider;
}
</code></pre>
<p>And the test passes...
<img src="/assets/img/unit-testing-image-14.jpg" alt="initialiseCarousel passing test image for the learn JavaScript unit testing post" class="post__image" style="float: none; margin-top: 10px;"></p>
<p>And since our tests confirm that a new <code>Carousel()</code> instance exists and we’re explicitly returning that instance (<code>slider</code>), we can agree that our test is accurate.</p>
<p>We can now invoke <code>initialiseCarousel()</code> in <code>scripts.js</code> to get it working in live code:</p>
<pre><code class="language-javascript">
// scripts.js
...
var testCarousel = initialiseCarousel('main-carousel', 3000); // "The main-carousel carousel has started" displays on the page
</code></pre>
<p><code>index.html</code> displays “The main-carousel carousel has started” when it runs in the browser. And since we’re already getting the DOM element in <code>Carousel()</code>, we can refactor <code>initialiseCarousel()</code> and removing that functionality from it:</p>
<pre><code class="language-javascript">
//app.js
...
function initialiseCarousel(id, frequency) {
  var slider = new Carousel(id, frequency);
  slider.init();
  return slider;
}
</code></pre>
<p>Note that <code>id</code> replaces <code>el</code> in slider‘s parameter.
<a name="bring-it-altogether"></a></p>
<h2>Bringing it altogether</h2>
<p>James’ last example performs roughly the same functionality as the others:</p>
<pre><code class="language-javascript">
function addMagic(id, effect) {
  var element = document.getElementById(id);
  element.className += ' magic';
  effect(element);
}

addMagic('unicorn', spin);
addMagic('fairy', sparkle);
addMagic('kitten', rainbow);
</code></pre>
<p><code>addMagic()</code> takes <code>id</code> and <code>effect</code> as parameters. <code>id</code> is passed to the <code>element</code> variable inside <code>addMagic()</code>, where <code>element</code> references a page element.</p>
<p><code>element</code> gets a class named <code>magic</code> added to it. It also has an effect function invoked inside it, hence, the <code>effect</code> parameter.</p>
<p><code>effect</code> can be either <code>spin</code>, <code>sparkle</code> or <code>rainbow</code>. Like before, we’ll update these functions to load text inside of a page element.</p>
<p>We can unit test all this using everything we’ve learned up to this point. Our first failing test looks like this:</p>
<pre><code class="language-markup">
&lt;!-- test/tests.html --&gt;
&lt;script&gt;
  ...
  QUnit.test('addMagic() should return a function and add a "magic" class to the target element', function(assert) {

    function returnFunc(){}
    addMagic('qunit-fixture', returnFunc);

    assert.equal(typeof returnFunc, 'function', 'the function was returned successfully!');
    assert.equal($('#qunit-fixture').hasClass('magic'), true, 'The targeted element has a class named "magic" !');

  });;
&lt;/script&gt;
</code></pre>
<p>The test invokes <code> addMagic()</code> to find the <code>qunit-fixture</code> page element and return a function named <code>returnFunc</code>. We’ve tested for returned functions before only this time, we’re testing for this using <code>typeof</code> in our first <code>assert</code>.</p>
<p>The second assert tests if the <code>magic</code> class was dynamically added. It uses jQuery’s <code>hasClass</code> functionality to do so.</p>
<p>The test structure for the three effects is a little different:</p>
<pre><code class="language-markup">
&lt;!-- test/tests.html --&gt;
&lt;script&gt;
  ...
  QUnit.module('addMagic() effect tests', function() {
    QUnit.test('spin() should load "spinning..." into its targeted element', function(assert) {
      addMagic('qunit-fixture', spin);
      assert.equal($('#qunit-fixture').html(), 'spinning...', 'The targeted element contains text that says "spinning..."');
    });

    QUnit.test('sparkle() should load "sparkling..." into its targeted element', function(assert) {
      addMagic('qunit-fixture', sparkle);
      assert.equal($('#qunit-fixture').html(), 'sparkling...', 'The targeted element contains text that says "sparkling..."');
    });

    QUnit.test('rainbow() should load "rainbowing..." into its targeted element', function(assert) {
      addMagic('qunit-fixture', rainbow);
      assert.equal($('#qunit-fixture').html(), 'rainbowing...', 'The targeted element contains text that says "rainbowing..."');
    });

  });
&lt;/script&gt;
</code></pre>
<p>Each test passes an effect to <code>addMagic</code> as a parameter. Since each effect places text inside a page element, we’re using jQuery’s <code>html()</code> function again to look for the existence of that text.</p>
<p>This time though, we’re wrapping all these tests inside <code>QUnit.module()</code>. This groups these three tests and makes them stand out a little in our test suite, which is a bit more readable.</p>
<p>So, we have our failing tests now...
<img src="/assets/img/unit-testing-image-15.jpg" alt="addMagic failing test image for the learn JavaScript unit testing post" class="post__image" style="float: none; margin-top: 10px;"></p>
<p>Adding this code to <code>app.js</code> makes the tests pass...</p>
<pre><code class="language-javascript">
// app.js
...
function addMagic(id, effect) {
  if(!id || !effect) {
    throw new Error('addMagic() needs an id and effect parameter');
  } else {
    var element = document.getElementById(id);
    element.className += ' magic';
    return effect(element);
  }
}

function spin(getElement){
  getElement.innerHTML = 'spinning...';
}

function sparkle(getElement){
  getElement.innerHTML = 'sparkling...';
}

function rainbow(getElement){
  getElement.innerHTML = 'rainbowing...';
}
</code></pre>
<p>We’ve slightly adjusted <code>addMagic()</code> where it throws an error if either of its parameters aren’t passed. We’ve also explicitly returned the <code>effect</code> invocation.</p>
<p>Next, we create our three very simple effect functions. Again, they just load some text in whatever page element is defined by their <code>getElement</code> parameters.</p>
<p>We look at our test suite, including the code coverage..
<img src="/assets/img/unit-testing-image-16.jpg" alt="First addMagic code coverage test image for the learn JavaScript unit testing post" class="post__image" style="float: none; margin-top: 10px;">
First addMagic code coverage test image for the learn JavaScript unit testing post</p>
<p>And we see that the tests pass, but not with 100% code coverage.
<img src="/assets/img/unit-testing-image-17.jpg" alt="Second addMagic code coverage test image for the learn JavaScript unit testing post" class="post__image" style="float: none; margin-top: 10px;"></p>
<p>This is due to our not testing <code>addMagic</code>‘s error throwing functionality. Adding a couple of <code>assert.throws()</code> tests will fix this...</p>
<pre><code class="language-markup">
&lt;!-- test/tests.html --&gt;
&lt;script&gt;
  ...
  QUnit.test('"addMagic()" should throw an error if less than 2 parameters are passed', function(assert) {

    assert.throws(function () {
      addMagic();
    }, 'an error was thrown because no parameters were passed to "addMagic()"');

    assert.throws(function() {
      addMagic(spin);
    }, 'an error was thrown because only one parameter was passed to "addMagic()"');

  });
&lt;/script&gt;
</code></pre>
<p>And looking at our test suite and code coverage confirms this. Note that the grouped “addMagic() effect tests” are moved below these new tests even though the grouped tests are above them in the suite code.</p>
<img src="/assets/img/unit-testing-image-18.jpg" alt="Second addMagic throw error test image for the learn JavaScript unit testing post" class="post__image" style="float: none; margin-top: 10px;">
<p>So we can add this code to <code>scripts.js</code>...</p>
<pre><code class="language-javascript">
// scripts.js
...
addMagic('unicorn', spin);
addMagic('fairy', sparkle);
addMagic('kitten', rainbow);
</code></pre>
<p>And copy loads into elements already on the page.</p>
<p><a name="further-reading"></a></p>
<h2>Further reading</h2>
<p>I’ll start with the JS unit test stuff first...</p>
<ul>
  <li class="post__list-item"><a href="https://www.amazon.com/gp/product/0321683919/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&tag=kaidez-20&camp=1789&creative=9325&linkCode=as2&creativeASIN=0321683919&linkId=dc8b88c6ddc8995efab28bd0dc4ca8e2"><strong>Test-Driven JavaScript Development</strong></a> & <a href="https://www.amazon.com/gp/product/1449323391/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&tag=kaidez-20&camp=1789&creative=9325&linkCode=as2&creativeASIN=1449323391&linkId=1e8169ef34f55c9c2e02a46d63bdf0d3"><strong>Testable JavaScript</strong></a>: These two books stand from the others in the JavaScript unit testing worlds. The second one is easier to read, but the first one is the most thorough book on the subject. You may want to read Testable first but make sure to read Test-Driven at some point.</li>
  <li class="post__list-item"><a href="https://code.tutsplus.com/articles/tdd-terminology-simplified--net-30626"><strong>TDD Terminology Simplified</strong></a>: Truthfully? This is list of terms can be applied to unit testing overall and not just TDD. And if you’re concerned that I didn’t cover JavaScript unit testing top to bottom, this list is the next step. For example: we saw earlier that elements which load into <code>qunit-fixture</code> for testing are removed when the tests are done. Keep that in mind, then go to this link and read about “setups” and “teardowns.”</li>
  <li class="post__list-item"><a href="https://medium.com/javascript-scene/what-every-unit-test-needs-f6cd34d9836d#.oxz430giw"><strong>5 Questions Every Unit Test Must Answer</strong></a>: A general primer from <a href="https://x.com/ericelliott_">Eric Elliot</a> on JavaScript unit testing with some smart best practices. Check out how he suggests using <code>equal</code> tests only for a week and his pattern for creating actual/expected tests in constants.</li>
  <li class="post__list-item"><a href="https://alistapart.com/article/writing-testable-javascript"><strong>Writing Testable Javascript</strong></a>: A nice high-level view by <a href="https://twitter.com/rmurphey">Rebecca Murphey</a> of how to write FP-like code that’s easy to test...also watch <a href="https://www.youtube.com/watch?v=OzjogCFO4Zo">her conference talk of the same name</a>.</li>
  <li class="post__list-item"><a href="https://github.com/rmurphey/js-assessment"><strong>JS Assessment</strong></a> & <a href="https://www.codewars.com/"><strong>Codewars</strong></a>: The first one is a CLI-powered test (also by Rebecca Murphey) and the second one’s an app. Each one requires you to write code that passes tests before moving forward. Codewars has a badge-like point system that’s pretty cool.</li>
</ul>
<p>Here’s some functional programming stuff...</p>
<ul>
  <li class="post__list-item"><a href="http://jrsinclair.com/articles/2016/gentle-introduction-to-functional-javascript-intro/"><strong>James Sinclair’s four-part functional programming tutorial</strong></a>: this post only covers the first part...read the whole thing!</li>
  <li class="post__list-item"><a href="https://medium.com/javascript-scene/tagged/functional-programming"><strong>All of Eric Elliot’s functional programming writings</strong></a>: back to Eric Elliot again, he’s written extensively on the subject, and with great insight.</li>
  <li class="post__list-item"><a href="http://eloquentjavascript.net/1st_edition/chapter6.html"><strong>Eloquent JavaScript – First Edition</strong></a>, Chapter 6 & <a href="http://eloquentjavascript.net/05_higher_order.html"><strong>Eloquent JavaScript – Second Edition</strong></a>, Chapter 5: both are good, both are slightly different from one another. Read both.</li>
</ul>
<p><a name="conclusion"></a></p>
<h2>Conclusion</h2>
<p>Any developer can learn JavaScript unit testing. But not until they understand that they can never again place 50 lines of code in a single <code>$(document).ready()</code> block.</p>
<p>They must realize that using functional programming to create small, testable functions will make them an awesome JS unit tester. And a better developer as well!!!</p>


    <aside class="related-posts" role="complementary" aria-labelledby="related-posts-heading">
      <h2 id="related-posts-heading" class="related-posts-header">Related Posts</h2>
      <ul role="list">
        <li><a href="/html5-project-update-responsive-web-design/">HTML5 Project Update: Changing To A Responsive Web Design Using CSS3 Media Queries</a></li><li><a href="/update-html5seomicrodata-post/">Update to My HTML5/SEO/Microdata Post</a></li><li><a href="/rejecting-javascript-frameworks/">JavaScript Developers...Stop HATING Frameworks!!!</a></li>
      </ul>
    </aside>

  </main>

  <footer class="site-footer">
  <h1 class="content--hidden-text">About Kaidez/Contact Kaidez</h1>
  <div class="container">
    <div class="footer-content">
      <div class="footer-main">
        <div class="footer-colophon">
          <img src="/assets/img/footer-profile-pic.jpeg" class="footer-profile-pic"
            alt="Footer image of Kai 'kaidez' Gittens">
          <div class="footer-colophon-item">
            Kai "kaidez" Gittens is an automation and front end web developer who has contributed
            to web experiences for Blue Cross Blue Shield, JPMorgan Chase, Revlon, jetBlue, Everyday Health and the
            United Nations.
            He lives in the Raleigh-Durham area of North Carolina, USA and is an avid supporter of both
            Chelsea F.C. and Real Madrid C.F.
            <div class="social-links">
              <a href="https://linkedin.com/in/kaigittens" aria-label="LinkedIn" target="_blank"
                rel="noopener">LinkedIn</a>
              <a href="https://www.instagram.com/kaidez/" aria-label="Instagram" target="_blank"
                rel="noopener">Instagram</a>
              <a href="https://github.com/kaidez" aria-label="GitHub" target="_blank" rel="noopener">GitHub</a>
              <a href="https://bsky.app/profile/kaidezg.bsky.social" aria-label="Bluesky" target="_blank"
                rel="noopener">Bluesky</a>
              <a href="https://x.com/kaidez" aria-label="X" target="_blank" rel="noopener">X</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom"></div>
      </div>
    </div>
  </div>
</footer>

<style>
  /* Footer Styles */
  .site-footer {
    border-top: 1px solid var(--color-border);
    margin-top: var(--space-12);
  }

  .footer-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-12);
    padding: var(--space-12) 0 var(--space-8);
  }

  .footer-main h3 {
    font-size: var(--text-xl);
    margin-bottom: var(--space-3);
    color: var(--color-text);
  }

  .social-links {
    justify-content: center;
    font-weight: 900;
  }

  .social-links a {
    color: red;
  }

  .social-links a:hover {

    color: red;

    text-decoration: none;
  }

  .footer-links {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-8);
  }

  .footer-section h4 {
    font-size: var(--text-base);
    font-weight: 600;
    margin-bottom: var(--space-4);
    color: var(--color-text);
  }

  .footer-section ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .footer-section li {
    margin-bottom: var(--space-2);
  }

  .footer-section a {
    color: var(--color-text-muted);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .footer-section a:hover {
    color: var(--color-primary);
  }

  .footer-bottom {
    padding: var(--space-6) 0;
    text-align: center;
    color: var(--color-white);
    font-weight: 600;
    font-size: var(--text-sm);
    text-align: left;
  }

  .footer-bottom p {
    margin-bottom: var(--space-2);
  }

  .footer-bottom p:last-child {
    margin-bottom: 0;
  }

  .footer-bottom a {
    color: var(--color-primary);
  }

  /* Responsive Footer */
  @media (max-width: 768px) {
    .footer-content {
      grid-template-columns: 1fr;
      gap: var(--space-8);
    }

    .footer-links {
      grid-template-columns: 1fr;
      gap: var(--space-6);
    }

  }
</style>
  <script src="/assets/js/main.js" defer></script>

  <!-- Prism.js for syntax highlighting -->
  <script src="/assets/js/prism.js" defer></script>
</body>

</html>
HTML minification failed for ./_site/functional-programming-link/index.html Parse Error: < element.length; i++) {
    element[i].addEventListener(getEvent, event => {
      fn(element[i])
    })
  }
}

function goToPage(el) {
  window.location = el.dataset.url
}

export const divClick = doEventOnElement(getPostDiv, 'click', goToPage)
</code></pre>
<p>Breaking this code down...</p>
<pre><code class="language-js">
const getPostDiv =  document.querySelectorAll(".post-link-hook");
...
</code></pre>
<p><code>getPostDiv</code> refers to any page elements of with a class name of <code>post-link-hook</code>, which is all the <code>div</code>s in <code>index.html</code>. <code>getPostDiv</code> returns this group of elements as an array.</p>
<pre><code class="language-js">
...
const doEventOnElement = (element, getEvent, fn) => {
  for (let i = 0; i < element.length; i++) {
    element[i].addEventListener(getEvent, event => {
     fn(element[i])
    })
  }
}
...
</code></pre>
<p><code>doEventOnElement</code> is a function that takes our <strong><em>elements array</em></strong> and builds functionality where performing an <strong><em>event</em></strong> on each element (like <code>click</code>) runs a <strong><em>function</em></strong>.</p>
<ul class="post-content__list">
 <li class="post-content--list-item">The <code>element</code> parameter refers to the element array</li>
 <li class="post-content--list-item">The <code>getEvent</code> parameter refers to the event</li>
 <li class="post-content--list-item">The <code>fn</code> parameter refers to the function</li>
</ul>
<p><code>doEventOnElement</code> loops through the array items and places an event listener on each item. The event listener runs the event which, again, is defined by the <code>getEvent</code> parameter.</p>
<p><code>doEventOnElement</code> also allows a callback function to run our other function defined by <code>fn</code>.  And <code>fn</code> takes a parameter as well: the <code>element</code> parameter we defined in the beginning.</p>
<p>I get that this MIGHT be confusing, but walking through the <code>goToPage</code> function may clarify things:</p>
<pre><code class="language-js">
...
function goToPage(el) {
  window.location = el.dataset.url
}
...
</code></pre>
<p><code>goToPage</code> will be the function that runs when a <code>div</code> is clicked. Its job is to go to a particular web page.</p>
<p>It does this by accepting a parameter <code>el</code>, which is expected to be a page element. <code>el</code> is expected to have a <code>data-url</code> attribute that can be accessed by looking at <code>el.dataset.url</code> which, by the way, all our <code>div</code> tags have.</p>
<p>Once <code>goToPage</code> resolves all that, <code>goToPage</code> loads  <code>el.dataset.url</code> as a relative URL with the help of the <code>window.location</code> property. It will then go to that page in the browser.</p>
<pre><code class="language-js">
...
export const divClick = doEventOnElement(getPostDiv, 'click', goToPage)
</code></pre>
<p>We create a constant called <code>divClick</code>. It's exported out as dependency, which we saw in <code>js-build/index.js</code>.</p>
<p><code>divClick</code> contains an instance of <code>doEventOnElement()</code> which takes three parameters:</p>
<ol class="post-content__list">
  <li class="post-content--list-item">
   <code>getPostDiv</code> which is the constant defined earlier and represents the elements that should be affected by our code. It's an array list of all the <code>div</code> tags with the <code>post-link-hook</code> class.
  </li>
  <li class="post-content--list-item">
   <code>'click'</code> is the event that should affect the <code>div</code> tags. i.e. when we click on <code>div</code>s something should happen.
  </li>
  <li class="post-content--list-item">
    <code>goToPage</code> is the "something" that should happen. It's the function that looks for the URLs stored in each element's <code>data-url</code> attribute and loads the URL into the browser.
  </li>
</ol>
It's important to note that we're passing a function as a parameter here, which is a big deal in functional programming. Whenever you see or hear the phrase "functions are first class objects in JavaScript", passing functions as parameters is one of the many reasons why that's true.
<p>And it's <strong>VERY</strong> important to note what happens when that function actually gets passed as a parameter.  In the context of our code, that means looking at <code>doEventOnElement()</code>.</p>
<p>The last parameter passed to <code>doEventOnElement()</code> is <code>fn</code>. And in our code, that's the <code>goToPage()</code> function.</p>
<p>So when <code>fn</code> runs in the <code>for</code> loop like this...</p>
<pre><code class="language-js">
fn(element[i])
</code></pre>
<p>It looks like this when the <code>fn</code> param is set...</p>
<pre><code class="language-js">
goToPage(element[i])
</code></pre>
<p>We built <code>goToPage()</code> to expect an element: that will be defined by <code>element[i]</code>. And since we set the <code>element</code> parameter to be <code>getPostDiv</code>, the function in the <code>for</code> loop look like this...</p>
<pre><code class="language-js">
goToPage(getPostDiv[i])
</code></pre>
<p>So as the loop iterates over an element array, it will look like this when it hits the array's second item...</p>
<pre><code class="language-js">
goToPage(getPostDiv[1])
</code></pre>
<p>And from there, it will look at the <code>data-url</code> attribute in the <code>getPostDiv[1]</code> and treat it as a link.</p>
<p>This was something that took me some time to grasp while learning functional programming. It can be a bit mind-bending but understanding it is key.</p>
<p>In closing and <a href="/format-dates-functional-programming/">like I said in my last post</a>, I try to implement JavaScript functional programming wherever I can, even if it's just for practice. Code like this may be too much for the task at hand, but I'm glad I did it: practice or no practice.</p>
<p>Feel free to ask questions or make suggestions.</p>


    <aside class="related-posts" role="complementary" aria-labelledby="related-posts-heading">
      <h2 id="related-posts-heading" class="related-posts-header">Related Posts</h2>
      <ul role="list">
        <li><a href="/custom-jekyll-search/">TUTORIAL: Jekyll Search with Non-JavaScript/CSS Fallback</a></li><li><a href="/remove-files-from-github/">TUTORIAL: Remove Files From GitHub</a></li><li><a href="/click-to-tweet-link/">Click to Tweet Link Created Dynamically With JS</a></li>
      </ul>
    </aside>

  </main>

  <footer class="site-footer">
  <h1 class="content--hidden-text">About Kaidez/Contact Kaidez</h1>
  <div class="container">
    <div class="footer-content">
      <div class="footer-main">
        <div class="footer-colophon">
          <img src="/assets/img/footer-profile-pic.jpeg" class="footer-profile-pic"
            alt="Footer image of Kai 'kaidez' Gittens">
          <div class="footer-colophon-item">
            Kai "kaidez" Gittens is an automation and front end web developer who has contributed
            to web experiences for Blue Cross Blue Shield, JPMorgan Chase, Revlon, jetBlue, Everyday Health and the
            United Nations.
            He lives in the Raleigh-Durham area of North Carolina, USA and is an avid supporter of both
            Chelsea F.C. and Real Madrid C.F.
            <div class="social-links">
              <a href="https://linkedin.com/in/kaigittens" aria-label="LinkedIn" target="_blank"
                rel="noopener">LinkedIn</a>
              <a href="https://www.instagram.com/kaidez/" aria-label="Instagram" target="_blank"
                rel="noopener">Instagram</a>
              <a href="https://github.com/kaidez" aria-label="GitHub" target="_blank" rel="noopener">GitHub</a>
              <a href="https://bsky.app/profile/kaidezg.bsky.social" aria-label="Bluesky" target="_blank"
                rel="noopener">Bluesky</a>
              <a href="https://x.com/kaidez" aria-label="X" target="_blank" rel="noopener">X</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom"></div>
      </div>
    </div>
  </div>
</footer>

<style>
  /* Footer Styles */
  .site-footer {
    border-top: 1px solid var(--color-border);
    margin-top: var(--space-12);
  }

  .footer-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-12);
    padding: var(--space-12) 0 var(--space-8);
  }

  .footer-main h3 {
    font-size: var(--text-xl);
    margin-bottom: var(--space-3);
    color: var(--color-text);
  }

  .social-links {
    justify-content: center;
    font-weight: 900;
  }

  .social-links a {
    color: red;
  }

  .social-links a:hover {

    color: red;

    text-decoration: none;
  }

  .footer-links {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-8);
  }

  .footer-section h4 {
    font-size: var(--text-base);
    font-weight: 600;
    margin-bottom: var(--space-4);
    color: var(--color-text);
  }

  .footer-section ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .footer-section li {
    margin-bottom: var(--space-2);
  }

  .footer-section a {
    color: var(--color-text-muted);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .footer-section a:hover {
    color: var(--color-primary);
  }

  .footer-bottom {
    padding: var(--space-6) 0;
    text-align: center;
    color: var(--color-white);
    font-weight: 600;
    font-size: var(--text-sm);
    text-align: left;
  }

  .footer-bottom p {
    margin-bottom: var(--space-2);
  }

  .footer-bottom p:last-child {
    margin-bottom: 0;
  }

  .footer-bottom a {
    color: var(--color-primary);
  }

  /* Responsive Footer */
  @media (max-width: 768px) {
    .footer-content {
      grid-template-columns: 1fr;
      gap: var(--space-8);
    }

    .footer-links {
      grid-template-columns: 1fr;
      gap: var(--space-6);
    }

  }
</style>
  <script src="/assets/js/main.js" defer></script>

  <!-- Prism.js for syntax highlighting -->
  <script src="/assets/js/prism.js" defer></script>
</body>

</html>
HTML minification failed for ./_site/site-redesign-2025/index.html Parse Error: <img src="/assets/img/smallKaidezLogo.jpg"
      alt="Kaidez blog logo featuring bold red typography in Barbara Kruger-inspired design
      class="header-image" /><p>It's been almost eight years since I updated kaidez.com's design and underlying code. Therefore, the time has come to update it.</p>
<p>This blog redesign features a clean, minimalist design built with the <a href="https://www.11ty.dev/">Eleventy (11ty) static site generator</a>. I also used <a href="https://claude.ai/">Claude AI</a> as a pair programming partner while coding, but <a href="https://cline.bot/">Cline</a> helped out a bit.</p>
<h2>Table of Contents</h2>
<ol>
  <li>
    <a href="#design">The Design</a>
  </li>
  <li>
    <a href="#eleventy">Building this site with Eleventy (11ty)</a>
  </li>
  <li>
    <a href="#github-pages">Still Hosting On GitHub Pages</a>
  </li>
  <li>
    <a href="#netlify">Considered Hosting On Netlify</a>
  </li>
  <li>
    <a href="#pair-programming-with-claude">Pair Programming With Claude</a>
  </li>
  <li>
    <a href="#using-cline">Using Cline</a>
  </li>
  <li>
    <a href="#ai-agents-are-not-perfect">AI Coding Agents Aren't Perfect</a>
  </li>
  <li>
    <a href="#llms-txt-proposal">The llms.txt Proposal</a>
  </li>
  <li>
    <a href="#cool-404-page">Cool 404 Page</a>
  </li>
  <li>
    <a href="#conclusion">Conclusion</a>
  </li>
</ol>
<h2 id="design">The Design</h2>
<p>For the past few years, my son and I have been bonding by collecting <a href="https://supreme.com/">Supreme</a> t-shirts together. We frequently visit their website and admire its clean, crisp aesthetic.</p>
<p>So I drew inspiration from that aesthetic. As a result, this blog looks a whole lot like their site...ha!</p>
<p>I 'borrowed' their black/white/red color scheme and used the Courier font in key areas, just as they do. I also created the current &quot;Kaidez&quot; site logo to look like theirs, giving it that <a href="https://www.thebroad.org/art/barbara-kruger">Barbara Kruger</a> Helvetica/Futura font look...hey, Supreme 'borrowed' it first!</p>
<h2 id="eleventy">Building this site with Eleventy (11ty)</h2>
<p>With the exception of <a href="/site-redesign-2015/">my 2015 site rebuild</a>, I've used the <a href="https://jekyllrb.com/">Jekyll static site generator</a> to create my blog. I had no real issues with it but wanted to try a new tool.</p>
<p>I picked Eleventy, or 11ty, and I'm glad I did! Because while Jekyll runs on Ruby, 11ty runs on JavaScript, specifically <a href="https://nodejs.org/">Node</a>.</p>
<p>Anyone who knows me or reads this blog knows JavaScript's the web development environment where I'm most productive. As a result of that, configuring 11ty was ~mostly~ easy for me.</p>
<p>11ty is low-config out of the box, but it has an <code>.eleventy.js</code> file where you add your own customizations. Using that, I was able to add configs for a custom related posts section, XML sitemap building, building separate category &amp; tag pages, and minifying code before production deployments.</p>
<p>Also, when compared to Jekyll, 11ty's build process is faster. And while its templating is similar to Jekyll's, 11ty's more flexible.</p>
<h2 id="github-pages">Still Hosting On GitHub Pages</h2>
<p>kaidez.com is still hosted on <a href="https://docs.github.com/en/pages">GitHub Pages</a>. I considered switching but I decided not to.</p>
<p>The main reason for not switching is because GitHub Pages now allows for HTTPS hosting. They didn't when I first signed up and that was an issue for me, but they support it now.</p>
<img src="/assets/img/kaidez-https.jpg" class="header-image" alt="Screenshot showing HTTPS lock icon in browser address bar for kaidez.com" />
<p>At that point, the only real reason I considered switching was because at the time of this blog post, GH Pages doesn't allow for custom <code>htaccess</code> setups.  So doing things to speed up site-loading, like setting cache limits for static files and enabling gzip compression, wasn't possible.</p>
<p>From a programming stand point, it was real easy for me to account for a lack of an <code>htaccess</code> file.  I minified all my code and used <code>preload</code> and <code>defer</code> attributes in, respectively, the CSS and JS files that were inside the <code>&lt;head&gt;</code> tag.</p>
<p>Also, I didn't create a bunch of JavaScript that executes at runtime: that keeps things fast. There's some JS that dynamically loads the current year at the end of the copyright in the footer along with some other code that manages the showing/hiding of the navigation on mobile, but that's it.</p>
<h2 id="netlify">Considered Hosting On Netlify</h2>
<p>When I <em>did</em> consider switching hosts, <a href="https://www.netlify.com/">Netlify</a> was the only hosting service I seriously looked at. Along with its <code>htaccess</code> support, Netlify offers a CDN, allows for multiple deployment setups and allows for a lot of cool server configurations.</p>
<p>Netlify is also really AI-friendly and that made me curious...you may want to read <a href="https://docs.netlify.com/build/build-with-ai/overview/">how Netlify supports building sites and apps with AI</a>. I still passed on signing up with them but may sign up with them in the future.</p>
<p>And speaking of being &quot;AI-friendly&quot;...</p>
<h2 id="pair-programming-with-claude">Pair Programming With Claude</h2>
<p>Web and software development with AI is a hot-button issue at the time of this post's publish date. And I have a lot to say about it, and will in at least one future blog post.</p>
<p>For now, all I'll say is: I like coding with the help of AI, but it's not a perfect process. And I get why it's a hot-button issue.</p>
<p>I started using Claude as an AI tool, or &quot;coding agent.&quot; I looked at other tools but chose Claude because it's really popular among software engineers.</p>
<img src="/assets/img/vs-code-ai-view.jpg" class="header-image" alt="VS Code interface showing AI assistant panel and code editor" />
<p>Through a series of prompts, I used Claude to:</p>
<ul>
  <li>Install 11ty with Node/npm and configure/customize it as needed.</li>
  <li>Do a code review of my JavaScript.</li>
  <li>Generate JavaScript unit tests (Claude is just too good at this).</li>
  <li>Make sure my blog followed <a href="https://en.wikipedia.org/wiki/HTTP/2">HTTP/2 best practices</a>.</li>
  <li>Review my blog posts for clarity.</li>
  <li>Review the overall site to see if it's both SEO-friendly and if it met <a href="https://www.w3.org/WAI/standards-guidelines/wcag/">WCAG accessibility standards</a>.</li>
  <li>Fix errors I could not fix on my own after trying to for at least 15 minutes.</li>
</ul>
<h2 id="using-cline">Using Cline</h2>
<p>I also installed Cline as a plugin into VS Code. While Claude is a coding agent, Cline is a bot that allows you to use multiple coding agents.</p>
<p>I used both tools equally during coding. And because I liked the feel of the CLI, I used Claude more often.</p>
<p>However, <a href="https://x.com/addyosmani">Addy Osmani</a> made an excellent argument on <a href="https://addyo.substack.com/p/why-i-use-cline-for-ai-engineering">why Cline is the best tool for AI engineering</a>. Along with a pro/con comparison of the top AI tools, it makes a ton of awesome discussion points about developing with AI as a whole.</p>
<p>For me, the top two points are:</p>
<ol>
  <li>How Cline interacts with your dev environment as a systems tool and not just a code generator.</li>
  <li>How Cline helps keep your AI costs down when using Claude and other AI tools, specifically <a href="https://www.deepseek.com/">DeepSeek</a>.</li>
</ol>
<p>I discovered this article after I was done redoing my blog, so I never implemented the Cline things Osmani was talking about. But I probably will sooner instead of later, especially the second one as I'm paying for a Claude subscription.</p>
<h2 id="ai-agents-are-not-perfect">AI Coding Agents Aren't Perfect</h2>
<p>Despite its current hype, AI is not perfect. It made mistakes as I was coding.</p>
<p>The <em>biggest</em> mistake was with my 11ty installation.  Most agree that AI-powered coding, or &quot;agentic coding,&quot; is good for scaffolding apps, so I assumed that Claude could do this error-free.</p>
<p>About 10 days into development, I discovered that Claude installed the previous version of 11ty and not the new one.  And the update caused some templating errors.</p>
<p>Also, Claude wasn't all-knowing to the point that it returned the right answers. I went back-and-forth between Claude and Google to find the right answers about SEO optimization.</p>
<p>Claude sometimes provided incorrect answers that I later discovered were wrong when checking Google's official documentation. I found this out in time before publishing my updated blog, but it happened.</p>
<p>To be fair: Claude fixed errors like this when I told it to. But if you're new to agentic coding, please note that these agents, like Claude, have flaws.</p>
<h2 id="llms-txt-proposal">The llms.txt Proposal</h2>
<p>Claude, DeepSeek and other AI tools are Large Language Models, or &quot;LLMs&quot;. LLMs take the inputs they're given, then use their training data to generate responses.</p>
<p><code>llms.txt</code> files are small text files that help LLMs better understand the site they're currently crawling. Based on that understanding, LLMs may return your site's content in their responses.</p>
<p>This is easy to set up so you should do it as well as <a href="https://llmstxt.org/"> read the <code>llms.txt</code> proposal</a>. And you can <a href="/llms.txt">review my <code>llms.txt</code> file</a> for ideas.</p>
<p>But take note that I just used the word &quot;proposal.&quot; And that's important because:</p>
<p><strong>None of the main LLMs currently support <code>llms.txt</code> in their crawling technology. This includes Claude, OpenAI and Google Gemini. (<a href="https://yoast.com/what-ai-gets-wrong-about-your-site-llms-txt/">source</a>)</strong></p>
<p>LLMs <strong>do</strong> use the file for internal use. But their crawlers don't use it when searching for answers to give to users.</p>
<p>Technology like this will (most likely) develop into some sort of standard. So prepare your site for the future and add an <code>llms.txt</code> file to your site.</p>
<h2 id="cool-404-page">Cool 404 Page</h2>
<p>Lastly, I added a <a href="/404.html">cool 404 page</a>. No big deal here...I've just always wanted to create a page using the &quot;Moved To Atlanta&quot; programmer's joke. :-)</p>
<h2 id="conclusion">Conclusion</h2>
<p>I went into a deep deep DEEP dive into generative and agentic AI with this redesign.  I wanted to do more before publishing this post.</p>
<p>I have so many thoughts about this, but far too much for a single blog post.  I just wanted to get this one done to document my thoughts and processes.</p>
<p>I have a lot to say about AI and a few other topics, but that's for future posts. And I promise that these posts are coming.</p>


    <aside class="related-posts" role="complementary" aria-labelledby="related-posts-heading">
      <h2 id="related-posts-heading" class="related-posts-header">Related Posts</h2>
      <ul role="list">
        <li><a href="/site-redesign-2013/">kaidez 2013 Site Redesign</a></li><li><a href="/almay-project-using-html5-net-jquery/">New Almay Project I Worked On</a></li><li><a href="/javascript-state/">The State of JavaScript</a></li>
      </ul>
    </aside>

  </main>

  <footer class="site-footer">
  <h1 class="content--hidden-text">About Kaidez/Contact Kaidez</h1>
  <div class="container">
    <div class="footer-content">
      <div class="footer-main">
        <div class="footer-colophon">
          <img src="/assets/img/footer-profile-pic.jpeg" class="footer-profile-pic"
            alt="Footer image of Kai 'kaidez' Gittens">
          <div class="footer-colophon-item">
            Kai "kaidez" Gittens is an automation and front end web developer who has contributed
            to web experiences for Blue Cross Blue Shield, JPMorgan Chase, Revlon, jetBlue, Everyday Health and the
            United Nations.
            He lives in the Raleigh-Durham area of North Carolina, USA and is an avid supporter of both
            Chelsea F.C. and Real Madrid C.F.
            <div class="social-links">
              <a href="https://linkedin.com/in/kaigittens" aria-label="LinkedIn" target="_blank"
                rel="noopener">LinkedIn</a>
              <a href="https://www.instagram.com/kaidez/" aria-label="Instagram" target="_blank"
                rel="noopener">Instagram</a>
              <a href="https://github.com/kaidez" aria-label="GitHub" target="_blank" rel="noopener">GitHub</a>
              <a href="https://bsky.app/profile/kaidezg.bsky.social" aria-label="Bluesky" target="_blank"
                rel="noopener">Bluesky</a>
              <a href="https://x.com/kaidez" aria-label="X" target="_blank" rel="noopener">X</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom"></div>
      </div>
    </div>
  </div>
</footer>

<style>
  /* Footer Styles */
  .site-footer {
    border-top: 1px solid var(--color-border);
    margin-top: var(--space-12);
  }

  .footer-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-12);
    padding: var(--space-12) 0 var(--space-8);
  }

  .footer-main h3 {
    font-size: var(--text-xl);
    margin-bottom: var(--space-3);
    color: var(--color-text);
  }

  .social-links {
    justify-content: center;
    font-weight: 900;
  }

  .social-links a {
    color: red;
  }

  .social-links a:hover {

    color: red;

    text-decoration: none;
  }

  .footer-links {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-8);
  }

  .footer-section h4 {
    font-size: var(--text-base);
    font-weight: 600;
    margin-bottom: var(--space-4);
    color: var(--color-text);
  }

  .footer-section ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .footer-section li {
    margin-bottom: var(--space-2);
  }

  .footer-section a {
    color: var(--color-text-muted);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .footer-section a:hover {
    color: var(--color-primary);
  }

  .footer-bottom {
    padding: var(--space-6) 0;
    text-align: center;
    color: var(--color-white);
    font-weight: 600;
    font-size: var(--text-sm);
    text-align: left;
  }

  .footer-bottom p {
    margin-bottom: var(--space-2);
  }

  .footer-bottom p:last-child {
    margin-bottom: 0;
  }

  .footer-bottom a {
    color: var(--color-primary);
  }

  /* Responsive Footer */
  @media (max-width: 768px) {
    .footer-content {
      grid-template-columns: 1fr;
      gap: var(--space-8);
    }

    .footer-links {
      grid-template-columns: 1fr;
      gap: var(--space-6);
    }

  }
</style>
  <script src="/assets/js/main.js" defer></script>

  <!-- Prism.js for syntax highlighting -->
  <script src="/assets/js/prism.js" defer></script>
</body>

</html>
[11ty] Writing ./_site/welcome-back/index.html from ./src/posts/2010-11-08-welcome-back.md (njk)
[11ty] Writing ./_site/create-html5-page/index.html from ./src/posts/2010-11-10-create-html5-page.md (njk)
[11ty] Writing ./_site/lynda-dot-com-review/index.html from ./src/posts/2010-11-12-lynda-dot-com-review.md (njk)
[11ty] Writing ./_site/books-dotcom-rush/index.html from ./src/posts/2010-11-15-books-dotcom-rush.md (njk)
[11ty] Writing ./_site/html5-resources-nov-17-2010/index.html from ./src/posts/2010-11-17-html5-resources-nov-17-2010.md (njk)
[11ty] Writing ./_site/history-of-flash/index.html from ./src/posts/2010-11-19-history-of-flash.md (njk)
[11ty] Writing ./_site/kaidez-html5-apps/index.html from ./src/posts/2010-11-22-kaidez-html5-apps.md (njk)
[11ty] Writing ./_site/learning-microsoft-dot-net-c-sharp/index.html from ./src/posts/2010-11-24-learning-microsoft-dot-net-c-sharp.md (njk)
[11ty] Writing ./_site/10-wordpress-tips-12-01-10/index.html from ./src/posts/2010-12-01-10-wordpress-tips-12-01-10.md (njk)
[11ty] Writing ./_site/cnn-calls-track-option-google-killer/index.html from ./src/posts/2010-12-03-cnn-calls-track-option-google-killer.md (njk)
[11ty] Writing ./_site/html5-gallery-coolsite/index.html from ./src/posts/2010-12-06-html5-gallery-coolsite.md (njk)
[11ty] Writing ./_site/reasons-design-websites-internet-explorer-6/index.html from ./src/posts/2010-12-13-reasons-design-websites-internet-explorer-6.md (njk)
[11ty] Writing ./_site/review-pro-html5-programming/index.html from ./src/posts/2010-12-23-review-pro-html5-programming.md (njk)
[11ty] Writing ./_site/jquery-tshirt-geek-gift/index.html from ./src/posts/2010-12-30-jquery-tshirt-geek-gift.md (njk)
[11ty] Writing ./_site/ajax-jquery-html5-work-together/index.html from ./src/posts/2011-01-05-ajax-jquery-html5-work-together.md (njk)
[11ty] Writing ./_site/almay-project-using-html5-net-jquery/index.html from ./src/posts/2011-01-07-almay-project-using-html5-net-jquery.md (njk)
[11ty] Writing ./_site/tutorial-simple-jquery-fade-in-fade-out/index.html from ./src/posts/2011-01-10-tutorial-simple-jquery-fade-in-fade-out.md (njk)
[11ty] Writing ./_site/tutorial-simple-effective-jquery-image-rollover/index.html from ./src/posts/2011-01-12-tutorial-simple-effective-jquery-image-rollover.md (njk)
[11ty] Writing ./_site/kai-gittens-article-inspired-magazine/index.html from ./src/posts/2011-01-14-kai-gittens-article-inspired-magazine.md (njk)
[11ty] Writing ./_site/two-javascript-tasks-jquery-does-not-replace/index.html from ./src/posts/2011-01-17-two-javascript-tasks-jquery-does-not-replace.md (njk)
[11ty] Writing ./_site/html5-video-tips-january-2011/index.html from ./src/posts/2011-01-19-html5-video-tips-january-2011.md (njk)
[11ty] Writing ./_site/html5-project-update-january-21-2011/index.html from ./src/posts/2011-01-21-html5-project-update-january-21-2011.md (njk)
[11ty] Writing ./_site/video-lecture-wordpress-usability-analytics/index.html from ./src/posts/2011-01-24-video-lecture-wordpress-usability-analytics.md (njk)
[11ty] Writing ./_site/study-schedule-1-26-2011/index.html from ./src/posts/2011-01-26-study-schedule-1-26-2011.md (njk)
[11ty] Writing ./_site/html5-seo-microdata/index.html from ./src/posts/2011-01-28-html5-seo-microdata.md (njk)
[11ty] Writing ./_site/updates-coolsites-jquery-html5-resources/index.html from ./src/posts/2011-01-31-updates-coolsites-jquery-html5-resources.md (njk)
[11ty] Writing ./_site/wordpress-webmatrix/index.html from ./src/posts/2011-02-02-wordpress-webmatrix.md (njk)
[11ty] Writing ./_site/html5-project-update-completed-wireframes/index.html from ./src/posts/2011-02-04-html5-project-update-completed-wireframes.md (njk)
[11ty] Writing ./_site/html5-project-series-1-homepage-wireframe/index.html from ./src/posts/2011-02-07-html5-project-series-1-homepage-wireframe.md (njk)
[11ty] Writing ./_site/html5-project-series-2-work-subcategory-playlist-wireframes/index.html from ./src/posts/2011-02-09-html5-project-series-2-work-subcategory-playlist-wireframes.md (njk)
[11ty] Writing ./_site/html5-project-series-3-about-contact-wireframes/index.html from ./src/posts/2011-02-11-html5-project-series-3-about-contact-wireframes.md (njk)
[11ty] Writing ./_site/nyc-social-media-week-event-recap-social-listening/index.html from ./src/posts/2011-02-14-nyc-social-media-week-event-recap-social-listening.md (njk)
[11ty] Writing ./_site/nyc-social-media-week-event-recap-cross-mobile-promotion/index.html from ./src/posts/2011-02-16-nyc-social-media-week-event-recap-cross-mobile-promotion.md (njk)
[11ty] Writing ./_site/social-media-week-follow-up/index.html from ./src/posts/2011-02-18-social-media-week-follow-up.md (njk)
[11ty] Writing ./_site/update-html5seomicrodata-post/index.html from ./src/posts/2011-02-21-update-html5seomicrodata-post.md (njk)
[11ty] Writing ./_site/html5-article-roundup/index.html from ./src/posts/2011-02-23-html5-article-roundup.md (njk)
[11ty] Writing ./_site/coolsite-html5-readiness/index.html from ./src/posts/2011-02-25-coolsite-html5-readiness.md (njk)
[11ty] Writing ./_site/html5-boilerplate-video/index.html from ./src/posts/2011-02-28-html5-boilerplate-video.md (njk)
[11ty] Writing ./_site/mix11/index.html from ./src/posts/2011-03-02-mix11.md (njk)
[11ty] Writing ./_site/yoast-awesome-wordpress-seo-speech/index.html from ./src/posts/2011-03-04-yoast-awesome-wordpress-seo-speech.md (njk)
[11ty] Writing ./_site/html5-project-boilerplate-theme-wordpress/index.html from ./src/posts/2011-03-07-html5-project-boilerplate-theme-wordpress.md (njk)
[11ty] Writing ./_site/10-tips-high-school-students-web-designers-web-developers/index.html from ./src/posts/2011-03-09-10-tips-high-school-students-web-designers-web-developers.md (njk)
[11ty] Writing ./_site/easy-to-read-html5-spec/index.html from ./src/posts/2011-03-11-easy-to-read-html5-spec.md (njk)
[11ty] Writing ./_site/review-jquery-visual-quickstart-guide/index.html from ./src/posts/2011-03-14-review-jquery-visual-quickstart-guide.md (njk)
[11ty] Writing ./_site/html5-project-update-responsive-web-design/index.html from ./src/posts/2011-03-16-html5-project-update-responsive-web-design.md (njk)
[11ty] Writing ./_site/css3-pie-link-tutorial/index.html from ./src/posts/2011-03-21-css3-pie-link-tutorial.md (njk)
[11ty] Writing ./_site/html5-boilerplate-version-1/index.html from ./src/posts/2011-03-24-html5-boilerplate-version-1.md (njk)
[11ty] Writing ./_site/new-york-times-article-html5-html5-site/index.html from ./src/posts/2011-04-06-new-york-times-article-html5-html5-site.md (njk)
[11ty] Writing ./_site/at-mix11/index.html from ./src/posts/2011-04-08-at-mix11.md (njk)
[11ty] Writing ./_site/50th-article-blog-review/index.html from ./src/posts/2011-04-11-50th-article-blog-review.md (njk)
[11ty] Writing ./_site/mitchum-html5-site/index.html from ./src/posts/2011-05-18-mitchum-html5-site.md (njk)
[11ty] Writing ./_site/almay-facebook-page/index.html from ./src/posts/2011-06-03-almay-facebook-page.md (njk)
[11ty] Writing ./_site/mobile-web-development-best-practices-starting-tips/index.html from ./src/posts/2011-06-08-mobile-web-development-best-practices-starting-tips.md (njk)
[11ty] Writing ./_site/2-bad-facebook-app-things/index.html from ./src/posts/2011-06-10-2-bad-facebook-app-things.md (njk)
[11ty] Writing ./_site/mobile-web-development-best-practice-resources/index.html from ./src/posts/2011-06-16-mobile-web-development-best-practice-resources.md (njk)
[11ty] Writing ./_site/remembering-steve-jobs/index.html from ./src/posts/2011-10-06-remembering-steve-jobs.md (njk)
[11ty] Writing ./_site/html5-games-development-book/index.html from ./src/posts/2011-10-07-html5-games-development-book.md (njk)
[11ty] Writing ./_site/javascript-for-loop-creates-jquery-fade/index.html from ./src/posts/2012-03-05-javascript-for-loop-creates-jquery-fade.md (njk)
[11ty] Writing ./_site/simple-html5-explanation/index.html from ./src/posts/2012-03-09-simple-html5-explanation.md (njk)
[11ty] Writing ./_site/javascript-closures-tutorial/index.html from ./src/posts/2012-03-27-javascript-closures-tutorial.md (njk)
[11ty] Writing ./_site/useful-javascript-books/index.html from ./src/posts/2012-03-30-useful-javascript-books.md (njk)
[11ty] Writing ./_site/learn-javascript-before-jquery/index.html from ./src/posts/2012-05-15-learn-javascript-before-jquery.md (njk)
[11ty] Writing ./_site/fluent-2012/index.html from ./src/posts/2012-05-25-fluent-2012.md (njk)
[11ty] Writing ./_site/javascript-off-dom/index.html from ./src/posts/2012-09-04-javascript-off-dom.md (njk)
[11ty] Writing ./_site/eloquent-javascript-review/index.html from ./src/posts/2012-09-10-eloquent-javascript-review.md (njk)
[11ty] Writing ./_site/remove-files-from-github/index.html from ./src/posts/2012-09-12-remove-files-from-github.md (njk)
[11ty] Writing ./_site/media-queries-important/index.html from ./src/posts/2012-09-14-media-queries-important.md (njk)
[11ty] Writing ./_site/site-update/index.html from ./src/posts/2013-09-18-site-update.md (njk)
[11ty] Writing ./_site/site-redesign-2013/index.html from ./src/posts/2013-10-11-site-update-walk-through-2013.md (njk)
[11ty] Writing ./_site/github-tutorial-update/index.html from ./src/posts/2013-10-17-github-tutorial-update.md (njk)
[11ty] Writing ./_site/requirejs-wordpress/index.html from ./src/posts/2013-11-11-wordpress-require.md (njk)
[11ty] Writing ./_site/custom-jekyll-search/index.html from ./src/posts/2013-11-21-jekyll-search-post.md (njk)
[11ty] Writing ./_site/downloaded-movie-review/index.html from ./src/posts/2013-12-06-downloaded-movie-review.md (njk)
[11ty] Writing ./_site/web-components-demo/index.html from ./src/posts/2014-08-13-web-components-demo.md (njk)
[11ty] Writing ./_site/revlon-pro-brands/index.html from ./src/posts/2014-09-12-revlon-pro-brands.md (njk)
[11ty] Writing ./_site/lynda-kaidez/index.html from ./src/posts/2014-09-17-lynda-kaidez.md (njk)
[11ty] Writing ./_site/load-data-attributes-mouseclicks/index.html from ./src/posts/2014-12-01-load-data-attribute-click.md (njk)
[11ty] Writing ./_site/effective-javascript-review/index.html from ./src/posts/2014-12-29-effective-javascript-review.md (njk)
[11ty] Writing ./_site/filter-content-jquery/index.html from ./src/posts/2015-01-02-filter-with-jquery.md (njk)
[11ty] Writing ./_site/update-ajax-tutorial/index.html from ./src/posts/2015-02-18-update-ajax-tutorial.md (njk)
[11ty] Writing ./_site/kdz-build-tool/index.html from ./src/posts/2015-03-13-kdz-build-tool.md (njk)
[11ty] Writing ./_site/parlor-redesign/index.html from ./src/posts/2015-03-25-parlor-redesign.md (njk)
[11ty] Writing ./_site/css-build-demo/index.html from ./src/posts/2015-04-01-css-build-demo.md (njk)
[11ty] Writing ./_site/revlon/index.html from ./src/posts/2015-05-07-goodbye-revlon.md (njk)
[11ty] Writing ./_site/write-code-every-f-king-day/index.html from ./src/posts/2015-06-15-write-code-every-f-king-day.md (njk)
[11ty] Writing ./_site/click-to-tweet-link/index.html from ./src/posts/2015-07-30-click-to-tweet-link.md (njk)
[11ty] Writing ./_site/site-redesign-2015/index.html from ./src/posts/2015-11-20-site-redesign-2015.md (njk)
[11ty] Writing ./_site/babel-setup/index.html from ./src/posts/2016-01-26-babel-setup.md (njk)
[11ty] Writing ./_site/npm-run-screencast/index.html from ./src/posts/2016-01-29-npm-run-screencast.md (njk)
[11ty] Writing ./_site/typescript-duck-simulator/index.html from ./src/posts/2016-03-31-typescript-duck-simulator.md (njk)
[11ty] Writing ./_site/use-jquery/index.html from ./src/posts/2016-05-12-use-jquery.md (njk)
[11ty] Writing ./_site/high-school-student-web-tips-2016/index.html from ./src/posts/2016-07-12-high-school-student-web-tips-2016.md (njk)
[11ty] Writing ./_site/update-tweet-tutorial/index.html from ./src/posts/2016-07-18-click-to-tweet-update-tutorial.md (njk)
[11ty] Writing ./_site/front-end-web-developer-job-search/index.html from ./src/posts/2017-03-08-web-developer-job.md (njk)
[11ty] Writing ./_site/learn-javascript-unit-testing/index.html from ./src/posts/2017-03-20-learn-javascript-unit-testing.md (njk)
[11ty] Writing ./_site/format-dates-functional-programming/index.html from ./src/posts/2017-08-04-format-dates-functional-programming.md (njk)
[11ty] Writing ./_site/functional-programming-link/index.html from ./src/posts/2017-08-19-functional-programming-link.md (njk)
[11ty] Writing ./_site/javascript-state/index.html from ./src/posts/2017-11-06-javascript-state.md (njk)
[11ty] Writing ./_site/site-redesign-2017/index.html from ./src/posts/2017-11-20-site-redesign-2017.md (njk)
[11ty] Writing ./_site/temperatures-functional-programming/index.html from ./src/posts/2017-12-21-temperatures-functional-programming.md (njk)
[11ty] Writing ./_site/101th-post/index.html from ./src/posts/2018-01-01-101st-post.md (njk)
[11ty] Writing ./_site/temperature-average-filter-array/index.html from ./src/posts/2018-01-05-temperature-average-filter-array.md (njk)
[11ty] Writing ./_site/rejecting-javascript-frameworks/index.html from ./src/posts/2018-11-13-rejecting-javascript-frameworks.md (njk)
[11ty] Writing ./_site/front-end-web-developer-job-2022/index.html from ./src/posts/2022-03-08-web-developer-job-2022.md (njk)
[11ty] Writing ./_site/search-autocomplete/index.html from ./src/posts/2022-09-14-search-autocomplete.md (njk)
[11ty] Writing ./_site/entry-level-developer-jobs-ai-changes/index.html from ./src/posts/2025-09-08-entry-level-tech-jobs-ai-impact.md (njk)
[11ty] Writing ./_site/site-redesign-2025/index.html from ./src/posts/2025-09-22-site-redesign-2025.md (njk)
[11ty] Writing ./_site/napster-to-now-music-industry-ai-web-developer-survival/index.html from ./src/posts/2026-03-05-napster-to-now-music-industry-ai-web-developer-survival.md (njk)
[11ty] Writing ./_site/building-ai-tools-claude-api/index.html from ./src/posts/2026-03-26-build-ai-tools-with-claude-api.md (njk)
[11ty] Writing ./_site/404.html from ./src/404.njk
[11ty] Writing ./_site/index.html from ./src/index.njk
[11ty] Writing ./_site/tags/ai/index.html from ./src/secondary-tag.njk
[11ty] Writing ./_site/tags/index.html from ./src/secondary-tags.njk
[11ty] Writing ./_site/tags/coding-best-practices/index.html from ./src/tag.njk
[11ty] Writing ./_site/coding-best-practices/index.html from ./src/coding-best-practices.njk
[11ty] Writing ./_site/personal/index.html from ./src/personal.njk
[11ty] Writing ./_site/reviews/index.html from ./src/reviews.njk
[11ty] Writing ./_site/tutorials/index.html from ./src/tutorials.njk
[11ty] Writing ./_site/ajax-tutorial/index.html from ./src/assets/ajax-tutorial/index.md (njk)
[11ty] Writing ./_site/1/index.html from ./src/index.njk
[11ty] Writing ./_site/tags/babel/index.html from ./src/secondary-tag.njk
[11ty] Writing ./_site/tags/personal/index.html from ./src/tag.njk
[11ty] Writing ./_site/2/index.html from ./src/index.njk
[11ty] Writing ./_site/tags/books/index.html from ./src/secondary-tag.njk
[11ty] Writing ./_site/tags/reviews/index.html from ./src/tag.njk
[11ty] Writing ./_site/3/index.html from ./src/index.njk
[11ty] Writing ./_site/tags/build tools/index.html from ./src/secondary-tag.njk
[11ty] Writing ./_site/tags/tutorials/index.html from ./src/tag.njk
[11ty] Writing ./_site/4/index.html from ./src/index.njk
[11ty] Writing ./_site/tags/claude/index.html from ./src/secondary-tag.njk
[11ty] Writing ./_site/5/index.html from ./src/index.njk
[11ty] Writing ./_site/tags/conferences/index.html from ./src/secondary-tag.njk
[11ty] Writing ./_site/6/index.html from ./src/index.njk
[11ty] Writing ./_site/tags/css/index.html from ./src/secondary-tag.njk
[11ty] Writing ./_site/7/index.html from ./src/index.njk
[11ty] Writing ./_site/tags/design/index.html from ./src/secondary-tag.njk
[11ty] Writing ./_site/8/index.html from ./src/index.njk
[11ty] Writing ./_site/tags/eleventy/index.html from ./src/secondary-tag.njk
[11ty] Writing ./_site/9/index.html from ./src/index.njk
[11ty] Writing ./_site/tags/flash/index.html from ./src/secondary-tag.njk
[11ty] Writing ./_site/10/index.html from ./src/index.njk
[11ty] Writing ./_site/tags/git/index.html from ./src/secondary-tag.njk
[11ty] Writing ./_site/tags/github/index.html from ./src/secondary-tag.njk
[11ty] Writing ./_site/tags/html5/index.html from ./src/secondary-tag.njk
[11ty] Writing ./_site/tags/internet privacy/index.html from ./src/secondary-tag.njk
[11ty] Writing ./_site/tags/javascript/index.html from ./src/secondary-tag.njk
[11ty] Writing ./_site/tags/jekyll/index.html from ./src/secondary-tag.njk
[11ty] Writing ./_site/tags/jquery/index.html from ./src/secondary-tag.njk
[11ty] Writing ./_site/tags/learn web development/index.html from ./src/secondary-tag.njk
[11ty] Writing ./_site/tags/learning/index.html from ./src/secondary-tag.njk
[11ty] Writing ./_site/tags/legacy/index.html from ./src/secondary-tag.njk
[11ty] Writing ./_site/tags/media queries/index.html from ./src/secondary-tag.njk
[11ty] Writing ./_site/tags/mobile web development/index.html from ./src/secondary-tag.njk
[11ty] Writing ./_site/tags/my work/index.html from ./src/secondary-tag.njk
[11ty] Writing ./_site/tags/node/index.html from ./src/secondary-tag.njk
[11ty] Writing ./_site/tags/npm/index.html from ./src/secondary-tag.njk
[11ty] Writing ./_site/tags/rant/index.html from ./src/secondary-tag.njk
[11ty] Writing ./_site/tags/react/redux/index.html from ./src/secondary-tag.njk
[11ty] Writing ./_site/tags/seo/index.html from ./src/secondary-tag.njk
[11ty] Writing ./_site/tags/twitter/x/index.html from ./src/secondary-tag.njk
[11ty] Writing ./_site/tags/typescript/index.html from ./src/secondary-tag.njk
[11ty] Writing ./_site/tags/unit testing/index.html from ./src/secondary-tag.njk
[11ty] Writing ./_site/tags/web components/index.html from ./src/secondary-tag.njk
[11ty] Writing ./_site/tags/web developer job/index.html from ./src/secondary-tag.njk
[11ty] Writing ./_site/tags/wordpress/index.html from ./src/secondary-tag.njk
[11ty] Benchmark    288ms  36%   222× (Configuration) "htmlmin" Transform
[11ty] Copied 462 Wrote 222 files in 0.81 seconds (v3.1.5)

> kaidez.com@4.0.0 purge-css
> purgecss --css _site/assets/css/style.css --content '_site/**/*.html' --output _site/assets/css/ --safelist 'fas fab far fa-facebook fa-twitter fa-linkedin fa-github fa-envelope fa-bars fa-times skip-link sr-only visually-hidden container' && cleancss -o _site/assets/css/style.css _site/assets/css/style.css


> kaidez.com@4.0.0 minify-js
> esbuild _site/assets/js/main.js --minify --allow-overwrite --outfile=_site/assets/js/main.js


  _site/assets/js/main.js  732b 

⚡ Done in 1ms
```
