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
  - **Injector**: Creates a child injector of the element injector that is responsible for a directive.
- The **injector hierarchy** is determined by the **component tree**.


## In an Angular service, how can you read the full response?

``ts``
  import { HttpClient } from '@angular/common/http';
   
  getFullResponse() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts', { observe: 'response' });
  }
```
