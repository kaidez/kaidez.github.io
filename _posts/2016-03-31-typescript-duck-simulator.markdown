---
layout: post
comments: true
title:  "The “Head First” Duck Simulator In Typescript
"
date:   2016-03-31 22:07:59 -0400
categories: coding-best-practices
permalink: /typescript-duck-simulator/
excerpt: TypeScript recreates the Duck Simulator/Strategy pattern described in the &quot;Head First Design Patterns&quot; book. With lots of resource links.
og-image: duck-simulator-image.jpg
---
<p>TypeScript is a superset language of JavaScript. It gives JavaScript tools for building and organizing large scale web applications&#8230;tools that already exist in languages like C# and Java.</p><p>TypeScript makes it easier to apply classic software design patterns to JavaScript, so I looked at one of those patterns, the strategy pattern, and did just that. The classic <em>Head First Design Patterns</em> book provided me with a project where I could do this.</p><h2>Table of Contents</h2><ol><li><a href="#assumptions-notes">Assumptions &amp; Notes</a></li><li><a href="#what-is-TypeScript">What Is TypeScript?</a></li><li><a href="#why-use-TypeScript">Why Should You Use TypeScript?</a></li><li><a href="#design-patterns">What Are &#8220;Design Patterns&#8221;?</a></li><li><a href="#duck-simulator">The Duck Simulator Problem</a></li><li><a href="#strategy-pattern-duck-simulator">Applying The Strategy Pattern To The Duck Simulator</a></li><li><a href="#look-at-code">Start Looking At The Code</a></li><li><a href="#interfaces">The Interfaces</a></li><li><a href="#core-duck-class">The Core <code>Duck</code> Class</a></li><li><a href="#subclasses">The Subclasses</a></li><li><a href="#constructor-functions">The Constructor Functions</a></li><li><a href="#other-resources">Other Resources</a></li><li><a href="#conclusion">Conclusion</a></li></ol><p><a name="assumptions-notes"></a></p><h2>Assumptions &amp; Notes</h2><p>Some assumptions&#8230;</p><ul><li class="post-list-item">I'm assuming you have a little-better-than-basic understanding of JavaScript&#8230;variables, objects, functions and arrays shouldn't confuse you. I'll mention prototypes but won't cover them in depth. If you don't fully understand those, <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Details_of_the_Object_Model">MDN's <em>Details of the object model</em></a> does a great job of explaining them. There is some <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1201380">debate about the accuracy of that post</a>, but it's accurate enough for understanding the context of what I did here.</li><li class="post-list-item">I'm assuming you either have <a href="https://nodejs.org/">Node</a> installed or know how to install it. I'm also assuming you can run its related commands from a terminal.</li></ul><p>Some notes&#8230;</p><ul><li class="post-list-item">I have to point to <a href="https://github.com/torokmark/design_patterns_in_TypeScript">M&aacute;rk T&ouml;r&ouml;k's excellent TypeScript design patterns repo</a> as an excellent resource for helping me do all this. Honestly? If all you want to know is how to apply TypeScript to traditional software design patterns, you may just want to go to that repo.</li><li class="post-list-item">I'm new to TypeScript at the time of the post and, past the basics, only researched the parts needed to complete this project. <a href="http://www.TypeScriptlang.org/docs/tutorial.html">The &#8220;Handbook&#8221; listed in the TypeScript documentation</a> is a more comprehensive learning resource.</li></ul><p><a name="what-is-TypeScript"></a></p><h2>What Is TypeScript?</h2><p><a href="http://www.TypeScriptlang.org/">TypeScript</a> is a language created by Microsoft that takes tools already in languages like C# and Java and brings them into JavaScript. These things include strong-typing, interface-powered classes, access modifiers, generics and more direct access to a function's <code>constructor</code> property.</p><p><em>(Note: for the rest of this post, I'll be referring to TypeScript as &#8220;TS&#8221; quite often.)</em></p><p>Using these things is optional, keeping JavaScript's flexible nature intact. You can also use ES6 in your TS code and compile it down to ES5 or ES3 with tools like <a href="http://gruntjs.com/">Grunt</a> and <a href="http://gulpjs.com/">Gulp</a>, or at the command-line level&#8230;like I'll be doing in this post.</p><p><a name="why-use-TypeScript"></a></p><h2>Why Should You Use TypeScript?</h2><p>The main reason for using TypeScript is that it brings a strong level of organization to your codebase&#8230;especially if it's a <strong>BIG</strong> codebase. Classes, interfaces and the like reduce the amount of &#8220;spaghetti code&#8221; in your JavaScript, making it more manageable as well as more readable to other developers.</p><p>Another reason is if you're concerned about the changes that came to Angular with the release of AngularJS2. That language was written in TypeScript so knowing TS will make learning AngularJS2 easier.</p><p><em>(Note: not only did <a href="https://twitter.com/planetoftheweb">Ray Villalobos </a> from lynda.com write <a href="http://www.raybo.org/blog/2016/02/18/AngularJS-2_what_to_look_for_when_migrating_to_the_new_version.html">a great article on the TS/AngularJS2 connection</a>, but he also released the <a href="http://www.lynda.com/AngularJS-tutorials/What-AngularJS-2/428058/482933-4.html"><em>Learn AngularJS 2: The Basics</em></a> course on lynda.com two days before this post's publish date. I've gone through about half of it at the time of this blog post and really like it.)</em></p><p>Also, TypeScript syntax is incredibly similar to that of C# and Java. So learning TS gets you started with learning those languages as well&#8230;along with many others.</p><p>Lastly, TypeScript's syntax makes easier to implement traditional <em>design patterns</em> in JavaScript.<br/> <a name="design-patterns"></a></p><h2>What Are &#8220;Design Patterns&#8221;?</h2><p>Design patterns are coding implementations that solve a specific problem in software development. They were codified in 1994's <a href="http://www.amazon.com/gp/product/0201633612/ref=as_li_tl?ie=UTF8&amp;camp=1789&amp;creative=9325&amp;creativeASIN=0201633612&amp;linkCode=as2&amp;tag=kaidez-20&amp;linkId=VW5WXIA6XMVEH63W"><em>Design Patterns</em></a><img src="http://ir-na.amazon-adsystem.com/e/ir?t=kaidez-20&amp;l=as2&amp;o=1&amp;a=0201633612" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;"/> book, sometimes referred to as the &#8220;Gang of Four book&#8221; in reference to its having four authors.</p><p>Generally speaking, <em>Design Patterns</em> walks through each pattern by saying:</p><ol><li>this is a particular software problem.</li><li>this is the proven design pattern to use to solve that problem.</li><li>this is what the pattern's code looks like.</li><li>these are the pros and cons of using that pattern.</li></ol><p><em><a href="http://www.amazon.com/gp/product/0596007124/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&amp;camp=1789&amp;creative=9325&amp;creativeASIN=0596007124&amp;linkCode=as2&amp;tag=kaidez-20&amp;linkId=35S7Q75S353IMOJ7">Head First Design Patterns</a></em> is a book influenced by <em>Design Patterns</em> that came out ten years later. It doesn't cover all the patterns in the Gang of Four book, but it covers the most popular ones and is easier to read.</p><p><em>(Note: <a href="http://twitter.com/addyosmani">Addy Osmani</a> from Google has written <a href="https://addyosmani.com/resources/essentialjsdesignpatterns/book/">a free e-book of pure JavaScript implementations of some of these patterns</a>.)</em></p><p><em>Head First</em> starts off with a discussion of the strategy pattern and uses it to solve a problem with some duck simulator software.</p><p><a name="duck-simulator"></a></p><h2>The Duck Simulator Problem</h2><p>Here's a slimmed-down description of the problem:</p><p>There's a developer that maintains a game called &#8220;SimUDuck,&#8221; which simulates different types of ducks in a pond. The ducks already have the ability to quack, swim and display what type of ducks they are.</p><p>At the software level, all those behaviors are stored in a <code>Duck</code> class as methods, respectively named <code>quack()</code>, <code>swim()</code> and <code>display()</code>. There are also duck subclasses (like the ones for Mallard and Redhead ducks) that inherit these methods directly from <code>Duck</code>.</p><p>The developer is told to programmatically make ducks fly and does so by adding an internal <code>fly()</code> method to <code>Duck</code>. Then problems arise.</p><p>Both decoy and rubber ducks are added to the game and they fly&#8230;ducks like that don't fly!!! And it turns out that the new ducks quack differently from the other ducks.</p><p>So this is what the developer has to deal with:</p><ul><li class="post-list-item">the <code>Duck</code> class has a <code>fly()</code>, <code>quack()</code>, <code>swim()</code> and <code>display()</code> method.</li><li class="post-list-item">any subclass that inherits from <code>Duck</code> will also inherit those methods and their behaviors.</li><li class="post-list-item">some ducks cannot fly.</li><li class="post-list-item">all ducks quack, but not in the same way.</li><li class="post-list-item">all ducks can swim in one way or another and use the exact same method to let everyone know this.</li><li class="post-list-item">all ducks use the same <code>display()</code> method to give information about what kind of duck they are, but the information is different across all the ducks.</li></ul><p>The big problem, is with the <code>fly()</code> and <code>quack()</code> methods inside the <code>Duck</code> class because, as we learned from the decoy and rubber ducks, inheriting subclasses use those two methods differently. For the inheriting classes, the developer <em>could</em> give each one its own <code>fly()</code> and <code>quack()</code> methods, which would <em>override</em> the ones in <code>Duck</code>.</p><p>But that would duplicate the code throughout the codebase, violating the <a href="https://en.wikipedia.org/wiki/Don%27t_repeat_yourself">DRY principle</a>. So the developer needs to find a way to let those inheriting ducks use the <code>fly()</code> and <code>quack()</code> methods already inside the <code>Duck</code> class while remembering that each duck will fly and quack differently.</p><p>Enter the <em>strategy pattern</em>.</p><p><a name="strategy-pattern-duck-simulator"></a></p><h2>Applying The Strategy Pattern To The Duck Simulator</h2><p>Using the strategy pattern means a method's behavior is selected at runtime. For example: a subclass can inherit the <code>quack()</code> method from the core <code>Duck</code> class, but it's the subclass that decides <em>how</em> it quacks&#8230;maybe it squeaks&#8230;maybe it makes no sound at all.<strong>The subclass decides the method's behavior, not the core class.</strong></p><p>This is done by NOT placing the methods directly in a class and, instead, listing them in a separate class-like container called an <em>interface</em>. Classes can grab those methods by attaching themselves to the interface later on.</p><p>By placing the varying behavior methods in interfaces instead of classes, and then letting the classes grab those methods in a separate process, we're following one of the core design principles in object-oriented programming:</p><blockquote><p><em>&#8220;Encapsulate what varies&#8221;</em></p></blockquote><p>Conditional checking is where you see lots of varying code in JavaScript, so that's the best JS use-case for the strategy pattern. If you're only checking for two conditions then you can probably stick with an <code>if/else</code> statement or a ternary check, but if you have more than that or have a long <code>switch/case</code> statement, consider the strategy pattern.</p><p><em>(Note: Los Techies has <a href="https://lostechies.com/seanbiefeld/2014/12/28/using-the-strategy-pattern-to-reduce-complexity-in-your-javascript/">a great JavaScript strategy pattern example</a>.)</em></p><p>But with Java, <em>Head First</em> solved the SimUDuck problem by:</p><ul><li class="post-list-item">placing the flying and quacking behaviors into their own interfaces,</li><li class="post-list-item">having the <code>Duck</code> class implement the interfaces,</li><li class="post-list-item">placing the <code>swim()</code> method in <code>Duck</code> and have it work the same across all subclasses,</li><li class="post-list-item">and adding a <code>display()</code> method to <code>Duck</code> in a way that subclasses <em>had</em> to have one, but could choose its behavior.</li></ul><p><em>Head First</em> also provided a class diagram visual of what this looked like:</p> <figure style="margin-bottom: 50px;"> <img src="/head-first-strategy-uml-diagram.jpg" alt="Image of strategy pattern UML diagram from &quot;Head First Design Patterns&quot; (courtesy O'reilly Media)" width="1048" height="657" class="alignnone size-full wp-image-2421" style="width: 100%; height: auto; max-width: 768px;" srcset="/head-first-strategy-uml-diagram.jpg 1048w, http://kaidez.com/wp-content/uploads/head-first-strategy-uml-diagram-300x188.jpg 300w, http://kaidez.com/wp-content/uploads/head-first-strategy-uml-diagram-768x481.jpg 768w, http://kaidez.com/wp-content/uploads/head-first-strategy-uml-diagram-1024x642.jpg 1024w" sizes="(max-width: 1048px) 100vw, 1048px"/></p> <figcaption style="font-size: 14px; text-align: center;"><em>Image of strategy pattern UML diagram from &#8220;Head First Design Patterns&#8221; (courtesy O'Reilly Media)</em></figcaption> </figure><p>We'll recreate all this with TS.</p><p><em>(Note: the &#8220;Head First&#8221; book creates &#8220;getter&#8221; and &#8220;setter&#8221; methods to build a &#8220;rocket-powered&#8221; duck subclass&#8230;no kidding !!! While getters and setters are important in programming, I chose not to do this here because I felt I was going too much against JavaScript's flexibility. Maybe I'll add it in the future.)</em></p><p><a name="look-at-code"></a></p><h2>Start Looking At The Code</h2><p>We'll create a bunch of TypeScript <code>.ts</code> files and then use the command line to compile them down to a file called <code>main.js</code>. So we need a certain file structure:</p><pre><code class="language-markup">
├── typescript-source-files
|   └── classes
|       ├── Duck.ts
|       └── subclasses
|           ├── Decoy.ts
|           ├── Mallard.ts
|           ├── Redhead.ts
|           └── Rubber.ts
|   └── interfaces
|       ├── Fly.ts
|       └── Quack.ts
|   └── main.ts
├── index.html
└── main.js
</code></pre>

<p>Then we need to globally install TypeScript with Node/npm:</p>
<pre><code class="language-bash">
npm install -g typescript
</code></pre>
<p>Then we go to the command line, navigate to this project folder and type:</p><pre><code class="language-bash">
tsc --out main.js typescript-source-files/main.ts -w
</code></pre><p>This will watch for changes to any of the <code>.ts</code> files in the <code>typescript-source-files</code> folder as well as alert us of code errors&#8230;very helpful! If our TS code saves without errors, <code>main.ts</code> in that directory will build out a file to the root called <code>main.js</code>.</p><p>The HTML is pretty basic. We're just going to return console statements instead of change the DOM, so <code>main.js</code> will be the only file we'll work with.</p><pre><code class="language-html">
&lt;!-- index.html --&gt;

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;TypeScript Duck Simulator&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;script src="main.js"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre><p><a name="interfaces"></a></p><h2>The Interfaces</h2><p>As mentioned, <em>Head First</em> placed the flying and quacking behaviors in their own interfaces.  We'll do that, starting with the flying interface:</p><pre><code class="language-javascript">
/* Fly.ts */

module Fly {

  export interface FlyBehavior {
    fly(): void;
  }

  export class FlyWithWings implements FlyBehavior {
    public fly(): void {
      return console.log( "I'm flying!!" );
    }
  }

  export class NoFly implements FlyBehavior {
    public fly(): void {
      return console.log( "I can't fly!!" );
    }
  }
}
</code></pre><p>Breaking down the code&#8230;</p><p>We want to let other files treat <code>Fly.ts</code> file as a dependency that they can import&#8230;like ES6 <code>import</code> and Node <code>require()</code> statements do already. So we wrap everything in a TypeScript <code>module</code> object.</p><p>Then we create an interface object with the <code>interface</code> keyword and call it <code>FlyBehavior</code>. It contains a reference to a method called <code>fly()</code>.</p><p>We'll need other classes to access the interface so we put an <code>export</code> statement before it. <code>fly()</code> doesn't return a specific type like a number or a string, so we return it as a <code>void</code> type.</p><p><em>(Note: returning a type is one of those optional things in TS and doesn't have to be done here. But doing it is a best practice.)</em></p><p>It's key to understand that, while <code>fly()</code> exists at this point in our code, it isn't actually <em>doing</em>. Which is what we want.</p><p>Remember that some ducks fly and some don't, so we want to let the duck subclasses use <code>fly()</code> to run whatever specific flying behavior they have. Setting up the <code>fly()</code> method like this ensures that the subclasses can do just that.</p><p>The different behaviors are listed in the <code>FlyWithWings</code> and <code>NoFly</code> classes. Each one returns a console statement on whether the duck can or cannot fly.</p><p>Like the interface, each one uses <code>exports</code> so it's available to other classes. Each one also uses <code>implements</code> to attach itself to <code>FlyBehavior</code>.</p><p>When a class implements an interface like this, it's as if the class is signing a contract. The class is formally agreeing to use methods and properties defined in the interface.</p><p><em>(Note: if a class implements an interface in TypeScript, the class HAS to use the properties and methods listed inside it or the TS build will fail. But you can define some of those properties and methods as optional to use.)</em></p><p>The quack behavior file is set up just like the fly behavior one. Except the module name is <code>Quack</code>, the interface name is <code>QuackBehavior</code> and the behavior classes are called <code>Quack</code>, <code>Squeak</code> and <code>MuteQuack</code>.</p><pre><code class="language-javascript">
/* Quack.ts */

module Quack {

  export interface QuackBehavior {
    quack(): void;
  }

  export class Quack implements QuackBehavior {
    public quack(): void {
      return console.log( "I'm quacking!!" );
    }
  }

  export class Squeak implements QuackBehavior {
    public quack(): void {
      return console.log( "I'm squeaking!!" );
    }
  }

  export class MuteQuack implements QuackBehavior {
    public quack(): void {
      return console.log( "I don't quack!!" );
    }
  }
}
</code></pre><p>Again, all this set-up means that the subclasses we'll create later on can set up their own behaviors and not depend the core class to it. This follows another design pattern rule:</p><blockquote><p><em>&#8220;Program to an interface, not an implementation&#8221;</em></p></blockquote><p><em>(Note: when writing with any code that deals with inheritance, TypeScript usually converts to code that makes extensive use of prototypes. I'm going to push you to regularly copy and paste TS code into the left-hand side of the <a href="http://www.TypeScriptlang.org/play/index.html">TypeScript Playground</a> and see how this happens&#8230;and <em>when</em> this happens.)</em><br/> <a name="core-duck-class"></a></p><h2>The Core <code>Duck</code> Class</h2><p>The core <code>Duck</code> class looks like this:</p><pre><code class="language-javascript">
/* Duck.ts */

/// &lt;reference path="../interfaces/Fly.ts" /&gt;
/// &lt;reference path="../interfaces/Quack.ts" /&gt;

abstract class Duck {

  private flybehavior: Fly.FlyBehavior;
  private quackbehavior: Quack.QuackBehavior;

  public performFly(): void {
    this.flybehavior.fly();
  }

  public performQuack(): void {
    this.quackbehavior.quack();
  }

  public swim(): void {
    return console.log( "I can either swim or float!!!" );
  }

  abstract display(): void;

  constructor( flybehavior: Fly.FlyBehavior, quackbehavior: Quack.QuackBehavior, public name: string = "Anonymous Duck" ) {
    this.flybehavior = flybehavior;
    this.quackbehavior = quackbehavior;
  }

}

</code></pre><p>Breaking this code down&#8230;</p><p>We're giving the <code>Duck</code> class access to both interfaces by declaring them as dependencies at the top with a <code>reference path</code>. Then we're defining this class as abstract with the <code>abstract</code> keyword.</p><p>An <em>abstract class</em> is a class that can't be instantiated, meaning we will never create an instance of this class with <code>new Duck()</code>. That's fine: we're building this class so subclasses can inherit from it&#8230;they'll do the instantiating.</p><p>Next, we create <code>flybehavior</code> and <code>quackbehavior</code> variables as references to our interface behaviors.  Variables defined in a class are called <em>instance variables</em>.</p><p>Note that each variable has <code>private</code> before it, so no code outside this class can access them. Also note that each variable value is namespaced against our interface references: it's <code>Fly.FlyBehavior</code> instead of <code>FlyBehavior</code>.</p><p>And now we start to see the power our interfaces give us with the <code>performFly()</code> and <code>performQuack()</code> methods. Those methods hook into the instance variable references of our interface, which hooks into the respective <code>fly()</code> and <code>quack()</code> methods in those interfaces.</p><p>When we create a constructor functions for the various ducks, we can pick one of the interface behaviors we created &#8211; like <code>Fly</code> or <code>Squeak</code> &#8211;  and run it with <code>performFly()</code> and <code>performQuack()</code>. But <code>swim()</code> is already configured inside <code>Duck</code> to do the same thing for all the ducks.</p><p>Then there's the <code>abstract display(): void;</code> line: this is the method that displays the duck type&#8230;Rubber, Mallard, etc. By declaring it abstract, this means the subclasses <em>must</em> have this method.</p><p>Finally, we set up the class' <code>constructor</code> property, which defines the properties and structure of our duck constructor function. Constructors are ~usually~ listed at the top of the class, but I put it at the bottom as I thought it would make it easier to explain all this.</p><p><code>constructor</code> lists the parameters we need to define when creating a new instance of the class with a constructor function. These include both the flying and quacking behaviors.</p><p>The other parameter is <code>name</code>, which we're giving a value of &#8220;Anonymous.&#8221; This means that adding this parameter to a constructor function is optional&#8230;it will equal &#8220;Anonymous&#8221; if left off.</p><p><a name="subclasses"></a></p><h2>The Subclasses</h2><p>With the <code>Duck</code> class built, we can create the four subclasses&#8230;<code>Decoy</code>, <code>Mallard</code>, <code>Redhead</code> and<code>Rubber</code>:</p><pre><code class="language-javascript">
/* Decoy.ts */

/// &lt;reference path="../Duck.ts" /&gt;

class Decoy extends Duck {

  public display(): void {

    return console.log("My name is " + this.name +  ". I am a Decoy Duck!!!" );

  }

}
</code></pre><pre><code class="language-javascript">
/* Mallard.ts */

/// &lt;reference path="../Duck.ts" /&gt;

class Mallard extends Duck {

  public display(): void {

    return console.log("My name is " + this.name +  ". I am a Mallard Duck!!!" );

  }

}
</code></pre><pre><code class="language-javascript">
/* Redhead.ts */

/// &lt;reference path="../Duck.ts" /&gt;

class Redhead extends Duck {

  public display(): void {

    return console.log("My name is " + this.name +  ". I am a Redhead Duck!!!" );

  }

}
</code></pre><pre><code class="language-javascript">
/* Rubber.ts */

/// &lt;reference path="../Duck.ts" /&gt;

class Rubber extends Duck {

  public display(): void {

    return console.log("My name is " + this.name +  ". I am a Rubber Duck!!!" );

  }

}
</code></pre><p>These subclasses have a few things in common:</p><ul><li class="post-list-item">each one references the <code>Duck.ts</code> file as a dependency so it can access the <code>Duck</code> class.</li><li class="post-list-item">each one uses the <code>extends</code> keyword to inherit everything inside <code>Duck</code>.</li><li class="post-list-item">each one uses the <code>display()</code> method inside <code>Duck</code>.</li></ul><p>The only real difference is in the console message each subclass returns when <code>display()</code> runs. Along with the type of duck it is, that message also returns the name of the duck which the subclass has access to via the <code> public name</code> property in the <code>Duck</code> class' constructor.</p><p><em>(Note # 1: I suppose this could go in an interface but you can see how abstract methods work.)</em></p><p><em>(Note # 2: when using <code>extends</code> to trigger class inheritance, TypeScript does code injection at the top of your outputted <code>.js</code> file. The injected code is similar to <a href="http://stackoverflow.com/questions/11197247/javascript-equivalent-of-jquerys-extend-method">the top answer of this Stack Overflow question at the time of this post</a>, which is similar to how developers have been mimicking extends functionality for years. To see how it works, cut and paste one of these subclass code blocks into the <a href="http://www.TypeScriptlang.org/play/index.html">TS Playground</a>.)</em></p><p><a name="constructor-functions"></a></p><h2>The Constructor Functions</h2><p>Finally, we get to use all this code by creating some new constructor functions:</p><pre><code class="language-javascript">
/* Main.ts */

/// &lt;reference path="classes/subclasses/Decoy.ts" /&gt;
/// &lt;reference path="classes/subclasses/Mallard.ts" /&gt;
/// &lt;reference path="classes/subclasses/Redhead.ts" /&gt;
/// &lt;reference path="classes/subclasses/Rubber.ts" /&gt;

let joey = new Decoy( new Fly.NoFly(), new Quack.MuteQuack(), "Joey" );
joey.display();
joey.performFly();
joey.performQuack();
joey.swim();
console.log("\n\n");

// Create an instance of a "Mallard"
let tina = new Mallard( new Fly.FlyWithWings(), new Quack.Quack(), "Tina" );

tina.display();
tina.performFly();
tina.performQuack();
tina.swim();
console.log("\n\n");

// Create an instance of a "Redhead"
let noName = new Redhead( new Fly.FlyWithWings(), new Quack.MuteQuack() );

noName.display();
noName.performFly();
noName.performQuack();
noName.swim();
console.log("\n\n");

let rick = new Rubber( new Fly.NoFly(), new Quack.Squeak(), "Rick" );
rick.display();
rick.performFly();
rick.performQuack();
rick.swim();
</code></pre><p>First, we use <code>reference</code> to bring in all our subclass files as dependencies, Next, we use the ES6 <code>let</code> keyword (instead of <code>var</code>) to create one constructor function for each subclass and pass the flying and quacking behaviors as parameters.</p><p>For example: we create a new instance of <code>Decoy</code> called <code>joey</code> and we pass our two behavior parameters. We make <code>joey</code> NOT fly with <code>new Fly.NoFly()</code> and NOT quack with <code>new Quack.MuteQuack()</code>.</p><p>From there we create three other instances for the three other subclasses in the same way&#8230;either making them fly or not, or quack in a certain way or not. The only real difference is the <code>noName</code> instance of the <code>Redhead</code> subclass&#8230;we didn't pass it a name parameter so this instance will take in the default &#8220;Anonymous&#8221; name we gave it in the <code>Duck</code> class.</p><p><a name="other-resources"></a></p><h2>Other Resources</h2><p>I've listed many learning resources throughout this post. Here's a list that includes some of those and a few others:</p><ul><li class="post-list-item"><a href="http://www.typescriptlang.org/docs/tutorial.html">the TypeScript documentation</a>: especially the &#8220;Quick start&#8221; and &#8220;Handbook&#8221; pages. This is probably your first stop.</li><li class="post-list-item"><a href="https://channel9.msdn.com/posts/Anders-Hejlsberg-Introducing-TypeScript">Anders Hejlsberg: Introducing TypeScript</a>: a screencast from the guy that created Typescript&#8230;and C#. This screencast is a little over two-and-a-half years old at the time of this post so some things he talks about may be updated. But it's still informative and still worth a watch.</li><li class="post-list-item"><a href="http://Design Patterns in TypeScript/">Design Patterns in TypeScript</a>: I can't stress enough how help this GitHub repo was/is.</li><li class="post-list-item"><a href="https://www.pluralsight.com/courses/typescript-in-depth"><em>TypeScript In-depth</em> course on Pluralsight</a>: I haven't seen this course created by <a href="http://twitter.com/brice_wilson">Brice Wilson</a>, but have seen many positive things said about it so it's worth a watch.</li><li class="post-list-item"><a href="https://www.pluralsight.com/courses/typescript-in-depth"><em>Introduction to TypeScript</em> course on edX (not out yet)</a>: not out at the time of this post, but it's co-taught by Anders Hejlsberg, so it's worth a look when released.</li><li class="post-list-item"><a href="https://code.visualstudio.com/">Visual Studio Code</a>: an editor built with <a href="http://electron.atom.io/">Electron</a>, making it similar to <a href="https://www.sublimetext.com/">Sublime Text</a> and very very VERY similar to <a href="https://atom.io/">Atom</a>. It's still new and has a few bugs so you probably don't want to abandon your current editor for it, but it's got lots built-in debugging tools based around TypeScript. Using it will help you learn TypeScript faster.</li><li class="post-list-item"><a href="https://github.com/typings/typings">the Typings definitions manager</a>: TypeScript regularly uses <em>definition files</em> to describe the structure of an external JS library. Typings is a CLI tool that lets you install and search for definitions. All this can be tough to grasp in the beginning: <a href="https://typescript.codeplex.com/wikipage?title=Writing%20Definition%20%28.d.ts%29%20Files">the Definitions documentation on CodePlex</a> describes it well.</li></ul><p><a name="conclusion"></a></p><h2>Conclusion</h2><p>I'm still new to TS and there's tons of things I didn't discuss. To name a few: I didn't discuss type inference, the new <code>enum</code> type, the built-in JSX functionality, Generics or the aforementioned definition files.</p><p>Furthermore, I haven't figured out how to integrate TypeScript builds into a CommonJS build process using something like Browserify or webpack. That seems to be tough as I've seen more situations where people go the AMD route instead&#8230;this is something I'm still grasping.</p><p>But while using it doesn't fit every use-case, I'm happy that I took the time to apply TypeScript to the strategy pattern to add organization to a somewhat complex codebase. I wrapped my head around some complex subjects by doing this, so I encourage you to give the TS documentation a look, fire up an editor like VS Code and doing the same.</p><p><em(note: returning console is great for understanding concepts, but a real-world use case that builds things on a web page is better. that's coming in a ~relatively~ soon, upcoming post.)< em></p>