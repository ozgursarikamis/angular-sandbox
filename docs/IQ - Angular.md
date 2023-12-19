# Interview Questions

## What is Data binding?

Data binding is a technique to link <u>**your data**</u> to your <u>**view layer**</u>. 

It is the automatic <u>**synchronization**</u> of data <u>**between model and view components**</u>.

## What is the difference between one-way data binding and two-way data binding?

### One-way data binding
If the data is changed in the view, it will not reflect in the data source.

### Two-way data binding
If the data is changed in the view, it will reflect in the data source.

## What are SPA frameworks?
SPA is a web application that fits on a single page. It does not load a new HTML page in response to every user action. Instead, all necessary code – HTML, JavaScript, and CSS – is retrieved with a single page load.

### What are the advantages of SPA?

- **Faster rendering**: The browser doesn’t have to reload the page, it only needs to update the content that has changed.
- **Better UX**: The page doesn’t have to reload, so the user can continue interacting with the page without any interruptions.
- **Better performance**: The browser doesn’t have to reload the page, so it doesn’t have to re-execute JavaScript code.
- **Easier to debug**: You can use the browser’s developer tools to debug the application.
- **Better caching**: You can cache the entire application in the browser and use it offline.
- **Better SEO**: You can use server-side rendering to improve SEO.
- **Easier to scale**: You can use a single codebase for both the client-side and server-side.

## What are decorators in Angular?

Decorators are a design pattern or <u>**functions that define how Angular features work**</u>. They are used to make prior modifications to a class, service, or filter. Angular supports four types of decorators, they are:

- Class decorators: `@Component`, `@Directive`, `@Pipe`, `@Injectable`
- Property decorators: `@Input`, `@Output`
- Method decorators: `@HostListener`, `@HostBinding`
- Parameter decorators: `@Inject`

## What is the difference between `@Component` and `@Directive`?

`@Component` is used to decorate a class that has a template.

`@Directive` is used to decorate a class that has no template.

## What is NGCC?

NGCC stands for Angular <u>**Compatibility Compiler**</u>. 

It is a tool that converts legacy Angular packages (which is not compatible with the Angular Ivy runtime) into the new Angular format.

## What are Directives?

Directives are <u>**instructions in the DOM**</u>. Angular has three types of directives:

- **Components**: Directives with a template. `@Component`
- **Structural directives**: Change the DOM layout by adding and removing DOM elements. `*ngIf`, `*ngFor`, `*ngSwitch`.
- **Attribute directives**: Change the appearance or behavior of an element, component, or another directive. `ngStyle`, `ngClass`, `ngModel`.

## What are Pipes?

Pipes are <u>**a way to write display-value transformations**</u> that you can declare in your HTML. Angular comes with several built-in pipes such as `DatePipe`, `UpperCasePipe`, `LowerCasePipe`, `CurrencyPipe`, `DecimalPipe`, and `PercentPipe`.

### What are Pure and Impure Pipes?

**Pure pipes** are <u>**pipes that only depend on the input parameters**</u>. They don’t use any global state. They are <u>**idempotent**</u>, which means that `the output is always the same for a given input`. 

They are <u>**fast**</u> because they only run when the input parameters change.

==

**Impure pipes** are <u>**pipes that depend on global state**</u>. 

They are <u>**not idempotent**</u>, which means that `the output can change even if the input parameters are the same`.

For instance:

- `DatePipe` is a pure pipe because it always returns the same output for a given input.
- `AsyncPipe` is an impure pipe because it returns a new instance of `Observable` every time the input changes.
- `CurrencyPipe`, `PercentPipe`, `DecimalPipe` are impure pipes because it uses the global `locale` state to format the output.
- `UpperCasePipe` is a pure pipe because it always returns the same output for a given input.

## What is View Encapsulation?

View Encapsulation is a way to <u>**isolate styles in components**</u>. 

It is used to define whether the styles defined in the component can affect the whole application or vice versa.

Angular supports three types of view encapsulation:

- **Emulated**: Styles defined in the component only affect the component itself.
- **Native**: Styles defined in the component only affect the component itself. It uses the Shadow DOM to encapsulate styles.
- **None**: Styles defined in the component affect the whole application.

## Architectural Diagram of Angular

![Angular Architecture](https://github.com/sudheerj/angular-interview-questions/raw/master/images/architecture.png)

## What are components?

Components are the most basic UI building block of an Angular app. An Angular app contains a tree of Angular components.

## What are the differences between Components and Directives?

- Components have a template, Directives don’t.
- Components are typically used to create UI widgets, Directives are used to add behavior to an existing <u>**DOM element**</u>.

## What are lifecycle hooks available?

- **ngOnInit**: Called once the component is initialized.
- **ngOnChanges**: Called after a bound <u>**input property changes**</u>.
- **ngDoCheck**: Called during <u>**every change detection run**</u>.
  - **ngAfterContentInit**: Called after content (ng-content) has been projected into view.
  - **ngAfterContentChecked**: Called every time the projected content has been checked.
  - **ngAfterViewInit**: Called  <u>**after the component’s view (and child views) has been initialized</u>**.
  - **ngAfterViewChecked**: Called every time the view (and child views) have been checked.
- **ngOnDestroy**: Called once the component is **about to be** <u>destroyed</u>.

![Lifecycle Hooks](https://github.com/sudheerj/angular-interview-questions/raw/master/images/lifecycle.png)

## What is the difference between Constructor and ngOnInit?

- **Constructor** is a default method of the class that is executed when the class is instantiated and ensures proper initialization of fields in the class and its subclasses.
- **ngOnInit** is a life cycle hook called by Angular to indicate that Angular is done creating the component.

## What is metadata?

Metadata is used to decorate a class so that it can configure the expected behavior of the class. The metadata is represented by decorators.

```ts
@Component({
  selector: 'my-component',
  template: '<div>Class decorator</div>',
})

// or
@NgModule({
  imports: [],
  declarations: [],
})

// property decorators: @Input, @Output, @HostBinding, @HostListener
@HostListener('click', ['$event'])
onHostClick(event: Event) {
    // clicked, `event` available
}

@Input() title: string;
```

## What is Dependency Injection?

- An Angular class requests dependencies from **external sources** rather than creating them.
- Angular comes with its own dependency injection framework

## How is Dependency Hierarchy formed?

- Angular creates a **hierarchical dependency injector** for each component in the application.
  - **Module injector**: Creates the root injector that provides services to the entire application.
```ts
@NgModule({
    providers: [
    Logger,
    { provide: 'API_URL', useValue: 'http://dev.server.com' }
    ]
})
```
  - **Component injector**: Creates a child injector of the module injector that is responsible for an individual component.

```ts
@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    providers: [UserService]
})
```
  - **Element injector**: Creates a child injector of the component injector that is responsible for a DOM element.
```ts
@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    providers: [UserService]
})
```

- **Injector**: Creates a child injector of the element injector that is responsible for a directive.
- The **injector hierarchy** is determined by the **component tree**.

## In an Angular service, how can you read the full response?

```ts
  import { HttpClient } from '@angular/common/http';
   
  getFullResponse() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts', { observe: 'response' });
  }
```


## What is the difference between `Router` and `ActivatedRoute`?

- **ActivatedRoute** is the service that is used to **read route parameters** in the components of the application.
- **Router** is the service that is used to **navigate** between components of the application.

## What is the difference between `Router.navigate()` and `Router.navigateByUrl()`?

- **Router.navigate()** takes an array of **path segments**.
- **Router.navigateByUrl()** takes a **string** that can be a **relative path** or **absolute path**.

## What is `zone`?

- A zone is a **context** that **surrounds the execution** model of the asynchronous operations.

## What is a service worker and its role in Angular?

- A service worker is a script that runs in the web browser and manages caching for an application.


Sample usage:

  ```ts

  import { Injectable } from '@angular/core';
  import { SwUpdate } from '@angular/service-worker';

  @Injectable()
  export class CheckForUpdateService {

    constructor(updates: SwUpdate) {
      updates.available.subscribe(event => {
        updates.activateUpdate().then(() => document.location.reload());
      });
    }
  }
  ```

## What are Web Workers?

- Web Workers are a simple means for web content to run scripts in <u>**background threads**</u>.

> The Angular CLI does not support running itself in a web worker.

## What is a DI token?

- A DI token is a string that acts as a unique identifier for a dependency that is injected into a class.
- A DI token can be used to configure the injector to return different types of dependencies based on the runtime condition.

-  A common use case for DI tokens is when you want to inject a non-class dependency like a string or an interface, 
  or when you want to inject different implementations of a service based on certain conditions.

```ts
import { InjectionToken } from '@angular/core';

// Define a new DI token
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export interface AppConfig {
  appTitle: string;
  apiEndpoint: string;
}

// Provide a value for the DI token in your module
@NgModule({
  providers: [
    { provide: APP_CONFIG, useValue: { appTitle: 'My App', apiEndpoint: 'http://localhost:3000' } }
  ],
  // ...
})
export class AppModule {
  // Inject the dependency using the DI token in a component
  constructor(@Inject(APP_CONFIG) private config: AppConfig) {
    console.log(config.appTitle); // 'My App'
  }
}
```

## What is platform in Angular?

- A platform is a context for the execution of an Angular application on a page.
- It's usually a browser but can also be a **web worker** or **server-side execution environment**.
  - While running in a browser, the platform is bootstrapped by importing the `BrowserModule` or `BrowserAnimationsModule` from `@angular/platform-browser`.
  - When SSR is used, it uses `ServerModule` from `@angular/platform-server`.

## What does `Location` class do in Angular?

- The `Location` class is used to interact with the browser's **URL**.
- It is used to navigate back and forward in the browser history or to read the URL and query parameters.

## What is the purpose of `innerHTML`?

- The `innerHTML` property is used to set the HTML content of an element.
- Unfortunately this property could cause `Cross Site Scripting (XSS)` security bugs when improperly handled.

## What is `DOM Sanitization`?

- DOM Sanitization is a security feature of Angular that **sanitizes untrusted values** so that they cannot execute **Cross Site Scripting (XSS)** attacks.


## Explain Change Detection in Angular

- Change detection is a core Angular functionality that updates the application's DOM whenever there is a change in the application data.
- Angular uses `Zone.js` to track all asynchronous operations and when a change occurs, Angular triggers change detection to update the DOM.
- Angular uses `ChangeDetectorRef` to manually trigger change detection.

## Explain `ElementRef` and its usages

- `ElementRef` is a wrapper around a native DOM element inside of a View.
- It is used to manipulate DOM elements directly.
- It is used to create directives that can update DOM elements, such as `Renderer2`.

## What is the purpose of `trackBy` in Angular?

- `trackBy` is used to improve the performance of an Angular application.
- It is used to tell Angular how to track changes for **items in a collection**.
  
  ```ts
  <div *ngFor="let item of items; trackBy: trackByFn">{{item.name}}</div>
  ```
  
  ```ts
  trackByFn(index, item) {
    return item.id;
  }
  ```

## Explain `BrowerModule` and `CommonModule`.

- `BrowserModule` is used to run an Angular application in the `browser`.
- `CommonModule` is used to run an Angular application in a `web worker` or `server-side` rendering.
- `BrowserModule` exports all the basic directives, pipes, and services for the browser.
- `CommonModule` exports all the basic directives, pipes, and services for the web worker and server-side rendering.


## How do you restrict provider scope to a component / module?

- Using `providedIn` property of `@Injectable` decorator.

```ts
import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable({ providedIn: SomeModule })
export class SomeService {}
```

- Declare `provider` for the service in module:
  
```ts
@NgModule({ providers: [SomeService]})
export class SomeModule {}
```

## How do you provide a `SINGLETON` service?
```ts
@Injectable({ providedIn: 'root' })
export class SomeService {}
```

## Explain `@ViewChild` decorator

- `@ViewChild` decorator is used to access a child component, directive, or DOM element from a parent component class.
- It is used to access the **first element** that matches the selector from the view DOM.
- It is used to access the **local variable** in the template.

The lifecycle hook that is used to access the `@ViewChild` is `ngAfterViewInit`.

```ts
@Component({
  selector: 'app-parent',
  template: `
    <app-child #child1></app-child>
    <app-child #child2></app-child>
  `
})
export class ParentComponent implements AfterViewInit {
  @ViewChild('child1') child1: ChildComponent;
  @ViewChild('child2') child2: ChildComponent;

  ngAfterViewInit() {
    // child1 is set
    // child2 is set
  }
}
```

# What's New in Angular 15?

- Standalone components
- NgOptimizedImage

# What's New in Angular 16?

- Angular 16 introduced `signals`!
- `signals` are a new way to handle asynchronous operations in Angular.
- SSR Improvements
- Improved `ivy` compiler
- `@Input()` decorator now supports `required` value

# What's New in Angular 17?

- Angular 17 introduced `Angular Elements`!
- `Angular Elements` are a new way to create reusable components that can be used in any other framework or application.
<br />
<br />
- Angular is switching to `vite` as the default build tool.
- To change the default builder, in `angular.json` file, change the `builder` property to `@angular-devkit/build-angular:browser`.
<br />
<br />
- Built-in control flows `@If`, `@For`, `@Switch`, `@Case`, `@Default`
- Migration command is: `ng generate @angular/core:control-flow`
- `@defer`: Defers the initialization of a component until the component is visible in the viewport.

```html
@defer (on viewport; prefetch on idle) {
  <comment-list />
}
```